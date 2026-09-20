#!/usr/bin/env node
/**
 * Rasterize `public/images/favicon/favicon.svg` into the PNG/ICO set the
 * static export and PWA manifest reference. Only the SVG carried the AT
 * monogram; the legacy PNGs still showed MD until regenerated.
 *
 * Run with `npm run favicon`.
 */
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

import sharp from 'sharp';
import toIco from 'to-ico';

const ROOT = join(process.cwd(), 'public', 'images', 'favicon');
const SVG_PATH = join(ROOT, 'favicon.svg');

/** filename → edge length in pixels */
const OUTPUTS = {
  'favicon-16x16.png': 16,
  'favicon-32x32.png': 32,
  'favicon-96x96.png': 96,
  'android-icon-36x36.png': 36,
  'android-icon-48x48.png': 48,
  'android-icon-72x72.png': 72,
  'android-icon-96x96.png': 96,
  'android-icon-144x144.png': 144,
  'android-icon-192x192.png': 192,
  'apple-icon-57x57.png': 57,
  'apple-icon-60x60.png': 60,
  'apple-icon-72x72.png': 72,
  'apple-icon-76x76.png': 76,
  'apple-icon-114x114.png': 114,
  'apple-icon-120x120.png': 120,
  'apple-icon-144x144.png': 144,
  'apple-icon-152x152.png': 152,
  'apple-icon-180x180.png': 180,
  'apple-icon.png': 180,
  'apple-icon-precomposed.png': 180,
  'apple-touch-icon.png': 180,
  'ms-icon-70x70.png': 70,
  'ms-icon-144x144.png': 144,
  'ms-icon-150x150.png': 150,
  'ms-icon-310x310.png': 310,
};

const svg = await readFile(SVG_PATH);

for (const [filename, size] of Object.entries(OUTPUTS)) {
  await sharp(svg).resize(size, size).png().toFile(join(ROOT, filename));
}

const ico = await toIco([
  await readFile(join(ROOT, 'favicon-16x16.png')),
  await readFile(join(ROOT, 'favicon-32x32.png')),
]);
const faviconIcoPath = join(ROOT, 'favicon.ico');
await writeFile(faviconIcoPath, ico);

// Next serves `app/favicon.ico` for the tab icon; keep it in sync with the SVG.
const appIcoPath = join(process.cwd(), 'app', 'favicon.ico');
await writeFile(appIcoPath, ico);

console.log(
  `Wrote ${Object.keys(OUTPUTS).length} PNGs, public/images/favicon/favicon.ico, and app/favicon.ico from favicon.svg`,
);
