#!/usr/bin/env python3
"""
Lanka Seagull (Pvt) Ltd — static site generator (OPTIONAL).

You do NOT need this to host the website: the finished files are already in public_html/.
Run it only if you edit source/products.json (prices, names, availability, new products),
source/site-config.json (production web address) or the COMPANY block below:

    python3 source/build.py

It rewrites the seven HTML pages and data.js (and sitemap.xml / robots.txt once a web address is set).
It never touches style.css, app.js, images, fonts or videos.
Requires Python 3.8+ (Pillow is optional and only used to read image sizes).

Options (for testing / previews):  --out DIR   --products FILE   --site-url URL
"""
import json, os, html, hashlib, sys, argparse

HERE = os.path.dirname(os.path.abspath(__file__))
_ap = argparse.ArgumentParser(description="Generate the Lanka Seagull static pages.")
_ap.add_argument("--out", default=HERE, help="site folder (default: this folder)")
_ap.add_argument("--products", default=os.path.join(HERE, "products.json"))
_ap.add_argument("--site-url", default=None, help="override source/site-config.json siteUrl")
ARGS = _ap.parse_args() if __name__ == "__main__" else _ap.parse_args([])
OUT = os.path.abspath(ARGS.out)
_cfg = json.load(open(os.path.join(HERE, "site-config.json"), encoding="utf-8"))
SITE_URL = (ARGS.site_url if ARGS.site_url is not None else _cfg.get("siteUrl", "")).strip()
if SITE_URL and not SITE_URL.endswith("/"):
    SITE_URL += "/"
from urllib.parse import urlparse
SITE_PATH = urlparse(SITE_URL).path if SITE_URL else "/"   # e.g. "/" or "/my-repo/"
esc = lambda s: html.escape(str(s), quote=True)
nb = lambda s: esc(s).replace(" ", "&nbsp;")

# --------------------------------------------------------------------------------------
# Verified business details (carried over unchanged from the original app.js)
# --------------------------------------------------------------------------------------
COMPANY = {
    "name": "Lanka Seagull (Pvt) Ltd",
    "shortName": "Lanka Seagull",
    "addressLines": ["69/1 Mullikandal,", "Adampan,", "Sri Lanka"],
    "phoneDisplay": "076 117 7764",
    "phoneTel": "+94761177764",            # voice calls
    "whatsappE164": "94778348603",         # WhatsApp chat / enquiries (a different number from the phone line)
    "whatsappDisplay": "+94 77 834 8603",
    "email": "lankaseagull@gmail.com",
    "facebookUrl": "https://www.facebook.com/share/175gsiL2DA/?mibextid=wwXIfr",
    "instagramUrl": "https://www.instagram.com/lankaseagull_company",
    "mapsUrl": "https://www.google.com/maps/place/Lanka+Seagull+(pvt)+Ltd/@8.9624804,80.0043468,18.25z/data=!4m6!3m5!1s0x3afdd1c5d93fd317:0x4fd65fc7a8fc1005!8m2!3d8.9630959!4d80.0046974",
    "mapsLat": 8.9630959, "mapsLng": 80.0046974,
}
CATEGORIES = [
    {"slug": "sea-cucumber", "name": "Sea Cucumber", "blurb": "Dried sea cucumber in a range of varieties."},
    {"slug": "sea-shells", "name": "Sea Shells", "blurb": "Natural sea shells, sold by the piece."},
    {"slug": "other-seafood", "name": "Other Seafood Products", "blurb": "Dried sea snail and sea snail operculum."},
]
CURRENCIES = [
    # rate = amount of foreign currency per 1 LKR. These are the INDICATIVE fallback rates that were in the
    # original site; the page tries to fetch live rates and labels which one it is showing.
    {"code": "LKR", "symbol": "Rs", "label": "LKR (Rs)", "rate": 1},
    {"code": "USD", "symbol": "US$", "label": "USD (US$)", "rate": round(1 / 305, 8)},
    {"code": "EUR", "symbol": "€", "label": "EUR (€)", "rate": round(1 / 335, 8)},
    {"code": "GBP", "symbol": "£", "label": "GBP (£)", "rate": round(1 / 385, 8)},
    {"code": "AED", "symbol": "AED", "label": "AED", "rate": round(1 / 83, 8)},
    {"code": "INR", "symbol": "₹", "label": "INR (₹)", "rate": round(1 / 3.65, 8)},
]
UNITS = {"kg": {"label": "KG", "min": 0.5, "step": 0.5}, "pcs": {"label": "PCS", "min": 1, "step": 1}}

products = json.load(open(ARGS.products, encoding="utf-8"))
cat_name = {c["slug"]: c["name"] for c in CATEGORIES}

try:
    from PIL import Image
except Exception:
    Image = None

def thumb_of(img):
    return os.path.splitext(os.path.basename(img))[0] + ".webp"

def thumb_size(img):
    p = os.path.join(OUT, thumb_of(img))
    if Image and os.path.exists(p):
        with Image.open(p) as im:
            return im.size
    return (640, 640)

def lkr(n):
    n = round(float(n), 2)
    s = f"{n:,.2f}".rstrip("0").rstrip(".")
    return "Rs " + s

