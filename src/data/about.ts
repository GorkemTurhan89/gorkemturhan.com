import type { Localized } from '../i18n';

/**
 * The About section.
 *
 * Paragraphs are HTML strings rendered with `set:html`. That is deliberate:
 * it keeps the emphasis markup next to the sentence it belongs to in both
 * languages, and it sidesteps Astro's whitespace-collapse behaviour around
 * inline tags (see scripts/check-content.mjs).
 *
 * Only `<strong>` and `<em>` are expected here. Never put anything into these
 * strings that did not come from this file.
 */
export const aboutParagraphs: Localized<string[]> = {
  en: [
    `I’m a software test engineer with more than five years across manual and
     automation testing — API, UI and database layers — and I own quality
     through the whole SDLC, from requirement analysis to production
     monitoring.`,

    `Most of my automation is built with <strong>Playwright</strong> and
     <strong>TypeScript</strong>, or Java frameworks using
     <strong>Selenium</strong> and <strong>Cucumber</strong>, always on the Page
     Object Model so suites stay maintainable as the product moves. I push
     verification down to the <strong>API</strong> layer with
     <strong>REST Assured</strong> and Postman against Swagger specs, and reach
     for <strong>SQL</strong> when the truth lives in the database rather than
     the UI.`,

    `The part I care most about is what happens after release. I own live
     monitoring during cross-team go-lives, using <strong>Sentry</strong> and
     <strong>Grafana</strong> to catch real production errors and triage
     incidents fast — finding the root cause and getting things stable again.
     That feedback loop is also what tells me which regression scenarios are
     worth automating next.`,

    `I still value <strong>manual and exploratory testing</strong> — automation
     confirms what you already thought to ask, while exploration is how you find
     the questions worth automating. Risk-based, either way: fewer surprises in
     production, and a team that can ship without holding its breath.`,
  ],

  tr: [
    `Beş yılı aşkın süredir manuel ve otomasyon testleri yapan bir yazılım test
     mühendisiyim — API, arayüz ve veritabanı katmanlarında. Kaliteyi yazılım
     yaşam döngüsünün tamamında sahipleniyorum: gereksinim analizinden canlı
     ortam izlemeye kadar.`,

    `Otomasyonlarımın çoğunu <strong>Playwright</strong> ve
     <strong>TypeScript</strong> ile, ya da <strong>Selenium</strong> ve
     <strong>Cucumber</strong> kullanan Java framework’leriyle kuruyorum; her
     zaman Page Object Model üzerine, ki ürün değiştikçe testler bakılabilir
     kalsın. Doğrulamayı <strong>API</strong> katmanına indiriyorum — Swagger
     şemalarına karşı <strong>REST Assured</strong> ve Postman ile. Gerçek,
     arayüzde değil veritabanında duruyorsa <strong>SQL</strong>’e uzanıyorum.`,

    `En çok önemsediğim kısım, sürüm çıktıktan sonrası. Ekipler arası
     go-live’larda canlı izlemeyi ben üstleniyorum; <strong>Sentry</strong> ve
     <strong>Grafana</strong> ile gerçek production hatalarını yakalayıp olayları
     hızlıca triyaj ediyorum — kök nedeni bulup sistemi yeniden oturtmak. Bu
     geri bildirim döngüsü aynı zamanda hangi regresyon senaryosunu otomatize
     etmeye değeceğini de söylüyor.`,

    `<strong>Manuel ve keşif testlerine</strong> hâlâ değer veriyorum —
     otomasyon zaten aklına gelmiş soruyu doğrular, keşif ise otomatize etmeye
     değer soruları bulmanın yoludur. İkisi de risk odaklı: canlıda daha az
     sürpriz, nefesini tutmadan sürüm çıkarabilen bir ekip.`,
  ],
};

export interface Fact {
  label: Localized;
  value: Localized;
}

/** The quick-facts card beside the summary. */
export const facts: Fact[] = [
  {
    label: { en: 'Experience', tr: 'Deneyim' },
    value: { en: '5+ years in software testing', tr: 'Yazılım testinde 5+ yıl' },
  },
  {
    label: { en: 'Certified', tr: 'Sertifika' },
    value: { en: 'ISTQB Foundation Level', tr: 'ISTQB Foundation Level' },
  },
  {
    label: { en: 'Core stack', tr: 'Ana teknolojiler' },
    value: {
      en: 'Playwright · TypeScript · Selenium · Java',
      tr: 'Playwright · TypeScript · Selenium · Java',
    },
  },
  {
    label: { en: 'Also', tr: 'Ayrıca' },
    value: {
      en: 'REST Assured · SQL · Sentry & Grafana',
      tr: 'REST Assured · SQL · Sentry & Grafana',
    },
  },
  {
    label: { en: 'Languages', tr: 'Diller' },
    value: {
      en: 'Turkish · English · Spanish (enough to order dinner)',
      tr: 'Türkçe · İngilizce · İspanyolca (yemek söyleyecek kadar)',
    },
  },
];
