# Audit round 2 — report

This report covers the second audit. The first round (original site → rebuilt site) is documented in `AUDIT-ROUND-1.md`.

## 0. What was audited

You said you had uploaded `Lanka-Seagull-Professional-Website.zip`, but the upload did not arrive: the only file in the upload area was your original `website.zip` from round 1. I therefore audited the ZIP I delivered in round 1 (same name; I confirmed the extracted files were identical to my working copy). **If you changed that ZIP yourself after downloading it, those changes are not included; please send it again.**

Everything was inspected: all 7 pages, `css/style.css`, `js/app.js`, `js/data.js`, `source/products.json`, `source/build.py`, `.htaccess`, the 45 images, 37 thumbnails, 3 video files, 7 font files, and the README and round-1 report.

## 1. Problems found this round, and what was done

| # | Problem (how it was found) | Fix | Checked by |
|---|---|---|---|
| 1 | **Header overflowed by 29 px at 320 px wide** (small phones) – measured with a 320 px sweep that round 1 had not included. | Tighter header at ≤340 px (smaller logo/name, 40 px buttons). My first attempt failed because of CSS rule order; corrected. | Sweep of 7 pages × 6 widths (320–1920 px): 0 overflow. |
| 2 | **`404.html` buttons broke on sub-folder hosting**, which is how GitHub Pages project sites work (`/index.html` pointed at the domain root; returned 404 in my simulation). The round-1 README wrongly implied it worked in a sub-folder. | New `source/site-config.json` → `siteUrl`. The 404 page now builds links from it (and shows the logo). | Simulated sub-folder site: 404 link returns 200, all pages 0 errors at 320/360 px. |
| 3 | **Canonical links, social-share image and sitemap were missing**, correctly, because the address is unknown. | Added support, switched on only when `siteUrl` is set: canonical, `og:url`, `og:image` (new `images/og-image.jpg`), Twitter card, `sitemap.xml`, `robots.txt`. Nothing is emitted while it is empty. | Built with a test address and read the output; default build produces none of these. |
| 4 | **Cart badge only synced across browser tabs on the cart page.** | Listener moved to every page. | Two-page test: badge updated in the other page. |
| 5 | **Small tap targets** (footer links 18 px, text links 19 px, Remove/Clear 32 px, product titles 23 px). | Padding raised: now ≥ 33 px, primary buttons 44 px. | Re-measured on the built site. |
| 6 | **Invalid CSS**: an `@view-transition` rule nested inside `@media`. | Removed (reduced-motion is already handled by the global rule). | `css-tree` parser: 0 errors. |
| 7 | **Stale caching risk**: CSS/JS were cached for a week, so uploaded edits would show late. | CSS/JS now 1 day, HTML not cached (Apache `.htaccess`). | Reviewed the file; **not run on a real Apache server** (see §4). |
| 8 | **Developer files reachable on a web server** (`source/`, `project-notes/`). | `.htaccess` returns 404 for them on Apache; README tells shared-hosting users not to upload them; `robots.txt` disallows them once `siteUrl` is set. This is *not* possible on GitHub Pages (documented). | Rule written and reviewed; not run on Apache. |
| 9 | **Two byte-identical duplicate photos** (`golden-sandfish.jpeg`, `dried-sea-cucumber-sanfish.jpeg`). | Deleted after confirming identical MD5 to files in use and no references anywhere. | MD5 + `grep` of every file; link check 0 missing. |
| 10 | **Two products share one photo** ("Sea Shells" and "Gavuri Shell"). Not removed: they are separate products in your data. Gallery now captions the shared photo "Sea Shells / Gavuri Shell". | Flagged below. | Gallery test. |
| 11 | **Page titles** too long on 3 pages (up to 78 chars); one description at the 160 limit. | Titles shortened to ≤ 71 chars; descriptions 91–159 chars. | Measured. |
| 12 | **Project layout** did not match what you asked for (website was wrapped in `public_html/`, which GitHub Pages cannot serve). | Flat layout: pages, `css/`, `js/`, `images/`, `videos/`, `fonts/`, `source/` at the root; reports in `project-notes/`; duplicate `price-review.csv` removed. Every path re-verified. | Link/asset check. |
| 13 | README was missing GitHub / VS Code instructions and an upload list. | README rewritten; the upload table was derived by actually changing data and diffing which files the build rewrote. | See README §E. |