# --------------------------------------------------------------------------------------
# Icons
# --------------------------------------------------------------------------------------
ICON = {
 "phone": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.3 11 11 0 0 0 3.5.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .6 3.5 1 1 0 0 1-.3 1Z"/></svg>',
 "mail": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>',
 "pin": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/></svg>',
 "wa": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1s-.6.8-.7.9-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.4.2-.3a.5.5 0 0 0 0-.5c-.1-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2 4.7 4.7 0 0 0 1 2.5 10.7 10.7 0 0 0 4.1 3.6c.6.2 1 .4 1.4.5a3.3 3.3 0 0 0 1.5.1 2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c-.1-.1-.2-.2-.4-.3Z"/></svg>',
 "fb": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.2A21 21 0 0 0 14.2 4c-2.4 0-4 1.5-4 4.1v2.3H7.5v3h2.7V21Z"/></svg>',
 "ig": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg>',
 "search": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
 "cart": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6h15l-1.5 9h-12L5 3H2"/><circle cx="9" cy="20" r="1.4" fill="currentColor"/><circle cx="18" cy="20" r="1.4" fill="currentColor"/></svg>',
 "globe": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a13 13 0 0 1 0 18M12 3a13 13 0 0 0 0 18"/></svg>',
 "pause": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
 "play": '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5Z"/></svg>',
}

def waves(extra=""):
    p = "M0,50 C120,8 240,8 360,50 S600,92 720,50 S960,8 1080,50 S1320,92 1440,50 V100 H0 Z"
    def layer(cls, fill, op):
        return (f'<svg class="{cls}" viewBox="0 0 1440 100" preserveAspectRatio="none" focusable="false">'
                f'<path d="{p}" fill="{fill}" fill-opacity="{op}"/></svg>')
    return ('<div class="waves" aria-hidden="true">' + layer("w1", "#19b5b0", ".55") +
            layer("w2", "#ffffff", ".35") + layer("w3", "#f5f0e6", "1") + '</div>')

# --------------------------------------------------------------------------------------
# Shared layout
# --------------------------------------------------------------------------------------
NAV = [("index.html", "Home", "home"), ("products.html", "Products", "products"),
       ("about.html", "About Us", "about"), ("gallery.html", "Gallery", "gallery"),
       ("contact.html", "Contact", "contact")]

def nav_items(active):
    out = []
    for href, label, key in NAV:
        cur = ' aria-current="page"' if key == active else ""
        out.append(f'<li><a href="{href}"{cur}>{label}</a></li>')
    return "".join(out)

def header(active):
    return f'''<a class="skip-link" href="#main">Skip to main content</a>
<header class="site-header" id="top">
  <div class="container header-inner">
    <a class="brand" href="index.html" aria-label="{esc(COMPANY["name"])} — home">
      <img src="logo-mark.png" alt="" width="50" height="42">
      <span class="brand-text"><span class="brand-name">Lanka Seagull</span><span class="brand-sub">(Pvt) Ltd</span></span>
    </a>
    <nav class="main-nav" aria-label="Main"><ul>{nav_items(active)}</ul></nav>
    <div class="header-actions">
      <button type="button" class="icon-btn" id="prefOpen" aria-haspopup="dialog" aria-label="Display currency: LKR. Change currency">{ICON["globe"]}<span id="prefLabel">LKR</span></button>
      <a class="icon-btn" href="cart.html" id="cartLink" aria-label="Order cart, 0 items">{ICON["cart"]}<span class="cart-count" id="cartCount" data-count="0" aria-hidden="true">0</span></a>
      <button type="button" class="icon-btn nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mobilePanel" aria-label="Open menu"><span class="bars" aria-hidden="true"><i></i><i></i><i></i></span></button>
    </div>
  </div>
  <div class="mobile-panel" id="mobilePanel">
    <nav aria-label="Mobile"><ul>{nav_items(active)}</ul></nav>
    <a class="btn btn-wa btn-block" href="https://wa.me/{COMPANY["whatsappE164"]}" target="_blank" rel="noopener noreferrer">{ICON["wa"]}WhatsApp us</a>
  </div>
</header>'''

def footer():
    c = COMPANY
    addr = "<br>".join(esc(l) for l in c["addressLines"])
    return f'''<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand"><img src="logo-mark.png" alt="" width="48" height="40"><span class="brand-name">{esc(c["name"])}</span></div>
        <p>Dried sea cucumber, sea shells, sea snail and operculum from Adampan, Sri Lanka. Wholesale and export enquiries welcome.</p>
        <div class="socials">
          <a href="https://wa.me/{c["whatsappE164"]}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp (opens in a new tab)">{ICON["wa"]}</a>
          <a href="{esc(c["facebookUrl"])}" target="_blank" rel="noopener noreferrer" aria-label="Facebook (opens in a new tab)">{ICON["fb"]}</a>
          <a href="{esc(c["instagramUrl"])}" target="_blank" rel="noopener noreferrer" aria-label="Instagram (opens in a new tab)">{ICON["ig"]}</a>
          <a href="{esc(c["mapsUrl"])}" target="_blank" rel="noopener noreferrer" aria-label="Google Maps location (opens in a new tab)">{ICON["pin"]}</a>
        </div>
      </div>
      <div>
        <h2>Explore</h2>
        <ul>{"".join(f'<li><a href="{h}">{l}</a></li>' for h, l, k in NAV)}<li><a href="cart.html">Order cart</a></li></ul>
      </div>
      <div>
        <h2>Contact</h2>
        <ul class="footer-contact">
          <li>{ICON["pin"]}<span>{addr}</span></li>
          <li>{ICON["phone"]}<span>Call: <a href="tel:{c["phoneTel"]}">{nb(c["phoneDisplay"])}</a></span></li>
          <li>{ICON["wa"]}<span>WhatsApp: <a href="https://wa.me/{c["whatsappE164"]}" target="_blank" rel="noopener noreferrer">{nb(c["whatsappDisplay"])}</a></span></li>
          <li>{ICON["mail"]}<span><a href="mailto:{c["email"]}">{esc(c["email"])}</a></span></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© 2026 {esc(c["name"])}. All rights reserved.</span>
      <span>Website by <a href="https://www-anversahim-com.vercel.app/" target="_blank" rel="noopener noreferrer">Anver Sahim</a></span>
    </div>
  </div>
</footer>
<aside aria-label="Quick chat"><a class="wa-float" href="https://wa.me/{c["whatsappE164"]}" target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp (opens in a new tab)">{ICON["wa"]}<span>WhatsApp</span></a></aside>
<div class="toasts" id="toasts" role="status" aria-live="polite"></div>
<div class="overlay" id="prefOverlay">
  <div class="dialog" role="dialog" aria-modal="true" aria-labelledby="prefTitle" tabindex="-1">
    <button type="button" class="dialog-close" data-close aria-label="Close">×</button>
    <h2 id="prefTitle">Display currency</h2>
    <p class="hint" style="margin-top:.5rem">Our listed prices are in Sri Lankan rupees (LKR). Other currencies are shown as estimates only and are never a price quote.</p>
    <fieldset class="pref-group"><legend>Show estimated prices in</legend>
      <div class="pref-options" id="prefOptions"></div>
    </fieldset>
    <p class="pref-status" id="prefStatus" aria-live="polite"></p>
    <div class="dialog-actions">
      <button type="button" class="btn btn-outline btn-sm" data-close>Cancel</button>
      <button type="button" class="btn btn-navy btn-sm" id="prefSave">Save</button>
    </div>
  </div>
</div>'''

