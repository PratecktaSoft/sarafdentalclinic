/* ==========================================================================
   SARAF DENTAL CARE — CINEMATIC MOTION SYSTEM
   --------------------------------------------------------------------------
   GSAP + ScrollTrigger animation controller

   Works with:
   - global.css
   - animations.css
   - responsive.css
   - index.html cinematic hero
   - inner pages
   - mobile/tablet fallbacks

   IMPORTANT:
   This file exposes the same public initAllAnimations(gsap, ScrollTrigger)
   function expected by the existing main.js.
   ========================================================================== */


/* ==========================================================================
   01. GLOBAL CONFIG
   ========================================================================== */

const REDUCED =
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const DESKTOP =
  window.matchMedia("(min-width: 901px)").matches;

const TOUCH =
  window.matchMedia("(hover: none), (pointer: coarse)").matches;

const MOBILE =
  window.matchMedia("(max-width: 900px)").matches;


/* ==========================================================================
   02. HELPERS
   ========================================================================== */

function q(selector, scope = document) {
  return scope.querySelector(selector);
}

function qa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function safeRefresh(ScrollTrigger) {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      if (ScrollTrigger) ScrollTrigger.refresh();
    });
  });
}


/* ==========================================================================
   03. TEXT SPLITTING
   ========================================================================== */

function splitWords(el) {

  if (!el || el.dataset.splitReady === "true") {
    return el ? el.querySelectorAll(".split-word") : [];
  }

  const text = el.textContent.trim();

  if (!text) return [];

  el.dataset.splitReady = "true";

  el.innerHTML = "";

  const words = text.split(/\s+/);

  words.forEach((word, index) => {

    const mask = document.createElement("span");
    mask.className = "split-word-mask";

    const inner = document.createElement("span");
    inner.className = "split-word";

    inner.textContent =
      word + (index < words.length - 1 ? "\u00A0" : "");

    mask.appendChild(inner);
    el.appendChild(mask);
  });

  return el.querySelectorAll(".split-word");
}


/* ==========================================================================
   04. TEXT REVEAL
   ========================================================================== */

function initTextReveal(gsap, ScrollTrigger) {

  qa("[data-reveal-text]").forEach((el) => {

    const words = splitWords(el);

    if (!words.length) return;

    if (REDUCED) {

      gsap.set(words, {
        y: "0%",
        opacity: 1,
        rotateX: 0
      });

      return;
    }

    gsap.set(words, {
      y: "115%",
      opacity: 0,
      rotateX: 10,
      transformOrigin: "center bottom"
    });

    gsap.to(words, {

      y: "0%",
      opacity: 1,
      rotateX: 0,

      duration: 1.05,

      stagger: 0.035,

      ease: "power4.out",

      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        once: true
      }

    });
  });
}


/* ==========================================================================
   05. GENERAL REVEALS
   ========================================================================== */

function initFadeReveal(gsap, ScrollTrigger) {

  qa("[data-reveal]").forEach((el) => {

    if (REDUCED) {

      gsap.set(el, {
        opacity: 1,
        y: 0
      });

      return;
    }

    gsap.fromTo(
      el,
      {
        opacity: 0,
        y: 45
      },
      {
        opacity: 1,
        y: 0,

        duration: 1,

        ease: "power3.out",

        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          once: true
        }
      }
    );
  });


  qa("[data-reveal-group]").forEach((group) => {

    const children = Array.from(group.children);

    if (!children.length) return;

    if (REDUCED) {

      gsap.set(children, {
        opacity: 1,
        y: 0
      });

      return;
    }

    gsap.fromTo(
      children,
      {
        opacity: 0,
        y: 35
      },
      {
        opacity: 1,
        y: 0,

        duration: 0.85,

        stagger: 0.09,

        ease: "power3.out",

        scrollTrigger: {
          trigger: group,
          start: "top 88%",
          once: true
        }
      }
    );
  });


  qa("[data-card-reveal]").forEach((card) => {

    if (REDUCED) return;

    gsap.fromTo(
      card,
      {
        opacity: 0,
        y: 55,
        scale: 0.975
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,

        duration: 1.05,

        ease: "power4.out",

        scrollTrigger: {
          trigger: card,
          start: "top 91%",
          once: true
        }
      }
    );
  });
}


/* ==========================================================================
   06. IMAGE REVEALS
   ========================================================================== */

function initImageReveal(gsap, ScrollTrigger) {

  qa("[data-reveal-img]").forEach((el) => {

    const img = q("img", el);

    if (REDUCED) {

      gsap.set(el, {
        clipPath: "inset(0% 0% 0% 0%)"
      });

      if (img) {
        gsap.set(img, {
          scale: 1
        });
      }

      return;
    }

    gsap.set(el, {
      clipPath: "inset(100% 0% 0% 0%)"
    });

    if (img) {
      gsap.set(img, {
        scale: 1.15
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top 86%",
        once: true
      }
    });

    tl.to(el, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 1.2,
      ease: "power4.inOut"
    });

    if (img) {

      tl.to(
        img,
        {
          scale: 1,
          duration: 1.6,
          ease: "power3.out"
        },
        0
      );
    }
  });
}


/* ==========================================================================
   07. IMAGE ZOOM + PIN
   ========================================================================== */

