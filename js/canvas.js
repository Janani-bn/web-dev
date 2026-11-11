/**
 * DevNexus - Interactive Neural Particle Canvas
 * High-performance, 60fps responsive canvas simulation with mouse physics & theme adaptation
 */

class HeroCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.particleCount = 55;
    this.maxDistance = 140;
    this.mouse = { x: null, y: null, radius: 160 };

    this.primaryColor = { r: 6, g: 182, b: 212 };
    this.isRunning = true;

    this.init();
  }

  init() {
    this.resize();
    this.updateThemeColors();
    this.createParticles();
    this.bindEvents();
    this.animate();
  }

  updateThemeColors() {
    // Read computed style of root to get primary rgb
    const style = getComputedStyle(document.documentElement);
    const rgbStr = style.getPropertyValue("--primary-rgb").trim();
    if (rgbStr) {
      const parts = rgbStr.split(",").map((p) => parseInt(p.trim(), 10));
      if (parts.length === 3) {
        this.primaryColor = { r: parts[0], g: parts[1], b: parts[2] };
      }
    }
  }

  resize() {
    this.width = this.canvas.parentElement.clientWidth;
    this.height = this.canvas.parentElement.clientHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // Adjust particle density based on screen size
    if (this.width < 768) {
      this.particleCount = 30;
      this.maxDistance = 100;
      this.mouse.radius = 110;
    } else {
      this.particleCount = 65;
      this.maxDistance = 150;
      this.mouse.radius = 170;
    }

    if (this.particles.length > 0) {
      this.createParticles();
    }
  }

  createParticles() {
    this.particles = [];
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.9,
        vy: (Math.random() - 0.5) * 0.9,
        radius: Math.random() * 2 + 1.2,
        baseRadius: Math.random() * 2 + 1.2,
        alpha: Math.random() * 0.5 + 0.3,
      });
    }
  }

  bindEvents() {
    window.addEventListener("resize", () => this.resize());

    // Mouse Tracking over hero section
    const hero = this.canvas.parentElement;
    hero.addEventListener("mousemove", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.mouse.x = e.clientX - rect.left;
      this.mouse.y = e.clientY - rect.top;
    });

    hero.addEventListener("mouseleave", () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Touch support for mobile devices
    hero.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = e.touches[0].clientX - rect.left;
        this.mouse.y = e.touches[0].clientY - rect.top;
      }
    }, { passive: true });

    hero.addEventListener("touchend", () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    // Pause when tab is hidden to conserve system battery/resources
    document.addEventListener("visibilitychange", () => {
      this.isRunning = !document.hidden;
      if (this.isRunning) {
        this.animate();
      }
    });
  }

  animate() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Update and draw particles
    const { r, g, b } = this.primaryColor;

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Physics move
      p.x += p.vx;
      p.y += p.vy;

      // Bounce at boundary
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse interaction (gentle attraction / disturbance)
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = this.mouse.x - p.x;
        const dy = this.mouse.y - p.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.mouse.radius) {
          const force = (1 - dist / this.mouse.radius) * 1.5;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;

          // Connect cursor to particle
          const cursorAlpha = (1 - dist / this.mouse.radius) * 0.45;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${cursorAlpha})`;
          this.ctx.lineWidth = 1.2;
          this.ctx.stroke();
        }
      }

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.alpha})`;
      this.ctx.fill();

      // Connect particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.hypot(dx, dy);

        if (dist < this.maxDistance) {
          const lineAlpha = (1 - dist / this.maxDistance) * 0.22;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
          this.ctx.lineWidth = 0.85;
          this.ctx.stroke();
        }
      }
    }

    requestAnimationFrame(() => this.animate());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.heroCanvas = new HeroCanvas("hero-canvas");
});

