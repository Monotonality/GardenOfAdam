import { describe, expect, it } from 'vitest';

import routes from '@/data/routes';
import { SITE_URL } from '@/lib/utils';
import sitemap from '../sitemap';

function canonicalPageUrl(path: string): string {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}/`;
}

describe('sitemap', () => {
  it('uses trailing slashes for exported page routes', () => {
    const entries = sitemap();

    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ url: `${SITE_URL}/` }),
        expect.objectContaining({ url: `${SITE_URL}/about/` }),
        expect.objectContaining({ url: `${SITE_URL}/resume/` }),
        expect.objectContaining({ url: `${SITE_URL}/projects/` }),
        expect.objectContaining({ url: `${SITE_URL}/writing/` }),
        expect.objectContaining({ url: `${SITE_URL}/gallery/` }),
        expect.objectContaining({ url: `${SITE_URL}/stats/` }),
        expect.objectContaining({ url: `${SITE_URL}/contact/` }),
      ]),
    );
  });

  it('does not invent modification dates for static pages', () => {
    const staticEntries = sitemap().filter(
      (entry) => !entry.url.startsWith(`${SITE_URL}/writing/`),
    );

    expect(
      staticEntries.every((entry) => entry.lastModified === undefined),
    ).toBe(true);
  });

  it('uses trailing slashes for post routes', () => {
    const entries = sitemap();
    const postEntries = entries.filter(
      (entry) =>
        entry.url.startsWith(`${SITE_URL}/writing/`) &&
        entry.url !== `${SITE_URL}/writing/`,
    );

    expect(postEntries.length).toBeGreaterThan(0);
    expect(postEntries.every((entry) => entry.url.endsWith('/'))).toBe(true);
  });

  it('lists every published writing post', () => {
    const entries = sitemap();

    expect(entries).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: `${SITE_URL}/writing/what-is-darsvp/`,
        }),
        expect.objectContaining({
          url: `${SITE_URL}/writing/jsom-super-owl-apollo/`,
        }),
      ]),
    );
  });

  it('covers each navigation route exactly once', () => {
    const entries = sitemap();
    const routeUrls = routes.map((route) => canonicalPageUrl(route.path));
    const matched = entries.filter((entry) => routeUrls.includes(entry.url));

    expect(matched).toHaveLength(routeUrls.length);
    expect(new Set(matched.map((entry) => entry.url)).size).toBe(
      routeUrls.length,
    );
  });
});
