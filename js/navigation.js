// ==========================================================================
// SARAF DENTAL CARE — PREMIUM CINEMATIC NAVIGATION
// ==========================================================================
//
// Features
// --------------------------------------------------------------------------
// • Scroll-aware navigation
// • Glass / blur navigation state
// • Dark / light section theme switching
// • Scroll direction hide/show
// • Animated mobile fullscreen menu
// • Staggered menu typography
// • Menu background reveal
// • ESC close
// • Outside-click close
// • Active page detection
// • Active link indicator
// • Smooth navigation
// • CTA hover state
// • Mobile safe-area support
// • Scroll locking
// • GSAP-powered micro interactions
// ==========================================================================


function initNavigation(gsap, ScrollTrigger) {

  "use strict";


  // ==========================================================================
  // SAFETY
  // ==========================================================================

  const nav =
    document.querySelector(
      "header.site-nav"
    );

  if (!nav) return;


  if (
    typeof gsap ===
    "undefined"
  ) {

    console.warn(
      "Saraf Navigation: GSAP not loaded."
    );

    return;
  }


  if (
    typeof ScrollTrigger ===
    "undefined"
  ) {

    console.warn(
      "Saraf Navigation: ScrollTrigger not loaded."
    );

  }


  // ==========================================================================
  // ELEMENTS
  // ==========================================================================

  const burger =
    document.querySelector(
      ".nav-burger"
    );


  const menu =
    document.getElementById(
      "mobile-menu"
    );


  const menuPanel =
    menu?.querySelector(
      ".mm-inner, .mm-content, .mm-panel"
    );


  const menuLinks =
    menu
      ? menu.querySelectorAll(
          ".mm-links a"
        )
      : [];


  const menuSpans =
    menu
      ? menu.querySelectorAll(
          ".mm-links a span"
        )
      : [];


  const menuMeta =
    menu
      ? menu.querySelectorAll(
          ".mm-meta, .mm-footer, .mm-info"
        )
      : [];


  const closeButton =
    menu?.querySelector(
      "[data-menu-close]"
    );


  // ==========================================================================
  // STATE
  // ==========================================================================

  let menuOpen =
    false;


  let lastScroll =
    window.scrollY;


  let ticking =
    false;


  const isTouch =
    window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;


  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  // ==========================================================================
  // INITIAL NAVIGATION STATE
  // ==========================================================================

  gsap.set(
    nav,
    {
      y: 0
    }
  );


  // ==========================================================================
  // SCROLL STATE
  // ==========================================================================

  function updateScrollState() {

    const currentScroll =
      window.scrollY;


    const scrollingDown =
      currentScroll >
      lastScroll;


    const passedTop =
      currentScroll >
      40;


    nav.classList.toggle(
      "scrolled",
      passedTop
    );


    nav.classList.toggle(
      "at-top",
      !passedTop
    );


    /*
       Hide navigation while scrolling down.

       Only do this after the user has moved
       sufficiently down the page.
    */

    if (
      !menuOpen &&
      !reducedMotion &&
      currentScroll > 160
    ) {

      if (
        scrollingDown &&
        currentScroll >
          lastScroll + 2
      ) {

        nav.classList.add(
          "nav-hidden"
        );

      }

      else if (
        !scrollingDown &&
        currentScroll <
          lastScroll - 2
      ) {

        nav.classList.remove(
          "nav-hidden"
        );

      }

    }


    /*
       Always show navigation near top.
    */

    if (
      currentScroll <= 80
    ) {

      nav.classList.remove(
        "nav-hidden"
      );

    }


    lastScroll =
      currentScroll;

    ticking =
      false;

  }


  function requestScrollUpdate() {

    if (ticking) return;

    ticking = true;

    requestAnimationFrame(
      updateScrollState
    );

  }


  window.addEventListener(
    "scroll",
    requestScrollUpdate,
    {
      passive: true
    }
  );


  // ==========================================================================
  // SCROLLTRIGGER BASE STATE
  // ==========================================================================

  if (
    typeof ScrollTrigger !==
    "undefined"
  ) {

    ScrollTrigger.create({

      start:
        "top top",

      end:
        "max",

      onUpdate:
        requestScrollUpdate

    });

  }


  // ==========================================================================
  // SECTION THEME SWITCHING
  // ==========================================================================

  function initThemeSwitching() {

    if (
      typeof ScrollTrigger ===
      "undefined"
    ) {
      return;
    }


    const sections =
      document.querySelectorAll(
        "[data-nav-theme]"
      );


    if (!sections.length) {
      return;
    }


    sections.forEach(
      (section) => {

        const theme =
          section.dataset.navTheme;


        ScrollTrigger.create({

          trigger:
            section,

          start:
            "top 92px",

          end:
            "bottom 92px",

          onEnter:
            () => setNavTheme(
              theme
            ),

          onEnterBack:
            () => setNavTheme(
              theme
            )

        });

      }
    );

  }


  function setNavTheme(
    theme
  ) {

    const dark =
      theme ===
      "dark";


    nav.classList.toggle(
      "theme-dark",
      dark
    );


    nav.classList.toggle(
      "theme-light",
      !dark
    );

  }


  initThemeSwitching();


  // ==========================================================================
  // ACTIVE PAGE
  // ==========================================================================

  function initActivePage() {

    const currentPath =
      window.location.pathname
        .split("/")
        .pop()
        .toLowerCase();


    const currentPage =
      currentPath ||
      "index.html";


    document
      .querySelectorAll(
        "nav a[href], .nav-center a[href], .mm-links a[href]"
      )
      .forEach(
        (link) => {

          const href =
            link
              .getAttribute(
                "href"
              )
              ?.split("#")[0]
              .split("?")[0]
              .split("/")
              .pop()
              .toLowerCase();


          if (
            !href ||
            href ===
              "javascript:void(0)"
          ) {
            return;
          }


          const isHome =
            (
              currentPage ===
                "" ||
              currentPage ===
                "index.html"
            ) &&
            (
              href ===
                "" ||
              href ===
                "index.html"
            );


          const active =
            href ===
              currentPage ||
            isHome;


          link.classList.toggle(
            "is-active",
            active
          );


          if (active) {

            link.setAttribute(
              "aria-current",
              "page"
            );

          }

          else {

            link.removeAttribute(
              "aria-current"
            );

          }

        }
      );

  }


  initActivePage();


  // ==========================================================================
  // MOBILE MENU
  // ==========================================================================

  if (
    !burger ||
    !menu
  ) {
    return;
  }


  // --------------------------------------------------------------------------
  // ARIA
  // --------------------------------------------------------------------------

  burger.setAttribute(
    "aria-expanded",
    "false"
  );


  burger.setAttribute(
    "aria-controls",
    "mobile-menu"
  );


  menu.setAttribute(
    "aria-hidden",
    "true"
  );


  // ==========================================================================
  // MENU TIMELINE
  // ==========================================================================

  const menuTimeline =
    gsap.timeline({
      paused: true
    });


  // --------------------------------------------------------------------------
  // Initial states
  // --------------------------------------------------------------------------

  if (!reducedMotion) {

    gsap.set(
      menu,
      {
        autoAlpha:
          0,

        pointerEvents:
          "none"
      }
    );


    gsap.set(
      menuSpans,
      {
        yPercent:
          115,

        opacity:
          0
      }
    );


    gsap.set(
      menuMeta,
      {
        y:
          20,

        opacity:
          0
      }
    );


    if (menuPanel) {

      gsap.set(
        menuPanel,
        {
          y:
            30,

          opacity:
            0
        }
      );

    }

  }


  // ==========================================================================
  // OPEN ANIMATION
  // ==========================================================================

  menuTimeline
    .to(
      menu,
      {
        autoAlpha:
          1,

        pointerEvents:
          "auto",

        duration:
          0.55,

        ease:
          "power3.out"
      }
    )
    .to(
      menuPanel,
      {
        y:
          0,

        opacity:
          1,

        duration:
          0.65,

        ease:
          "power4.out"
      },
      "-=0.35"
    )
    .to(
      menuSpans,
      {
        yPercent:
          0,

        opacity:
          1,

        duration:
          0.75,

        stagger:
          0.065,

        ease:
          "power4.out"
      },
      "-=0.42"
    )
    .to(
      menuMeta,
      {
        y:
          0,

        opacity:
          1,

        duration:
          0.5,

        stagger:
          0.08,

        ease:
          "power3.out"
      },
      "-=0.4"
    );


  // ==========================================================================
  // OPEN MENU
  // ==========================================================================

  function openMenu() {

    if (menuOpen) return;


    menuOpen =
      true;


    burger.classList.add(
      "open"
    );


    menu.classList.add(
      "open"
    );


    document.body.classList.add(
      "no-scroll"
    );


    document.documentElement.classList.add(
      "menu-open"
    );


    burger.setAttribute(
      "aria-expanded",
      "true"
    );


    menu.setAttribute(
      "aria-hidden",
      "false"
    );


    /*
       Show navigation even if it was
       hidden from scroll direction.
    */

    nav.classList.remove(
      "nav-hidden"
    );


    if (reducedMotion) {

      gsap.set(
        menu,
        {
          autoAlpha:
            1,

          pointerEvents:
            "auto"
        }
      );

      gsap.set(
        menuSpans,
        {
          yPercent:
            0,

          opacity:
            1
        }
      );

      return;
    }


    menuTimeline
      .restart();

  }


  // ==========================================================================
  // CLOSE MENU
  // ==========================================================================

  function closeMenu() {

    if (!menuOpen) return;


    menuOpen =
      false;


    burger.classList.remove(
      "open"
    );


    menu.classList.remove(
      "open"
    );


    document.body.classList.remove(
      "no-scroll"
    );


    document.documentElement.classList.remove(
      "menu-open"
    );


    burger.setAttribute(
      "aria-expanded",
      "false"
    );


    menu.setAttribute(
      "aria-hidden",
      "true"
    );


    if (reducedMotion) {

      gsap.set(
        menu,
        {
          autoAlpha:
            0,

          pointerEvents:
            "none"
        }
      );

      return;
    }


    menuTimeline
      .reverse();

  }


  // ==========================================================================
  // BURGER
  // ==========================================================================

  burger.addEventListener(
    "click",
    (event) => {

      event.preventDefault();

      if (menuOpen) {

        closeMenu();

      }

      else {

        openMenu();

      }

    }
  );


  // ==========================================================================
  // CLOSE BUTTON
  // ==========================================================================

  if (closeButton) {

    closeButton.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        closeMenu();

      }
    );

  }


  // ==========================================================================
  // ESCAPE KEY
  // ==========================================================================

  document.addEventListener(
    "keydown",
    (event) => {

      if (
        event.key ===
        "Escape" &&
        menuOpen
      ) {

        closeMenu();

        burger.focus();

      }

    }
  );


  // ==========================================================================
  // CLICK OUTSIDE
  // ==========================================================================

  menu.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        menu
      ) {

        closeMenu();

      }

    }
  );


  // ==========================================================================
  // MENU LINKS
  // ==========================================================================

  menuLinks.forEach(
    (link) => {

      link.addEventListener(
        "click",
        () => {

          /*
             Close menu first.
          */

          closeMenu();

        }
      );


      // ---------------------------------------------------------------
      // Hover interaction
      // ---------------------------------------------------------------

      if (
        !isTouch &&
        !reducedMotion
      ) {

        link.addEventListener(
          "mouseenter",
          () => {

            gsap.to(
              menuLinks,
              {
                opacity:
                  0.38,

                duration:
                  0.25,

                ease:
                  "power2.out"
              }
            );


            gsap.to(
              link,
              {
                opacity:
                  1,

                x:
                  10,

                duration:
                  0.4,

                ease:
                  "power3.out"
              }
            );

          }
        );


        link.addEventListener(
          "mouseleave",
          () => {

            gsap.to(
              menuLinks,
              {
                opacity:
                  1,

                x:
                  0,

                duration:
                  0.45,

                ease:
                  "power3.out"
              }
            );

          }
        );

      }

    }
  );


  // ==========================================================================
  // BURGER MICRO INTERACTION
  // ==========================================================================

  if (
    !isTouch &&
    !reducedMotion
  ) {

    burger.addEventListener(
      "mouseenter",
      () => {

        gsap.to(
          burger,
          {
            scale:
              1.06,

            duration:
              0.35,

            ease:
              "power3.out"
          }
        );

      }
    );


    burger.addEventListener(
      "mouseleave",
      () => {

        gsap.to(
          burger,
          {
            scale:
              1,

            duration:
              0.45,

            ease:
              "power3.out"
          }
        );

      }
    );

  }


  // ==========================================================================
  // HEADER LINK HOVER
  // ==========================================================================

  if (
    !isTouch &&
    !reducedMotion
  ) {

    nav
      .querySelectorAll(
        ".nav-center a, .nav-links a"
      )
      .forEach(
        (link) => {

          const underline =
            link.querySelector(
              "::after"
            );


          link.addEventListener(
            "mouseenter",
            () => {

              gsap.to(
                link,
                {
                  y:
                    -1,

                  duration:
                    0.25,

                  ease:
                    "power2.out"
                }
              );

            }
          );


          link.addEventListener(
            "mouseleave",
            () => {

              gsap.to(
                link,
                {
                  y:
                    0,

                  duration:
                    0.35,

                  ease:
                    "power2.out"
                }
              );

            }
          );

        }
      );

  }


  // ==========================================================================
  // SMOOTH ANCHOR NAVIGATION
  // ==========================================================================

  document
    .querySelectorAll(
      'a[href^="#"]'
    )
    .forEach(
      (link) => {

        link.addEventListener(
          "click",
          (event) => {

            const id =
              link
                .getAttribute(
                  "href"
                )
                ?.substring(1);


            if (!id) return;


            const target =
              document.getElementById(
                id
              );


            if (!target) return;


            event.preventDefault();


            closeMenu();


            if (
              typeof ScrollToPlugin !==
              "undefined" &&
              !reducedMotion
            ) {

              gsap.to(
                window,
                {
                  duration:
                    1.15,

                  scrollTo:
                    {
                      y:
                        target,

                      offsetY:
                        100
                    },

                  ease:
                    "power4.inOut"
                }
              );

            }

            else {

              target.scrollIntoView({
                behavior:
                  reducedMotion
                    ? "auto"
                    : "smooth"
              });

            }

          }
        );

      }
    );


  // ==========================================================================
  // RESIZE SAFETY
  // ==========================================================================

  let resizeTimer;


  window.addEventListener(
    "resize",
    () => {

      clearTimeout(
        resizeTimer
      );


      resizeTimer =
        setTimeout(
          () => {

            /*
               If viewport becomes desktop
               while menu is open, reset it.
            */

            if (
              window.innerWidth >
                1100 &&
              menuOpen
            ) {

              closeMenu();

            }


            if (
              typeof ScrollTrigger !==
              "undefined"
            ) {

              ScrollTrigger.refresh();

            }

          },
          250
        );

    },
    {
      passive:
        true
    }
  );


  // ==========================================================================
  // PUBLIC API
  // ==========================================================================

  window.SarafNavigation = {

    open:
      openMenu,

    close:
      closeMenu,

    toggle:
      () => {

        menuOpen
          ? closeMenu()
          : openMenu();

      },

    theme:
      setNavTheme

  };


  // ==========================================================================
  // FINAL STATE
  // ==========================================================================

  updateScrollState();

}