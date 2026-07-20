import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '../../blog/route'
import { revalidateTag } from 'next/cache'
import { v2 as cloudinary } from 'cloudinary'

// Configure Cloudinary with your environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

/**
 * Helper function to extract Cloudinary Public ID from a full image URL
 * E.g., "https://res.cloudinary.com/demo/image/upload/v123456/banners/flight_abc123.jpg" 
 * extraction returns: "banners/flight_abc123"
 */
function extractPublicId(url: string): string | null {
  try {
    const parts = url.split('/upload/')
    if (parts.length < 2) return null
    
    // Remove version segment (v1234567/) if present, and strip file extension (.jpg)
    const publicIdWithExt = parts[1].replace(/^v\d+\//, '')
    return publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'))
  } catch (error) {
    console.error("Failed to parse Cloudinary Public ID:", error)
    return null
  }
}

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function DELETE(req: NextRequest, { params }: RouteParams) {
  // 1. Authentication Gate
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await params
    if (!id) {
      return NextResponse.json({ error: 'Banner ID is required.' }, { status: 400 })
    }

    // 2. Find the banner first to get the Cloudinary image URL
    const banner = await prisma.banner.findUnique({
      where: { id }
    })

    if (!banner) {
      return NextResponse.json({ error: 'Banner record not found.' }, { status: 404 })
    }

    // 3. Delete from Cloudinary if an image exists
    if (banner.image) {
      const publicId = extractPublicId(banner.image)
      
      if (publicId) {
        try {
          // Removes the image from your Cloudinary media library asset storage
          await cloudinary.uploader.destroy(publicId)
        } catch (cloudinaryError) {
          // Log the error but don't block DB deletion if the file was already deleted manually
          console.error("Cloudinary Asset Destruction Failed:", cloudinaryError)
        }
      }
    }

    // 4. Database Deletion (MongoDB collection cleanup)
    const deletedBanner = await prisma.banner.delete({
      where: { id },
    })

    // 5. Purge client cache tags
    try {
      revalidateTag('banners', 'max')
    } catch (cacheError) {
      console.warn("Cache revalidation failed:", cacheError)
    }

    return NextResponse.json(
      { message: 'Banner and Cloudinary asset successfully removed', banner: deletedBanner }, 
      { status: 200 }
    )

  } catch (error: any) {
    console.error("Banner Deletion Route Error:", error)
    return NextResponse.json(
      { error: 'Failed to complete banner deletion process.' }, 
      { status: 500 }
    )
  }
}