// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Change this to your real domain once it's connected in Cloudflare Pages.
  // It's used for canonical URLs and Open Graph image links.
  site: 'https://tianproductdesign.com',
  output: 'static',
  build: { inlineStylesheets: 'always' },
});
