// ==========================================================================
// SARAF DENTAL CARE — MAIN.JS
// Central application controller
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {

  "use strict";

  // ------------------------------------------------------------------------
  // GSAP CHECK
  // ------------------------------------------------------------------------

  if (typeof gsap === "undefined") {
    console.error("Saraf Dental Care: GSAP is not loaded.");
    return;
  }

  // ------------------------------------------------------------------------
  // REGISTER PLUGINS
  // ------------------------------------------------------------------------

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (typeof ScrollToPlugin !== "undefined") {
    gsap.registerPlugin(ScrollToPlugin);
  }

  // ------------------------------------------------------------------------
  // SETTINGS
  // ------------------------------------------------------------------------

  const reducedMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  // =========================================================================
  // PRELOADER
  // =========================================================================

  const preloader =
    document.getElementById("preloader");

  const count =
    document.getElementById("pre-count");

  const bar =
    document.getElementById("pre-bar-fill");


  function finishLoading() {

    document.body.classList.remove("no-scroll");

    document.body.classList.add("is-loaded");

    if (!preloader) {
      startSite();
      return;
    }

    gsap.to(preloader, {
      yPercent: -100,
      duration: reducedMotion ? 0 : 1,
      ease: "power4.inOut",
      onComplete: () => {
        preloader.style.display = "none";

        startSite();

        if (typeof ScrollTrigger !== "undefined") {
          ScrollTrigger.refresh();
        }
      }
    });
  }


  function runPreloader() {

    if (!preloader) {
      startSite();
      return;
    }

    if (reducedMotion) {
      preloader.style.display = "none";
      startSite();
      return;
    }

    document.body.classList.add("no-scroll");

    const counter = {
      value: 0
    };


    gsap.set(preloader, {
      yPercent: 0
    });


    gsap.to(counter, {

      value: 100,

      duration: 1.8,

      ease: "power2.inOut",

      onUpdate: () => {

        const value =
          Math.round(counter.value);

        if (count) {
          count.textContent =
            `${value}%`;
        }

        if (bar) {
          bar.style.width =
            `${value}%`;
        }

      },

      onComplete: () => {

        finishLoading();

      }

    });

  }


  // =========================================================================
  // START WEBSITE
  // =========================================================================

  function startSite() {

    // -----------------------------------------------------------------------
    // Navigation
    // -----------------------------------------------------------------------

    if (
      typeof initNavigation === "function"
    ) {

      initNavigation(
        gsap,
        ScrollTrigger
      );

    }


    // -----------------------------------------------------------------------
    // MAIN CINEMATIC ANIMATIONS
    // -----------------------------------------------------------------------

    if (
      typeof initAllAnimations === "function"
    ) {

      initAllAnimations(
        gsap,
        ScrollTrigger
      );

    }


    // -----------------------------------------------------------------------
    // Case studies
    // -----------------------------------------------------------------------

    if (
      typeof initCaseStudies === "function"
    ) {

      initCaseStudies(
        gsap,
        ScrollTrigger
      );

    }


    // -----------------------------------------------------------------------
    // Custom cursor / magnetic buttons / image tilt
    // -----------------------------------------------------------------------

    if (typeof initCursor === "function") {
      initCursor();
    }

    if (typeof initMagnetic === "function") {
      initMagnetic(gsap);
    }

    if (typeof initTilt === "function") {
      initTilt(gsap);
    }


    // -----------------------------------------------------------------------
    // Page transitions
    // -----------------------------------------------------------------------

    if (
      typeof initPageTransition === "function"
    ) {

      initPageTransition(
        gsap
      );

    }


    // -----------------------------------------------------------------------
    // Forms
    // -----------------------------------------------------------------------

    initForms();


    // -----------------------------------------------------------------------
    // Reviews
    // -----------------------------------------------------------------------

    initTrackControls();


    // -----------------------------------------------------------------------
    // Before / After
    // -----------------------------------------------------------------------

    initComparisons();


    // -----------------------------------------------------------------------
    // Refresh
    // -----------------------------------------------------------------------

    refreshScroll();

  }


  // =========================================================================
  // SCROLLTRIGGER REFRESH
  // =========================================================================

  function refreshScroll() {

    if (
      typeof ScrollTrigger ===
      "undefined"
    ) {
      return;
    }

    requestAnimationFrame(() => {

      requestAnimationFrame(() => {

        ScrollTrigger.refresh();

      });

    });

  }


  // =========================================================================
  // FORMS
  // =========================================================================

  function initForms() {

    document
      .querySelectorAll("[data-form]")
      .forEach((form) => {

        if (
          form.dataset.ready === "true"
        ) {
          return;
        }

        form.dataset.ready = "true";


        form.addEventListener(
          "submit",
          (event) => {

            event.preventDefault();


            const success =
              form.querySelector(
                ".form-success"
              ) ||
              form.parentElement?.querySelector(
                ".form-success"
              );


            gsap.to(form, {

              opacity: 0.35,

              duration: 0.35,

              ease: "power2.out"

            });


            form.style.pointerEvents =
              "none";


            if (success) {

              success.classList.add(
                "show"
              );


              gsap.fromTo(

                success,

                {
                  opacity: 0,
                  y: 20
                },

                {
                  opacity: 1,
                  y: 0,

                  duration: 0.7,

                  ease: "power3.out"

                }

              );

            }

          }
        );

      });

  }


  // =========================================================================
  // TESTIMONIAL / REVIEW SLIDER
  // =========================================================================

  function initTrackControls() {

    document
      .querySelectorAll(
        "[data-track-controls]"
      )
      .forEach((wrap) => {


        if (
          wrap.dataset.ready === "true"
        ) {
          return;
        }

        wrap.dataset.ready = "true";


        const track =
          wrap.querySelector(
            "[data-track]"
          );

        const prev =
          wrap.querySelector(
            "[data-track-prev]"
          );

        const next =
          wrap.querySelector(
            "[data-track-next]"
          );


        if (!track) return;


        function getStep() {

          const card =
            track.firstElementChild;

          if (!card) {
            return 320;
          }


          const style =
            window.getComputedStyle(
              track
            );


          const gap =
            parseFloat(
              style.gap ||
              style.columnGap ||
              "24"
            ) || 24;


          return (
            card.getBoundingClientRect()
              .width +
            gap
          );

        }


        if (next) {

          next.addEventListener(
            "click",
            () => {

              track.scrollBy({

                left:
                  getStep(),

                behavior:
                  "smooth"

              });

            }
          );

        }


        if (prev) {

          prev.addEventListener(
            "click",
            () => {

              track.scrollBy({

                left:
                  -getStep(),

                behavior:
                  "smooth"

              });

            }
          );

        }

      });

  }


  // =========================================================================
  // BEFORE / AFTER COMPARISON
  // =========================================================================

  function initComparisons() {

    document
      .querySelectorAll(
        "[data-compare]"
      )
      .forEach((wrap) => {


        if (
          wrap.dataset.ready === "true"
        ) {
          return;
        }

        wrap.dataset.ready = "true";


        const handle =
          wrap.querySelector(
            ".cmp-handle"
          );

        const after =
          wrap.querySelector(
            ".cmp-after"
          );


        if (
          !handle ||
          !after
        ) {
          return;
        }


        let dragging = false;


        function setPosition(
          clientX
        ) {

          const rect =
            wrap.getBoundingClientRect();


          let percentage =
            (
              clientX -
              rect.left
            ) /
            rect.width *
            100;


          percentage =
            Math.max(
              6,
              Math.min(
                94,
                percentage
              )
            );


          after.style.clipPath =
            `inset(0 0 0 ${percentage}%)`;


          handle.style.left =
            `${percentage}%`;


          handle.setAttribute(
            "aria-valuenow",
            Math.round(
              percentage
            )
          );

        }


        // -------------------------------------------------------------------
        // Pointer Events
        // -------------------------------------------------------------------

        handle.addEventListener(
          "pointerdown",
          (event) => {

            dragging = true;

            handle.setPointerCapture?.(
              event.pointerId
            );

            wrap.classList.add(
              "is-dragging"
            );

            setPosition(
              event.clientX
            );

            event.preventDefault();

          }
        );


        handle.addEventListener(
          "pointermove",
          (event) => {

            if (!dragging) return;

            setPosition(
              event.clientX
            );

          }
        );


        handle.addEventListener(
          "pointerup",
          () => {

            dragging = false;

            wrap.classList.remove(
              "is-dragging"
            );

          }
        );


        handle.addEventListener(
          "pointercancel",
          () => {

            dragging = false;

            wrap.classList.remove(
              "is-dragging"
            );

          }
        );


        // -------------------------------------------------------------------
        // Keyboard support
        // -------------------------------------------------------------------

        handle.setAttribute(
          "tabindex",
          "0"
        );

        handle.setAttribute(
          "role",
          "slider"
        );

        handle.setAttribute(
          "aria-valuemin",
          "6"
        );

        handle.setAttribute(
          "aria-valuemax",
          "94"
        );

        handle.setAttribute(
          "aria-valuenow",
          "50"
        );


        handle.addEventListener(
          "keydown",
          (event) => {

            let current =
              parseFloat(
                handle.style.left
              ) || 50;


            if (
              event.key ===
              "ArrowLeft"
            ) {

              current -= 3;

            }

            else if (
              event.key ===
              "ArrowRight"
            ) {

              current += 3;

            }

            else if (
              event.key ===
              "Home"
            ) {

              current = 6;

            }

            else if (
              event.key ===
              "End"
            ) {

              current = 94;

            }

            else {

              return;

            }


            event.preventDefault();


            current =
              Math.max(
                6,
                Math.min(
                  94,
                  current
                )
              );


            after.style.clipPath =
              `inset(0 0 0 ${current}%)`;


            handle.style.left =
              `${current}%`;


            handle.setAttribute(
              "aria-valuenow",
              Math.round(
                current
              )
            );

          }
        );

      });

  }

  // (Removed: a leftover duplicate runPreloader(...) invocation used to be
  // here. It passed a callback that runPreloader() never accepted, so the
  // callback silently did nothing — but the extra runPreloader() call still
  // re-ran the counter/preloader tweens a second time, corrupting the
  // preloader's exit animation and leaving document.body stuck with the
  // "no-scroll" class forever. The single call at the bottom of this file
  // is the only one needed; everything the dead callback did now happens
  // inside startSite() above.)


  // =========================================================================
  // RESIZE
  // =========================================================================

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

            refreshScroll();

          },
          250
        );

    },
    {
      passive: true
    }
  );


  // =========================================================================
  // PAGE VISIBILITY
  // =========================================================================

  document.addEventListener(
    "visibilitychange",
    () => {

      if (reducedMotion) {
        return;
      }


      if (
        document.hidden
      ) {

        gsap.globalTimeline.pause();

      }

      else {

        gsap.globalTimeline.resume();

        refreshScroll();

      }

    }
  );


  // =========================================================================
  // AUTOPLAY VIDEO — respect prefers-reduced-motion, pause off-screen videos
  // =========================================================================

  function initShowcaseVideos() {

    const videos = document.querySelectorAll(".video-showcase");
    if (!videos.length) return;

    videos.forEach((video) => {

      if (reducedMotion) {
        video.removeAttribute("autoplay");
        video.pause();
        return;
      }

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              video.play().catch(() => {});
            } else {
              video.pause();
            }
          });
        },
        { threshold: 0.25 }
      );

      io.observe(video);
    });

  }

  // =========================================================================
  // FOOTER REVEAL — fades/slides the footer heading + link columns in once
  // scrolled into view. Scoped to two specific elements (not the whole
  // footer) so contact info/links are never at risk of staying invisible
  // if this observer somehow doesn't fire; shared here in main.js so every
  // page benefits without editing 26 separate footer copies.
  // =========================================================================

  function initFooterReveal() {

    const footer = document.querySelector("footer.site-footer");
    if (!footer) return;

    if (reducedMotion) {
      footer.classList.add("is-revealed");
      return;
    }

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          footer.classList.add("is-revealed");
          io.disconnect();
        }
      });
    }, { threshold: 0.15 });

    io.observe(footer);
  }

  // =========================================================================
  // START
  // =========================================================================

  initShowcaseVideos();
  initFooterReveal();
  runPreloader();

});