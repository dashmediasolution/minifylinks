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
      metaKeywords: true,
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
    url: `${baseUrl}/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7, // Category archives are slightly lower priority than individual articles
  }))

  // 4. Get unique tags and format them for the sitemap
  const uniqueTags = Array.from(
    new Set(
      posts
        .flatMap((post) => {
          if (!post.metaKeywords) return [];
          return post.metaKeywords.split(',').map((t) => t.trim());
        })
        .filter((tag) => tag.length > 0)
        .map((tag) => tag.toLowerCase().replace(/\s+/g, '-'))
    )
  )
  const tagUrls = uniqueTags.map((tagSlug) => ({
    url: `${baseUrl}/tags/${tagSlug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6, // Individual tag archives
  }))

  // 5. Define your static pages (Home, Blog List, Privacy, Tags Index)
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
    {
      url: `${baseUrl}/tags`,

      lastModified: new Date(), // You can hardcode a date here if you rarely update it
      changeFrequency: 'monthly' as const,
      priority: 0.5, // Legal pages are low priority for search ranking
    },
    {
      url: `${baseUrl}/faqs`,

      lastModified: new Date(), // You can hardcode a date here if you rarely update it
      changeFrequency: 'monthly' as const,
      priority: 0.5, // Legal pages are low priority for search ranking
    },
    {
      url: `${baseUrl}/terms`,

      lastModified: new Date(), // You can hardcode a date here if you rarely update it
      changeFrequency: 'monthly' as const,
      priority: 0.5, // Legal pages are low priority for search ranking
    },
  ]

  // 6. Combine them
  return [...staticRoutes, ...categoryUrls, ...blogUrls, ...tagUrls]
}