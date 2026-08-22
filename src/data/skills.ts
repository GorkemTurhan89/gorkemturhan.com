import type { Localized } from '../i18n';

export interface SkillGroup {
  title: Localized;
  /** One-line description of what this group covers. */
  summary: Localized;
  /** Tool names — the same in both languages. */
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: { en: 'Test Automation', tr: 'Test Otomasyonu' },
    summary: {
      en: 'End-to-end and UI coverage, built on the Page Object Model.',
      tr: 'Page Object Model üzerine kurulu uçtan uca ve arayüz kapsamı.',
    },
    items: [
      'Playwright',
      'Selenium',
      'Cucumber (BDD)',
      'Katalon Studio',
      'TestNG / JUnit',
      'Appium',
    ],
  },
  {
    title: { en: 'Languages & Data', tr: 'Diller & Veri' },
    summary: {
      en: 'What the frameworks and the queries are written in.',
      tr: 'Framework’leri ve sorguları yazdığım diller.',
    },
    items: ['TypeScript', 'Java', 'JavaScript', 'C#', 'Groovy', 'SQL'],
  },
  {
    title: { en: 'API & Performance', tr: 'API & Performans' },
    summary: {
      en: 'Verification pushed below the UI, where it runs fast.',
      tr: 'Doğrulamayı arayüzün altına indirmek — orada hızlı çalışır.',
    },
    items: ['API Testing', 'REST Assured', 'Postman', 'Swagger', 'JMeter'],
  },
  {
    title: { en: 'Process & Observability', tr: 'Süreç & İzlenebilirlik' },
    summary: {
      en: 'Shipping the suite, then watching what it ships.',
      tr: 'Testleri sahaya çıkarmak, sonra çıkanı izlemek.',
    },
    items: [
      'Manual Testing',
      'Agile / Scrum',
      'Git / GitHub',
      'CI/CD',
      'Jira / X-ray',
      'Sentry',
      'Grafana',
    ],
  },
];
