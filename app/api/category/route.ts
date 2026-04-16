import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

/**
 * GET /api/category
 * Retrieves a list of all blog categories, including a count of posts in each.
 */
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc',
      },
    });

    // Efficiently count posts by using the length of the stored postIds array
    const categoriesWithCount = categories.map((category) => ({
      ...category,
      postCount: category.postIds.length,
    }));

    return NextResponse.json(categoriesWithCount);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Something went wrong while fetching categories.' }, { status: 500 });
  }
}

/**
 * POST /api/category
 * Creates a new blog category.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, description, keywords } = body;

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Category name is required and must be a non-empty string.' }, { status: 400 });
    }
    
    const trimmedName = name.trim();
    const slug = trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '') // remove invalid chars
      .trim()
      .replace(/\s+/g, '-'); // replace spaces with dashes

    const existingCategory = await prisma.category.findFirst({
      where: {
        OR: [{ name: { equals: trimmedName, mode: 'insensitive' } }, { slug }],
      },
    });

    if (existingCategory) {
      const isNameConflict = existingCategory.name.toLowerCase() === trimmedName.toLowerCase();
      return NextResponse.json({ error: `A category with this ${isNameConflict ? 'name' : 'slug'} already exists.` }, { status: 409 });
    }

    const category = await prisma.category.create({
      data: { 
        name: trimmedName, 
        slug, 
        description: description || null, 
        keywords: keywords || null, 
        postIds: [] 
      },
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error('Error creating category:', error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (error.code === 'P2002') { // Prisma unique constraint violation
        return NextResponse.json({ error: 'A category with this name or slug already exists.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Something went wrong while creating the category.' }, { status: 500 });
  }
}

/**
 * PUT /api/category
 * Updates an existing blog category. Expects { id, name, description, keywords }
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, name, description, keywords } = body;

    if (!id || typeof id !== 'string') {
      return NextResponse.json({ error: 'Category ID is required.' }, { status: 400 });
    }

    if (!name || typeof name !== 'string' || name.trim() === '') {
      return NextResponse.json({ error: 'Category name is required.' }, { status: 400 });
    }

    const trimmedName = name.trim();
    const slug = trimmedName
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');

    const existingCategory = await prisma.category.findFirst({
      where: {
        NOT: { id },
        OR: [{ name: { equals: trimmedName, mode: 'insensitive' } }, { slug }],
      },
    });

    if (existingCategory) {
      return NextResponse.json({ error: 'Another category with this name or slug already exists.' }, { status: 409 });
    }

    const updatedCategory = await prisma.category.update({
      where: { id },
      data: {
        name: trimmedName,
        slug,
        description: description || null,
        keywords: keywords || null,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Error updating category:', error);
    return NextResponse.json({ error: 'Something went wrong while updating the category.' }, { status: 500 });
  }
}

/**
 * DELETE /api/category?id=[id]
 * Deletes a blog category and un-links it from posts.
 */
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Category ID is required.' }, { status: 400 });
    }

    // Find all blog posts that have this category ID
    const postsToUpdate = await prisma.blogPost.findMany({
        where: { categoryIds: { has: id } }
    });

    // For each post, remove the category ID from its `categoryIds` array
    const updatePromises = postsToUpdate.map(post => {
        const newCategoryIds = post.categoryIds.filter(catId => catId !== id);
        return prisma.blogPost.update({
            where: { id: post.id },
            data: { categoryIds: newCategoryIds }
        });
    });

    // Execute all updates in parallel
    await Promise.all(updatePromises);

    // Finally, delete the category itself
    await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Category deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (error.code === 'P2025') { // Prisma: Record to delete not found
        return NextResponse.json({ error: 'Category not found.' }, { status: 404 });
    }
    return NextResponse.json({ error: 'Something went wrong while deleting the category.' }, { status: 500 });
  }
}