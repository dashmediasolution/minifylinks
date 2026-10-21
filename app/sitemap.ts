import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://minifylinks.com";
  const currentDate = new Date();

  const posts = await prisma.blogPost.findMany({
    where: {
      isPublished: true,
    },
    select: {
      slug: true,
      updatedAt: true,
      categories: {
        select: {
          slug: true,
        },
      },
      image: true,
      metaKeywords: true,
    },
  });

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
    ...(post.image ? { images: [post.image] } : {}),
  }));

  const uniqueCategories = [
    ...new Set(
      posts.flatMap((post) =>
        post.categories
          .map((category) => category.slug)
          .filter((slug): slug is string => Boolean(slug))
      )
    ),
  ];

  const categoryUrls: MetadataRoute.Sitemap = uniqueCategories.map(
    (slug) => ({
      url: `${baseUrl}/category/${slug}`,
      changeFrequency: "weekly",
      priority: 0.7,
    })
  );

  const uniqueTags = [
    ...new Set(
      posts
        .flatMap((post) =>
          (post.metaKeywords ?? "")
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean)
            .map((tag) =>
              tag.toLowerCase().replace(/\s+/g, "-")
            )
        )
    ),
  ];

  const tagUrls: MetadataRoute.Sitemap = uniqueTags.map((tagSlug) => ({
    url: `${baseUrl}/tags/${encodeURIComponent(tagSlug)}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/faqs`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.5,
    },
  ];

  return [
    ...staticRoutes,
    ...categoryUrls,
    ...tagUrls,
    ...blogUrls,
  ];
}