def seo_head(fname, title, desc):
    if not SITE_URL:
        return "<!-- Set \"siteUrl\" in source/site-config.json and rebuild to add canonical, og:url, og:image and sitemap.xml. -->"
    url = SITE_URL + ("" if fname == "index.html" else fname)
    img = SITE_URL + "og-image.jpg"
    return (f'<link rel="canonical" href="{esc(url)}">\n<meta property="og:url" content="{esc(url)}">\n'
            f'<meta property="og:image" content="{esc(img)}">\n<meta property="og:image:width" content="1200">\n<meta property="og:image:height" content="630">\n'
            f'<meta property="og:image:alt" content="{esc(COMPANY["name"])}">\n<meta name="twitter:card" content="summary_large_image">')

def page(fname, title, desc, active, body, h1_in_body=True, extra_overlays="", scripts=""):
    return f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="theme-color" content="#0a2540">
<meta property="og:type" content="website">
<meta property="og:site_name" content="{esc(COMPANY["name"])}">
<meta property="og:title" content="{esc(title)}">
<meta property="og:description" content="{esc(desc)}">
<meta property="og:locale" content="en_US">
{seo_head(fname, title, desc)}
<link rel="icon" type="image/png" sizes="64x64" href="favicon-64.png">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
<link rel="preload" href="figtree-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fraunces-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="style.css">
<script>document.documentElement.className+=" js"</script>
</head>
<body data-page="{active}">
{header(active)}
<main id="main">
{body}
</main>
{footer()}
{extra_overlays}
<script src="data.js"></script>
<script src="app.js"></script>
{scripts}
</body>
</html>
'''

def page_head(h1, lead):
    return f'''<section class="page-head">
  <div class="container hero-load"><h1>{esc(h1)}</h1><p>{esc(lead)}</p></div>
  {waves()}
</section>'''

def cta_band(title, text):
    c = COMPANY
    return f'''<section class="section cta-band">
  <div class="container" data-reveal>
    <h2>{esc(title)}</h2>
    <p>{esc(text)}</p>
    <div class="hero-cta">
      <a class="btn btn-wa" href="https://wa.me/{c["whatsappE164"]}" target="_blank" rel="noopener noreferrer">{ICON["wa"]}WhatsApp us</a>
      <a class="btn btn-light" href="mailto:{c["email"]}">{ICON["mail"]}Email us</a>
      <a class="btn btn-light" href="contact.html">Contact page</a>
    </div>
  </div>
</section>'''

# --------------------------------------------------------------------------------------
# Product card (static HTML so the catalogue is visible without JavaScript)
# --------------------------------------------------------------------------------------
def product_card(p, idx, detail_modal=True, delay=0):
    u = UNITS[p["unit"]]
    w, h = thumb_size(p["image"])
    name = esc(p["name"])
    price_attr = "" if p["price"] is None else f' data-price="{p["price"]}"'
    if p["price"] is None:
        price_html = '<p class="price on-request">Price on request</p>'
    else:
        price_html = f'<p class="price" data-price-lkr="{p["price"]}">{lkr(p["price"])} <small>/ {u["label"]}</small></p>'
    badge = '<span class="badge">Available</span>' if p["available"] else '<span class="badge off">Currently unavailable</span>'
    if detail_modal:
        title = f'<button type="button" data-open="{esc(p["id"])}">{name}</button>'
        media = (f'<button type="button" class="media-open" data-open="{esc(p["id"])}" aria-label="View details for {name}">'
                 f'<img src="{thumb_of(p["image"])}" alt="{name} — {esc(cat_name[p["category"]])} product photo" width="{w}" height="{h}" loading="lazy" decoding="async"></button>')
        links = f'<div class="card-links"><button type="button" data-open="{esc(p["id"])}">View details</button></div>'
    else:
        title = f'<a href="products.html#{esc(p["slug"])}">{name}</a>'
        media = (f'<a class="media-open" href="products.html#{esc(p["slug"])}" aria-label="View details for {name}" style="display:block;height:100%">'
                 f'<img src="{thumb_of(p["image"])}" alt="{name} — {esc(cat_name[p["category"]])} product photo" width="{w}" height="{h}" loading="lazy" decoding="async"></a>')
        links = ""
    dis = "" if p["available"] else " disabled"
    search = " ".join([p["name"], cat_name[p["category"]], p["description"], p["unit"]]).lower()
    return f'''<article class="product-card" data-reveal style="--d:{delay}s" data-id="{esc(p["id"])}" data-slug="{esc(p["slug"])}" data-cat="{p["category"]}" data-unit="{p["unit"]}" data-name="{esc(p["name"].lower())}"{price_attr} data-featured="{1 if p["featured"] else 0}" data-order="{idx}" data-search="{esc(search)}">
  <div class="media">{media}{badge}</div>
  <div class="product-body">
    <p class="product-cat">{esc(cat_name[p["category"]])}</p>
    <h3 class="product-name">{title}</h3>
    <p class="product-desc">{esc(p["description"])}</p>
    <div class="price-row">{price_html}<span class="price-alt" data-price-alt aria-live="off"></span></div>
    <div class="card-actions">
      <div class="qty" data-unit="{p["unit"]}">
        <button type="button" data-qty="-1" aria-label="Decrease quantity of {name}"{dis}>−</button>
        <input type="number" inputmode="decimal" min="{u["min"]}" step="{u["step"]}" value="{u["min"]}" aria-label="Quantity of {name} in {u["label"]}"{dis}>
        <button type="button" data-qty="1" aria-label="Increase quantity of {name}"{dis}>+</button>
      </div>
      <button type="button" class="btn btn-navy btn-sm" data-add="{esc(p["id"])}"{dis}>Add to cart</button>
      <span class="qty-unit">Quantity in {u["label"]} (min {u["min"]:g}, steps of {u["step"]:g})</span>
    </div>
    {links}
  </div>
