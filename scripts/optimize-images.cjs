// scripts/optimize-images.js
// Re-encode the public assets for the web:
//  - resize to a max width that still covers the largest display size
//  - produce WebP + AVIF (modern formats) and a JPEG fallback for every source
//  - strip metadata and compress aggressively
//  - wipe stale files from the output folder so only optimized outputs remain
//
// Source of truth:  ./assets/            (original high-res files, untouched)
// Served folder:     ./public/assets/   (optimized .jpg/.webp/.avif only)
//
// Run:  node scripts/optimize-images.js

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = __dirname.replace(/scripts$/, "");
const SRC = path.join(ROOT, "assets"); // original high-res source
const OUT = path.join(ROOT, "public", "assets"); // served files

// Largest rendered dimension on the biggest breakpoint. The hero background is
// full-viewport, so 1600px covers ~1600px-wide screens without ballooning.
const MAX_WIDTH = 1600;
const QUALITY = 78; // tuned for size vs. visible quality on these photos

const SOURCE_RE = /\.(jpe?g|png|avif|webp)$/i;

async function optimize(file) {
  const base = path.basename(file, path.extname(file));
  const destJpg = path.join(OUT, `${base}.jpg`);
  const destWebp = path.join(OUT, `${base}.webp`);
  const destAvif = path.join(OUT, `${base}.avif`);

  const before = fs.statSync(file).size;

  // Already-modern formats (e.g. bible_one.avif, dove.webp) are small enough;
  // just copy them through unchanged so the reference still resolves.
  if (/\.(avif|webp)$/i.test(file)) {
    fs.copyFileSync(file, path.join(OUT, path.basename(file)));
    console.log(
      `${(base + path.extname(file)).padEnd(26)} ` +
        `${(before / 1048576).toFixed(2).padStart(6)} MB -> ` +
        `${(before / 1048576).toFixed(2).padStart(5)} MB  (copied as-is)`
    );
    return { before, after: before };
  }

  const rotated = sharp(file).rotate(); // fix EXIF orientation
  const meta = await rotated.metadata();
  const width = Math.min(meta.width || MAX_WIDTH, MAX_WIDTH);
  const resize = { width, withoutEnlargement: true };

  // JPEG fallback (broadest browser support)
  await rotated
    .clone()
    .resize(resize)
    .jpeg({ quality: QUALITY, progressive: true, chromaSubsampling: "4:2:0" })
    .toFile(destJpg);

  // WebP
  await sharp(file)
    .rotate()
    .resize(resize)
    .webp({ quality: QUALITY })
    .toFile(destWebp);

  // AVIF (best compression)
  await sharp(file)
    .rotate()
    .resize(resize)
    .avif({ quality: QUALITY })
    .toFile(destAvif);

  const after = fs.statSync(destWebp).size;
  const saved = ((1 - after / before) * 100).toFixed(1);
  console.log(
    `${(base + path.extname(file)).padEnd(26)} ` +
      `${(before / 1048576).toFixed(2).padStart(6)} MB -> ` +
      `${(after / 1048576).toFixed(2).padStart(5)} MB webp  (${saved}% smaller)`
  );
  return { before, after };
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error(`Source folder not found: ${SRC}`);
    process.exit(1);
  }
  fs.mkdirSync(OUT, { recursive: true });

  // Wipe any previously generated outputs so stale originals can't linger.
  for (const entry of fs.readdirSync(OUT)) {
    if (SOURCE_RE.test(entry)) fs.unlinkSync(path.join(OUT, entry));
  }

  const files = fs
    .readdirSync(SRC)
    .filter((f) => SOURCE_RE.test(f))
    .map((f) => path.join(SRC, f));

  let totalBefore = 0;
  let totalAfter = 0;
  for (const file of files) {
    const { before, after } = await optimize(file);
    totalBefore += before;
    totalAfter += after;
  }
  console.log(
    `\nTotal: ${(totalBefore / 1048576).toFixed(1)} MB -> ` +
      `${(totalAfter / 1048576).toFixed(1)} MB webp ` +
      `(${((1 - totalAfter / totalBefore) * 100).toFixed(1)}% smaller)`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});