function initImageZoomPin(gsap, ScrollTrigger) {

  qa("[data-zoom-pin]").forEach((section) => {

    const box = q(".pin-zoom-img", section);

    if (!box) return;

    const img = q("img", box);

    const isSmall =
      window.matchMedia("(max-width: 600px)").matches;

    if (REDUCED || window.innerWidth <= 900) {

      gsap.set(box, {
        width: isSmall ? "88vw" : "86vw",
        height: isSmall ? "50vh" : "58vh",
        borderRadius: 0
      });

      if (img) {
        gsap.set(img, {
          scale: 1
        });
      }

      return;
    }

    const startWidth = isSmall ? "82vw" : "62vw";
    const startHeight = isSmall ? "42vh" : "56vh";

    gsap.set(box, {
      width: startWidth,
      height: startHeight,
      borderRadius: "3px"
    });

    if (img) {
      gsap.set(img, {
        scale: 1.14
      });
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: "+=1400",
        scrub: 1.1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });

    tl.to(
      box,
      {
        width: "100vw",
        height: "100vh",
        borderRadius: 0,
        ease: "none"
      },
      0
    );

    if (img) {

      tl.to(
        img,
        {
          scale: 1,
          ease: "none"
        },
        0
      );
    }

    const overlay = q("[data-zoom-overlay]", section);

    if (overlay) {

      tl.fromTo(
        overlay,
        {
          opacity: 0,
          y: 25
        },
        {
          opacity: 1,
          y: 0,
          ease: "none"
        },
        0.2
      );
    }
  });
}


/* ==========================================================================
   08. HERO ENTRANCE
   ========================================================================== */

function initHeroAnimation(gsap) {

  const hero = q("[data-hero]");

  if (!hero) return;

  const img =
    q("[data-hero-img] img", hero) ||
    q(".hero-bg", hero);

  const lines =
    qa("[data-hero-line]", hero);

  const fadeElements =
    qa("[data-hero-fade]", hero);

  const tl = gsap.timeline({
    delay: REDUCED ? 0 : 0.15
  });

  if (img) {

    tl.fromTo(
      img,
      {
        scale: REDUCED ? 1 : 1.12,
        opacity: REDUCED ? 1 : 0.7
      },
      {
        scale: 1,
        opacity: 1,
        duration: REDUCED ? 0.3 : 1.8,
        ease: "power3.out"
      },
      0
    );
  }

  lines.forEach((line, index) => {

    const words =
      line.querySelectorAll(".split-word");

    if (!words.length) return;

    if (REDUCED) {

      gsap.set(words, {
        y: "0%",
        opacity: 1
      });

      return;
    }

    gsap.set(words, {
      y: "115%",
      opacity: 0
    });

    tl.to(
      words,
      {
        y: "0%",
        opacity: 1,
        duration: 1.05,
        stagger: 0.06,
        ease: "power4.out"
      },
      0.18 + index * 0.11
    );
  });

  if (fadeElements.length) {

    tl.fromTo(
      fadeElements,
      {
        opacity: 0,
        y: 22
      },
      {
        opacity: 1,
        y: 0,
        duration: REDUCED ? 0.3 : 0.8,
        stagger: 0.09,
        ease: "power3.out"
      },
      REDUCED ? 0 : 0.65
    );
  }

  /* .hero-cinematic-stats > div is pre-hidden in CSS with its own
     opacity:0 + rotateX(20deg) 3D-flip state (independent of the wrapper's
     [data-hero-fade] fade) — animate those children explicitly or they
     stay invisible forever regardless of the wrapper's own reveal. */
  const statItems = qa(".hero-cinematic-stats > div", hero);
  if (statItems.length) {
    if (REDUCED) {
      gsap.set(statItems, { opacity: 1, y: 0, rotateX: 0 });
    } else {
      tl.to(
        statItems,
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out"
        },
        0.85
      );
    }
  }
}


/* ==========================================================================
   09. CINEMATIC HOME HERO
   ========================================================================== */