**Also checked and found sound (no change needed):** all 37 product IDs, slugs, names and image paths are unique and every image/thumbnail exists; no product is unavailable; cart maths for KG/PCS and for a 33-line cart match an independent calculation; the WhatsApp text contains every line; no `innerHTML` with data; tampered/corrupt stored carts and a `<script>` in the search box are handled; hero video plays/pauses; reduced-motion and no-JavaScript views work.

## 2. Files changed this round
- **Edited:** `source/build.py` (site-URL support, options, 404, captions), `css/style.css`, `js/app.js` (one listener), `.htaccess`, `README.md`.
- **Regenerated by the build:** all seven `.html` pages and `js/data.js`.
- **Added:** `source/site-config.json`, `images/og-image.jpg`, `.nojekyll`, `project-notes/`.
- **Moved:** `public_html/*` → project root; round-1 report → `project-notes/AUDIT-ROUND-1.md`; `price-review.csv` → `project-notes/`.
- **Deleted:** the two duplicate photos, the duplicate `price-review.csv`.
- **Not touched:** product data, photos, thumbnails, video, fonts, the visual design (it reviewed well at 320, 768 and 1280 px, so I did not redesign it for the sake of change).

## 3. Tests performed (headless Chromium + Playwright)
- Sweep: 7 pages × 320, 360, 414, 768, 1280, 1920 px — console errors, failed requests, broken images, horizontal overflow: **0 problems**.
- Functional suite: **97/97**; plus a new set of 11 checks (tab sync, keyboard add-to-cart, focus ring, dialog focus in/out/trap, 33-item cart, gallery caption, 404): all pass. One check failed once because of my test (shared browser storage) and was re-run in an isolated browser: pass.
- axe-core (WCAG 2 A/AA + best practice), all pages, desktop + mobile: **0 violations**.
- Links: every local link/image/anchor resolves; one H1 per page; no skipped heading levels; every image has alt text.
- HTML validator: only the 2 intentional/false-positive items described in round 1. CSS parser: 0 errors.
- Sub-folder hosting simulation (`/lanka/`) with `siteUrl` set.

## 4. Not tested / limitations
- **GitHub Pages itself:** I simulated sub-folder hosting locally; I did not deploy to GitHub.
- **`.htaccess` on a real Apache server:** every block is guarded, but I could not run Apache. If your host shows a 500 error, delete that file.
- **Live exchange-rate service, email-app hand-off, Google Maps, social pages, real WhatsApp delivery:** need internet/apps unavailable to me (round-1 notes still apply).
- **Safari, Firefox and real phones:** Chromium only.
- **No Lighthouse run.** No backend: enquiries are not stored anywhere.
- WCAG 2.2 24 px minimum target size is met everywhere; the 44 px "comfortable" size is met for buttons but not for plain text links.

## 5. Needs your confirmation (carried over, plus new)
1. **Prices** (`price-review.csv`): four hidden as probable typos (Golden Sandfish 124, White Tiger 109, Murex Shell 105, Whate Nool 7,958); **14 PCS products** were stored as per-kg: confirm they are per piece. The old site added a hidden +1.5 to every price; it is gone.
2. **Two numbers:** call 076 117 7764, WhatsApp +94 77 834 8603 — confirm purposes.
3. **Footer developer link** goes to a `vercel.app` address — confirm.
4. **Hero video** has a "CapCut AI" watermark across the clip; I cropped it out of frame. A clean export is better.
5. **Shell photos** contain a different logo ("Seagull Shells – Sea Shell Company").
6. **"Sea Shells" and "Gavuri Shell" use the same photo** — is that intended, or is one a duplicate listing?
7. Owner-written claims kept as-is ("hand-graded", "bleached", "graded for export"), product spellings ("Whate Nool/Tiger"), minimum quantities (0.5 kg / 1 pc).
8. **Production address:** set `siteUrl` once known (README §D).
9. **GitHub privacy:** `source/` and `project-notes/` are public on GitHub Pages.
