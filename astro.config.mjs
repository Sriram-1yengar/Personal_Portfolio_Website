// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://sriramiyengar.me',
  trailingSlash: 'ignore',
  integrations: [react(), mdx(), sitemap()],
  build: {
    format: 'directory',
  },
});
