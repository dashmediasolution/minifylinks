import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { revalidateTag } from 'next/cache'

const SECRET_KEY = process.env.JWT_SECRET || 'super-secret-key-change-this'

// Middleware helper to verify admin access
const isAuthenticated = (req: NextRequest) => {
  const token = req.cookies.get('admin_token')?.value
  if (!token) return false
  try {
    jwt.verify(token, SECRET_KEY)
    return true
  } catch {
    return false
  }
}

// Bypassing any localized Next.js cache type corruptions
const safeRevalidateTag = revalidateTag as (tag: string) => void;

// UPDATE A POST
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAuthenticated(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await context.params
    const body = await req.json()

    if (!body.title || !body.slug || !body.content) {
      return NextResponse.json({ error: 'Missing required fields (Title, Slug, Content)' }, { status: 400 })
    }

    const originalPost = await prisma.blogPost.findUnique({
      where: { id },
      select: { categoryIds: true }
    });

    if (!originalPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const oldCategoryIds = originalPost.categoryIds;
    const newCategoryIds = Array.isArray(body.categoryIds) ? body.categoryIds : [];

    const updatedPost = await prisma.blogPost.update({
      where: { id },
      data: {
        title: body.title,
        slug: body.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-'),
        content: body.content,
        excerpt: body.excerpt || '',
        image: body.image || '',
        categoryIds: newCategoryIds,
        metaTitle: body.metaTitle || body.title,
        metaDescription: body.metaDescription || '',
        metaKeywords: body.metaKeywords || '',
        focusKeyword: body.focusKeyword || '',
        isPublished: Boolean(body.isPublished),
      }
    })

    // --- Sync many-to-many relation ---
    const categoriesToRemovePostFrom = oldCategoryIds.filter((catId: string) => !newCategoryIds.includes(catId));
    const categoriesToAddPostTo = newCategoryIds.filter((catId: string) => !oldCategoryIds.includes(catId));

    if (categoriesToRemovePostFrom.length > 0) {
      const catsToUpdate = await prisma.category.findMany({
        where: { id: { in: categoriesToRemovePostFrom } },
        select: { id: true, postIds: true }
      });
      
      await Promise.all(catsToUpdate.map(cat => 
        prisma.category.update({
          where: { id: cat.id },
          data: { postIds: cat.postIds.filter((postId: string) => postId !== id) }
        })
      ));
    }

    if (categoriesToAddPostTo.length > 0) {
      await prisma.category.updateMany({
        where: { id: { in: categoriesToAddPostTo } },
        data: { postIds: { push: id } }
      });
    }

    safeRevalidateTag('blog-posts')
    safeRevalidateTag('categories')

    return NextResponse.json(updatedPost)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.code === 'P2002') {
      return NextResponse.json(
        { error: 'A post with this URL slug already exists. Please change the slug.' },
        { status: 409 }
      )
    }
    console.error("Blog Update Error:", error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

// DELETE A POST
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
    if (!isAuthenticated(req)) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { id } = await context.params;

        // First, remove the post's ID from all associated categories
        const categoriesToUpdate = await prisma.category.findMany({
            where: { postIds: { has: id } },
            select: { id: true, postIds: true }
        });
        
        await Promise.all(categoriesToUpdate.map(cat => 
            prisma.category.update({
                where: { id: cat.id },
                data: { postIds: cat.postIds.filter((postId: string) => postId !== id) }
            })
        ));

        // Then, delete the post
        await prisma.blogPost.delete({
            where: { id },
        });

        safeRevalidateTag('blog-posts');
        safeRevalidateTag('categories');

        return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        if (error?.code === 'P2025') { // Prisma: Record to delete not found
            return NextResponse.json({ error: 'Post not found.' }, { status: 404 });
        }
        console.error("Blog Delete Error:", error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}