function initHeroCinematic(gsap, ScrollTrigger) {

  const hero =
    q("[data-hero-cinematic]");

  if (!hero) return;

  const bg =
    q(".hero-bg", hero);

  const glow =
    q(".hero-glow", hero);

  const floatWrap =
    q(".hero-character-float", hero);

  const char =
    q(".hero-character", hero);

  const orbit =
    qa(".hero-orbit", hero);

  const desktop =
    window.matchMedia(
      "(min-width: 901px)"
    ).matches;

  /* ----------------------------------------------------------------------
     Image loading refresh
     ---------------------------------------------------------------------- */

  [bg, char].forEach((img) => {

    if (!img) return;

    if (img.complete) return;

    img.addEventListener(
      "load",
      () => safeRefresh(ScrollTrigger),
      { once: true }
    );
  });


  /* ----------------------------------------------------------------------
     Background entrance
     ---------------------------------------------------------------------- */

  if (bg) {

    if (REDUCED) {

      gsap.set(bg, {
        scale: 1,
        opacity: 1,
        x: 0,
        y: 0
      });

    } else {

      gsap.fromTo(
        bg,
        {
          scale: 1.09,
          opacity: 0.65
        },
        {
          scale: 1,
          opacity: 1,
          duration: 1.8,
          ease: "power3.out",
          delay: 0.1
        }
      );
    }
  }


  /* ----------------------------------------------------------------------
     Glow entrance + breathing
     ---------------------------------------------------------------------- */

  if (glow) {

    if (REDUCED) {

      gsap.set(glow, {
        opacity: 1,
        scale: 1
      });

    } else {

      gsap.fromTo(
        glow,
        {
          opacity: 0,
          scale: 0.65
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.7,
          delay: 0.35,
          ease: "power3.out"
        }
      );

      gsap.to(glow, {
        scale: 1.08,
        opacity: 0.72,
        duration: 4.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }


  /* ----------------------------------------------------------------------
     Character entrance
     ---------------------------------------------------------------------- */

  if (char) {

    if (REDUCED) {

      gsap.set(char, {
        opacity: 1,
        scale: 1,
        y: 0,
        rotate: 0,
        rotationX: 0,
        rotationY: 0
      });

    } else {

      const heroCharacterTL =
        gsap.timeline();

      heroCharacterTL.fromTo(
        char,
        {
          opacity: 0,
          scale: 0.68,
          y: 130,
          rotate: -7
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          rotate: 0,
          duration: 1.65,
          ease: "power4.out"
        }
      );

      if (floatWrap) {

        heroCharacterTL.call(
          () => startCharacterFloat(),
          null,
          "-=0.15"
        );
      }
    }
  }


  /* ----------------------------------------------------------------------
     Character idle float
     ---------------------------------------------------------------------- */

  let floatTween = null;

  function startCharacterFloat() {

    if (
      REDUCED ||
      !floatWrap ||
      floatTween
    ) return;

    floatTween = gsap.to(
      floatWrap,
      {
        y: -11,
        rotation: 1,
        duration: 3.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      }
    );
  }


  /* ----------------------------------------------------------------------
     Desktop mouse parallax
     ---------------------------------------------------------------------- */

  if (
    desktop &&
    !REDUCED &&
    !TOUCH &&
    char
  ) {

    const xChar =
      gsap.quickTo(char, "x", {
        duration: 0.8,
        ease: "power3.out"
      });

    const yChar =
      gsap.quickTo(char, "y", {
        duration: 0.8,
        ease: "power3.out"
      });

    const rotY =
      gsap.quickTo(char, "rotationY", {
        duration: 0.8,
        ease: "power3.out"
      });

    const rotX =
      gsap.quickTo(char, "rotationX", {
        duration: 0.8,
        ease: "power3.out"
      });

    const bgX =
      bg
        ? gsap.quickTo(bg, "x", {
            duration: 1.2,
            ease: "power3.out"
          })
        : null;

    const bgY =
      bg
        ? gsap.quickTo(bg, "y", {
            duration: 1.2,
            ease: "power3.out"
          })
        : null;

    const glowX =
      glow
        ? gsap.quickTo(glow, "x", {
            duration: 1.4,
            ease: "power3.out"
          })
        : null;

    const glowY =
      glow
        ? gsap.quickTo(glow, "y", {
            duration: 1.4,
            ease: "power3.out"
          })
        : null;

    gsap.set(char, {
      transformPerspective: 900
    });

    function onMove(event) {

      const rect =
        hero.getBoundingClientRect();

      const px =
        (event.clientX - rect.left) /
        rect.width - 0.5;

      const py =
        (event.clientY - rect.top) /
        rect.height - 0.5;

      xChar(px * 28);
      yChar(py * 20);

      rotY(px * 9);
      rotX(-py * 7);

      if (bgX) bgX(px * 7);
      if (bgY) bgY(py * 5);

      if (glowX) glowX(px * 18);
      if (glowY) glowY(py * 14);
    }

    hero.addEventListener(
      "mousemove",
      onMove,
      { passive: true }
    );

    window.addEventListener(
      "mouseleave",
      () => {
        xChar(0);
        yChar(0);
        rotX(0);
        rotY(0);
      },
      { passive: true }
    );
  }


  /* ----------------------------------------------------------------------
     Character hover
     ---------------------------------------------------------------------- */

  if (
    char &&
    !TOUCH &&
    !REDUCED
  ) {

    char.addEventListener(
      "mouseenter",
      () => {

        gsap.to(char, {
          scale: 1.035,
          duration: 0.55,
          ease: "power3.out"
        });

        if (floatTween) {
          floatTween.timeScale(0.45);
        }
      }
    );

    char.addEventListener(
      "mouseleave",
      () => {

        gsap.to(char, {
          scale: 1,
          duration: 0.65,
          ease: "power3.out"
        });

        if (floatTween) {
          floatTween.timeScale(1);
        }
      }
    );
  }


  /* ----------------------------------------------------------------------
     Hero scroll depth
     ---------------------------------------------------------------------- */

  if (!REDUCED) {

    const depthTL =
      gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom top",
          scrub: 1
        }
      });

    if (bg) {

      depthTL.to(
        bg,
        {
          scale: 1.13,
          y: 50,
          ease: "none"
        },
        0
      );
    }

    if (char) {

      depthTL.to(
        char,
        {
          y: -80,
          scale: 0.94,
          ease: "none"
        },
        0
      );
    }

    if (glow) {

      depthTL.to(
        glow,
        {
          y: -90,
          scale: 1.25,
          opacity: 0.25,
          ease: "none"
        },
        0
      );
    }
  }


  /* ----------------------------------------------------------------------
     Character story
     ---------------------------------------------------------------------- */

  const story =
    q("[data-character-story]");

  if (!story) return;

  const storyChar =
    q(".story-character", story);

  const phases =
    qa(".story-phase", story);

  if (!storyChar || !phases.length) return;


  /* ----------------------------------------------------------------------
     Desktop pinned cinematic story
     ---------------------------------------------------------------------- */

  if (
    desktop &&
    !REDUCED
  ) {

    const storyTL =
      gsap.timeline({
        scrollTrigger: {
          trigger: story,
          start: "top top",
          end: "+=250%",
          scrub: 1.2,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      });

    gsap.set(
      storyChar,
      {
        xPercent: 0,
        yPercent: 0,
        scale: 0.72,
        rotate: -4,
        opacity: 1,
        transformPerspective: 900
      }
    );

    gsap.set(
      phases,
      {
        opacity: 0,
        y: 40
      }
    );

    gsap.set(
      phases[0],
      {
        opacity: 1,
        y: 0
      }
    );

    /* Phase 01 */
    storyTL
      .to(
        phases[0],
        {
          opacity: 0,
          y: -45,
          duration: 0.45,
          ease: "power2.in"
        },
        0.45
      )

      .to(
        storyChar,
        {
          xPercent: -22,
          scale: 0.88,
          rotate: 0,
          duration: 0.9,
          ease: "power3.inOut"
        },
        0.45
      )

      /* Phase 02 */
      .to(
        phases[1],
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out"
        },
        0.8
      )

      .to(
        phases[1],
        {
          opacity: 0,
          y: -45,
          duration: 0.45
        },
        1.75
      )

      /* Phase 03 */
      .to(
        storyChar,
        {
          xPercent: 4,
          scale: 1.06,
          rotate: 4,
          duration: 0.95,
          ease: "power3.inOut"
        },
        1.75
      )

      .to(
        phases[2],
        {
          opacity: 1,
          y: 0,
          duration: 0.5
        },
        2.1
      )

      .to(
        phases[2],
        {
          opacity: 0,
          y: -45,
          duration: 0.45
        },
        3
      )

      /* Phase 04 */
      .to(
        storyChar,
        {
          xPercent: 24,
          scale: 0.82,
          rotate: -3,
          opacity: 0.9,
          duration: 1,
          ease: "power3.inOut"
        },
        3
      )

      .to(
        phases[3],
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out"
        },
        3.35
      )

      .to(
        storyChar,
        {
          y: -15,
          duration: 0.7,
          ease: "sine.inOut"
        },
        3.55
      );
  }


  /* ----------------------------------------------------------------------
     Mobile story
     ---------------------------------------------------------------------- */

  else {

    gsap.set(
      storyChar,
      {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0
      }
    );

    gsap.set(
      phases,
      {
        opacity: 1,
        y: 0
      }
    );

    if (!REDUCED) {

      gsap.fromTo(
        storyChar,
        {
          opacity: 0,
          y: 45,
          scale: 0.94
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: story,
            start: "top 80%",
            once: true
          }
        }
      );

      phases.forEach((phase) => {

        gsap.fromTo(
          phase,
          {
            opacity: 0,
            y: 30
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: phase,
              start: "top 88%",
              once: true
            }
          }
        );
      });

      gsap.to(
        storyChar,
        {
          y: -9,
          duration: 2.8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        }
      );
    }
  }
}


