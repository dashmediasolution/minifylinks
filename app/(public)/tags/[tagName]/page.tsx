import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { unstable_cache } from "next/cache";

interface TagPageProps {
  params: Promise<{ tagName: string }>;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tagName } = await params;
  const decodedTag = decodeURIComponent(tagName).replace(/-/g, ' ');
  return {
    title: `Posts tagged "${decodedTag}" | Minifylinks`,
    description: `Read all blog posts related to ${decodedTag}`,
  };
}

const getCachedPostsByTag = unstable_cache(
  async (tagName: string) => {
    const searchString = decodeURIComponent(tagName).replace(/-/g, ' ');
    
    const posts = await prisma.blogPost.findMany({
      where: {
        isPublished: true,
        metaKeywords: {
          contains: searchString,
          mode: 'insensitive',
        },
      },
      orderBy: { publishedAt: 'desc' },
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
      },
    });

    return posts;
  },
  ['blog-posts-by-tag'],
  { revalidate: 3600, tags: ['blog-posts'] }
);

export default async function TagPage({ params }: TagPageProps) {
  const { tagName } = await params;
  const decodedTag = decodeURIComponent(tagName).replace(/-/g, ' ');
  
  const posts = await getCachedPostsByTag(tagName);

  if (!posts || posts.length === 0) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 pt-20 pb-12 max-w-4xl">
      <div className="mb-8 text-center sm:text-left">
        <Link href="/tags" className="text-blue-500 hover:text-blue-600 mb-4 inline-block font-medium">
          &larr; Browse all tags
        </Link>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Posts tagged with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-700">&quot;{decodedTag}&quot;</span>
        </h1>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article key={post.id} className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 hover:shadow-md transition-shadow">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/blog/${post.slug}`} className="text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </Link>
            </h2>
            {post.excerpt && (
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {post.excerpt}
              </p>
            )}
            <Link href={`/blog/${post.slug}`} className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium">
               Read more &rarr;
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}