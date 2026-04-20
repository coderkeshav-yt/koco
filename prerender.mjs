/**
 * Prerender script — generates static HTML for each route.
 * Run after `vite build` via: node prerender.mjs
 *
 * This lets Googlebot see real HTML content instead of an empty <div id="root">.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p) => path.resolve(__dirname, p);

// Routes to prerender
const routesToPrerender = ['/', '/projects'];

// Read the built index.html template
const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8');

// Load the server-side render entry (built by vite ssr build)
const { render } = await import('./dist/server/entry-server.js');

for (const url of routesToPrerender) {
  const { html: appHtml } = render(url);

  const html = template.replace('<!--app-html-->', appHtml);

  // Write to dist: / → dist/index.html, /projects → dist/projects/index.html
  const filePath =
    url === '/'
      ? toAbsolute('dist/index.html')
      : toAbsolute(`dist${url}/index.html`);

  // Ensure directory exists
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, html);

  console.log(`✅ Prerendered: ${url} → ${filePath}`);
}

console.log('\n🎉 Prerendering complete! Static HTML is ready for Googlebot.');