/* ==========================================================================
   10. HORIZONTAL SCROLL
   ========================================================================== */

function initHorizontalScroll(gsap, ScrollTrigger) {

  qa("[data-h-scroll]").forEach((section) => {

    const track =
      q(".h-track", section);

    if (!track) return;

    const panels =
      qa(".h-panel", track);

    if (!panels.length) return;


    /* ----------------------------------------------------------------------
       Reduced motion / mobile = native swipe
       ---------------------------------------------------------------------- */

    if (
      REDUCED ||
      window.innerWidth <= 900
    ) {

      track.classList.add(
        "mobile-swipe"
      );

      section.classList.add(
        "mobile-unpinned"
      );

      gsap.set(track, {
        x: 0
      });

      return;
    }


    /* ----------------------------------------------------------------------
       Desktop horizontal pin
       ---------------------------------------------------------------------- */

    const getDistance = () =>
      Math.max(
        0,
        track.scrollWidth -
        window.innerWidth
      );

    const getEnd = () =>
      Math.max(
        1000,
        getDistance() + 900
      );

    gsap.to(
      track,
      {
        x: () =>
          -getDistance(),

        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => "+=" + getEnd(),
          scrub: 1.15,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true
        }
      }
    );


    /* ----------------------------------------------------------------------
       Individual panel depth
       ---------------------------------------------------------------------- */

    panels.forEach((panel, index) => {

      const inner =
        q("[data-panel-content]", panel);

      if (!inner) return;

      gsap.fromTo(
        inner,
        {
          opacity: 0.35,
          y: 45
        },
        {
          opacity: 1,
          y: 0,

          ease: "none",

          scrollTrigger: {
            trigger: panel,
            containerAnimation:
              gsap.getTweensOf(track)[0],
            start: "left 85%",
            end: "left 40%",
            scrub: true
          }
        }
      );
    });
  });
}


/* ==========================================================================
   11. PARALLAX
   ========================================================================== */

function initParallax(gsap, ScrollTrigger) {

  if (REDUCED) return;

  qa("[data-parallax]").forEach((el) => {

    const amount =
      parseFloat(
        el.dataset.parallax
      ) || 60;

    gsap.to(
      el,
      {
        y: amount,

        ease: "none",

        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1
        }
      }
    );
  });
}


/* ==========================================================================
   12. STAGGER / PRINCIPLES
   ========================================================================== */

function initStagger(gsap, ScrollTrigger) {

  qa("[data-stagger-lines]").forEach((el) => {

    const children =
      Array.from(el.children);

    if (!children.length) return;

    if (REDUCED) {

      gsap.set(children, {
        opacity: 1,
        x: 0
      });

      return;
    }

    gsap.fromTo(
      children,
      {
        opacity: 0,
        x: -35
      },
      {
        opacity: 1,
        x: 0,

        duration: 0.9,

        stagger: 0.11,

        ease: "power3.out",

        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          once: true
        }
      }
    );
  });


  qa(".principle-row").forEach((row, index) => {

    if (REDUCED) return;

    gsap.fromTo(
      row,
      {
        opacity: 0,
        x: -25
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        delay: index * 0.02,
        ease: "power3.out",
        scrollTrigger: {
          trigger: row,
          start: "top 90%",
          once: true
        }
      }
    );
  });
}


/* ==========================================================================
   13. SERVICE HOVER
   ========================================================================== */

function initServiceHover(gsap) {

  if (TOUCH || REDUCED) return;

  qa(".svc-panel").forEach((panel) => {

    const title =
      q("h3", panel);

    const arrow =
      q(".svc-arrow", panel);

    const num =
      q(".svc-num", panel);

    panel.addEventListener(
      "mouseenter",
      () => {

        if (title) {
          gsap.to(title, {
            x: 10,
            duration: 0.5,
            ease: "power3.out"
          });
        }

        if (arrow) {
          gsap.to(arrow, {
            x: 6,
            y: -4,
            rotation: 45,
            color: "#E8873B",
            duration: 0.55,
            ease: "power3.out"
          });
        }

        if (num) {
          gsap.to(num, {
            color: "#E8873B",
            duration: 0.3
          });
        }
      }
    );

    panel.addEventListener(
      "mouseleave",
      () => {

        if (title) {
          gsap.to(title, {
            x: 0,
            duration: 0.55,
            ease: "power3.out"
          });
        }

        if (arrow) {
          gsap.to(arrow, {
            x: 0,
            y: 0,
            rotation: 0,
            color: "",
            duration: 0.55,
            ease: "power3.out"
          });
        }

        if (num) {
          gsap.to(num, {
            color: "",
            duration: 0.3
          });
        }
      }
    );
  });
}


/* ==========================================================================
   14. IMAGE HOVER DEPTH
   ========================================================================== */

