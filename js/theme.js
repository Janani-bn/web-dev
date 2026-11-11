/**
 * DevNexus - Theme & Audio Engine
 * Handles Dark/Light theme switching, Accent Color customization, and Web Audio UI sounds
 */

class ThemeEngine {
  constructor() {
    this.storageKeyTheme = "devnexus_theme";
    this.storageKeyAccent = "devnexus_accent";
    this.storageKeyAudio = "devnexus_audio";

    this.currentTheme = localStorage.getItem(this.storageKeyTheme) || "dark";
    this.currentAccent = localStorage.getItem(this.storageKeyAccent) || "cyan";
    this.audioEnabled = localStorage.getItem(this.storageKeyAudio) !== "false";

    this.audioCtx = null;

    this.init();
  }

  init() {
    // Apply initial theme & accent
    this.applyTheme(this.currentTheme);
    this.applyAccent(this.currentAccent);

    // Setup event listeners
    this.bindEvents();
  }

  bindEvents() {
    const themeToggleBtn = document.getElementById("theme-toggle-btn");
    const accentDropdownBtn = document.getElementById("accent-dropdown-btn");
    const accentMenu = document.getElementById("accent-menu");
    const audioToggleBtn = document.getElementById("audio-toggle-btn");

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", () => {
        const newTheme = this.currentTheme === "dark" ? "light" : "dark";
        this.applyTheme(newTheme);
        this.playPopSound(newTheme === "dark" ? 440 : 660);
      });
    }

    if (accentDropdownBtn && accentMenu) {
      accentDropdownBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        accentMenu.classList.toggle("open");
        this.playPopSound(500);
      });

      document.addEventListener("click", (e) => {
        if (!accentDropdownBtn.contains(e.target) && !accentMenu.contains(e.target)) {
          accentMenu.classList.remove("open");
        }
      });

      accentMenu.querySelectorAll(".accent-dot").forEach((dot) => {
        dot.addEventListener("click", () => {
          const accent = dot.dataset.accent;
          this.applyAccent(accent);
          accentMenu.classList.remove("open");
          this.playPopSound(720);
        });
      });
    }

    if (audioToggleBtn) {
      this.updateAudioButtonState(audioToggleBtn);
      audioToggleBtn.addEventListener("click", () => {
        this.audioEnabled = !this.audioEnabled;
        localStorage.setItem(this.storageKeyAudio, this.audioEnabled);
        this.updateAudioButtonState(audioToggleBtn);
        if (this.audioEnabled) {
          this.playPopSound(800);
          if (window.DevNexusToast) {
            window.DevNexusToast.show("Audio effects enabled 🔊", "info");
          }
        } else {
          if (window.DevNexusToast) {
            window.DevNexusToast.show("Audio effects muted 🔇", "info");
          }
        }
      });
    }
  }

  applyTheme(theme) {
    this.currentTheme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(this.storageKeyTheme, theme);

    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) {
      if (theme === "light") {
        // Sun to Moon
        themeIcon.innerHTML = `
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        `;
        themeIcon.setAttribute("aria-label", "Switch to Dark Mode");
      } else {
        // Moon to Sun
        themeIcon.innerHTML = `
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        `;
        themeIcon.setAttribute("aria-label", "Switch to Light Mode");
      }
    }

    // Trigger canvas recolor if canvas exists
    if (window.heroCanvas) {
      window.heroCanvas.updateThemeColors();
    }
  }

  applyAccent(accent) {
    this.currentAccent = accent;
    document.documentElement.setAttribute("data-accent", accent);
    localStorage.setItem(this.storageKeyAccent, accent);

    // Update active dot in dropdown
    document.querySelectorAll(".accent-dot").forEach((dot) => {
      dot.classList.toggle("active", dot.dataset.accent === accent);
    });

    if (window.heroCanvas) {
      window.heroCanvas.updateThemeColors();
    }
  }

  updateAudioButtonState(btn) {
    const icon = btn.querySelector("svg");
    if (!icon) return;
    if (this.audioEnabled) {
      icon.innerHTML = `
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      `;
      btn.title = "Mute sound effects";
    } else {
      icon.innerHTML = `
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
      `;
      btn.title = "Unmute sound effects";
    }
  }

  /**
   * Generates a sleek, organic UI pop/chime sound using Web Audio API
   */
  playPopSound(frequency = 520, duration = 0.08) {
    if (!this.audioEnabled) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      if (!this.audioCtx) {
        this.audioCtx = new AudioContext();
      }

      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, this.audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.06, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + duration);
    } catch {
      // Audio might be restricted by browser policy until gesture
    }
  }
}

window.DevNexusTheme = new ThemeEngine();

