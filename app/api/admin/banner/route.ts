import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { isAuthenticated } from '../blog/route'
import { revalidateTag } from 'next/cache'

export const dynamic = 'force-dynamic'
// Add this export to change the body parsing limit for this specific API route
export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Adjust this value up to what your media library demands
    },
  },
}
export async function POST(req: NextRequest) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const body = await req.json()
        if (!body.title || !body.image) {
            return NextResponse.json(
                { error: 'Missing required fields: title and image are mandatory.' },
                { status: 400 }
            )
        }

        const newBanner = await prisma.banner.create({
            data: {
                title: body.title,
                description: body.description || '',
                image: body.image,
                redirectTo: body.redirectTo || '',
            }
        })


        try {
            revalidateTag('banners', 'max')
        } catch (cacheError) {
            console.warn("Cache revalidation failed:", cacheError)
        }

        return NextResponse.json(newBanner, { status: 201 })

    } catch (error: unknown) {
        // 5. Context-aware Error Handling
        console.error("Banner Creation Error:", error)

        return NextResponse.json(
            { error: 'Failed to create Banner.' },
            { status: 500 }
        )
    }
}



export async function GET(req: NextRequest) {
  try {
     const banners = await prisma.banner.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

     return NextResponse.json(banners, {
      status: 200,
    })

  } catch (error: unknown) {
    console.error("Fetch Banners Error:", error)
    
    return NextResponse.json(
      { error: 'Failed to retrieve banner listings.' }, 
      { status: 500 }
    )
  }
}