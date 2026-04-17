import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Calendar, User } from 'lucide-react'
import { unstable_cache } from 'next/cache'
import { RelatedPosts } from '@/components/blog-page/RelatedPosts'
import dynamic from 'next/dynamic'

// Dynamically import client-heavy widget to reduce initial JS/CSS bundle
const ShareWidget = dynamic(() => import('@/components/blog-page/ShareWidget').then((mod) => mod.ShareWidget))

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
  params: Promise<{ slug: string }>
}

/**
 * Dynamically generate SEO metadata for each blog post page.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const post = await getCachedPost(resolvedParams.slug)

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
  const resolvedParams = await params;
  const post = await getCachedPost(resolvedParams.slug)

  if (!post) {
    notFound()
  }

  return (
    <main className="bg-white">
      <article className="py-12 sm:py-16">
        {/* Post Header */}
        <header className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
          <div className="flex flex-wrap gap-3 justify-center mb-4">
            {post.categories?.map((cat) => (
              <Link key={cat.id} href={`/category/${cat.slug}`}>
                <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-none rounded-lg px-3 py-1 text-xs sm:text-sm font-semibold capitalize transition-colors">
                  {cat.name}
                </Badge>
              </Link>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                <User className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-900">MinifyLinks Team</span>
            </div>
            <span className="hidden sm:block text-slate-300">•</span>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={new Date(post.publishedAt).toISOString()}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </time>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        {post.image && (
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 sm:mb-12">
            <div className="relative w-full aspect-[16/9] rounded-2xl lg:rounded-3xl overflow-hidden shadow-lg">
              <Image 
                src={post.image} 
                alt={post.title} 
                fill 
                className="object-cover" 
                priority
                fetchPriority="high"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 80vw, 1200px"
              />
            </div>
          </div>
        )}
        
        {/* Post Body & Sidebars */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 xl:gap-12">
          
          {/* Left Sidebar: Share Widget (Sticky) */}
          <aside className="hidden lg:block w-20 shrink-0">
            <div className="sticky top-28">
              <ShareWidget title={post.title} slug={post.slug} />
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div 
              className="prose prose-lg max-w-none prose-slate 
                         prose-headings:font-bold prose-headings:text-slate-800 
                         prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-a:transition-colors
                         prose-img:rounded-xl" 
              dangerouslySetInnerHTML={{ __html: post.content }} 
            />
          </div>

          {/* Right Sidebar: Related Posts (Sticky) */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-28 space-y-8">
              <RelatedPosts currentSlug={post.slug} categories={post.categoryIds} />
              {/* Mobile Share Widget */}
              <div className="lg:hidden">
                <ShareWidget title={post.title} slug={post.slug} />
              </div>
            </div>
          </aside>
        </div>
      </article>
    </main>
  )
}