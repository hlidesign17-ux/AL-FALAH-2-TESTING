document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".praktikkarya-card");
  const overlay = document.getElementById("praktikkaryaOverlay");
  const content = document.getElementById("praktikkaryaContent");

  if (!cards.length || !overlay || !content) return;

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      e.preventDefault();

      const target = card.dataset.target;
      if (!target) return;

      fetch(target)
        .then((res) => res.text())
        .then((html) => {
          content.innerHTML = html;
          overlay.style.display = "block";
          document.body.style.overflow = "hidden";
        })
        .catch(() => {
          content.innerHTML = "<p>Konten tidak dapat dimuat.</p>";
        });
    });
  });

  // tombol kembali popup praktik & karya
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("praktikkaryapopup-back")) {
      overlay.style.display = "none";
      content.innerHTML = "";
      document.body.style.overflow = "";
    }
  });
});
