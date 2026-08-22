// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  /* Absolute origin — used for canonical links, Open Graph URLs and sitemap. */
  site: 'https://gorkemturhan.com',

  build: {
    /* Inlines small stylesheets into the HTML, saving a round trip on a
       page this size while leaving larger ones as cacheable files. */
    inlineStylesheets: 'auto',
  },
});
