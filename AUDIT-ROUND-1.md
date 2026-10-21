> **Historical report (round 1).** File paths in it refer to the old `public_html/` layout; the site files now sit at the project root. Two duplicate photos it lists as kept have since been removed. See `AUDIT-AND-CHANGES.md` for the current report.

# Audit, changes and tests

## 1. What the original site had (key findings)

| Area | Finding |
|---|---|
| Architecture | One 1,300-line `app.js` rendered every page in the browser; HTML files were near-empty shells (poor for search engines, blank without JavaScript). |
| **Prices** | `PRODUCT_PRICE_ADJUSTMENT = 1.5` was silently added to every price on display, so shown prices did not match the stored data. It was also applied in some calculations and not others. |
| **Units** | All 37 products stored the price in a field called `pricePerKg`, including 14 sold by PCS. |
| Suspect prices | Four stored prices look wrong next to similar products: Golden Sandfish (124), White Tiger (109), Murex Shell (105), Whate Nool (7,958). |
| Orders | The "order" page showed a confirmation although nothing was saved or sent. The contact form showed "message sent" with no backend. |
| Branding | The language/currency modal said "Seagull Global". |
| Language | Only a few headings were translatable; most of the site stayed English, so the language switch over-promised. |
| Currency | Rates were hard-coded but described as periodically updated. |
| Gallery | 15 of 50 gallery images were Unsplash stock photos (hot-linked), including unrelated scenes, plus duplicates. |
| Hero | Poster was an Unsplash URL, not a local file. |
| Assets | `dried-sea-snail-white.jpg` was really a PNG (509 KB). Four images were byte-identical duplicates. |
| Copy | Unverified claims ("professional packaging", "fresh & carefully selected") and leftover placeholder text ("Refine this statement", "Update pricing anytime in admin" shown on products). |

## 2. What was changed

**Design.** New navy / ocean / turquoise / sand design with self-hosted fonts (Fraunces + Figtree, no third-party requests), a header with the logo mark and official name, a video hero with a gentle wave overlay, category tiles, featured products, ordering steps, enquiry call to action, and a consistent footer. Subtle motion only: scroll reveals, card hover, cart-count pop, dialog/menu transitions, page fades; `prefers-reduced-motion` switches it all off and pauses the video.

**Pages.** Five real HTML pages (Home, Products, About Us, Gallery, Contact) plus `cart.html` and `404.html`. Product cards are in the HTML itself, so the catalogue is visible without JavaScript and to search engines.

**Products.** Search, category filters with counts, sorting (featured, name, price low/high), product detail dialog with deep links (`products.html#curry-fish`), availability badges, consistent 1:1 image tiles with 640 px WebP thumbnails.

**Prices and units (corrected).**
- Removed the +1.5 adjustment entirely. The price shown is now the price stored in your data.
- Data model fixed: each product has `unit` (`kg`/`pcs`) and `price`; `pricePerKg` is gone.
- KG: minimum 0.5, steps of 0.5. PCS: minimum 1, whole pieces. Typed quantities snap to valid values; negatives, zero, text and absurd values are corrected, with a message.
- Totals are computed once, in one function, from catalogue data (the cart stores only product ID and quantity, never prices, so stale or tampered prices cannot enter).
- The four implausible prices are **hidden** ("Price on request") rather than guessed. Their stored values are kept in `products.json` as `unconfirmedStoredPrice`.

**Cart and order flow.** `cart.html`: quantity +/−, typed quantity, remove, clear, estimated total, empty state, cart survives page changes and reloads (30 days, in the browser). Enquiry form validates name, phone, optional email, country, city, address, notes; control characters are stripped. Sends via WhatsApp (to the WhatsApp number) or email, or copies the text. Wording everywhere says **enquiry, not confirmed order**; double clicks are blocked for a few seconds; the cart is not cleared automatically because the site cannot know whether the message was sent.

**Contact.** Verified details carried over unchanged. Phone `076 117 7764` is used for calls (`tel:`); WhatsApp `+94 77 834 8603` is used for chat/orders. They were **not** merged. The contact form no longer pretends to send: it validates, then opens WhatsApp or your email app, and says nothing has been sent until the visitor presses Send. Map embed uses the coordinates in your existing Google Maps link.

**Currency (replaces the language/currency modal).** Rebranded and rebuilt as an accessible "Display currency" dialog. LKR is always the listed price; other currencies appear as "≈ … (estimate)". The site tries a free live-rate service (`open.er-api.com`, no key) and labels the result "Live exchange rate (updated date)". If that fails it uses the old indicative rates and says "indicative". Converted amounts are never put in order messages. The first-visit auto-popup was removed because it blocked the page. Existing saved preferences (`lankaSeagullPrefs`) still load.

**Language switching removed**, since it only covered a few headings. It should only come back with full translations.

**Gallery.** 36 unique real product photos (stock images and duplicates removed), category filters, lightbox (keyboard, buttons, swipe), descriptive alt text.

**About.** Rewritten with only information from your own site and product list. No history, certifications, capacity, statistics or testimonials were invented.

**Security / code quality.** No `innerHTML` with data (DOM methods and `textContent`); all URLs built with `encodeURIComponent`; external links use `rel="noopener noreferrer"`; no API keys or third-party scripts; storage wrapped in try/catch with memory fallback; corrupt or tampered stored data is validated and ignored; one script file with no duplicate listeners.

