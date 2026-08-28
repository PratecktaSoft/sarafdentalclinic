// ==========================================================================
// SARAF DENTAL CARE — PREMIUM CINEMATIC PAGE TRANSITION
// ==========================================================================
//
// Page-to-page transition system
//
// Features
// --------------------------------------------------------------------------
// • Cinematic curtain reveal on page load
// • Bottom-to-top curtain on navigation
// • Two-layer transition depth
// • Optional logo / wordmark animation
// • Smooth page exit
// • Prevents duplicate clicks
// • Ignores external links
// • Ignores anchors
// • Ignores downloads
// • Ignores mailto / tel
// • Ignores target="_blank"
// • Mobile safe
// • Reduced-motion support
// ==========================================================================


function initPageTransition(gsap) {

  "use strict";


  // ==========================================================================
  // SAFETY
  // ==========================================================================

  if (
    typeof gsap ===
    "undefined"
  ) {

    console.warn(
      "Saraf Page Transition: GSAP not loaded."
    );

    return;
  }


  // ==========================================================================
  // ELEMENTS
  // ==========================================================================

  const overlay =
    document.getElementById(
      "page-transition"
    );


  if (!overlay) {
    return;
  }


  const layer =
    overlay.querySelector(
      ".pt-layer"
    );


  const layer2 =
    overlay.querySelector(
      ".pt-layer-2"
    );


  const logo =
    overlay.querySelector(
      ".pt-logo"
    );


  const label =
    overlay.querySelector(
      ".pt-label"
    );


  const progress =
    overlay.querySelector(
      ".pt-progress"
    );


  const reduced =
    window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;


  let navigating =
    false;


  // ==========================================================================
  // INITIAL STATE
  // ==========================================================================

  overlay.classList.remove(
    "active"
  );


  overlay.style.pointerEvents =
    "none";


  if (reduced) {

    gsap.set(
      overlay,
      {
        autoAlpha:
          0,

        scaleY:
          1
      }
    );

    return;

  }


  /*
     The page starts underneath the transition
     and the curtain retracts upward.
  */

  gsap.set(
    overlay,
    {
      autoAlpha:
        1,

      scaleY:
        1,

      transformOrigin:
        "top center",

      pointerEvents:
        "none"
    }
  );


  if (layer) {

    gsap.set(
      layer,
      {
        scaleY:
          1,

        transformOrigin:
          "top center"
      }
    );

  }


  if (layer2) {

    gsap.set(
      layer2,
      {
        scaleY:
          1,

        transformOrigin:
          "top center"
      }
    );

  }


  if (logo) {

    gsap.set(
      logo,
      {
        opacity:
          1,

        y:
          0,

        scale:
          1
      }
    );

  }


  if (label) {

    gsap.set(
      label,
      {
        opacity:
          1,

        y:
          0
      }
    );

  }


  if (progress) {

    gsap.set(
      progress,
      {
        scaleX:
          1,

        transformOrigin:
          "right center"
      }
    );

  }


  // ==========================================================================
  // PAGE LOAD REVEAL
  // ==========================================================================

  function revealPage() {

    const timeline =
      gsap.timeline({
        defaults: {
          ease:
            "power4.inOut"
        }
      });


    /*
       Logo disappears slightly before
       the curtain starts moving.
    */

    if (logo) {

      timeline.to(
        logo,
        {
          opacity:
            0,

          y:
            -18,

          duration:
            0.35,

          ease:
            "power3.in"
        }
      );

    }


    if (label) {

      timeline.to(
        label,
        {
          opacity:
            0,

          y:
            -10,

          duration:
            0.3,

          ease:
            "power3.in"
        },
        "<"
      );

    }


    /*
       Second layer retracts first.
    */

    if (layer2) {

      timeline.to(
        layer2,
        {
          scaleY:
            0,

          duration:
            0.55,

          ease:
            "power4.inOut"
        },
        "-=0.08"
      );

    }


    /*
       Main layer retracts.
    */

    if (layer) {

      timeline.to(
        layer,
        {
          scaleY:
            0,

          duration:
            0.75,

          ease:
            "power4.inOut"
        },
        "-=0.35"
      );

    }


    /*
       Final overlay disappears.
    */

    timeline.to(
      overlay,
      {
        autoAlpha:
          0,

        duration:
          0.15,

        onComplete:
          () => {

            overlay.style.pointerEvents =
              "none";

          }

      },
      "-=0.1"
    );

  }


  /*
     Give the browser a moment to paint the page
     before beginning the reveal.
  */

  requestAnimationFrame(
    () => {

      setTimeout(
        revealPage,
        120
      );

    }
  );


  // ==========================================================================
  // BUILD DESTINATION URL
  // ==========================================================================

  function getNavigationURL(
    link
  ) {

    const href =
      link.getAttribute(
        "href"
      );


    if (!href) {
      return null;
    }


    const trimmed =
      href.trim();


    if (!trimmed) {
      return null;
    }


    // ------------------------------------------------------------------------
    // Ignore special URLs
    // ------------------------------------------------------------------------

    if (
      trimmed.startsWith(
        "#"
      ) ||

      trimmed.startsWith(
        "mailto:"
      ) ||

      trimmed.startsWith(
        "tel:"
      ) ||

      trimmed.startsWith(
        "javascript:"
      ) ||

      trimmed.startsWith(
        "data:"
      )
    ) {

      return null;

    }


    // ------------------------------------------------------------------------
    // Ignore downloads
    // ------------------------------------------------------------------------

    if (
      link.hasAttribute(
        "download"
      )
    ) {

      return null;

    }


    // ------------------------------------------------------------------------
    // Ignore new tabs/windows
    // ------------------------------------------------------------------------

    const target =
      link.getAttribute(
        "target"
      );


    if (
      target &&
      target !==
        "_self"
    ) {

      return null;

    }


    /*
       Convert relative URL to an absolute URL.
    */

    let destination;


    try {

      destination =
        new URL(
          trimmed,
          window.location.href
        );

    }

    catch (
      error
    ) {

      return null;

    }


    // ------------------------------------------------------------------------
    // Ignore external websites
    // ------------------------------------------------------------------------

    if (
      destination.origin !==
      window.location.origin
    ) {

      return null;

    }


    return destination;

  }


  // ==========================================================================
  // SAME-PAGE CHECK
  // ==========================================================================

  function isSamePage(
    destination
  ) {

    if (!destination) {
      return true;
    }


    return (
      destination.pathname ===
        window.location.pathname &&

      destination.search ===
        window.location.search
    );

  }


  // ==========================================================================
  // UPDATE TRANSITION LABEL
  // ==========================================================================

  function setTransitionText(
    destination
  ) {

    if (!label) {
      return;
    }


    const path =
      destination.pathname
        .split("/")
        .filter(Boolean)
        .pop();


    let text =
      "SARAF DENTAL CARE";


    if (!path) {

      text =
        "HOME";

    }

    else if (
      path
        .toLowerCase()
        .includes(
          "about"
        )
    ) {

      text =
        "ABOUT";

    }

    else if (
      path
        .toLowerCase()
        .includes(
          "service"
        )
    ) {

      text =
        "SERVICES";

    }

    else if (
      path
        .toLowerCase()
        .includes(
          "contact"
        )
    ) {

      text =
        "CONTACT";

    }


    label.textContent =
      text;

  }


  // ==========================================================================
  // RESET TRANSITION
  // ==========================================================================

  function resetTransition() {

    gsap.killTweensOf(
      [
        overlay,
        layer,
        layer2,
        logo,
        label,
        progress
      ]
    );


    gsap.set(
      overlay,
      {
        autoAlpha:
          1,

        scaleY:
          1,

        transformOrigin:
          "bottom center",

        pointerEvents:
          "auto"
      }
    );


    if (layer) {

      gsap.set(
        layer,
        {
          scaleY:
            1,

          transformOrigin:
            "bottom center"
        }
      );

    }


    if (layer2) {

      gsap.set(
        layer2,
        {
          scaleY:
            1,

          transformOrigin:
            "bottom center"
        }
      );

    }


    if (logo) {

      gsap.set(
        logo,
        {
          opacity:
            0,

          y:
            30,

          scale:
            0.96
        }
      );

    }


    if (label) {

      gsap.set(
        label,
        {
          opacity:
            0,

          y:
            18
        }
      );

    }


    if (progress) {

      gsap.set(
        progress,
        {
          scaleX:
            0,

          transformOrigin:
            "left center"
        }
      );

    }

  }


  // ==========================================================================
  // PLAY EXIT TRANSITION
  // ==========================================================================

  function playExit(
    destination
  ) {

    if (navigating) {
      return;
    }


    navigating =
      true;


    setTransitionText(
      destination
    );


    resetTransition();


    overlay.classList.add(
      "active"
    );


    /*
       Disable all links during the transition.
    */

    overlay.style.pointerEvents =
      "auto";


    const timeline =
      gsap.timeline();


    // ------------------------------------------------------------------------
    // Logo entrance
    // ------------------------------------------------------------------------

    if (logo) {

      timeline.to(
        logo,
        {
          opacity:
            1,

          y:
            0,

          scale:
            1,

          duration:
            0.65,

          ease:
            "power4.out"
        }
      );

    }


    // ------------------------------------------------------------------------
    // Label
    // ------------------------------------------------------------------------

    if (label) {

      timeline.to(
        label,
        {
          opacity:
            1,

          y:
            0,

          duration:
            0.45,

          ease:
            "power3.out"
        },
        "-=0.4"
      );

    }


    // ------------------------------------------------------------------------
    // Progress line
    // ------------------------------------------------------------------------

    if (progress) {

      timeline.to(
        progress,
        {
          scaleX:
            1,

          duration:
            0.85,

          ease:
            "power3.inOut"
        },
        "-=0.35"
      );

    }


    // ------------------------------------------------------------------------
    // Secondary layer
    // ------------------------------------------------------------------------

    if (layer2) {

      timeline.to(
        layer2,
        {
          scaleY:
            1,

          duration:
            0.65,

          ease:
            "power4.inOut"
        },
        "-=0.65"
      );

    }


    // ------------------------------------------------------------------------
    // Main curtain
    // ------------------------------------------------------------------------

    if (layer) {

      timeline.to(
        layer,
        {
          scaleY:
            1,

          duration:
            0.85,

          ease:
            "power4.inOut"
        },
        "-=0.5"
      );

    }


    // ------------------------------------------------------------------------
    // Navigate
    // ------------------------------------------------------------------------

    timeline.call(
      () => {

        window.location.href =
          destination.href;

      }
    );

  }


  // ==========================================================================
  // LINK INTERCEPTION
  // ==========================================================================

  document
    .querySelectorAll(
      "a[href]"
    )
    .forEach(
      (link) => {

        /*
           Don't process the same link twice.
        */

        if (
          link.dataset.transitionReady ===
          "true"
        ) {

          return;

        }


        link.dataset.transitionReady =
          "true";


        link.addEventListener(
          "click",
          (event) => {

            /*
               Modifier-click should keep normal
               browser behavior.

               Ctrl + click
               Cmd + click
               Shift + click
               Middle mouse button
            */

            if (
              event.ctrlKey ||
              event.metaKey ||
              event.shiftKey ||
              event.altKey ||
              event.button !== 0
            ) {

              return;

            }


            const destination =
              getNavigationURL(
                link
              );


            if (!destination) {
              return;
            }


            if (
              isSamePage(
                destination
              )
            ) {

              /*
                 If it's only a hash change,
                 allow normal browser behavior.
              */

              return;

            }


            event.preventDefault();

            event.stopPropagation();


            playExit(
              destination
            );

          }
        );

      }
    );


  // ==========================================================================
  // BROWSER BACK / FORWARD
  // ==========================================================================

  window.addEventListener(
    "pageshow",
    () => {

      /*
         Reset state when returning from
         browser cache / back-forward cache.
      */

      navigating =
        false;

      overlay.classList.remove(
        "active"
      );

    }
  );


  // ==========================================================================
  // PUBLIC API
  // ==========================================================================

  window.SarafPageTransition = {

    enter:
      revealPage,

    exit:
      playExit,

    reset:
      resetTransition

  };

}