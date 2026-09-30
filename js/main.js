/* Ahla Keswa Chez Rim — interactions */
(function () {
  "use strict";

  var WHATSAPP_NUMBER = "21623879058"; // numéro WhatsApp qui reçoit les demandes

  /* VIDÉOS : collez ici les liens de vos vidéos ou reels Facebook.
     Sur Facebook : ouvrez la vidéo > « ... » ou « Partager » > « Copier le lien ».
     Ajoutez « landscape: true » pour une vidéo horizontale (pleine largeur).
     Une vidéo enregistrée sur votre ordinateur fonctionne aussi :
     mettez le fichier dans videos/ et écrivez { file: "videos/mariage-1.mp4" }. */
  var FACEBOOK_VIDEOS = [
    { url: "https://www.facebook.com/reel/1675168190534180" },
    // { url: "https://www.facebook.com/reel/1234567890" },
    // { url: "https://www.facebook.com/ahlakeswa/videos/1234567890", landscape: true },
    // { file: "videos/mariage-1.mp4", poster: "images/mariee-1.jpg" },
  ];

  /* 1. Menu mobile */
  var toggle = document.getElementById("menuToggle");
  var nav = document.getElementById("mainNav");

  function closeMenu() {
    nav.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Ouvrir le menu");
  }

  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  });

  nav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) {
      closeMenu();
      toggle.focus();
    }
  });

  /* 2. Ombre de l'en-tête au défilement */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 10);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* 3. Image manquante : on affiche le cadre de remplacement */
  document.querySelectorAll(".photo img").forEach(function (img) {
    function markMissing() { img.classList.add("is-missing"); }
    img.addEventListener("error", markMissing);
    if (img.complete && img.naturalWidth === 0) markMissing();
  });

  /* 4. Les liens « Réserver » pré-sélectionnent la prestation */
  var serviceSelect = document.getElementById("f-service");
  document.querySelectorAll("[data-service]").forEach(function (link) {
    link.addEventListener("click", function () {
      serviceSelect.value = link.getAttribute("data-service");
    });
  });

  /* 5. Formulaire -> message WhatsApp pré-rempli */
  var form = document.getElementById("bookingForm");
  var errorBox = document.getElementById("formError");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    var name = form.name.value.trim();
    var phone = form.phone.value.trim();
    var service = form.service.value;
    var date = form.date.value;
    var message = form.message.value.trim();

    form.name.classList.toggle("invalid", !name);
    form.phone.classList.toggle("invalid", !phone);

    if (!name || !phone) {
      errorBox.textContent = "Indiquez votre nom et votre téléphone pour envoyer la demande.";
      errorBox.hidden = false;
      (name ? form.phone : form.name).focus();
      return;
    }
    errorBox.hidden = true;

    var dateText = "";
    if (date) {
      var d = new Date(date + "T00:00:00");
      dateText = d.toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
    }

    var lines = [
      "Bonjour Ahla Keswa,",
      "je souhaite prendre rendez-vous.",
      "",
      "Nom : " + name,
      "Téléphone : " + phone,
      "Prestation : " + service
    ];
    if (dateText) lines.push("Date du mariage : " + dateText);
    if (message) lines.push("", message);

    var url = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });

  /* 6. Vidéos Facebook et locales */
  var videoGrid = document.getElementById("videoGrid");
  var videoEmpty = document.getElementById("videoEmpty");
  if (videoGrid && FACEBOOK_VIDEOS.length) {
    videoEmpty.remove();
    if (FACEBOOK_VIDEOS.length === 1) videoGrid.classList.add("single");
    FACEBOOK_VIDEOS.forEach(function (v, i) {
      var card = document.createElement("div");
      card.className = "video-card" + (v.landscape ? " landscape" : "");
      if (v.file) {
        var video = document.createElement("video");
        video.src = v.file;
        video.controls = true;
        video.playsInline = true;
        video.preload = "metadata";
        if (v.poster) video.poster = v.poster;
        card.appendChild(video);
      } else if (v.url) {
        var frame = document.createElement("iframe");
        frame.src = "https://www.facebook.com/plugins/video.php?href=" +
          encodeURIComponent(v.url) + "&show_text=false&width=560";
        frame.title = "Vidéo Ahla Keswa " + (i + 1);
        frame.loading = "lazy";
        frame.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share";
        frame.allowFullscreen = true;
        card.appendChild(frame);
      }
      videoGrid.appendChild(card);
      if (v.url) {
        var link = document.createElement("a");
        link.href = v.url; link.target = "_blank"; link.rel = "noopener";
        link.className = "text-link video-link";
        link.textContent = "Regarder sur Facebook";
        videoGrid.appendChild(link);
      }
    });
  }

  /* 7. Galerie : agrandir les photos */
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var current = 0, lastFocus = null;

  function show(i) {
    current = (i + items.length) % items.length;
    var img = items[current].querySelector("img");
    lbImg.src = items[current].getAttribute("data-full");
    lbImg.alt = img.alt;
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("lbClose").focus();
  }
  function closeLb() {
    lb.hidden = true;
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  items.forEach(function (btn, i) { btn.addEventListener("click", function () { openLb(i); }); });
  document.getElementById("lbClose").addEventListener("click", closeLb);
  document.getElementById("lbPrev").addEventListener("click", function () { show(current - 1); });
  document.getElementById("lbNext").addEventListener("click", function () { show(current + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });

  /* 8. Année du pied de page */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
