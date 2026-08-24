/**
 * Central site configuration.
 *
 * Everything that identifies the site lives here — edit this file and the
 * whole page updates. No component hardcodes a name, URL or handle.
 *
 * Fields typed `Localized<T>` carry both languages; see `src/i18n/`.
 */

import type { Localized } from '../i18n';

export const site = {
  name: 'Görkem Turhan',
  /** Used for the header monogram. */
  initials: 'GT',

  role: {
    en: 'QA Automation Engineer / SDET',
    tr: 'QA Otomasyon Mühendisi / SDET',
  } satisfies Localized,

  tagline: {
    en: 'ISTQB-certified test engineer with 5+ years across manual and automation testing — API, UI and database layers, from requirement analysis through production monitoring.',
    tr: 'ISTQB sertifikalı test mühendisiyim. 5+ yıldır manuel ve otomasyon testleri yapıyorum — API, arayüz ve veritabanı katmanlarında, gereksinim analizinden canlı ortam izlemeye kadar.',
  } satisfies Localized,

  location: {
    en: 'İstanbul, Türkiye',
    tr: 'İstanbul, Türkiye',
  } satisfies Localized,

  /** Canonical origin — no trailing slash. Used for canonical + OG URLs. */
  url: 'https://gorkemturhan.com',

  /** Meta description, ~155 characters. */
  description: {
    en: 'Görkem Turhan — QA Automation Engineer and SDET with 5+ years in manual and automation testing across API, UI and database layers. Playwright, Selenium, Java, TypeScript, ISTQB certified.',
    tr: 'Görkem Turhan — QA Otomasyon Mühendisi ve SDET. API, arayüz ve veritabanı katmanlarında 5+ yıllık manuel ve otomasyon test deneyimi. Playwright, Selenium, Java, TypeScript, ISTQB sertifikalı.',
  } satisfies Localized,

  keywords: {
    en: [
      'QA Automation Engineer',
      'SDET',
      'Software Test Engineer',
      'Playwright',
      'Selenium',
      'TypeScript',
      'Java',
      'API Testing',
      'REST Assured',
      'ISTQB',
      'Görkem Turhan',
    ],
    tr: [
      'QA Otomasyon Mühendisi',
      'SDET',
      'Yazılım Test Mühendisi',
      'test otomasyonu',
      'Playwright',
      'Selenium',
      'TypeScript',
      'Java',
      'API testi',
      'ISTQB',
      'Görkem Turhan',
    ],
  } satisfies Localized<string[]>,

  /** Open Graph / Twitter share image per language, relative to the site root. */
  ogImage: {
    en: '/og.png',
    tr: '/og-tr.png',
  } satisfies Localized,

  /** Downloadable CV, served from `public/`. */
  cv: {
    href: '/gorkem-turhan-cv.pdf',
    /** Filename the browser saves it as. */
    filename: 'Gorkem-Turhan-CV.pdf',
  },

  /** Flip to true to show the "Available for work" pill in the header. */
  availableForWork: false,
} as const;

export interface SocialLink {
  /** Short label shown on buttons and contact cards. */
  label: Localized;
  /** The public handle or address shown under the label. */
  handle: Localized;
  href: string;
  /** Key into the `Icon` component's sprite. */
  icon: 'linkedin' | 'github' | 'mail' | 'download';
  /** Set on same-origin file links so the browser saves rather than navigates. */
  download?: string;
}

const both = (value: string): Localized => ({ en: value, tr: value });

export const socials = {
  linkedin: {
    label: both('LinkedIn'),
    handle: both('/in/gorkem-turhan'),
    href: 'https://www.linkedin.com/in/gorkem-turhan/',
    icon: 'linkedin',
  },
  github: {
    label: both('GitHub'),
    handle: both('@GorkemTurhan89'),
    href: 'https://github.com/GorkemTurhan89',
    icon: 'github',
  },
  email: {
    label: { en: 'Email', tr: 'E-posta' },
    handle: both('gorkemturhan41@gmail.com'),
    href: 'mailto:gorkemturhan41@gmail.com',
    icon: 'mail',
  },
  cv: {
    label: { en: 'Download CV', tr: 'CV’yi indir' },
    handle: { en: 'PDF · 2 pages', tr: 'PDF · 2 sayfa' },
    href: site.cv.href,
    icon: 'download',
    download: site.cv.filename,
  },
} as const satisfies Record<string, SocialLink>;

/**
 * Order of the cards in the contact section: the three ways to reach me,
 * then the CV, which closes the set.
 *
 * Entries without an `href` are dropped, so an unfinished link can never
 * render as a dead card.
 */
export const contactLinks: SocialLink[] = [
  socials.linkedin,
  socials.github,
  socials.email,
  socials.cv,
].filter((link) => link.href.length > 0);

export interface NavItem {
  /** Key into `ui.nav` — the label itself is translated in src/i18n/. */
  key: 'about' | 'skills' | 'experience' | 'work' | 'contact';
  href: string;
}

/** Anchor targets must match the `id` of each <section> in Portfolio.astro. */
export const navItems: NavItem[] = [
  { key: 'about', href: '#about' },
  { key: 'skills', href: '#skills' },
  { key: 'experience', href: '#experience' },
  { key: 'work', href: '#work' },
  { key: 'contact', href: '#contact' },
];
