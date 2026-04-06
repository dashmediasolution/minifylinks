import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { BlogCard } from "@/components/blog-page/BlogCard";
import { FeaturedBlogCard } from "@/components/blog-page/FeaturedBlogCard";
import { BlogSidebar } from "@/components/blog-page/BlogSidebar";
import { BlogPagination } from "@/components/blog-page/BlogPagination";
import Link from "next/link";
import { BlogPost } from "@/types/blog";
import { Prisma } from "@prisma/client";
import { unstable_cache } from "next/cache";

const PAGE_SIZE = 10;

// --- CACHED FUNCTION 1: Fetch Categories ---
const getCachedCategories = unstable_cache(
  async () => {
    const categoryData = await prisma.blogPost.findMany({
      where: { isPublished: true },
      select: { categories: true },
    });
    return categoryData.flatMap((p) => p.categories || []);
  },
  ["blog-categories-list"], // Cache Key
  { revalidate: 3600, tags: ["categories"] } // Revalidate every hour
);

// --- CACHED FUNCTION 2: Fetch Posts ---
const getCachedPostsData = unstable_cache(
  async (searchTerm: string, categoryFilter: string, page: number, matchingCategories: string[]) => {
    const whereClause: Prisma.BlogPostWhereInput = {
      isPublished: true,
      AND: [
        { categories: { has: categoryFilter } },
        searchTerm
          ? {
              OR: [
                { title: { contains: searchTerm, mode: "insensitive" } },
                { excerpt: { contains: searchTerm, mode: "insensitive" } },
                matchingCategories.length > 0 ? { categories: { hasSome: matchingCategories } } : {},
              ],
            }
          : {},
      ],
    };

    const [rawPosts, totalCount] = await Promise.all([
      prisma.blogPost.findMany({
        where: whereClause,
        orderBy: { publishedAt: "desc" },
        take: PAGE_SIZE,
        skip: (page - 1) * PAGE_SIZE,
        select: {
          id: true, title: true, slug: true, excerpt: true,
          image: true, categories: true, publishedAt: true,
          updatedAt: true, isPublished: true,
        },
      }),
      prisma.blogPost.count({ where: whereClause }),
    ]);

    const posts: BlogPost[] = rawPosts.map((post) => ({
      ...post,
      content: "", metaTitle: "", metaDescription: "", metaKeywords: "", focusKeyword: "",
      publishedAt: post.publishedAt.toISOString(),
      updatedAt: post.updatedAt.toISOString(),
    }));

    return { posts, totalCount };
  },
  ["blog-posts-grid"], // Base Cache Key (Shared with blog page cache bucket behavior)
  { revalidate: 3600, tags: ["blog-posts"] }
);

type Props = {
  params: Promise<{
    categoryName: string;
  }>;
  searchParams: Promise<{
    search?: string;
    page?: string;
  }>;
};

// Generate dynamic SEO metadata for each category page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const formattedCategory = decodeURIComponent(resolvedParams.categoryName)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: `${formattedCategory} Articles | MinifyLinks Blog`,
    description: `Read the latest articles and updates about ${formattedCategory} on MinifyLinks.`,
  };
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const rawSlug = decodeURIComponent(resolvedParams.categoryName);
  
  const searchTerm = (resolvedSearchParams.search || "").trim();
  const currentPage = Number(resolvedSearchParams.page) || 1;

  // --- STEP 1: Get Categories (Cached) ---
  const allCategoriesRaw = await getCachedCategories();
  const cleanedCategories = allCategoriesRaw
    .map((cat) => cat.trim())
    .filter((cat) => cat.length > 0);

  const uniqueCategories = ["All", ...Array.from(new Set(cleanedCategories))];

  // Find the exact original category name matching the URL slug
  const decodedCategory = uniqueCategories.find(
    (cat) => cat.toLowerCase().replace(/\s+/g, '-') === rawSlug
  ) || rawSlug.replace(/-/g, ' '); // fallback

  // --- STEP 2: Smart Matching (Client-side logic, fast) ---
  let matchingCategories: string[] = [];
  if (searchTerm) {
    matchingCategories = uniqueCategories.filter(
      (cat) => cat.toLowerCase().includes(searchTerm.toLowerCase()) && cat !== "All"
    );
  }

  // --- STEP 3: Fetch Posts (Cached) ---
  const { posts, totalCount } = await getCachedPostsData(searchTerm, decodedCategory, currentPage, matchingCategories);
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  // --- Layout Logic ---
  const isFiltering = !!searchTerm;
  const showFeaturedLayout = !isFiltering && currentPage === 1;

  let featuredPost = null;
  let regularPosts = posts;

  if (showFeaturedLayout && posts.length > 0) {
    featuredPost = posts[0];
    regularPosts = posts.slice(1);
  }

  const getHeadingText = () => {
    if (searchTerm) return `Results for "${searchTerm}" in ${decodedCategory}`;
    return <span className="capitalize">{decodedCategory}</span>;
  };

  return (
    <div className="min-h-screen bg-white pt-20 px-6">
      <div className="sm:mb-10 text-center max-w-2xl mx-auto">
        <span className="text-sm font-bold uppercase tracking-wider text-gray-500">
          Category
        </span>
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-semibold text-gray-900 tracking-tight mb-4">
          {getHeadingText()}
        </h1>
      </div>
      
      <div className="max-w-6xl mx-auto px-4 pb-10 sm:pb-20 flex flex-col lg:flex-row gap-12">
        <BlogSidebar categories={uniqueCategories} />

        <div className="flex-1 space-y-10">
          {featuredPost && <FeaturedBlogCard post={featuredPost} />}

          {regularPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {regularPosts.map((post, index) => (
                  <BlogCard key={post.id} post={post} priority={index < 2} />
                ))}
              </div>
              <BlogPagination currentPage={currentPage} totalPages={totalPages} />
            </>
          ) : (
            <div className="p-12 text-center border-2 border-dashed border-gray-200 rounded-3xl bg-gray-50">
              <h3 className="text-xl font-medium text-gray-600">No articles found.</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or select another category.</p>
              <Link href="/blog" className="inline-block mt-4 text-blue-600 hover:underline text-sm font-medium">
                Clear all filters
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}