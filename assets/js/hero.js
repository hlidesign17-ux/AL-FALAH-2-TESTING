const heroSlide = document.querySelector(".hero-slide");
const el = document.getElementById("typing");

// ambil data dari HTML (data-attribute)
const slides = JSON.parse(heroSlide.dataset.slides);
const text = el.dataset.text;

let current = 0;
let i = 0;

function changeBackground() {
  heroSlide.style.backgroundImage = `url('${slides[current]}')`;
  current = (current + 1) % slides.length;
}

function typeText() {
  if (i < text.length) {
    el.textContent += text.charAt(i);
    i++;
    setTimeout(typeText, 120);
  }
}

changeBackground();
setInterval(changeBackground, 5000);
setTimeout(typeText, 1200);
