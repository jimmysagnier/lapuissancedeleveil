/* ===========================================================
   <site-footer> — Footer unifié La Puissance de l'Éveil
   Aucun attribut. À placer en fin de page, avant </body>.
   =========================================================== */
(function(){
  const STYLE_ID = 'spe-site-footer-styles';
  const CSS = `
    site-footer{ display:block; }
    .spe-foot{
      position:relative;
      background:var(--ink);
      color:var(--ivory);
      padding:clamp(60px, 7vw, 90px) clamp(28px, 5vw, 60px) clamp(40px, 4vw, 56px);
      isolation:isolate;
      font-family:var(--sans);
    }
    .spe-foot::before{
      content:""; position:absolute; top:0; left:50%;
      transform:translateX(-50%); width:min(220px, 40vw); height:1px;
      background:linear-gradient(90deg, rgba(200,145,75,0), var(--gold) 50%, rgba(200,145,75,0));
    }
    .spe-foot-inner{
      max-width:1180px; margin:0 auto;
      display:flex; flex-direction:column; align-items:center;
      gap:clamp(28px, 3.6vw, 44px);
      text-align:center;
    }
    .spe-foot-brand{
      display:flex; flex-direction:column; align-items:center; gap:12px;
    }
    .spe-foot-mark{
      font-family:var(--serif); font-style:italic; font-weight:400;
      font-size:clamp(20px, 2vw, 26px); color:var(--moon);
      letter-spacing:.005em;
    }
    .spe-foot-tag{
      font-family:var(--serif-it); font-style:italic;
      font-size:clamp(13px, 1.1vw, 15px); color:var(--gold);
      letter-spacing:.01em; opacity:.9;
      margin:0;
    }
    .spe-foot-tag .sep{
      display:inline-block; margin:0 10px;
      color:var(--gold); opacity:.55; font-size:.7em;
      transform:translateY(-2px);
    }
    .spe-foot-nav{
      display:flex; flex-wrap:wrap; justify-content:center;
      gap:clamp(18px, 2.8vw, 36px);
      padding:clamp(22px, 2.6vw, 32px) 0;
      border-top:1px solid rgba(243,236,223,.12);
      border-bottom:1px solid rgba(243,236,223,.12);
      width:100%; max-width:780px;
    }
    .spe-foot-nav a{
      font-family:var(--sans); font-size:11px; font-weight:500;
      letter-spacing:.28em; text-transform:uppercase;
      color:var(--ivory); opacity:.78;
      text-decoration:none; transition:opacity .3s, color .3s;
    }
    .spe-foot-nav a:hover{ opacity:1; color:var(--gold); }
    .spe-foot-meta{
      font-family:var(--sans); font-size:10.5px; font-weight:500;
      letter-spacing:.32em; text-transform:uppercase;
      color:var(--moon); opacity:.55;
      margin:0;
    }
    @media(max-width:560px){
      .spe-foot-nav{ gap:14px 22px; }
      .spe-foot-nav a{ font-size:10px; letter-spacing:.22em; }
      .spe-foot-meta{ font-size:9.5px; letter-spacing:.28em; }
    }
  `;

  function injectStyles(){
    if(document.getElementById(STYLE_ID)) return;
    const s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  class SiteFooter extends HTMLElement {
    connectedCallback(){
      injectStyles();
      this.innerHTML = `
        <footer class="spe-foot">
          <div class="spe-foot-inner">
            <div class="spe-foot-brand">
              <span class="spe-foot-mark">La Puissance <i>de l'Éveil</i></span>
              <p class="spe-foot-tag">Réveilleuse d'âmes<span class="sep">✦</span>Bousculeuse de consciences</p>
            </div>
            <nav class="spe-foot-nav" aria-label="Liens du pied de page">
              <a href="prendre-rdv.html">Prendre rendez-vous</a>
              <a href="mentions-legales.html">Mentions légales</a>
              <a href="cgv.html">CGV</a>
              <a href="rgpd.html">RGPD</a>
            </nav>
            <p class="spe-foot-meta">© MMXXVI — Eva Naudet</p>
          </div>
        </footer>
      `;
    }
  }
  customElements.define('site-footer', SiteFooter);
})();
