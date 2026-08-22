// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  /* Absolute origin — used for canonical links, Open Graph URLs and sitemap. */
  site: 'https://gorkemturhan.com',

  /* English at `/`, Turkish at `/tr/`. This is also what makes
     `Astro.currentLocale` resolve inside every component, so no page has to
     thread the language down through props. */
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'tr'],
    routing: {
      prefixDefaultLocale: false,
    },
  },

  build: {
    /* Inlines small stylesheets into the HTML, saving a round trip on a
       page this size while leaving larger ones as cacheable files. */
    inlineStylesheets: 'auto',
  },
});
