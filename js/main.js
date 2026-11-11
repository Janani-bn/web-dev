/**
 * Janani B N - Main Application Orchestrator
 * Coordinates navigation, smooth interactions, active scrollspy, and metric animations
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Drawer Navigation
  const mobileToggle = document.getElementById("mobile-toggle");
  const navLinks = document.getElementById("nav-links");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      mobileToggle.classList.toggle("active");
      mobileToggle.setAttribute("aria-expanded", isOpen);
      if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(isOpen ? 640 : 440);
    });

    // Close mobile menu when clicking any nav link
    navLinks.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !mobileToggle.contains(e.target)) {
        navLinks.classList.remove("open");
        mobileToggle.classList.remove("active");
        mobileToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 2. Active Link Highlighting with IntersectionObserver (Scrollspy)
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  const observerOptions = {
    root: null,
    rootMargin: "-25% 0px -65% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navItems.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, observerOptions);

  sections.forEach((sec) => observer.observe(sec));

  // 3. Animated Metric Numbers
  const metricsSection = document.getElementById("hero-metrics");
  if (metricsSection) {
    let animated = false;

    const animateNumber = (el, target, prefix = "", suffix = "", decimals = 0, duration = 1600) => {
      const startTime = performance.now();
      const startVal = 0;

      const step = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentVal = (startVal + (target - startVal) * easeOut).toFixed(decimals);

        el.textContent = `${prefix}${currentVal}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${prefix}${target}${suffix}`;
        }
      };

      requestAnimationFrame(step);
    };

    const metricObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !animated) {
        animated = true;
        const cards = metricsSection.querySelectorAll(".metric-number");
        cards.forEach((card) => {
          const target = parseFloat(card.dataset.target);
          if (!isNaN(target)) {
            const prefix = card.dataset.prefix || "";
            const suffix = card.dataset.suffix || "";
            const decimals = parseInt(card.dataset.decimals || "0", 10);
            animateNumber(card, target, prefix, suffix, decimals);
          }
        });
        metricObserver.disconnect();
      }
    }, { threshold: 0.3 });

    metricObserver.observe(metricsSection);
  }

  // 4. Skills Progress Bars Animation on Viewport Entry
  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    let skillsAnimated = false;
    const skillsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        const bars = skillsSection.querySelectorAll(".progress-fill");
        bars.forEach((bar) => {
          const width = bar.dataset.width || "85%";
          bar.style.width = width;
        });
        skillsObserver.disconnect();
      }
    }, { threshold: 0.25 });

    skillsObserver.observe(skillsSection);
  }

  // 5. Back To Top smooth action
  const backToTopBtn = document.getElementById("back-to-top-btn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(700);
    });
  }

  // 6. Global Contact Action
  const hireMeBtn = document.getElementById("hire-me-btn");
  if (hireMeBtn) {
    hireMeBtn.addEventListener("click", () => {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
        const nameInput = document.getElementById("contact-name");
        if (nameInput) setTimeout(() => nameInput.focus(), 600);
      }
      if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(680);
    });
  }
});
