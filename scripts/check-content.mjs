/**
 * Content lint for the built pages — every HTML file in dist/, so both the
 * English and the Turkish route get checked.
 *
 * Astro strips whitespace wherever a newline sits directly against an inline
 * tag boundary — on either side. Both of these lose their space:
 *
 *     built with <strong>Playwright</strong> and     <- newline before <strong>
 *     <strong>TypeScript</strong>
 *
 *     down to the <strong>API</strong>               <- newline after </strong>
 *     layer with REST Assured
 *
 * They render as "and**TypeScript**" and "**API**layer". It is silent, easy to
 * reintroduce whenever the prose is edited, and only visible by reading the
 * page. The rule: never break the line immediately before an opening inline
 * tag, or immediately after a closing one. (Prose stored as HTML strings and
 * rendered with set:html — like src/data/about.ts — is not affected.)
 *
 * Also flags links that would render dead, missing local assets, and pages
 * whose <html lang> does not match the route they were built for.
 *
 * Usage: npm run check   (after npm run build)
 */

import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const INLINE = 'a|strong|em|span|code|abbr|b|i';

/** Expected <html lang> per route, so a mis-wired locale cannot ship. */
const EXPECTED_LANG = {
  'index.html': 'en',
  'tr/index.html': 'tr',
};

if (!fs.existsSync(DIST)) {
  console.error(`${DIST}/ not found — run "npm run build" first.`);
  process.exit(1);
}

/** Every .html file under dist/, as paths relative to dist/. */
function htmlFiles(dir = DIST) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(full);
    return entry.name.endsWith('.html') ? [path.relative(DIST, full).replace(/\\/g, '/')] : [];
  });
}

const problems = [];
const pages = htmlFiles();

if (pages.length === 0) {
  console.error(`No HTML found in ${DIST}/ — did the build run?`);
  process.exit(1);
}

for (const page of pages) {
  const html = fs.readFileSync(path.join(DIST, page), 'utf8');
  const at = (msg) => problems.push(`${page}: ${msg}`);
  const context = (i) => html.slice(Math.max(0, i - 45), i + 55).replace(/\s+/g, ' ');

  // Text glued to the start of an inline element, or to the end of one.
  for (const m of html.matchAll(new RegExp(`[A-Za-z0-9?!.,;:%)]<(?:${INLINE})[ >]`, 'g'))) {
    const snippet = context(m.index);
    if (snippet.includes('aria-hidden="true"')) continue; // decorative, not announced
    at(`missing space before inline tag: ...${snippet}...`);
  }
  for (const m of html.matchAll(new RegExp(`</(?:${INLINE})>[A-Za-z0-9]`, 'g'))) {
    const snippet = context(m.index);
    if (snippet.includes('aria-hidden="true"')) continue;
    at(`missing space after inline tag: ...${snippet}...`);
  }

  // Links that resolve to nothing.
  for (const m of html.matchAll(/href="(#|)"/g)) {
    at(`empty href: ...${context(m.index)}...`);
  }

  // Local assets referenced but not shipped. Absolute URLs count too: og:image
  // and friends are emitted fully qualified, and a missing share image is
  // exactly the kind of thing nobody notices until a link looks broken.
  const origin = html.match(/<link rel="canonical" href="(https?:\/\/[^/"]+)/)?.[1];
  const assetRefs = new Set();

  for (const m of html.matchAll(/(?:href|src|content)="([^"]+\.[a-z0-9]{2,5})"/g)) {
    const url = m[1];
    if (url.startsWith('/')) assetRefs.add(url);
    else if (origin && url.startsWith(`${origin}/`)) assetRefs.add(url.slice(origin.length));
  }

  for (const ref of assetRefs) {
    const clean = ref.split(/[#?]/)[0];
    if (!fs.existsSync(path.join(DIST, clean))) at(`referenced file is missing: ${clean}`);
  }

  // The route serves the language it claims to.
  const expected = EXPECTED_LANG[page];
  if (expected) {
    const declared = html.match(/<html[^>]*\blang="([^"]+)"/)?.[1];
    if (declared !== expected) {
      at(`<html lang> is "${declared ?? 'missing'}", expected "${expected}"`);
    }
  }
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s) found across ${pages.length} page(s):\n`);
  for (const p of problems) console.error(`  • ${p}`);
  console.error('');
  process.exit(1);
}

console.log(
  `${pages.length} page(s) clean (${pages.join(', ')}): spacing, links, local assets and lang attributes all check out.`,
);
