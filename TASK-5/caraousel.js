let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide img');

function showSlide(index) {
  slides.forEach((img, i) => {
    img.style.display = i === index ? 'block' : 'none';
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

// Initialize carousel
showSlide(currentSlide);
