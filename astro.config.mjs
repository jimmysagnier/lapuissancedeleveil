// @ts-check
import { defineConfig } from 'astro/config';

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
});