</article>'''

# --------------------------------------------------------------------------------------
# Pages
# --------------------------------------------------------------------------------------
def count(cat): return sum(1 for p in products if p["category"] == cat)
byid = {p["id"]: p for p in products}

def build_home():
    feat = [p for p in products if p["featured"]][:6]
    tiles = [
        ("sea-cucumber", "golden-sandfish-2.webp", "Dried Golden Sandfish sea cucumber"),
        ("sea-shells", "murex-shell.webp", "A natural Murex sea shell"),
        ("other-seafood", "operculum-5.webp", "Dried sea snail and sea snail operculum"),
    ]
    tiles_html = ""
    for i, (slug, img, alt) in enumerate(tiles):
        c = next(x for x in CATEGORIES if x["slug"] == slug)
        tiles_html += f'''<a class="cat-tile" data-reveal style="--d:{i*0.08}s" href="products.html?cat={slug}">
  <div class="cat-img"><img src="{img}" alt="{esc(alt)}" width="640" height="480" loading="lazy" decoding="async"></div>
  <div class="cat-body"><h3>{esc(c["name"])}</h3><p>{esc(c["blurb"])}</p><span class="cat-count">{count(slug)} products</span></div>
</a>'''
    cards = "".join(product_card(p, products.index(p), detail_modal=False, delay=i*0.06) for i, p in enumerate(feat))
    body = f'''<section class="hero" aria-labelledby="hero-title">
  <video id="heroVideo" autoplay muted loop playsinline preload="metadata" poster="hero-poster.jpg" aria-hidden="true" tabindex="-1" disablepictureinpicture>
    <source src="lanka-seagull-hero.mp4" type="video/mp4">
    <source src="lanka-seagull-hero.webm" type="video/webm">
  </video>
  <div class="container hero-inner">
    <div class="hero-load">
      <h1 id="hero-title">Sea cucumber, sea shells and marine products from Sri Lanka</h1>
      <p class="hero-lead">{esc(COMPANY["name"])} supplies dried sea cucumber, natural sea shells, dried sea snail and operculum from Adampan, Sri Lanka. Wholesale and export enquiries are welcome.</p>
      <div class="hero-cta">
        <a class="btn btn-primary" href="products.html">Explore products</a>
        <a class="btn btn-light" href="contact.html">Contact us</a>
      </div>
    </div>
  </div>
  <button type="button" class="hero-media-btn" id="heroToggle" aria-pressed="false">{ICON["pause"]}<span>Pause video</span></button>
  {waves()}
</section>

<section class="section" aria-labelledby="cats-title">
  <div class="container">
    <div class="section-head" data-reveal><div><h2 id="cats-title">What we supply</h2><p>Three product groups, each available to browse by variety.</p></div><a class="text-link" href="products.html">View the full catalogue</a></div>
    <div class="cat-grid">{tiles_html}</div>
  </div>
</section>

<section class="section section--white" aria-labelledby="feat-title">
  <div class="container">
    <div class="section-head" data-reveal><div><h2 id="feat-title">Featured products</h2><p>Add quantities to your order cart, then send us an enquiry on WhatsApp or by email.</p></div><a class="text-link" href="products.html">See all {len(products)} products</a></div>
    <div class="product-grid three">{cards}</div>
  </div>
</section>

<section class="section" aria-labelledby="about-title">
  <div class="container split">
    <div class="photo" data-reveal><img src="sea-cucumber.webp" alt="Dried sea cucumber from Lanka Seagull on a plain background" width="1280" height="1280" loading="lazy" decoding="async"></div>
    <div class="prose" data-reveal>
      <h2 id="about-title">A seafood company based in Adampan</h2>
      <p>{esc(COMPANY["name"])} is a seafood and marine products company based in Adampan, Sri Lanka. We make it simple to review products, choose a quantity by the kilogram or by the piece, and send us an order enquiry.</p>
      <p style="margin-top:1.2rem"><a class="btn btn-outline" href="about.html">About the company</a></p>
    </div>
  </div>
</section>

<section class="section section--navy" aria-labelledby="how-title">
  <div class="container split">
    <div data-reveal>
      <h2 id="how-title">How an order enquiry works</h2>
      <p class="lead" style="margin-top:1rem">This website does not take payment. Each enquiry is confirmed with you directly before anything is agreed.</p>
    </div>
    <ol class="steps" data-reveal>
      <li><strong>Choose products and quantities</strong><span>Add items to the cart in KG or PCS.</span></li>
      <li><strong>Send your enquiry</strong><span>Your cart opens as a ready-written WhatsApp message or email.</span></li>
      <li><strong>We confirm with you</strong><span>Our team replies to confirm availability, final price and delivery.</span></li>
    </ol>
  </div>
