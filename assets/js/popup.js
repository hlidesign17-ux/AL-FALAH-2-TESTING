document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".profile-card");
  const overlay = document.getElementById("profileOverlay");
  const content = document.getElementById("profileContent");

  cards.forEach(card => {
    card.addEventListener("click", e => {
      e.preventDefault();
      const target = card.dataset.target;
      if (!target) return;

      fetch(target)
        .then(res => res.text())
        .then(html => {
          content.innerHTML = html;
          overlay.style.display = "block";
          document.body.style.overflow = "hidden";
        });
    });
  });

  // TOMBOL KEMBALI DARI BIODATA
  document.addEventListener("click", e => {
    if (e.target.classList.contains("biodata-back")) {
      overlay.style.display = "none";
      content.innerHTML = "";
      document.body.style.overflow = "";
    }
  });
});
