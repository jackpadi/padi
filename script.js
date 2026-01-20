// JS simple compatible iOS9
(function () {
  // ---------- CONFIG ----------
  // Met le mot de passe ici pour activer la protection côté client
  // ATTENTION : le mot de passe est visible dans le code (pas sécurisé)
  var SITE_PASSWORD = ""; // ex: "monmotdepass"
  // ----------------------------

  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var modal = $("#modal");
  var modalBody = $("#modal-body");
  var modalClose = $("#modal-close");

  function openModalWithImage(src) {
    modalBody.innerHTML = "";
    var img = document.createElement("img");
    img.src = src;
    modalBody.appendChild(img);
    showModal();
  }

  function openModalWithVideo(src, poster) {
    modalBody.innerHTML = "";
    var video = document.createElement("video");
    video.setAttribute("controls", "controls");
    video.setAttribute("preload", "metadata");
    video.setAttribute("webkit-playsinline", "webkit-playsinline");
    video.setAttribute("playsinline", "playsinline");
    video.src = src;
    if (poster) video.poster = poster;
    modalBody.appendChild(video);
    showModal();
  }

  function showModal() {
    modal.className = modal.className.replace("hidden", "").trim();
    modal.setAttribute("aria-hidden", "false");
  }

  function closeModal() {
    modal.className = "modal hidden";
    modal.setAttribute("aria-hidden", "true");
    modalBody.innerHTML = "";
  }

  modalClose.addEventListener("click", function (e) {
    e.preventDefault();
    closeModal();
  }, false);

  modal.addEventListener("click", function (e) {
    if (e.target === modal) closeModal();
  }, false);

  function initGallery() {
    var thumbs = $all(".thumb");
    for (var i = 0; i < thumbs.length; i++) {
      (function (fig) {
        fig.addEventListener("click", function () {
          var type = fig.getAttribute("data-type");
          if (type === "image") {
            openModalWithImage(fig.getAttribute("data-src"));
          } else if (type === "video") {
            openModalWithVideo(fig.getAttribute("data-video"), fig.getAttribute("data-poster"));
          }
        }, false);
      }(thumbs[i]));
    }
  }

  var loginOverlay = $("#login-overlay");
  var pwInput = $("#password-input");
  var loginBtn = $("#login-btn");
  function showLogin() { loginOverlay.className = loginOverlay.className.replace("hidden", "").trim(); }
  function hideLogin() { loginOverlay.className = "overlay hidden"; }
  function checkPasswordAttempt() {
    var attempt = pwInput.value || "";
    if (attempt === SITE_PASSWORD) {
      hideLogin();
      initGallery();
    } else {
      alert("Mot de passe incorrect.");
    }
  }

  (function ready(fn) {
    if (document.readyState !== "loading") fn();
    else document.addEventListener("DOMContentLoaded", fn);
  }(function () {
    if (SITE_PASSWORD && SITE_PASSWORD.length > 0) {
      showLogin();
      loginBtn.addEventListener("click", checkPasswordAttempt, false);
      pwInput.addEventListener("keyup", function (e) {
        if (e.keyCode === 13) checkPasswordAttempt();
      }, false);
    } else {
      initGallery();
    }
  }));
}());
