/**
 * Content lint for the built page.
 *
 * Astro drops whitespace wherever a newline sits directly against an inline
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
 * tag, or immediately after a closing one.
 *
 * Also flags links that would render dead.
 *
 * Usage: npm run check   (after npm run build)
 */

import fs from 'node:fs';

const FILE = 'dist/index.html';

if (!fs.existsSync(FILE)) {
  console.error(`${FILE} not found — run "npm run build" first.`);
  process.exit(1);
}

const html = fs.readFileSync(FILE, 'utf8');
const INLINE = 'a|strong|em|span|code|abbr|b|i';
const problems = [];

const context = (i) => html.slice(Math.max(0, i - 45), i + 55).replace(/\s+/g, ' ');

// Text glued to the start of an inline element, or to the end of one.
for (const m of html.matchAll(new RegExp(`[A-Za-z0-9?!.,;:%)]<(?:${INLINE})[ >]`, 'g'))) {
  const snippet = context(m.index);
  if (snippet.includes('aria-hidden="true"')) continue; // decorative, not announced
  problems.push(`missing space before inline tag: ...${snippet}...`);
}
for (const m of html.matchAll(new RegExp(`</(?:${INLINE})>[A-Za-z0-9]`, 'g'))) {
  const snippet = context(m.index);
  if (snippet.includes('aria-hidden="true"')) continue;
  problems.push(`missing space after inline tag: ...${snippet}...`);
}

// Links that resolve to nothing.
for (const m of html.matchAll(/href="(#|)"/g)) {
  problems.push(`empty href: ...${context(m.index)}...`);
}

// Local assets referenced but not shipped.
for (const m of html.matchAll(/(?:href|src|content)="(\/[^"#?]+\.[a-z0-9]{2,5})"/g)) {
  const asset = `dist${m[1]}`;
  if (!fs.existsSync(asset)) problems.push(`referenced file is missing: ${m[1]}`);
}

if (problems.length) {
  console.error(`\n${problems.length} problem(s) found in ${FILE}:\n`);
  for (const p of problems) console.error(`  • ${p}`);
  console.error('');
  process.exit(1);
}

console.log(`${FILE} is clean: spacing, links and local assets all check out.`);
