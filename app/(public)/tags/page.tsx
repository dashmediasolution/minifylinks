import Link from "next/link";
import { Metadata } from "next";
import { prisma } from '@/lib/prisma';
import { unstable_cache } from 'next/cache';

export const metadata: Metadata = {
  title: "Blog Tags | Minifylinks",
  description: "Browse all blog tags",
};

const getCachedTags = unstable_cache(
  async () => {
    const posts = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { metaKeywords: true },
    });

    const tagMap: Record<string, { name: string; slug: string; count: number }> = {};

    posts.forEach((post) => {
      if (post.metaKeywords) {
        const tags = post.metaKeywords.split(',').map((t) => t.trim()).filter((t) => t.length > 0);
        tags.forEach((tag) => {
          const slug = tag.toLowerCase().replace(/\s+/g, '-');
          if (!tagMap[slug]) {
            tagMap[slug] = { name: tag, slug, count: 0 };
          }
          tagMap[slug].count += 1;
        });
      }
    });

    return Object.values(tagMap).sort((a, b) => b.count - a.count);
  },
  ['blog-tags-list'],
  { revalidate: 3600, tags: ['blog-posts'] }
);

export default async function TagsPage() {
  const tags = await getCachedTags();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "name": "Blog Tags | Minifylinks",
        "description": "Browse all blog tags and topics on Minifylinks.",
        "url": "https://minifylinks.com/tags",
        "mainEntity": {
          "@type": "ItemList",
          "itemListElement": tags.map((tag, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": tag.name,
            "url": `https://minifylinks.com/tags/${tag.slug}`
          }))
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://minifylinks.com/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Tags",
            "item": "https://minifylinks.com/tags"
          }
        ]
      }
    ]
  };

  return (
    <div className="container mx-auto px-4 py-20 max-w-4xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sm:mb-10 text-center max-w-2xl mx-auto">
         <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
            Discover Topics
          </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-gray-900 tracking-tight mb-4">
          All Tags
        </h1>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {tags.map((tag) => (
          <Link
            key={tag.slug}
            href={`/tags/${tag.slug}`}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors inline-flex items-center border border-gray-200 dark:border-gray-700"
          >
            <span className="font-medium text-gray-800 dark:text-gray-200">{tag.name}</span>
            <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">({tag.count})</span>
          </Link>
        ))}
        {tags.length === 0 && (
          <p className="text-gray-500">No tags found.</p>
        )}
      </div>
    </div>
  );
}