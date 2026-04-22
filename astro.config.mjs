// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://huangxok.github.io',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: false,
    },
  },
});
