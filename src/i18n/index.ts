/**
 * Bilingual plumbing.
 *
 * English lives at `/`, Turkish at `/tr/` — configured via `i18n` in
 * astro.config.mjs, which is what makes `Astro.currentLocale` work inside
 * every component without prop drilling.
 *
 * This file holds the machinery plus the page chrome (nav, buttons, section
 * headings). The content itself — about, skills, experience, projects — lives
 * in `src/data/`, with each translatable field typed as `Localized<T>`.
 */

export const LANGS = ['en', 'tr'] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = 'en';

/** Any value that exists in both languages. */
export type Localized<T = string> = Record<Lang, T>;

export const LANG_META: Record<Lang, { name: string; short: string; htmlLang: string; ogLocale: string }> = {
  en: { name: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_US' },
  tr: { name: 'Türkçe', short: 'TR', htmlLang: 'tr', ogLocale: 'tr_TR' },
};

/** Root-relative path for a language. English is un-prefixed. */
export const pathFor = (lang: Lang): string => (lang === DEFAULT_LANG ? '/' : `/${lang}/`);

/** Narrow Astro.currentLocale (string | undefined) down to our union. */
function toLang(locale: string | undefined): Lang {
  return (LANGS as readonly string[]).includes(locale ?? '') ? (locale as Lang) : DEFAULT_LANG;
}

/**
 * Call once at the top of a component:
 *
 *     const { lang, t, ui } = useI18n(Astro.currentLocale);
 *
 * `t()` picks the active translation out of any Localized value.
 */
export function useI18n(locale: string | undefined) {
  const lang = toLang(locale);
  return {
    lang,
    t: <T,>(value: Localized<T>): T => value[lang],
    ui: UI[lang],
  };
}

interface Ui {
  skipToContent: string;
  availableForWork: string;
  backToTop: string;
  rightsReserved: string;
  openMenu: string;
  closeMenu: string;
  backToTopAria: string;
  switchLanguage: string;
  nav: { about: string; skills: string; experience: string; work: string; contact: string };
  hero: { downloadCv: string; scrollToAbout: string };
  sections: {
    about: { title: string };
    skills: { title: string; lead: string };
    experience: { title: string; lead: string };
    work: { title: string; lead: string };
    contact: { title: string; lead: string };
  };
  work: {
    code: string;
    liveDemo: string;
    /** Accessible names, built per project. */
    codeAria: (project: string) => string;
    demoAria: (project: string) => string;
  };
  contact: {
    /** Shown on the email card once the address reaches the clipboard. */
    copied: string;
  };
}

const UI: Record<Lang, Ui> = {
  en: {
    skipToContent: 'Skip to content',
    availableForWork: 'Available for work',
    backToTop: 'Back to top',
    rightsReserved: 'All rights reserved.',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    backToTopAria: 'back to top',
    switchLanguage: 'Switch language',
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      work: 'Work',
      contact: 'Contact',
    },
    hero: {
      downloadCv: 'Download CV',
      scrollToAbout: 'Scroll to About',
    },
    sections: {
      about: { title: 'About me' },
      skills: {
        title: 'What I work with',
        lead: 'The tools I reach for, grouped by where they sit in the delivery cycle — from writing the suite to watching what it catches in production.',
      },
      experience: {
        title: 'Where I’ve worked',
        lead: 'Roles in reverse-chronological order, with the parts that moved the needle.',
      },
      work: {
        title: 'Selected projects',
        lead: 'Test frameworks and side projects — the code behind the CV bullets.',
      },
      contact: {
        title: 'Let’s work together',
        lead: 'Open to QA automation roles, SDET positions and freelance engagements. The fastest way to reach me is email or LinkedIn — the full CV is a click away.',
      },
    },
    work: {
      code: 'Code',
      liveDemo: 'Live demo',
      codeAria: (project) => `Code for ${project} on GitHub`,
      demoAria: (project) => `Live demo of ${project}`,
    },
    contact: {
      copied: 'Address copied',
    },
  },

  tr: {
    skipToContent: 'İçeriğe geç',
    availableForWork: 'Yeni işlere açığım',
    backToTop: 'Başa dön',
    rightsReserved: 'Tüm hakları saklıdır.',
    openMenu: 'Menüyü aç',
    closeMenu: 'Menüyü kapat',
    backToTopAria: 'başa dön',
    switchLanguage: 'Dili değiştir',
    nav: {
      about: 'Hakkımda',
      skills: 'Yetkinlikler',
      experience: 'Deneyim',
      work: 'Projeler',
      contact: 'İletişim',
    },
    hero: {
      downloadCv: 'CV’yi indir',
      scrollToAbout: 'Hakkımda bölümüne in',
    },
    sections: {
      about: { title: 'Hakkımda' },
      skills: {
        title: 'Kullandığım teknolojiler',
        lead: 'Uzandığım araçlar, teslim döngüsündeki yerlerine göre gruplanmış — testi yazmaktan, canlıda ne yakaladığını izlemeye kadar.',
      },
      experience: {
        title: 'Çalıştığım yerler',
        lead: 'Roller tersten kronolojik sırayla, fark yaratan kısımlarıyla.',
      },
      work: {
        title: 'Seçili projeler',
        lead: 'Test framework’leri ve yan projeler — CV maddelerinin arkasındaki kod.',
      },
      contact: {
        title: 'Birlikte çalışalım',
        lead: 'QA otomasyon rollerine, SDET pozisyonlarına ve freelance işlere açığım. Bana en hızlı e-posta veya LinkedIn üzerinden ulaşabilirsin — CV’nin tamamı bir tık ötede.',
      },
    },
    work: {
      code: 'Kod',
      liveDemo: 'Canlı demo',
      codeAria: (project) => `${project} projesinin GitHub’daki kodu`,
      demoAria: (project) => `${project} projesinin canlı demosu`,
    },
    contact: {
      copied: 'Adres kopyalandı',
    },
  },
};