</section>

{cta_band("Planning a wholesale or export order?", "Tell us what you need and in what quantity. We will reply with availability and pricing.")}'''
    return page("index.html", "Lanka Seagull (Pvt) Ltd | Sea Cucumber & Marine Products, Sri Lanka",
                "Lanka Seagull (Pvt) Ltd supplies dried sea cucumber, sea shells, dried sea snail and operculum from Adampan, Sri Lanka. Wholesale and export enquiries welcome.",
                "home", body)

def build_products():
    chips = f'<button type="button" class="chip" data-cat="all" aria-pressed="true">All<span class="n">{len(products)}</span></button>'
    for c in CATEGORIES:
        chips += f'<button type="button" class="chip" data-cat="{c["slug"]}" aria-pressed="false">{esc(c["name"])}<span class="n">{count(c["slug"])}</span></button>'
    cards = "".join(product_card(p, i, True) for i, p in enumerate(products))
    body = f'''{page_head("Product catalogue", "Dried sea cucumber, sea shells, sea snail and operculum. Choose a quantity and add it to your order cart.")}
<div class="toolbar">
  <div class="container">
    <div class="toolbar-row">
      <div class="search"><label for="q" class="sr-only">Search products</label>{ICON["search"]}<input id="q" type="search" placeholder="Search products, e.g. curry fish" autocomplete="off" enterkeyhint="search"><button type="button" class="clear" id="qClear" aria-label="Clear search" hidden>×</button></div>
      <div class="field-inline"><label for="sort">Sort by</label>
        <select class="select" id="sort"><option value="featured">Featured</option><option value="name">Name A–Z</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></div>
    </div>
    <div class="chips" role="group" aria-label="Filter by category" id="chips">{chips}</div>
  </div>
</div>
<section class="section" style="padding-top:1.5rem">
  <div class="container">
    <div class="notice" data-reveal><strong>About prices.</strong> Prices are listed in Sri Lankan rupees (LKR) per KG or per PCS as shown on each product. They are guide prices: final prices and availability are confirmed by our team when you send an enquiry. Items marked “Price on request” are quoted individually.</div>
    <h2 class="sr-only">Products</h2>
    <p class="result-line" id="resultLine" role="status" aria-live="polite">Showing all {len(products)} products</p>
    <div class="product-grid" id="grid">{cards}</div>
    <div class="empty" id="empty" hidden><h3>No products match your search</h3><p>Try a different word or clear the filters.</p><button type="button" class="btn btn-navy" id="resetFilters">Clear filters</button></div>
    <noscript><p class="notice">Search, filters and the cart need JavaScript. You can still browse every product above and contact us on WhatsApp or by email to order.</p></noscript>
  </div>
</section>
{cta_band("Can't find what you need?", "Ask us about other varieties, grades and larger quantities.")}'''
    modal = f'''<div class="overlay" id="productOverlay">
  <div class="dialog dialog-wide" role="dialog" aria-modal="true" aria-labelledby="pdTitle" tabindex="-1">
    <button type="button" class="dialog-close" data-close aria-label="Close product details">×</button>
    <div class="detail">
      <div class="media loaded" id="pdMedia"><img id="pdImg" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="" width="800" height="800"></div>
      <div class="detail-body">
        <p class="product-cat" id="pdCat"></p>
        <h2 id="pdTitle">Product</h2>
        <p id="pdDesc" class="lead" style="font-size:1rem"></p>
        <p id="pdAvail"></p>
        <div><p class="price" id="pdPrice"></p><span class="price-alt" id="pdAlt"></span></div>
        <div class="card-actions" id="pdActions">
          <div class="qty" id="pdQty"><button type="button" data-qty="-1" aria-label="Decrease quantity">−</button><input type="number" inputmode="decimal" aria-label="Quantity"><button type="button" data-qty="1" aria-label="Increase quantity">+</button></div>
          <button type="button" class="btn btn-navy" id="pdAdd">Add to cart</button>
          <span class="qty-unit" id="pdUnitNote"></span>
        </div>
        <p class="hint">Prices are guide prices in LKR. Our team confirms final price and availability.</p>
        <a class="btn btn-wa btn-sm" id="pdWa" href="#" target="_blank" rel="noopener noreferrer" style="align-self:flex-start">{ICON["wa"]}Ask about this product</a>
      </div>
    </div>
  </div>
</div>'''
    return page("products.html", "Products | Lanka Seagull (Pvt) Ltd — Sea Cucumber & Sea Shells",
                "Browse dried sea cucumber, natural sea shells, dried sea snail and operculum from Lanka Seagull (Pvt) Ltd, Sri Lanka. Search, filter and send an order enquiry.",
                "products", body, extra_overlays=modal)

def build_about():
    cats = ""
    for c in CATEGORIES:
        names = [p["name"] for p in products if p["category"] == c["slug"]]
        shown = ", ".join(names[:5]) + (f" and {len(names)-5} more" if len(names) > 5 else "")
        cats += f'<li><strong>{esc(c["name"])}</strong> ({len(names)} products): {esc(shown)}.</li>'
    a = "<br>".join(esc(l) for l in COMPANY["addressLines"])
    body = f'''{page_head("About Lanka Seagull", "A seafood and marine products company based in Adampan, Sri Lanka.")}
<section class="section">
  <div class="container split">
    <div class="prose" data-reveal>
      <h2>Who we are</h2>
      <p>{esc(COMPANY["name"])} is a seafood and marine products company based in Adampan, Sri Lanka. We supply dried sea cucumber, natural sea shells, dried sea snail and sea snail operculum.</p>
      <p>Buyers can browse the catalogue, choose quantities by the kilogram or by the piece, and send an order enquiry by WhatsApp or email. Our team then replies to confirm availability, final price and delivery.</p>
      <p style="margin-top:1.5rem"><a class="btn btn-navy" href="products.html">Browse products</a></p>
    </div>
    <div class="photo" data-reveal><img src="sea-shells.webp" alt="Natural sea shells from Lanka Seagull on a plain background" width="1760" height="1760" loading="lazy" decoding="async"></div>
  </div>
