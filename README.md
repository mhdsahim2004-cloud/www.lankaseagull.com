# Lanka Seagull (Pvt) Ltd — Website

A static website made of plain HTML, CSS and JavaScript. It needs no server software, database or Node.js to host, and works on standard shared hosting and GitHub Pages.

## Folder structure

```
index.html  products.html  about.html  gallery.html  contact.html  cart.html  404.html
css/style.css            all styling
js/app.js                all behaviour (menu, filters, cart, dialogs, forms, currency)
js/data.js               product + company data for the browser (GENERATED – do not edit by hand)
images/                  original photos, logo files, favicon, social-share image
images/thumbs/           640 px WebP versions used on product cards and the gallery
videos/                  hero video (MP4 + WebM) and poster image
fonts/                   self-hosted fonts (no Google Fonts requests)
source/products.json     SOURCE OF TRUTH for all products and prices
source/site-config.json  production web address (empty until you know it)
source/build.py          optional page generator (Python 3.8+)
project-notes/           audit reports and price-review.csv (not part of the public site)
.htaccess                optional Apache settings   |   .nojekyll   GitHub Pages marker
```

**Important:** the seven `.html` pages and `js/data.js` are *generated* from `source/products.json`, `source/site-config.json` and the company block at the top of `source/build.py`. Change data there and re-run the build; if you edit the generated HTML or `data.js` directly, your edits will be overwritten the next time the build runs. `css/style.css` and `js/app.js` are normal hand-edited files.

---

## A. Working on it in VS Code