function initImageHover(gsap) {

  if (TOUCH || REDUCED) return;

  qa(
    ".gal-item, .doc-card, [data-image-depth]"
  ).forEach((card) => {

    const img =
      q("img", card);

    if (!img) return;

    card.addEventListener(
      "mouseenter",
      () => {

        gsap.to(img, {
          scale: 1.075,
          duration: 1.1,
          ease: "power3.out"
        });
      }
    );

    card.addEventListener(
      "mouseleave",
      () => {

        gsap.to(img, {
          scale: 1.04,
          duration: 1.1,
          ease: "power3.out"
        });
      }
    );
  });
}


/* ==========================================================================
   15. MAGNETIC BUTTONS
   ========================================================================== */

function initMagnetic(gsap) {

  gsap = gsap || window.gsap;
  if (!gsap) return;

  if (
    TOUCH ||
    REDUCED
  ) return;

  qa(
    "[data-magnetic], .btn, .nav-cta"
  ).forEach((button) => {

    let bounds;

    const strength =
      button.hasAttribute("data-magnetic")
        ? 0.22
        : 0.08;

    button.addEventListener(
      "mouseenter",
      () => {
        bounds =
          button.getBoundingClientRect();
      }
    );

    button.addEventListener(
      "mousemove",
      (event) => {

        bounds =
          bounds ||
          button.getBoundingClientRect();

        const x =
          event.clientX -
          bounds.left -
          bounds.width / 2;

        const y =
          event.clientY -
          bounds.top -
          bounds.height / 2;

        gsap.to(
          button,
          {
            x: x * strength,
            y: y * strength,
            duration: 0.45,
            ease: "power3.out"
          }
        );
      }
    );

    button.addEventListener(
      "mouseleave",
      () => {

        gsap.to(
          button,
          {
            x: 0,
            y: 0,
            duration: 0.65,
            ease: "elastic.out(1, .45)"
          }
        );
      }
    );
  });
}


/* ==========================================================================
   16. TILT CARDS
   ========================================================================== */

function initTilt(gsap) {

  /* animations.js defines this as a global function (it's the only one of
     the site's 3 separate initTilt implementations not wrapped in an IIFE),
     so it's what any bare `initTilt()` call actually resolves to — as
     happened in main.js, which was calling it with no argument. If gsap
     isn't passed explicitly, fall back to the real global GSAP object
     instead of crashing every tilt hover with "Cannot read properties of
     undefined (reading 'to')". */
  gsap = gsap || window.gsap;
  if (!gsap) return;

  if (
    TOUCH ||
    REDUCED
  ) return;

  qa("[data-tilt]").forEach((card) => {

    card.addEventListener(
      "mousemove",
      (event) => {

        const rect =
          card.getBoundingClientRect();

        const px =
          (event.clientX -
            rect.left) /
            rect.width -
          0.5;

        const py =
          (event.clientY -
            rect.top) /
            rect.height -
          0.5;

        gsap.to(
          card,
          {
            rotationY: px * 5,
            rotationX: -py * 5,
            transformPerspective: 900,
            duration: 0.35,
            ease: "power2.out"
          }
        );
      }
    );

    card.addEventListener(
      "mouseleave",
      () => {

        gsap.to(
          card,
          {
            rotationY: 0,
            rotationX: 0,
            duration: 0.7,
            ease: "power3.out"
          }
        );
      }
    );
  });
}


/* ==========================================================================
   17. ACCORDION
   ========================================================================== */

function initAccordion(gsap) {

  qa(".acc-row").forEach((row) => {

    const head =
      q(".acc-head", row) || row;

    head.addEventListener(
      "click",
      () => {

        const wasOpen =
          row.classList.contains("open");

        const parent =
          row.parentElement;

        qa(".acc-row", parent)
          .forEach((item) => {

            if (item === row) return;

            item.classList.remove(
              "open"
            );
          });

        if (wasOpen) {

          row.classList.remove(
            "open"
          );

        } else {

          row.classList.add(
            "open"
          );
        }

        if (
          window.ScrollTrigger
        ) {
          safeRefresh(
            window.ScrollTrigger
          );
        }
      }
    );
  });
}


/* ==========================================================================
   18. MARQUEE
   ========================================================================== */

function initMarquee(gsap) {

  qa("[data-marquee]").forEach((track) => {

    if (track.dataset.marqueeReady === "true") {
      return;
    }

    track.dataset.marqueeReady = "true";

    const original =
      track.innerHTML;

    track.innerHTML =
      original + original;

    const distance =
      track.scrollWidth / 2;

    const duration =
      Math.max(
        18,
        distance / 55
      );

    if (REDUCED) {

      gsap.set(track, {
        x: 0
      });

      return;
    }

    const tween =
      gsap.to(
        track,
        {
          x: -distance,
          duration,
          ease: "none",
          repeat: -1
        }
      );

    if (!TOUCH) {

      const wrap =
        track.closest(
          ".marquee-wrap"
        );

      if (!wrap) return;

      wrap.addEventListener(
        "mouseenter",
        () => tween.timeScale(0.2)
      );

      wrap.addEventListener(
        "mouseleave",
        () => tween.timeScale(1)
      );
    }
  });
}


/* ==========================================================================
   19. PROGRESS LINE
   ========================================================================== */

function initProgressLine(
  gsap,
  ScrollTrigger
) {

  qa("[data-progress-line]")
    .forEach((wrap) => {

      const fill =
        q(".pl-fill", wrap);

      if (!fill) return;

      if (REDUCED) {

        gsap.set(fill, {
          scaleY: 1
        });

        return;
      }

      gsap.fromTo(
        fill,
        {
          scaleY: 0
        },
        {
          scaleY: 1,
          transformOrigin:
            "top center",
          ease: "none",

          scrollTrigger: {
            trigger: wrap,
            start: "top 65%",
            end: "bottom 60%",
            scrub: 0.7
          }
        }
      );
    });
}


/* ==========================================================================
   20. COUNTERS
   ========================================================================== */

