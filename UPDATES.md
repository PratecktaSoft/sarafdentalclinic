# Saraf Dental Care — 50-Frame Cinematic Scroll Update

Added the supplied 50-frame Framer/EZGIF sequence to the homepage as a scroll-linked cinematic scene.

## New assets
- `assets/frames/ezgif-frame-001.jpg` … `ezgif-frame-050.jpg`

## New motion layer
- `css/frame-sequence.css`
- `js/frame-sequence.js`

## Behavior
- 50 frames map continuously to the user's native vertical scroll.
- Works on desktop, tablet and mobile.
- Mobile keeps native touch scrolling; the sequence follows the finger naturally rather than hijacking scrolling.
- Frames are progressively preloaded for smooth fast scrolling.
- Canvas rendering is DPR-aware and capped at 2x for performance.
- Scroll progress and current frame indicators update live.
- The sequence uses subtle inertia, scale/depth and focus changes for a premium cinematic feel.
- `prefers-reduced-motion` falls back to a static, accessible presentation.

The original site animations, GSAP/ScrollTrigger effects, navigation, responsive styles and all existing pages/assets remain included.


## Framer 50-frame assets
The 50 supplied Framer frames are also copied into `assets/images/` and the scroll engine reads from that folder. `assets/frames/` is retained for backward compatibility.