</section>
<section class="section section--white">
  <div class="container split rev">
    <div class="photo" data-reveal><img src="curry-fish.webp" alt="Dried Curry Fish sea cucumber from Lanka Seagull" width="1280" height="1280" loading="lazy" decoding="async"></div>
    <div class="prose" data-reveal>
      <h2>What we supply</h2>
      <ul class="tick-list">{cats}</ul>
    </div>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div data-reveal>
      <h2>Working with us</h2>
      <p class="lead" style="margin-top:1rem">We welcome enquiries from wholesalers, importers and business customers. Because details such as grades, pack sizes and shipping depend on each order, we agree them with you directly.</p>
      <ol class="steps">
        <li><strong>Tell us what you need</strong><span>Use the cart, WhatsApp, email or phone.</span></li>
        <li><strong>We confirm the details</strong><span>Availability, final price and delivery arrangements.</span></li>
      </ol>
    </div>
    <div class="c-card" data-reveal style="gap:.6rem">
      <h3>{esc(COMPANY["name"])}</h3>
      <p>{a}</p>
      <p>Call: <a class="text-link" href="tel:{COMPANY["phoneTel"]}">{nb(COMPANY["phoneDisplay"])}</a></p>
      <p>WhatsApp: <a class="text-link" href="https://wa.me/{COMPANY["whatsappE164"]}" target="_blank" rel="noopener noreferrer">{nb(COMPANY["whatsappDisplay"])}</a></p>
      <p>Email: <a class="text-link" href="mailto:{COMPANY["email"]}">{esc(COMPANY["email"])}</a></p>
    </div>
  </div>
</section>
{cta_band("Send us a business enquiry", "Wholesale, export or regular supply — tell us what you are looking for.")}'''
    return page("about.html", "About Us | Lanka Seagull (Pvt) Ltd, Adampan, Sri Lanka",
                "Lanka Seagull (Pvt) Ltd is a seafood and marine products company in Adampan, Sri Lanka, supplying dried sea cucumber, sea shells, sea snail and operculum.",
                "about", body)

def build_gallery():
    photos = [
        ("sea-cucumber", "sea-cucumber.webp", "Sandfish Sea Cucumber"),
        ("sea-shells", "sea-shells.webp", "Sea Shells / Gavuri Shell"),
        ("sea-cucumber", "curry-fish.webp", "Curry Fish Sea Cucumber"),
        ("sea-cucumber", "curry-fish-white.webp", "Curry Fish (White Grade)"),
        ("sea-cucumber", "baby-curry-fish.webp", "Baby Curry Fish"),
        ("sea-cucumber", "golden-sandfish-2.webp", "Golden Sandfish Sea Cucumber"),
        ("sea-cucumber", "loli-fish.webp", "Lolly Fish Sea Cucumber"),
        ("sea-cucumber", "sanfish.webp", "Sanfish"),
        ("sea-cucumber", "whate-nool.webp", "Whate Nool"),
        ("sea-cucumber", "whate-tiger.webp", "White Tiger Sea Cucumber"),
        ("sea-cucumber", "xiang-pi.webp", "Xiang Pi"),
        ("sea-cucumber", "dhambela.webp", "Dhambela"),
        ("sea-cucumber", "surf-red-fish.webp", "Surf Red Fish Sea Cucumber"),
        ("sea-cucumber", "black-tiger-sea-cucumber.webp", "Black Tiger Sea Cucumber"),
        ("sea-cucumber", "black-fish-sea-cucumber.webp", "Black Fish Sea Cucumber"),
        ("sea-shells", "patty-shell.webp", "Patty Shell"),
        ("sea-shells", "kachchan-shell.webp", "Kachchan Shell"),
        ("sea-shells", "tapasiyem-shell.webp", "Tapasiyem Shell"),
        ("sea-shells", "jathi-shell.webp", "Jathi Shell"),
        ("other-seafood", "dried-sea-snail.webp", "Dried Sea Snail"),
        ("other-seafood", "dried-sea-snail-white.webp", "Dried Sea Snail (White Grade)"),
        ("other-seafood", "operculum-1.webp", "Spider Conch Operculum"),
        ("other-seafood", "operculum-2.webp", "Murex Operculum"),
        ("other-seafood", "operculum-3.webp", "Turbinella Pyrum Shell Operculum (Grade B)"),
        ("other-seafood", "operculum-4.webp", "Trapezium Shell Operculum (Grade B)"),
        ("other-seafood", "operculum-5.webp", "Turbinella Pyrum Shell Operculum"),
        ("other-seafood", "operculum-6.webp", "Murex Operculum (Grade B)"),
        ("other-seafood", "trapezium-shell-operculum.webp", "Trapezium Shell Operculum"),
        ("sea-shells", "babylonia-shell.webp", "Babylonia Shell"),
        ("sea-shells", "cone-shell-1.webp", "Cone Shell"),
        ("sea-shells", "frog-shell-1.webp", "Frog Shell"),
        ("sea-shells", "frog-shell-2.webp", "Frog Shell (Pair Grade)"),
        ("sea-shells", "spindle-shell.webp", "Spindle Shell"),
        ("sea-shells", "murex-shell.webp", "Murex Shell"),
        ("sea-shells", "cone-shell-2.webp", "Cone Shell (Textile Grade)"),
        ("sea-shells", "cone-shell-3.webp", "Cone Shell (Single Grade)"),
    ]
    items = [{"category": category, "image": image, "_label": label}
             for category, image, label in photos]
    chips = f'<button type="button" class="chip" data-gcat="all" aria-pressed="true">All<span class="n">{len(items)}</span></button>'
    for c in CATEGORIES:
        n = sum(1 for p in items if p["category"] == c["slug"])
        chips += f'<button type="button" class="chip" data-gcat="{c["slug"]}" aria-pressed="false">{esc(c["name"])}<span class="n">{n}</span></button>'
    tiles = ""
    for p in items:
        alt = f'{p["_label"]} — {cat_name[p["category"]]} product photo'
        tiles += (f'<button type="button" class="g-item" data-gcat="{p["category"]}" data-full="{esc(p["image"])}" data-title="{esc(p["_label"])}" data-alt="{esc(alt)}" aria-label="Open larger photo: {esc(p["_label"])}">'
                  f'<img src="{esc(p["image"])}" alt="{esc(alt)}" width="640" height="640" loading="lazy" decoding="async"><span class="cap">{esc(p["_label"])}</span></button>')
    body = f'''{page_head("Gallery", "Photos of our sea cucumber, sea shells, sea snail and operculum products.")}