function initCounters(
  gsap,
  ScrollTrigger
) {

  qa("[data-count-to]")
    .forEach((el) => {

      const raw =
        el.dataset.countTo;

      const target =
        parseFloat(raw);

      if (Number.isNaN(target)) return;

      const decimals =
        raw.includes(".")
          ? raw.split(".")[1].length
          : 0;

      if (REDUCED) {

        el.textContent =
          target
            .toFixed(decimals)
            .replace(
              /\B(?=(\d{3})+(?!\d))/g,
              ","
            );

        return;
      }

      const proxy = {
        value: 0
      };

      gsap.to(
        proxy,
        {
          value: target,

          duration: 1.7,

          ease: "power2.out",

          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            once: true
          },

          onUpdate: () => {

            el.textContent =
              proxy.value
                .toFixed(decimals)
                .replace(
                  /\B(?=(\d{3})+(?!\d))/g,
                  ","
                );
          }
        }
      );
    });
}


/* ==========================================================================
   21. SCROLL PROGRESS
   ========================================================================== */

function initScrollProgress(gsap) {

  const fill =
    q(".scroll-progress-fill");

  if (!fill) return;

  if (REDUCED) {

    fill.style.width = "0%";

    return;
  }

  const update =
    gsap.quickTo(
      fill.style,
      "width",
      {
        duration: 0.18,
        ease: "power1.out"
      }
    );

  const onScroll = () => {

    const doc =
      document.documentElement;

    const max =
      doc.scrollHeight -
      window.innerHeight;

    const progress =
      max > 0
        ? (window.scrollY / max) * 100
        : 0;

    fill.style.width =
      clamp(progress, 0, 100) + "%";
  };

  window.addEventListener(
    "scroll",
    onScroll,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    onScroll
  );

  onScroll();
}


/* ==========================================================================
   22. NAVIGATION SCROLL STATE
   ========================================================================== */

function initNavScroll(gsap) {

  const nav =
    q("header.site-nav");

  if (!nav) return;

  let lastY =
    window.scrollY;

  let ticking = false;

  function update() {

    const y =
      window.scrollY;

    if (y > 40) {
      nav.classList.add(
        "scrolled"
      );
    } else {
      nav.classList.remove(
        "scrolled"
      );
    }

    /*
       Hide the navigation slightly while scrolling
       down, but bring it back immediately when scrolling
       upward.
    */

    if (
      window.innerWidth > 900 &&
      !REDUCED
    ) {

      if (
        y > lastY &&
        y > 160
      ) {

        gsap.to(
          nav,
          {
            yPercent: -100,
            duration: 0.45,
            ease: "power3.out",
            overwrite: true
          }
        );

      } else {

        gsap.to(
          nav,
          {
            yPercent: 0,
            duration: 0.5,
            ease: "power3.out",
            overwrite: true
          }
        );
      }
    }

    lastY = y;

    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {

      if (ticking) return;

      ticking = true;

      requestAnimationFrame(
        update
      );
    },
    { passive: true }
  );

  update();
}


/* ==========================================================================
   23. PAGE LOAD REVEAL
   ========================================================================== */

function initPageLoad(gsap) {

  const page =
    document.body;

  if (!page) return;

  page.classList.add(
    "is-loaded"
  );

  if (REDUCED) return;

  gsap.fromTo(
    "main",
    {
      opacity: 0.96
    },
    {
      opacity: 1,
      duration: 0.8,
      ease: "power2.out"
    }
  );
}


/* ==========================================================================
   24. PRELOADER
   ========================================================================== */

function initPreloader(gsap, ScrollTrigger) {

  const preloader =
    q("#preloader");

  if (!preloader) {

    initPageLoad(gsap);

    return;
  }

  document.body.classList.add(
    "no-scroll"
  );

  const mark =
    q(".pre-mark", preloader);

  const sub =
    q(".pre-sub", preloader);

  const count =
    q(".pre-count", preloader);

  const bar =
    q(".pre-bar-fill", preloader);

  const tl =
    gsap.timeline({
      onComplete: finish
    });

  if (REDUCED) {

    finish();

    return;
  }

  tl.to(
    mark,
    {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: "power3.out"
    }
  );

  tl.to(
    sub,
    {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: "power3.out"
    },
    "-=0.3"
  );

  const counter = {
    value: 0
  };

  tl.to(
    counter,
    {
      value: 100,
      duration: 1.55,
      ease: "power2.inOut",

      onUpdate: () => {

        const value =
          Math.round(
            counter.value
          );

        if (count) {
          count.textContent =
            String(value).padStart(
              2,
              "0"
            ) + "%";
        }

        if (bar) {
          bar.style.width =
            value + "%";
        }
      }
    }
  );

  tl.to(
    preloader,
    {
      yPercent: -100,
      duration: 1.15,
      ease: "power4.inOut"
    },
    "+=0.12"
  );

  function finish() {

    document.body.classList.remove(
      "no-scroll"
    );

    gsap.set(
      preloader,
      {
        display: "none"
      }
    );

    initPageLoad(gsap);

    if (ScrollTrigger) {
      safeRefresh(
        ScrollTrigger
      );
    }
  }
}


/* ==========================================================================
   25. CURSOR FOLLOW
   ========================================================================== */

function initCursorMotion(gsap) {

  const cursor =
    q("#cursor-dot");

  if (
    !cursor ||
    TOUCH ||
    REDUCED
  ) return;

  const xTo =
    gsap.quickTo(
      cursor,
      "x",
      {
        duration: 0.25,
        ease: "power3.out"
      }
    );

  const yTo =
    gsap.quickTo(
      cursor,
      "y",
      {
        duration: 0.25,
        ease: "power3.out"
      }
    );

  window.addEventListener(
    "mousemove",
    (event) => {

      xTo(event.clientX);
      yTo(event.clientY);
    },
    { passive: true }
  );

  qa(
    "[data-cursor-view]"
  ).forEach((el) => {

    const text =
      el.dataset.cursorView ||
      "View";

    el.addEventListener(
      "mouseenter",
      () => {

        cursor.classList.add(
          "big"
        );

        const label =
          q(".cursor-text", cursor);

        if (label) {
          label.textContent =
            text;
        }
      }
    );

    el.addEventListener(
      "mouseleave",
      () => {

        cursor.classList.remove(
          "big"
        );
      }
    );
  });
}


