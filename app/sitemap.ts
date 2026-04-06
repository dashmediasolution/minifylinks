import { MetadataRoute } from 'next'
import { prisma } from '@/lib/prisma' // Make sure this path matches your project

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://minifylinks.com'

  // 1. Get all your dynamic blog posts
  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: {
      slug: true,
      updatedAt: true,
      categories: true,
      image: true,
    },
  })

  // 2. Format blog posts for the sitemap
  const blogUrls = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8, // Blogs are important, but less than the homepage
    images: post.image ? [post.image] : undefined,
  }))

  // 3. Get unique categories and format them for the sitemap
  const uniqueCategories = Array.from(
    new Set(
      posts
        .flatMap((post) => post.categories || [])
        .map((cat) => cat.trim())
        .filter((cat) => cat.length > 0)
    )
  )
  const categoryUrls = uniqueCategories.map((category) => ({
    url: `${baseUrl}/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7, // Category archives are slightly lower priority than individual articles
  }))

  // 4. Define your static pages (Home, Blog List, Privacy)
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1, // Homepage is the most important
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9, // Main blog feed is very important
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(), // You can hardcode a date here if you rarely update it
      changeFrequency: 'monthly' as const,
      priority: 0.5, // Legal pages are low priority for search ranking
    },
  ]

  // 5. Combine them
  return [...staticRoutes,...categoryUrls, ...blogUrls ]
}