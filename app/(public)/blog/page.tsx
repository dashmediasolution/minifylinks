import { prisma } from '@/lib/prisma'
import { BlogCard } from '@/components/blog-page/BlogCard'
import { FeaturedBlogCard } from '@/components/blog-page/FeaturedBlogCard'
import type { Metadata } from 'next'
import Link from 'next/link'
import { BlogPost } from '@/types/blog' 
import { Prisma } from '@prisma/client'
import { unstable_cache } from 'next/cache' // <--- IMPORT THIS
import dynamic from 'next/dynamic'

const BlogSidebar = dynamic(() => import('@/components/blog-page/BlogSidebar').then(mod => mod.BlogSidebar))
const BlogPagination = dynamic(() => import('@/components/blog-page/BlogPagination').then(mod => mod.BlogPagination))

export const metadata: Metadata = {
  title: 'Best URL Shortener, Boost Clicks | Blog & Tips',
  description: 'Minifylinks, the best URL shortener, transforms long URLs into short, professional links. Read our blog for guides on boosting clicks and engagement with our free tool.',
  alternates: {
    canonical: 'https://minifylinks.com/blog',
  },
  keywords: ['best URL shortener', 'best URL shortener tool', 'best URL shortener 2026', 'free URL shortener', 'free URL shortener tool'],
}

const PAGE_SIZE = 10;

// --- CACHED FUNCTION 1: Fetch Categories ---
const getCachedCategories = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      orderBy: { name: 'asc' },
    });
    return categories;
  },
  ['blog-categories-list'], // Cache Key
  { revalidate: 3600, tags: ['categories'] } // Revalidate every hour
);

// --- CACHED FUNCTION 2: Fetch Posts ---
const getCachedPostsData = unstable_cache(
  async (searchTerm: string, categoryId: string | null, page: number, matchingCategoryIds: string[]) => {
    
    const whereClause: Prisma.BlogPostWhereInput = {
      isPublished: true,
      AND: [
        categoryId ? { categoryIds: { has: categoryId } } : {},
        searchTerm ? {
          OR: [
            { title: { contains: searchTerm, mode: 'insensitive' } },
            { excerpt: { contains: searchTerm, mode: 'insensitive' } },
            matchingCategoryIds.length > 0 ? { categoryIds: { hasSome: matchingCategoryIds } } : {}
          ]
        } : {}
      ]
    };

    const [rawPosts, totalCount] = await Promise.all([
      prisma.blogPost.findMany({
        where: whereClause,
        orderBy: { publishedAt: 'desc' },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        select: {
          id: true, title: true, slug: true, excerpt: true,
          image: true, categories: { select: { name: true } }, publishedAt: true,
          updatedAt: true, isPublished: true,
        }
      }),
      prisma.blogPost.count({ where: whereClause })
    ]);

    const posts: BlogPost[] = rawPosts.map(post => ({
      ...post,
      categories: post.categories.map(c => c.name), // Convert back to string array for UI
      content: "",
      metaTitle: "", metaDescription: "", metaKeywords: "", focusKeyword: "",
      publishedAt: post.publishedAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return { posts, totalCount };
  },
  ['blog-posts-grid'], // Base Cache Key
  { revalidate: 3600, tags: ['blog-posts'] } // Revalidate every hour
);

interface BlogPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string; 
  }>
}

export default async function BlogListPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const searchTerm = (params.search || '').trim();
  const categoryFilterName = params.category || 'All';
  const currentPage = Number(params.page) || 1;

  // --- STEP 1: Get Categories (Cached) ---
  const allCategories = await getCachedCategories();
  const sidebarCategories = [
    { name: "All", slug: "" },
    ...allCategories.map(c => ({ name: c.name, slug: c.slug }))
  ];

  // --- STEP 2: Find IDs for filtering ---
  const currentCategoryObj = categoryFilterName !== 'All'
    ? allCategories.find(c => c.name.toLowerCase() === categoryFilterName.toLowerCase())
    : null;
  const currentCategoryId = currentCategoryObj ? currentCategoryObj.id : null;

  let matchingCategoryIds: string[] = [];
  if (searchTerm) {
    matchingCategoryIds = allCategories
      .filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .map(cat => cat.id);
  }

  // --- STEP 3: Fetch Posts (Cached) ---
  const { posts, totalCount } = await getCachedPostsData(searchTerm, currentCategoryId, currentPage, matchingCategoryIds);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // --- Layout Logic ---
  const isFiltering = !!searchTerm || categoryFilterName !== 'All';
  const showFeaturedLayout = !isFiltering && currentPage === 1;

  let featuredPost = null;
  let regularPosts = posts;

  if (showFeaturedLayout && posts.length > 0) {
     featuredPost = posts[0];
     regularPosts = posts.slice(1);
  }

  const getHeadingText = () => {
    if (searchTerm) return `Results for "${searchTerm}"`;
    if (categoryFilterName && categoryFilterName !== 'All') return `${categoryFilterName}`;
    
    // UPDATE: Return JSX with the span applied to "Insights"
    return (
      <>
        Browse Our{' '}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-700">
          Insights
        </span>
      </>
    );
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'MinifyLinks Blog & Tips',
    description: 'Minifylinks, the best URL shortener, transforms long URLs into short, professional links. Read our blog for guides on boosting clicks and engagement with our free tool.',
    url: 'https://minifylinks.com/blog',
    publisher: {
      '@type': 'Organization',
      name: 'MinifyLinks',
      logo: {
        '@type': 'ImageObject',
        url: 'https://minifylinks.com/logos/favicon-32x32.png',
      },
    },
    blogPost: posts.map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.excerpt,
      image: post.image ? [post.image] : [],
      url: `https://minifylinks.com/blog/${post.slug}`,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      author: {
        '@type': 'Organization',
        name: 'MinifyLinks Team',
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white pt-20 px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sm:mb-10 text-center max-w-3xl mx-auto">
         <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
            Read Our Blogs
          </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-gray-900 tracking-tight mb-4">
          {getHeadingText()}
        </h1>
        {!isFiltering && currentPage === 1 && (
          <div className="mt-6 text-base sm:text-lg text-gray-600 space-y-4 leading-relaxed">
            <p>
              Managing long, messy URLs is a headache. Minifylinks, the best URL shortener, transforms them into short, professional links in one click. Go beyond ordinary links with our{' '}
              <Link href="/" className="text-blue-600 hover:underline font-medium">
                free URL shortener tool
              </Link>{' '}
              to get clean, clickable URLs that build trust and polish your brand.
            </p>
            
          </div>
        )}
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-10 sm:pb-20 flex flex-col lg:flex-row gap-12">
        <BlogSidebar categories={sidebarCategories} />

        <div className="flex-1 space-y-10">
          {featuredPost && (
            <FeaturedBlogCard post={featuredPost} />
          )}

          {regularPosts.length > 0 ? (
            <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularPosts.map((post,index) => (
                    <BlogCard key={post.id} post={post} priority={index < 2} />
                ))}
                </div>
                <BlogPagination currentPage={currentPage} totalPages={totalPages} />
            </>
          ) : (
            <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
              <h3 className="text-xl font-medium text-gray-600">No articles found.</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or category.</p>
              <Link href="/blog" className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium">
                 Clear all filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}