/* ==========================================================================
   26. SMOOTH ANCHOR LINKS
   ========================================================================== */

function initAnchorMotion(gsap) {

  if (REDUCED) return;

  qa(
    'a[href^="#"]'
  ).forEach((link) => {

    link.addEventListener(
      "click",
      (event) => {

        const href =
          link.getAttribute("href");

        if (
          !href ||
          href === "#"
        ) return;

        const target =
          q(href);

        if (!target) return;

        event.preventDefault();

        const nav =
          q("header.site-nav");

        const offset =
          nav
            ? nav.offsetHeight
            : 0;

        const top =
          target.getBoundingClientRect()
            .top +
          window.scrollY -
          offset;

        gsap.to(
          window,
          {
            duration: 1.15,
            scrollTo: {
              y: top,
              autoKill: true
            },
            ease: "power4.inOut"
          }
        );
      }
    );
  });
}


/* ==========================================================================
   27. MASTER INITIALIZER
   ========================================================================== */

function initAllAnimations(
  gsap,
  ScrollTrigger
) {

  if (!gsap) {
    console.warn(
      "Saraf Motion: GSAP not found."
    );
    return;
  }

  if (
    ScrollTrigger &&
    gsap.registerPlugin
  ) {
    gsap.registerPlugin(
      ScrollTrigger
    );
  }

  /* Text */
  qa("[data-hero-line]")
    .forEach(splitWords);

  initHeroAnimation(gsap);

  /* Cinematic hero */
  initHeroCinematic(
    gsap,
    ScrollTrigger
  );

  /* Scroll reveals */
  if (ScrollTrigger) {

    initTextReveal(
      gsap,
      ScrollTrigger
    );

    initFadeReveal(
      gsap,
      ScrollTrigger
    );

    initImageReveal(
      gsap,
      ScrollTrigger
    );

    initImageZoomPin(
      gsap,
      ScrollTrigger
    );

    initHorizontalScroll(
      gsap,
      ScrollTrigger
    );

    initParallax(
      gsap,
      ScrollTrigger
    );

    initStagger(
      gsap,
      ScrollTrigger
    );

    initProgressLine(
      gsap,
      ScrollTrigger
    );

    initCounters(
      gsap,
      ScrollTrigger
    );
  }

  /* UI */
  initAccordion(gsap);
  initMarquee(gsap);

  /* Interactions */
  initServiceHover(gsap);
  initImageHover(gsap);
  initMagnetic(gsap);
  initTilt(gsap);
  initCursorMotion(gsap);

  /* Global */
  initScrollProgress(gsap);
  initNavScroll(gsap);
  initAnchorMotion(gsap);

  /*
     NOTE: this file's own initPreloader()/initPageLoad() are intentionally
     NOT called here. js/main.js already owns the page's single preloader
     sequence (the #preloader element with id="pre-count"/id="pre-bar-fill")
     and calls initAllAnimations() itself once that sequence completes.
     Calling initPreloader() here as well re-ran a second, competing
     preloader animation on the same DOM element after main.js had already
     finished and hidden it — re-adding "no-scroll" to <body> with nothing
     left to ever remove it again, permanently locking every page from
     scrolling. If a future rework wants animations.js to own the preloader
     instead, main.js's own call to it must be removed first. */

  /* Final refresh after layout settles */
  setTimeout(() => {

    if (ScrollTrigger) {
      ScrollTrigger.refresh();
    }

  }, 350);
}


/* ==========================================================================
   28. RESIZE / REFRESH SAFETY
   ========================================================================== */

let sarafResizeTimer = null;

window.addEventListener(
  "resize",
  () => {

    clearTimeout(
      sarafResizeTimer
    );

    sarafResizeTimer =
      setTimeout(() => {

        if (
          window.ScrollTrigger
        ) {
          window.ScrollTrigger.refresh();
        }

      }, 250);
  },
  { passive: true }
);

function initCaseStudies(gsap, ScrollTrigger) {

  const cases = document.querySelectorAll(".case-pinned");

  if (!cases.length) return;

  const reduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduced) return;


  cases.forEach((section) => {

    const image = section.querySelector(".case-image");
    const img = section.querySelector(".case-image img");
    const content = section.querySelector(".case-information");
    const number = section.querySelector(".case-image-number");


    gsap.set(image, {
      scale: .82,
      borderRadius: "0px"
    });


    gsap.set(img, {
      scale: 1.25
    });


    gsap.set(content, {
      y: 100,
      opacity: 0
    });


    gsap.set(number, {
      y: 40,
      opacity: 0
    });


    const tl = gsap.timeline({
      scrollTrigger: {

        trigger: section,

        start: "top top",

        end: "+=140%",

        scrub: 1.2,

        pin: true,

        anticipatePin: 1

      }
    });


    tl.to(image, {
      scale: 1,
      borderRadius: "2px",
      ease: "power3.out"
    }, 0);


    tl.to(img, {
      scale: 1,
      ease: "power2.out"
    }, 0);


    tl.to(content, {
      y: 0,
      opacity: 1,
      ease: "power3.out"
    }, .12);


    tl.to(number, {
      y: 0,
      opacity: 1,
      ease: "power3.out"
    }, .15);


    tl.to(img, {
      scale: 1.08,
      ease: "none"
    }, .65);

  });


  /* --------------------------------------------
     MARQUEE
  -------------------------------------------- */

  const marquee =
    document.querySelector(".cases-marquee-track");


  if (marquee) {

    gsap.to(marquee, {

      xPercent: -35,

      ease: "none",

      scrollTrigger: {

        trigger: ".cases-marquee",

        start: "top bottom",

        end: "bottom top",

        scrub: 1

      }

    });

  }


  /* --------------------------------------------
     FINAL STATEMENT
  -------------------------------------------- */

  const statement =
    document.querySelector(".cases-statement h2");


  if (statement) {

    gsap.from(statement, {

      y: 120,

      opacity: 0,

      duration: 1.2,

      ease: "power4.out",

      scrollTrigger: {

        trigger: ".cases-statement",

        start: "top 70%",

        once: true

      }

    });

  }

}

