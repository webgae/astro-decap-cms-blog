// @ts-check

import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import pwa from '@vite-pwa/astro';
// https://astro.build/config
export default defineConfig({
  // Usamos una variable de entorno para el dominio.
  // En desarrollo, usará localhost. En producción, usará la URL que definas.
  site: 'http://localhost:4321',
  output: 'static',
  publicDir: './public',
  integrations: [
    mdx(),
    sitemap(),
    preact(),
    pwa({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        navigateFallback: '/404',
        navigateFallbackAllowlist: [/^\/blog/],
      },
      manifest: {
        name: 'Webgae - Desarrollo Web Moderno',
        short_name: 'Webgae',
        description: 'Desarrollo web moderno y eficaz con las últimas tecnologías',
        theme_color: '#2337ff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    })
  ],
});