// Converts originals in raw-import/<project>/ into web-ready WebP in public/work/<project>/.
// Tall images (Figma/PDF exports) are sliced into stacked panels so they load
// progressively and can animate in one by one.
//
// Usage: node scripts/process-images.mjs
// Writes src/data/images.json with every output's path and size.
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

sharp.cache(false);
const SRC = 'raw-import';
const OUT = 'public/work';
const MAX_W = 1600;          // largest width we ever serve
const SLICE_RATIO = 1.1;     // slice height = width * ratio
const TALL = 2.2;            // images taller than width*TALL get sliced

const manifest = {};
fs.rmSync(OUT, { recursive: true, force: true });

for (const project of fs.readdirSync(SRC)) {
  const dir = path.join(SRC, project);
  if (!fs.statSync(dir).isDirectory()) continue;
  fs.mkdirSync(path.join(OUT, project), { recursive: true });

  for (const file of fs.readdirSync(dir)) {
    if (!/\.(png|jpe?g)$/i.test(file)) continue;
    const name = file.replace(/\.[^.]+$/, '');
    const input = path.join(dir, file);
    const meta = await sharp(input, { limitInputPixels: false }).metadata();
    const isPhoto = /avatar|photo/.test(name);
    const width = Math.min(MAX_W, meta.width, isPhoto ? 1200 : MAX_W);
    const scale = width / meta.width;
    const height = Math.round(meta.height * scale);
    const key = `${project}/${name}`;

    if (meta.height > meta.width * TALL) {
      // Resize once, then cut into panels.
      const resized = await sharp(input, { limitInputPixels: false })
        .resize({ width })
        .png()
        .toBuffer();
      const sliceH = Math.round(width * SLICE_RATIO);
      // Panel boundaries; a short remainder is folded into the last panel.
      const cuts = [];
      for (let top = 0; top < height; top += sliceH) cuts.push(top);
      if (cuts.length > 1 && height - cuts.at(-1) < sliceH * 0.35) cuts.pop();
      const slices = [];
      for (let i = 1; i <= cuts.length; i++) {
        const top = cuts[i - 1];
        const h = (cuts[i] ?? height) - top;
        const outName = `${name}-${String(i).padStart(2, '0')}.webp`;
        await sharp(resized, { limitInputPixels: false })
          .extract({ left: 0, top, width, height: h })
          .webp({ quality: 82 })
          .toFile(path.join(OUT, project, outName));
        slices.push({ src: `/work/${project}/${outName}`, width, height: h });
      }
      manifest[key] = { slices };
    } else {
      const outName = `${name}.webp`;
      await sharp(input, { limitInputPixels: false })
        .rotate()
        .resize({ width })
        .webp({ quality: isPhoto ? 78 : 84 })
        .toFile(path.join(OUT, project, outName));
      manifest[key] = { src: `/work/${project}/${outName}`, width, height };
    }
    console.log(key, manifest[key].slices ? `${manifest[key].slices.length} slices` : `${width}x${height}`);
  }
}

// Square face crop for small round avatars (tuned to common/avatar).
if (fs.existsSync(path.join(OUT, 'common/avatar.webp'))) {
  await sharp(path.join(OUT, 'common/avatar.webp'))
    .extract({ left: 516, top: 560, width: 360, height: 360 })
    .resize(240)
    .webp({ quality: 82 })
    .toFile(path.join(OUT, 'common/avatar-face.webp'));
}

fs.writeFileSync('src/data/images.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('wrote src/data/images.json');
