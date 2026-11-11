/**
 * DevNexus / Janani B N - Featured Projects Engine
 * Real projects from Janani B N's resume & portfolio:
 * 1. MATSYA AI
 * 2. CartZen
 * 3. CivicFix (Open-Source GitHub Repository)
 */

const PROJECTS_DATA = [
  {
    id: "civicfix",
    title: "CivicFix - Open-Source Civic Issue Resolution Platform",
    category: "opensource",
    categoryLabel: "Open Source & Civic Tech",
    description: "An open-source community platform enabling citizens to report, track, and resolve municipal infrastructure issues (road hazards, sanitation, streetlights) with transparent incident lifecycles, verification, and community participation.",
    tags: ["Open Source", "Civic Tech", "Full-Stack", "Community Driven", "Git & GitHub"],
    repoUrl: "https://github.com/Janani-bn/CivicFix",
    metrics: [
      { label: "Repository", value: "Public GitHub" },
      { label: "Community", value: "Open Source" },
      { label: "Domain", value: "Civic Infrastructure" }
    ],
    features: [
      "Open-source repository empowering citizen problem reporting and public infrastructure transparency",
      "Full incident lifecycle management: report creation, automated categorization, status updates, and resolution audits",
      "Community collaboration tools supporting issue validation, geographic awareness, and status tracking",
      "Clean, modular codebase architected for open-source contributions through GSSoC and the global developer community"
    ]
  },
  {
    id: "matsya-ai",
    title: "MATSYA AI - Marine Analysis for Tracking, Safety and Yield Assistance",
    category: "ai",
    categoryLabel: "Marine Intelligence & Multi-Agent AI",
    description: "A specialized multi-agent AI system for marine intelligence, spatial-risk analysis, and fisherman yield assistance. Features rule-based intent routing, deterministic LLM-free data retrieval, and speech/text synthesis.",
    tags: ["Gemini API", "Multi-Agent System", "Python", "Spatial-Risk Analysis", "Rule-Based Routing", "Speech Synthesis", "NLP"],
    metrics: [
      { label: "Data Pipeline", value: "LLM-Free Reliable" },
      { label: "Traceability", value: "100% Provenance" },
      { label: "Output Modes", value: "Text & Speech" }
    ],
    features: [
      "Rule-based orchestrator for intent, language, and location detection routing to specialized marine-intelligence and spatial-risk agents",
      "Designed the final synthesis agent that merges outputs across agents, formats them into structured responses, and renders as text/speech with optional Gemini API wording",
      "Deterministic data retrieval pipeline kept completely LLM-free for mission-critical marine safety, with per-response trace, evidence provenance, and confidence scoring",
      "Spatial risk detection alerting mariners to maritime boundaries, severe weather conditions, and high-yield fishing zones"
    ]
  },
  {
    id: "cartzen",
    title: "CartZen - Retail Management & In-Store Navigation Platform",
    category: "fullstack",
    categoryLabel: "Full-Stack & Graph Optimization",
    description: "A full-stack retail management platform that cuts in-store shopping time by calculating optimal walking paths through hypermarkets using weighted graph algorithms, Dijkstra shortest-path, and TSP solvers.",
    tags: ["FastAPI", "React 18", "PostgreSQL", "TailwindCSS", "Dijkstra & TSP", "Gemini API", "JWT Auth", "Graph Algorithms"],
    metrics: [
      { label: "Pathfinding", value: "Dijkstra + TSP" },
      { label: "Rerouting", value: "Live Dynamic" },
      { label: "Stack", value: "FastAPI + React 18" }
    ],
    features: [
      "Built a full-stack platform that cuts in-store shopping time: buyers get an optimized walking route through the store instead of wandering aisles",
      "FastAPI + PostgreSQL backend paired with a high-performance React 18 + TailwindCSS frontend and secure JWT role-based authentication",
      "Navigation engine modeling store layouts as weighted graphs, using Dijkstra shortest-path + Travelling Salesperson (TSP) optimization",
      "Accessibility-conscious pathfinding that avoids stairs and narrow aisles, with real-time live rerouting on floor congestion",
      "Integrated Gemini API for an intelligent AI shopping planner, dynamic offers engine, sales analytics, and budget-tracked shopping lists"
    ]
  }
];

class ProjectsManager {
  constructor() {
    this.projects = PROJECTS_DATA;
    this.currentFilter = "all";
    this.searchQuery = "";

    this.grid = document.getElementById("projects-grid");
    this.modal = document.getElementById("project-modal");
    this.filterPills = document.querySelectorAll(".filter-pill");
    this.searchInput = document.getElementById("project-search-input");

    this.init();
  }

  init() {
    this.render();
    this.bindEvents();
    this.initModal();
  }

  bindEvents() {
    // Category Filter Buttons
    this.filterPills.forEach((pill) => {
      pill.addEventListener("click", () => {
        this.filterPills.forEach((p) => p.classList.remove("active"));
        pill.classList.add("active");
        this.currentFilter = pill.dataset.filter;
        this.render();

        if (window.DevNexusTheme) {
          window.DevNexusTheme.playPopSound(560);
        }
      });
    });

    // Real-time Search Input
    if (this.searchInput) {
      this.searchInput.addEventListener("input", (e) => {
        this.searchQuery = e.target.value.toLowerCase().trim();
        this.render();
      });
    }
  }

