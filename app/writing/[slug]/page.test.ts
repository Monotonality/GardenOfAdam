import { describe, expect, it } from 'vitest';

import { SITE_URL } from '@/lib/utils';

import { generateMetadata } from './page';

describe('writing post metadata', () => {
  it('uses a trailing-slash canonical URL for posts', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'what-is-darsvp' }),
    });

    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/writing/what-is-darsvp/`);
  });

  it('falls back to the site share card when a post has no article image', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'what-is-darsvp' }),
    });

    expect(metadata.openGraph?.images).toBeUndefined();
    expect(metadata.twitter?.images).toBeUndefined();
  });
});