1. Install VS Code, then **File → Open Folder…** and choose this folder.
2. Install the **Live Server** extension (Ritwick Dey), right-click `index.html` → **Open with Live Server**. (Or in the VS Code terminal: `python3 -m http.server 8000`, then open http://localhost:8000.) Use a local server rather than double-clicking the file: opened straight from disk, browsers block font preloading and show harmless console messages.
3. Edit `css/style.css` or `js/app.js` and the browser refreshes.
4. To change **products, prices, availability or company details**, edit `source/products.json` (or the `COMPANY` block in `source/build.py`), then in the VS Code terminal run:
   ```
   python3 source/build.py
   ```
   It prints what it built. Refresh the browser.
5. Hard-refresh (Ctrl+F5 / Cmd+Shift+R) if you do not see a change: browsers cache CSS/JS.

### Product data rules (`source/products.json`)
- `unit`: `"kg"` (minimum 0.5, steps of 0.5) or `"pcs"` (whole pieces).
- `price`: number in LKR **per that unit**, or `null` with `"priceStatus": "on-request"` to show "Price on request".
- `available`: `true` / `false` (false disables the Add button). `featured`: `true` shows it on the home page (first 6 featured are used).
- `image`: path such as `images/curry-fish.jpg`. For every new photo also add a ~640 px WebP copy named the same in `images/thumbs/` (e.g. `images/thumbs/curry-fish.webp`).
- `id` and `slug` must be unique. Never reuse an `id` (carts store it).

## B. Putting it on shared hosting (cPanel, Plesk, FTP)

1. Open the host's **File Manager** (or an FTP program) and go to the web root (`public_html`, `www` or `htdocs`).
2. Upload **the contents of this folder** so that `index.html` sits directly in the web root, keeping the sub-folders. You do **not** need to upload `source/`, `project-notes/` or `README.md` (keeping them off the server is the safest choice).
3. Open your domain and check each page.
4. `.htaccess` is optional and Apache-only (custom 404 page, compression, caching, hides `source/` and `project-notes/` if they are present). If your host shows a "500 error" after upload, delete that one file. If the site is in a sub-folder, change `ErrorDocument 404 /404.html` inside it to `/your-folder/404.html`.
5. When you know your final web address, set it in `source/site-config.json` (see section D) and rebuild.

## C. Putting it on GitHub Pages

1. Create a repository on github.com (for example `lanka-seagull-website`).
2. In VS Code open the Source Control panel → **Initialize Repository**, commit everything, then publish to GitHub (or in a terminal: `git init`, `git add .`, `git commit -m "Website"`, `git branch -M main`, `git remote add origin <repo-url>`, `git push -u origin main`).
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main`, folder `/ (root)` → Save.** After a minute the site is at `https://YOUR-NAME.github.io/REPO-NAME/`.
4. Set that address in `source/site-config.json` as `"siteUrl": "https://YOUR-NAME.github.io/REPO-NAME/"` (with the final slash), run `python3 source/build.py`, commit and push. This is what makes the 404 page, canonical links, social-share image and sitemap use the correct address. Without it the 404 page's buttons point to the domain root, which is wrong for a GitHub project site.
5. Custom domain: add it under Settings → Pages, set the DNS records GitHub shows, then change `siteUrl` to the custom domain and rebuild.

Notes: on GitHub Pages everything in the repository is public, including `source/products.json` and `project-notes/` (these contain internal price notes). If that matters, keep the repository private (needs a paid plan for Pages) or delete `project-notes/` and the `reviewNotes` fields before publishing. `.nojekyll` is included so GitHub serves the files as they are.

## D. Setting the production address (canonical links, share image, sitemap)

Edit `source/site-config.json`:
```json
{ "siteUrl": "https://www.yourdomain.com/" }
```
then run `python3 source/build.py`. This adds canonical links, `og:url`/`og:image` (using `images/og-image.jpg`), `sitemap.xml` and `robots.txt`, and makes `404.html` links absolute. Leave it empty until the address is final.

## E. Which files to upload after each kind of change

Always upload into the same folder on the server and overwrite the old file. (This list was produced by making each change and checking which files the build actually rewrote.)

| You changed… | Upload these files |
|---|---|
| A product's **price** (a featured product) | `index.html`, `products.html`, `js/data.js` |
| A product's **price** or **availability** (not featured) | `products.html`, `js/data.js` |
| A product's **name / description** (not featured) | `products.html`, `gallery.html`, `js/data.js` |
| A **featured** product's name | `index.html`, `products.html`, `about.html`, `gallery.html`, `js/data.js` |
| Turn **featured** on/off for a product | `index.html`, `products.html` |
| **Add a new product** | `index.html`, `products.html`, `about.html`, `gallery.html`, `js/data.js`, plus the new photo `images/<name>.jpg` and `images/thumbs/<name>.webp` |
| **Swap a product photo** (same file name) | just the new `images/<name>.jpg` and `images/thumbs/<name>.webp` |
| **Phone, WhatsApp, email, address, social links** | `index.html`, `products.html`, `about.html`, `gallery.html`, `contact.html`, `cart.html` and `js/data.js`; plus `404.html` only if the email changed |
| **Production address** (`siteUrl`) | `index.html`, `products.html`, `about.html`, `gallery.html`, `contact.html`, `cart.html`, `sitemap.xml`, `robots.txt`; plus `404.html` if the address contains a folder (GitHub project sites) |
| **Styling** (`css/style.css`) | `css/style.css` only |
| **Behaviour** (`js/app.js`) | `js/app.js` only |
| **Hero video** | `videos/lanka-seagull-hero.mp4`, `videos/lanka-seagull-hero.webm` (and `videos/hero-poster.jpg` if you changed the poster) |
| **Fonts / logo** | the changed file in `fonts/` or `images/` |

If unsure, upload everything except `source/` and `project-notes/`.

## F. How ordering works (important)

There is no backend, so the site cannot store orders or take payment. The cart builds a written **enquiry** that opens in WhatsApp (+94 77 834 8603) or the visitor's email app. Nothing is sent until the visitor presses Send there, and the site says so. To receive enquiries automatically you would need a form service or a small backend; that can be added with a separate project.

## G. Hosting note

The site is static and simple to move between hosts. It is already configured to work as a flat set of HTML files without any build step in production.

---

This project is intentionally simple: content is data-driven and the generated pages are stored alongside the files that ship to the live site.
