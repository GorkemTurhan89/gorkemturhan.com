import type { Localized } from '../i18n';

export interface ExperienceEntry {
  /** e.g. "03.2024 — Present". Rendered in the timeline rail. */
  period: Localized;
  role: Localized;
  /** Company names stay as they are in both languages. */
  company: string;
  /** Optional — omit to hide. */
  location?: Localized;
  /** 2–4 short, outcome-focused bullets read best. */
  highlights: Localized<string[]>;
  /** Shown as chips under the bullets; tool names, so not translated. */
  stack: string[];
}

/**
 * Software roles only, most recent first. The full history — including the
 * swimming-instructor and insurance claims roles that predate the move into
 * QA — is in the downloadable CV.
 */
export const experience: ExperienceEntry[] = [
  {
    period: { en: '03.2024 — Present', tr: '03.2024 — Halen' },
    role: { en: 'QA Automation Engineer', tr: 'QA Otomasyon Mühendisi' },
    company: 'Mars Athletic Club',
    location: { en: 'İstanbul', tr: 'İstanbul' },
    highlights: {
      en: [
        'Own live monitoring during cross-team production releases, providing rapid incident triage through go-lives.',
        'Track real-time production errors with Sentry and Grafana, and became the go-to person for live-incident troubleshooting and root-cause analysis.',
        'Shifted critical regression scenarios into automation, raising release confidence and cutting manual verification effort.',
        'Apply BDD with Selenium-Cucumber, Katalon Studio and Playwright (TypeScript), keeping suites maintainable through the Page Object Model.',
        'Validate APIs with Postman and automate critical flows with REST Assured against Swagger specifications.',
      ],
      tr: [
        'Ekipler arası canlı sürümlerde izlemeyi üstleniyorum; go-live sırasında hızlı olay triyajı sağlıyorum.',
        'Sentry ve Grafana ile gerçek zamanlı production hatalarını takip ediyorum; canlı olay çözümlemesi ve kök neden analizinde başvurulan kişi hâline geldim.',
        'Kritik regresyon senaryolarını otomasyona taşıyarak sürüm güvenini artırdım ve manuel doğrulama yükünü azalttım.',
        'Selenium-Cucumber, Katalon Studio ve Playwright (TypeScript) ile BDD uyguluyorum; Page Object Model sayesinde testler bakılabilir kalıyor.',
        'API’leri Postman ile doğruluyor, kritik akışları Swagger şemalarına karşı REST Assured ile otomatize ediyorum.',
      ],
    },
    stack: [
      'Playwright',
      'TypeScript',
      'Selenium',
      'Cucumber',
      'REST Assured',
      'Sentry',
      'Grafana',
    ],
  },
  {
    period: { en: '09.2023 — 03.2024', tr: '09.2023 — 03.2024' },
    role: { en: 'Software Tester', tr: 'Yazılım Test Uzmanı' },
    company: 'TransPerfect',
    location: { en: 'Contract', tr: 'Sözleşmeli' },
    highlights: {
      en: [
        'Manual functional testing and localisation QA against common acceptance criteria.',
      ],
      tr: [
        'Ortak kabul kriterlerine göre manuel fonksiyonel test ve yerelleştirme kalite kontrolü.',
      ],
    },
    stack: ['Manual Testing', 'Localisation QA'],
  },
  {
    period: { en: '07.2023 — 10.2023', tr: '07.2023 — 10.2023' },
    role: { en: 'Software Tester', tr: 'Yazılım Test Uzmanı' },
    company: 'Roombadi',
    location: { en: 'Contract', tr: 'Sözleşmeli' },
    highlights: {
      en: [
        'Manual API and UI testing, alongside a dedicated test automation framework built for the product.',
      ],
      tr: [
        'Manuel API ve arayüz testlerinin yanı sıra, ürüne özel bir test otomasyon framework’ü kurdum.',
      ],
    },
    stack: ['Manual Testing', 'API Testing', 'Java'],
  },
  {
    period: { en: '04.2023 — 09.2023', tr: '04.2023 — 09.2023' },
    role: { en: 'Software Tester', tr: 'Yazılım Test Uzmanı' },
    company: 'Crocus Media',
    location: { en: 'Contract', tr: 'Sözleşmeli' },
    highlights: {
      en: ['Manual API and UI testing across the product surface.'],
      tr: ['Ürünün tamamında manuel API ve arayüz testleri.'],
    },
    stack: ['Manual Testing', 'API Testing'],
  },
  {
    period: { en: '06.2022 — 06.2023', tr: '06.2022 — 06.2023' },
    role: { en: 'Software Tester', tr: 'Yazılım Test Uzmanı' },
    company: 'Library Project',
    highlights: {
      en: [
        'Worked to Agile methodology and Scrum ceremonies, building test cases from user stories and acceptance criteria.',
        'Implemented a BDD Selenium-Cucumber framework with Maven and the Page Object Model, then kept the automated suite aligned with each software update.',
        'Processed issues with black-box techniques before automation coverage was in place.',
      ],
      tr: [
        'Agile metodolojisi ve Scrum törenlerine göre çalıştım; kullanıcı hikâyeleri ve kabul kriterlerinden test senaryoları oluşturdum.',
        'Maven ve Page Object Model ile BDD tabanlı bir Selenium-Cucumber framework’ü kurdum; otomatik testleri her yazılım güncellemesiyle uyumlu tuttum.',
        'Otomasyon kapsamı oluşmadan önce hataları kara kutu teknikleriyle ele aldım.',
      ],
    },
    stack: ['Selenium', 'Cucumber', 'Java', 'Maven', 'Agile / Scrum'],
  },
  {
    period: { en: '08.2021 — 04.2022', tr: '08.2021 — 04.2022' },
    role: { en: 'Software Tester', tr: 'Yazılım Test Uzmanı' },
    company: 'Conversation24 — Cobrowser',
    highlights: {
      en: [
        'Ran manual UI and API tests to specification plus exploratory testing for customer support and call-centre flows.',
        'Automated UI tests with Selenium WebDriver and TestNG in Java, and tested APIs manually with Postman.',
        'Filed bug reports across functional, visual, content and crash categories; extracted issue content programmatically with Apache POI.',
      ],
      tr: [
        'Müşteri destek ve çağrı merkezi akışları için şartnameye uygun manuel arayüz ve API testlerinin yanında keşif testleri yürüttüm.',
        'Java ile Selenium WebDriver ve TestNG kullanarak arayüz testlerini otomatize ettim; API testlerini Postman ile manuel yaptım.',
        'Fonksiyonel, görsel, içerik ve çökme kategorilerinde hata kayıtları açtım; Apache POI ile hata içeriklerini programatik olarak çıkardım.',
      ],
    },
    stack: ['Selenium', 'TestNG', 'Java', 'Postman', 'Apache POI'],
  },
];
