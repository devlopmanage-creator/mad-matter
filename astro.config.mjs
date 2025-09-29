// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://famuae.com',
  output: 'static',
  integrations: [
    sitemap()
  ],
  build: {
    inlineStylesheets: 'auto',
  },
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      minify: 'esbuild',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro']
          }
        }
      }
    },
    css: {
      transformer: 'lightningcss'
    }
  },
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport'
  },
  experimental: {
    clientPrerender: true
  }
});