**SEO / accessibility / performance.** Unique titles and descriptions, one H1 per page and no skipped heading levels, Open Graph basics, favicon and touch icon from your logo, skip link, visible focus, labelled controls, focus-trapped dialogs with Esc, `aria-live` status messages, lazy-loaded images, video re-encoded from 3.8 MB to 1.5 MB (audio removed, WebM fallback added), poster is now local.

## 3. Tests actually run (headless Chromium via Playwright, local server)

- **Sweep:** 7 pages × 5 viewports (360, 414, 768, 1280, 1920 px): 0 console errors, 0 failed local requests, 0 broken images, 0 horizontal overflow. (One real overflow bug at 360 px was found and fixed.)
- **Functional suite: 97 checks, all passing**, covering search, category filter, all four sorts, URL parameters, KG vs PCS limits, quantity snapping, add/merge/remove/clear, cart maths (e.g. 941×3 + 858×10 = Rs 11,403; with 3.5 kg = Rs 11,873.50), persistence across reload and pages, form validation, WhatsApp message content (names, quantities, units, prices, customer details), disabled double-submit, honest status messages, copy-to-clipboard, currency live and fallback paths, currency persistence, legacy and corrupt saved data, dialogs (open, Esc, focus return), deep links and old `#/…` links, mobile menu, gallery filter and lightbox, contact form, hero video actually playing/pausing, reduced-motion, and no-JavaScript rendering.
- **Robustness:** tampered cart storage, corrupt storage, and `<script>` in the search box were all handled without errors or injection.
- **Accessibility:** axe-core (WCAG 2 A/AA + best practice) on all pages at desktop and mobile widths: 0 violations.
- **Links:** every local link, image, thumbnail and anchor resolves; no image without alt.
- **HTML validation:** html-validate reports only two intentional items (muted autoplay hero video with a pause button, and a false positive on an already non-breaking phone number).

## 4. Not tested / limitations (honest list)

- **Live exchange-rate endpoint:** the response handling was tested with a mocked reply and with a blocked request; the real service could not be reached from my environment.
- **Email button:** I verified the form validation, the message text (identical to the WhatsApp text) and the status message, but a headless browser cannot open an email app, so the final `mailto:` hand-off was not observed. WhatsApp opens were verified.
- **Real WhatsApp delivery, Google Maps embed, Facebook/Instagram pages** need internet access and were not loaded.
- **Opening files directly from disk (file://):** pages, cart and images work (tested), but font preload hints log harmless console errors there; production hosting showed none.
- **Real devices and Safari/Firefox:** tests ran in Chromium only. Layout was checked at phone/tablet/desktop sizes, not on physical devices.
- **Formal performance score (Lighthouse)** was not run. Measured initial weight: Home ≈ 1.9 MB in a browser that plays the MP4 (the hero video is 1.4 MB of that), Products ≈ 0.4 MB (Chromium, mobile viewport, before scrolling).
- There is still **no backend**: orders and messages are not stored anywhere.

## 5. Needs your confirmation

1. **All prices** (`price-review.csv`). The old site showed each stored price +1.5; I removed that. Please confirm the current list. In particular:
   - the four hidden prices (Golden Sandfish 124, White Tiger 109, Murex Shell 105, Whate Nool 7,958) — probably typing errors;
   - the **14 PCS products** (shells): their prices were stored as per-kg. Please confirm they are **per piece**.
2. **Two numbers.** Call: 076 117 7764. WhatsApp: +94 77 834 8603. I kept them separate; please confirm each one's purpose, and that the call number does not also need a WhatsApp link.
3. **Developer credit link** in the footer goes to `www-anversahim-com.vercel.app` (a vercel.app address). Please confirm it is the right, final address.
4. **Hero video** shows a "CapCut AI" watermark across the whole clip. I cropped the frame to hide it. A clean export from your editor would be better; replace `videos/lanka-seagull-hero.mp4` and re-encode the WebM.
5. **Photo branding.** Shell photos carry a different logo ("Seagull Shells – Sea Shell Company"), and one photo has a faint watermark. Please confirm this brand is intended, or supply re-shot or clean photos.
6. **Owner-written product claims kept as-is**, e.g. "hand-graded for size and quality", "bleached", "graded for export". Please confirm each is true. Unverified general claims from the old home page were removed.
7. **Product names** kept as written, including "Whate Nool" and "Whate Tiger": check the spelling.
8. **Production domain.** Add `<link rel="canonical">`, `og:image` (use `images/logo.png`, or a 1200×630 image) and any Organization structured data once the domain is confirmed. I did not guess them.
9. **Gallery categories.** Only real product photos exist, so the gallery has no "processing", "packaging" or "company" photos. Send real ones and they can be added.
10. **Minimum order quantities.** I kept 0.5 kg / 1 piece as in the original. Wholesale minimums, if any, should be set.

## 6. Files that are no longer used but were kept

`images/golden-sandfish.jpeg` and `images/dried-sea-cucumber-sanfish.jpeg` are byte-identical to other photos; `images/logo.png` is the original logo (the site uses `logo-mark.png` cropped from it). Safe to delete the first two.
