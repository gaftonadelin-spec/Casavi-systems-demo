/* Casavi Systems — logica paginii (fără dependențe) */
(function () {
  "use strict";

  var CFG = window.CASAVI_CONFIG || {};
  var DATA = window.CASAVI_DATA || {};
  var root = document.documentElement;
  root.classList.add("js");

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $all(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function icon(id) { return '<svg class="ic" aria-hidden="true"><use href="#i-' + id + '"/></svg>'; }
  function waLink(text) {
    var base = "https://wa.me/" + (CFG.whatsappNumber || "");
    return text ? base + "?text=" + encodeURIComponent(text) : base;
  }

  /* ---------- Date de contact din config ---------- */
  $all(".js-phone").forEach(function (a) {
    a.href = "tel:" + CFG.phoneHref;
    if (!a.querySelector("svg")) a.textContent = CFG.phoneDisplay;
  });
  $all(".js-wa").forEach(function (a) {
    a.href = waLink(CFG.whatsappIntro);
  });
  $all(".js-address").forEach(function (el) { el.textContent = CFG.address; });
  $all(".js-hours").forEach(function (el) { el.textContent = CFG.hours; });
  var yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Temă luminoasă / întunecată ---------- */
  var themeBtn = $("#theme-toggle");
  function syncThemeBtn() {
    var dark = root.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-pressed", String(dark));
    themeBtn.setAttribute("aria-label", dark ? "Comută tema luminoasă" : "Comută tema întunecată");
    var meta = $('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#0D1117" : "#DC2626");
  }
  if (themeBtn) {
    syncThemeBtn();
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("casavi-theme", next); } catch (e) {}
      syncThemeBtn();
    });
  }

  /* ---------- Meniu mobil ---------- */
  var menuBtn = $("#menu-toggle");
  var nav = $("#main-nav");
  function closeMenu() {
    nav.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Deschide meniul");
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () {
      var open = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", open);
      menuBtn.setAttribute("aria-expanded", String(open));
      menuBtn.setAttribute("aria-label", open ? "Închide meniul" : "Deschide meniul");
    });
    $all("a", nav).forEach(function (a) { a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) { closeMenu(); menuBtn.focus(); }
    });
  }

  /* ---------- Avantaje ---------- */
  var advGrid = $("#adv-grid");
  if (advGrid && DATA.advantages) {
    advGrid.innerHTML = DATA.advantages.map(function (a) {
      return '<article class="adv-card tone-' + a.tone + '">' +
        '<div class="adv-icon">' + icon(a.icon) + '</div>' +
        '<h3>' + esc(a.title) + '</h3>' +
        '<p>' + esc(a.text) + '</p>' +
      '</article>';
    }).join("");
  }

  /* ---------- Rute ---------- */
  var routesEl = $("#routes");
  if (routesEl && DATA.zones) {
    routesEl.innerHTML = DATA.zones.map(function (z) {
      var sign =
        '<div class="route-sign">' +
          '<h3>' + esc(z.name) + '</h3>' +
          '<div class="route-time"><small>tranzit</small><strong>' + esc(z.transit) + '</strong></div>' +
        '</div>';
      var body =
        '<div class="route-body">' +
          '<ul class="chips" aria-label="Destinații">' + z.countries.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join("") + '</ul>' +
          '<p class="route-hubs">' + icon("pin") + '<span>' + esc(z.hubs) + '</span></p>' +
        '</div>';
      if (z.image) {
        return '<article class="route-card is-wide tone-' + z.tone + '">' +
          '<div class="route-media"><img src="' + esc(z.image) + '" alt="' + esc(z.imageAlt || "") + '" loading="lazy" width="640" height="480"></div>' +
          '<div class="route-content">' + sign + body + '</div>' +
        '</article>';
      }
      return '<article class="route-card tone-' + z.tone + '">' + sign + body + '</article>';
    }).join("");
  }

  /* ---------- Flotă ---------- */
  var fleetEl = $("#fleet");
  if (fleetEl && DATA.fleet) {
    fleetEl.innerHTML = DATA.fleet.map(function (v) {
      return '<article class="fleet-card tone-' + v.tone + '">' +
        '<div class="fleet-media">' +
          '<img src="' + esc(v.image) + '" alt="' + esc(v.imageAlt) + '" loading="lazy">' +
          '<span class="fleet-tag">sub 2.5 t</span>' +
        '</div>' +
        '<div class="fleet-body">' +
          '<h3>' + esc(v.name) + '</h3>' +
          '<p class="fleet-model">' + esc(v.model) + '</p>' +
          '<dl class="specs">' + v.specs.map(function (s) {
            return '<div><dt>' + esc(s[0]) + '</dt><dd>' + esc(s[1]) + '</dd></div>';
          }).join("") + '</dl>' +
        '</div>' +
      '</article>';
    }).join("");
  }

  /* ---------- Bara de comparație: o singură animație la intrarea în ecran ---------- */
  var cmp = $("#cmp");
  if (cmp) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { cmp.classList.add("is-in"); io.disconnect(); }
        });
      }, { threshold: 0.35 });
      io.observe(cmp);
    } else {
      cmp.classList.add("is-in");
    }
  }

  /* ---------- Formular de cotație → WhatsApp ---------- */
  var form = $("#quote-form");
  if (!form) return;

  var fFrom = $("#q-from"), fTo = $("#q-to"), fType = $("#q-type"), fWeight = $("#q-weight"),
      fName = $("#q-name"), fDate = $("#q-date");
  var countries = (DATA.countries || []).slice().sort(function (a, b) {
    if (a.code === "RO") return -1;
    if (b.code === "RO") return 1;
    return a.name.localeCompare(b.name, "ro");
  });
  var byCode = {};
  countries.forEach(function (c) { byCode[c.code] = c; });

  var opts = countries.map(function (c) { return '<option value="' + c.code + '">' + esc(c.name) + '</option>'; }).join("");
  fFrom.innerHTML = opts;
  fFrom.value = CFG.defaultLoadCountry || "RO";
  fTo.insertAdjacentHTML("beforeend", opts);
  fType.innerHTML = (DATA.cargoTypes || []).map(function (t) { return '<option>' + esc(t) + '</option>'; }).join("");
  fWeight.max = CFG.maxWeightKg || 2500;

  try { fDate.min = new Date().toISOString().slice(0, 10); } catch (e) {}

  // Estimare tranzit: folosim zona țării care nu e România (sau destinația)
  var qeValue = $("#qe-value"), qeRoute = $("#qe-route");
  function updateEstimate() {
    var from = byCode[fFrom.value], to = byCode[fTo.value];
    if (!to) { qeValue.textContent = "Alege destinația"; qeRoute.textContent = ""; return; }
    var zoneCountry = (to.zone === "home" && from) ? from : to;
    var t = (DATA.transitByZone || {})[zoneCountry.zone] || "La cerere";
    qeValue.textContent = t;
    qeRoute.textContent = (from ? from.name : "") + " → " + to.name;
  }
  fFrom.addEventListener("change", updateEstimate);
  fTo.addEventListener("change", updateEstimate);

  function setError(input, msg) {
    var err = document.getElementById(input.id + "-err");
    if (msg) {
      input.setAttribute("aria-invalid", "true");
      if (err) { err.textContent = msg; err.hidden = false; }
    } else {
      input.removeAttribute("aria-invalid");
      if (err) { err.textContent = ""; err.hidden = true; }
    }
  }

  function validate() {
    var firstBad = null;
    var max = Number(fWeight.max) || 2500;
    var w = Number(fWeight.value);

    if (!fTo.value) { setError(fTo, "Alege țara în care livrăm marfa."); firstBad = firstBad || fTo; }
    else if (fTo.value === fFrom.value && fTo.value === "RO") { setError(fTo, "Pentru curse interne sună dispeceratul. Alege o țară din UE sau Marea Britanie."); firstBad = firstBad || fTo; }
    else setError(fTo, "");

    if (!fWeight.value || !(w > 0)) { setError(fWeight, "Scrie greutatea aproximativă în kilograme."); firstBad = firstBad || fWeight; }
    else if (w > max) { setError(fWeight, "Maxim " + max.toLocaleString("ro-RO") + " kg pe cursă. Pentru mai mult, împărțim marfa pe două dube."); firstBad = firstBad || fWeight; }
    else setError(fWeight, "");

    if (!fName.value.trim()) { setError(fName, "Spune-ne cum să ne adresăm."); firstBad = firstBad || fName; }
    else setError(fName, "");

    return firstBad;
  }

  // Validare la părăsirea câmpului, după prima încercare
  var tried = false;
  [fTo, fWeight, fName].forEach(function (el) {
    el.addEventListener("blur", function () { if (tried) validate(); });
    el.addEventListener("change", function () { if (tried) validate(); });
  });

  function buildMessage() {
    var v = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; };
    var from = byCode[fFrom.value], to = byCode[fTo.value];
    var lines = [CFG.whatsappIntro || "Cerere cotație:", ""];
    lines.push("Încărcare: " + (from ? from.name : "") + (v("q-city-from") ? ", " + v("q-city-from") : ""));
    lines.push("Descărcare: " + (to ? to.name : "") + (v("q-city-to") ? ", " + v("q-city-to") : ""));
    lines.push("Marfă: " + v("q-type"));
    lines.push("Greutate: " + v("q-weight") + " kg");
    if (v("q-date")) {
      var d = new Date(v("q-date") + "T12:00:00");
      lines.push("Data încărcării: " + (isNaN(d) ? v("q-date") : d.toLocaleDateString("ro-RO")));
    }
    if (v("q-notes")) lines.push("Detalii: " + v("q-notes"));
    lines.push("");
    lines.push("Nume / firmă: " + v("q-name"));
    return lines.join("\n");
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    tried = true;
    var bad = validate();
    if (bad) { bad.focus(); return; }
    window.open(waLink(buildMessage()), "_blank", "noopener");
  });

  // Butonul din hero duce la formular și pune focus pe destinație
  $all(".js-wa-quick").forEach(function (a) {
    a.addEventListener("click", function () {
      setTimeout(function () { fTo.focus({ preventScroll: true }); }, 450);
    });
  });
})();
