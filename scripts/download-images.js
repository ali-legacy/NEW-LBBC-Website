import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const appTsxPath = path.join(rootDir, 'src', 'App.tsx');
const indexHtmlPath = path.join(rootDir, 'index.html');
const imagesDir = path.join(rootDir, 'public', 'images');

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

async function downloadImage(id) {
  const url = `https://lh3.googleusercontent.com/d/${id}`;
  const outPath = path.join(imagesDir, `${id}.jpg`); // Assume jpg for simplicity
  
  if (fs.existsSync(outPath)) {
    console.log(`[SKIP] Image already exists: ${id}.jpg`);
    return true;
  }

  console.log(`[DOWNLOAD] Fetching ${id}...`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    
    // Some basic content-type checking
    const ct = res.headers.get('content-type') || '';
    let ext = '.jpg';
    if (ct.includes('png')) ext = '.png';
    else if (ct.includes('webp')) ext = '.webp';
    else if (ct.includes('svg')) ext = '.svg';
    else if (ct.includes('gif')) ext = '.gif';
    
    const finalOutPath = path.join(imagesDir, `${id}${ext}`);
    
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(finalOutPath, Buffer.from(buffer));
    console.log(`[SUCCESS] Saved ${id}${ext}`);
    return ext;
  } catch (err) {
    console.error(`[ERROR] Failed to download ${id}:`, err.message);
    return null;
  }
}

async function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  // Match URLs exactly
  const regex = /https:\/\/lh3\.googleusercontent\.com\/d\/([a-zA-Z0-9_-]+)/g;
  let match;
  const matches = new Set();
  
  while ((match = regex.exec(content)) !== null) {
    matches.add(match[1]);
  }

  for (const id of matches) {
    // Skip template literal interpolations
    if (id.includes('$')) continue;
    
    const ext = await downloadImage(id);
    if (ext) {
      // Replace in content
      const replaceRegex = new RegExp(`https:\\/\\/lh3\\.googleusercontent\\.com\\/d\\/${id}`, 'g');
      content = content.replace(replaceRegex, `/images/${id}${ext}`);
    }
  }

  fs.writeFileSync(filePath, content);
  console.log(`[DONE] Processed ${filePath}`);
}

async function main() {
  await processFile(appTsxPath);
  await processFile(indexHtmlPath);
}

main().catch(console.error);
