// Show the reader's language (Russian or English); the choice is remembered on this device.
(function () {
  document.documentElement.classList.add("js");
  var saved = null;
  try { saved = localStorage.getItem("vulite-lang"); } catch (e) {}
  var lang = saved || ((navigator.language || "en").toLowerCase().indexOf("ru") === 0 ? "ru" : "en");
  function show(l) {
    lang = l;
    document.documentElement.lang = l;
    document.querySelectorAll("[lang]:not(html)").forEach(function (el) { el.classList.toggle("hidden", el.lang !== l); });
    document.querySelectorAll(".lang button").forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.lang === l)); });
    var t = document.querySelector("meta[name='title-" + l + "']");
    if (t) document.title = t.content;
  }
  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".lang button").forEach(function (b) {
      b.addEventListener("click", function () {
        try { localStorage.setItem("vulite-lang", b.dataset.lang); } catch (e) {}
        show(b.dataset.lang);
      });
    });
    show(lang);
  });
})();
