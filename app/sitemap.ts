import type { MetadataRoute } from 'next';

import routes from '@/data/routes';
import { getAllPosts } from '@/lib/posts';
import { SITE_URL } from '@/lib/utils';

export const dynamic = 'force-static';

type ChangeFrequency = NonNullable<
  MetadataRoute.Sitemap[number]['changeFrequency']
>;

const ROUTE_META: Record<
  string,
  { changeFrequency: ChangeFrequency; priority: number }
> = {
  '/': { changeFrequency: 'monthly', priority: 1 },
  '/about': { changeFrequency: 'monthly', priority: 0.8 },
  '/resume': { changeFrequency: 'monthly', priority: 0.8 },
  '/writing': { changeFrequency: 'weekly', priority: 0.8 },
  '/projects': { changeFrequency: 'monthly', priority: 0.8 },
  '/stats': { changeFrequency: 'weekly', priority: 0.5 },
  '/contact': { changeFrequency: 'yearly', priority: 0.5 },
};

function canonicalPageUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  const staticEntries: MetadataRoute.Sitemap = routes.map((route) => {
    const meta = ROUTE_META[route.path] ?? {
      changeFrequency: 'monthly' as ChangeFrequency,
      priority: 0.5,
    };

    return {
      url: canonicalPageUrl(route.path),
      changeFrequency: meta.changeFrequency,
      priority: meta.priority,
    };
  });

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/writing/${post.slug}/`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...staticEntries, ...postEntries];
}
