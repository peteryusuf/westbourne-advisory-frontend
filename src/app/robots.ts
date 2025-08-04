import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/', '/backend/'],
    },
    sitemap: 'https://westbourneadvisory.com/sitemap.xml',
  }
}