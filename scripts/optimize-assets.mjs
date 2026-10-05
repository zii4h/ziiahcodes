import { readdir, stat, mkdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public");
let originalBytes = 0;
let optimizedBytes = 0;
async function convert(source, output, width, quality = 82) {
  await mkdir(path.dirname(output), { recursive: true });
  await sharp(source).rotate().resize({ width, withoutEnlargement: true }).webp({ quality, effort: 6 }).toFile(output);
  optimizedBytes += (await stat(output)).size;
}
for (const filename of await readdir(path.join(root, "photos"))) {
  if (!filename.endsWith(".jpg")) continue;
  const source = path.join(root, "photos", filename);
  originalBytes += (await stat(source)).size;
  await convert(source, source.replace(/\.jpg$/, ".webp"), 480);
}
for (const filename of await readdir(path.join(root, "project-img"))) {
  if (!filename.endsWith(".png")) continue;
  const source = path.join(root, "project-img", filename);
  originalBytes += (await stat(source)).size;
  for (const width of [640, 960]) await convert(source, source.replace(/\.png$/, `-${width}.webp`), width, 85);
}
for (const filename of await readdir(path.join(root, "misc-gear-svg"))) {
  if (!filename.endsWith(".svg")) continue;
  const source = path.join(root, "misc-gear-svg", filename);
  originalBytes += (await stat(source)).size;
  await convert(source, path.join(root, "gear", filename.replace(/\.svg$/, ".webp")), 48, 90);
}
for (const [filename, width] of [["my-avatar.png", 128], ["photos/hau-logo.png", 88]]) {
  const source = path.join(root, filename);
  originalBytes += (await stat(source)).size;
  await convert(source, source.replace(/\.png$/, ".webp"), width, 90);
}
console.log(JSON.stringify({ originalBytes, optimizedBytes, reduction: `${Math.round((1 - optimizedBytes / originalBytes) * 100)}%` }));
