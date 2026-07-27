// One-off helper: converts every .heic/.HEIC file under photos/ to a same-name
// .jpg sitting right next to it (originals are kept, not deleted). Run again
// any time after uploading more HEIC photos — already-converted files are
// skipped. Excludes SKIP_DIRS entirely.
//
// Usage:  npm install   (first time only)
//         node convert-heic.js

const fs = require('fs');
const path = require('path');
const convert = require('heic-convert');

const PHOTOS_DIR = path.join(__dirname, 'photos');
const SKIP_DIRS = new Set(['Unsorted(Filler)']);

function findHeicFiles(dir) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      results.push(...findHeicFiles(path.join(dir, entry.name)));
    } else if (/\.heic$/i.test(entry.name)) {
      results.push(path.join(dir, entry.name));
    }
  }
  return results;
}

async function main() {
  const files = findHeicFiles(PHOTOS_DIR);
  let converted = 0, skipped = 0, failed = 0;

  for (const file of files) {
    const jpgPath = file.replace(/\.heic$/i, '.jpg');
    if (fs.existsSync(jpgPath)) {
      skipped++;
      continue;
    }
    try {
      const inputBuffer = fs.readFileSync(file);
      const outputBuffer = await convert({ buffer: inputBuffer, format: 'JPEG', quality: 0.9 });
      fs.writeFileSync(jpgPath, outputBuffer);
      converted++;
      console.log(`Converted: ${path.relative(PHOTOS_DIR, file)}`);
    } catch (err) {
      failed++;
      console.error(`FAILED: ${path.relative(PHOTOS_DIR, file)} — ${err.message}`);
    }
  }

  console.log(`\nDone. ${converted} converted, ${skipped} already had a .jpg, ${failed} failed.`);
}

main();
