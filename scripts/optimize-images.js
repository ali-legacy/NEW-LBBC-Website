import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';

const IMAGES_DIR = new URL('../public/images', import.meta.url).pathname;
const QUALITY = 80;
const SIZE_THRESHOLD = 200 * 1024; // 200 KB

const SUPPORTED = new Set(['.png', '.jpg', '.jpeg']);

const files = await readdir(IMAGES_DIR);
let converted = 0;

for (const file of files) {
  const ext = extname(file).toLowerCase();
  if (!SUPPORTED.has(ext)) continue;

  const src = join(IMAGES_DIR, file);
  const webp = join(IMAGES_DIR, basename(file, ext) + '.webp');

  const { size } = await stat(src);
  if (size < SIZE_THRESHOLD) continue;

  try {
    await stat(webp);
    continue; // already exists
  } catch {
    // webp doesn't exist — convert
  }

  await sharp(src).webp({ quality: QUALITY }).toFile(webp);
  console.log(`Converted: ${file} → ${basename(webp)}`);
  converted++;
}

console.log(`Done. ${converted} new WebP file(s) created.`);
