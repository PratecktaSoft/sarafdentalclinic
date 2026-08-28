/* ========================================================================
   SARAF DENTAL CARE — AWARD MOTION ENGINE v2
   A touch-first scroll choreography layer.

   Principles:
   - NEVER hijack native scrolling.
   - Mobile gets the same cinematic language as desktop.
   - Uses requestAnimationFrame + IntersectionObserver for performance.
   - Uses CSS individual transform properties so existing GSAP transforms
     are not overwritten.
   ======================================================================== */
(() => {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 900px)").matches;
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const $ = (s, r = document) => r.querySelector(s);

  if (reduce) return;

  let scrollY = window.scrollY || 0;
  let targetY = scrollY;
  let raf = 0;
  let lastFrame = performance.now();

  /* Cache of { section, cards } pairs, rebuilt only on boot/resize instead
     of via querySelectorAll on every single animation frame. The update()
     loop used to re-query every "section.award-section" AND every card
     inside every section, 60 times a second, each call forcing a layout
     reflow via getBoundingClientRect() — with 20+ sections and dozens of
     cards that's 50-70+ forced reflows per frame, which is what was
     actually causing the lag (not the visual effects themselves). */
  let sectionCache = [];

  /* ---------------------------------------------------------------
     Mark meaningful content. Avoid the header/footer and tiny inline
     elements so the page does not become a wall of micro animations.
     --------------------------------------------------------------- */
  function markContent() {
    const sections = $$('main section, .site-main section, .page section, .page-shell section, section');

    sections.forEach((section, index) => {
      if (section.closest('header, footer, #mobile-menu')) return;
      section.classList.add('award-section');
      section.style.setProperty('--award-index', index);

      const depth = section.querySelector('.wrap, .section-inner, .hero-cinematic-grid, .clinic-tour-header, .history-track-wrap');
      if (depth && !depth.hasAttribute('data-award-depth')) depth.setAttribute('data-award-depth', '');

      const media = section.querySelector('img, video');
      if (media && !media.hasAttribute('data-award-media')) media.setAttribute('data-award-media', '');

      section.querySelectorAll('h1,h2,h3').forEach((heading) => {
        if (!heading.hasAttribute('data-award-depth')) heading.setAttribute('data-award-depth', '');
      });

      section.querySelectorAll(
        '.svc-panel,.service-card,.treatment-card,.case-card,.doctor-card,.doc-card,.tech-card,.blog-card,.gal-item,.gallery-item,.faq-item,.h-panel,.history-card,.clinic-room,.stat-card'
      ).forEach((card) => {
        card.setAttribute('data-award-card', '');
      });
    });

    /* Hero hooks. */
    const hero = $('[data-hero-cinematic]');
    if (hero) {
      const bg = hero.querySelector('.hero-bg');
      const copy = hero.querySelector('.hero-cinematic-copy, .hero-cinematic-content, .hero-cinematic-grid');
      const character = hero.querySelector('.hero-character-float, .hero-character-wrap, .hero-character');
      if (bg) bg.setAttribute('data-award-hero-bg', '');
      if (copy) copy.setAttribute('data-award-hero-copy', '');
      if (character) character.setAttribute('data-award-hero-character', '');
    }

    /* Existing horizontal scenes get a dedicated track attribute. */
    $$('[data-h-scroll] .h-track').forEach(track => {
      track.setAttribute('data-award-horizontal-track', '');
    });

    rebuildSectionCache();
  }

  /* Build the section/card cache once, instead of querying the DOM inside
     the 60fps update() loop. Called after markContent() and again after
     any resize (layout can change which cards are near which section). */
  function rebuildSectionCache() {
    sectionCache = $$('section.award-section').map(section => ({
      section,
      cards: $$('[data-award-card]', section)
    }));
  }

  /* ---------------------------------------------------------------
     Reveal observer. This is independent from the site's existing GSAP
     reveals, so a mobile reveal remains visible even if GSAP is skipped.
     --------------------------------------------------------------- */
  function initReveals() {
    const nodes = $$([
      'section .label',
      'section h1',
      'section h2',
      'section h3',
      'section p',
      '.svc-panel',
      '.service-card',
      '.treatment-card',
      '.case-card',
      '.doctor-card',
      '.doc-card',
      '.tech-card',
      '.blog-card',
      '.gal-item',
      '.gallery-item',
      '.faq-item',
      '.h-panel',
      '.history-card',
      '.clinic-room',
      '.stat-card',
      '[data-reveal-img]'
    ].join(','));

    const usable = nodes.filter(el => !el.closest('header,footer,#mobile-menu'));
    usable.forEach((el, i) => {
      el.classList.add('award-reveal');
      el.style.transitionDelay = `${Math.min((i % 7) * 45, 270)}ms`;
    });

    if (!('IntersectionObserver' in window)) {
      usable.forEach(el => el.classList.add('award-in'));
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('award-in');
        io.unobserve(entry.target);
      });
    }, {
      threshold: mobile ? 0.06 : 0.12,
      rootMargin: mobile ? '0px 0px -5% 0px' : '0px 0px -9% 0px'
    });

    usable.forEach(el => io.observe(el));
  }

  /* ---------------------------------------------------------------
     Word choreography for large headings. Only headings that are not
     already split by the existing animation system are touched.
     --------------------------------------------------------------- */
  function initWordMotion() {
    $$('section h1, section h2').forEach((heading) => {
      if (heading.dataset.awardWords === '1') return;
      if (heading.hasAttribute('data-reveal-text') || heading.querySelector('.split-word, .split-word-mask')) return;
      /* Headings built from [data-hero-line] spans (the site's dedicated
         hero heading system in animations.js) must never be touched here,
         regardless of whether that system has already run yet. Because
         this script isn't gated behind the preloader the way
         initAllAnimations() is, it was frequently winning the race and
         rebuilding the heading's innerHTML from scratch BEFORE the other
         system got to it — wiping out the original <span data-hero-line>
         structure (and anything hand-placed inside it, like an
         accent-orange word) and leaving nothing for [data-hero-line]
         queries to find afterward. */
      if (heading.querySelector('[data-hero-line]')) return;
      const text = heading.textContent.trim();
      if (!text || text.length > 90) return;

      heading.dataset.awardWords = '1';
      const words = text.split(/\s+/);
      heading.textContent = '';
      words.forEach((word, i) => {
        const outer = document.createElement('span');
        outer.className = 'award-word';
        const inner = document.createElement('span');
        inner.textContent = word + (i < words.length - 1 ? '\u00a0' : '');
        outer.appendChild(inner);
        heading.appendChild(outer);
      });

      heading.querySelectorAll('.award-word').forEach((word, i) => {
        word.style.transitionDelay = `${i * (mobile ? 28 : 38)}ms`;
      });

      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          heading.querySelectorAll('.award-word').forEach(w => w.classList.add('award-in'));
          observer.disconnect();
        });
      }, {threshold:.18});
      observer.observe(heading);
    });
  }

  /* ---------------------------------------------------------------
     Continuous scroll choreography. The expensive work is throttled to
     one animation frame, and only elements near the viewport are updated.
     --------------------------------------------------------------- */
  function update() {
    raf = 0;
    const now = performance.now();
    const dt = Math.min(32, now - lastFrame);
    lastFrame = now;

    /* Smooth the numerical progress only; the browser still owns scrolling. */
    targetY = window.scrollY || 0;
    const ease = mobile ? 0.18 : 0.14;
    scrollY += (targetY - scrollY) * (1 - Math.pow(1 - ease, dt / 16.67));

    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const pageP = Math.max(0, Math.min(1, scrollY / max));
    document.body.style.setProperty('--award-progress', pageP.toFixed(4));
    document.body.style.setProperty('--award-glow', Math.min(1, Math.abs(scrollY - targetY) / 80).toFixed(3));

    const rail = $('#award-scroll-rail');
    if (rail) rail.style.setProperty('--award-rail', pageP.toFixed(4));

    sectionCache.forEach(({ section, cards }) => {
      const r = section.getBoundingClientRect();
      if (r.bottom < -window.innerHeight * .4 || r.top > window.innerHeight * 1.4) return;

      const center = r.top + r.height * .5;
      const p = Math.max(-1, Math.min(1, (center - window.innerHeight * .5) / Math.max(window.innerHeight, r.height * .7)));
      const focus = Math.max(0, 1 - Math.abs(p));
      section.style.setProperty('--award-p', p.toFixed(4));
      section.style.setProperty('--award-focus', focus.toFixed(3));
      section.style.setProperty('--award-line', Math.max(0, focus).toFixed(3));
      section.classList.toggle('award-focus', focus > .48);

      cards.forEach((card) => {
        const cr = card.getBoundingClientRect();
        if (cr.bottom < -80 || cr.top > window.innerHeight + 80) return;
        const cp = Math.max(-1, Math.min(1, ((cr.top + cr.height*.5) - window.innerHeight*.5) / Math.max(window.innerHeight*.65, 1)));
        const scale = 1 + Math.max(0, 1 - Math.abs(cp)) * (mobile ? .012 : .018);
        card.style.setProperty('--card-p', (-cp).toFixed(3));
        card.style.setProperty('--award-card-scale', scale.toFixed(4));
        card.classList.toggle('award-card-focus', Math.abs(cp) < .28);
      });
    });

    /* Hero-specific range: 0 at top, 1 by ~85% of viewport. */
    const hero = $('[data-hero-cinematic]');
    if (hero) {
      const hr = hero.getBoundingClientRect();
      const hp = Math.max(0, Math.min(1, -hr.top / Math.max(1, window.innerHeight * .9)));
      hero.style.setProperty('--award-hero-p', hp.toFixed(4));
    }

    /* NOTE: a "touch-friendly horizontal sections" block used to live here,
       independently nudging [data-h-scroll] .h-track via the CSS
       `translate` property on every frame. That's exactly the same
       track GSAP's initHorizontalScroll() (animations.js) already pins and
       scroll-scrubs precisely — the two were fighting over the same
       element's effective position every frame, which is part of what
       made scrolling through those sections feel janky/stuck rather than
       smooth. GSAP already owns this fully (verified against real scroll
       input), so this layer was pure redundant cost with no benefit and
       has been removed rather than reconciled. */

    if (Math.abs(targetY - scrollY) > .15) raf = requestAnimationFrame(update);
  }

  function requestUpdate() {
    if (!raf) raf = requestAnimationFrame(update);
  }

  /* ---------------------------------------------------------------
     Touch micro-interactions — press, release, and swipe awareness.
     --------------------------------------------------------------- */
  function initTouch() {
    if (!mobile) return;
    $$('[data-award-card], .btn, .nav-burger').forEach(el => {
      el.addEventListener('touchstart', () => el.classList.add('award-touch'), {passive:true});
      el.addEventListener('touchend', () => {
        el.classList.remove('award-touch');
        el.animate([
          {scale:'.985'},
          {scale:'1.008'},
          {scale:'1'}
        ], {duration:380, easing:'cubic-bezier(.16,1,.3,1)'});
      }, {passive:true});
      el.addEventListener('touchcancel', () => el.classList.remove('award-touch'), {passive:true});
    });
  }

  function initRail() {
    if ($('#award-scroll-rail')) return;
    const rail = document.createElement('div');
    rail.id = 'award-scroll-rail';
    rail.innerHTML = '<span></span>';
    document.body.appendChild(rail);
  }

  function initResize() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        markContent();
        requestUpdate();
      }, 120);
    }, {passive:true});
  }

  function boot() {
    document.documentElement.classList.add('award-motion-ready');
    document.body.classList.add('award-motion-active');
    markContent();
    initRail();
    initReveals();
    initWordMotion();
    initTouch();
    initResize();

    window.addEventListener('scroll', requestUpdate, {passive:true});
    window.addEventListener('load', requestUpdate, {once:true, passive:true});
    requestUpdate();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, {once:true});
  } else {
    boot();
  }
})();
