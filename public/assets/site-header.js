/* ===========================================================
   <site-header> — Header unifié La Puissance de l'Éveil
   Attributs :
     theme="dark"  (défaut) — texte ivoire, pour pages avec hero sombre
     theme="light"          — texte ink, pour pages avec fond ivoire
     current="chemin|hd|cles|qui" — surligne l'item de nav actif
     home="index.html" (défaut) — destination du logo
   =========================================================== */
(function(){
  const STYLE_ID = 'spe-site-header-styles';
  const CSS = `
    site-header{ display:block; }
    .spe-nav{
      position:fixed; top:0; left:0; right:0; z-index:50;
      display:flex; justify-content:space-between; align-items:center;
      padding:22px 40px;
      color:var(--ivory);
      transition:background .4s, color .4s, border-color .4s;
    }
    .spe-nav[data-theme="light"]{ color:var(--ink); }
    .spe-nav.scrolled{
      background:rgba(243,236,223,.92);
      backdrop-filter:blur(14px);
      color:var(--ink);
      border-bottom:1px solid rgba(14,27,44,.14);
    }
    .spe-nav a{ color:inherit; text-decoration:none; }
    .spe-nav .mark{
      display:flex; align-items:center;
    }
    .spe-nav .mark img{
      height:52px; width:auto; max-width:200px; object-fit:contain;
      display:block; filter:none;
    }
    @media(max-width:520px){
      .spe-nav .mark img{ height:42px; max-width:150px; }
    }
    .spe-nav ul{
      display:flex; gap:34px; list-style:none; margin:0; padding:0;
      font-family:var(--sans);
      font-size:13px; letter-spacing:.14em; text-transform:uppercase;
    }
    .spe-nav ul a{ opacity:.85; transition:opacity .3s, color .3s; }
    .spe-nav ul a:hover{ opacity:1; }
    .spe-nav ul a.is-current{ opacity:1; color:var(--gold); }
    .spe-nav.scrolled ul a.is-current{ color:var(--gold-deep); }
    .spe-nav .cta{
      border:1px solid currentColor;
      padding:10px 18px; border-radius:999px;
      font-family:var(--sans);
      font-size:12px; letter-spacing:.16em; text-transform:uppercase;
      transition:background .3s, color .3s, border-color .3s;
    }
    .spe-nav .cta:hover{
      background:var(--gold);
      color:var(--ink);
      border-color:var(--gold);
    }
    @media(max-width:860px){
      .spe-nav ul{ display:none; }
      .spe-nav{ padding:18px 22px; }
      .spe-nav .cta{ font-size:11px; padding:9px 14px; letter-spacing:.12em; }
    }
    @media(max-width:520px){
      .spe-nav .cta{ display:none; }
    }

    /* ---------- Hamburger button (mobile/tablet portrait) ---------- */
    .spe-nav-toggle{
      display:none;
      width:40px; height:40px;
      margin-left:14px;
      background:transparent;
      border:1px solid currentColor;
      border-radius:999px;
      cursor:pointer;
      align-items:center;
      justify-content:center;
      padding:0;
      color:inherit;
      transition:background .3s, color .3s;
    }
    .spe-nav-toggle:hover{ background:currentColor; }
    .spe-nav-toggle:hover .spe-burger,
    .spe-nav-toggle:hover .spe-burger::before,
    .spe-nav-toggle:hover .spe-burger::after{ background:var(--ivory); }
    .spe-nav[data-theme="light"] .spe-nav-toggle:hover .spe-burger,
    .spe-nav[data-theme="light"] .spe-nav-toggle:hover .spe-burger::before,
    .spe-nav[data-theme="light"] .spe-nav-toggle:hover .spe-burger::after{ background:var(--ivory); }
    .spe-burger{
      position:relative;
      display:block;
      width:16px; height:1.5px;
      background:currentColor;
      transition:background .3s;
    }
    .spe-burger::before, .spe-burger::after{
      content:"";
      position:absolute; left:0;
      width:16px; height:1.5px;
      background:currentColor;
      transition:background .3s, transform .3s, top .3s;
    }
    .spe-burger::before{ top:-5px; }
    .spe-burger::after{ top:5px; }
    @media(max-width:860px){
      .spe-nav-toggle{ display:inline-flex; }
    }

    /* ---------- Overlay menu (plein écran ink) ---------- */
    body.spe-menu-open{ overflow:hidden; }
    .spe-menu{
      position:fixed; inset:0; z-index:100;
      background:var(--ink);
      display:flex; flex-direction:column;
      align-items:center; justify-content:center;
      gap:clamp(32px, 5vh, 56px);
      padding:clamp(80px, 12vw, 120px) 24px 60px;
      opacity:0;
      pointer-events:none;
      transform:translateY(-12px);
      transition:opacity .45s var(--ease,cubic-bezier(.2,.7,.2,1)), transform .45s var(--ease,cubic-bezier(.2,.7,.2,1));
    }
    .spe-menu.is-open{
      opacity:1;
      pointer-events:auto;
      transform:translateY(0);
    }
    .spe-menu::before{
      content:"";
      position:absolute; top:0; left:50%;
      transform:translateX(-50%);
      width:min(220px, 50vw); height:1px;
      background:linear-gradient(90deg, rgba(200,145,75,0), var(--gold) 50%, rgba(200,145,75,0));
    }
    .spe-menu-close{
      position:absolute;
      top:18px; right:22px;
      width:42px; height:42px;
      background:transparent;
      border:1px solid rgba(243,236,223,.35);
      border-radius:999px;
      color:var(--ivory);
      cursor:pointer;
      display:flex; align-items:center; justify-content:center;
      transition:background .3s, border-color .3s;
    }
    .spe-menu-close:hover{ background:var(--gold); border-color:var(--gold); color:var(--ink); }
    .spe-menu-close svg{ width:14px; height:14px; }
    .spe-menu-list{
      list-style:none; margin:0; padding:0;
      display:flex; flex-direction:column;
      align-items:center; gap:clamp(18px, 2.4vh, 28px);
      opacity:0;
      transform:translateY(8px);
      transition:opacity .5s var(--ease,cubic-bezier(.2,.7,.2,1)) .15s, transform .5s var(--ease,cubic-bezier(.2,.7,.2,1)) .15s;
    }
    .spe-menu.is-open .spe-menu-list{ opacity:1; transform:translateY(0); }
    .spe-menu-list a{
      font-family:var(--serif);
      font-style:italic;
      font-weight:340;
      font-size:clamp(28px, 5vw, 40px);
      letter-spacing:-.005em;
      color:var(--ivory);
      text-decoration:none;
      transition:color .3s;
      font-variation-settings:"opsz" 144,"SOFT" 80,"WONK" 1;
    }
    .spe-menu-list a:hover,
    .spe-menu-list a.is-current{ color:var(--gold); }
    .spe-menu-rule{
      width:48px; height:1px;
      background:var(--gold); opacity:.6;
      margin:0;
    }
    .spe-menu-cta{
      display:inline-flex;
      align-items:center;
      gap:14px;
      padding:14px 28px 15px;
      background:var(--gold);
      color:var(--ink);
      border-radius:999px;
      font-family:var(--sans);
      font-size:12px;
      font-weight:500;
      letter-spacing:.2em;
      text-transform:uppercase;
      text-decoration:none;
      transition:background .3s, transform .3s;
      opacity:0;
      transform:translateY(8px);
      transition:opacity .5s var(--ease,cubic-bezier(.2,.7,.2,1)) .3s, transform .5s var(--ease,cubic-bezier(.2,.7,.2,1)) .3s, background .3s;
    }
    .spe-menu.is-open .spe-menu-cta{ opacity:1; transform:translateY(0); }
    .spe-menu-cta:hover{ background:var(--ivory); }
    @media (prefers-reduced-motion: reduce){
      .spe-menu, .spe-menu-list, .spe-menu-cta{
        transition:none;
      }
    }
  `;

  function injectStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  const ITEMS = [
    { href:'chemin-vers-toi.html',  label:'Le chemin vers toi', key:'chemin' },
    { href:'portes-evolution.html', label:'Les Portes',         key:'portes' },
    { href:'human-design.html',     label:'Human Design',       key:'hd'     },
    { href:'les-cles.html',         label:'Les clés',           key:'cles'   },
    { href:'qui-suis-je.html',      label:'Qui suis-je',        key:'qui'    },
  ];

  class SiteHeader extends HTMLElement {
    connectedCallback(){
      injectStyles();
      const theme   = this.getAttribute('theme')   || 'dark';
      const current = this.getAttribute('current') || '';
      const home     = this.getAttribute('home')      || 'index.html';
      const ctaLabel = this.getAttribute('cta-label') || 'Rendez-vous découverte';
      const ctaHref  = this.getAttribute('cta-href')  || 'rdv-decouverte.html';

      this.innerHTML = `
        <nav class="spe-nav" data-theme="${theme}" aria-label="Navigation principale">
          <a href="${home}" class="mark" aria-label="La Puissance de l'Éveil — accueil">
            <img src="assets/logo-menu.avif" alt="La Puissance de l'Éveil">
          </a>
          <ul>
            ${ITEMS.map(i => `<li><a href="${i.href}"${current===i.key?' class="is-current"':''}>${i.label}</a></li>`).join('')}
          </ul>
          <a href="${ctaHref}" class="cta">${ctaLabel}</a>
          <button type="button" class="spe-nav-toggle" aria-label="Ouvrir le menu" aria-expanded="false" aria-controls="spe-menu">
            <span class="spe-burger" aria-hidden="true"></span>
          </button>
        </nav>
        <div class="spe-menu" id="spe-menu" role="dialog" aria-modal="true" aria-label="Menu de navigation" hidden>
          <button type="button" class="spe-menu-close" aria-label="Fermer le menu">
            <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round">
              <path d="M2 2 L12 12 M12 2 L2 12"/>
            </svg>
          </button>
          <ul class="spe-menu-list">
            ${ITEMS.map(i => `<li><a href="${i.href}"${current===i.key?' class="is-current"':''}>${i.label}</a></li>`).join('')}
          </ul>
          <span class="spe-menu-rule" aria-hidden="true"></span>
          <a href="${ctaHref}" class="spe-menu-cta">${ctaLabel}</a>
        </div>
      `;

      const nav = this.querySelector('.spe-nav');
      const onScroll = () => nav.classList.toggle('scrolled', (window.scrollY || window.pageYOffset) > 50);
      window.addEventListener('scroll', onScroll, { passive:true });
      onScroll();

      // Hamburger menu logic
      const toggle = this.querySelector('.spe-nav-toggle');
      const menu   = this.querySelector('.spe-menu');
      const close  = this.querySelector('.spe-menu-close');
      const links  = this.querySelectorAll('.spe-menu-list a, .spe-menu-cta');

      const openMenu = () => {
        menu.hidden = false;
        // Force reflow so the transition kicks in after hidden removal
        requestAnimationFrame(() => menu.classList.add('is-open'));
        toggle.setAttribute('aria-expanded', 'true');
        document.body.classList.add('spe-menu-open');
        close.focus();
      };
      const closeMenu = () => {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('spe-menu-open');
        toggle.focus();
        setTimeout(() => { if(!menu.classList.contains('is-open')) menu.hidden = true; }, 450);
      };

      toggle.addEventListener('click', openMenu);
      close.addEventListener('click', closeMenu);
      links.forEach(a => a.addEventListener('click', () => closeMenu()));
      document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape' && menu.classList.contains('is-open')) closeMenu();
      });
    }
  }
  customElements.define('site-header', SiteHeader);
})();
