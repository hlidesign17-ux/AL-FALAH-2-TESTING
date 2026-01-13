document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll(".beritalanjut-link");
  const overlay = document.getElementById("beritaOverlay");
  const content = document.getElementById("beritaContent");

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.dataset.target;
      if (!target) return;

      fetch(target)
        .then((res) => res.text())
        .then((html) => {
          content.innerHTML = html;
          overlay.classList.add("active");
          document.body.style.overflow = "hidden";
        });
    });
  });

  // tombol kembali dari file berita
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("berita-back")) {
      overlay.classList.remove("active");
      content.innerHTML = "";
      document.body.style.overflow = "";
    }
  });
});
