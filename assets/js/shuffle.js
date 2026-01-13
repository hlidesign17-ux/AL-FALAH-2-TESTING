/* SHUFULE, SCROLL SMOOTH */

/* UNTUK SHUFFLE OPENING */
document.addEventListener("DOMContentLoaded", () => {
  // Ambil SEMUA carousel pimpinan (aman untuk banyak section)
  const carousels = document.querySelectorAll(".pimpinan-carousel");

  carousels.forEach((carousel) => {
    const cards = carousel.querySelectorAll(".pimpinan-card");
    if (cards.length <= 1) return;

    const dotsContainer =
      carousel.parentElement.querySelector(".pimpinan-dots");
    if (!dotsContainer) return;

    // Bersihkan dot (jaga-jaga kalau ada render ulang)
    dotsContainer.innerHTML = "";

    // Buat dot sesuai jumlah card
    cards.forEach((_, index) => {
      const dot = document.createElement("button");
      if (index === 0) dot.classList.add("active");
      dotsContainer.appendChild(dot);

      // Klik dot → scroll ke card terkait
      dot.addEventListener("click", () => {
        carousel.scrollTo({
          left: carousel.clientWidth * index,
          behavior: "smooth",
        });
      });
    });

    const dots = dotsContainer.querySelectorAll("button");

    // Update dot saat user swipe
    carousel.addEventListener("scroll", () => {
      const index = Math.round(carousel.scrollLeft / carousel.clientWidth);

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });
    });
  });
});

/* UNTUK SHUFFLE CLOSING */

/* UNTUK SCROOL SMOOOTH */

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".smooth-scroll").forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // hanya proses link yang pakai #
      if (!href || !href.includes("#")) return;

      const targetId = href.split("#")[1];
      const target = document.getElementById(targetId);

      if (!target) return;

      e.preventDefault();

      const offset = 80; // tinggi header / navbar (ubah sesuai kebutuhan)
      const targetPosition =
        target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });
});
