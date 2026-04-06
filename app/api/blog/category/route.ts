import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");

    if (!category) {
      return NextResponse.json({ error: "Category parameter is required" }, { status: 400 });
    }

    const posts = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
        categories: {
          has: category,
        },
      },
      orderBy: { publishedAt: "desc" },
    });

    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Failed to fetch category posts:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}