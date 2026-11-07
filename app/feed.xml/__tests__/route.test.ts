import { describe, expect, it } from 'vitest';

import { SITE_URL } from '@/lib/utils';
import { getWritingItems } from '@/lib/writing';

import { GET } from '../route';

describe('feed.xml route', () => {
  it('uses canonical trailing-slash links for writing pages', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(`${SITE_URL}/writing/`);
    expect(xml).toContain(`${SITE_URL}/writing/what-is-darsvp/`);
  });

  it('keeps the feed self link file-like', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(`${SITE_URL}/feed.xml`);
    expect(xml).not.toContain(`${SITE_URL}/feed.xml/`);
  });

  it('derives lastBuildDate from content rather than the build clock', async () => {
    const response = await GET();
    const xml = await response.text();

    const newest = getWritingItems().find((item) => item.date);
    const expected = new Date(`${newest!.date}T12:00:00Z`).toUTCString();

    expect(xml).toContain(`<lastBuildDate>${expected}</lastBuildDate>`);
  });
});
