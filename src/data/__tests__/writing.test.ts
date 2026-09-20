import { describe, expect, it } from 'vitest';

import writing from '../writing';

describe('writing data', () => {
  it('exports an array of writing items', () => {
    expect(Array.isArray(writing)).toBe(true);
    expect(writing.length).toBeGreaterThan(0);
  });

  it('each item has required properties', () => {
    for (const item of writing) {
      expect(item).toHaveProperty('title');
      expect(item).toHaveProperty('url');
      expect(item).toHaveProperty('date');
      expect(item).toHaveProperty('description');

      expect(typeof item.title).toBe('string');
      expect(typeof item.url).toBe('string');
      expect(typeof item.date).toBe('string');
      expect(typeof item.description).toBe('string');
    }
  });

  it('urls are valid', () => {
    const urlRegex = /^https?:\/\/.+/;

    for (const item of writing) {
      expect(item.url).toMatch(urlRegex);
    }
  });
});
