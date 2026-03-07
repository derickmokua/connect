import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.kukuconnect.co.ke';

  // Base routes - we can expand this as the site grows
  const routes = [
    '',
    '/about',
    '/products',
    '/checkout',
    '/contact',
    '/care-guide',
    '/reviews',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return routes;
}
