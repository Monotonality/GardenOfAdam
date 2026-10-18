import { describe, expect, it } from 'vitest';

import {
  getGalleryCollection,
  getGalleryCollectionSlugs,
  getGalleryCollections,
} from '../gallery';

describe('gallery data', () => {
  it('lists every published collection for static routes', () => {
    expect(getGalleryCollectionSlugs()).toEqual([
      'portraiture',
      'chicago',
      'toro',
    ]);
  });

  it('defines portraiture pieces', () => {
    const portraiture = getGalleryCollection('portraiture');
    expect(portraiture?.pieces.length).toBe(3);
    expect(portraiture?.published).toBe(true);
    expect(portraiture?.pieces[0]?.title).toBe('The Coming of Age');
    expect(portraiture?.pieces[2]?.details).toMatch(/verdaccio/i);
  });

  it('publishes chicago and toro with full grids', () => {
    expect(getGalleryCollection('chicago')?.pieces).toHaveLength(5);
    expect(getGalleryCollection('toro')?.pieces).toHaveLength(6);
    expect(getGalleryCollections().every((c) => c.published)).toBe(true);
  });
});
