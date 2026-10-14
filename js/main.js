/* =========================================================
   AIRBORNE — site interactions
   ========================================================= */

/* ---- EDIT THESE BEFORE GOING LIVE ---- */
const SITE = {
  email: "akramskies@gmail.com",          // main inbox — every enquiry / payment form is emailed here (via FormSubmit.co)
  emailCc: "airbornflyingclub@gmail.com", // a copy of every form also goes here (add more separated by commas)
  upiId: "airborneaviationacad.62037540@hdfcbank",
  payeeName: "Airborne Aviation Academy Pvt Ltd",
  whatsapp: "918400001640",        // WhatsApp number with country code, no + (used by the WhatsApp buttons)
  heroInterval: 7000,              // home banner: time per video slide in milliseconds
};

(() => {
  "use strict";
  const root = document.documentElement;
  root.classList.add("js");
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));

  /* ---------- Preloader ---------- */
  const pre = $(".preloader");
  const hidePre = () => pre && pre.classList.add("done");
  if (pre) {
    let seen = false;
    try { seen = sessionStorage.getItem("ab-seen") === "1"; } catch (e) {}
    if (seen || reduce) hidePre();
    else { window.addEventListener("load", () => setTimeout(hidePre, 500)); setTimeout(hidePre, 3500); try { sessionStorage.setItem("ab-seen", "1"); } catch (e) {} }
  }

  /* ---------- Toast ---------- */
  const toast = (msg) => {
    let t = $(".toast");
    if (!t) { t = document.createElement("div"); t.className = "toast"; t.setAttribute("role", "status"); document.body.append(t); }
    t.textContent = msg; t.classList.add("show");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.remove("show"), 3400);
  };

  /* ---------- Cursor ---------- */
  if (matchMedia("(hover: hover) and (pointer: fine)").matches && !reduce) {
    const c = document.createElement("div"); c.className = "cursor";
    const d = document.createElement("div"); d.className = "cursor-dot";
    document.body.append(c, d);
    let mx = 0, my = 0, cx = 0, cy = 0;
    addEventListener("mousemove", (e) => { mx = e.clientX; my = e.clientY; d.style.transform = `translate(${mx}px,${my}px)`; document.body.classList.add("has-cursor"); });
    (function loop() { cx += (mx - cx) * .18; cy += (my - cy) * .18; c.style.transform = `translate(${cx}px,${cy}px)`; requestAnimationFrame(loop); })();
    const sel = "a, button, input, select, textarea, .g-item, .vcard, .post";
    document.addEventListener("mouseover", (e) => { if (e.target.closest(sel)) c.classList.add("hover"); });
    document.addEventListener("mouseout", (e) => { if (e.target.closest(sel)) c.classList.remove("hover"); });
  }

  /* ---------- Header ---------- */
  const header = $(".header"), topBtn = $(".progress-top"), ring = topBtn && $(".ring circle", topBtn);
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY, max = document.documentElement.scrollHeight - innerHeight, p = max > 0 ? y / max : 0;
    if (header) { header.classList.toggle("sticky", y > 60); header.classList.toggle("hide", y > 500 && y > lastY && !root.classList.contains("oc-open")); }
    if (topBtn) { topBtn.classList.toggle("show", y > 500); if (ring) ring.style.strokeDashoffset = String(145 - 145 * p); }
    lastY = y;
  };
  addEventListener("scroll", onScroll, { passive: true }); onScroll();
  const goTop = () => scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  $$(".progress-top, .to-top").forEach((b) => b.addEventListener("click", goTop));

  /* ---------- Offcanvas ---------- */
  const openOC = () => { root.classList.add("oc-open"); document.body.style.overflow = "hidden"; };
  const closeOC = () => { root.classList.remove("oc-open"); document.body.style.overflow = ""; };
  $$(".menu-btn").forEach((b) => b.addEventListener("click", openOC));
  $$(".oc-close, .offcanvas-bg").forEach((b) => b.addEventListener("click", closeOC));
  $$(".oc-nav a").forEach((a) => a.addEventListener("click", closeOC));

  /* ---------- Fill-text headings ---------- */
  const fills = $$(".fill-text");
  fills.forEach((el) => {
    const walk = (node) => {
      Array.from(node.childNodes).forEach((n) => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.append(part);
            else { const s = document.createElement("span"); s.className = "w"; s.textContent = part; frag.append(s); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && n.tagName !== "BR") walk(n);
      });
    };
    walk(el);
  });
  const updateFills = () => {
    fills.forEach((el) => {
      const words = $$(".w", el);
      const r = el.getBoundingClientRect();
      const start = innerHeight * .9, end = innerHeight * .45;
      const k = reduce ? 1 : Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      const n = Math.round(k * words.length);
      words.forEach((w, i) => w.classList.toggle("on", i < n));
    });
  };

  /* ---------- Reveal + counters ---------- */
  let pending = $$("[data-anim], .img-reveal, [data-count]");
  const countUp = (el, instant) => {
    const target = parseFloat(el.dataset.count), suf = el.dataset.suffix || "";
    const fmt = (v) => Math.round(v).toLocaleString("en-IN") + suf;
    if (instant) { el.textContent = fmt(target); return; }
    const t0 = performance.now(), dur = 1800;
    (function step(t) { const k = Math.min(1, (t - t0) / dur); el.textContent = fmt(target * (1 - Math.pow(1 - k, 4))); if (k < 1) requestAnimationFrame(step); })(t0);
  };
  const reveal = (el, instant) => { el.classList.add("in"); if (el.dataset.count !== undefined) countUp(el, instant); };
  const checkReveal = () => {
    const vh = innerHeight;
    pending = pending.filter((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * .88 && r.bottom > 0) { reveal(el); return false; }
      if (r.bottom <= 0) { reveal(el, true); return false; }
      return true;
    });
  };
  if (reduce) { pending.forEach((el) => reveal(el, true)); pending = []; }

  /* ---------- Parallax ---------- */
  const pBgs = $$(".page-banner__bg, .on-image__bg");
  const parallax = () => {
    if (reduce) return;
    pBgs.forEach((b) => {
      const r = b.parentElement.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      b.style.transform = `translateY(${(r.top + r.height / 2 - innerHeight / 2) * -0.15}px)`;
    });
  };

  let queued = false;
  const frame = () => { queued = false; checkReveal(); updateFills(); parallax(); };
  const q = () => { if (!queued) { queued = true; requestAnimationFrame(frame); } };
  addEventListener("scroll", q, { passive: true }); addEventListener("resize", q); addEventListener("load", q);
  frame();

  /* Footer CTA fly-in */
  $$(".fcta").forEach((el) => {
    const go = () => { const r = el.getBoundingClientRect(); if (r.top < innerHeight * .85) { el.classList.add("in-view"); removeEventListener("scroll", go); } };
    if (reduce) el.classList.add("in-view"); else { addEventListener("scroll", go, { passive: true }); go(); }
  });

  /* Own videos: hide cards whose file is missing */
  $$(".local-videos").forEach((wrap) => {
    const cards = $$(".vcard[data-local]", wrap);
    const empty = wrap.parentElement.querySelector(".local-empty");
    const check = () => { const any = cards.some((c) => !c.hidden); if (empty) empty.hidden = any; };
    cards.forEach((c) => {
      const v = $("video", c), src = $("source", v);
      const fail = () => { c.hidden = true; check(); };
      if (src) src.addEventListener("error", fail);
      v.addEventListener("error", fail);
    });
  });

  /* ---------- Booking widget ---------- */
  $$(".booking").forEach((bk) => {
    const tabs = $$(".booking__tab", bk), type = $("input[name='type']", bk);
    tabs.forEach((t) => t.addEventListener("click", () => { tabs.forEach((x) => x.classList.toggle("on", x === t)); if (type) type.value = t.dataset.type; }));
    bk.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(bk);
      if (!fd.get("from") || !fd.get("to")) { toast("Please enter departure and arrival."); return; }
      const params = new URLSearchParams();
      fd.forEach((v, k) => { if (v) params.set(k, v); });
      location.href = "contact.html?" + params.toString() + "#enquiry";
    });
  });

  /* ---------- Fleet tabs ---------- */
  $$(".ftabs").forEach((tabsEl) => {
    const tabs = $$(".ftab", tabsEl), panels = $$(tabsEl.dataset.panels);
    tabs.forEach((t, i) => t.addEventListener("click", () => {
      tabs.forEach((x) => x.classList.toggle("on", x === t));
      panels.forEach((p, k) => p.classList.toggle("on", k === i));
    }));
  });

  /* ---------- Swiper sliders ---------- */
  if (window.Swiper) {
    $$(".swiper[data-slider]").forEach((el) => {
      const kind = el.dataset.slider;
      const nav = el.dataset.nav ? $(el.dataset.nav) : null;
      const opts = {
        loop: true, speed: 900, spaceBetween: 24, grabCursor: true,
        autoplay: reduce ? false : { delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: true },
        pagination: { el: $(".swiper-pagination", el.parentElement), clickable: true },
        navigation: nav ? { prevEl: $(".prev", nav), nextEl: $(".next", nav) } : undefined,
        breakpoints: kind === "testi" ? { 0: { slidesPerView: 1 }, 768: { slidesPerView: 2 }, 1100: { slidesPerView: 3 } }
                                       : { 0: { slidesPerView: 1 }, 600: { slidesPerView: 2 }, 1000: { slidesPerView: 3 }, 1300: { slidesPerView: 4 } },
      };
      new Swiper(el, opts);
    });
  }

  /* ---------- Lightbox (images + videos) ---------- */
  const lb = document.createElement("div");
  lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
  lb.innerHTML = '<button class="lb-btn lb-close" aria-label="Close">✕</button><button class="lb-btn lb-prev" aria-label="Previous">←</button><button class="lb-btn lb-next" aria-label="Next">→</button><div class="lightbox__inner"><div class="lightbox__stage"></div><p class="lightbox__cap"></p></div>';
  document.body.append(lb);
  const stage = $(".lightbox__stage", lb), cap = $(".lightbox__cap", lb);
  let group = [], idx = 0;
  const render = () => {
    const el = group[idx]; stage.innerHTML = "";
    if (el.dataset.video) {
      const v = document.createElement("video");
      v.controls = true; v.autoplay = true; v.playsInline = true;
      if (el.dataset.poster) v.poster = el.dataset.poster;
      el.dataset.video.split(",").forEach((src) => { const s = document.createElement("source"); s.src = src.trim(); s.type = "video/mp4"; v.append(s); });
      stage.append(v);
    } else {
      const d = document.createElement("div"); d.className = "lightbox__img"; d.style.backgroundImage = `url("${el.dataset.img}")`; stage.append(d);
    }
    cap.textContent = el.dataset.caption || "";
    const multi = group.length > 1;
    $(".lb-prev", lb).hidden = !multi; $(".lb-next", lb).hidden = !multi;
  };
  const openLB = (el) => {
    const g = el.dataset.group;
    group = g ? $$(`[data-group="${g}"]`).filter((x) => !x.classList.contains("hidden")) : [el];
    idx = Math.max(0, group.indexOf(el)); render();
    lb.classList.add("open"); document.body.style.overflow = "hidden"; $(".lb-close", lb).focus();
  };
  const closeLB = () => { lb.classList.remove("open"); document.body.style.overflow = ""; stage.innerHTML = ""; };
  $$("[data-img], [data-video]").forEach((el) => el.addEventListener("click", (e) => { e.preventDefault(); openLB(el); }));
  $(".lb-close", lb).addEventListener("click", closeLB);
  $(".lb-prev", lb).addEventListener("click", () => { idx = (idx - 1 + group.length) % group.length; render(); });
  $(".lb-next", lb).addEventListener("click", () => { idx = (idx + 1) % group.length; render(); });
  lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeLB(); closeOC(); closeReader(); }
    if (!lb.classList.contains("open") || group.length < 2) return;
    if (e.key === "ArrowRight") $(".lb-next", lb).click();
    if (e.key === "ArrowLeft") $(".lb-prev", lb).click();
  });

  /* Video cards: play muted preview on hover */
  $$(".vcard video").forEach((v) => {
    const card = v.closest(".vcard");
    card.addEventListener("mouseenter", () => { const p = v.play(); if (p && p.catch) p.catch(() => {}); });
    card.addEventListener("mouseleave", () => { v.pause(); });
  });

  /* ---------- Filters ---------- */
  $$(".filters[data-target]").forEach((grp) => {
    const target = $(grp.dataset.target); if (!target) return;
    grp.addEventListener("click", (e) => {
      const f = e.target.closest(".filter"); if (!f) return;
      $$(".filter", grp).forEach((x) => x.classList.toggle("on", x === f));
      const cat = f.dataset.filter;
      Array.from(target.children).forEach((item, k) => {
        const show = cat === "all" || (item.dataset.cat || "").split(" ").includes(cat);
        item.classList.toggle("hidden", !show);
        if (show && !reduce && item.animate) item.animate([{ opacity: 0, transform: "scale(.92)" }, { opacity: 1, transform: "none" }], { duration: 600, delay: Math.min(k, 12) * 35, easing: "cubic-bezier(.22,1,.36,1)", fill: "backwards" });
      });
    });
  });

  /* ---------- Accordion ---------- */
  $$(".acc button").forEach((b) => b.addEventListener("click", () => {
    const acc = b.parentElement, wrap = acc.parentElement, open = !acc.classList.contains("open");
    $$(".acc", wrap).forEach((a) => { a.classList.remove("open"); $("button", a).setAttribute("aria-expanded", "false"); });
    if (open) { acc.classList.add("open"); b.setAttribute("aria-expanded", "true"); }
  }));

  /* ---------- Blog reader, categories, search ---------- */
  const reader = $(".reader");
  function closeReader() { if (reader) { reader.classList.remove("open"); document.body.style.overflow = ""; } }
  if (reader) {
    const body = $(".reader__content", reader);
    const open = (id) => { const t = document.getElementById("post-" + id); if (!t) return; body.innerHTML = t.innerHTML; reader.classList.add("open"); document.body.style.overflow = "hidden"; $(".reader__panel", reader).scrollTop = 0; };
    $$("[data-post]").forEach((p) => p.addEventListener("click", () => open(p.dataset.post)));
    $(".reader__close", reader).addEventListener("click", closeReader);
    reader.addEventListener("click", (e) => { if (e.target === reader) closeReader(); });
  }
  const blogList = $("#blog-list");
  if (blogList) {
    const posts = Array.from(blogList.children);
    let cat = "all", term = "";
    const apply = () => posts.forEach((p) => {
      const okCat = cat === "all" || p.dataset.cat === cat;
      const okTerm = !term || p.textContent.toLowerCase().includes(term);
      p.classList.toggle("hidden", !(okCat && okTerm)); p.hidden = !(okCat && okTerm);
    });
    $$(".cat-list button").forEach((b) => b.addEventListener("click", () => { $$(".cat-list button").forEach((x) => x.classList.toggle("on", x === b)); cat = b.dataset.cat; apply(); }));
    const sb = $(".search-box");
    if (sb) sb.addEventListener("submit", (e) => { e.preventDefault(); term = $("input", sb).value.trim().toLowerCase(); apply(); });
  }

  /* ---------- Forms ---------- */
  const validate = (form) => {
    let ok = true;
    $$("[required]", form).forEach((i) => {
      let bad = !i.value.trim();
      if (!bad && i.type === "email") bad = !/^\S+@\S+\.\S+$/.test(i.value.trim());
      if (!bad && i.type === "tel") bad = !/^[0-9+\s-]{10,15}$/.test(i.value.trim());
      if (!bad && i.type === "number") bad = !(parseFloat(i.value) > 0);
      i.classList.toggle("field-err", bad); if (bad) ok = false;
    });
    return ok;
  };
  /* Send any form to the company email (FormSubmit.co — no server or admin panel needed) */
  const sendMail = (data, subject) => fetch(`https://formsubmit.co/ajax/${SITE.email}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(Object.assign({ _subject: subject, _template: "table", _captcha: "false", _cc: SITE.emailCc || "", Page: location.href }, data)),
  }).then((r) => r.json()).then((j) => { if (!(j && (j.success === true || j.success === "true"))) throw new Error(j && j.message); });
  const mailFallback = (data, subject) => {
    const body = Object.entries(data).map(([k, v]) => `${k}: ${v}`).join("\n");
    location.href = `mailto:${SITE.email}${SITE.emailCc ? "?cc=" + SITE.emailCc + "&" : "?"}subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
  $$("form[data-enquiry]").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate(f)) { toast("Please fill in the highlighted fields."); return; }
    const data = {}; new FormData(f).forEach((v, k) => { if (String(v).trim()) data[k] = String(v).trim(); });
    if (data.Email) data._replyto = data.Email;
    const subject = f.dataset.subject || "New enquiry from airbornefly.in";
    const btn = $("button[type=submit]", f), label = btn ? btn.innerHTML : "";
    if (btn) { btn.disabled = true; btn.textContent = "Sending…"; }
    sendMail(data, subject)
      .then(() => { toast("Thank you! Your details have been sent — we'll get back to you shortly."); f.reset(); })
      .catch(() => { toast("Couldn't send online — opening your email app instead."); mailFallback(data, subject); })
      .finally(() => { if (btn) { btn.disabled = false; btn.innerHTML = label; } });
  }));

  /* Prefill contact form from booking widget */
  const enq = $("#enquiry-form");
  if (enq && location.search) {
    const p = new URLSearchParams(location.search);
    const map = { from: "From", to: "To", pax: "Passengers", date: "Date", type: "Service", trip: "Trip" };
    Object.entries(map).forEach(([k, name]) => { const el = enq.elements[name]; if (el && p.get(k)) el.value = p.get(k); });
    const msg = enq.elements["Message"];
    if (msg && p.get("from")) msg.value = `Booking request: ${p.get("type") || "Flight"} from ${p.get("from")} to ${p.get("to")}${p.get("date") ? " on " + p.get("date") : ""}, ${p.get("pax") || 1} passenger(s), ${p.get("trip") || "one-way"}.`;
  }

  /* ---------- Payment ---------- */
  const copyBtn = $("#copy-upi");
  copyBtn && copyBtn.addEventListener("click", () => {
    const id = copyBtn.dataset.copy || SITE.upiId;
    if (navigator.clipboard) navigator.clipboard.writeText(id).then(() => toast("UPI ID copied"), () => toast("Select and copy the UPI ID"));
    else toast("Select and copy the UPI ID");
  });
  const amt = $("#p-amount"), out = $("#amount-out");
  if (amt && out) amt.addEventListener("input", () => { const a = parseFloat(amt.value); out.textContent = a > 0 ? "₹ " + a.toLocaleString("en-IN") : "₹ —"; });

  /* Newsletter → email */
  $$(".newsletter").forEach((n) => n.addEventListener("submit", (e) => {
    e.preventDefault(); const i = $("input", n), v = i.value.trim();
    if (!/^\S+@\S+\.\S+$/.test(v)) { toast("Enter a valid email address."); return; }
    sendMail({ "Newsletter email": v, _replyto: v }, "Newsletter sign-up — airbornefly.in")
      .then(() => { toast("Thanks for subscribing!"); i.value = ""; })
      .catch(() => toast("Couldn't subscribe right now. Please email " + SITE.email));
  }));

  /* ---------- Home banner: video slider ---------- */
  $$(".hero-slider").forEach((hs) => {
    const slides = $$(".hs-slide", hs), dots = $$(".hs-dot", hs.closest(".hero") || document);
    if (slides.length < 2) return;
    const ms = SITE.heroInterval || parseInt(hs.dataset.interval, 10) || 7000;
    let cur = 0, timer;
    const playIt = (v) => { if (!v) return; try { v.currentTime = 0; } catch (_) {} const p = v.play(); if (p && p.catch) p.catch(() => {}); };
    const show = (n) => {
      const prev = slides[cur];
      cur = (n + slides.length) % slides.length;
      slides.forEach((s, k) => s.classList.toggle("is-on", k === cur));
      dots.forEach((d, k) => { d.classList.toggle("is-on", k === cur); d.style.setProperty("--ms", ms + "ms"); });
      playIt($("video", slides[cur]));
      const pv = $("video", prev); if (pv && prev !== slides[cur]) setTimeout(() => pv.pause(), 1200);
      clearTimeout(timer); timer = setTimeout(() => show(cur + 1), ms);
    };
    dots.forEach((d, k) => d.addEventListener("click", () => show(k)));
    // preload the next slide quietly once the page has loaded
    addEventListener("load", () => slides.forEach((s, k) => { if (k) { const v = $("video", s); if (v) v.preload = "metadata"; } }));
    document.addEventListener("visibilitychange", () => { if (document.hidden) clearTimeout(timer); else show(cur); });
    show(0);
  });

  /* WhatsApp float */
  $$(".wa-float").forEach((w) => { if (SITE.whatsapp) w.href = `https://wa.me/${SITE.whatsapp}`; else w.hidden = true; });
  $$(".wa-link").forEach((w) => { if (SITE.whatsapp) { w.href = `https://wa.me/${SITE.whatsapp}`; w.target = "_blank"; w.rel = "noopener"; } else w.href = "contact.html"; });

  $$("[data-year]").forEach((y) => (y.textContent = new Date().getFullYear()));
  /* Booking card: show after a small scroll, hide again at the top */
  const bw = $(".booking-wrap");
  if (bw) {
    const heroEl = $(".hero");
    const toggleBooking = () => {
      const down = scrollY > 15;
      bw.classList.toggle("show", down);
      if (heroEl) heroEl.classList.toggle("is-scrolled", down);
    };
    addEventListener("scroll", toggleBooking, { passive: true });
    toggleBooking();
  }
})();
