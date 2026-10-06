import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const output = resolve(root, 'dist/kiiero-crunch-preview.html');
let html = await readFile(resolve(root, 'dist/index.html'), 'utf8');

const scriptTag = html.match(/<script[^>]+src="([^"]+)"[^>]*><\/script>/);
const cssTag = html.match(/<link[^>]+href="([^"]+\.css)"[^>]*>/);
if (!scriptTag || !cssTag) throw new Error('Run npm run build before exporting the preview.');

const js = await readFile(resolve(root, `dist${scriptTag[1]}`), 'utf8');
const cssPath = resolve(root, `dist${cssTag[1]}`);
let css = await readFile(cssPath, 'utf8');
for (const match of [...css.matchAll(/url\(([^)]+)\)/g)]) {
  const fontPath = match[1].replace(/^['"]|['"]$/g, '');
  if (/^data:|^https?:/.test(fontPath)) continue;
  const resolved = fontPath.startsWith('/')
    ? resolve(root, `dist${fontPath}`)
    : resolve(dirname(cssPath), fontPath);
  const bytes = await readFile(resolved);
  const type = fontPath.endsWith('.woff2') ? 'font/woff2' : 'font/woff';
  css = css.replace(match[0], `url(data:${type};base64,${bytes.toString('base64')})`);
}

const favicon = await readFile(resolve(root, 'public/favicon.svg'));
html = html
  .replace(scriptTag[0], () => `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>`)
  .replace(cssTag[0], () => `<style>${css}</style>`)
  .replace('href="/favicon.svg"', `href="data:image/svg+xml;base64,${favicon.toString('base64')}"`);
await writeFile(output, html);
console.log(`Standalone preview saved to ${output} (${Math.round(Buffer.byteLength(html) / 1024)} KB)`);
