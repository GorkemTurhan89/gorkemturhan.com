/**
 * Central site configuration.
 *
 * Everything that identifies the site lives here — edit this file and the
 * whole page updates. No component hardcodes a name, URL or handle.
 */

export const site = {
  name: 'Görkem Turhan',
  /** Used for the header monogram. */
  initials: 'GT',
  role: 'QA Automation Engineer / SDET',
  tagline:
    'ISTQB-certified test engineer with 5+ years across manual and automation testing — API, UI and database layers, from requirement analysis through production monitoring.',
  location: 'İstanbul, Türkiye',

  /** Canonical origin — no trailing slash. Used for canonical + OG URLs. */
  url: 'https://gorkemturhan.com',

  /** Meta description, ~155 characters. */
  description:
    'Görkem Turhan — QA Automation Engineer and SDET with 5+ years in manual and automation testing across API, UI and database layers. Playwright, Selenium, Java, TypeScript, ISTQB certified.',

  /** Comma-separated keywords for the meta keywords tag. */
  keywords: [
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

  /** Open Graph / Twitter share image, relative to the site root. */
  ogImage: '/og.png',

  /** Downloadable CV, served from `public/`. */
  cv: {
    href: '/gorkem-turhan-cv.pdf',
    /** Filename the browser saves it as. */
    filename: 'Gorkem-Turhan-CV.pdf',
  },

  /** Set to false to hide the "Available for work" pill in the header. */
  availableForWork: true,
} as const;

export interface SocialLink {
  /** Short label shown on buttons and nav. */
  label: string;
  /** The public handle or address shown under the label on contact cards. */
  handle: string;
  href: string;
  /** Key into the `Icon` component's sprite. */
  icon: 'linkedin' | 'github' | 'mail' | 'upwork' | 'download';
  /** Set on same-origin file links so the browser saves rather than navigates. */
  download?: string;
}

export const socials = {
  linkedin: {
    label: 'LinkedIn',
    handle: '/in/gorkem-turhan',
    href: 'https://www.linkedin.com/in/gorkem-turhan/',
    icon: 'linkedin',
  },
  github: {
    label: 'GitHub',
    handle: '@GorkemTurhan89',
    href: 'https://github.com/GorkemTurhan89',
    icon: 'github',
  },
  email: {
    label: 'Email',
    handle: 'gorkemturhan41@gmail.com',
    href: 'mailto:gorkemturhan41@gmail.com',
    icon: 'mail',
  },
  cv: {
    label: 'Download CV',
    handle: 'PDF · 2 pages',
    href: site.cv.href,
    icon: 'download',
    download: site.cv.filename,
  },
  upwork: {
    label: 'Upwork',
    handle: 'Hire me on Upwork',
    href: 'https://www.upwork.com/freelancers/~015aee3872931557d6',
    icon: 'upwork',
  },
} as const satisfies Record<string, SocialLink>;

/**
 * Order of the cards in the contact section: the four ways to reach me,
 * then the CV. With an odd count the last card spans the full row, which
 * is why the download sits at the end.
 *
 * Entries without an `href` are dropped, so an unfinished link can never
 * render as a dead card.
 */
export const contactLinks: SocialLink[] = [
  socials.linkedin,
  socials.github,
  socials.email,
  socials.upwork,
  socials.cv,
].filter((link) => link.href.length > 0);

export interface NavItem {
  label: string;
  href: string;
}

/** Anchor targets must match the `id` of each <section> in index.astro. */
export const navItems: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];
