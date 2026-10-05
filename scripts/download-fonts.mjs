import { mkdir, writeFile } from "node:fs/promises";

const destination = new URL("../src/app/fonts/", import.meta.url);
await mkdir(destination, { recursive: true });
for (const [family, name, weights] of [
  ["Poppins", "poppins", "300;400;500;600;700"],
  ["JetBrains+Mono", "jetbrains-mono", "400..700"],
]) {
  const response = await fetch(`https://fonts.googleapis.com/css2?family=${family}:wght@${weights}&display=swap`, {
    headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36" },
  });
  if (!response.ok) throw new Error(`Font stylesheet: ${response.status}`);
  const css = await response.text();
  const blocks = [...css.matchAll(/\/\* latin \*\/\s*@font-face\s*\{([^}]+)\}/g)];
  if (!blocks.length) throw new Error(`Latin subset missing for ${family}: ${css.slice(0, 500)}`);
  for (const [, block] of blocks) {
    const weight = block.match(/font-weight:\s*([^;]+)/)[1].replace(/\s+/g, "-");
    const url = block.match(/src:\s*url\(([^)]+)\)/)[1];
    const font = await fetch(url);
    if (!font.ok) throw new Error(`Font download: ${font.status}`);
    await writeFile(new URL(`${name}-${weight}.woff2`, destination), Buffer.from(await font.arrayBuffer()));
    console.log(`${name}-${weight}.woff2`);
  }
}