<section class="section" style="padding-top:2rem">
  <div class="container">
    <div class="chips" role="group" aria-label="Filter gallery by category" id="gchips">{chips}</div>
    <p class="result-line" id="gResult" role="status" aria-live="polite" style="margin-bottom:0">Showing {len(items)} photos</p>
    <div class="gallery-grid" id="gGrid">{tiles}</div>
  </div>
</section>
{cta_band("Want to see more?", "Ask us for additional photos, grades or samples of any product.")}'''
    lb = '''<div class="overlay lightbox" id="lightbox">
  <div class="dialog" role="dialog" aria-modal="true" aria-label="Photo viewer" tabindex="-1" style="background:none;box-shadow:none;padding:0;max-width:1000px;overflow:visible">
    <button type="button" class="dialog-close" data-close aria-label="Close photo viewer">×</button>
    <div class="lb-inner">
      <button type="button" class="lb-btn lb-prev" id="lbPrev" aria-label="Previous photo">‹</button>
      <img id="lbImg" src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" alt="" width="1000" height="1000">
      <button type="button" class="lb-btn lb-next" id="lbNext" aria-label="Next photo">›</button>
      <p class="lb-caption" id="lbCap"></p>
    </div>
  </div>
</div>'''
    return page("gallery.html", "Gallery | Lanka Seagull (Pvt) Ltd — Seafood & Shell Photos",
                "Photo gallery of Lanka Seagull (Pvt) Ltd products: dried sea cucumber, sea shells, sea snail and operculum from Sri Lanka.",
                "gallery", body, extra_overlays=lb)

def build_contact():
    c = COMPANY
    a = "<br>".join(esc(l) for l in c["addressLines"])
    map_src = f'https://maps.google.com/maps?q={c["mapsLat"]},{c["mapsLng"]}&z=15&output=embed'
    body = f'''{page_head("Contact us", "Call, message us on WhatsApp, or send an enquiry. We reply as soon as we can.")}
<section class="section">
  <div class="container">
    <h2 class="sr-only">Ways to reach us</h2>
    <div class="contact-cards">
      <a class="c-card" data-reveal href="tel:{c["phoneTel"]}">{ICON["phone"]}<h3>Call</h3><span class="v">{nb(c["phoneDisplay"])}</span><span class="h">Voice calls</span></a>
      <a class="c-card" data-reveal style="--d:.06s" href="https://wa.me/{c["whatsappE164"]}" target="_blank" rel="noopener noreferrer">{ICON["wa"]}<h3>WhatsApp</h3><span class="v">{nb(c["whatsappDisplay"])}</span><span class="h">Chat and order enquiries</span></a>
      <a class="c-card" data-reveal style="--d:.12s" href="mailto:{c["email"]}">{ICON["mail"]}<h3>Email</h3><span class="v">{esc(c["email"])}</span><span class="h">Business enquiries</span></a>
      <a class="c-card" data-reveal style="--d:.18s" href="{esc(c["mapsUrl"])}" target="_blank" rel="noopener noreferrer">{ICON["pin"]}<h3>Address</h3><span class="v">{a}</span><span class="h">Open in Google Maps</span></a>
    </div>
    <div class="contact-grid">
      <form class="form" id="contactForm" novalidate data-reveal>
        <div><h2 style="font-size:1.6rem">Send an enquiry</h2>
        <p class="hint" style="margin-top:.4rem">This form does not store your message. When you press a button below, it opens WhatsApp or your email app with your message ready to send.</p></div>
        <div class="form-row two">
          <div class="field"><label for="cf-name">Your name</label><input id="cf-name" name="name" type="text" autocomplete="name" required maxlength="80" aria-describedby="cf-name-err"><span class="err" id="cf-name-err"></span></div>
          <div class="field"><label for="cf-phone">Phone or WhatsApp</label><input id="cf-phone" name="phone" type="tel" autocomplete="tel" required maxlength="25" aria-describedby="cf-phone-err"><span class="err" id="cf-phone-err"></span></div>
        </div>
        <div class="field"><label for="cf-email">Email <span class="opt">(optional)</span></label><input id="cf-email" name="email" type="email" autocomplete="email" maxlength="120" aria-describedby="cf-email-err"><span class="err" id="cf-email-err"></span></div>
        <div class="field"><label for="cf-msg">Message</label><textarea id="cf-msg" name="message" required maxlength="1200" aria-describedby="cf-msg-err"></textarea><span class="err" id="cf-msg-err"></span></div>
        <div class="form-actions two">
          <button type="button" class="btn btn-wa" id="cfWa">{ICON["wa"]}Send via WhatsApp</button>
          <button type="button" class="btn btn-navy" id="cfMail">{ICON["mail"]}Send by email</button>
        </div>
        <div id="cfStatus" role="status" aria-live="polite"></div>
        <noscript><p class="notice">Please contact us directly by WhatsApp, phone or email — the form needs JavaScript.</p></noscript>
      </form>
      <div data-reveal>
        <h2 style="font-size:1.6rem">Visit or call</h2>
        <p style="margin-top:.8rem">{esc(c["name"])}<br>{a}</p>
        <div class="map-frame"><iframe title="Map showing the Lanka Seagull location in Adampan" src="{esc(map_src)}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div>
        <p style="margin-top:.8rem"><a class="text-link" href="{esc(c["mapsUrl"])}" target="_blank" rel="noopener noreferrer">Open in Google Maps</a></p>
      </div>
    </div>
  </div>
