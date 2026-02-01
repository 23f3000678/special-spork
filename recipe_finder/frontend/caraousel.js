let currentIndex = 0;

function showSlide(index) {
  const slideTrack = document.querySelector(".carousel-slide");
  const slides = document.querySelectorAll(".carousel-slide img");

  if (!slideTrack || slides.length === 0) return;

  if (index < 0) {
    currentIndex = slides.length - 1;
  } else if (index >= slides.length) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }

  slideTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
}

function nextSlide() {
  showSlide(currentIndex + 1);
}

function prevSlide() {
  showSlide(currentIndex - 1);
}

// show first slide on load
window.addEventListener("load", () => showSlide(0));
