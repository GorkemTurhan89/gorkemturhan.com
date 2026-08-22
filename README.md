# gorkemturhan.com

Personal portfolio of **Görkem Turhan** — QA Automation Engineer / SDET.

A bilingual, single-page, statically generated site: dark, minimal, no
client-side framework. Each language ships as one HTML file plus ~19 kB of CSS
and a few kB of vanilla JS.

- **English** → `/`
- **Türkçe** → `/tr/`

**Stack:** [Astro](https://astro.build) 7 · vanilla CSS (custom properties, no
preprocessor) · no runtime dependencies · deployed to Cloudflare Pages.

---

## Getting started

Requires **Node.js 22.12 or newer** (see `.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:4321  (and /tr/)
```

| Command           | What it does                                     |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Dev server with hot reload                       |
| `npm run build`   | Production build into `dist/`                    |
| `npm run check`   | Lints the built pages (see *Editing prose*)      |
| `npm run preview` | Serve the built `dist/` locally                  |

---

## How the two languages fit together

`astro.config.mjs` declares the locales:

```js
i18n: {
  defaultLocale: 'en',
  locales: ['en', 'tr'],
  routing: { prefixDefaultLocale: false },
}
```

That is what makes `Astro.currentLocale` resolve inside **every** component, so
nothing has to thread the language down through props. Each component starts
with one line:

```astro
const { lang, t, ui } = useI18n(Astro.currentLocale);
```

- `t(value)` picks the active translation out of any `Localized<T>` value.
- `ui` is the page chrome for the active language — nav labels, button text,
  section headings.

`src/pages/index.astro` and `src/pages/tr/index.astro` are deliberately
identical two-line files: both render `<Portfolio />`, and the language comes
from the URL. **No content is duplicated between routes.**

### Adding or changing a translation

Anything typed `Localized<T>` is just `{ en: …, tr: … }`. Add the field in both
languages and TypeScript will tell you if you miss one:

```ts
title: { en: 'Test Automation', tr: 'Test Otomasyonu' },
```

### Adding a third language

1. Add the code to `LANGS` and `LANG_META` in `src/i18n/index.ts`, and a full
   entry to the `UI` object — TypeScript will then flag every `Localized` value
   in `src/data/` that is missing the new language.
2. Add it to `locales` in `astro.config.mjs`.
3. Create `src/pages/<code>/index.astro` as a copy of the Turkish one.
4. Add the route to `public/sitemap.xml` and the `EXPECTED_LANG` map in
   `scripts/check-content.mjs`.
5. Render a share image for it and point `site.ogImage` at it.

---

## Editing the content

**All copy lives in `src/data/` and `src/i18n/` — you should not need to touch
a component to change what the page says.**

| File                     | Controls                                                      |
| ------------------------ | ------------------------------------------------------------- |
| `src/i18n/index.ts`      | Page chrome: nav, buttons, section headings and leads          |
| `src/data/site.ts`       | Name, role, tagline, SEO, social links, CV path, nav anchors   |
| `src/data/about.ts`      | About paragraphs and the quick-facts card                      |
| `src/data/skills.ts`     | The four skill groups and their chips                          |
| `src/data/experience.ts` | Timeline entries (most recent first)                           |
| `src/data/projects.ts`   | Featured work, grouped into QA and Development                 |

Conventions worth knowing:

- **Optional project links.** `github` and `demo` are both optional on a
  project — omit one and its link disappears from the card. `badge` adds a
  small tag in the card corner.
- **Optional job location.** Leave `location` out of an experience entry to
  hide that line.
- **Dead links can't render.** `contactLinks` filters out any entry with an
  empty `href`, so an unfinished link is skipped rather than shown broken.
- **Availability pill.** Set `availableForWork: false` in `site.ts` to hide the
  "Available for work" chip in the header.
- **Nav anchors.** `navItems` in `site.ts` holds the anchors and a `key` into
  `ui.nav`; the anchors must match the `id` of each `<section>` in
  `src/components/Portfolio.astro`. The scroll-spy derives its targets from
  those hrefs.
- **Tool names are not translated.** Chips like `Playwright` or `REST Assured`
  are plain `string[]`, not `Localized`, on purpose.

### Editing prose — one Astro gotcha

Astro strips whitespace wherever a newline sits directly against an inline tag
boundary, **on either side**. Both of these silently lose their space:

```astro
built with <strong>Playwright</strong> and     <!-- newline before <strong> -->
<strong>TypeScript</strong>                    → "and**TypeScript**"

down to the <strong>API</strong>               <!-- newline after </strong> -->
layer with REST Assured                        → "**API**layer"
```

The rule: **never break the line immediately before an opening inline tag, or
immediately after a closing one.** It is invisible in the source and only shows
up on the rendered page.

The About paragraphs sidestep this entirely: they are stored as HTML strings in
`src/data/about.ts` and rendered with `set:html`, which keeps the `<strong>`
emphasis next to the sentence it belongs to in both languages. (That is also
why `About.astro` styles them with `:global(strong)` — `set:html` content does
not get Astro's scoping attribute.)

After editing any prose, run:

```bash
npm run build && npm run check
```

`scripts/check-content.mjs` scans **every** page in `dist/` for the whitespace
bug, empty hrefs, references to files that were not shipped (including absolute
`og:image` URLs), and a `<html lang>` that does not match its route. Zero
dependencies.

### Still to do

- [ ] The project descriptions in `src/data/projects.ts` were written from each
      repository's structure, since most of the repos have no README. Tighten
      them as you polish the repos.

### Updating the CV

Replace `public/gorkem-turhan-cv.pdf`. It is referenced once, from `site.cv` in
`src/data/site.ts`, and feeds both the hero button and the contact card. Update
`site.cv.filename` for a different saved filename, and the `handle` on
`socials.cv` if the page count changes.

---

## Project structure

```
├── public/                  Served as-is at the site root
│   ├── _headers             Cloudflare Pages security + caching headers
│   ├── apple-touch-icon.png 180×180 home-screen icon
│   ├── favicon.svg
│   ├── gorkem-turhan-cv.pdf The downloadable CV
│   ├── og.png               1200×630 share image (English)
│   ├── og-tr.png            1200×630 share image (Turkish)
│   ├── robots.txt
│   ├── site.webmanifest
│   └── sitemap.xml          Both routes, cross-linked with hreflang
├── scripts/
│   └── check-content.mjs    Content lint for the built HTML
├── src/
│   ├── components/          One component per section, plus Icon,
│   │                        SectionHeading and Portfolio (the shared body)
│   ├── data/                All site content, bilingual
│   ├── i18n/
│   │   └── index.ts         Lang types, useI18n(), and the UI strings
│   ├── layouts/
│   │   └── BaseLayout.astro <head>, SEO/OG/hreflang, JSON-LD, behaviour script
│   ├── pages/
│   │   ├── index.astro      English route
│   │   └── tr/index.astro   Turkish route
│   └── styles/
│       └── global.css       Design tokens, reset, shared primitives
├── astro.config.mjs
└── wrangler.toml            Cloudflare Pages project config
```

### How the styling works

`src/styles/global.css` holds the design tokens (`--bg`, `--accent`,
`--font-sans`, spacing, radii, motion) plus a reset and the primitives shared
across sections: `.container`, `.section`, `.eyebrow`, `.btn`, `.chip`,
`.card`. Everything else is a scoped `<style>` block inside its own component,
so a section's CSS never leaks.

Three things to keep in mind if you change the design:

- All three text tiers clear **WCAG AA (4.5:1)** against `--bg-elev`, the
  lightest surface they sit on. `--text-dim` is the tight one at 4.84:1.
- Do **not** add `fill` to the global `svg` rule — CSS beats presentation
  attributes and would break the solid brand icons.
- Never make text legibility depend on `backdrop-filter`. The mobile menu is
  deliberately opaque, and the sticky header only goes translucent inside an
  `@supports` block.

The grids are `repeat(auto-fit, minmax(min(100%, Xrem), 1fr))`, and the `X` is
chosen per section so the cards land evenly: `20rem` in Work gives three across
(and collapses to one full-width feature card for a single-project group),
`22rem` in Skills and Contact gives two. Contact also promotes a lone final
card to full width, so an odd count never leaves a gap.

### Page behaviour

`BaseLayout.astro` carries one small module script: sticky-header state, the
mobile menu, a nav scroll-spy, and reveal-on-scroll. It is deliberately in the
layout rather than in a page, because the layout is what adds the `.js` class
the reveal CSS keys off — split them up and any new page would render its
content invisible. The script is shared by both languages, so the menu's
accessible labels are passed in via `data-label-open` / `data-label-close`
rather than hardcoded.

Everything degrades: without JavaScript the page is fully readable, and
`prefers-reduced-motion` disables the reveals and hover transforms.

---

## Deploying to Cloudflare Pages

`wrangler.toml` declares the project name and build output directory, so
neither route needs dashboard configuration.

### Option A — Git integration (in use)

**Workers & Pages → Create → Pages → Connect to Git**, pick the repo, and
confirm:

| Setting                | Value           |
| ---------------------- | --------------- |
| Framework preset       | Astro           |
| Build command          | `npm run build` |
| Build output directory | `dist`          |

Cloudflare reads `.nvmrc` for the Node version. Every push to `main` then
deploys automatically, and pull requests get preview URLs.

### Option B — Direct upload

```bash
npm run build
npx wrangler pages deploy
```

### Custom domain

In the Pages project: **Custom domains → Set up a domain** → `gorkemturhan.com`,
then repeat for `www.gorkemturhan.com`. The domain's DNS is on Cloudflare, so
the records and TLS certificate are created automatically.

`astro.config.mjs` sets `site: 'https://gorkemturhan.com'`, which is what
canonical links, `hreflang` alternates, Open Graph URLs and the sitemap are
built from — update it if the domain ever changes.

> Some corporate networks block `*.pages.dev` wholesale (it is free hosting, so
> it lands on phishing blocklists). If the preview URL refuses to connect but
> `cloudflare.com` loads fine, that is why — the custom domain is unaffected.

---

## License

Content and design © Görkem Turhan. The code is free to learn from.