  getFilteredProjects() {
    return this.projects.filter((project) => {
      const matchesCategory = this.currentFilter === "all" || project.category === this.currentFilter;
      const matchesSearch =
        project.title.toLowerCase().includes(this.searchQuery) ||
        project.description.toLowerCase().includes(this.searchQuery) ||
        project.tags.some((tag) => tag.toLowerCase().includes(this.searchQuery));
      return matchesCategory && matchesSearch;
    });
  }

  render() {
    if (!this.grid) return;

    const filtered = this.getFilteredProjects();

    if (filtered.length === 0) {
      this.grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-secondary);">
          <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
          <h3 style="font-size: 1.25rem; font-weight: 700; margin-bottom: 8px;">No matching projects found</h3>
          <p>Try adjusting your search terms or category filter.</p>
        </div>
      `;
      return;
    }

    this.grid.innerHTML = filtered.map((project) => `
      <article class="project-card" data-id="${project.id}">
        <div class="project-thumb">
          <div class="project-art">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" style="opacity: 0.9;">
              ${this.getCategoryIcon(project.category)}
            </svg>
          </div>
          <span class="project-category-badge">${project.categoryLabel}</span>
        </div>
        <div class="project-body">
          <h3 class="project-title">${project.title}</h3>
          <p class="project-description">${project.description}</p>
          <div class="tech-tags">
            ${project.tags.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
          </div>
          <div class="project-footer">
            <button class="btn btn-secondary btn-sm view-details-btn" data-id="${project.id}">
              <span>View Architecture</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            ${project.repoUrl ? `
              <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="gap: 6px;">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                <span>GitHub ↗</span>
              </a>
            ` : ''}
          </div>
        </div>
      </article>
    `).join("");

    // Attach click events for modal
    this.grid.querySelectorAll(".view-details-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.dataset.id;
        this.openModal(id);
      });
    });
  }

  getCategoryIcon(category) {
    switch (category) {
      case "opensource":
        return `<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>`;
      case "ai":
        return `<path d="M12 2a10 10 0 0 1 10 10c0 5.52-4.48 10-10 10S2 17.52 2 12A10 10 0 0 1 12 2zm0 4a6 6 0 1 0 0 12 6 6 0 0 0 0-12z"></path><circle cx="12" cy="12" r="2"></circle><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line>`;
      case "fullstack":
        return `<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><path d="M6 8h.01M10 8h.01M14 8h.01"></path>`;
      default:
        return `<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>`;
    }
  }

  /* ------------------------------------------------------------------------
     Native HTML5 <dialog> Modal
     ------------------------------------------------------------------------ */
  initModal() {
    if (!this.modal) return;

    const closeBtn = document.getElementById("modal-close-btn");
    if (closeBtn) {
      closeBtn.addEventListener("click", () => this.closeModal());
    }

    // Light dismiss: close modal when clicking on backdrop
    this.modal.addEventListener("click", (e) => {
      const rect = this.modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        this.closeModal();
      }
    });

    this.modal.addEventListener("cancel", () => {
      if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(420);
    });
  }

  openModal(projectId) {
    const project = this.projects.find((p) => p.id === projectId);
    if (!project || !this.modal) return;

    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalDesc = document.getElementById("modal-desc");
    const modalMetrics = document.getElementById("modal-metrics");
    const modalFeatures = document.getElementById("modal-features");
    const modalTags = document.getElementById("modal-tags");
    const modalActions = document.getElementById("modal-actions");

    if (modalTitle) modalTitle.textContent = project.title;
    if (modalCategory) modalCategory.textContent = project.categoryLabel;
    if (modalDesc) modalDesc.textContent = project.description;

    if (modalMetrics) {
      modalMetrics.innerHTML = project.metrics.map((m) => `
        <div class="modal-metric-card">
          <div class="modal-metric-val">${m.value}</div>
          <div class="modal-metric-lbl">${m.label}</div>
        </div>
      `).join("");
    }

    if (modalFeatures) {
      modalFeatures.innerHTML = project.features.map((f) => `
        <li class="modal-feature-item">
          <span class="modal-feature-icon">▹</span>
          <span>${f}</span>
        </li>
      `).join("");
    }

    if (modalTags) {
      modalTags.innerHTML = project.tags.map((t) => `
        <span class="tech-tag">${t}</span>
      `).join("");
    }

    if (modalActions) {
      modalActions.innerHTML = `
        <button class="btn btn-secondary btn-sm" onclick="document.getElementById('project-modal').close()">Close Preview</button>
        ${project.repoUrl ? `
          <a href="${project.repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm" style="gap: 6px;">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
            <span>View on GitHub ↗</span>
          </a>
        ` : `
          <a href="#contact" class="btn btn-primary btn-sm" onclick="document.getElementById('project-modal').close()">Get in Touch</a>
        `}
      `;
    }

    // Native showModal
    this.modal.showModal();
    if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(620);
  }

  closeModal() {
    if (!this.modal) return;
    this.modal.close();
    if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(420);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.DevNexusProjects = new ProjectsManager();
});
