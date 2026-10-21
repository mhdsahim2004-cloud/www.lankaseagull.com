/* Lanka Seagull (Pvt) Ltd — site behaviour
   No dependencies. All dynamic content is inserted with textContent / DOM methods (no innerHTML with user or data values).
   Business data lives in data.js (generated from source/products.json). */
(function () {
  "use strict";
  var LS = window.LS;
  if (!LS) { return; }
  var PAGE = document.body.getAttribute("data-page") || "home";

  /* ---------------------------------------------------------------- helpers */
  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function h(tag, attrs) {
    var el = document.createElement(tag);
    if (attrs) { Object.keys(attrs).forEach(function (k) {
      var v = attrs[k];
      if (v === false || v == null) { return; }
      if (k === "class") { el.className = v; }
      else if (k === "text") { el.textContent = v; }
      else if (k === "on") { Object.keys(v).forEach(function (ev) { el.addEventListener(ev, v[ev]); }); }
      else { el.setAttribute(k, v === true ? "" : v); }
    }); }
    for (var i = 2; i < arguments.length; i++) {
      var c = arguments[i];
      if (c == null || c === false) { continue; }
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return el;
  }
  function round2(n) { return Math.round(n * 100) / 100; }
  function byId(id) { for (var i = 0; i < LS.products.length; i++) { if (LS.products[i].id === id) { return LS.products[i]; } } return null; }
  function bySlug(s) { for (var i = 0; i < LS.products.length; i++) { if (LS.products[i].slug === s) { return LS.products[i]; } } return null; }
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* safe storage with in-memory fallback (private mode / blocked storage) */
  var mem = {};
  var store = {
    get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return Object.prototype.hasOwnProperty.call(mem, k) ? mem[k] : null; } },
    set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { mem[k] = v; } }
  };
  function readJSON(k) { try { var r = store.get(k); return r ? JSON.parse(r) : null; } catch (e) { return null; } }

  /* ------------------------------------------------------------------ toast */
  function toast(msg) {
    var wrap = $("#toasts"); if (!wrap) { return; }
    while (wrap.children.length > 2) { wrap.removeChild(wrap.firstChild); }
    var t = h("div", { class: "toast", text: msg });
    wrap.appendChild(t);
    setTimeout(function () { t.classList.add("out"); setTimeout(function () { if (t.parentNode) { t.parentNode.removeChild(t); } }, 320); }, 2800);
  }

  /* ----------------------------------------------------------------- dialogs */
  var openCount = 0;
  function focusables(root) {
    return $$('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])', root)
      .filter(function (el) { return el.getClientRects().length > 0; });
  }
  function Dialog(overlay, opts) {
    opts = opts || {};
    var panel = $(".dialog", overlay), lastFocus = null, isOpen = false;
    function onKey(e) {
      if (!isOpen) { return; }
      if (e.key === "Escape") { e.preventDefault(); close(); return; }
      if (opts.onKey && opts.onKey(e)) { return; }
      if (e.key === "Tab") {
        var f = focusables(panel); if (!f.length) { e.preventDefault(); return; }
        var first = f[0], last = f[f.length - 1];
        if (e.shiftKey && (document.activeElement === first || document.activeElement === panel)) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    }
    function open(trigger) {
      if (isOpen) { return; }
      isOpen = true; lastFocus = trigger || document.activeElement;
      overlay.classList.add("open");
      openCount++; document.body.style.overflow = "hidden";
      document.addEventListener("keydown", onKey);
      setTimeout(function () { var f = opts.initialFocus ? $(opts.initialFocus, overlay) : null; (f || $("[data-close]", overlay) || panel).focus(); }, 30);
      if (opts.onOpen) { opts.onOpen(); }
    }
    function close() {
      if (!isOpen) { return; }
      isOpen = false;
      overlay.classList.remove("open");
      openCount = Math.max(0, openCount - 1); if (!openCount) { document.body.style.overflow = ""; }
      document.removeEventListener("keydown", onKey);
      if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
      if (opts.onClose) { opts.onClose(); }
    }
    overlay.addEventListener("mousedown", function (e) { if (e.target === overlay) { close(); } });
    $$("[data-close]", overlay).forEach(function (b) { b.addEventListener("click", close); });
    return { open: open, close: close, isOpen: function () { return isOpen; } };
  }

  /* ---------------------------------------------------------------- currency */
  var PREFS_KEY = "lankaSeagullPrefs", RATES_KEY = "lankaSeagullRates";
  function curByCode(c) { for (var i = 0; i < LS.currencies.length; i++) { if (LS.currencies[i].code === c) { return LS.currencies[i]; } } return null; }
  var prefs = (function () {
    var p = readJSON(PREFS_KEY); // older versions also stored a "language" field; only currency is used now
    var code = p && typeof p.currency === "string" && curByCode(p.currency) ? p.currency : "LKR";
    return { currency: code };
  })();
  var rates = { map: {}, source: "indicative", date: null };
  LS.currencies.forEach(function (c) { rates.map[c.code] = c.rate; });

  function loadCachedRates() {
    var c = readJSON(RATES_KEY);
    if (c && c.map && c.at && Date.now() - c.at < 12 * 3600 * 1000) {
      LS.currencies.forEach(function (cur) { if (typeof c.map[cur.code] === "number" && isFinite(c.map[cur.code]) && c.map[cur.code] > 0) { rates.map[cur.code] = c.map[cur.code]; } });
      rates.source = "live"; rates.date = c.date || null; return true;
    }
    return false;
  }
  function fetchLiveRates() {
    if (typeof fetch !== "function") { return Promise.resolve(false); }
    var ctrl = window.AbortController ? new AbortController() : null;
    var timer = setTimeout(function () { if (ctrl) { ctrl.abort(); } }, 6000);
    return fetch(LS.rates.liveEndpoint, { cache: "no-store", signal: ctrl ? ctrl.signal : undefined })
      .then(function (r) { if (!r.ok) { throw new Error("http " + r.status); } return r.json(); })
      .then(function (d) {
        clearTimeout(timer);
        if (!d || d.result !== "success" || !d.rates || typeof d.rates !== "object") { throw new Error("bad payload"); }
        var map = {}, ok = 0;
        LS.currencies.forEach(function (c) {
          var v = d.rates[c.code];
          if (typeof v === "number" && isFinite(v) && v > 0) { map[c.code] = v; ok++; }
        });
        if (ok < LS.currencies.length) { throw new Error("incomplete rates"); }
        var date = d.time_last_update_unix ? new Date(d.time_last_update_unix * 1000).toISOString().slice(0, 10) : null;
        LS.currencies.forEach(function (c) { rates.map[c.code] = map[c.code]; });
        rates.source = "live"; rates.date = date;
        store.set(RATES_KEY, JSON.stringify({ map: map, date: date, at: Date.now() }));
        return true;
      })
      .catch(function () { clearTimeout(timer); return false; });
  }
  function fmtNum(n, dp) { return n.toLocaleString("en-US", { minimumFractionDigits: dp, maximumFractionDigits: 2 }); }
  function fmtLkr(n) { return "Rs " + fmtNum(round2(n), 0); }
  function fmtAlt(lkr) {
    var cur = curByCode(prefs.currency);
    if (!cur || cur.code === "LKR") { return ""; }
    var v = lkr * rates.map[cur.code];
    return "≈ " + cur.symbol + " " + fmtNum(v, 2);
  }
  function altSuffix() { return rates.source === "live" ? " (estimate)" : " (indicative estimate)"; }
  function refreshCurrencyUI() {
    var lab = $("#prefLabel"); if (lab) { lab.textContent = prefs.currency; }
    var btn = $("#prefOpen"); if (btn) { btn.setAttribute("aria-label", "Display currency: " + prefs.currency + ". Change currency"); }
    $$(".product-card[data-price]").forEach(function (card) {
      var alt = $("[data-price-alt]", card), unit = LS.units[card.getAttribute("data-unit")].label, a = fmtAlt(parseFloat(card.getAttribute("data-price")));
      if (alt) { alt.textContent = a ? a + " / " + unit + altSuffix() : ""; }
    });
    document.dispatchEvent(new CustomEvent("ls:currency"));
  }

  function initPrefs() {
    var overlay = $("#prefOverlay"); if (!overlay) { return; }
    var optsWrap = $("#prefOptions"), status = $("#prefStatus"), pending = prefs.currency;
    function statusText() {
      if (pending === "LKR") { return "LKR is our listed price currency."; }
      if (rates.source === "live") { return "Live exchange rate" + (rates.date ? " (updated " + rates.date + ")" : "") + ". Converted amounts are estimates only."; }
      return "Indicative exchange rate (live rates unavailable). Converted amounts are rough estimates only.";
    }
    function renderOptions() {
      optsWrap.textContent = "";
      LS.currencies.forEach(function (c) {
        var input = h("input", { type: "radio", name: "prefCur", value: c.code, checked: c.code === pending });
        input.addEventListener("change", function () {
          pending = c.code; status.textContent = "Checking exchange rate…";
          (c.code === "LKR" || rates.source === "live" ? Promise.resolve(true) : fetchLiveRates()).then(function () { status.textContent = statusText(); });
        });
        optsWrap.appendChild(h("label", { class: "pref-option" }, input, h("span", { text: c.label })));
      });
      status.textContent = statusText();
    }
    var dlg = Dialog(overlay, { initialFocus: 'input[name="prefCur"]:checked' });
    $("#prefOpen").addEventListener("click", function (e) { pending = prefs.currency; renderOptions(); dlg.open(e.currentTarget); });
    $("#prefSave").addEventListener("click", function () {
      prefs.currency = pending; store.set(PREFS_KEY, JSON.stringify({ currency: prefs.currency, v: 2 }));
      dlg.close(); refreshCurrencyUI();
      toast(prefs.currency === "LKR" ? "Showing prices in LKR" : "Showing estimated prices in " + prefs.currency + " (LKR remains the listed price)");
    });
  }

  /* -------------------------------------------------------------------- cart */
  var CART_KEY = "lankaSeagullCartV2", MAX_QTY = { kg: 10000, pcs: 100000 }, CART_TTL = 30 * 24 * 3600 * 1000;
  function normQty(raw, unit) {
    var u = LS.units[unit] || LS.units.kg;
    var n = parseFloat(String(raw).replace(",", "."));
    if (!isFinite(n)) { n = u.min; }
    n = Math.round(n / u.step) * u.step;
    n = Math.min(Math.max(n, u.min), MAX_QTY[unit] || 10000);
    return round2(n);
  }
  function fmtQty(n) { return String(round2(n)); }
  var cart = { items: [] };
  function loadCart() {
    var raw = readJSON(CART_KEY), items = [];
    if (raw && raw.v === 2 && Array.isArray(raw.items) && raw.at && Date.now() - raw.at < CART_TTL) {
      raw.items.forEach(function (it) {
        var p = it && typeof it.id === "string" ? byId(it.id) : null;
        if (p && p.available && !items.some(function (x) { return x.id === p.id; })) { items.push({ id: p.id, qty: normQty(it.qty, p.unit) }); }
      });
    }
    cart.items = items;
  }
  function saveCart() { store.set(CART_KEY, JSON.stringify({ v: 2, at: Date.now(), items: cart.items })); }
  function cartFind(id) { for (var i = 0; i < cart.items.length; i++) { if (cart.items[i].id === id) { return cart.items[i]; } } return null; }
  function lineTotal(it) { var p = byId(it.id); return p && p.price != null ? round2(p.price * it.qty) : null; }
  function cartTotals() {
    var total = 0, onRequest = 0;
    cart.items.forEach(function (it) { var l = lineTotal(it); if (l == null) { onRequest++; } else { total += l; } });
    return { total: round2(total), onRequest: onRequest, count: cart.items.length };
  }
  function updateBadge(pop) {
    var n = cart.items.length, el = $("#cartCount"), link = $("#cartLink");
    if (el) { el.textContent = String(n); el.setAttribute("data-count", String(n)); if (pop && !reduceMotion) { el.classList.remove("pop"); void el.offsetWidth; el.classList.add("pop"); } }
    if (link) { link.setAttribute("aria-label", "Order cart, " + n + (n === 1 ? " item" : " items")); }
  }
  function addToCart(id, qty) {
    var p = byId(id); if (!p || !p.available) { return null; }
    var it = cartFind(id), q = normQty(qty, p.unit);
    if (it) { it.qty = normQty(it.qty + q, p.unit); } else { it = { id: id, qty: q }; cart.items.push(it); }
    saveCart(); updateBadge(true); return it;
  }
  function setCartQty(id, qty) { var it = cartFind(id), p = byId(id); if (!it || !p) { return null; } it.qty = normQty(qty, p.unit); saveCart(); updateBadge(false); return it; }
  function removeFromCart(id) { cart.items = cart.items.filter(function (i) { return i.id !== id; }); saveCart(); updateBadge(false); }
  function clearCart() { cart.items = []; saveCart(); updateBadge(false); }

  /* quantity widgets (product cards, product dialog, cart rows) */
  function qtyRead(widget) { return $("input", widget); }
  function qtyStep(widget, dir) {
    var unit = widget.getAttribute("data-unit"), u = LS.units[unit], inp = qtyRead(widget);
    var cur = normQty(inp.value, unit);
    inp.value = fmtQty(normQty(cur + dir * u.step, unit));
    inp.dispatchEvent(new Event("change", { bubbles: true }));
  }
  function qtyCommit(widget) {
    var unit = widget.getAttribute("data-unit"), inp = qtyRead(widget), raw = parseFloat(String(inp.value).replace(",", "."));
    var n = normQty(inp.value, unit);
    if (!isFinite(raw) || Math.abs(raw - n) > 1e-9) { toast("Quantity set to " + fmtQty(n) + " " + LS.units[unit].label + " (minimum " + LS.units[unit].min + ", steps of " + LS.units[unit].step + ")"); }
    inp.value = fmtQty(n); return n;
  }
  document.addEventListener("click", function (e) {
    var b = e.target.closest && e.target.closest("[data-qty]"); if (!b) { return; }
    var w = b.closest(".qty"); if (w) { qtyStep(w, parseInt(b.getAttribute("data-qty"), 10)); }
  });

  /* ------------------------------------------------------- product add (cards) */
  function flashAdded(btn) {
    var old = btn.getAttribute("data-label") || btn.textContent; btn.setAttribute("data-label", old);
    btn.textContent = "Added ✓"; setTimeout(function () { btn.textContent = old; }, 1300);
  }
  function addFromWidget(id, widget, btn) {
    var p = byId(id); if (!p) { return; }
    var q = qtyCommit(widget), it = addToCart(id, q); if (!it) { return; }
    toast(p.name + ": " + fmtQty(q) + " " + LS.units[p.unit].label + " added to cart");
    if (btn) { flashAdded(btn); }
  }
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest("[data-add]"); if (!btn) { return; }
    var card = btn.closest(".product-card"); if (!card) { return; }
    addFromWidget(btn.getAttribute("data-add"), $(".qty", card), btn);
  });
  document.addEventListener("change", function (e) {
    var t = e.target; if (t.matches && t.matches(".product-card .qty input")) { qtyCommit(t.closest(".qty")); }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && e.target.matches && e.target.matches(".product-card .qty input")) { e.preventDefault(); qtyCommit(e.target.closest(".qty")); }
  });

  /* ---------------------------------------------------------------- navigation */
  function initNav() {
    var tog = $("#navToggle"), panel = $("#mobilePanel"); if (!tog || !panel) { return; }
    function set(open) {
      panel.classList.toggle("open", open); tog.setAttribute("aria-expanded", String(open));
      tog.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    }
    tog.addEventListener("click", function () { set(!panel.classList.contains("open")); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && panel.classList.contains("open")) { set(false); tog.focus(); } });
    document.addEventListener("click", function (e) { if (panel.classList.contains("open") && !panel.contains(e.target) && !tog.contains(e.target)) { set(false); } });
    $$("a", panel).forEach(function (a) { a.addEventListener("click", function () { set(false); }); });
    window.addEventListener("resize", function () { if (window.innerWidth >= 960) { set(false); } });
  }

  /* ------------------------------------------------------------- scroll reveal */
  // After the reveal finishes, drop the attribute so the element's own hover transitions apply without the reveal delay.
  function settle(el) {
    el.classList.add("in");
    setTimeout(function () { el.removeAttribute("data-reveal"); el.style.removeProperty("--d"); }, 1100);
  }
  function initReveal() {
    var els = $$("[data-reveal]");
    if (!els.length) { return; }
    if (!("IntersectionObserver" in window) || reduceMotion) { els.forEach(function (el) { el.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { settle(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
    els.forEach(function (el) { io.observe(el); });
    // safety net: never leave content hidden
    setTimeout(function () { els.forEach(function (el) { if (!el.classList.contains("in") && el.getBoundingClientRect().top < window.innerHeight) { settle(el); } }); }, 1500);
  }

  /* image loading states */
  function initImages() {
    $$(".media").forEach(function (m) {
      var img = $("img", m); if (!img || !img.getAttribute("src")) { return; }
      function ok() { m.classList.add("loaded"); }
      function bad() { m.classList.add("loaded", "img-error"); img.style.visibility = "hidden"; }
      if (img.complete) { img.naturalWidth ? ok() : bad(); } else { img.addEventListener("load", ok); img.addEventListener("error", bad); }
    });
  }

  /* --------------------------------------------------------------- hero video */
  function initHero() {
    var v = $("#heroVideo"), btn = $("#heroToggle"); if (!v || !btn) { return; }
    var label = $("span", btn), icon = $("svg", btn), userPaused = false;
    var ICON_PLAY = '<path d="M7 4.5v15a1 1 0 0 0 1.5.9l12-7.5a1 1 0 0 0 0-1.8l-12-7.5A1 1 0 0 0 7 4.5Z"/>';
    var ICON_PAUSE = '<rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/>';
    function ui(playing) {
      label.textContent = playing ? "Pause video" : "Play video"; btn.setAttribute("aria-pressed", String(!playing));
      icon.innerHTML = playing ? ICON_PAUSE : ICON_PLAY; // static literals only
    }
    function play() { var p = v.play(); if (p && p.then) { p.then(function () { ui(true); }, function () { ui(false); }); } else { ui(true); } }
    var saveData = navigator.connection && navigator.connection.saveData;
    if (reduceMotion || saveData) { v.pause(); v.removeAttribute("autoplay"); ui(false); } else { play(); }
    btn.addEventListener("click", function () { if (v.paused) { userPaused = false; play(); } else { userPaused = true; v.pause(); ui(false); } });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        if (reduceMotion || saveData || userPaused) { return; }
        if (en[0].isIntersecting) { if (v.paused) { play(); } } else if (!v.paused) { v.pause(); }
      }, { threshold: 0.05 }).observe(v);
    }
  }

  /* --------------------------------------------------------------- products page */
  function initProducts() {
    var grid = $("#grid"); if (!grid) { return; }
    var cards = $$(".product-card", grid), q = $("#q"), qClear = $("#qClear"), sortSel = $("#sort");
    var chips = $$("#chips .chip"), line = $("#resultLine"), empty = $("#empty");
    var state = { q: "", cat: "all", sort: "featured" }, total = cards.length, timer = null;
    function price(c) { var v = c.getAttribute("data-price"); return v == null ? null : parseFloat(v); }
    function apply(push) {
      var tokens = state.q.toLowerCase().split(/\s+/).filter(Boolean), vis = [];
      cards.forEach(function (c) {
        var okCat = state.cat === "all" || c.getAttribute("data-cat") === state.cat;
        var hay = c.getAttribute("data-search"), okQ = tokens.every(function (t) { return hay.indexOf(t) !== -1; });
        var show = okCat && okQ; c.hidden = !show; if (show) { vis.push(c); c.classList.add("in"); }
      });
      var cmp = {
        featured: function (a, b) { return (b.getAttribute("data-featured") - a.getAttribute("data-featured")) || (a.getAttribute("data-order") - b.getAttribute("data-order")); },
        name: function (a, b) { return a.getAttribute("data-name").localeCompare(b.getAttribute("data-name")); },
        "price-asc": function (a, b) { var x = price(a), y = price(b); if (x == null && y == null) { return 0; } if (x == null) { return 1; } if (y == null) { return -1; } return x - y; },
        "price-desc": function (a, b) { var x = price(a), y = price(b); if (x == null && y == null) { return 0; } if (x == null) { return 1; } if (y == null) { return -1; } return y - x; }
      }[state.sort];
      cards.slice().sort(cmp).forEach(function (c) { grid.appendChild(c); });
      chips.forEach(function (ch) { ch.setAttribute("aria-pressed", String(ch.getAttribute("data-cat") === state.cat)); });
      var chipName = state.cat === "all" ? "" : " in " + $('#chips .chip[data-cat="' + state.cat + '"]').firstChild.textContent;
      line.textContent = vis.length === total && !state.q && state.cat === "all" ? "Showing all " + total + " products" : "Showing " + vis.length + " of " + total + " products" + chipName + (state.q ? " matching “" + state.q + "”" : "");
      empty.hidden = vis.length !== 0; grid.hidden = vis.length === 0;
      qClear.hidden = !state.q;
      if (push !== false && window.history && history.replaceState) {
        var p = new URLSearchParams(); if (state.cat !== "all") { p.set("cat", state.cat); } if (state.q) { p.set("q", state.q); } if (state.sort !== "featured") { p.set("sort", state.sort); }
        var qs = p.toString(); history.replaceState(null, "", location.pathname + (qs ? "?" + qs : "") + location.hash);
      }
    }
    q.addEventListener("input", function () { clearTimeout(timer); timer = setTimeout(function () { state.q = q.value.trim().slice(0, 80); apply(); }, 120); });
    q.addEventListener("keydown", function (e) { if (e.key === "Escape" && q.value) { q.value = ""; state.q = ""; apply(); } });
    qClear.addEventListener("click", function () { q.value = ""; state.q = ""; apply(); q.focus(); });
    sortSel.addEventListener("change", function () { state.sort = sortSel.value; apply(); });
    chips.forEach(function (ch) { ch.addEventListener("click", function () { state.cat = ch.getAttribute("data-cat"); apply(); }); });
    $("#resetFilters").addEventListener("click", function () { state = { q: "", cat: "all", sort: "featured" }; q.value = ""; sortSel.value = "featured"; apply(); });
    // initial state from URL
    var params = new URLSearchParams(location.search), c0 = params.get("cat");
    if (c0 && chips.some(function (ch) { return ch.getAttribute("data-cat") === c0; })) { state.cat = c0; }
    if (params.get("q")) { state.q = params.get("q").slice(0, 80); q.value = state.q; }
    if (params.get("sort") && Array.prototype.some.call(sortSel.options, function (o) { return o.value === params.get("sort"); })) { state.sort = params.get("sort"); sortSel.value = state.sort; }
    apply(false);

    /* product detail dialog */
    var overlay = $("#productOverlay"), current = null;
    var dlg = Dialog(overlay, { onClose: function () { current = null; if (/^#/.test(location.hash) && history.replaceState) { history.replaceState(null, "", location.pathname + location.search); } } });
    var qtyW = $("#pdQty");
    function openProduct(p, trigger) {
      current = p;
      var img = $("#pdImg"); img.src = p.image; img.alt = p.name + " — " + p.categoryName + " product photo";
      $("#pdCat").textContent = p.categoryName; $("#pdTitle").textContent = p.name; $("#pdDesc").textContent = p.description;
      var u = LS.units[p.unit];
      $("#pdAvail").textContent = p.available ? "Availability: available" : "Availability: currently unavailable";
      var pr = $("#pdPrice"); pr.textContent = ""; pr.className = "price";
      if (p.price == null) { pr.className = "price on-request"; pr.textContent = "Price on request"; }
      else { pr.appendChild(document.createTextNode(fmtLkr(p.price) + " ")); pr.appendChild(h("small", { text: "/ " + u.label })); }
      qtyW.setAttribute("data-unit", p.unit);
      var inp = $("input", qtyW); inp.min = u.min; inp.step = u.step; inp.value = u.min; inp.setAttribute("aria-label", "Quantity in " + u.label);
      $("#pdUnitNote").textContent = "Quantity in " + u.label + " (min " + u.min + ", steps of " + u.step + ")";
      $$("button,input", $("#pdActions")).forEach(function (el) { el.disabled = !p.available; });
      updatePdAlt();
      $("#pdWa").href = "https://wa.me/" + LS.company.whatsappE164 + "?text=" + encodeURIComponent("Hello Lanka Seagull, I would like to ask about " + p.name + ".");
      if (history.replaceState) { history.replaceState(null, "", location.pathname + location.search + "#" + p.slug); }
      dlg.open(trigger);
    }
    function updatePdAlt() {
      var a = $("#pdAlt"); if (!current || current.price == null) { a.textContent = ""; return; }
      var s = fmtAlt(current.price); a.textContent = s ? s + " / " + LS.units[current.unit].label + altSuffix() : "";
    }
    document.addEventListener("ls:currency", updatePdAlt);
    $("#pdAdd").addEventListener("click", function (e) { if (current) { addFromWidget(current.id, qtyW, e.currentTarget); } });
    $("input", qtyW).addEventListener("change", function () { qtyCommit(qtyW); });
    grid.addEventListener("click", function (e) {
      var t = e.target.closest("[data-open]"); if (!t) { return; }
      var p = byId(t.getAttribute("data-open")); if (p) { openProduct(p, t); }
    });
    function fromHash() {
      var m = location.hash.match(/^#(?:\/products\/)?([a-z0-9-]+)$/i), p = m ? bySlug(m[1]) : null;
      if (p && !dlg.isOpen()) { openProduct(p, null); }
    }
    window.addEventListener("hashchange", fromHash); fromHash();
  }

  /* --------------------------------------------------------------- gallery page */
  function initGallery() {
    var gGrid = $("#gGrid"); if (!gGrid) { return; }
    var tiles = $$(".g-item", gGrid), chips = $$("#gchips .chip"), res = $("#gResult"), current = 0, shown = tiles.slice();
    function filter(cat) {
      shown = [];
      tiles.forEach(function (t) { var s = cat === "all" || t.getAttribute("data-gcat") === cat; t.hidden = !s; if (s) { shown.push(t); } });
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.getAttribute("data-gcat") === cat)); });
      res.textContent = "Showing " + shown.length + " photos";
    }
    chips.forEach(function (c) { c.addEventListener("click", function () { filter(c.getAttribute("data-gcat")); }); });
    var overlay = $("#lightbox"), img = $("#lbImg"), cap = $("#lbCap");
    var dlg = Dialog(overlay, { onKey: function (e) { if (e.key === "ArrowLeft") { go(-1); return true; } if (e.key === "ArrowRight") { go(1); return true; } return false; } });
    function show(i) {
      current = (i + shown.length) % shown.length; var t = shown[current];
      img.classList.remove("loaded"); img.src = t.getAttribute("data-full"); img.alt = t.getAttribute("data-alt");
      cap.textContent = t.getAttribute("data-title") + "  (" + (current + 1) + " of " + shown.length + ")";
    }
    function go(d) { if (shown.length > 1) { show(current + d); } }
    gGrid.addEventListener("click", function (e) { var t = e.target.closest(".g-item"); if (!t) { return; } show(shown.indexOf(t)); dlg.open(t); });
    $("#lbPrev").addEventListener("click", function () { go(-1); });
    $("#lbNext").addEventListener("click", function () { go(1); });
    var sx = null;
    overlay.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    overlay.addEventListener("touchend", function (e) { if (sx == null) { return; } var dx = e.changedTouches[0].clientX - sx; if (Math.abs(dx) > 50) { go(dx < 0 ? 1 : -1); } sx = null; }, { passive: true });
  }

  /* --------------------------------------------------- shared enquiry plumbing */
  function clean(s, max, multiline) {
    s = String(s == null ? "" : s).replace(multiline ? /[\u0000-\u0009\u000B-\u001F\u007F]/g : /[\u0000-\u001F\u007F]/g, " ");
    s = multiline ? s.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n") : s.replace(/\s+/g, " ");
    return s.trim().slice(0, max);
  }
  function validPhone(s) { var d = s.replace(/[^\d]/g, ""); return /^[\d+\-()\s.]+$/.test(s) && d.length >= 7 && d.length <= 15; }
  function validEmail(s) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s); }
  function setErr(input, msg) {
    var err = document.getElementById(input.getAttribute("aria-describedby")); if (err) { err.textContent = msg || ""; }
    if (msg) { input.setAttribute("aria-invalid", "true"); } else { input.removeAttribute("aria-invalid"); }
  }
  function waUrl(text) { return "https://wa.me/" + LS.company.whatsappE164 + "?text=" + encodeURIComponent(text); }
  function mailUrl(subject, body) { return "mailto:" + LS.company.email + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body); }
  function openNewTab(url) {
    var a = h("a", { href: url, target: "_blank", rel: "noopener noreferrer" }); a.style.display = "none";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
  }
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) { return navigator.clipboard.writeText(text); }
    return new Promise(function (res, rej) {
      var ta = h("textarea", { "aria-hidden": "true" }); ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? res() : rej(); } catch (e) { rej(e); } document.body.removeChild(ta);
    });
  }
  function lockButtons(btns, ms) {
    btns.forEach(function (b) { b.disabled = true; });
    setTimeout(function () { btns.forEach(function (b) { b.disabled = false; }); }, ms || 4000);
  }

  /* ------------------------------------------------------------------ contact */
  function initContact() {
    var form = $("#contactForm"); if (!form) { return; }
    var f = { name: $("#cf-name"), phone: $("#cf-phone"), email: $("#cf-email"), msg: $("#cf-msg") }, status = $("#cfStatus");
    function collect() {
      var d = { name: clean(f.name.value, 80), phone: clean(f.phone.value, 25), email: clean(f.email.value, 120), message: clean(f.msg.value, 1200, true) }, bad = [];
      setErr(f.name, d.name.length < 2 ? "Please enter your name." : ""); if (d.name.length < 2) { bad.push(f.name); }
      setErr(f.phone, !validPhone(d.phone) ? "Please enter a valid phone or WhatsApp number." : ""); if (!validPhone(d.phone)) { bad.push(f.phone); }
      var eb = d.email && !validEmail(d.email); setErr(f.email, eb ? "Please enter a valid email address or leave it empty." : ""); if (eb) { bad.push(f.email); }
      setErr(f.msg, d.message.length < 5 ? "Please write a short message." : ""); if (d.message.length < 5) { bad.push(f.msg); }
      if (bad.length) { bad[0].focus(); status.textContent = ""; return null; }
      return d;
    }
    function text(d) { return "Enquiry from the Lanka Seagull website contact form\nName: " + d.name + "\nPhone: " + d.phone + (d.email ? "\nEmail: " + d.email : "") + "\n\n" + d.message; }
    function note(msg, cls) { status.textContent = ""; status.appendChild(h("p", { class: "status " + cls, text: msg })); }
    $("#cfWa").addEventListener("click", function (e) {
      var d = collect(); if (!d) { return; }
      lockButtons([e.currentTarget, $("#cfMail")]); openNewTab(waUrl(text(d)));
      note("WhatsApp should now be open with your message ready. It has not been sent until you press Send in WhatsApp.", "warn");
    });
    $("#cfMail").addEventListener("click", function (e) {
      var d = collect(); if (!d) { return; }
      lockButtons([e.currentTarget, $("#cfWa")]); window.location.href = mailUrl("Website enquiry from " + d.name, text(d));
      note("Your email app should now be open with your message ready. It has not been sent until you press Send in your email app. If nothing opened, email " + LS.company.email + " directly.", "warn");
    });
    form.addEventListener("submit", function (e) { e.preventDefault(); });
  }

  /* --------------------------------------------------------------------- cart page */
  function initCartPage() {
    var root = $("#cartRoot"); if (!root) { return; }
    var refs = {};
    function render() {
      root.textContent = ""; refs = {};
      if (!cart.items.length) {
        root.appendChild(h("div", { class: "cart-empty" },
          h("h2", { text: "Your cart is empty" }),
          h("p", { class: "lead", style: "margin:.6rem auto 0", text: "Add products from the catalogue, choose KG or PCS quantities, then send us your enquiry." }),
          h("a", { class: "btn btn-navy", href: "products.html", text: "Browse products" })));
        return;
      }
      var list = h("ul", { class: "cart-items", "aria-label": "Items in your cart" });
      cart.items.forEach(function (it) { list.appendChild(row(it)); });
      var left = h("div", null, h("h2", { text: "Items", id: "cartHeading", tabindex: "-1", style: "font-size:1.5rem;margin-bottom:1rem" }), list,
        h("p", { style: "margin-top:1rem" }, h("a", { class: "text-link", href: "products.html", text: "← Continue browsing" }), document.createTextNode("   "),
          h("button", { type: "button", class: "link-btn", style: "margin-left:1rem", on: { click: function () { if (window.confirm("Remove all items from your cart?")) { clearCart(); render(); } } }, text: "Clear cart" })));
      refs.total = h("p", { class: "total" }); refs.alt = h("p", { class: "alt" }); refs.meta = h("p", { class: "alt" });
      var aside = h("aside", { class: "summary", "aria-labelledby": "sumTitle" },
        h("h2", { id: "sumTitle", text: "Estimated total" }), refs.total, refs.alt, refs.meta,
        h("p", { class: "fine", text: "Guide prices in LKR. Our team confirms final prices, availability and delivery. This website takes no payment and an enquiry is not a confirmed order." }));
      root.appendChild(h("div", { class: "cart-layout" }, left, aside));
      root.appendChild(enquiryForm());
      updateTotals();
    }
    function row(it) {
      var p = byId(it.id), u = LS.units[p.unit];
      var inp = h("input", { type: "number", inputmode: "decimal", min: u.min, step: u.step, value: fmtQty(it.qty), "aria-label": "Quantity of " + p.name + " in " + u.label });
      var w = h("div", { class: "qty", "data-unit": p.unit },
        h("button", { type: "button", "data-qty": "-1", "aria-label": "Decrease quantity of " + p.name, text: "−" }), inp,
        h("button", { type: "button", "data-qty": "1", "aria-label": "Increase quantity of " + p.name, text: "+" }));
      var lineEl = h("p", { class: "price" }), lineAlt = h("span", { class: "price-alt" });
      inp.addEventListener("change", function () { var n = qtyCommit(w); setCartQty(p.id, n); updateLine(); updateTotals(); });
      function updateLine() {
        var cur = cartFind(p.id), l = cur ? lineTotal(cur) : null;
        lineEl.textContent = l == null ? "Price on request" : fmtLkr(l); lineEl.className = l == null ? "price on-request" : "price";
        lineAlt.textContent = l == null ? "" : fmtAlt(l); lineAlt.setAttribute("data-alt-lkr", l == null ? "" : String(l));
      }
      updateLine(); refs[p.id] = updateLine;
      var unitTxt = p.price == null ? "Price on request" : fmtLkr(p.price) + " / " + u.label;
      return h("li", { class: "cart-item" },
        h("div", { class: "thumb" }, h("img", { src: p.thumb, alt: p.name, width: "96", height: "96", loading: "lazy" })),
        h("div", null, h("h3", { text: p.name }), h("p", { class: "unit-price", text: p.categoryName + " · " + unitTxt }),
          h("div", { class: "controls" }, w, h("button", { type: "button", class: "link-btn", "aria-label": "Remove " + p.name + " from cart", on: { click: function () { removeFromCart(p.id); toast(p.name + " removed"); render(); var hd = $("#cartHeading") || $("#cartRoot h2"); if (hd) { hd.focus(); } } }, text: "Remove" }))),
        h("div", { class: "line" }, lineEl, lineAlt));
    }
    function updateTotals() {
      var t = cartTotals(); if (!refs.total) { return; }
      refs.total.textContent = fmtLkr(t.total);
      var a = fmtAlt(t.total); refs.alt.textContent = a ? a + altSuffix() : "";
      var parts = [t.count + (t.count === 1 ? " product" : " products")];
      if (t.onRequest) { parts.push(t.onRequest + (t.onRequest === 1 ? " item" : " items") + " priced on request, not included in the total"); }
      refs.meta.textContent = parts.join(" · ");
    }
    document.addEventListener("ls:currency", function () {
      if (!$("#cartRoot .cart-item")) { return; }
      cart.items.forEach(function (it) { if (refs[it.id]) { refs[it.id](); } }); updateTotals();
    });

    function field(id, label, opts) {
      opts = opts || {};
      var input = h(opts.textarea ? "textarea" : "input", { id: id, name: id, required: !!opts.required, maxlength: opts.max, autocomplete: opts.ac, type: opts.textarea ? false : (opts.type || "text"), inputmode: opts.inputmode, rows: opts.textarea ? "3" : false, "aria-describedby": id + "-err" });
      return h("div", { class: "field" }, h("label", { for: id }, label, opts.optional ? h("span", { class: "opt", text: " (optional)" }) : null), input, h("span", { class: "err", id: id + "-err" }));
    }
    function enquiryForm() {
      var status = h("div", { role: "status", "aria-live": "polite" });
      var wa = h("button", { type: "button", class: "btn btn-wa", id: "ceWa" }), mail = h("button", { type: "button", class: "btn btn-navy", id: "ceMail" });
      wa.textContent = "Send enquiry via WhatsApp"; mail.textContent = "Send enquiry by email";
      var copy = h("button", { type: "button", class: "btn btn-outline", text: "Copy enquiry text" });
      var form = h("form", { class: "form enquiry", id: "enquiryForm", novalidate: true },
        h("div", null, h("h2", { text: "Your details", style: "font-size:1.5rem" }),
          h("p", { class: "hint", style: "margin-top:.4rem", text: "We use these only to build your enquiry message. Nothing is stored on this website and nothing is sent until you press Send in WhatsApp or your email app." })),
        h("div", { class: "form-row two" }, field("ce-name", "Full name", { required: true, max: 80, ac: "name" }), field("ce-phone", "Phone or WhatsApp number", { required: true, max: 25, ac: "tel", type: "tel" })),
        field("ce-email", "Email", { optional: true, max: 120, ac: "email", type: "email" }),
        h("div", { class: "form-row two" }, field("ce-country", "Country", { required: true, max: 60, ac: "country-name" }), field("ce-city", "City or town", { required: true, max: 60, ac: "address-level2" })),
        field("ce-address", "Delivery address or destination", { required: true, max: 200, ac: "street-address" }),
        field("ce-notes", "Notes", { optional: true, max: 500, textarea: true }),
        h("div", { class: "form-actions two" }, wa, mail), copy, status);
      function ids(k) { return form.querySelector("#ce-" + k); }
      function collect() {
        if (!cart.items.length) { note("Your cart is empty. Add at least one product first.", "bad"); return null; }
        var d = { name: clean(ids("name").value, 80), phone: clean(ids("phone").value, 25), email: clean(ids("email").value, 120), country: clean(ids("country").value, 60), city: clean(ids("city").value, 60), address: clean(ids("address").value, 200), notes: clean(ids("notes").value, 500, true) }, bad = [];
        function chk(k, cond, msg) { var inp = ids(k); setErr(inp, cond ? "" : msg); if (!cond) { bad.push(inp); } }
        chk("name", d.name.length >= 2, "Please enter your full name.");
        chk("phone", validPhone(d.phone), "Please enter a valid phone or WhatsApp number (7–15 digits).");
        chk("email", !d.email || validEmail(d.email), "Please enter a valid email address or leave it empty.");
        chk("country", d.country.length >= 2, "Please enter your country.");
        chk("city", d.city.length >= 2, "Please enter your city or town.");
        chk("address", d.address.length >= 5, "Please enter a delivery address or destination.");
        if (bad.length) { bad[0].focus(); note("Please correct the highlighted fields.", "bad"); return null; }
        status.textContent = ""; return d;
      }
      function note(msg, cls) { status.textContent = ""; status.appendChild(h("p", { class: "status " + cls, text: msg })); }
      function message(d) {
        var t = cartTotals(), lines = cart.items.map(function (it, i) {
          var p = byId(it.id), u = LS.units[p.unit].label, l = lineTotal(it);
          return (i + 1) + ". " + p.name + " — " + fmtQty(it.qty) + " " + u + (l == null ? " — price on request" : " × " + fmtLkr(p.price) + " = " + fmtLkr(l));
        });
        var m = "New order ENQUIRY from the Lanka Seagull website (not a confirmed order)\n\nName: " + d.name + "\nPhone: " + d.phone + (d.email ? "\nEmail: " + d.email : "") +
          "\nDestination: " + d.address + ", " + d.city + ", " + d.country + "\n\nItems:\n" + lines.join("\n") +
          "\n\nEstimated total (LKR guide prices): " + fmtLkr(t.total) + (t.onRequest ? " + " + t.onRequest + " item(s) priced on request" : "") + "\nPlease confirm availability, final prices and delivery.";
        if (d.notes) { m += "\n\nNotes: " + d.notes; }
        return m;
      }
      var sentAt = 0;
      function recentlySent() { return Date.now() - sentAt < 4000; }
      wa.addEventListener("click", function () {
        if (recentlySent()) { return; } var d = collect(); if (!d) { return; }
        sentAt = Date.now(); lockButtons([wa, mail]); openNewTab(waUrl(message(d)));
        note("WhatsApp should now be open with your enquiry written out. It has NOT been sent until you press Send there, and it is an enquiry, not a confirmed order. Our team will reply to confirm availability, final price and delivery. Your cart is kept here until you clear it.", "warn");
      });
      mail.addEventListener("click", function () {
        if (recentlySent()) { return; } var d = collect(); if (!d) { return; }
        var m = message(d); sentAt = Date.now(); lockButtons([wa, mail]);
        window.location.href = mailUrl("Order enquiry from " + d.name, m);
        note("Your email app should now be open with your enquiry. It has NOT been sent until you press Send there, and it is an enquiry, not a confirmed order." + (m.length > 1500 ? " Large carts can be cut off by some email apps; if so, use “Copy enquiry text” and paste it into an email to " + LS.company.email + "." : "") + " If nothing opened, email " + LS.company.email + " directly.", "warn");
      });
      copy.addEventListener("click", function () {
        var d = collect(); if (!d) { return; }
        copyText(message(d)).then(function () { note("Enquiry text copied. Paste it into WhatsApp (" + LS.company.whatsappDisplay + ") or an email to " + LS.company.email + ".", "warn"); },
          function () { note("Could not copy automatically. Please contact us directly on WhatsApp " + LS.company.whatsappDisplay + ".", "bad"); });
      });
      form.addEventListener("submit", function (e) { e.preventDefault(); });
      return h("div", { class: "enquiry" }, form);
    }
    render();
    window.addEventListener("storage", function (e) { if (e.key === CART_KEY) { loadCart(); updateBadge(false); render(); } });
  }

  /* ---------------------------------------------------------- legacy hash links */
  function legacyRedirect() {
    var hsh = location.hash || "";
    if (/^#\/(cart|order)/.test(hsh)) { location.replace("cart.html"); return true; }
    var m = hsh.match(/^#\/products\/([a-z0-9-]+)/i);
    if (m && PAGE !== "products") { location.replace("products.html#" + m[1]); return true; }
    var map = { "#/products": "products.html", "#/about": "about.html", "#/gallery": "gallery.html", "#/contact": "contact.html" };
    if (map[hsh] && document.location.pathname.indexOf(map[hsh]) === -1) { location.replace(map[hsh]); return true; }
    return false;
  }

  /* --------------------------------------------------------------------- init */
  if (legacyRedirect()) { return; }
  loadCart(); updateBadge(false);
  if (!loadCachedRates()) { rates.source = "indicative"; }
  initNav(); initPrefs(); initReveal(); initImages(); initHero();
  initProducts(); initGallery(); initContact(); initCartPage();
  refreshCurrencyUI();
  if (prefs.currency !== "LKR" && rates.source !== "live") { fetchLiveRates().then(function (ok) { if (ok) { refreshCurrencyUI(); } }); }
  window.addEventListener("pageshow", function (e) { if (e.persisted) { loadCart(); updateBadge(false); } });
  window.addEventListener("storage", function (e) { if (e.key === CART_KEY) { loadCart(); updateBadge(false); } });
})();
