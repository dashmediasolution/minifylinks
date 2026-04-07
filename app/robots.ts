import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/result/success'],
    },
    sitemap: 'https://minifylinks.com/sitemap.xml',
    host: 'https://minifylinks.com',
  }
}