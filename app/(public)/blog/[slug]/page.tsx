import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Calendar } from 'lucide-react'
import { unstable_cache } from 'next/cache'
import { ShareWidget } from '@/components/blog-page/ShareWidget'
import { RelatedPosts } from '@/components/blog-page/RelatedPosts'

/**
 * CACHED FUNCTION 1: Fetch a single post by its slug.
 * This function now correctly includes the related category data.
 */
const getCachedPost = unstable_cache(
  async (slug: string) => {
    const post = await prisma.blogPost.findFirst({
      where: {
        slug: slug,
        isPublished: true,
      },
      include: {
        categories: true, // <-- FIX: This fetches the category objects
      },
    })
    return post
  },
  ['single-blog-post'], // Unique cache key for single posts
  { revalidate: 3600, tags: ['blog-posts'] }
)

type Props = {
  params: { slug: string }
}

/**
 * Dynamically generate SEO metadata for each blog post page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getCachedPost(params.slug)

  if (!post) {
    return { title: 'Post Not Found' }
  }

  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.metaKeywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
        title: post.metaTitle,
        description: post.metaDescription,
        url: `/blog/${post.slug}`,
        images: post.image ? [{
            url: post.image,
            width: 1200,
            height: 630,
            alt: post.title,
        }] : [],
        type: 'article',
        publishedTime: new Date(post.publishedAt).toISOString(),
        modifiedTime: new Date(post.updatedAt).toISOString(),
    },
  }
}

/**
 * Statically generate routes at build time for better performance.
 */
export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });
 
  return posts.map((post) => ({
    slug: post.slug,
  }));
}


export default async function BlogPostPage({ params }: Props) {
  const post = await getCachedPost(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white pt-20 px-6">
      <div className="max-w-7xl mx-auto px-4 pb-10 sm:pb-20 flex flex-col lg:flex-row gap-12 xl:gap-16">

        <main className="flex-1 min-w-0">
          <article>
            <header className="mb-8 border-b border-gray-100 pb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">
                {post.title}
              </h1>
              <div className="flex items-center text-sm text-gray-500 space-x-4">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={new Date(post.publishedAt).toISOString()}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </time>
                </div>
              </div>
            </header>

            {post.image && (
              <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden mb-8 shadow-lg">
                <Image src={post.image} alt={post.title} fill className="object-cover" priority />
              </div>
            )}
            
            <div className="prose prose-lg max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />

            <div className="flex flex-wrap gap-2 mt-8 pt-8 border-t border-gray-100">
              {post.categories?.map((cat) => (
                <Link key={cat.id} href={`/category/${cat.slug}`}>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors px-3 py-1 text-sm capitalize">
                    {cat.name}
                  </Badge>
                </Link>
              ))}
            </div>
          </article>
        </main>

        <aside className="hidden lg:flex flex-col space-y-8 w-full max-w-xs shrink-0 sticky top-24 h-fit">
          <ShareWidget title={post.title} slug={post.slug} />
          <RelatedPosts currentSlug={post.slug} categories={post.categoryIds} />
        </aside>
      </div>
    </div>
  )
}