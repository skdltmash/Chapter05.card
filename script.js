(function () {
  const btn = document.querySelector(".btn-copy");
  const toast = document.getElementById("toast");
  const email = btn?.dataset.copy ?? "";

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(() => {
      toast.classList.remove("is-visible");
    }, 2200);
  }

  async function copyEmail() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      showToast("복사되었습니다");
    } catch {
      showToast("복사에 실패했습니다");
    }
  }

  btn?.addEventListener("click", copyEmail);

  const card = document.querySelector(".card");
  const avatar = document.getElementById("avatar");
  const logoImg = avatar?.querySelector(".avatar__img");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (card && !reduceMotion) {
    let raf = 0;
    let last = null;
    card.addEventListener("pointermove", (e) => {
      last = e;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const ev = last;
        if (!ev) return;
        const rect = card.getBoundingClientRect();
        const px = (ev.clientX - rect.left) / rect.width - 0.5;
        const py = (ev.clientY - rect.top) / rect.height - 0.5;
        card.style.transform =
          "perspective(920px) rotateY(" + (px * 7).toFixed(2) + "deg) rotateX(" + (-py * 6).toFixed(2) + "deg)";
        if (logoImg) {
          logoImg.style.transform =
            "translate3d(" + (-px * 6).toFixed(1) + "px," + (-py * 5).toFixed(1) + "px,0)";
        }
      });
    });

    card.addEventListener("pointerleave", () => {
      last = null;
      card.style.transform = "";
      if (logoImg) logoImg.style.transform = "";
    });
  }
})();
