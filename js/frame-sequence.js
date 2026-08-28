/* ========================================================================
   SARAF DENTAL CARE — TRUE FRAMER-STYLE 50 FRAME SCROLL
   The scene remains pinned for the ENTIRE sequence. Frame 50 is reached
   before the following section becomes visible. Native touch scrolling is
   never cancelled or hijacked.
   ======================================================================== */
(() => {
  "use strict";
  if (window.__SARAF_50_FRAMER_FINAL__) return;
  window.__SARAF_50_FRAMER_FINAL__ = true;

  const root = document.querySelector("[data-frame-sequence]");
  if (!root) return;

  const sticky = root.querySelector(".frame-sequence-sticky");
  const media = root.querySelector(".frame-sequence-media");
  const a = root.querySelector("[data-frame-image-a]");
  const b = root.querySelector("[data-frame-image-b]");
  const current = root.querySelector("[data-frame-current]");
  const progress = root.querySelector("[data-frame-progress]");
  const dot = root.querySelector("[data-frame-progress-dot]");
  const kicker = root.querySelector("[data-frame-kicker]");
  const title = root.querySelector("[data-frame-title]");
  const desc = root.querySelector("[data-frame-desc]");

  const TOTAL = 50;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const frames = new Array(TOTAL);
  const ready = new Array(TOTAL).fill(false);

  let target = 0;
  let smooth = 0;
  let shown = 0;
  let active = a;
  let raf = 0;
  let lastScroll = window.scrollY;
  let lastTime = performance.now();
  let velocity = 0;
  let sequenceTop = 0;
  let scrollDistance = 1;

  const phaseData = [
    [0.00, "01 / Precision", "Precision that <em>moves</em> with you.", "Every detail matters. Follow the complete 50-frame sequence before moving to the next story."],
    [0.25, "02 / Movement", "Designed to <em>move.</em>", "The implant evolves frame by frame while the scene stays anchored to your scroll."],
    [0.50, "03 / Technology", "Digital precision. <em>Human judgement.</em>", "A cinematic look at planning, detail and modern implantology."],
    [0.75, "04 / Transformation", "From detail to <em>confidence.</em>", "The final frames complete the transformation before the next section begins."],
    [0.92, "05 / Saraf Dental Care", "Built around <em>your smile.</em>", "50 frames. One continuous clinical story."]
  ];

  function path(i) {
    return `assets/images/ezgif-frame-${String(i + 1).padStart(3, "0")}.png`;
  }

  function makeFrame(i) {
    if (frames[i]) return frames[i];
    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    img.src = path(i);
    img.onload = () => { ready[i] = true; };
    frames[i] = img;
    return img;
  }

  function preload() {
    for (let i = 0; i < TOTAL; i++) {
      const img = makeFrame(i);
      try { img.fetchPriority = i < 10 ? "high" : "auto"; } catch (_) {}
    }
  }

  function measure() {
    const rect = root.getBoundingClientRect();
    sequenceTop = window.scrollY + rect.top;
    scrollDistance = Math.max(1, root.offsetHeight - window.innerHeight);
  }

  function readProgress() {
    const p = (window.scrollY - sequenceTop) / scrollDistance;
    return Math.max(0, Math.min(1, p));
  }

  function swapFrame(index) {
    index = Math.max(0, Math.min(TOTAL - 1, index));
    if (index === shown) return;

    const img = makeFrame(index);
    if (!img) return;

    const apply = () => {
      if (index !== Math.round(smooth * (TOTAL - 1))) return;
      const src = img.currentSrc || img.src;
      if (!src) return;

      const next = active === a ? b : a;
      next.src = src;
      next.style.opacity = "1";
      active.style.opacity = "0";
      active = next;
      shown = index;
    };

    if (img.complete && img.naturalWidth > 0) apply();
    else img.addEventListener("load", apply, { once: true });
  }

  function phase(p) {
    let item = phaseData[0];
    for (const candidate of phaseData) if (p >= candidate[0]) item = candidate;
    return item;
  }

  function updateCopy(p) {
    const item = phase(p);
    if (kicker && kicker.textContent !== item[1]) kicker.textContent = item[1];
    if (title && title.innerHTML !== item[2]) title.innerHTML = item[2];
    if (desc && desc.textContent !== item[3]) desc.textContent = item[3];

    const idx = phaseData.indexOf(item);
    const next = phaseData[idx + 1];
    const local = next ? Math.max(0, Math.min(1, (p - item[0]) / (next[0] - item[0]))) : Math.max(0, Math.min(1, (p - item[0]) / .08));
    const edge = Math.sin(local * Math.PI);

    const copy = root.querySelector("[data-frame-copy]");
    if (copy) {
      copy.style.opacity = String(.82 + edge * .18);
      copy.style.transform = reduce ? "translate3d(0,0,0)" : `translate3d(0,${(1-edge)*10}px,0)`;
    }
  }

  function effects(p) {
    root.style.setProperty("--fs-p", p.toFixed(5));
    root.style.setProperty("--fs-camera", Math.sin(p * Math.PI).toFixed(5));

    const mobile = window.matchMedia("(max-width:900px)").matches;
    const speed = Math.min(1, Math.abs(velocity) * 0.018);

    if (!reduce && media) {
      const x = Math.sin(p * Math.PI * 2) * (mobile ? 2.5 : 5);
      const y = Math.cos(p * Math.PI * 2) * (mobile ? 2 : 4);
      media.style.transform = `translate3d(${x}px,${y}px,0)`;
    }

    const blur = reduce ? 0 : Math.min(mobile ? 0.7 : 1.1, speed);
    a.style.filter = `blur(${blur}px)`;
    b.style.filter = `blur(${blur}px)`;
    updateCopy(p);
  }

  function render(now) {
    raf = 0;
    const dt = Math.min(50, Math.max(8, now - lastTime));
    lastTime = now;

    const ease = reduce ? 1 : 1 - Math.pow(0.0005, dt / 16.67);
    smooth += (target - smooth) * ease;
    if (Math.abs(target - smooth) < 0.00008) smooth = target;

    const frame = Math.round(smooth * (TOTAL - 1));
    swapFrame(frame);

    if (current) current.textContent = String(frame + 1).padStart(2, "0");
    if (progress) progress.style.transform = `scaleX(${smooth})`;
    if (dot) dot.style.left = `${smooth * 100}%`;
    effects(smooth);

    if (Math.abs(target - smooth) > 0.00008 || performance.now() - lastTime < 32) {
      raf = requestAnimationFrame(render);
    }
  }

  function request() {
    target = readProgress();
    if (!raf) raf = requestAnimationFrame(render);
  }

  function onScroll() {
    const now = performance.now();
    const y = window.scrollY;
    const dt = Math.max(8, now - lastTime);
    velocity = (y - lastScroll) / dt;
    lastScroll = y;
    target = readProgress();
    if (!raf) raf = requestAnimationFrame(render);
  }

  function onResize() {
    measure();
    request();
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("load", onResize, { once: true });

  if ("ResizeObserver" in window) {
    const ro = new ResizeObserver(() => { measure(); request(); });
    ro.observe(root);
    if (sticky) ro.observe(sticky);
  }

  preload();
  measure();
  target = readProgress();
  smooth = target;
  const initial = Math.round(target * (TOTAL - 1));
  shown = -1;
  swapFrame(initial);
  request();
})();
