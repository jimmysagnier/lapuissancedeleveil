# La Puissance de l'Éveil — site (Astro)

Site vitrine d'**Eva Naudet**, coach holistique. Port Astro du site statique d'origine — **rendu, design, animations et contenu strictement identiques**.

## Stack

- **Astro 6** (sortie statique)
- Déploiement : **Cloudflare Pages**
- Polices : Google Fonts (Fraunces, Instrument Sans, Instrument Serif)

## Développement

```bash
npm install
npm run dev      # serveur de dev (http://localhost:4321)
npm run build    # build statique -> dist/
npm run preview  # prévisualise le build dist/
```

## Structure

```
src/
├── layouts/Base.astro      # <head> commun (charset, viewport, favicons, fonts) + slots
├── pages/*.astro           # 1 page par route (index, qui-suis-je, chemin-vers-toi, ...)
└── snippets/*.html         # contenu HTML brut de chaque page (head + body), importé en ?raw
public/
├── assets/                 # images (AVIF), vidéos (MP4+WebM), PDF, JS web components, favicons
├── robots.txt
└── sitemap.xml
```

### Principe du port fidèle

Chaque page injecte son HTML/CSS/JS d'origine **verbatim** via `set:html` (imports `?raw`).
Astro ne reparse ni le `{}`, ni les `<style>`, ni les `<script>` : le rendu est byte-identique
à l'ancien site. La config utilise `build.format: 'file'` pour conserver les URLs en `/page.html`.

Le header et le footer sont des **web components** (`<site-header>`, `<site-footer>` dans
`public/assets/site-*.js`), partagés sur toutes les pages.

## Déploiement Cloudflare Pages

- **Build command** : `npm run build`
- **Output directory** : `dist`
- **Framework preset** : Astro
- Aucun adapter nécessaire (sortie 100% statique).

## À venir

- Médias lourds (vidéos) → Cloudflare R2 (remplacer le préfixe `assets/` par l'URL R2).
- Sitemap : envisager `@astrojs/sitemap` (génération native au build).
