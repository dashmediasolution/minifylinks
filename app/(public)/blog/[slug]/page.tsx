import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Clock } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import type { Metadata } from 'next'
import { RelatedPosts } from '@/components/blog-page/RelatedPosts' 
import { ShareWidget } from '@/components/blog-page/ShareWidget'

// --- FUNCTION: Fetch Single Post ---
const getPost = async (slug: string) => {
  return prisma.blogPost.findUnique({
    where: { slug: slug }
  })
};

type Props = {
  params: Promise<{ slug: string }>
}

// --- 1. DYNAMIC METADATA ---
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  // Fetch post
  const post = await getPost(slug);

  if (!post) return { title: 'Article Not Found' }

  const ogImage = post.image || '/images/og-default.jpg';

  return {
    title: post.metaTitle || post.title,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords?.split(',').map(k => k.trim()) || [],
    authors: [{ name: 'MinifyLinks Team' }],
    alternates: {
      canonical: `https://minifylinks.com/blog/${post.slug}`,
    },
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      url: `https://minifylinks.com/blog/${post.slug}`,
      publishedTime: new Date(post.publishedAt).toISOString(), // Safe date conversion
      modifiedTime: new Date(post.updatedAt).toISOString(),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      siteName: 'MinifyLinks',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: [ogImage],
    },
  }
}

// --- 2. MAIN PAGE COMPONENT ---
export default async function SingleBlogPage({ params }: Props) {
  const { slug } = await params

  // Fetch post
  const post = await getPost(slug);

  if (!post || !post.isPublished) {
    notFound()
  }

  // Calculate Read Time
  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  // JSON-LD SCHEMA
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    image: post.image ? [post.image] : [],
    datePublished: new Date(post.publishedAt).toISOString(), // Safe date conversion
    dateModified: new Date(post.updatedAt).toISOString(),
    author: {
      '@type': 'Organization',
      name: 'MinifyLinks Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'MinifyLinks',
      logo: {
        '@type': 'ImageObject',
        url: 'https://minifylinks.com/logo.png', 
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://minifylinks.com/blog/${post.slug}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="min-h-screen bg-slate-50 pb-24">
        
        {/* Clean Editorial Header */}
        <header className="bg-white  pt-24 pb-16 px-6">
          <div className="container mx-auto max-w-4xl text-center space-y-8">
            
            <div className="flex justify-center mb-8">
              <Link 
                href="/blog" 
                className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 hover:bg-blue-100 px-5 py-2.5 rounded-full"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-2">
              {post.categories?.map((cat, idx) => (
                <Link key={idx} href={`/blog/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Badge variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-1.5 text-sm rounded-full cursor-pointer transition-colors border-none font-medium">
                    {cat}
                  </Badge>
                </Link>
              ))}
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight mx-auto">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-slate-500 text-sm font-medium pt-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-slate-700">MinifyLinks Team</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-600" />
                <time dateTime={post.publishedAt.toString()}>
                  {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </time>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-300 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                {readTime} min read
              </div>
            </div>

          </div>
        </header>

        {/* Main Content Layout */}
        <div className="container mx-auto px-4 sm:px-6 max-w-7xl mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          
          <div className="lg:col-span-8">
             {post.image && (
                <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden mb-10 ">
                  <Image 
                    src={`${post.image}?t=${new Date(post.updatedAt).getTime()}`} 
                    alt={post.title} 
                    fill 
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
                    className="object-cover aspect-[16/9]"
                    priority
                  />
                </div>
             )}

             <div className="prose prose-slate prose-lg md:prose-xl max-w-none">
               <div 
                 className="prose prose-slate prose-lg md:prose-xl max-w-none 
                            prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-slate-900 
                            prose-p:text-slate-600 prose-p:leading-relaxed 
                            prose-a:text-blue-600 hover:prose-a:text-blue-500 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                            prose-img:rounded-2xl"
                 dangerouslySetInnerHTML={{ __html: post.content }}
               />
             
               {/* Article Tags/Keywords */}
               {(post.focusKeyword || post.metaKeywords) && (
                 <div className="mt-12 pt-10 ">
                    <h4 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-5 flex items-center gap-2">Tags & Keywords</h4>
                    <div className="flex flex-wrap gap-2">
                       {post.focusKeyword && (
                          <span className="px-4 py-2 bg-blue-50 text-blue-700 text-sm rounded-xl font-semibold">#{post.focusKeyword.trim()}</span>
                       )}
                       {post.metaKeywords?.split(',').map((tag, i) => (
                          <span key={i} className="px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 text-sm rounded-xl font-medium transition-colors cursor-default">
                            #{tag.trim()}
                          </span>
                       ))}
                    </div>
                 </div>
               )}
             </div>
          </div>

          <aside className="lg:col-span-4 space-y-8">
             <div className="sticky top-24 space-y-8">
                <ShareWidget title={post.title} slug={post.slug} />
                
                <div className=" rounded-3xl p-6 sm:p-8 ">
                  <RelatedPosts currentSlug={post.slug} categories={post.categories} />
                </div>
             </div>
          </aside>

        </div>
      </article>
    </>
  )
}