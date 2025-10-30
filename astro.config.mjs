// @ts-check

import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import vercel from '@astrojs/vercel';
import pwa from '@vite-pwa/astro';

// Define la URL del sitio dinámicamente basado en el entorno de Vercel
const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'http://localhost:4321';

// https://astro.build/config
export default defineConfig({
  // Nueva configuración para el servicio de imágenes
  image: {
    domains: ['www.datocms-assets.com'],
  },
    // Usamos la URL dinámica que acabamos de definir.
  site: siteUrl,
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