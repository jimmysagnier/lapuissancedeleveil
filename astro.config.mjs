// @ts-check
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.lapuissancedeleveil.com',

  // Sortie statique (Cloudflare Pages sert dist/ tel quel — pas d'adapter nécessaire).
  output: 'static',

  build: {
    // 'file' => /qui-suis-je.html (URLs identiques au site actuel + chemins assets/ relatifs préservés)
    format: 'file',
  },

  // On gère le HTML à la main (port fidèle) : pas de reformatage/compression Astro.
  compressHTML: false,

  integrations: [
    sitemap({
      // Exclut la page d'embed Calendly (utilitaire, hors index — comme l'ancien sitemap)
      filter: (page) => !page.includes('/prendre-rdv'),
      // Aligne les URLs du sitemap sur la forme canonique (.html, racine pour la home)
      serialize(item) {
        const ROOT = 'https://www.lapuissancedeleveil.com';
        if (item.url === ROOT || item.url === ROOT + '/') {
          item.url = ROOT + '/';
        } else {
          let u = item.url.replace(/\/$/, '');
          if (!u.endsWith('.html')) u += '.html';
          item.url = u;
        }
        return item;
      },
    }),
  ],

  adapter: cloudflare(),
});