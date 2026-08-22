import type { Localized } from '../i18n';

export interface Project {
  title: Localized;
  description: Localized;
  /** Tool names — the same in both languages. */
  technologies: string[];
  /** Omit to hide the "Code" link. */
  github?: string;
  /** Omit to hide the "Live demo" link. */
  demo?: string;
  /** Renders a small badge in the card corner. */
  badge?: Localized;
}

export interface ProjectGroup {
  title: Localized;
  summary: Localized;
  projects: Project[];
}

const GH = 'https://github.com/GorkemTurhan89';

/**
 * These descriptions were written from each repository's actual structure
 * (build files, config, folder layout) rather than from a README, since most
 * of the repos do not have one. Tighten the wording — and add a README to the
 * repos themselves — as you polish them; this file is the only place the
 * cards are defined.
 *
 * `github` and `demo` are both optional: leave one out and its link simply
 * disappears from the card.
 */
export const projectGroups: ProjectGroup[] = [
  {
    title: { en: 'QA Projects', tr: 'QA Projeleri' },
    summary: {
      en: 'Test frameworks and automation harnesses.',
      tr: 'Test framework’leri ve otomasyon altyapıları.',
    },
    projects: [
      {
        title: { en: 'Playwright E2E Suite', tr: 'Playwright E2E Test Seti' },
        description: {
          en: 'End-to-end tests in Playwright and TypeScript, with the runner configured through playwright.config.ts and the suite wired into a GitHub Actions workflow so it runs on every push.',
          tr: 'Playwright ve TypeScript ile uçtan uca testler. Koşucu playwright.config.ts üzerinden yapılandırıldı ve test seti bir GitHub Actions iş akışına bağlandı; her push’ta çalışıyor.',
        },
        technologies: ['Playwright', 'TypeScript', 'GitHub Actions'],
        github: `${GH}/playwrightTutorial`,
        badge: { en: 'CI enabled', tr: 'CI bağlı' },
      },
      {
        title: { en: 'Roombadi Test Framework', tr: 'Roombadi Test Framework’ü' },
        description: {
          en: 'The test automation framework built during the Roombadi engagement — a standalone Java module covering the product’s API and UI flows.',
          tr: 'Roombadi işi sırasında kurduğum test otomasyon framework’ü — ürünün API ve arayüz akışlarını kapsayan bağımsız bir Java modülü.',
        },
        technologies: ['Java', 'Selenium', 'API Testing'],
        github: `${GH}/RoomBadi`,
      },
      {
        title: { en: 'Mobile Automation Sandbox', tr: 'Mobil Otomasyon Denemeleri' },
        description: {
          en: 'Appium experiments in Java: driver setup, locator strategies and gesture handling for native mobile flows, kept as a reference for mobile coverage.',
          tr: 'Java ile Appium denemeleri: sürücü kurulumu, element bulma stratejileri ve native mobil akışlarda hareket yönetimi. Mobil kapsam için başvuru kaynağı olarak duruyor.',
        },
        technologies: ['Appium', 'Java'],
        github: `${GH}/appiumTry`,
      },
    ],
  },
  {
    title: { en: 'Development Projects', tr: 'Geliştirme Projeleri' },
    summary: {
      en: 'What I build when I am not writing tests.',
      tr: 'Test yazmadığım zamanlarda geliştirdiklerim.',
    },
    projects: [
      {
        title: { en: 'Pivot — Payment Plan CRM', tr: 'Pivot — Ödeme Planı CRM’i' },
        description: {
          en: 'An ASP.NET Core MVC application for managing payment plans and related services. Full stack: controllers, domain models and Razor views over an Entity Framework data layer with versioned migrations — the project where I work on the other side of the API I usually test.',
          tr: 'Ödeme planlarını ve ilgili servisleri yöneten bir ASP.NET Core MVC uygulaması. Uçtan uca: controller’lar, domain modelleri ve Razor view’ları, sürümlenmiş migration’lara sahip bir Entity Framework veri katmanı üzerinde — genelde test ettiğim API’nin diğer tarafında çalıştığım proje.',
        },
        technologies: ['C#', 'ASP.NET Core', 'Entity Framework', 'MVC', 'SQL'],
        github: `${GH}/pivot`,
        badge: { en: 'Active', tr: 'Aktif' },
      },
    ],
  },
];