/* ============================================================
   SARAF DENTAL CARE
   CONTACT PAGE CINEMATIC MOTION
   ============================================================ */

function initContactAnimations(gsap, ScrollTrigger){

  if(!document.querySelector(".contact-cinematic")) return;

  const reduced =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  if(reduced) return;


  /* ----------------------------------------------------------
     HERO IMAGE
     ---------------------------------------------------------- */

  const heroImage =
    document.querySelector(
      "[data-contact-hero-image]"
    );

  if(heroImage){

    gsap.to(heroImage,{

      scale:1,

      duration:1.8,

      ease:"power3.out"

    });


    gsap.to(heroImage,{

      yPercent:12,

      ease:"none",

      scrollTrigger:{

        trigger:".contact-hero",

        start:"top top",

        end:"bottom top",

        scrub:1.2

      }

    });

  }


  /* ----------------------------------------------------------
     HERO TITLE
     ---------------------------------------------------------- */

  gsap.from(
    ".contact-hero-title h1",

    {

      y:130,

      opacity:0,

      duration:1.3,

      delay:.2,

      ease:"power4.out"

    }

  );


  gsap.from(
    ".contact-hero-bottom",

    {

      y:50,

      opacity:0,

      duration:1,

      delay:.6,

      ease:"power3.out"

    }

  );


  /* ----------------------------------------------------------
     INTRO
     ---------------------------------------------------------- */

  gsap.from(
    ".contact-intro h2",

    {

      y:100,

      opacity:0,

      duration:1.2,

      ease:"power4.out",

      scrollTrigger:{

        trigger:".contact-intro",

        start:"top 70%",

        once:true

      }

    }

  );


  /* ----------------------------------------------------------
     FORM
     ---------------------------------------------------------- */

  gsap.from(
    ".contact-form",

    {

      y:80,

      opacity:0,

      duration:1,

      ease:"power4.out",

      scrollTrigger:{

        trigger:".contact-form-section",

        start:"top 70%",

        once:true

      }

    }

  );


  /* ----------------------------------------------------------
     FORM FIELDS
     ---------------------------------------------------------- */

  gsap.from(
    ".contact-form .field",

    {

      y:35,

      opacity:0,

      duration:.65,

      stagger:.06,

      ease:"power3.out",

      scrollTrigger:{

        trigger:".contact-fields",

        start:"top 80%",

        once:true

      }

    }

  );


  /* ----------------------------------------------------------
     TREATMENT CARDS
     ---------------------------------------------------------- */

  gsap.from(
    ".contact-treatment",

    {

      y:30,

      opacity:0,

      duration:.6,

      stagger:.06,

      ease:"power3.out",

      scrollTrigger:{

        trigger:".contact-treatment-grid",

        start:"top 80%",

        once:true

      }

    }

  );


  /* ----------------------------------------------------------
     INFO CARDS
     ---------------------------------------------------------- */

  gsap.from(
    ".contact-info-card",

    {

      y:70,

      opacity:0,

      duration:.8,

      stagger:.1,

      ease:"power4.out",

      scrollTrigger:{

        trigger:".contact-info-grid",

        start:"top 80%",

        once:true

      }

    }

  );


  /* ----------------------------------------------------------
     MAP
     ---------------------------------------------------------- */

  gsap.from(
    ".map-pin",

    {

      scale:0,

      opacity:0,

      duration:1,

      ease:"elastic.out(1,.5)",

      scrollTrigger:{

        trigger:".contact-map-section",

        start:"top 70%",

        once:true

      }

    }

  );


  /* ----------------------------------------------------------
     MARQUEE
     ---------------------------------------------------------- */

  const track =
    document.querySelector(
      ".contact-quick-track"
    );

  if(track){

    gsap.to(track,{

      xPercent:-25,

      ease:"none",

      scrollTrigger:{

        trigger:".contact-quick",

        start:"top bottom",

        end:"bottom top",

        scrub:1

      }

    });

  }


  /* ----------------------------------------------------------
     FINAL ORBIT
     ---------------------------------------------------------- */

  const orbit =
    document.querySelector(
      ".contact-final-orbit"
    );

  if(orbit){

    gsap.to(orbit,{

      rotation:360,

      ease:"none",

      scrollTrigger:{

        trigger:".contact-final",

        start:"top bottom",

        end:"bottom top",

        scrub:2

      }

    });

  }


  /* ----------------------------------------------------------
     INPUT INTERACTION
     ---------------------------------------------------------- */

  document
    .querySelectorAll(
      ".contact-form input, .contact-form textarea"
    )
    .forEach(input => {

      input.addEventListener(
        "focus",
        () => {

          gsap.to(input,{

            x:8,

            duration:.3,

            ease:"power2.out"

          });

        }
      );


      input.addEventListener(
        "blur",
        () => {

          gsap.to(input,{

            x:0,

            duration:.3,

            ease:"power2.out"

          });

        }
      );

    });


  ScrollTrigger.refresh();

}


/* ==========================================================================
   29. PAGE VISIBILITY
   ========================================================================== */

document.addEventListener(
  "visibilitychange",
  () => {

    if (
      !window.gsap ||
      REDUCED
    ) return;

    if (
      document.hidden
    ) {

      window.gsap.globalTimeline.pause();

    } else {

      window.gsap.globalTimeline.resume();

      if (
        window.ScrollTrigger
      ) {
        window.ScrollTrigger.refresh();
      }
    }
  }
);


/* ==========================================================================
   END — SARAF DENTAL CARE CINEMATIC MOTION SYSTEM
   ========================================================================== */
