/**
 * DevNexus - Interactive Testimonials Carousel
 * Touch-swipe enabled, keyboard accessible, auto-playing with hover pause
 */

class TestimonialsCarousel {
  constructor() {
    this.track = document.getElementById("carousel-track");
    this.slides = document.querySelectorAll(".carousel-slide");
    this.dotsContainer = document.getElementById("carousel-dots");
    this.prevBtn = document.getElementById("carousel-prev-btn");
    this.nextBtn = document.getElementById("carousel-next-btn");

    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.autoPlayInterval = null;
    this.autoPlayDelay = 6000;

    // Touch gesture tracking
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.minSwipeDistance = 40;

    if (this.totalSlides > 0) {
      this.init();
    }
  }

  init() {
    this.createDots();
    this.bindEvents();
    this.goToSlide(0);
    this.startAutoPlay();
  }

  createDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = "";

    for (let i = 0; i < this.totalSlides; i++) {
      const dot = document.createElement("button");
      dot.className = `carousel-dot ${i === 0 ? "active" : ""}`;
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => {
        this.goToSlide(i);
        if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(540);
      });
      this.dotsContainer.appendChild(dot);
    }
  }

  updateDots() {
    if (!this.dotsContainer) return;
    const dots = this.dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === this.currentIndex);
    });
  }

  goToSlide(index) {
    if (index < 0) {
      this.currentIndex = this.totalSlides - 1;
    } else if (index >= this.totalSlides) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = index;
    }

    if (this.track) {
      this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
    }

    this.updateDots();
  }

  next() {
    this.goToSlide(this.currentIndex + 1);
    if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(600);
  }

  prev() {
    this.goToSlide(this.currentIndex - 1);
    if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(520);
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        this.prev();
        this.resetAutoPlay();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        this.next();
        this.resetAutoPlay();
      });
    }

    // Touch Swipe gestures
    if (this.track) {
      this.track.addEventListener("touchstart", (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
        this.stopAutoPlay();
      }, { passive: true });

      this.track.addEventListener("touchend", (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
        this.startAutoPlay();
      }, { passive: true });

      // Pause on hover
      this.track.parentElement.addEventListener("mouseenter", () => this.stopAutoPlay());
      this.track.parentElement.addEventListener("mouseleave", () => this.startAutoPlay());
    }

    // Keyboard navigation when carousel or its controls have focus
    document.addEventListener("keydown", (e) => {
      if (document.activeElement && this.track && this.track.parentElement.contains(document.activeElement)) {
        if (e.key === "ArrowLeft") {
          this.prev();
          this.resetAutoPlay();
        } else if (e.key === "ArrowRight") {
          this.next();
          this.resetAutoPlay();
        }
      }
    });
  }

  handleSwipe() {
    const diff = this.touchStartX - this.touchEndX;
    if (Math.abs(diff) > this.minSwipeDistance) {
      if (diff > 0) {
        this.next(); // swipe left -> show next
      } else {
        this.prev(); // swipe right -> show prev
      }
    }
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => {
      this.next();
    }, this.autoPlayDelay);
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  resetAutoPlay() {
    this.startAutoPlay();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.DevNexusCarousel = new TestimonialsCarousel();
});

