#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Builds the full Saraf Dental Care site: shared shell (preloader, cursor,
transition overlay, nav, footer) + unique content per page.
"""
import os

ROOT = os.path.dirname(os.path.abspath(__file__))

FONTS = '<link rel="preconnect" href="https://fonts.googleapis.com">\n<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&display=swap" rel="stylesheet">'
CSS = '\n'.join([
    '<link rel="stylesheet" href="css/global.css">',
    '<link rel="stylesheet" href="css/animations.css">',
    '<link rel="stylesheet" href="css/responsive.css">',
    '<link rel="stylesheet" href="css/viral-responsive.css">',
    '<link rel="stylesheet" href="css/award-motion.css">',
    '<link rel="stylesheet" href="css/frame-sequence.css">',
])
GSAP = '\n'.join([
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>',
    '<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>',
])

# Pages that have been hand-upgraded into fully bespoke, per-page cinematic
# designs (own CSS + own inline motion script) and must never be regenerated
# by this templating script — doing so would destroy that custom work.
HAND_CRAFTED_PAGES = {
    "doctor-profile.html", "digital-dentistry.html",
    "about.html", "aesthetic-dentistry.html", "appointment.html",
    "clinic.html", "contact.html", "case-studies.html",
}
SCRIPTS = '\n'.join([
    '<script src="js/cursor.js"></script>',
    '<script src="js/navigation.js"></script>',
    '<script src="js/page-transition.js"></script>',
    '<script src="js/animations.js"></script>',
    '<script src="js/main.js"></script>',
    '<script src="js/viral-motion.js"></script>',
    '<script src="js/award-motion.js"></script>',
    '<script src="js/frame-sequence.js"></script>',
])

NAV_ITEMS = [
    ("about.html", "About"),
    ("services.html", "Services"),
    ("technology.html", "Technology"),
    ("doctors.html", "Doctors"),
    ("clinic.html", "Clinic"),
    ("case-studies.html", "Cases"),
    ("blog.html", "Blog"),
    ("contact.html", "Contact"),
]

def nav_html(active):
    links = []
    for href, label in NAV_ITEMS:
        cls = " active" if href == active else ""
        links.append(f'<a href="{href}" class="{cls.strip()}">{label}</a>')
    center = "\n    ".join(links)
    return f'''<header class="site-nav">
  <a href="index.html" class="brand" style="flex-direction:row; align-items:center; gap:9px;">{tooth_icon(17)}<span style="display:flex; flex-direction:column;">SARAF<span>DENTAL CARE &middot; AKOLA</span></span></a>
  <nav class="nav-center">
    {center}
  </nav>
  <a href="appointment.html" class="nav-cta">Book Appointment</a>
  <button class="nav-burger" aria-label="Open menu"><span></span><span></span><span></span></button>
</header>

<div id="mobile-menu">
  <nav class="mm-links">
    <a href="index.html"><span>Home</span></a>
    <a href="about.html"><span>About</span></a>
    <a href="services.html"><span>Services</span></a>
    <a href="technology.html"><span>Technology</span></a>
    <a href="doctors.html"><span>Doctors</span></a>
    <a href="clinic.html"><span>Clinic</span></a>
    <a href="case-studies.html"><span>Cases</span></a>
    <a href="gallery.html"><span>Gallery</span></a>
    <a href="blog.html"><span>Blog</span></a>
    <a href="contact.html"><span>Contact</span></a>
  </nav>
  <div class="mm-meta">
    <span>Nishant Tower, M.G. Road, Akola 444001</span>
    <span>+91 98230 00000</span>
    <span>care@sarafdentalcare.in</span>
  </div>
</div>'''

FOOTER = '''<footer class="site-footer">
  <div class="wrap">
    <div class="foot-huge">LET&rsquo;S TALK<br>ABOUT YOUR SMILE.</div>
    <div style="display:flex; gap:20px; flex-wrap:wrap; margin-bottom:80px;">
      <a href="appointment.html" class="btn btn-light">Book a Consultation <span class="arrow">&rarr;</span></a>
      <a href="contact.html" class="btn btn-ghost" style="border:1px solid var(--line-dark);">Contact Clinic</a>
    </div>
    <div class="foot-top">
      <div>
        <h4>Saraf Dental Care</h4>
        <p style="max-width:280px; color:rgba(255,255,255,0.6); font-size:13.5px; line-height:1.7;">A private implantology and aesthetic dentistry practice in Akola, Maharashtra.</p>
      </div>
      <div>
        <h4>Explore</h4>
        <div class="foot-links">
          <a href="about.html">About</a>
          <a href="services.html">Services</a>
          <a href="doctors.html">Doctors</a>
          <a href="technology.html">Technology</a>
          <a href="clinic.html">Clinic</a>
          <a href="gallery.html">Gallery</a>
        </div>
      </div>
      <div>
        <h4>Care</h4>
        <div class="foot-links">
          <a href="case-studies.html">Case Studies</a>
          <a href="patient-journey.html">Patient Journey</a>
          <a href="reviews.html">Reviews</a>
          <a href="faq.html">FAQ</a>
          <a href="blog.html">Journal</a>
          <a href="emergency.html">Emergency</a>
        </div>
      </div>
      <div>
        <h4>Contact</h4>
        <div class="foot-links">
          <a href="mailto:care@sarafdentalcare.in">care@sarafdentalcare.in</a>
          <a href="tel:+919823000000">+91 98230 00000</a>
          <a href="location.html">Nishant Tower, M.G. Road, Akola</a>
          <a href="#">Instagram</a>
          <a href="#">LinkedIn</a>
        </div>
      </div>
    </div>
    <div class="foot-bottom">
      <span>&copy; 2026 Saraf Dental Care</span>
      <span style="display:flex; gap:24px;"><a href="imprint.html">Business Info</a><a href="privacy.html">Privacy Policy</a></span>
      <span>Unofficial concept design &middot; Verify contact details &amp; hours with the clinic directly</span>
    </div>
  </div>
</footer>'''

# ---------------------------------------------------------------------------
# TOOTH LINE-ART MOTIF — one restrained mark, reused as nav icon, preloader
# icon, favicon and an oversized low-opacity hero watermark.
# ---------------------------------------------------------------------------
TOOTH_PATH = "M50 6C32 6 18 20 18 39c0 14 5 24 10 33 4 7 6 16 8 28 1 6 6 8 8 2 2-9 4-18 6-21 2-3 6-3 8 0 2 3 4 12 6 21 2 6 7 4 8-2 2-12 4-21 8-28 5-9 10-19 10-33C82 20 68 6 50 6Z"

def tooth_icon(size=22, cls=""):
    return f'<svg class="tooth-mark {cls}" width="{size}" height="{size*1.1:.0f}" viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg"><path d="{TOOTH_PATH}"/></svg>'

def tooth_watermark():
    return f'<svg class="tooth-watermark" viewBox="0 0 100 110" xmlns="http://www.w3.org/2000/svg"><path d="{TOOTH_PATH}"/></svg>'

FAVICON_SVG = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 110"><path d="{TOOTH_PATH}" fill="%230A0A09"/></svg>'
FAVICON_LINK = f'<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,{FAVICON_SVG}">'

PRELOADER = f'''<div id="preloader">
  {tooth_icon(26)}
  <div class="pre-mark">SARAF DENTAL CARE</div>
  <div class="pre-sub">AKOLA &middot; MAHARASHTRA</div>
  <div class="pre-bar"><div class="pre-bar-fill" id="pre-bar-fill"></div></div>
  <div class="pre-count" id="pre-count">0%</div>
</div>'''

TRANSITION = '<div id="page-transition"><span class="pt-label">SARAF</span></div>'
CURSOR = '<div id="cursor-dot"><span class="cursor-text"></span></div>'
GRAIN = '<div id="grain"></div>'

def shell(page_id, title, description, body, extra_head=""):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>{title}</title>
<meta name="description" content="{description}">
<link rel="canonical" href="https://www.sarafdentalcare.in/{page_id}">
<meta property="og:title" content="{title}">
<meta property="og:description" content="{description}">
<meta property="og:type" content="website">
<meta property="og:locale" content="en_IN">
{FAVICON_LINK}
{FONTS}
{CSS}
{extra_head}
</head>
<body>
{PRELOADER}
{TRANSITION}
{CURSOR}
{GRAIN}
{nav_html(page_id)}

{body}

{FOOTER}

{GSAP}
{SCRIPTS}
</body>
</html>
'''

def write(page_id, title, description, body, extra_head=""):
    if page_id in HAND_CRAFTED_PAGES:
        print("skipped (hand-crafted, protected):", page_id)
        return
    html = shell(page_id, title, description, body, extra_head)
    with open(os.path.join(ROOT, page_id), "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", page_id, len(html))

# ---------------------------------------------------------------------------
# shared small components
# ---------------------------------------------------------------------------

def page_hero(eyebrow, heading_lines, sub, theme="light", tall="min-height:78vh;", watermark=True, metrics=None):
    lines = "\n      ".join(f'<span class="split-line"><span data-hero-line style="display:block;">{l}</span></span>' for l in heading_lines)
    bg = "bg-black" if theme == "dark" else "bg-off"
    wm = tooth_watermark() if watermark else ""
    metrics_html = ""
    if metrics:
        cells = "\n      ".join(f'''<div data-hero-fade>
        <div class="mono" style="font-size:1.6rem; font-weight:600;"><span data-count-to="{val}">0</span>{suffix}</div>
        <div class="mono" style="font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:{'var(--grey)' if theme=='dark' else 'var(--grey-dark)'}; margin-top:4px;">{label}</div>
      </div>''' for val, suffix, label in metrics)
        metrics_html = f'''<div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:24px; margin-top:70px;">
      {cells}
    </div>'''
    return f'''<section data-hero data-nav-theme="{theme}" class="{bg}" style="{tall} display:flex; flex-direction:column; justify-content:center; padding:150px 6vw 70px; position:relative; overflow:hidden;">
  {wm}
  <div class="wrap" style="padding:0;">
    <span class="label{' on-dark' if theme=='dark' else ''}" data-hero-fade>{eyebrow}</span>
    <h1 style="font-size:clamp(2.4rem,7vw,5.8rem); margin-top:24px; font-weight:200; line-height:1.02;">
      {lines}
    </h1>
    <p data-hero-fade style="max-width:520px; margin-top:28px; font-size:15px; line-height:1.8; color:{'var(--grey)' if theme=='dark' else 'var(--grey-dark)'};">{sub}</p>
    {metrics_html}
  </div>
</section>'''

def tagline_band(words, theme="dark"):
    """Oversized auto-scrolling text band — the big United Carriers-style
    marquee headline, distinct from the small badge marquee."""
    bg = "bg-black" if theme == "dark" else "bg-off"
    items = "".join(f'<span class="marquee-item">{w}{tooth_icon(20)}</span>' for w in words)
    return f'''<section class="{bg} section-tight tagline-marquee" data-nav-theme="{theme}">
  <div class="marquee-wrap"><div class="marquee-track" data-marquee>{items}</div></div>
</section>'''

def cta_band():
    return '''<section class="bg-black" data-nav-theme="dark" style="padding:170px 6vw; text-align:left;">
  <div class="wrap" style="padding:0;">
    <span class="label on-dark" data-reveal>Get Started</span>
    <h2 data-reveal-text style="font-size:clamp(2.2rem,6vw,4.6rem); font-weight:200; margin-top:22px; max-width:820px;">YOUR NEXT SMILE STARTS HERE.</h2>
    <div style="display:flex; gap:18px; flex-wrap:wrap; margin-top:44px;" data-reveal>
      <a href="appointment.html" class="btn btn-light">Book a Consultation <span class="arrow">&rarr;</span></a>
      <a href="contact.html" class="btn btn-ghost" style="border:1px solid var(--line-dark);">Contact Clinic</a>
    </div>
  </div>
</section>'''

def faq_block(items, theme="light"):
    rows = []
    for i, (q, a) in enumerate(items):
        rows.append(f'''<div class="acc-row{' open' if i==0 else ''}">
        <div class="acc-head"><h3><span class="acc-num">{i+1:02d}</span>{q}</h3><span class="acc-plus">+</span></div>
        <div class="acc-body"><p>{a}</p></div>
      </div>''')
    return "\n      ".join(rows)

print("build.py helpers loaded")

# ---------------------------------------------------------------------------
# IMAGES (Unsplash placeholders — swap for real clinic photography later)
# ---------------------------------------------------------------------------
IMG = {
    "clinic1": "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1600&auto=format&fit=crop",
    "clinic2": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=1400&auto=format&fit=crop",
    "lounge":  "https://images.unsplash.com/photo-1571772996211-2f02c9727629?q=80&w=1400&auto=format&fit=crop",
    "lab":     "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?q=80&w=1400&auto=format&fit=crop",
    "digital": "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1400&auto=format&fit=crop",
    "smile_m": "https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=1000&auto=format&fit=crop",
    "smile_f": "https://images.unsplash.com/photo-1580489944035-8f6b7bf0b0d9?q=80&w=1000&auto=format&fit=crop",
    "doc_f1":  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=900&auto=format&fit=crop",
    "doc_m1":  "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?q=80&w=900&auto=format&fit=crop",
    "doc_f2":  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?q=80&w=900&auto=format&fit=crop",
    "doc_m2":  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=900&auto=format&fit=crop",
    "arch":    "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1400&auto=format&fit=crop",
    "tools":   "https://images.unsplash.com/photo-1629909615184-74f495363b67?q=80&w=1200&auto=format&fit=crop",
    "berlin":  "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?q=80&w=1600&auto=format&fit=crop",
}

# ---------------------------------------------------------------------------
# INDEX.HTML
# ---------------------------------------------------------------------------
index_body = f'''
<!-- ================= CINEMATIC HERO (index.html only) ================= -->
<section data-hero data-hero-cinematic data-nav-theme="light" class="hero-cinematic" style="min-height:100svh;">
  <img class="hero-bg" src="assets/images/dental-bg.png" alt="">
  <div class="hero-glow"></div>

  <div class="wrap hero-cinematic-grid">
    <div class="hero-cinematic-copy">
      <span class="label" data-hero-fade>Private Dental Clinic &middot; Akola</span>
      <h1 class="hero-cinematic-heading">
        <span class="split-line"><span data-hero-line style="display:block;">QUALITY</span></span>
        <span class="split-line"><span data-hero-line style="display:block;">DENTISTRY</span></span>
        <span class="split-line"><span data-hero-line style="display:block;">FOR HEALTHY</span></span>
        <span class="split-line"><span data-hero-line style="display:block;" class="accent-orange">&amp; BEAUTIFUL</span></span>
        <span class="split-line"><span data-hero-line style="display:block;" class="accent-orange">SMILES</span></span>
      </h1>
      <p data-hero-fade style="max-width:420px; margin-top:26px; font-size:15px; line-height:1.8; color:var(--grey-dark);">
        Precision dentistry, advanced implantology and personalised care &mdash; from Akola&rsquo;s trusted multi-specialty dental practice.
      </p>
      <div data-hero-fade style="display:flex; gap:16px; flex-wrap:wrap; margin-top:36px;">
        <a href="appointment.html" class="btn btn-dark">Book a Consultation <span class="arrow">&rarr;</span></a>
        <a href="services.html" class="btn btn-ghost" style="border:1px solid var(--line-light);">Explore Services <span class="arrow">&rarr;</span></a>
      </div>
      <div data-hero-fade class="hero-cinematic-stats">
        <div><span class="mono" data-count-to="4.8">0</span><span class="mono">/5</span><p>Patient Rating</p></div>
        <div><span class="mono" data-count-to="140">0</span><span class="mono">+</span><p>Reviews</p></div>
        <div><span class="mono" data-count-to="1350">0</span><span class="mono">+</span><p>Patients</p></div>
      </div>
    </div>

    <div class="hero-character-wrap">
      <div class="hero-character-float">
        <img class="hero-character" src="assets/images/dental-character.png" alt="Saraf Dental Care dental implant" data-cursor-view="Explore">
      </div>
    </div>
  </div>

  <div class="scroll-ind" style="color:var(--grey-dark);"><span>Scroll</span><span class="line"></span></div>
</section>

<!-- ================= 50-FRAME CINEMATIC IMPLANT SEQUENCE ================= -->
<section class="frame-sequence" data-frame-sequence data-nav-theme="light" aria-label="Cinematic dental implant sequence">
  <div class="frame-sequence-sticky">
    <div class="frame-sequence-stage">
      <canvas class="frame-sequence-canvas" data-frame-canvas aria-label="Animated dental implant illustration"></canvas>
      <div class="frame-sequence-vignette" aria-hidden="true"></div>
    </div>
    <div class="frame-sequence-copy">
      <span class="frame-sequence-kicker">01 / Implantology</span>
      <h2 class="frame-sequence-title">Precision that <em>moves</em> with you.</h2>
      <p class="frame-sequence-desc">Scroll through 50 crafted frames as the implant evolves from a single precise detail into a complete, confident smile.</p>
    </div>
    <div class="frame-sequence-step" aria-hidden="true"><strong data-frame-current>01</strong><span>/ 50 frames</span></div>
    <div class="frame-sequence-progress" aria-hidden="true"><i data-frame-progress></i></div>
    <div class="frame-sequence-scroll">Scroll to explore</div>
    <div class="frame-sequence-mobile-note">Swipe / scroll — cinematic sequence</div>
  </div>
</section>

<!-- ================= CHARACTER SCROLL STORY (desktop pinned, mobile simplified) ================= -->
<section class="character-story" data-character-story data-nav-theme="light">
  <div class="story-character-wrap"><img class="story-character" src="assets/images/dental-character.png" alt=""></div>
  <div class="story-phase story-phase-1"><span class="mono story-num">01 / Precision</span><h3>Every detail matters.</h3></div>
  <div class="story-phase story-phase-2"><span class="mono story-num">02 / Technology</span><h3>Digital precision.<br>Human judgement.</h3></div>
  <div class="story-phase story-phase-3"><span class="mono story-num">03 / Care</span><h3>Advanced dentistry,<br>designed around you.</h3></div>
  <div class="story-phase story-phase-4"><h3 style="font-style:italic;">Built around your smile.</h3></div>
</section>

<!-- 03 — INTRODUCTION -->
<section class="section bg-off">
  <div class="wrap">
    <span class="label" data-reveal>01 / Introduction</span>
    <h2 data-reveal-text style="font-size:clamp(2.2rem,6vw,4.8rem); font-weight:200; margin-top:24px; max-width:900px;">DENTISTRY, REDEFINED.</h2>
    <p data-reveal style="max-width:520px; margin-top:28px; font-size:15px; line-height:1.85; color:var(--grey-dark);">
      Saraf Dental Care was founded on the belief that restorative dentistry is precision work performed on living tissue — and deserves the same rigor as any exacting craft. Every plan begins with full diagnostics. Every material is chosen for the individual. Every visit is built around comfort, not correction alone.
    </p>
  </div>
</section>

<!-- 04 — PINNED IMAGE ZOOM -->
<section class="pin-zoom-wrap" data-zoom-pin data-nav-theme="dark">
  <div class="pin-zoom-img" style="width:62vw; height:56vh;">
    <img src="{IMG['clinic1']}" alt="Saraf Dental Care treatment suite">
  </div>
  <div data-zoom-overlay style="position:absolute; inset:0; display:flex; align-items:flex-end; padding:60px 6vw; pointer-events:none;">
    <div>
      <span class="label on-dark" style="color:var(--stone);">Fig. 01 &mdash; Treatment Suite</span>
      <h3 style="color:var(--white); font-size:clamp(1.6rem,4vw,3rem); font-weight:200; margin-top:14px;">Every detail, considered.</h3>
    </div>
  </div>
</section>

<!-- 05 — CLINIC STATEMENT -->
<section class="section bg-black" data-nav-theme="dark">
  <div class="wrap" data-stagger-lines>
    <h2 style="font-size:clamp(2rem,6vw,4.4rem); font-weight:200; line-height:1.15;">PRECISION IS NOT</h2>
    <h2 style="font-size:clamp(2rem,6vw,4.4rem); font-weight:200; line-height:1.15;">A TECHNIQUE.</h2>
    <h2 style="font-size:clamp(2rem,6vw,4.4rem); font-weight:600; line-height:1.15; color:var(--stone);">IT IS A STANDARD.</h2>
  </div>
</section>

<!-- 06/07 — SERVICES INTRO + GRID -->
<section class="section bg-off">
  <div class="wrap">
    <span class="label" data-reveal>02 / Expertise</span>
    <h2 data-reveal-text style="font-size:clamp(2rem,5.5vw,4.2rem); font-weight:200; margin-top:24px; max-width:820px;">ADVANCED CARE. NATURALLY DELIVERED.</h2>
  </div>
  <div class="wrap" style="margin-top:70px;" data-reveal-group>
    <a href="implants.html" class="svc-panel" data-cursor-view="View">
      <span class="svc-num">01</span><h3>Implantology</h3><span class="svc-arrow">&rarr;</span>
      <p class="svc-desc">Premium titanium implants, planned digitally to sub-millimeter accuracy.</p>
    </a>
    <a href="aesthetic-dentistry.html" class="svc-panel" data-cursor-view="View">
      <span class="svc-num">02</span><h3>Aesthetic Dentistry</h3><span class="svc-arrow">&rarr;</span>
      <p class="svc-desc">Veneers, whitening and bonding, hand-finished for a natural result.</p>
    </a>
    <a href="digital-dentistry.html" class="svc-panel" data-cursor-view="View">
      <span class="svc-num">03</span><h3>Digital Dentistry</h3><span class="svc-arrow">&rarr;</span>
      <p class="svc-desc">CBCT imaging, intraoral scanning and CAD/CAM restorations, in-house.</p>
    </a>
    <a href="services.html" class="svc-panel" data-cursor-view="View">
      <span class="svc-num">04</span><h3>Veneers</h3><span class="svc-arrow">&rarr;</span>
      <p class="svc-desc">Thin ceramic shells, shade-matched by hand to the surrounding dentition.</p>
    </a>
    <a href="services.html" class="svc-panel" data-cursor-view="View">
      <span class="svc-num">05</span><h3>Clear Aligners</h3><span class="svc-arrow">&rarr;</span>
      <p class="svc-desc">Invisalign-system alignment, planned from a full 3D scan.</p>
    </a>
    <a href="prevention.html" class="svc-panel" data-cursor-view="View">
      <span class="svc-num">06</span><h3>Preventive Dentistry</h3><span class="svc-arrow">&rarr;</span>
      <p class="svc-desc">Structured hygiene and screening for long-term oral health.</p>
    </a>
  </div>
  <div class="wrap" style="margin-top:56px;">
    <a href="services.html" class="btn btn-dark">Full Services Directory <span class="arrow">&rarr;</span></a>
  </div>
</section>

<!-- 08 — HORIZONTAL WORKFLOW -->
<section class="pin-section bg-black" data-nav-theme="dark" data-h-scroll style="overflow:hidden; padding:110px 0;">
  <div class="wrap" style="margin-bottom:60px;">
    <span class="label on-dark">The Workflow</span>
    <h2 style="font-size:clamp(2rem,5vw,3.6rem); font-weight:200; margin-top:20px; color:var(--white);">Five stages, one continuous plan</h2>
  </div>
  <div class="h-track" style="padding:0 6vw; gap:24px;">
    <div class="h-panel" style="width:min(84vw,440px); height:500px; background:var(--charcoal); padding:46px; display:flex; flex-direction:column; justify-content:space-between; border:1px solid var(--line-dark);">
      <span style="font-size:13px; color:var(--grey);">01</span>
      <div><h3 style="font-size:1.6rem; font-weight:300; color:var(--white); margin-bottom:12px;">Consultation</h3><p style="color:var(--grey); font-size:14px; line-height:1.7;">A full clinical exam and conversation about your goals — no assumptions made in advance.</p></div>
    </div>
    <div class="h-panel" style="width:min(84vw,440px); height:500px; background:var(--charcoal); padding:46px; display:flex; flex-direction:column; justify-content:space-between; border:1px solid var(--line-dark);">
      <span style="font-size:13px; color:var(--grey);">02</span>
      <div><h3 style="font-size:1.6rem; font-weight:300; color:var(--white); margin-bottom:12px;">Digital Diagnosis</h3><p style="color:var(--grey); font-size:14px; line-height:1.7;">CBCT scan and intraoral capture build a precise 3D model of your case.</p></div>
    </div>
    <div class="h-panel" style="width:min(84vw,440px); height:500px; background:var(--charcoal); padding:46px; display:flex; flex-direction:column; justify-content:space-between; border:1px solid var(--line-dark);">
      <span style="font-size:13px; color:var(--grey);">03</span>
      <div><h3 style="font-size:1.6rem; font-weight:300; color:var(--white); margin-bottom:12px;">Treatment Planning</h3><p style="color:var(--grey); font-size:14px; line-height:1.7;">Every option is modeled and discussed before a single instrument is used.</p></div>
    </div>
    <div class="h-panel" style="width:min(84vw,440px); height:500px; background:var(--charcoal); padding:46px; display:flex; flex-direction:column; justify-content:space-between; border:1px solid var(--line-dark);">
      <span style="font-size:13px; color:var(--grey);">04</span>
      <div><h3 style="font-size:1.6rem; font-weight:300; color:var(--white); margin-bottom:12px;">Precision Treatment</h3><p style="color:var(--grey); font-size:14px; line-height:1.7;">Guided placement and restoration, executed to the plan.</p></div>
    </div>
    <div class="h-panel" style="width:min(84vw,440px); height:500px; background:var(--charcoal); padding:46px; display:flex; flex-direction:column; justify-content:space-between; border:1px solid var(--line-dark);">
      <span style="font-size:13px; color:var(--grey);">05</span>
      <div><h3 style="font-size:1.6rem; font-weight:300; color:var(--white); margin-bottom:12px;">Follow-Up</h3><p style="color:var(--grey); font-size:14px; line-height:1.7;">Structured recall visits monitor healing for the life of the restoration.</p></div>
    </div>
  </div>
</section>

<!-- 09 — DIGITAL DIAGNOSIS (parallax) -->
<section class="section bg-off" style="overflow:hidden;">
  <div class="wrap" style="display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center;">
    <div data-reveal>
      <span class="label">Digital Diagnosis</span>
      <h2 style="font-size:clamp(1.9rem,4vw,3rem); font-weight:200; margin-top:20px;">Seeing the full picture before treating any of it.</h2>
      <p style="color:var(--grey-dark); font-size:14.5px; line-height:1.8; margin-top:22px; max-width:440px;">CBCT imaging, intraoral scanning and digital smile design let us model outcomes before treatment begins — reducing surprises and guesswork on both sides.</p>
    </div>
    <div style="position:relative; height:460px; overflow:hidden;">
      <img data-parallax="-50" src="{IMG['digital']}" alt="Digital dental scan and 3D planning" style="width:100%; height:130%; object-fit:cover; position:absolute; top:-15%;">
    </div>
  </div>
</section>

<!-- 10 — IMAGE REVEAL (clip-path) -->
<section class="section" style="padding:0; position:relative; height:90vh; overflow:hidden;" data-nav-theme="dark">
  <div data-reveal-img style="position:absolute; inset:0;">
    <img src="{IMG['clinic2']}" alt="Saraf Dental Care technology in use">
  </div>
  <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center; background:rgba(10,10,9,0.28);">
    <h2 style="color:var(--white); font-size:clamp(2rem,6vw,4.2rem); font-weight:200; text-align:center; line-height:1.15;">TECHNOLOGY<br>IN SERVICE<br>OF PEOPLE.</h2>
  </div>
</section>

<!-- 11 — IMPLANTOLOGY FEATURE -->
<section class="section bg-black" data-nav-theme="dark">
  <div class="wrap" style="display:grid; grid-template-columns:1fr 0.9fr; gap:70px; align-items:center;">
    <div data-reveal-img style="aspect-ratio:4/5; order:2;"><img src="{IMG['lab']}" alt="Implant planning and precision manufacturing"></div>
    <div data-reveal style="order:1;">
      <span class="label on-dark">Implantology</span>
      <h2 style="color:var(--white); font-size:clamp(2rem,5vw,3.6rem); font-weight:200; margin-top:20px;">RESTORE WHAT MATTERS.</h2>
      <p style="color:var(--grey); font-size:14.5px; line-height:1.85; margin-top:24px; max-width:440px;">Full-arch and single-tooth implants planned to the tenth of a millimeter, placed through guided surgery, and followed for the life of the restoration.</p>
      <a href="implants.html" class="btn btn-light" style="margin-top:32px;">Explore Implantology <span class="arrow">&rarr;</span></a>
    </div>
  </div>
</section>

<!-- 12 — CASE STUDIES PREVIEW -->
<section class="section bg-off">
  <div class="wrap">
    <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px; margin-bottom:56px;">
      <div><span class="label">Results</span><h2 style="font-size:clamp(1.9rem,4vw,3rem); font-weight:200; margin-top:18px;">Case studies</h2></div>
      <a href="case-studies.html" class="btn btn-dark">All Case Studies <span class="arrow">&rarr;</span></a>
    </div>
    <div data-reveal-group style="display:grid; grid-template-columns:repeat(3,1fr); gap:24px;">
      <div><div data-reveal-img style="aspect-ratio:4/5;"><img src="{IMG['smile_m']}" alt="Case 01 result"></div><p style="margin-top:16px; font-size:13px; color:var(--grey-dark);">Case 01 &mdash; Full-Arch Restoration</p></div>
      <div><div data-reveal-img style="aspect-ratio:4/5;"><img src="{IMG['smile_f']}" alt="Case 02 result"></div><p style="margin-top:16px; font-size:13px; color:var(--grey-dark);">Case 02 &mdash; Porcelain Veneers</p></div>
      <div><div data-reveal-img style="aspect-ratio:4/5;"><img src="{IMG['doc_f1']}" alt="Case 03 result"></div><p style="margin-top:16px; font-size:13px; color:var(--grey-dark);">Case 03 &mdash; Single Implant</p></div>
    </div>
  </div>
</section>

<!-- 13 — DOCTORS PREVIEW -->
<section class="section bg-white">
  <div class="wrap">
    <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px; margin-bottom:56px;">
      <div><span class="label">The Team</span><h2 style="font-size:clamp(1.9rem,4vw,3rem); font-weight:200; margin-top:18px;">Specialists behind every case</h2></div>
      <a href="doctors.html" class="btn btn-dark">Meet the Team <span class="arrow">&rarr;</span></a>
    </div>
    <div data-reveal-group style="display:grid; grid-template-columns:repeat(2,1fr); gap:24px; max-width:700px;">
      <a href="doctor-profile.html" class="doc-card" data-tilt data-cursor-view="Profile"><div class="doc-portrait"><img src="{IMG['doc_f1']}" alt="Dr. Shakun Saraf"></div><h3 style="font-size:1.05rem; font-weight:500; margin-top:16px;">Dr. Shakun Saraf</h3><p style="font-size:12px; color:var(--grey-dark); margin-top:4px;">Founder &middot; BDS, MDS</p></a>
      <a href="doctor-profile.html" class="doc-card" data-tilt data-cursor-view="Profile"><div class="doc-portrait"><img src="{IMG['doc_f2']}" alt="Dr. Urviti Khatri"></div><h3 style="font-size:1.05rem; font-weight:500; margin-top:16px;">Dr. Urviti Khatri</h3><p style="font-size:12px; color:var(--grey-dark); margin-top:4px;">Associate &middot; BDS</p></a>
    </div>
  </div>
</section>

<!-- 14 — PHILOSOPHY -->
<section class="section bg-black" data-nav-theme="dark">
  <div class="wrap">
    <h2 data-reveal-text style="font-size:clamp(2rem,6vw,4.4rem); font-weight:200; text-align:center; color:var(--white);">MEDICINE WITH HUMANITY.</h2>
    <div data-reveal-group style="display:grid; grid-template-columns:repeat(3,1fr); gap:40px; margin-top:80px;">
      <div style="border-top:1px solid var(--line-dark); padding-top:24px;"><span style="font-size:12px; color:var(--grey);">01</span><h3 style="color:var(--white); font-size:1.5rem; font-weight:300; margin-top:14px;">Precision</h3><p style="color:var(--grey); font-size:13.5px; line-height:1.7; margin-top:12px;">Every plan is measured, modeled and reviewed before treatment begins.</p></div>
      <div style="border-top:1px solid var(--line-dark); padding-top:24px;"><span style="font-size:12px; color:var(--grey);">02</span><h3 style="color:var(--white); font-size:1.5rem; font-weight:300; margin-top:14px;">Transparency</h3><p style="color:var(--grey); font-size:13.5px; line-height:1.7; margin-top:12px;">Costs, timelines and options are laid out clearly, with nothing assumed.</p></div>
      <div style="border-top:1px solid var(--line-dark); padding-top:24px;"><span style="font-size:12px; color:var(--grey);">03</span><h3 style="color:var(--white); font-size:1.5rem; font-weight:300; margin-top:14px;">Care</h3><p style="color:var(--grey); font-size:13.5px; line-height:1.7; margin-top:12px;">Comfort and follow-up matter as much as the clinical outcome itself.</p></div>
    </div>
  </div>
</section>

{tagline_band(["PRECISION", "TRUST", "CARE", "INNOVATION"], theme="dark")}

<!-- 16 — GALLERY PREVIEW -->
<section class="section bg-off">
  <div class="wrap">
    <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px; margin-bottom:50px;">
      <div><span class="label">Gallery</span><h2 style="font-size:clamp(1.9rem,4vw,3rem); font-weight:200; margin-top:18px;">Inside the practice</h2></div>
      <a href="gallery.html" class="btn btn-dark">View Full Gallery <span class="arrow">&rarr;</span></a>
    </div>
    <div data-reveal-group style="display:grid; grid-template-columns:repeat(4,1fr); grid-auto-rows:230px; gap:14px;">
      <div class="gal-item" data-tilt style="grid-column:span 2; grid-row:span 2;"><img src="{IMG['clinic1']}" alt="Treatment suite" data-cursor-view="View"><div class="gal-cap">Treatment Suite</div></div>
      <div class="gal-item" data-tilt><img src="{IMG['lounge']}" alt="Reception lounge" data-cursor-view="View"><div class="gal-cap">Reception</div></div>
      <div class="gal-item" data-tilt><img src="{IMG['lab']}" alt="Sterilization lab" data-cursor-view="View"><div class="gal-cap">Sterilization Lab</div></div>
      <div class="gal-item" data-tilt><img src="{IMG['arch']}" alt="Clinic architecture" data-cursor-view="View"><div class="gal-cap">Architecture</div></div>
      <div class="gal-item" data-tilt><img src="{IMG['digital']}" alt="Digital planning station" data-cursor-view="View"><div class="gal-cap">Digital Planning</div></div>
    </div>
  </div>
</section>

<!-- 17 — REVIEWS -->
<section class="section bg-white">
  <div class="wrap">
    <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:20px; margin-bottom:20px;">
      <span class="label">Reviews</span>
      <div data-track-controls style="display:flex; gap:10px;">
        <button data-track-prev aria-label="Previous" style="width:44px; height:44px; border:1px solid var(--line-light); background:transparent;">&larr;</button>
        <button data-track-next aria-label="Next" style="width:44px; height:44px; border:1px solid var(--line-light); background:transparent;">&rarr;</button>
      </div>
    </div>
    <div data-track data-track-controls style="display:flex; gap:32px; overflow-x:auto; scroll-snap-type:x mandatory; padding:30px 0 10px;">
      <blockquote style="min-width:520px; scroll-snap-align:start; margin:0;">
        <p style="font-size:clamp(1.3rem,2.6vw,2rem); font-weight:300; line-height:1.4;">&ldquo;Exceptional precision, care and attention from the first consultation.&rdquo;</p>
        <cite style="display:block; margin-top:24px; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--grey-dark); font-style:normal;">Ananya R. &mdash; Full-Arch Implants</cite>
      </blockquote>
      <blockquote style="min-width:520px; scroll-snap-align:start; margin:0;">
        <p style="font-size:clamp(1.3rem,2.6vw,2rem); font-weight:300; line-height:1.4;">&ldquo;The calmest I have ever felt walking into a dental appointment.&rdquo;</p>
        <cite style="display:block; margin-top:24px; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--grey-dark); font-style:normal;">Rohan K. &mdash; Root Canal Therapy</cite>
      </blockquote>
      <blockquote style="min-width:520px; scroll-snap-align:start; margin:0;">
        <p style="font-size:clamp(1.3rem,2.6vw,2rem); font-weight:300; line-height:1.4;">&ldquo;My veneers were matched so precisely, no one can tell which teeth were treated.&rdquo;</p>
        <cite style="display:block; margin-top:24px; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--grey-dark); font-style:normal;">Meera P. &mdash; Porcelain Veneers</cite>
      </blockquote>
    </div>
    <a href="reviews.html" class="btn btn-dark" style="margin-top:20px;">Read All Reviews <span class="arrow">&rarr;</span></a>
  </div>
</section>

<!-- 18 — FAQ -->
<section class="section bg-off">
  <div class="wrap" style="display:grid; grid-template-columns:0.8fr 1.2fr; gap:70px;">
    <div data-reveal>
      <span class="label">FAQ</span>
      <h2 style="font-size:clamp(1.9rem,4vw,3rem); font-weight:200; margin-top:18px;">Common questions</h2>
      <a href="faq.html" class="btn btn-dark" style="margin-top:30px;">All Questions <span class="arrow">&rarr;</span></a>
    </div>
    <div>
      {faq_block([
        ("What treatments do you offer?", "Implantology, aesthetic dentistry, digital dentistry, orthodontics, endodontics and preventive care — see the full services directory for details."),
        ("How does implant treatment work?", "It begins with a CBCT scan and digital plan, followed by guided placement and, after healing, the final restoration."),
        ("How long does treatment take?", "Single-tooth cases often resolve in 8&ndash;16 weeks. Full-arch cases typically take 3&ndash;6 months from consultation to final restoration."),
        ("Do you offer digital smile design?", "Yes &mdash; we model the expected result digitally before any irreversible treatment begins."),
        ("Do you treat international patients?", "Yes &mdash; we welcome patients from across Maharashtra and beyond, including NRIs visiting home; we coordinate compressed, multi-visit treatment plans where needed."),
      ])}
    </div>
  </div>
</section>

<!-- 19 — AKOLA LOCATION -->
<section class="section bg-black" data-nav-theme="dark" style="position:relative; overflow:hidden;">
  <img data-parallax="40" src="{IMG['berlin']}" alt="Clinic exterior in Akola" style="position:absolute; inset:0; width:100%; height:130%; object-fit:cover; opacity:0.28; top:-15%;">
  <div class="wrap" style="position:relative;">
    <h2 style="font-size:clamp(3rem,12vw,9rem); font-weight:200; color:var(--white); line-height:0.9;">AKOLA</h2>
    <div style="display:flex; justify-content:space-between; align-items:flex-end; flex-wrap:wrap; gap:30px; margin-top:50px;">
      <div>
        <p style="color:var(--white); font-size:1.1rem;">Saraf Dental Care</p>
        <p style="color:var(--grey); font-size:14px; margin-top:8px;">1st Floor, Nishant Tower, M.G. Road, Akola &ndash; 444001, Maharashtra, India</p>
      </div>
      <a href="location.html" class="btn btn-light">View on Maps <span class="arrow">&rarr;</span></a>
    </div>
  </div>
</section>

{cta_band()}
'''

write("index.html", "Saraf Dental Care | Best Dentist in Akola | Dental Implants & Root Canal",
      "A private dental clinic and implantology center in Akola — precision medical standards, aesthetic dentistry and digital diagnostics delivered with boutique hospitality.",
      index_body)

# ---------------------------------------------------------------------------
# ABOUT.HTML
# ---------------------------------------------------------------------------
about_body = f'''
{page_hero("About Saraf Dental Care", ["A PRIVATE", "PRACTICE, BUILT", "ON PRECISION."],
  "Founded by Dr. Shakun Saraf (BDS, MDS), the clinic has grown into one of Akola's most trusted multi-specialty dental practices &mdash; built on one conviction: patients deserve both clinical precision and a calm, comfortable experience.")}

<section class="section bg-white">
  <div class="wrap" style="display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center;">
    <div data-reveal><span class="label">02 / Story</span><h2 style="font-size:clamp(1.9rem,4.4vw,3.2rem); font-weight:200; margin-top:20px;">A decade of narrowing our focus, not widening it.</h2>
      <p style="color:var(--grey-dark); font-size:14.5px; line-height:1.85; margin-top:24px; max-width:480px;">Rather than becoming a general practice, Saraf Dental Care has spent ten years going deeper into implantology, prosthodontics and digital planning — the disciplines where precision compounds into better long-term outcomes.</p></div>
    <div data-reveal-img style="aspect-ratio:4/5;"><img src="{IMG['clinic1']}" alt="Saraf Dental Care interior"></div>
  </div>
</section>

<section class="section bg-off">
  <div class="wrap">
    <span class="label" data-reveal>03 / History</span>
    <h2 data-reveal-text style="font-size:clamp(1.9rem,4.4vw,3.2rem); font-weight:200; margin-top:20px; margin-bottom:70px;">Five milestones</h2>
    <div data-reveal-group>
      <div style="display:grid; grid-template-columns:110px 1fr; gap:30px; padding:32px 0; border-top:1px solid var(--line-light);"><span style="font-size:14px; color:var(--grey-dark);">Est.</span><div><h3 style="font-size:1.3rem; font-weight:500;">Founded on M.G. Road, Akola</h3><p style="color:var(--grey-dark); font-size:14px; margin-top:8px; max-width:520px;">Dr. Shakun Saraf opens a small dental practice in the heart of the city, focused on comprehensive, patient-first care.</p></div></div>
      <div style="display:grid; grid-template-columns:110px 1fr; gap:30px; padding:32px 0; border-top:1px solid var(--line-light);"><span style="font-size:14px; color:var(--grey-dark);">Growth</span><div><h3 style="font-size:1.3rem; font-weight:500;">Multi-specialty expansion</h3><p style="color:var(--grey-dark); font-size:14px; margin-top:8px; max-width:520px;">The practice grows to cover implants, root canal therapy, orthodontics and smile designing under one roof.</p></div></div>
      <div style="display:grid; grid-template-columns:110px 1fr; gap:30px; padding:32px 0; border-top:1px solid var(--line-light);"><span style="font-size:14px; color:var(--grey-dark);">Team</span><div><h3 style="font-size:1.3rem; font-weight:500;">Dr. Urviti Khatri joins</h3><p style="color:var(--grey-dark); font-size:14px; margin-top:8px; max-width:520px;">A second dentist joins the practice, expanding capacity for general and restorative care.</p></div></div>
      <div style="display:grid; grid-template-columns:110px 1fr; gap:30px; padding:32px 0; border-top:1px solid var(--line-light);"><span style="font-size:14px; color:var(--grey-dark);">Tech</span><div><h3 style="font-size:1.3rem; font-weight:500;">Modern equipment upgrade</h3><p style="color:var(--grey-dark); font-size:14px; margin-top:8px; max-width:520px;">Laser gum treatment and updated diagnostic technology are added to the clinic's capabilities.</p></div></div>
      <div style="display:grid; grid-template-columns:110px 1fr; gap:30px; padding:32px 0; border-top:1px solid var(--line-light); border-bottom:1px solid var(--line-light);"><span style="font-size:14px; color:var(--grey-dark);">Today</span><div><h3 style="font-size:1.3rem; font-weight:500;">A trusted name in the city</h3><p style="color:var(--grey-dark); font-size:14px; margin-top:8px; max-width:520px;">The practice now holds a 4.8/5 rating across 140+ patient reviews and continues to treat families across Akola and Vidarbha.</p></div></div>
    </div>
  </div>
</section>

<section class="section bg-black" data-nav-theme="dark" style="text-align:center;">
  <div class="wrap"><span class="label on-dark" style="justify-content:center;">04 / Philosophy</span>
    <h2 data-reveal-text style="font-size:clamp(1.9rem,4.6vw,3.4rem); font-weight:200; margin-top:24px; max-width:820px; margin-left:auto; margin-right:auto; color:var(--white);">A restoration only succeeds if the patient forgets it is there.</h2>
    <p style="color:var(--grey); margin-top:26px; font-size:13.5px;">&mdash; Dr. Shakun Saraf, Founder</p>
  </div>
</section>

<section class="section bg-off">
  <div class="wrap"><span class="label" data-reveal>05 / Brand Pillars</span><h2 data-reveal-text style="font-size:clamp(1.9rem,4.4vw,3.2rem); font-weight:200; margin-top:20px; margin-bottom:60px;">What we hold to</h2>
    <div data-reveal-group style="display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:var(--line-light);">
      <div style="background:var(--off-white); padding:44px 34px;"><span style="font-size:12px; color:var(--grey-dark);">PRECISION</span><h3 style="font-size:1.3rem; font-weight:400; margin-top:16px; margin-bottom:10px;">Diagnose before deciding</h3><p style="color:var(--grey-dark); font-size:13.5px; line-height:1.7;">Every plan begins with imaging and data, never a recommendation made on sight.</p></div>
      <div style="background:var(--off-white); padding:44px 34px;"><span style="font-size:12px; color:var(--grey-dark);">MATCH</span><h3 style="font-size:1.3rem; font-weight:400; margin-top:16px; margin-bottom:10px;">Fit the mouth, not the average</h3><p style="color:var(--grey-dark); font-size:13.5px; line-height:1.7;">Shade, occlusion and gum contour are individually matched, never selected from a catalogue.</p></div>
      <div style="background:var(--off-white); padding:44px 34px;"><span style="font-size:12px; color:var(--grey-dark);">CONTINUITY</span><h3 style="font-size:1.3rem; font-weight:400; margin-top:16px; margin-bottom:10px;">Stay after the case closes</h3><p style="color:var(--grey-dark); font-size:13.5px; line-height:1.7;">Structured recall continues for the life of every restoration we place.</p></div>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="wrap" style="display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center;">
    <div data-reveal-img style="aspect-ratio:4/5;"><img src="{IMG['arch']}" alt="Clinic environment"></div>
    <div data-reveal><span class="label">06 / Environment</span><h2 style="font-size:clamp(1.9rem,4.4vw,3rem); font-weight:200; margin-top:20px;">Architecture built for calm.</h2>
      <p style="color:var(--grey-dark); font-size:14.5px; line-height:1.85; margin-top:22px; max-width:460px;">Natural light, quiet material palettes and private treatment suites are chosen as deliberately as any clinical protocol.</p>
      <a href="clinic.html" class="btn btn-dark" style="margin-top:30px;">Tour the Clinic <span class="arrow">&rarr;</span></a>
    </div>
  </div>
</section>

{tagline_band(["PRECISION", "MATCH", "CONTINUITY"], theme="light")}

{cta_band()}
'''
write("about.html", "About | Saraf Dental Care Akola",
      "The story, history and philosophy behind Saraf Dental Care — a private implantology and aesthetic dentistry practice in Akola.", about_body)

# ---------------------------------------------------------------------------
# SERVICES.HTML
# ---------------------------------------------------------------------------
def svc_row(num, name, desc, href):
    return f'''<a href="{href}" class="svc-panel" data-cursor-view="View">
      <span class="svc-num">{num}</span><h3>{name}</h3><span class="svc-arrow">&rarr;</span>
      <p class="svc-desc">{desc}</p>
    </a>'''

services_list = [
    ("01","Dental Implants","implants.html","Durable titanium root replacements, planned digitally in 3D."),
    ("02","Smile Designing","aesthetic-dentistry.html","A full digital preview of your smile before treatment begins."),
    ("03","Root Canal Treatment","services.html","Comfortable endodontic therapy to preserve the natural tooth."),
    ("04","Cosmetic Dentistry","aesthetic-dentistry.html","Veneers, whitening and bonding for a natural, confident smile."),
    ("05","Porcelain Veneers","aesthetic-dentistry.html","Hand-finished ceramic shells, shade-matched to the natural dentition."),
    ("06","Professional Teeth Whitening","aesthetic-dentistry.html","In-clinic whitening calibrated to a safe, even result."),
    ("07","Braces &amp; Orthodontics","services.html","Traditional and clear-aligner options to align the bite."),
    ("08","Laser Gum Surgery","services.html","Minimally invasive, precise treatment for gum-related procedures."),
    ("09","Gum Recontouring","services.html","Reshaping the gum line to balance and frame the smile."),
    ("10","Crown Lengthening","services.html","Exposing more of the tooth structure ahead of a restoration."),
    ("11","Crowns &amp; Bridges","services.html","Custom-fitted restorations for damaged or missing teeth."),
    ("12","Restorative Dentistry","services.html","Repair and rebuilding of compromised tooth structure."),
    ("13","Oral Surgery","services.html","Extractions and minor surgical procedures performed safely in-clinic."),
    ("14","Children's Dentistry","services.html","Gentle, age-appropriate dental care for younger patients."),
    ("15","Preventive Dentistry","prevention.html","Structured screening and hygiene to catch issues early."),
    ("16","Professional Hygiene","prevention.html","Deep cleaning and periodontal maintenance, recommended twice yearly."),
]
services_rows = "\n    ".join(svc_row(n,t,d,h) for n,t,h,d in services_list)

services_body = f'''
{page_hero("Procedure Directory", ["EVERY TREATMENT", "WE OFFER,", "IN DETAIL."],
  "From single-tooth implants to full digital smile design — explore the full directory below, or open one of our dedicated specialty pages.")}

<section class="section-tight bg-white">
  <div class="wrap" data-reveal-group>
    {services_rows}
  </div>
</section>

<section class="section bg-off">
  <div class="wrap">
    <span class="label" data-reveal>Specialty Pages</span>
    <h2 data-reveal-text style="font-size:clamp(1.9rem,4.4vw,3.2rem); font-weight:200; margin-top:20px; margin-bottom:50px;">Go deeper into a discipline</h2>
    <div data-reveal-group style="display:grid; grid-template-columns:repeat(4,1fr); gap:20px;">
      <a href="implants.html" class="svc-panel" style="grid-template-columns:1fr; border:1px solid var(--line-light); padding:34px;" data-cursor-view="View"><span class="svc-num">01</span><h3 style="font-size:1.3rem; margin-top:14px;">Implants &rarr;</h3></a>
      <a href="aesthetic-dentistry.html" class="svc-panel" style="grid-template-columns:1fr; border:1px solid var(--line-light); padding:34px;" data-cursor-view="View"><span class="svc-num">02</span><h3 style="font-size:1.3rem; margin-top:14px;">Aesthetic &rarr;</h3></a>
      <a href="digital-dentistry.html" class="svc-panel" style="grid-template-columns:1fr; border:1px solid var(--line-light); padding:34px;" data-cursor-view="View"><span class="svc-num">03</span><h3 style="font-size:1.3rem; margin-top:14px;">Digital &rarr;</h3></a>
      <a href="prevention.html" class="svc-panel" style="grid-template-columns:1fr; border:1px solid var(--line-light); padding:34px;" data-cursor-view="View"><span class="svc-num">04</span><h3 style="font-size:1.3rem; margin-top:14px;">Prevention &rarr;</h3></a>
    </div>
  </div>
</section>

{tagline_band(["IMPLANTOLOGY", "AESTHETIC", "DIGITAL", "PREVENTION"], theme="dark")}

{cta_band()}
'''
write("services.html", "Services | Saraf Dental Care Akola",
      "The full procedure directory at Saraf Dental Care — implantology, aesthetic dentistry, digital dentistry, prevention and restorative care.", services_body)

# ---------------------------------------------------------------------------
# DOCTORS.HTML
# ---------------------------------------------------------------------------
doctors_list = [
    ("Dr. Shakun Saraf","Founder &middot; BDS, MDS","Lead Dentist","Comprehensive &amp; Cosmetic Dentistry", IMG['doc_f1']),
    ("Dr. Urviti Khatri","Associate &middot; BDS","General Dentistry","Restorative &amp; Preventive Care", IMG['doc_f2']),
]
doc_cards = []
for name, role, tag1, tag2, img in doctors_list:
    doc_cards.append(f'''<a href="doctor-profile.html" class="doc-card" data-tilt data-cursor-view="Profile">
      <div class="doc-portrait"><img src="{img}" alt="{name}"></div>
      <h3 style="font-size:1.2rem; font-weight:500; margin-top:20px;">{name}</h3>
      <p style="font-size:12.5px; color:var(--grey-dark); margin-top:5px;">{role}</p>
      <p style="font-size:12px; color:var(--grey); margin-top:10px;">{tag1} &middot; {tag2}</p>
    </a>''')
doc_cards_html = "\n      ".join(doc_cards)

doctors_body = f'''
{page_hero("The Team", ["THE DENTISTS", "BEHIND EVERY", "CASE."],
  "Two dentists, one continuous standard of care. Every patient at Saraf Dental Care is treated by a team that knows their full history &mdash; not a rotating roster.")}

<section class="section bg-white">
  <div class="wrap" data-reveal-group style="display:grid; grid-template-columns:repeat(2,1fr); gap:30px; max-width:700px;">
    {doc_cards_html}
  </div>
</section>

<section class="section bg-off">
  <div class="wrap" style="display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center;">
    <div data-reveal><span class="label">Treatment Philosophy</span><h2 style="font-size:clamp(1.9rem,4.4vw,3.2rem); font-weight:200; margin-top:20px;">Every case is reviewed together.</h2>
      <p style="color:var(--grey-dark); font-size:14.5px; line-height:1.85; margin-top:22px; max-width:460px;">Complex cases &mdash; implants, full-mouth rehabilitation and cosmetic smile designing &mdash; are discussed jointly before any treatment plan reaches the patient.</p></div>
    <div data-reveal-img style="aspect-ratio:4/5;"><img src="{IMG['lab']}" alt="Clinical team reviewing a case"></div>
  </div>
</section>

{cta_band()}
'''
write("doctors.html", "Doctors | Saraf Dental Care Akola",
      "Meet Dr. Shakun Saraf and Dr. Urviti Khatri, the dentists at Saraf Dental Care, Akola.", doctors_body)

# ---------------------------------------------------------------------------
# DOCTOR-PROFILE.HTML
# ---------------------------------------------------------------------------
profile_body = f'''
<section data-hero data-nav-theme="light" class="bg-off" style="min-height:88vh; display:flex; align-items:flex-end; padding:150px 6vw 70px;">
  <div class="wrap" style="padding:0; display:grid; grid-template-columns:0.7fr 1.3fr; gap:70px; align-items:flex-end; width:100%;">
    <div data-reveal-img style="aspect-ratio:3/4;"><img src="{IMG['doc_f1']}" alt="Dr. Shakun Saraf"></div>
    <div>
      <span class="label" data-hero-fade>Founder &middot; BDS, MDS</span>
      <h1 style="font-size:clamp(2.4rem,6vw,5rem); font-weight:200; margin-top:20px;">Dr. Shakun Saraf</h1>
      <p data-hero-fade style="max-width:520px; margin-top:24px; font-size:14.5px; line-height:1.8; color:var(--grey-dark);">Founder and lead dentist at Saraf Dental Care, known to patients for a calm, thorough approach and treatments that stay comfortable and reasonably priced without compromising on quality.</p>
    </div>
  </div>
</section>

<section class="section bg-white">
  <div class="wrap" style="display:grid; grid-template-columns:repeat(3,1fr); gap:40px;">
    <div data-reveal><span class="label">Qualification</span><p style="margin-top:16px; font-size:14px; line-height:1.8; color:var(--grey-dark);">BDS, MDS</p></div>
    <div data-reveal><span class="label">Focus</span><p style="margin-top:16px; font-size:14px; line-height:1.8; color:var(--grey-dark);">Comprehensive &amp; cosmetic dentistry, smile designing, restorative care.</p></div>
    <div data-reveal><span class="label">Philosophy</span><p style="margin-top:16px; font-size:14px; line-height:1.8; color:var(--grey-dark);">&ldquo;A restoration only succeeds if the patient forgets it&rsquo;s there.&rdquo;</p></div>
  </div>
</section>

{cta_band()}
'''
write("doctor-profile.html", "Dr. Shakun Saraf | Saraf Dental Care Akola",
      "Founder and lead dentist at Saraf Dental Care, Akola.", profile_body)

# ---------------------------------------------------------------------------
# TECHNOLOGY.HTML
# ---------------------------------------------------------------------------
tech_list = [
    ("Digital Scanning","Intraoral scanners replace physical impressions with a precise, comfortable 3D capture."),
    ("3D Treatment Planning","Implant position, angle and depth are simulated before any surgery is performed."),
    ("CBCT Imaging","Cone-beam CT gives a full three-dimensional view of bone density and nerve position."),
    ("Digital Smile Design","Aesthetic outcomes are modeled and previewed before treatment begins."),
    ("CAD/CAM Milling","Crowns and veneers are designed and milled on site from a digital scan."),
    ("Surgical Microscopy","Root canal therapy is performed under magnification for maximum precision."),
    ("Modern Sterilization","Class B autoclave sterilization exceeds standard clinical hygiene protocols."),
    ("Precision Diagnostics","Every case begins with data, not assumption."),
]
tech_cards = "\n      ".join(f'''<div data-reveal style="border-top:1px solid var(--line-light); padding-top:24px;">
        <span style="font-size:12px; color:var(--grey-dark);">{i+1:02d}</span>
        <h3 style="font-size:1.3rem; font-weight:400; margin-top:14px; margin-bottom:10px;">{t}</h3>
        <p style="color:var(--grey-dark); font-size:13.5px; line-height:1.7;">{d}</p>
      </div>''' for i,(t,d) in enumerate(tech_list))

technology_body = f'''
{page_hero("Technology", ["PRECISION,", "MADE", "VISIBLE."],
  "Digital scanning, guided surgery and in-house CAD/CAM manufacturing — the infrastructure behind every treatment plan.", theme="dark")}

<section class="pin-zoom-wrap" data-zoom-pin data-nav-theme="dark">
  <div class="pin-zoom-img" style="width:60vw; height:54vh;"><img src="{IMG['digital']}" alt="Digital planning station"></div>
</section>

<section class="section bg-white">
  <div class="wrap" data-reveal-group style="display:grid; grid-template-columns:repeat(4,1fr); gap:34px;">
    {tech_cards}
  </div>
</section>

{cta_band()}
'''
write("technology.html", "Technology | Saraf Dental Care Akola",
      "The digital dentistry infrastructure behind Saraf Dental Care — CBCT, intraoral scanning, CAD/CAM and guided surgery.", technology_body)

# ---------------------------------------------------------------------------
# CLINIC.HTML
# ---------------------------------------------------------------------------
clinic_body = f'''
{page_hero("The Clinic", ["ARCHITECTURE", "BUILT FOR", "CALM."],
  "Four treatment suites, a dedicated ceramics lab, and a reception designed to feel more like a private study than a waiting room.")}

<section class="section" style="padding:0; position:relative; height:92vh; overflow:hidden;" data-nav-theme="dark">
  <div data-reveal-img style="position:absolute; inset:0;"><img src="{IMG['arch']}" alt="Clinic architecture"></div>
</section>

<section class="section bg-off">
  <div class="wrap" data-reveal-group style="display:grid; grid-template-columns:repeat(2,1fr); gap:24px;">
    <div><div data-reveal-img style="aspect-ratio:4/3;"><img src="{IMG['lounge']}" alt="Reception lounge"></div><p style="margin-top:14px; font-size:13px; color:var(--grey-dark);">Reception Lounge</p></div>
    <div><div data-reveal-img style="aspect-ratio:4/3;"><img src="{IMG['clinic1']}" alt="Treatment suite"></div><p style="margin-top:14px; font-size:13px; color:var(--grey-dark);">Treatment Suite &middot; Room 01</p></div>
    <div><div data-reveal-img style="aspect-ratio:4/3;"><img src="{IMG['lab']}" alt="Sterilization and ceramics lab"></div><p style="margin-top:14px; font-size:13px; color:var(--grey-dark);">Ceramics &amp; Sterilization Lab</p></div>
    <div><div data-reveal-img style="aspect-ratio:4/3;"><img src="{IMG['digital']}" alt="Digital planning room"></div><p style="margin-top:14px; font-size:13px; color:var(--grey-dark);">Digital Planning Room</p></div>
  </div>
</section>

<section class="section bg-black" data-nav-theme="dark">
  <div class="wrap" style="display:grid; grid-template-columns:repeat(3,1fr); gap:40px;">
    <div data-reveal><h3 style="color:var(--white); font-size:2.4rem; font-weight:200;">4</h3><p style="color:var(--grey); font-size:13px; margin-top:8px;">Surgical Chairs</p></div>
    <div data-reveal><h3 style="color:var(--white); font-size:2.4rem; font-weight:200;">11</h3><p style="color:var(--grey); font-size:13px; margin-top:8px;">Clinical Specialists</p></div>
    <div data-reveal><h3 style="color:var(--white); font-size:2.4rem; font-weight:200;">1</h3><p style="color:var(--grey); font-size:13px; margin-top:8px;">In-House Ceramics Lab</p></div>
  </div>
</section>

{cta_band()}
'''
write("clinic.html", "The Clinic | Saraf Dental Care Akola",
      "Take a tour of the Saraf Dental Care practice in Akola, Maharashtra — treatment suites, ceramics lab and reception.", clinic_body)

# ---------------------------------------------------------------------------
# GALLERY.HTML
# ---------------------------------------------------------------------------
gal_items = [
    (IMG['clinic1'],"Treatment Suite","span 2","span 2"),
    (IMG['lounge'],"Reception","span 1","span 1"),
    (IMG['lab'],"Sterilization Lab","span 1","span 1"),
    (IMG['arch'],"Architecture","span 1","span 1"),
    (IMG['digital'],"Digital Planning","span 1","span 1"),
    (IMG['doc_f1'],"Consultation","span 1","span 2"),
    (IMG['clinic2'],"Corridor","span 1","span 1"),
    (IMG['tools'],"Instrumentation","span 2","span 1"),
    (IMG['smile_f'],"Patient Outcome","span 1","span 1"),
]
gal_html = "\n      ".join(
    f'<div class="gal-item" data-tilt style="grid-column:{c}; grid-row:{r};"><img src="{src}" alt="{cap}" data-cursor-view="View"><div class="gal-cap">{cap}</div></div>'
    for src, cap, c, r in gal_items
)

gallery_body = f'''
{page_hero("Gallery", ["INSIDE THE", "PRACTICE."],
  "A closer look at the rooms, instruments and details that make up daily life at Saraf Dental Care.")}

<section class="section-tight bg-white">
  <div class="wrap" data-reveal-group style="display:grid; grid-template-columns:repeat(4,1fr); grid-auto-rows:220px; gap:14px;">
    {gal_html}
  </div>
</section>

{cta_band()}
'''
write("gallery.html", "Gallery | Saraf Dental Care Akola",
      "A photographic tour of Saraf Dental Care's Akola practice — treatment suites, laboratory, and reception.", gallery_body)

# ---------------------------------------------------------------------------
# CASE-STUDIES.HTML
# ---------------------------------------------------------------------------
cases = [
    ("Case 01","Full-Arch Restoration","Complete loss of upper dentition","6 implants + fixed bridge","5 months", IMG['smile_m']),
    ("Case 02","Porcelain Veneers","Uneven shade and minor spacing","10-unit veneer set", "3 weeks", IMG['smile_f']),
    ("Case 03","Single Implant","Missing lateral incisor","Guided single implant + crown","4 months", IMG['doc_f1']),
]
case_html = "\n      ".join(f'''<div data-reveal-group style="display:grid; grid-template-columns:1fr 1fr; gap:60px; align-items:center; padding:80px 0; border-top:1px solid var(--line-light);">
        <div data-reveal-img style="aspect-ratio:4/5;"><img src="{img}" alt="{title} result"></div>
        <div>
          <span style="font-size:12px; color:var(--grey-dark);">{num}</span>
          <h3 style="font-size:clamp(1.6rem,3vw,2.4rem); font-weight:300; margin-top:14px;">{title}</h3>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-top:26px; max-width:440px;">
            <div><span style="font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--grey-dark);">Initial condition</span><p style="font-size:13.5px; margin-top:6px;">{initial}</p></div>
            <div><span style="font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--grey-dark);">Approach</span><p style="font-size:13.5px; margin-top:6px;">{approach}</p></div>
            <div><span style="font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--grey-dark);">Duration</span><p style="font-size:13.5px; margin-top:6px;">{duration}</p></div>
          </div>
        </div>
      </div>''' for num,title,initial,approach,duration,img in cases)

case_studies_body = f'''
{page_hero("Case Studies", ["RESULTS,", "SHOWN IN", "DETAIL."],
  "A closer look at three representative cases &mdash; the condition we started with, the approach we took, and the outcome.")}

<section class="section-tight bg-white">
  <div class="wrap">{case_html}</div>
</section>

{cta_band()}
'''
write("case-studies.html", "Case Studies | Saraf Dental Care Akola",
      "Representative implantology and aesthetic dentistry case studies from Saraf Dental Care, Akola.", case_studies_body)

# ---------------------------------------------------------------------------
# REVIEWS.HTML
# ---------------------------------------------------------------------------
review_quotes = [
    ("Exceptional precision, care and attention from the first consultation.","Ananya R.","Dental Implants"),
    ("The calmest I have ever felt walking into a dental appointment.","Rohan K.","Root Canal Treatment"),
    ("My smile design turned out so natural, no one can tell which teeth were treated.","Meera P.","Smile Designing"),
    ("Booking, billing and the procedure itself all felt considered. Nothing felt rushed.","Aditya V.","Braces"),
    ("They explained every option before recommending anything &mdash; I never felt sold to.","Priya N.","Digital Smile Design"),
]
review_html = "\n      ".join(f'''<div data-reveal style="padding:60px 0; border-top:1px solid var(--line-light);">
        <p style="font-size:clamp(1.4rem,3vw,2.3rem); font-weight:300; line-height:1.4; max-width:820px;">&ldquo;{q}&rdquo;</p>
        <p style="margin-top:22px; font-size:12px; letter-spacing:.08em; text-transform:uppercase; color:var(--grey-dark);">{name} &mdash; {treatment}</p>
      </div>''' for q,name,treatment in review_quotes)

reviews_body = f'''
{page_hero("Reviews", ["WHAT OUR", "PATIENTS", "SAY."],
  "4.8 out of 5 across Google and Justdial, based on 140+ patient reviews. A selection of unedited patient reviews follows below.")}

<section class="section-tight bg-white"><div class="wrap">{review_html}</div></section>

<section class="section bg-off" style="text-align:center;">
  <div class="wrap" style="display:flex; justify-content:center; gap:60px; flex-wrap:wrap;">
    <div data-reveal><h3 style="font-size:2.2rem; font-weight:200;">4.8 / 5</h3><p style="font-size:12px; color:var(--grey-dark); margin-top:8px;">Google &amp; Justdial Rating</p></div>
    <div data-reveal><h3 style="font-size:2.2rem; font-weight:200;">140+</h3><p style="font-size:12px; color:var(--grey-dark); margin-top:8px;">Verified Reviews</p></div>
    <div data-reveal><h3 style="font-size:2.2rem; font-weight:200;">1,350+</h3><p style="font-size:12px; color:var(--grey-dark); margin-top:8px;">Patients Treated</p></div>
  </div>
</section>

{cta_band()}
'''
write("reviews.html", "Reviews | Saraf Dental Care Akola",
      "Patient reviews and satisfaction ratings for Saraf Dental Care, Akola.", reviews_body)

# ---------------------------------------------------------------------------
# FAQ.HTML
# ---------------------------------------------------------------------------
faq_full = [
    ("What treatments do you offer?", "Implantology (including All-on-4 and All-on-6), aesthetic dentistry, digital smile design, orthodontics, endodontics, periodontology and preventive care."),
    ("How does implant treatment work?", "Treatment begins with a CBCT scan and digital plan, followed by guided placement. After 8&ndash;16 weeks of healing, the final crown or bridge is fitted."),
    ("How long does treatment take?", "Single-tooth cases are usually complete in 8&ndash;16 weeks. Full-arch cases typically take 3&ndash;6 months from consultation to final restoration."),
    ("Do you offer digital smile design?", "Yes. Aesthetic cases are modeled digitally so you can preview the expected result before any irreversible treatment begins."),
    ("Do you treat international patients?", "Yes &mdash; we welcome patients from across Maharashtra and beyond, including NRIs visiting home. We coordinate compressed, multi-visit treatment plans where needed."),
    ("Is treatment painful?", "Procedures are performed under local anaesthesia, with sedation options for anxious patients. Most describe recovery discomfort as mild."),
    ("Do you offer payment plans?", "Larger treatment plans, such as full-arch restorations, can be split into monthly installments arranged at consultation."),
    ("How do I book a consultation?", "Use the appointment page to request a time, or contact the clinic directly by phone or email."),
]
faq_page_html = "\n      ".join(f'''<div class="acc-row{' open' if i==0 else ''}">
        <div class="acc-head"><h3><span class="acc-num">{i+1:02d}</span>{q}</h3><span class="acc-plus">+</span></div>
        <div class="acc-body"><p>{a}</p></div>
      </div>''' for i,(q,a) in enumerate(faq_full))

faq_body = f'''
{page_hero("FAQ", ["QUESTIONS,", "ANSWERED", "PLAINLY."],
  "Can't find what you're looking for? Reach out directly and we'll respond within one business day.")}

<section class="section-tight bg-white">
  <div class="wrap" style="max-width:900px;">{faq_page_html}</div>
</section>

{cta_band()}
'''
write("faq.html", "FAQ | Saraf Dental Care Akola",
      "Answers to common questions about treatments, insurance and recovery at Saraf Dental Care, Akola.", faq_body)

# ---------------------------------------------------------------------------
# CONTACT.HTML
# ---------------------------------------------------------------------------
contact_body = f'''
{page_hero("Contact", ["LET&rsquo;S TALK", "ABOUT YOUR", "SMILE."],
  "Send a message and our patient coordination team will respond within one business day.")}

<section class="section-tight bg-white">
  <div class="wrap" style="display:grid; grid-template-columns:1.2fr 1fr; gap:80px;">
    <form data-form data-reveal novalidate>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0 24px;">
        <div class="field"><label for="fname">First name</label><input id="fname" name="fname" type="text" required></div>
        <div class="field"><label for="lname">Last name</label><input id="lname" name="lname" type="text" required></div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0 24px;">
        <div class="field"><label for="c_email">Email</label><input id="c_email" name="email" type="email" required></div>
        <div class="field"><label for="c_phone">Phone</label><input id="c_phone" name="phone" type="tel"></div>
      </div>
      <div class="field"><label for="c_treatment">Treatment of interest</label>
        <select id="c_treatment" name="treatment"><option>Dental Implants</option><option>Smile Designing / Cosmetic</option><option>Root Canal Treatment</option><option>Braces / Orthodontics</option><option>Preventive Care</option><option>Not sure yet</option></select>
      </div>
      <div class="field"><label for="c_message">Message</label><textarea id="c_message" name="message" required></textarea></div>
      <button type="submit" class="btn btn-dark" style="width:100%; justify-content:center;">Request Consultation <span class="arrow">&rarr;</span></button>
      <p class="form-success">&check; Message received &mdash; this is a template form with no backend. Connect it to your CRM or email service to go live.</p>
    </form>
    <div data-reveal>
      <span class="label">Visit</span>
      <h3 style="font-size:1.4rem; font-weight:400; margin-top:16px;">Nishant Tower, M.G. Road</h3>
      <p style="color:var(--grey-dark); font-size:14px; margin-top:6px;">Akola &ndash; 444001, Maharashtra, India &middot; New Radhakisan Plots</p>
      <div style="margin-top:26px; display:flex; flex-direction:column; gap:10px;">
        <a href="mailto:care@sarafdentalcare.in" style="font-size:14px; text-decoration:underline;">care@sarafdentalcare.in</a>
        <span style="font-size:13px; color:var(--grey-dark);">+91 98230 00000</span>
      </div>
      <div style="margin-top:26px; display:flex; flex-direction:column; gap:8px; font-size:12px; color:var(--grey-dark);">
        <span>MON&ndash;SAT &middot; 10:00 AM&ndash;8:00 PM</span>
        <span>SUN &middot; 10:30 AM&ndash;1:30 PM</span>
      </div>
      <a href="location.html" class="btn btn-dark" style="margin-top:30px;">Get Directions <span class="arrow">&rarr;</span></a>
    </div>
  </div>
</section>
'''
write("contact.html", "Contact | Saraf Dental Care Akola",
      "Get in touch with Saraf Dental Care in Akola, Maharashtra — request a consultation or ask a question.", contact_body)

# ---------------------------------------------------------------------------
# APPOINTMENT.HTML
# ---------------------------------------------------------------------------
appointment_body = f'''
{page_hero("Book an Appointment", ["RESERVE YOUR", "CONSULTATION."],
  "Tell us a little about what you need and a preferred time — we'll confirm by email within one business day.")}

<section class="section-tight bg-white">
  <div class="wrap" style="max-width:760px;">
    <form data-form novalidate>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0 24px;">
        <div class="field"><label for="a_name">Full name</label><input id="a_name" name="name" type="text" required></div>
        <div class="field"><label for="a_email">Email</label><input id="a_email" name="email" type="email" required></div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0 24px;">
        <div class="field"><label for="a_phone">Phone</label><input id="a_phone" name="phone" type="tel" required></div>
        <div class="field"><label for="a_treatment">Treatment</label>
          <select id="a_treatment" name="treatment"><option>Dental Implants</option><option>Smile Designing / Cosmetic</option><option>Root Canal Treatment</option><option>Braces / Orthodontics</option><option>Preventive Care</option><option>Not sure yet</option></select></div>
      </div>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:0 24px;">
        <div class="field"><label for="a_date">Preferred date</label><input id="a_date" name="date" type="date" required></div>
        <div class="field"><label for="a_time">Preferred time</label><input id="a_time" name="time" type="time" required></div>
      </div>
      <div class="field"><label for="a_message">Message</label><textarea id="a_message" name="message" placeholder="Anything we should know beforehand?"></textarea></div>
      <button type="submit" class="btn btn-dark" style="width:100%; justify-content:center;">Confirm Request <span class="arrow">&rarr;</span></button>
      <p class="form-success">&check; Request received &mdash; this is a template form with no backend. Connect it to your booking system to go live.</p>
    </form>
  </div>
</section>
'''
write("appointment.html", "Book an Appointment | Saraf Dental Care Akola",
      "Request a consultation appointment at Saraf Dental Care, Akola.", appointment_body)

# ---------------------------------------------------------------------------
# LOCATION.HTML
# ---------------------------------------------------------------------------
location_body = f'''
{page_hero("Location", ["FIND US IN", "CHARLOTTENBURG."],
  "Located on M.G. Road in the heart of Akola, above Jayantilal Dwarkadas Grocery Store, New Radhakisan Plots.")}

<section class="section-tight bg-white">
  <div class="wrap" style="display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center;">
    <div data-reveal>
      <span class="label">Address</span>
      <h3 style="font-size:1.5rem; font-weight:400; margin-top:16px;">Saraf Dental Care</h3>
      <p style="color:var(--grey-dark); font-size:14px; margin-top:6px;">1st Floor, Nishant Tower, M.G. Road, Akola &ndash; 444001, Maharashtra, India</p>
      <div style="margin-top:24px; display:flex; flex-direction:column; gap:8px; font-size:12.5px; color:var(--grey-dark);">
        <span>MON&ndash;SAT &middot; 10:00 AM&ndash;8:00 PM</span>
        <span>SUN &middot; 10:30 AM&ndash;1:30 PM</span>
        <span>IN THE HEART OF THE CITY &middot; AMPLE PARKING NEARBY</span>
      </div>
      <div style="margin-top:24px; display:flex; flex-direction:column; gap:10px;">
        <a href="mailto:care@sarafdentalcare.in" style="font-size:14px; text-decoration:underline;">care@sarafdentalcare.in</a>
        <span style="font-size:13px; color:var(--grey-dark);">+91 98230 00000</span>
      </div>
      <a href="#" class="btn btn-dark" style="margin-top:30px;">View on Maps <span class="arrow">&rarr;</span></a>
    </div>
    <div data-reveal style="aspect-ratio:1/1; background:var(--black); position:relative; overflow:hidden;">
      <svg viewBox="0 0 400 400" style="width:100%; height:100%;">
        <defs><pattern id="g" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.08)"/></pattern></defs>
        <rect width="400" height="400" fill="url(#g)"/>
        <line x1="0" y1="150" x2="400" y2="150" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
        <line x1="230" y1="0" x2="230" y2="400" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"/>
        <text x="10" y="142" font-family="Plus Jakarta Sans" font-size="9" fill="#8A887F" letter-spacing="1">M.G. ROAD</text>
        <circle cx="230" cy="150" r="7" fill="#FFFFFF"/>
        <circle cx="230" cy="150" r="18" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.4"/>
        <text x="245" y="146" font-family="Plus Jakarta Sans" font-size="10" fill="#FFFFFF">SARAF DENTAL</text>
      </svg>
    </div>
  </div>
</section>

{cta_band()}
'''
write("location.html", "Location | Saraf Dental Care Akola",
      "Directions, hours and contact details for Saraf Dental Care in Akola, Maharashtra.", location_body)

# ---------------------------------------------------------------------------
# PHILOSOPHY.HTML
# ---------------------------------------------------------------------------
philosophy_body = f'''
{page_hero("Philosophy", ["MEDICINE", "WITH", "HUMANITY."], "Three principles guide every decision made at Saraf Dental Care, from the first consultation to years of follow-up care.", theme="dark")}

<section class="section bg-black" data-nav-theme="dark">
  <div class="wrap" data-reveal-group style="display:grid; grid-template-columns:repeat(3,1fr); gap:40px;">
    <div style="border-top:1px solid var(--line-dark); padding-top:24px;"><span style="font-size:12px; color:var(--grey);">01</span><h3 style="color:var(--white); font-size:1.6rem; font-weight:300; margin-top:14px;">Precision</h3><p style="color:var(--grey); font-size:13.5px; line-height:1.8; margin-top:14px;">Every plan is measured, modeled and reviewed before treatment begins &mdash; nothing is decided on sight.</p></div>
    <div style="border-top:1px solid var(--line-dark); padding-top:24px;"><span style="font-size:12px; color:var(--grey);">02</span><h3 style="color:var(--white); font-size:1.6rem; font-weight:300; margin-top:14px;">Transparency</h3><p style="color:var(--grey); font-size:13.5px; line-height:1.8; margin-top:14px;">Costs, timelines and alternatives are laid out clearly at consultation, with nothing assumed.</p></div>
    <div style="border-top:1px solid var(--line-dark); padding-top:24px;"><span style="font-size:12px; color:var(--grey);">03</span><h3 style="color:var(--white); font-size:1.6rem; font-weight:300; margin-top:14px;">Care</h3><p style="color:var(--grey); font-size:13.5px; line-height:1.8; margin-top:14px;">Comfort and follow-up matter as much as the clinical outcome itself.</p></div>
  </div>
</section>

<section class="section bg-off">
  <div class="wrap" style="display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center;">
    <div data-reveal-img style="aspect-ratio:4/5;"><img src="{IMG['clinic2']}" alt="Consultation in progress"></div>
    <div data-reveal><span class="label">In Practice</span><h2 style="font-size:clamp(1.9rem,4.4vw,3rem); font-weight:200; margin-top:20px;">Precision without theatre.</h2>
      <p style="color:var(--grey-dark); font-size:14.5px; line-height:1.85; margin-top:22px; max-width:460px;">We avoid unnecessary treatment as deliberately as we pursue thorough diagnosis &mdash; the goal is always the simplest plan that solves the actual problem.</p></div>
  </div>
</section>

{cta_band()}
'''
write("philosophy.html", "Philosophy | Saraf Dental Care Akola",
      "The three principles &mdash; precision, transparency and care &mdash; behind every decision at Saraf Dental Care.", philosophy_body)

# ---------------------------------------------------------------------------
# PATIENT-JOURNEY.HTML
# ---------------------------------------------------------------------------
journey_steps = [
    ("01","Arrival","Arrive at our M.G. Road practice; reception guides you through a short intake."),
    ("02","Consultation","A full clinical exam and honest conversation about your goals and options."),
    ("03","Diagnosis","CBCT imaging and intraoral scanning build a precise 3D model of your case."),
    ("04","Treatment Plan","Every option is modeled and priced clearly before you decide anything."),
    ("05","Procedure","Guided, minimally invasive treatment performed to the agreed plan."),
    ("06","Recovery","Clear aftercare guidance and direct access to your clinical team."),
    ("07","Long-Term Care","Structured recall visits monitor your result for years, not weeks."),
]
journey_html = "\n      ".join(f'''<div style="display:grid; grid-template-columns:70px 1fr; gap:30px; padding:40px 0;">
        <span style="font-size:13px; color:var(--grey-dark);">{n}</span>
        <div><h3 style="font-size:1.5rem; font-weight:400;">{t}</h3><p style="color:var(--grey-dark); font-size:14px; line-height:1.7; margin-top:10px; max-width:480px;">{d}</p></div>
      </div>''' for n,t,d in journey_steps)

patient_journey_body = f'''
{page_hero("Patient Journey", ["FROM FIRST", "VISIT TO LONG-", "TERM CARE."],
  "Seven stages, followed consistently on every case &mdash; from arrival through years of maintenance.")}

<section class="section-tight bg-white">
  <div class="wrap" data-progress-line style="position:relative; max-width:760px;">
    <div style="position:absolute; left:34px; top:0; bottom:0; width:1px; background:var(--line-light);"></div>
    <div class="pl-fill" style="position:absolute; left:34px; top:0; width:1px; height:100%; background:var(--black); transform:scaleY(0);"></div>
    <div data-reveal-group>{journey_html}</div>
  </div>
</section>

{cta_band()}
'''
write("patient-journey.html", "Patient Journey | Saraf Dental Care Akola",
      "What to expect at every stage of treatment at Saraf Dental Care, from arrival to long-term maintenance.", patient_journey_body)

# ---------------------------------------------------------------------------
# EMERGENCY.HTML
# ---------------------------------------------------------------------------
emergency_body = f'''
{page_hero("Dental Emergency", ["NEED URGENT", "CARE?"], "If you're experiencing severe pain, swelling, or a knocked-out tooth, call the number below directly.")}

<section class="section-tight bg-white">
  <div class="wrap" style="display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center;">
    <div data-reveal>
      <a href="tel:+919823000000" class="btn btn-dark" style="font-size:1.1rem; padding:26px 40px;">Call +91 98230 00000 <span class="arrow">&rarr;</span></a>
      <p style="margin-top:26px; color:var(--grey-dark); font-size:14px; line-height:1.8; max-width:440px;">Emergency slots are held open each weekday morning. If you cannot reach us and the injury is severe, please go to your nearest hospital emergency department.</p>
    </div>
    <div data-reveal>
      <span class="label">Common Emergencies</span>
      <div style="margin-top:20px; display:flex; flex-direction:column; gap:14px;">
        <p style="font-size:14px; color:var(--grey-dark);">&mdash; Severe or spreading tooth pain</p>
        <p style="font-size:14px; color:var(--grey-dark);">&mdash; A knocked-out or badly chipped tooth</p>
        <p style="font-size:14px; color:var(--grey-dark);">&mdash; Swelling of the face or gum</p>
        <p style="font-size:14px; color:var(--grey-dark);">&mdash; A lost crown, filling, or implant part</p>
      </div>
    </div>
  </div>
</section>
'''
write("emergency.html", "Dental Emergency | Saraf Dental Care Akola",
      "Urgent dental care contact information for Saraf Dental Care, Akola.", emergency_body)

# ---------------------------------------------------------------------------
# PRIVACY.HTML / IMPRINT.HTML (legal — readable, minimal animation)
# ---------------------------------------------------------------------------
def legal_page(page_id, title, heading, paragraphs):
    body_paras = "\n      ".join(f'<p style="font-size:14.5px; line-height:1.9; color:var(--grey-dark); max-width:720px; margin-bottom:22px;">{p}</p>' for p in paragraphs)
    body = f'''
{page_hero(title, [heading], "")}
<section class="section-tight bg-white"><div class="wrap">{body_paras}</div></section>
'''
    write(page_id, f"{title} | Saraf Dental Care Akola", f"{title} for Saraf Dental Care, Akola.", body)

legal_page("privacy.html", "Privacy Policy", "PRIVACY POLICY.", [
    "This template page outlines where a real clinic would disclose how patient data is collected, stored and used, in line with India's Digital Personal Data Protection Act (DPDPA) 2023 and applicable IT Act provisions.",
    "Replace this section with your clinic's identity, the categories of personal and health data processed, the purpose and legal basis for processing, and how long records are retained.",
    "Patients have the right to access, correct, or request deletion of their data, and to raise a grievance with the clinic's designated contact or the relevant data protection authority.",
    "For questions about this policy, contact care@sarafdentalcare.in.",
])
legal_page("imprint.html", "Business Information", "BUSINESS INFORMATION.", [
    "Saraf Dental Care &middot; 1st Floor, Nishant Tower, M.G. Road, New Radhakisan Plots, Akola &ndash; 444001, Maharashtra, India.",
    "Practice Director: Dr. Shakun Saraf, BDS, MDS.",
    "Contact: care@sarafdentalcare.in &middot; +91 98230 00000.",
    "This is a template disclosure page. A live deployment should include full clinical establishment registration details, the treating dentists' registration numbers with the Dental Council, and GST details where applicable.",
])

# ---------------------------------------------------------------------------
# SPECIALTY SERVICE PAGES (implants, aesthetic-dentistry, digital-dentistry, prevention)
# Shared builder: Hero / Intro / Why it matters / Process / Technology / Benefits / Case / FAQ / CTA
# ---------------------------------------------------------------------------
def specialty_page(page_id, title, hero_lines, sub, intro_label, intro_heading, intro_text,
                    why_text, process_steps, tech_text, benefits, case, faqs, hero_img):
    process_html = "\n      ".join(f'''<div style="border-top:1px solid var(--line-light); padding-top:22px;">
        <span style="font-size:12px; color:var(--grey-dark);">{i+1:02d}</span>
        <h3 style="font-size:1.2rem; font-weight:400; margin-top:12px;">{s}</h3>
      </div>''' for i,s in enumerate(process_steps))
    benefits_html = "\n      ".join(f'<div data-reveal style="padding:22px 0; border-top:1px solid var(--line-light);"><p style="font-size:14px;">{b}</p></div>' for b in benefits)
    faq_html = faq_block(faqs)
    body = f'''
{page_hero(intro_label, hero_lines, sub)}

<section class="section bg-white">
  <div class="wrap" style="display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center;">
    <div data-reveal><span class="label">Introduction</span><h2 style="font-size:clamp(1.9rem,4vw,3rem); font-weight:200; margin-top:20px;">{intro_heading}</h2>
      <p style="color:var(--grey-dark); font-size:14.5px; line-height:1.85; margin-top:22px; max-width:460px;">{intro_text}</p></div>
    <div data-reveal-img style="aspect-ratio:4/5;"><img src="{hero_img}" alt="{title}"></div>
  </div>
</section>

<section class="section bg-black" data-nav-theme="dark">
  <div class="wrap"><span class="label on-dark">Why It Matters</span>
    <h2 data-reveal-text style="font-size:clamp(1.8rem,4vw,3rem); font-weight:200; margin-top:20px; max-width:780px; color:var(--white);">{why_text}</h2>
  </div>
</section>

<section class="section bg-off">
  <div class="wrap"><span class="label" data-reveal>Process</span><h2 data-reveal-text style="font-size:clamp(1.8rem,4vw,3rem); font-weight:200; margin-top:20px; margin-bottom:50px;">How treatment unfolds</h2>
    <div data-reveal-group style="display:grid; grid-template-columns:repeat({min(len(process_steps),5)},1fr); gap:24px;">{process_html}</div>
  </div>
</section>

<section class="section bg-white">
  <div class="wrap" style="display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center;">
    <div data-reveal-img style="aspect-ratio:4/5; order:2;"><img src="{IMG['digital']}" alt="Technology used in treatment"></div>
    <div data-reveal style="order:1;"><span class="label">Technology</span><h2 style="font-size:clamp(1.8rem,4vw,2.8rem); font-weight:200; margin-top:20px;">{tech_text}</h2></div>
  </div>
</section>

<section class="section bg-off">
  <div class="wrap"><span class="label" data-reveal>Benefits</span><h2 data-reveal-text style="font-size:clamp(1.8rem,4vw,3rem); font-weight:200; margin-top:20px; margin-bottom:20px;">What patients gain</h2>
    <div style="max-width:700px;">{benefits_html}</div>
  </div>
</section>

<section class="section bg-white">
  <div class="wrap" style="display:grid; grid-template-columns:1fr 1fr; gap:70px; align-items:center;">
    <div data-reveal-img style="aspect-ratio:4/5;"><img src="{case[2]}" alt="{case[0]}"></div>
    <div data-reveal><span class="label">Case Study</span><h3 style="font-size:1.5rem; font-weight:400; margin-top:16px;">{case[0]}</h3>
      <p style="color:var(--grey-dark); font-size:14px; line-height:1.8; margin-top:14px; max-width:440px;">{case[1]}</p>
      <a href="case-studies.html" class="btn btn-dark" style="margin-top:24px;">More Case Studies <span class="arrow">&rarr;</span></a>
    </div>
  </div>
</section>

<section class="section bg-off">
  <div class="wrap" style="max-width:820px;"><span class="label" data-reveal>FAQ</span><h2 data-reveal-text style="font-size:clamp(1.8rem,4vw,2.8rem); font-weight:200; margin-top:20px; margin-bottom:20px;">Questions about {title.lower()}</h2>
    {faq_html}
  </div>
</section>

{cta_band()}
'''
    write(page_id, f"{title} | Saraf Dental Care Akola", sub, body)

specialty_page(
    "implants.html", "Implantology", ["RESTORE", "WHAT", "MATTERS."],
    "Premium-grade titanium implants, planned to the tenth of a millimeter and placed through guided digital surgery.",
    "Implantology", "A permanent, natural-feeling replacement for missing teeth.",
    "Dental implants replace the tooth root with a titanium post, topped with a custom crown or bridge. Unlike removable options, implants integrate with the jawbone, preserving its structure over time.",
    "Untreated tooth loss leads to bone resorption, bite instability and shifting teeth. Implants are the only restoration that addresses the root cause, not just the visible gap.",
    ["Consultation &amp; scan","Digital implant plan","Guided placement","Healing period","Final restoration"],
    "CBCT imaging and guided-surgery templates let us place each implant exactly where the digital plan indicates &mdash; before any incision is made.",
    ["A fixed, permanent solution &mdash; not removable like dentures.","Preserves jawbone density that would otherwise be lost.","Functions and feels like a natural tooth.","Backed by a 5-year clinical warranty."],
    ("Full-Arch Restoration","A patient with complete upper tooth loss received six implants and a fixed bridge, restored to full function within five months.", IMG['smile_m']),
    [("How long do implants last?","With proper care, implants commonly last 15&ndash;25 years or longer; the crown may need replacement sooner than the implant itself."),
     ("Is bone grafting always required?","No &mdash; only when CBCT imaging shows insufficient bone density at the planned implant site."),
     ("What does recovery feel like?","Most patients report mild discomfort for 2&ndash;3 days, manageable with standard pain relief.")],
    IMG['lab']
)

specialty_page(
    "aesthetic-dentistry.html", "Aesthetic Dentistry", ["A SMILE,", "DESIGNED", "DELIBERATELY."],
    "Veneers, whitening and bonding &mdash; hand-finished and shade-matched for a result that looks entirely natural.",
    "Aesthetic Dentistry", "Cosmetic improvements planned with the same rigor as clinical treatment.",
    "From subtle whitening to a full veneer set, every aesthetic case begins with digital smile design so you can see the intended result before committing to treatment.",
    "A smile affects confidence in ways that go beyond appearance alone. Done conservatively and well, aesthetic dentistry can be both minimally invasive and long-lasting.",
    ["Digital smile design","Shade &amp; material selection","Preparation (if needed)","Fabrication","Fitting &amp; review"],
    "Digital smile design software overlays a proposed result onto your own photographs, so expectations are set clearly before any tooth is touched.",
    ["Shade-matched results that blend with natural teeth.","Minimally invasive options like bonding and whitening.","Durable porcelain that resists staining over time.","A digital preview before you commit."],
    ("Porcelain Veneers","A ten-unit veneer case corrected uneven shade and minor spacing in three weeks, from consultation to final fit.", IMG['smile_f']),
    [("Are veneers reversible?","Traditional veneers require minor enamel removal and are not reversible; no-prep options exist for select cases."),
     ("How long does whitening take?","In-clinic whitening is typically completed in a single 60&ndash;90 minute session."),
     ("Will results look natural?","Shade and translucency are matched by hand against your surrounding teeth, not selected from a fixed catalogue.")],
    IMG['smile_f']
)

specialty_page(
    "digital-dentistry.html", "Digital Dentistry", ["SEEING THE", "FULL PICTURE", "FIRST."],
    "CBCT imaging, intraoral scanning and CAD/CAM manufacturing &mdash; the infrastructure behind every treatment plan.",
    "Digital Dentistry", "Every case begins with data, not assumption.",
    "Digital scanning replaces physical impressions with a precise 3D capture, and CBCT imaging reveals bone density and nerve position invisible to the eye. Together, they let us plan before we treat.",
    "Guesswork in dentistry compounds into avoidable complications. Digital planning catches problems &mdash; and previews outcomes &mdash; before treatment ever begins.",
    ["Intraoral scan","CBCT capture","3D case modeling","Plan review with patient","CAD/CAM fabrication"],
    "In-house CAD/CAM milling means crowns and veneers designed from your scan can often be fabricated on site, reducing turnaround time.",
    ["Faster, more comfortable diagnostics than physical impressions.","Outcomes modeled and previewed before treatment.","Reduced margin for surgical error.","Shorter overall treatment timelines."],
    ("Digital Smile Design Case","A veneer case was fully modeled and approved by the patient before a single tooth was prepared.", IMG['digital']),
    [("Is CBCT imaging safe?","Yes &mdash; radiation exposure is low and imaging is only used where clinically justified."),
     ("Do I need a physical impression too?","Rarely; digital scanning has replaced physical impressions for the large majority of cases."),
     ("Can I see my result before treatment?","Yes, for aesthetic cases we provide a digital preview during the planning stage.")],
    IMG['digital']
)

specialty_page(
    "prevention.html", "Preventive Dentistry", ["THE BEST", "TREATMENT IS", "THE ONE AVOIDED."],
    "Structured hygiene and screening designed to catch problems early &mdash; before they become procedures.",
    "Preventive Dentistry", "Consistent, unglamorous care that prevents the need for bigger interventions.",
    "Biannual hygiene visits, periodontal screening and early cavity detection form the foundation of long-term oral health &mdash; and the foundation of every other treatment we provide.",
    "Most restorative dentistry exists because something preventable went undetected. Structured screening catches issues while they're still simple to treat.",
    ["Clinical exam","Professional cleaning","Periodontal screening","Early cavity detection","Personalized care plan"],
    "Intraoral cameras and digital X-rays let us detect early-stage issues that are invisible to the naked eye, often years before symptoms appear.",
    ["Fewer, less invasive procedures over your lifetime.","Lower long-term treatment costs.","Early detection of periodontal disease.","A clear, personalized maintenance schedule."],
    ("Early Detection Case","Routine screening caught an early cavity that was treated conservatively, avoiding a root canal months later.", IMG['clinic2']),
    [("How often should I have a check-up?","Twice yearly for most patients; more frequently if you have a history of gum disease."),
     ("Does cleaning hurt?","Professional cleaning is generally comfortable; mild sensitivity afterward is common and temporary."),
     ("Do you treat children?","Yes, our preventive program includes age-appropriate care for younger patients.")],
    IMG['clinic2']
)

# treatments.html — a general index that mirrors services.html, kept for the requested file structure
write("treatments.html", "Treatments Overview | Saraf Dental Care Akola",
      "An overview of every treatment category offered at Saraf Dental Care, Akola.",
      f'''
{page_hero("Treatments", ["EVERY PATH", "TO A BETTER", "SMILE."], "An overview of our four core treatment categories &mdash; open the services directory for the full procedure list.")}
<section class="section-tight bg-white"><div class="wrap" data-reveal-group style="display:grid; grid-template-columns:repeat(2,1fr); gap:20px;">
  <a href="implants.html" class="svc-panel" style="grid-template-columns:1fr; border:1px solid var(--line-light); padding:40px;" data-cursor-view="View"><span class="svc-num">01</span><h3 style="font-size:1.6rem; margin-top:16px;">Implantology &rarr;</h3><p class="svc-desc" style="margin-top:12px;">Full-arch and single-tooth implants, planned digitally.</p></a>
  <a href="aesthetic-dentistry.html" class="svc-panel" style="grid-template-columns:1fr; border:1px solid var(--line-light); padding:40px;" data-cursor-view="View"><span class="svc-num">02</span><h3 style="font-size:1.6rem; margin-top:16px;">Aesthetic Dentistry &rarr;</h3><p class="svc-desc" style="margin-top:12px;">Veneers, whitening and bonding for a natural result.</p></a>
  <a href="digital-dentistry.html" class="svc-panel" style="grid-template-columns:1fr; border:1px solid var(--line-light); padding:40px;" data-cursor-view="View"><span class="svc-num">03</span><h3 style="font-size:1.6rem; margin-top:16px;">Digital Dentistry &rarr;</h3><p class="svc-desc" style="margin-top:12px;">CBCT, scanning and CAD/CAM manufacturing.</p></a>
  <a href="prevention.html" class="svc-panel" style="grid-template-columns:1fr; border:1px solid var(--line-light); padding:40px;" data-cursor-view="View"><span class="svc-num">04</span><h3 style="font-size:1.6rem; margin-top:16px;">Prevention &rarr;</h3><p class="svc-desc" style="margin-top:12px;">Structured hygiene and early screening.</p></a>
</div></section>
{cta_band()}
''')

print("ALL PAGES BUILT")

# ---------------------------------------------------------------------------
# BLOG.HTML — listing page + BLOG-POST.HTML — article template
# ---------------------------------------------------------------------------
BLOG_POSTS = [
    ("01", "Signs You May Need a Dental Implant", "Implantology",
     "Persistent gaps, shifting teeth, or a loose denture are common reasons patients start exploring implants. Here's how to tell if you're a candidate.",
     "6 min read", IMG['clinic1']),
    ("02", "Smile Designing: What Actually Happens at Your First Visit", "Cosmetic",
     "From digital previews to shade matching, a walkthrough of what a smile-design consultation really involves before any treatment begins.",
     "5 min read", IMG['smile_f']),
    ("03", "Root Canal Myths, Debunked", "Root Canal",
     "Modern root canal therapy is nothing like its reputation. We separate what's outdated advice from what's actually true today.",
     "4 min read", IMG['clinic2']),
    ("04", "Caring for Your Child's First Teeth", "Pediatric",
     "Simple, practical habits that make a real difference in a child's long-term oral health, starting from the very first tooth.",
     "5 min read", IMG['doc_f1']),
    ("05", "Laser Gum Surgery: Faster Healing, Less Discomfort", "Periodontics",
     "How laser-assisted procedures compare to traditional gum surgery, and who tends to benefit most from the newer approach.",
     "6 min read", IMG['lab']),
    ("06", "Braces vs. Clear Aligners: An Honest Comparison", "Orthodontics",
     "Cost, comfort, and treatment time — a straightforward look at how these two paths to a straighter smile actually compare.",
     "7 min read", IMG['digital']),
]

def blog_card(num, title, tag, excerpt, read_time, img):
    return f'''<a href="blog-post.html" class="svc-panel" style="grid-template-columns:1fr; border:1px solid var(--line-light); padding:0; overflow:hidden; display:block;" data-cursor-view="Read">
      <div style="aspect-ratio:16/10; overflow:hidden;"><img src="{img}" alt="{title}" style="width:100%; height:100%; object-fit:cover; transition:transform .6s var(--ease);"></div>
      <div style="padding:28px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <span class="mono" style="font-size:10.5px; letter-spacing:.1em; text-transform:uppercase; color:var(--grey-dark);">{tag}</span>
          <span class="mono" style="font-size:10.5px; color:var(--grey-dark);">{read_time}</span>
        </div>
        <h3 style="font-size:1.3rem; font-weight:400; line-height:1.25;">{title}</h3>
        <p style="font-size:13.5px; color:var(--grey-dark); margin-top:12px; line-height:1.7;">{excerpt}</p>
      </div>
    </a>'''

blog_cards_html = "\n      ".join(blog_card(*p) for p in BLOG_POSTS)

blog_body = f'''
{page_hero("Journal", ["NOTES ON", "MODERN", "DENTISTRY."],
  "Short, practical reads from the Saraf Dental Care team &mdash; on treatments, technology, and everyday care.")}

<section class="section-tight bg-white">
  <div class="wrap" data-reveal-group style="display:grid; grid-template-columns:repeat(3,1fr); gap:26px;">
    {blog_cards_html}
  </div>
</section>

{cta_band()}
'''
write("blog.html", "Journal | Saraf Dental Care Akola",
      "Practical articles on implants, cosmetic dentistry, root canal therapy and more from Saraf Dental Care, Akola.", blog_body)

# ---------------------------------------------------------------------------
# BLOG-POST.HTML — single-article template (Post 01 as the live example)
# ---------------------------------------------------------------------------
blog_post_body = f'''
{page_hero("Implantology &middot; 6 min read", ["SIGNS YOU MAY", "NEED A DENTAL", "IMPLANT."],
  "How to tell whether an implant is worth exploring &mdash; and what the alternatives actually cost you over time.")}

<section class="section-tight bg-white">
  <div class="wrap" style="max-width:760px;">
    <div data-reveal-img style="aspect-ratio:16/9; margin-bottom:50px;"><img src="{IMG['clinic1']}" alt="Dental implant consultation"></div>

    <div data-reveal-group style="display:flex; flex-direction:column; gap:26px; font-size:15.5px; line-height:1.9; color:var(--grey-dark);">
      <p>Missing teeth rarely stay a purely cosmetic issue. Left alone, a gap changes how neighbouring teeth sit, how the bite lines up, and over time, how much bone remains to support a future implant at all. Most patients who eventually choose an implant say they wish they'd looked into it sooner.</p>
      <h3 style="font-size:1.4rem; font-weight:500; color:var(--black); margin-top:10px;">The clearest signs</h3>
      <p>A gap that's been open for more than a few months, a loose or uncomfortable denture, or a tooth that's cracked below the gumline are the three most common reasons patients start the conversation. Sensitivity when chewing on one side is another quiet signal worth mentioning at your next check-up.</p>
      <h3 style="font-size:1.4rem; font-weight:500; color:var(--black); margin-top:10px;">What the first visit actually involves</h3>
      <p>A consultation starts with a clinical exam and, where needed, a CBCT scan to check bone density at the site. From there we can tell you within the same visit whether you're a straightforward candidate, or whether a bone graft would be needed first &mdash; nothing here is decided over the phone.</p>
      <h3 style="font-size:1.4rem; font-weight:500; color:var(--black); margin-top:10px;">Cost, honestly</h3>
      <p>An implant typically costs more upfront than a bridge or denture, but it's also the only option that doesn't rely on neighbouring teeth for support, and it protects the jawbone from the resorption that follows tooth loss. Most patients find the long-term cost comparison closer than they expected.</p>
    </div>

    <div style="margin-top:50px; padding-top:30px; border-top:1px solid var(--line-light); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
      <a href="blog.html" class="btn btn-outline" style="border:1px solid var(--line-light);">&larr; Back to Journal</a>
      <a href="implants.html" class="btn btn-dark">Explore Implantology <span class="arrow">&rarr;</span></a>
    </div>
  </div>
</section>

{cta_band()}
'''
write("blog-post.html", "Signs You May Need a Dental Implant | Saraf Dental Care Journal",
      "How to tell whether a dental implant is worth exploring, and what to expect at your first consultation.", blog_post_body)

print("BLOG PAGES BUILT")
