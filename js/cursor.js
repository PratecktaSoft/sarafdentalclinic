/* ==========================================================================
   SARAF DENTAL CARE — PREMIUM INTERACTION ENGINE
   --------------------------------------------------------------------------
   Desktop:
   - Smooth custom cursor
   - Cursor labels
   - Magnetic buttons
   - 3D card tilt
   - Image movement
   - Hover depth
   - Cursor scale transitions

   Mobile:
   - All cursor/magnetic/tilt effects automatically disabled
   - Touch remains clean and responsive

   Accessibility:
   - Respects prefers-reduced-motion
   ========================================================================== */

(() => {

  "use strict";


  /* =========================================================================
     01. DEVICE DETECTION
     ========================================================================= */

  const isTouch =
    window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;

  const reduceMotion =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

  /*
     Do not initialize desktop interaction effects
     on mobile/tablet touch devices.
  */

  if (isTouch || reduceMotion) {
    return;
  }


  /* =========================================================================
     02. GLOBAL STATE
     ========================================================================= */

  const state = {
    mouseX: window.innerWidth / 2,
    mouseY: window.innerHeight / 2,

    cursorX: window.innerWidth / 2,
    cursorY: window.innerHeight / 2,

    active: false
  };


  /* =========================================================================
     03. CUSTOM CURSOR
     ========================================================================= */

  function initCursor() {

    const dot =
      document.getElementById(
        "cursor-dot"
      );

    if (!dot) return;


    const cursorText =
      dot.querySelector(
        ".cursor-text"
      );


    /* -----------------------------------------------------------------------
       Mouse position
       ----------------------------------------------------------------------- */

    window.addEventListener(
      "mousemove",
      (event) => {

        state.mouseX =
          event.clientX;

        state.mouseY =
          event.clientY;

      },
      {
        passive: true
      }
    );


    /* -----------------------------------------------------------------------
       Smooth cursor loop
       ----------------------------------------------------------------------- */

    function renderCursor() {

      /*
         Smooth interpolation.
         Lower = slower / more cinematic.
      */

      state.cursorX +=
        (
          state.mouseX -
          state.cursorX
        ) * 0.16;

      state.cursorY +=
        (
          state.mouseY -
          state.cursorY
        ) * 0.16;


      dot.style.transform =
        `
          translate3d(
            ${state.cursorX}px,
            ${state.cursorY}px,
            0
          )
          translate(-50%, -50%)
        `;


      requestAnimationFrame(
        renderCursor
      );
    }


    renderCursor();


    /* -----------------------------------------------------------------------
       Generic interactive elements
       ----------------------------------------------------------------------- */

    const interactive =
      document.querySelectorAll(
        `
          a,
          button,
          .btn,
          .nav-cta,
          .nav-burger,
          [data-cursor]
        `
      );


    interactive.forEach(
      (element) => {

        element.addEventListener(
          "mouseenter",
          () => {

            state.active = true;

            /* Only elements that explicitly carry a text label (data-cursor)
               get the large opaque circle — it has room for the label and
               is meant to sit over media, not over the element's own text.
               Plain nav links, footer links and buttons get a small
               difference-blended dot instead, so their own label stays
               fully readable underneath the cursor. */
            if (element.dataset.cursor) {

              dot.classList.add(
                "big"
              );

              if (cursorText) {
                cursorText.textContent =
                  element.dataset.cursor;
              }

            } else {

              dot.classList.add(
                "link-hover"
              );
            }
          }
        );


        element.addEventListener(
          "mouseleave",
          () => {

            state.active = false;

            dot.classList.remove(
              "big",
              "link-hover"
            );

            if (cursorText) {
              cursorText.textContent =
                "";
            }
          }
        );
      }
    );


    /* -----------------------------------------------------------------------
       VIEW cursor
       ----------------------------------------------------------------------- */

    document
      .querySelectorAll(
        "[data-cursor-view]"
      )
      .forEach(
        (element) => {

          element.addEventListener(
            "mouseenter",
            () => {

              state.active = true;

              dot.classList.add(
                "big",
                "view-cursor"
              );

              if (cursorText) {

                cursorText.textContent =
                  (
                    element.dataset.cursorView ||
                    "VIEW"
                  ).toUpperCase();
              }
            }
          );


          element.addEventListener(
            "mouseleave",
            () => {

              state.active = false;

              dot.classList.remove(
                "big",
                "view-cursor"
              );

              if (cursorText) {
                cursorText.textContent =
                  "";
              }
            }
          );

        }
      );


    /* -----------------------------------------------------------------------
       DRAG cursor
       ----------------------------------------------------------------------- */

    document
      .querySelectorAll(
        "[data-cursor-drag]"
      )
      .forEach(
        (element) => {

          element.addEventListener(
            "mouseenter",
            () => {

              dot.classList.add(
                "big",
                "drag-cursor"
              );

              if (cursorText) {
                cursorText.textContent =
                  "DRAG";
              }
            }
          );


          element.addEventListener(
            "mouseleave",
            () => {

              dot.classList.remove(
                "big",
                "drag-cursor"
              );

              if (cursorText) {
                cursorText.textContent =
                  "";
              }
            }
          );

        }
      );
  }


  /* =========================================================================
     04. MAGNETIC BUTTONS
     ========================================================================= */

  function initMagnetic() {

    if (!window.gsap) return;

    const elements =
      document.querySelectorAll(
        `
          [data-magnetic],
          .btn,
          .nav-cta
        `
      );


    elements.forEach(
      (element) => {

        /*
           Avoid initializing the same element twice.
        */

        if (
          element.dataset.magneticReady ===
          "true"
        ) {
          return;
        }

        element.dataset.magneticReady =
          "true";


        const strength =
          parseFloat(
            element.dataset.magneticStrength
          ) || 0.25;


        let bounds;


        /* -------------------------------------------------------------------
           Enter
           ------------------------------------------------------------------- */

        element.addEventListener(
          "mouseenter",
          () => {

            bounds =
              element.getBoundingClientRect();

          }
        );


        /* -------------------------------------------------------------------
           Mouse movement
           ------------------------------------------------------------------- */

        element.addEventListener(
          "mousemove",
          (event) => {

            bounds =
              bounds ||
              element.getBoundingClientRect();


            const x =
              event.clientX -
              (
                bounds.left +
                bounds.width / 2
              );


            const y =
              event.clientY -
              (
                bounds.top +
                bounds.height / 2
              );


            window.gsap.to(
              element,
              {
                x:
                  x * strength,

                y:
                  y * strength,

                duration:
                  0.45,

                ease:
                  "power3.out",

                overwrite:
                  true
              }
            );

          }
        );


        /* -------------------------------------------------------------------
           Exit
           ------------------------------------------------------------------- */

        element.addEventListener(
          "mouseleave",
          () => {

            window.gsap.to(
              element,
              {
                x: 0,
                y: 0,

                duration:
                  0.75,

                ease:
                  "elastic.out(1, 0.4)",

                overwrite:
                  true
              }
            );

            bounds =
              null;
          }
        );

      }
    );
  }


  /* =========================================================================
     05. PREMIUM 3D TILT
     ========================================================================= */

  function initTilt() {

    if (!window.gsap) return;


    document
      .querySelectorAll(
        "[data-tilt]"
      )
      .forEach(
        (element) => {

          if (
            element.dataset.tiltReady ===
            "true"
          ) {
            return;
          }

          element.dataset.tiltReady =
            "true";


          const max =
            parseFloat(
              element.dataset.tiltMax
            ) || 5;


          const scale =
            parseFloat(
              element.dataset.tiltScale
            ) || 1.015;


          const inner =
            element.querySelector(
              "[data-tilt-inner]"
            );


          /* -----------------------------------------------------------------
             Perspective
             ----------------------------------------------------------------- */

          element.style.transformStyle =
            "preserve-3d";


          /* -----------------------------------------------------------------
             Mouse move
             ----------------------------------------------------------------- */

          element.addEventListener(
            "mousemove",
            (event) => {

              const rect =
                element.getBoundingClientRect();


              const px =
                (
                  event.clientX -
                  rect.left
                ) /
                rect.width -
                0.5;


              const py =
                (
                  event.clientY -
                  rect.top
                ) /
                rect.height -
                0.5;


              const rotateX =
                -py * max;


              const rotateY =
                px * max;


              window.gsap.to(
                element,
                {
                  rotationX:
                    rotateX,

                  rotationY:
                    rotateY,

                  scale:
                    scale,

                  transformPerspective:
                    1000,

                  transformOrigin:
                    "center center",

                  duration:
                    0.5,

                  ease:
                    "power3.out",

                  overwrite:
                    true
                }
              );


              /* -------------------------------------------------------------
                 Optional inner image depth
                 ------------------------------------------------------------- */

              if (inner) {

                window.gsap.to(
                  inner,
                  {
                    x:
                      px * 12,

                    y:
                      py * 12,

                    scale:
                      1.04,

                    duration:
                      0.7,

                    ease:
                      "power3.out",

                    overwrite:
                      true
                  }
                );

              }

            }
          );


          /* -----------------------------------------------------------------
             Reset
             ----------------------------------------------------------------- */

          element.addEventListener(
            "mouseleave",
            () => {

              window.gsap.to(
                element,
                {
                  rotationX: 0,
                  rotationY: 0,

                  x: 0,
                  y: 0,

                  scale: 1,

                  duration:
                    0.8,

                  ease:
                    "power3.out",

                  overwrite:
                    true
                }
              );


              if (inner) {

                window.gsap.to(
                  inner,
                  {
                    x: 0,
                    y: 0,
                    scale: 1,

                    duration:
                      0.9,

                    ease:
                      "power3.out",

                    overwrite:
                      true
                  }
                );

              }

            }
          );

        }
      );
  }


  /* =========================================================================
     06. IMAGE HOVER DEPTH
     ========================================================================= */

  function initImageDepth() {

    if (!window.gsap) return;


    document
      .querySelectorAll(
        "[data-image-depth]"
      )
      .forEach(
        (container) => {

          if (
            container.dataset.depthReady ===
            "true"
          ) {
            return;
          }

          container.dataset.depthReady =
            "true";


          const image =
            container.querySelector(
              "img"
            );


          if (!image) return;


          container.addEventListener(
            "mouseenter",
            () => {

              window.gsap.to(
                image,
                {
                  scale:
                    1.08,

                  duration:
                    1.2,

                  ease:
                    "power3.out",

                  overwrite:
                    true
                }
              );

            }
          );


          container.addEventListener(
            "mouseleave",
            () => {

              window.gsap.to(
                image,
                {
                  scale:
                    1.02,

                  duration:
                    1.2,

                  ease:
                    "power3.out",

                  overwrite:
                    true
                }
              );

            }
          );


          container.addEventListener(
            "mousemove",
            (event) => {

              const rect =
                container.getBoundingClientRect();


              const px =
                (
                  event.clientX -
                  rect.left
                ) /
                rect.width -
                0.5;


              const py =
                (
                  event.clientY -
                  rect.top
                ) /
                rect.height -
                0.5;


              window.gsap.to(
                image,
                {
                  x:
                    px * 10,

                  y:
                    py * 10,

                  duration:
                    0.7,

                  ease:
                    "power3.out",

                  overwrite:
                    true
                }
              );

            }
          );

        }
      );
  }


  /* =========================================================================
     07. MAGNETIC IMAGE / CHARACTER
     ========================================================================= */

  function initFloatingObjects() {

    if (!window.gsap) return;


    document
      .querySelectorAll(
        "[data-follow-mouse]"
      )
      .forEach(
        (element) => {

          const strength =
            parseFloat(
              element.dataset.followMouse
            ) || 15;


          const xTo =
            window.gsap.quickTo(
              element,
              "x",
              {
                duration:
                  0.8,

                ease:
                  "power3.out"
              }
            );


          const yTo =
            window.gsap.quickTo(
              element,
              "y",
              {
                duration:
                  0.8,

                ease:
                  "power3.out"
              }
            );


          window.addEventListener(
            "mousemove",
            (event) => {

              const x =
                (
                  event.clientX /
                  window.innerWidth -
                  0.5
                ) *
                strength;


              const y =
                (
                  event.clientY /
                  window.innerHeight -
                  0.5
                ) *
                strength;


              xTo(x);
              yTo(y);

            },
            {
              passive: true
            }
          );

        }
      );
  }


  /* =========================================================================
     08. CURSOR HIDE WHEN LEAVING WINDOW
     ========================================================================= */

  function initCursorVisibility() {

    const dot =
      document.getElementById(
        "cursor-dot"
      );

    if (!dot) return;


    document.addEventListener(
      "mouseleave",
      () => {

        dot.classList.add(
          "cursor-hidden"
        );

      }
    );


    document.addEventListener(
      "mouseenter",
      () => {

        dot.classList.remove(
          "cursor-hidden"
        );

      }
    );

  }


  /* =========================================================================
     09. INITIALIZE
     ========================================================================= */

  function initInteractions() {

    initCursor();

    initCursorVisibility();

    initMagnetic();

    initTilt();

    initImageDepth();

    initFloatingObjects();

  }


  /* =========================================================================
     10. DOM READY
     ========================================================================= */

  if (
    document.readyState ===
    "loading"
  ) {

    document.addEventListener(
      "DOMContentLoaded",
      initInteractions,
      {
        once: true
      }
    );

  } else {

    initInteractions();

  }


  /* =========================================================================
     11. PUBLIC API
     ========================================================================= */

  window.SarafInteractions = {
    init:
      initInteractions,

    cursor:
      initCursor,

    magnetic:
      initMagnetic,

    tilt:
      initTilt,

    imageDepth:
      initImageDepth
  };

})();