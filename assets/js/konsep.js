(function () {
  const sections = document.querySelectorAll(".konsep"); // semua section

  sections.forEach((section) => {
    const cards = section.querySelectorAll(".konsep-card"); // card per section
    let index = 0;

    if (cards.length > 0 && window.innerWidth <= 768) {
      cards[index].classList.add("active");

      setInterval(() => {
        const currentCard = cards[index];
        currentCard.classList.remove("active");

        index = (index + 1) % cards.length;
        const nextCard = cards[index];

        // Crossfade langsung tanpa delay untuk looping mulus
        nextCard.classList.add("active");
      }, 5000);
    }
  });
})();
