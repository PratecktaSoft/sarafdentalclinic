
/* ==========================================================================
   SARAF DENTAL CARE — VIRAL MOTION ENGINE
   Additive enhancement for every page.
   No framework dependency; uses native APIs + GSAP when available.
   ========================================================================== */
(() => {
  "use strict";

  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* -------------------- scroll progress -------------------- */
  function initProgress() {
    if ($("#sd-scroll-progress")) return;
    const bar = document.createElement("div");
    bar.id = "sd-scroll-progress";
    document.body.appendChild(bar);

    let ticking = false;
    const update = () => {
      ticking = false;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      bar.style.transform = `scaleX(${p})`;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, {passive:true});
    update();
  }

  /* -------------------- grain -------------------- */
  function initGrain() {
    if (reduce || $("#sd-motion-grain")) return;
    const grain = document.createElement("div");
    grain.id = "sd-motion-grain";
    document.body.appendChild(grain);
  }

  /* -------------------- reveal / split text -------------------- */
  function initReveal() {
    const candidates = $$(
      "section > .wrap, section .label, section h1, section h2, section h3, " +
      ".service-card, .svc-panel, .doctor-card, .case-card, .blog-card, " +
      ".treatment-card, .tech-card, .gallery-item, .contact-info-card, " +
      ".faq-item, .timeline-item"
    );

    candidates.forEach(el => {
      if (el.closest("header, #mobile-menu, footer")) return;
      if (!el.hasAttribute("data-sd-reveal") && !el.hasAttribute("data-reveal") &&
          !el.hasAttribute("data-reveal-text") && !el.hasAttribute("data-reveal-group")) {
        el.setAttribute("data-sd-reveal", "");
      }
    });

    $$("[data-sd-reveal], [data-reveal], [data-reveal-text], [data-reveal-group]")
      .forEach(el => el.setAttribute("data-sd-reveal", ""));

    if (reduce || !("IntersectionObserver" in window)) {
      $$("[data-sd-reveal]").forEach(el => el.classList.add("sd-visible"));
      return;
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("sd-visible");
          io.unobserve(entry.target);
        }
      });
    }, {threshold:0.12, rootMargin:"0px 0px -8% 0px"});

    $$("[data-sd-reveal]").forEach(el => io.observe(el));

    /* Stagger existing grids without fighting the site's own animation engine. */
    $$(
      ".svc-panel, .service-grid, .cards-grid, .doctor-grid, .case-grid, " +
      ".gallery-grid, .blog-grid, .stats-grid"
    ).forEach(group => {
      if (!group.hasAttribute("data-sd-stagger")) {
        group.setAttribute("data-sd-stagger", "");
        io.observe(group);
      }
    });
  }

  /* -------------------- image parallax -------------------- */
  function initParallax() {
    if (reduce) return;

    const items = $$(
      ".hero-bg, .pin-zoom-img img, .clinic-hero-media img, " +
      ".digital-hero-media img, .doctor-hero-media img, [data-parallax], " +
      ".case-image img, .gallery-item img"
    );
    if (!items.length) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      items.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -100 || rect.top > vh + 100) return;
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        const amount = Math.max(-26, Math.min(26, progress * -20));
        el.style.setProperty("--sd-parallax", `${amount}px`);
      });
    };
    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, {passive:true});
    window.addEventListener("resize", update, {passive:true});
    update();
  }

  /* -------------------- cursor / magnetic -------------------- */
  function initMagnetic() {
    if (touch || reduce) return;

    $$(
      ".btn, .nav-cta, .svc-panel, .nav-burger, [data-magnetic]"
    ).forEach(el => {
      el.setAttribute("data-magnetic", "");
      let raf = 0;

      const move = e => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width / 2)) / r.width;
        const y = (e.clientY - (r.top + r.height / 2)) / r.height;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform = `translate3d(${x * 8}px,${y * 8}px,0)`;
        });
        if (el.classList.contains("btn")) {
          el.style.setProperty("--btn-x", `${e.clientX - r.left}px`);
          el.style.setProperty("--btn-y", `${e.clientY - r.top}px`);
        }
      };
      const leave = () => {
        cancelAnimationFrame(raf);
        el.style.transform = "";
      };
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
    });
  }

  /* -------------------- 3D cards -------------------- */
  function initTilt() {
    if (touch || reduce) return;

    $$(".service-card, .svc-panel, .doctor-card, .case-card, .tech-card, [data-sd-card]")
      .forEach(card => {
        if (card.dataset.sdTilt) return;
        card.dataset.sdTilt = "1";

        card.addEventListener("pointermove", e => {
          const r = card.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width;
          const py = (e.clientY - r.top) / r.height;
          const rx = (0.5 - py) * 3.2;
          const ry = (px - 0.5) * 3.2;
          card.style.setProperty("--mx", `${px * 100}%`);
          card.style.setProperty("--my", `${py * 100}%`);
          card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
        });
        card.addEventListener("pointerleave", () => {
          card.style.transform = "";
        });
      });
  }

  /* -------------------- active nav + smart hide/show -------------------- */
  function initNavMotion() {
    const nav = $("header.site-nav");
    if (!nav) return;

    let last = window.scrollY;
    let ticking = false;

    const update = () => {
      ticking = false;
      const y = window.scrollY;
      nav.classList.toggle("sd-nav-scrolled", y > 30);
      if (!touch && y > 180 && Math.abs(y - last) > 6) {
        nav.classList.toggle("sd-nav-hidden", y > last);
      }
      if (y < 80) nav.classList.remove("sd-nav-hidden");
      last = y;
    };

    window.addEventListener("scroll", () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    }, {passive:true});
    update();
  }

  /* -------------------- mobile sticky actions -------------------- */
  function initMobileActions() {
    if (touch === false || $("#sd-mobile-actions") || !location.pathname) return;
    const bar = document.createElement("div");
    bar.id = "sd-mobile-actions";
    bar.innerHTML =
      '<a href="appointment.html">Book Appointment</a>' +
      '<a href="tel:+919823000000" aria-label="Call Saraf Dental Care">☎</a>';
    document.body.appendChild(bar);
  }

  /* -------------------- section color / depth -------------------- */
  function initSectionDepth() {
    if (reduce) return;
    $$("section").forEach(section => {
      if (section.dataset.sdDepth) return;
      section.dataset.sdDepth = "1";
      section.addEventListener("pointermove", e => {
        if (touch) return;
        const r = section.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        section.style.setProperty("--mouse-x", `${x * 100}%`);
        section.style.setProperty("--mouse-y", `${y * 100}%`);
      }, {passive:true});
    });
  }

  /* -------------------- swipe hints for horizontal sections -------------------- */
  function initSwipeHints() {
    if (!touch) return;
    $$("[data-h-scroll] .h-track").forEach(track => {
      if (track.parentElement.querySelector(".sd-swipe-hint")) return;
      const hint = document.createElement("div");
      hint.className = "wrap sd-swipe-hint";
      hint.textContent = "Swipe to explore →";
      track.parentElement.insertBefore(hint, track);
    });
  }

  /* -------------------- robust mobile menu -------------------- */
  function initMobileMenuFallback() {
    const burger = $(".nav-burger");
    const menu = $("#mobile-menu");
    if (!burger || !menu) return;

    burger.setAttribute("aria-expanded", "false");

    const sync = () => {
      const open = menu.classList.contains("is-open") ||
                   menu.classList.contains("open") ||
                   document.body.classList.contains("menu-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.style.overflow = open ? "hidden" : "";
    };

    new MutationObserver(sync).observe(menu, {attributes:true, attributeFilter:["class"]});
    burger.addEventListener("click", () => setTimeout(sync, 20));
    $$("#mobile-menu a").forEach(a => a.addEventListener("click", () => {
      setTimeout(sync, 50);
    }));
    window.addEventListener("keydown", e => {
      if (e.key === "Escape") setTimeout(sync, 20);
    });
  }

  /* -------------------- smooth anchor scroll -------------------- */
  function initAnchors() {
    $$('a[href^="#"]').forEach(a => {
      a.addEventListener("click", e => {
        const id = a.getAttribute("href");
        if (!id || id === "#") return;
        const target = $(id);
        if (!target) return;
        e.preventDefault();
        const nav = $(".site-nav");
        const offset = nav ? nav.getBoundingClientRect().height + 10 : 0;
        window.scrollTo({top:target.getBoundingClientRect().top + window.scrollY - offset, behavior:reduce ? "auto" : "smooth"});
      });
    });
  }

  /* -------------------- mobile cinematic motion -------------------- */
  function initMobileCinematic() {
    if (!touch || reduce) return;

    document.body.classList.add("sd-mobile-motion");

    /* Mark richer reveal targets with alternating directions. */
    const mobileTargets = $$(
      "section h2, section h3, .hero-cinematic-copy, .hero-cinematic-stats, " +
      ".service-card, .svc-panel, .doctor-card, .case-card, .blog-card, " +
      ".treatment-card, .tech-card, .gallery-item, .faq-item, .contact-info-card"
    );
    mobileTargets.forEach((el, i) => {
      if (el.closest("header, #mobile-menu, footer")) return;
      if (!el.hasAttribute("data-mobile-reveal") && !el.hasAttribute("data-sd-reveal")) {
        el.setAttribute("data-mobile-reveal", "");
      }
      if (!el.dataset.mobileReveal) {
        const mode = i % 3 === 1 ? "left" : i % 3 === 2 ? "right" : "up";
        el.dataset.mobileReveal = mode;
      }
    });

    const revealNodes = $$('[data-mobile-reveal]:not([data-sd-reveal])');
    const observer = "IntersectionObserver" in window ? new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.classList.add("sd-visible");
        observer.unobserve(el);
      });
    }, {threshold:.08, rootMargin:"0px 0px -7% 0px"}) : null;
    revealNodes.forEach(el => observer ? observer.observe(el) : el.classList.add("sd-visible"));

    /* Section activation + scroll-linked depth. */
    const sections = $$("main section, .section");
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight || 1;
      const center = vh * .5;
      sections.forEach(section => {
        const r = section.getBoundingClientRect();
        const distance = (r.top + r.height / 2) - center;
        const normalized = Math.max(-1, Math.min(1, distance / vh));
        const shift = Math.max(-14, Math.min(14, -normalized * 10));
        const scale = 1 - Math.min(.018, Math.abs(normalized) * .012);
        section.style.setProperty("--sd-mobile-shift", shift.toFixed(2) + "px");
        section.style.setProperty("--sd-mobile-scale", scale.toFixed(4));
        section.classList.toggle("sd-section-active", Math.abs(normalized) < .55);
      });

      const y = window.scrollY || 0;
      const showBar = y > Math.min(260, vh * .32);
      document.body.classList.toggle("sd-mobile-actions-visible", showBar);

      /* Finger-following ambient glow; deliberately low amplitude. */
      const progress = document.documentElement.scrollHeight > vh ? y / (document.documentElement.scrollHeight - vh) : 0;
      document.body.style.setProperty("--mobile-glow-y", `${20 + progress * 60}%`);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    window.addEventListener("scroll", onScroll, {passive:true});
    window.addEventListener("resize", onScroll, {passive:true});
    update();

    /* Touch feedback: cards respond to the finger, then settle naturally. */
    $$(".service-card, .svc-panel, .doctor-card, .case-card, .blog-card, .gallery-item").forEach(card => {
      let startX = 0, startY = 0;
      card.addEventListener("touchstart", e => {
        const t = e.touches[0];
        startX = t.clientX; startY = t.clientY;
        card.style.transition = "transform .18s ease";
        card.style.transform = "scale(.985)";
      }, {passive:true});
      card.addEventListener("touchend", e => {
        const t = e.changedTouches[0];
        const dx = Math.abs(t.clientX - startX), dy = Math.abs(t.clientY - startY);
        card.style.transform = "";
        if (dx < 12 && dy < 12) {
          card.animate([
            {transform:"scale(.985)"},{transform:"scale(1.012)"},{transform:"scale(1)"}
          ], {duration:360,easing:"cubic-bezier(.16,1,.3,1)"});
        }
      }, {passive:true});
    });

    /* Horizontal swipe scenes get a subtle momentum hint and dismiss on first swipe. */
    $$('[data-h-scroll] .h-track').forEach(track => {
      const hint = track.parentElement.querySelector(".sd-swipe-hint");
      let moved = false;
      track.addEventListener("scroll", () => {
        if (moved) return;
        moved = true;
        if (hint) hint.classList.add("sd-hint-hidden");
      }, {passive:true});
    });

    /* Lightweight touch parallax for marked elements, independent of desktop parallax. */
    const parallax = $$("[data-parallax], .hero-bg, .hero-character-wrap, .pin-zoom-img img");
    const pUpdate = () => {
      const h = window.innerHeight || 1;
      parallax.forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > h + 80) return;
        const p = ((r.top + r.height * .5) - h * .5) / h;
        const amount = Math.max(-18, Math.min(18, -p * 14));
        el.style.setProperty("--sd-mobile-parallax", amount.toFixed(2) + "px");
        if (!el.classList.contains("hero-character-wrap")) {
          el.style.transform = `translate3d(0,${amount.toFixed(2)}px,0) scale(1.02)`;
        }
      });
    };
    let pRaf = 0;
    window.addEventListener("scroll", () => {
      if (!pRaf) pRaf = requestAnimationFrame(() => { pRaf = 0; pUpdate(); });
    }, {passive:true});
    pUpdate();
  }

  /* -------------------- GSAP micro layer -------------------- */
  function initGSAP() {
    if (reduce || typeof gsap === "undefined") return;

    if (typeof ScrollTrigger !== "undefined") {
      try {
        gsap.registerPlugin(ScrollTrigger);
        gsap.utils.toArray("[data-sd-gsap]").forEach(el => {
          gsap.fromTo(el,
            {y:45, opacity:0},
            {y:0, opacity:1, duration:.9, ease:"power4.out",
             scrollTrigger:{trigger:el,start:"top 88%",once:true}}
          );
        });
      } catch(e) {}
    }

    /* Gentle hero breathing, never competing with existing hero animation. */
    const hero = $(".hero-character-float, .hero-character-wrap");
    if (hero) {
      try {
        gsap.to(hero, {y:-10, duration:3.2, repeat:-1, yoyo:true, ease:"sine.inOut"});
      } catch(e) {}
    }
  }

  /* -------------------- boot -------------------- */
  function boot() {
    document.documentElement.classList.add("sd-motion-ready");
    document.body.classList.add("sd-ready");
    initProgress();
    initGrain();
    initReveal();
    initParallax();
    initMagnetic();
    initTilt();
    initNavMotion();
    initMobileActions();
    initSectionDepth();
    initSwipeHints();
    initMobileCinematic();
    initMobileMenuFallback();
    initAnchors();
    initGSAP();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot, {once:true});
  } else {
    boot();
  }
})();