</section>'''
    return page("contact.html", "Contact | Lanka Seagull (Pvt) Ltd, Adampan, Sri Lanka",
                "Contact Lanka Seagull (Pvt) Ltd: call, WhatsApp, email or send an enquiry. Address: 69/1 Mullikandal, Adampan, Sri Lanka.",
                "contact", body)

def build_cart():
    body = f'''{page_head("Your order cart", "Review quantities, then send your enquiry. Nothing is ordered until our team confirms it with you.")}
<section class="section" style="padding-top:2.5rem">
  <div class="container">
    <div id="cartRoot" aria-live="polite"><p class="hint">Loading your cart…</p></div>
    <noscript><p class="notice">The cart needs JavaScript. Please contact us by WhatsApp, phone or email to place an enquiry.</p></noscript>
  </div>
</section>'''
    return page("cart.html", "Order Cart | Lanka Seagull (Pvt) Ltd",
                "Review your selected Lanka Seagull products and send an order enquiry by WhatsApp or email.", "cart", body)

def build_404():
    # A 404 page is served from whatever address was mistyped, so relative links cannot work here.
    # With siteUrl set the links are absolute; without it they are root-relative ("/index.html").
    c = COMPANY
    base = SITE_PATH  # "/" on a normal domain, "/repo-name/" on a GitHub Pages project site
    return f'''<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex">
<title>Page not found | {esc(c["name"])}</title>
<link rel="icon" type="image/png" sizes="64x64" href="{base}favicon-64.png">
<style>
body{{margin:0;min-height:100vh;display:grid;place-items:center;background:#f5f0e6;color:#10253a;font-family:system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif;text-align:center;padding:1.5rem}}
main{{max-width:34rem}}h1{{font-family:Georgia,serif;font-size:2.4rem;color:#0a2540;margin:.5rem 0}}
p{{line-height:1.6;color:#4f6377}}a.b{{display:inline-block;margin:.4rem;padding:.8rem 1.4rem;border-radius:8px;background:#0a2540;color:#fff;text-decoration:none;font-weight:600}}
a.b.o{{background:#19b5b0;color:#061a2e}}img{{height:56px;width:auto}}
</style></head>
<body><main>
<img src="{base}logo-mark.png" alt="" width="67" height="56">
<p style="font-size:.95rem;font-weight:600;color:#0a7a80;margin:.5rem 0 0">Error 404</p>
<h1>We couldn't find that page</h1>
<p>The link may be old or mistyped. Try the home page or our product catalogue.</p>
<p><a class="b" href="{base}index.html">Go to home page</a><a class="b o" href="{base}products.html">Browse products</a></p>
<p style="font-size:.9rem;margin-top:1.5rem">{esc(c["name"])} · <a href="mailto:{c["email"]}">{esc(c["email"])}</a></p>
</main></body></html>
'''

# --------------------------------------------------------------------------------------
# data.js for the browser
# --------------------------------------------------------------------------------------
def build_data_js():
    prods = []
    for p in products:
        prods.append({"id": p["id"], "slug": p["slug"], "name": p["name"], "category": p["category"],
                      "categoryName": cat_name[p["category"]], "description": p["description"], "unit": p["unit"],
                      "price": p["price"], "available": p["available"], "image": thumb_of(p["image"]), "thumb": thumb_of(p["image"])})
    data = {"company": {k: COMPANY[k] for k in ("name", "shortName", "phoneDisplay", "phoneTel", "whatsappE164", "whatsappDisplay", "email")},
            "units": UNITS, "currencies": CURRENCIES, "products": prods,
            "rates": {"liveEndpoint": "https://open.er-api.com/v6/latest/LKR"}}
    return ("/* GENERATED by source/build.py from source/products.json — edit the JSON, not this file. */\n"
            "window.LS = " + json.dumps(data, ensure_ascii=False, indent=1) + ";\n")

def write(name, content):
    with open(os.path.join(OUT, name), "w", encoding="utf-8", newline="\n") as f:
        f.write(content)

if __name__ == "__main__":
    write("index.html", build_home()); write("products.html", build_products())
    write("about.html", build_about()); write("gallery.html", build_gallery())
    write("contact.html", build_contact()); write("cart.html", build_cart()); write("404.html", build_404())
    write("data.js", build_data_js())
    extra = ""
    for f in ("sitemap.xml", "robots.txt"):  # never leave stale copies behind
        fp = os.path.join(OUT, f)
        if os.path.exists(fp): os.remove(fp)
    if SITE_URL:
        urls = [SITE_URL] + [SITE_URL + n for n in ("products.html", "about.html", "gallery.html", "contact.html")]
        write("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
              "".join(f"  <url><loc>{esc(u)}</loc></url>\n" for u in urls) + "</urlset>\n")
        write("robots.txt", f"User-agent: *\nAllow: /\nDisallow: {SITE_PATH}source/\nDisallow: {SITE_PATH}project-notes/\n\nSitemap: {SITE_URL}sitemap.xml\n")
        extra = f", sitemap.xml, robots.txt (siteUrl = {SITE_URL})"
    print("Built", len(products), "products, 7 pages and data.js" + extra + f" -> {OUT}")
