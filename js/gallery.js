/* Builds the gallery grid from js/gallery-data.js — no need to edit this file. */
(function () {
  "use strict";
  var grid = document.querySelector("[data-gallery]");
  if (!grid || !Array.isArray(window.GALLERY)) return;
  var esc = function (s) { return String(s || "").replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); };
  var play = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4v16l13-8z"/></svg>';
  var zoom = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>';
  var html = "";
  var photos = 0, videos = 0;
  window.GALLERY.forEach(function (it) {
    if (!it || !it.src) return;
    var isVideo = it.type === "video";
    isVideo ? videos++ : photos++;
    var cats = (isVideo ? "video " : "photo ") + (it.cats || "");
    var size = it.size === "tall" ? " h2" : it.size === "wide" ? " w2" : "";
    var thumb = it.thumb || (isVideo ? "" : it.src);
    var title = esc(it.title || (isVideo ? "Airborne video" : "Airborne photo"));
    var media = thumb ? '<img class="ph" src="' + esc(thumb) + '" alt="' + title + '" loading="lazy" decoding="async">' : '<span class="ph ph--empty"></span>';
    var attr = isVideo
      ? 'data-video="' + esc(it.src) + '"' + (it.thumb ? ' data-poster="' + esc(it.thumb) + '"' : "")
      : 'data-img="' + esc(it.src) + '"';
    html += '<button class="g-item' + size + (isVideo ? " g-item--video" : "") + '" data-cat="' + esc(cats.trim()) + '" ' + attr +
      ' data-group="gal" data-caption="' + title + '" aria-label="' + (isVideo ? "Play video: " : "Open photo: ") + title + '">' + media +
      (isVideo ? '<span class="g-play">' + play + "</span>" : "") +
      '<span class="g-item__cap"><i>' + (isVideo ? play : zoom) + "</i><small>" + (isVideo ? "Video" : "Photo") + "</small><b>" + title + "</b></span></button>";
  });
  grid.innerHTML = html;
  var count = document.querySelector("[data-gal-count]");
  if (count) count.textContent = photos + " photos · " + videos + " videos";
})();
