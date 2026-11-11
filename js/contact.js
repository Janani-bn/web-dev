/**
 * DevNexus - Interactive Contact Form & Toast Notification Engine
 * Real-time field validation, accessible live regions, and notification alerts
 */

class ToastEngine {
  constructor() {
    this.container = document.getElementById("toast-container");
    if (!this.container) {
      this.container = document.createElement("div");
      this.container.id = "toast-container";
      this.container.className = "toast-container";
      this.container.setAttribute("aria-live", "polite");
      this.container.setAttribute("aria-atomic", "true");
      document.body.appendChild(this.container);
    }
  }

  show(message, type = "info", duration = 4000) {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;

    let icon = "💡";
    if (type === "success") icon = "✅";
    if (type === "error") icon = "❌";
    if (type === "warning") icon = "⚠️";

    toast.innerHTML = `
      <span style="font-size: 1.1rem;">${icon}</span>
      <span style="flex: 1;">${message}</span>
      <button class="toast-close-btn" aria-label="Dismiss alert">&times;</button>
    `;

    const closeBtn = toast.querySelector(".toast-close-btn");
    closeBtn.addEventListener("click", () => this.dismiss(toast));

    this.container.appendChild(toast);

    if (duration > 0) {
      setTimeout(() => this.dismiss(toast), duration);
    }
  }

  dismiss(toast) {
    if (!toast || !toast.parentElement) return;
    toast.style.opacity = "0";
    toast.style.transform = "translateX(30px)";
    setTimeout(() => {
      if (toast.parentElement) {
        toast.parentElement.removeChild(toast);
      }
    }, 260);
  }
}

window.DevNexusToast = new ToastEngine();

class ContactFormHandler {
  constructor() {
    this.form = document.getElementById("contact-form");
    if (!this.form) return;

    this.nameInput = document.getElementById("contact-name");
    this.emailInput = document.getElementById("contact-email");
    this.subjectSelect = document.getElementById("contact-subject");
    this.messageInput = document.getElementById("contact-message");
    this.charCounter = document.getElementById("message-char-count");
    this.submitBtn = document.getElementById("contact-submit-btn");

    this.emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.init();
  }

  init() {
    this.bindValidation();
    this.bindSubmit();
  }

  bindValidation() {
    // Name validation
    this.nameInput.addEventListener("input", () => this.validateField(this.nameInput, (val) => val.trim().length >= 2, "Please enter at least 2 characters"));
    this.nameInput.addEventListener("blur", () => this.validateField(this.nameInput, (val) => val.trim().length >= 2, "Please enter at least 2 characters"));

    // Email validation
    this.emailInput.addEventListener("input", () => this.validateField(this.emailInput, (val) => this.emailRegex.test(val.trim()), "Please enter a valid email address"));
    this.emailInput.addEventListener("blur", () => this.validateField(this.emailInput, (val) => this.emailRegex.test(val.trim()), "Please enter a valid email address"));

    // Message input & character counter
    this.messageInput.addEventListener("input", () => {
      const len = this.messageInput.value.length;
      const max = 500;
      if (this.charCounter) {
        this.charCounter.textContent = `${len} / ${max} characters`;
        if (len > max) {
          this.charCounter.style.color = "var(--error)";
        } else {
          this.charCounter.style.color = "var(--text-muted)";
        }
      }
      this.validateField(this.messageInput, (val) => val.trim().length >= 15 && val.trim().length <= max, "Message must be between 15 and 500 characters");
    });
  }

  validateField(input, testFn, errorMessage) {
    const errorEl = document.getElementById(`${input.id}-error`);
    const isValid = testFn(input.value);

    if (isValid) {
      input.classList.remove("invalid");
      input.classList.add("valid");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("visible");
      }
      return true;
    } else {
      input.classList.remove("valid");
      input.classList.add("invalid");
      if (errorEl) {
        errorEl.textContent = errorMessage;
        errorEl.classList.add("visible");
      }
      return false;
    }
  }

  bindSubmit() {
    this.form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const isNameValid = this.validateField(this.nameInput, (val) => val.trim().length >= 2, "Please enter at least 2 characters");
      const isEmailValid = this.validateField(this.emailInput, (val) => this.emailRegex.test(val.trim()), "Please enter a valid email address");
      const isMessageValid = this.validateField(this.messageInput, (val) => val.trim().length >= 15 && val.trim().length <= 500, "Message must be between 15 and 500 characters");

      if (!isNameValid || !isEmailValid || !isMessageValid) {
        window.DevNexusToast.show("Please fix the highlighted errors before submitting.", "error");
        if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(340);
        return;
      }

      // Enter loading state
      const originalText = this.submitBtn.innerHTML;
      this.submitBtn.disabled = true;
      this.submitBtn.innerHTML = `
        <svg class="spin-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="animation: spin 0.8s linear infinite;">
          <circle cx="12" cy="12" r="10" stroke-opacity="0.25"></circle>
          <path d="M12 2a10 10 0 0 1 10 10"></path>
        </svg>
        <span>Sending Message...</span>
      `;

      if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(500);

      // Simulate network request
      await new Promise((resolve) => setTimeout(resolve, 1100));

      // Reset loading state
      this.submitBtn.disabled = false;
      this.submitBtn.innerHTML = originalText;

      // Show success
      window.DevNexusToast.show(`Thank you, ${this.nameInput.value.trim()}! Your message has been sent successfully.`, "success", 5000);
      if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(880);

      // Reset form
      this.form.reset();
      this.nameInput.classList.remove("valid", "invalid");
      this.emailInput.classList.remove("valid", "invalid");
      this.messageInput.classList.remove("valid", "invalid");
      if (this.charCounter) this.charCounter.textContent = "0 / 500 characters";
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new ContactFormHandler();
});

