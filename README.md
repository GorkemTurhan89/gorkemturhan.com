# gorkemturhan.com

Personal portfolio of **Görkem Turhan** — QA Automation Engineer / SDET.

A single-page, statically generated site: dark, minimal, no client-side
framework. The whole page ships as one HTML file plus ~19 kB of CSS and a few
kB of vanilla JS.

**Stack:** [Astro](https://astro.build) 7 · vanilla CSS (custom properties, no
preprocessor) · no runtime dependencies · deployed to Cloudflare Pages.

---

## Getting started

Requires **Node.js 22.12 or newer** (see `.nvmrc`).

```bash
npm install
npm run dev      # http://localhost:4321
```

| Command           | What it does                                        |
| ----------------- | --------------------------------------------------- |
| `npm run dev`     | Dev server with hot reload                          |
| `npm run build`   | Production build into `dist/`                       |
| `npm run check`   | Lints the built page (see *Editing prose* below)    |
| `npm run preview` | Serve the built `dist/` locally                     |

---

## Editing the content

**All copy lives in `src/data/` — you should not need to touch a component to
change what the page says.**

| File                     | Controls                                                          |
| ------------------------ | ----------------------------------------------------------------- |
| `src/data/site.ts`       | Name, role, tagline, SEO, social links, CV path, nav              |
| `src/data/skills.ts`     | The four skill groups and their chips                             |
| `src/data/experience.ts` | Timeline entries (most recent first)                              |
| `src/data/projects.ts`   | Featured work, grouped into QA and Development                    |

Each file is typed, so your editor will tell you if a field is missing.

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
- **Nav anchors.** `navItems` in `site.ts` must match the `id` of each
  `<section>` in `src/pages/index.astro`. The scroll-spy derives its targets
  from those hrefs.

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
up on the rendered page, so after editing any prose run:

```bash
npm run build && npm run check
```

`scripts/check-content.mjs` scans the built HTML for this, plus empty hrefs and
references to local files that were not shipped. Zero dependencies.

### Still to do

- [ ] The project descriptions in `src/data/projects.ts` were written from each
      repository's structure, since most of the repos have no README. Tighten
      them as you polish the repos.

### Updating the CV

Replace `public/gorkem-turhan-cv.pdf`. It is referenced once, from
`site.cv` in `src/data/site.ts`, and feeds both the hero button and the
contact card. Update `site.cv.filename` if you want a different saved filename,
and the `handle` on `socials.cv` if the page count changes.

---

## Project structure

```
├── public/                  Served as-is at the site root
│   ├── _headers             Cloudflare Pages security + caching headers
│   ├── apple-touch-icon.png 180×180 home-screen icon
│   ├── favicon.svg
│   ├── gorkem-turhan-cv.pdf The downloadable CV
│   ├── og.png               1200×630 Open Graph / Twitter card image
│   ├── robots.txt
│   ├── site.webmanifest
│   └── sitemap.xml
├── scripts/
│   └── check-content.mjs    Content lint for the built HTML
├── src/
│   ├── components/          One component per section, plus Icon + SectionHeading
│   ├── data/                All site content (see above)
│   ├── layouts/
│   │   └── BaseLayout.astro <head>, SEO/OG meta, JSON-LD, page behaviour script
│   ├── pages/
│   │   └── index.astro      Composes the sections
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

### Page behaviour

`BaseLayout.astro` carries one small module script: sticky-header state, the
mobile menu, a nav scroll-spy, and reveal-on-scroll. It is deliberately in the
layout rather than in `index.astro`, because the layout is what adds the `.js`
class the reveal CSS keys off — split them up and any new page would render its
content invisible.

Everything degrades: without JavaScript the page is fully readable, and
`prefers-reduced-motion` disables the reveals and hover transforms.

---

## Deploying to Cloudflare Pages

`wrangler.toml` already declares the project name and build output directory,
so neither route needs dashboard configuration.

### Option A — Git integration (recommended)

Push to GitHub, then in the Cloudflare dashboard: **Workers & Pages → Create →
Pages → Connect to Git**, pick the repo, and confirm:

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
then repeat for `www.gorkemturhan.com`. If the domain's DNS is already on
Cloudflare, the records and TLS certificate are created for you.

`astro.config.mjs` sets `site: 'https://gorkemturhan.com'`, which is what
canonical links, Open Graph URLs and the sitemap are built from — update it if
the domain ever changes.

---

## License

Content and design © Görkem Turhan. The code is free to learn from.
