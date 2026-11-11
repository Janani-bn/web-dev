/**
 * DevNexus - Interactive Web Dev Lab
 * Suite of 3 real-time interactive tools:
 * 1. Live Code Sandbox (HTML/CSS/JS execution)
 * 2. Color Palette & WCAG 2.1 Contrast Studio
 * 3. 2D Particle Physics Simulator
 */

class WebDevLab {
  constructor() {
    this.currentTab = "sandbox";
    this.codePresets = {
      orb: {
        title: "Neon Orb 3D",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: radial-gradient(circle, #111827 0%, #030712 100%);
    overflow: hidden;
  }
  .orb-container {
    perspective: 800px;
  }
  .neon-orb {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #06b6d4, #3b82f6 50%, #1e1b4b 90%);
    box-shadow: 
      0 0 25px rgba(6, 182, 212, 0.6),
      0 0 60px rgba(59, 130, 246, 0.4),
      inset -10px -10px 30px rgba(0, 0, 0, 0.8),
      inset 10px 10px 20px rgba(255, 255, 255, 0.4);
    animation: float 4s ease-in-out infinite, pulse 3s ease-in-out infinite alternate;
    cursor: pointer;
    transition: transform 0.3s;
  }
  .neon-orb:hover {
    transform: scale(1.15) rotate(15deg);
  }
  .ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 220px;
    height: 60px;
    border: 2px solid rgba(6, 182, 212, 0.5);
    border-radius: 50%;
    transform: translate(-50%, -50%) rotateX(75deg);
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.5);
    animation: spinRing 6s linear infinite;
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-18px); }
  }
  @keyframes spinRing {
    0% { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(0deg); }
    100% { transform: translate(-50%, -50%) rotateX(75deg) rotateZ(360deg); }
  }
</style>
</head>
<body>
  <div class="orb-container">
    <div class="ring"></div>
    <div class="neon-orb"></div>
  </div>
</body>
</html>`
      },
      glass: {
        title: "Glassmorphism Card 3D",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #1e1b4b, #311042);
    font-family: system-ui, sans-serif;
  }
  .glass-card {
    background: rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 20px;
    padding: 30px;
    max-width: 280px;
    color: #fff;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
    transform-style: preserve-3d;
    transition: transform 0.4s ease, box-shadow 0.4s ease;
  }
  .glass-card:hover {
    transform: translateY(-8px) rotateX(6deg) rotateY(-6deg);
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.6);
  }
  .chip {
    display: inline-block;
    padding: 4px 10px;
    background: rgba(236, 72, 153, 0.25);
    border: 1px solid #ec4899;
    border-radius: 99px;
    font-size: 11px;
    text-transform: uppercase;
    font-weight: bold;
    color: #f472b6;
  }
  h3 { margin: 16px 0 8px 0; font-size: 20px; }
  p { font-size: 13px; color: #cbd5e1; line-height: 1.5; }
  button {
    margin-top: 14px;
    padding: 10px 18px;
    border-radius: 10px;
    border: none;
    background: linear-gradient(135deg, #ec4899, #8b5cf6);
    color: #fff;
    font-weight: 600;
    cursor: pointer;
  }
</style>
</head>
<body>
  <div class="glass-card">
    <span class="chip">Next Gen</span>
    <h3>Frosted Glass</h3>
    <p>Pure modern CSS backdrop-filter with depth, subtle lighting and smooth 3D tilt.</p>
    <button>Explore Feature</button>
  </div>
</body>
</html>`
      },
      cyber: {
        title: "Cyberpunk Button",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #09090b;
    font-family: 'Courier New', monospace;
  }
  .cyber-btn {
    position: relative;
    padding: 18px 40px;
    background: #fcee0a;
    color: #050505;
    font-size: 16px;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: 3px;
    border: none;
    cursor: pointer;
    clip-path: polygon(15% 0, 100% 0, 100% 70%, 85% 100%, 0 100%, 0 30%);
    box-shadow: 6px 0 0 #00f0ff;
    transition: all 0.2s;
  }
  .cyber-btn:hover {
    background: #00f0ff;
    color: #000;
    box-shadow: -6px 0 0 #ff003c;
    transform: scale(1.05);
  }
  .cyber-btn::after {
    content: '01_ACTIVATE';
    position: absolute;
    bottom: -18px;
    right: 0;
    font-size: 10px;
    color: #00f0ff;
    letter-spacing: 1px;
  }
</style>
</head>
<body>
  <button class="cyber-btn" onclick="alert('System Initialized')">DevNexus</button>
</body>
</html>`
      },
      matrix: {
        title: "Matrix Digital Rain",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; background: #000; overflow: hidden; }
  canvas { display: block; }
</style>
</head>
<body>
<canvas id="c"></canvas>
<script>
  const c = document.getElementById("c");
  const ctx = c.getContext("2d");
  c.width = window.innerWidth;
  c.height = window.innerHeight;
  const chars = "JANANI010101<>{}[]#*=~+";
  const fontSize = 14;
  const columns = c.width / fontSize;
  const drops = Array.from({length: columns}).fill(1);

  function draw() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.08)";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#00ff88";
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > c.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 35);
</script>
</body>
</html>`
      },
      dijkstra: {
        title: "Dijkstra Pathfinding (CartZen Engine)",
        code: `<!DOCTYPE html>
<html>
<head>
<style>
  body {
    margin: 0;
    font-family: system-ui, sans-serif;
    background: #0b0f19;
    color: #f8fafc;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px;
  }
  h3 { margin: 0 0 4px 0; font-size: 16px; color: #06b6d4; }
  p { font-size: 12px; color: #94a3b8; margin: 0 0 12px 0; text-align: center; }
  .grid {
    display: grid;
    grid-template-columns: repeat(12, 22px);
    gap: 2px;
    background: #1e293b;
    padding: 6px;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.5);
  }
  .cell {
    width: 22px;
    height: 22px;
    background: #0f172a;
    border-radius: 3px;
    cursor: pointer;
    transition: background 0.2s;
  }
  .cell:hover { background: #334155; }
  .cell.start { background: #10b981 !important; box-shadow: 0 0 8px #10b981; }
  .cell.end { background: #ef4444 !important; box-shadow: 0 0 8px #ef4444; }
  .cell.wall { background: #475569 !important; }
  .cell.visited { background: rgba(6, 182, 212, 0.4); }
  .cell.path { background: #facc15 !important; box-shadow: 0 0 10px #facc15; }
  .controls { margin-top: 12px; display: flex; gap: 8px; }
  button {
    background: #06b6d4;
    color: #fff;
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
  }
  button:hover { background: #0891b2; }
  button.reset { background: #334155; }
</style>
</head>
<body>
  <h3>CartZen Dijkstra Pathfinding Engine</h3>
  <p>Click cells to toggle store aisles (walls). Green = Start, Red = Target.</p>
  <div id="grid" class="grid"></div>
  <div class="controls">
    <button onclick="runDijkstra()">Find Shortest Path</button>
    <button class="reset" onclick="initGrid()">Reset Grid</button>
  </div>

<script>
  const ROWS = 10, COLS = 12;
  let start = { r: 1, c: 1 };
  let end = { r: 8, c: 10 };
  let walls = new Set();
  const gridEl = document.getElementById("grid");

  function initGrid() {
    gridEl.innerHTML = "";
    walls.clear();
    // Default obstacle aisle
    for (let r = 3; r <= 6; r++) walls.add(\`\${r},5\`);
    for (let r = 3; r <= 6; r++) walls.add(\`\${r},8\`);

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.id = \`c-\${r}-\${c}\`;
        if (r === start.r && c === start.c) cell.classList.add("start");
        else if (r === end.r && c === end.c) cell.classList.add("end");
        else if (walls.has(\`\${r},\${c}\`)) cell.classList.add("wall");

        cell.onclick = () => {
          if ((r === start.r && c === start.c) || (r === end.r && c === end.c)) return;
          const key = \`\${r},\${c}\`;
          if (walls.has(key)) {
            walls.delete(key);
            cell.classList.remove("wall");
          } else {
            walls.add(key);
            cell.classList.add("wall");
          }
        };
        gridEl.appendChild(cell);
      }
    }
  }

  async function runDijkstra() {
    // Clear previous path
    document.querySelectorAll(".cell.visited, .cell.path").forEach(c => {
      c.classList.remove("visited", "path");
    });

    const dist = {}, prev = {};
    const unvisited = [];

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const key = \`\${r},\${c}\`;
        dist[key] = Infinity;
        unvisited.push({ r, c });
      }
    }

    const startKey = \`\${start.r},\${start.c}\`;
    dist[startKey] = 0;

    while (unvisited.length > 0) {
      unvisited.sort((a, b) => dist[\`\${a.r},\${a.c}\`] - dist[\`\${b.r},\${b.c}\`]);
      const current = unvisited.shift();
      const currKey = \`\${current.r},\${current.c}\`;

      if (dist[currKey] === Infinity) break;
      if (current.r === end.r && current.c === end.c) break;

      const el = document.getElementById(\`c-\${current.r}-\${current.c}\`);
      if (el && !el.classList.contains("start") && !el.classList.contains("end")) {
        el.classList.add("visited");
      }

      const neighbors = [
        { r: current.r - 1, c: current.c },
        { r: current.r + 1, c: current.c },
        { r: current.r, c: current.c - 1 },
        { r: current.r, c: current.c + 1 }
      ];

      for (const n of neighbors) {
        if (n.r >= 0 && n.r < ROWS && n.c >= 0 && n.c < COLS) {
          const nKey = \`\${n.r},\${n.c}\`;
          if (!walls.has(nKey)) {
            const alt = dist[currKey] + 1;
            if (alt < dist[nKey]) {
              dist[nKey] = alt;
              prev[nKey] = current;
            }
          }
        }
      }
      await new Promise(res => setTimeout(res, 18));
    }

    // Draw shortest path
    let curr = prev[\`\${end.r},\${end.c}\`];
    while (curr && !(curr.r === start.r && curr.c === start.c)) {
      const pathEl = document.getElementById(\`c-\${curr.r}-\${curr.c}\`);
      if (pathEl) pathEl.classList.add("path");
      curr = prev[\`\${curr.r},\${curr.c}\`];
      await new Promise(res => setTimeout(res, 25));
    }
  }

  initGrid();
</script>
</body>
</html>`
      }
    };

    this.init();
  }

  init() {
    this.bindTabNavigation();
    this.initSandbox();
    this.initPaletteStudio();
    this.initPhysicsSimulator();
  }

  bindTabNavigation() {
    const tabBtns = document.querySelectorAll(".lab-tab-btn");
    const panels = document.querySelectorAll(".lab-panel");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;
        this.currentTab = tab;

        tabBtns.forEach((b) => b.classList.toggle("active", b === btn));
        panels.forEach((p) => p.classList.toggle("active", p.id === `lab-${tab}`));

        if (window.DevNexusTheme) {
          window.DevNexusTheme.playPopSound(580);
        }

        // If physics tab opened, resize physics canvas
        if (tab === "physics" && this.physicsEngine) {
          this.physicsEngine.resize();
        }
      });
    });
  }

  /* ------------------------------------------------------------------------
     Tool 1: Live Code Sandbox
     ------------------------------------------------------------------------ */
  initSandbox() {
    const textarea = document.getElementById("sandbox-textarea");
    const iframe = document.getElementById("sandbox-iframe");
    const presetSelect = document.getElementById("sandbox-preset-select");
    const runBtn = document.getElementById("sandbox-run-btn");
    const copyBtn = document.getElementById("sandbox-copy-btn");
    const resetBtn = document.getElementById("sandbox-reset-btn");

    if (!textarea || !iframe) return;

    // Load initial preset
    const loadPreset = (presetKey) => {
      const preset = this.codePresets[presetKey] || this.codePresets.orb;
      textarea.value = preset.code;
      this.runSandboxCode(textarea.value, iframe);
    };

    if (presetSelect) {
      presetSelect.addEventListener("change", (e) => {
        loadPreset(e.target.value);
        if (window.DevNexusToast) {
          window.DevNexusToast.show(`Loaded "${this.codePresets[e.target.value]?.title || 'Preset'}"`, "info");
        }
      });
    }

    if (runBtn) {
      runBtn.addEventListener("click", () => {
        this.runSandboxCode(textarea.value, iframe);
        if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(650);
        if (window.DevNexusToast) window.DevNexusToast.show("Sandbox preview refreshed!", "success");
      });
    }

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(textarea.value);
          if (window.DevNexusToast) window.DevNexusToast.show("Code copied to clipboard!", "success");
          if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(750);
        } catch {
          if (window.DevNexusToast) window.DevNexusToast.show("Failed to copy code", "error");
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const currentPreset = presetSelect ? presetSelect.value : "orb";
        loadPreset(currentPreset);
        if (window.DevNexusToast) window.DevNexusToast.show("Code reset to preset defaults", "info");
      });
    }

    // Initial run
    loadPreset("dijkstra");
  }

  runSandboxCode(code, iframe) {
    iframe.srcdoc = code;
  }

  /* ------------------------------------------------------------------------
     Tool 2: Color Palette & WCAG 2.1 Contrast Studio
     ------------------------------------------------------------------------ */
  initPaletteStudio() {
    const colorInput = document.getElementById("palette-base-color");
    const harmonySelect = document.getElementById("palette-harmony-select");
    const randomizeBtn = document.getElementById("palette-randomize-btn");
    const copyPaletteBtn = document.getElementById("palette-copy-all-btn");

    if (!colorInput) return;

    const generateAndRender = () => {
      const baseHex = colorInput.value;
      const harmony = harmonySelect ? harmonySelect.value : "analogous";
      const colors = this.generateHarmonyColors(baseHex, harmony);
      this.renderPalette(colors);
      this.updateContrastMatrix(colors[0].hex);
    };

    colorInput.addEventListener("input", generateAndRender);
    if (harmonySelect) harmonySelect.addEventListener("change", generateAndRender);

    if (randomizeBtn) {
      randomizeBtn.addEventListener("click", () => {
        const randomHex = "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, "0");
        colorInput.value = randomHex;
        generateAndRender();
        if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(600);
      });
    }

    if (copyPaletteBtn) {
      copyPaletteBtn.addEventListener("click", () => {
        const swatches = document.querySelectorAll(".swatch-hex");
        const hexList = Array.from(swatches).map((s) => s.textContent.trim()).join(", ");
        navigator.clipboard.writeText(hexList).then(() => {
          if (window.DevNexusToast) window.DevNexusToast.show(`Copied 5 palette colors: ${hexList}`, "success");
          if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(720);
        });
      });
    }

    generateAndRender();
  }

  generateHarmonyColors(baseHex, mode) {
    const hsl = this.hexToHsl(baseHex);

    const palettes = [];
    const roles = ["Base Color", "Complementary", "Vibrant Accent", "Soft Tint", "Deep Shade"];

    let hues = [];
    switch (mode) {
      case "analogous":
        hues = [hsl.h, (hsl.h + 30) % 360, (hsl.h + 60) % 360, (hsl.h - 30 + 360) % 360, (hsl.h - 60 + 360) % 360];
        break;
      case "triadic":
        hues = [hsl.h, (hsl.h + 120) % 360, (hsl.h + 240) % 360, (hsl.h + 60) % 360, (hsl.h + 180) % 360];
        break;
      case "monochromatic":
        return [
          { hex: baseHex, role: "Base Color" },
          { hex: this.hslToHex(hsl.h, hsl.s, Math.min(92, hsl.l + 30)), role: "Light Tint" },
          { hex: this.hslToHex(hsl.h, hsl.s, Math.min(80, hsl.l + 15)), role: "Soft" },
          { hex: this.hslToHex(hsl.h, hsl.s, Math.max(15, hsl.l - 20)), role: "Dark Tone" },
          { hex: this.hslToHex(hsl.h, hsl.s, Math.max(8, hsl.l - 35)), role: "Deep Shade" }
        ];
      default: // complementary
        hues = [hsl.h, (hsl.h + 180) % 360, (hsl.h + 30) % 360, (hsl.h + 210) % 360, (hsl.h + 150) % 360];
    }

    return hues.map((h, i) => {
      let l = hsl.l;
      if (i === 3) l = Math.min(85, l + 25);
      if (i === 4) l = Math.max(15, l - 30);
      return {
        hex: this.hslToHex(h, hsl.s, l),
        role: roles[i]
      };
    });
  }

  renderPalette(colors) {
    const container = document.getElementById("palette-swatches-container");
    if (!container) return;

    container.innerHTML = colors.map((c) => `
      <div class="swatch-card" data-hex="${c.hex}" title="Click to copy ${c.hex}">
        <div class="swatch-color" style="background-color: ${c.hex};">
          <span class="copy-hint">Copy Hex</span>
        </div>
        <div class="swatch-info">
          <div class="swatch-hex">${c.hex.toUpperCase()}</div>
          <div class="swatch-role">${c.role}</div>
        </div>
      </div>
    `).join("");

    container.querySelectorAll(".swatch-card").forEach((card) => {
      card.addEventListener("click", () => {
        const hex = card.dataset.hex;
        navigator.clipboard.writeText(hex).then(() => {
          if (window.DevNexusToast) window.DevNexusToast.show(`Copied color ${hex.toUpperCase()}!`, "info");
          if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(700);
        });
      });
    });
  }

  updateContrastMatrix(colorHex) {
    const darkBg = "#0f172a";
    const lightBg = "#ffffff";

    const ratioDark = this.calculateContrastRatio(colorHex, darkBg);
    const ratioLight = this.calculateContrastRatio(colorHex, lightBg);

    // Update Dark Preview Card
    const darkPreview = document.getElementById("contrast-preview-dark");
    if (darkPreview) {
      darkPreview.style.backgroundColor = darkBg;
      darkPreview.style.color = colorHex;
      darkPreview.querySelector(".ratio-badge").textContent = `${ratioDark.toFixed(2)}:1`;

      const aaBadge = darkPreview.querySelector(".wcag-aa");
      const aaaBadge = darkPreview.querySelector(".wcag-aaa");

      const passesAA = ratioDark >= 4.5;
      const passesAAA = ratioDark >= 7.0;

      aaBadge.className = `wcag-pill ${passesAA ? 'wcag-pass' : 'wcag-fail'}`;
      aaBadge.textContent = passesAA ? "AA Pass" : "AA Fail";

      aaaBadge.className = `wcag-pill ${passesAAA ? 'wcag-pass' : 'wcag-fail'}`;
      aaaBadge.textContent = passesAAA ? "AAA Pass" : "AAA Fail";
    }

    // Update Light Preview Card
    const lightPreview = document.getElementById("contrast-preview-light");
    if (lightPreview) {
      lightPreview.style.backgroundColor = lightBg;
      lightPreview.style.color = colorHex;
      lightPreview.querySelector(".ratio-badge").textContent = `${ratioLight.toFixed(2)}:1`;

      const aaBadge = lightPreview.querySelector(".wcag-aa");
      const aaaBadge = lightPreview.querySelector(".wcag-aaa");

      const passesAA = ratioLight >= 4.5;
      const passesAAA = ratioLight >= 7.0;

      aaBadge.className = `wcag-pill ${passesAA ? 'wcag-pass' : 'wcag-fail'}`;
      aaBadge.textContent = passesAA ? "AA Pass" : "AA Fail";

      aaaBadge.className = `wcag-pill ${passesAAA ? 'wcag-pass' : 'wcag-fail'}`;
      aaaBadge.textContent = passesAAA ? "AAA Pass" : "AAA Fail";
    }
  }

  calculateContrastRatio(hex1, hex2) {
    const lum1 = this.getLuminance(hex1);
    const lum2 = this.getLuminance(hex2);
    const brightest = Math.max(lum1, lum2);
    const darkest = Math.min(lum1, lum2);
    return (brightest + 0.05) / (darkest + 0.05);
  }

  getLuminance(hex) {
    const rgb = this.hexToRgb(hex);
    const a = [rgb.r, rgb.g, rgb.b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  hexToRgb(hex) {
    let clean = hex.replace("#", "");
    if (clean.length === 3) {
      clean = clean.split("").map((c) => c + c).join("");
    }
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  hexToHsl(hex) {
    const { r, g, b } = this.hexToRgb(hex);
    const rNorm = r / 255, gNorm = g / 255, bNorm = b / 255;
    const max = Math.max(rNorm, gNorm, bNorm), min = Math.min(rNorm, gNorm, bNorm);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
        case gNorm: h = (bNorm - rNorm) / d + 2; break;
        case bNorm: h = (rNorm - gNorm) / d + 4; break;
      }
      h /= 6;
    }
    return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
  }

  hslToHex(h, s, l) {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = (n) => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, "0");
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  }

  /* ------------------------------------------------------------------------
     Tool 3: Particle Physics Simulator
     ------------------------------------------------------------------------ */
  initPhysicsSimulator() {
    const canvas = document.getElementById("physics-canvas");
    if (!canvas) return;

    this.physicsEngine = new PhysicsEngine(canvas);
  }
}

class PhysicsEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.particles = [];
    this.gravity = 0.35;
    this.bounce = 0.75;
    this.friction = 0.99;
    this.isMouseDown = false;

    this.colors = ["#06b6d4", "#a855f7", "#ec4899", "#10b981", "#f59e0b", "#3b82f6"];

    this.init();
  }

  init() {
    this.resize();
    this.bindControls();
    this.spawnInitialParticles(25);
    this.loop();
  }

  resize() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight || 420;
  }

  bindControls() {
    window.addEventListener("resize", () => this.resize());

    const gravitySlider = document.getElementById("physics-gravity");
    const bounceSlider = document.getElementById("physics-bounce");
    const clearBtn = document.getElementById("physics-clear-btn");
    const explodeBtn = document.getElementById("physics-explode-btn");

    if (gravitySlider) {
      gravitySlider.addEventListener("input", (e) => {
        this.gravity = parseFloat(e.target.value);
      });
    }

    if (bounceSlider) {
      bounceSlider.addEventListener("input", (e) => {
        this.bounce = parseFloat(e.target.value);
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        this.particles = [];
        if (window.DevNexusToast) window.DevNexusToast.show("Physics canvas cleared", "info");
      });
    }

    if (explodeBtn) {
      explodeBtn.addEventListener("click", () => {
        this.explodeAt(this.canvas.width / 2, this.canvas.height / 2);
        if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(400);
      });
    }

    // Canvas click & drag interaction
    this.canvas.addEventListener("mousedown", (e) => {
      this.isMouseDown = true;
      const rect = this.canvas.getBoundingClientRect();
      this.spawnParticle(e.clientX - rect.left, e.clientY - rect.top);
      if (window.DevNexusTheme) window.DevNexusTheme.playPopSound(700);
    });

    window.addEventListener("mouseup", () => {
      this.isMouseDown = false;
    });

    this.canvas.addEventListener("mousemove", (e) => {
      if (this.isMouseDown) {
        const rect = this.canvas.getBoundingClientRect();
        this.spawnParticle(e.clientX - rect.left, e.clientY - rect.top);
      }
    });

    // Touch support
    this.canvas.addEventListener("touchstart", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      for (let i = 0; i < e.touches.length; i++) {
        this.spawnParticle(e.touches[i].clientX - rect.left, e.touches[i].clientY - rect.top);
      }
    }, { passive: true });
  }

  spawnInitialParticles(count) {
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * (this.canvas.height / 2),
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 5,
        radius: Math.random() * 8 + 6,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }

  spawnParticle(x, y) {
    if (this.particles.length > 180) {
      this.particles.shift(); // keep performance smooth
    }
    this.particles.push({
      x,
      y,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.7) * 9,
      radius: Math.random() * 9 + 5,
      color: this.colors[Math.floor(Math.random() * this.colors.length)]
    });
  }

  explodeAt(centerX, centerY) {
    for (let i = 0; i < 40; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      this.particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 8 + 4,
        color: this.colors[Math.floor(Math.random() * this.colors.length)]
      });
    }
  }

  loop() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Apply gravity & friction
      p.vy += this.gravity;
      p.vx *= this.friction;
      p.vy *= this.friction;

      p.x += p.vx;
      p.y += p.vy;

      // Floor collision
      if (p.y + p.radius > this.canvas.height) {
        p.y = this.canvas.height - p.radius;
        p.vy = -p.vy * this.bounce;
        // Dampen horizontal motion on floor contact
        p.vx *= 0.95;
      }

      // Ceiling collision
      if (p.y - p.radius < 0) {
        p.y = p.radius;
        p.vy = -p.vy * this.bounce;
      }

      // Left & Right walls
      if (p.x + p.radius > this.canvas.width) {
        p.x = this.canvas.width - p.radius;
        p.vx = -p.vx * this.bounce;
      } else if (p.x - p.radius < 0) {
        p.x = p.radius;
        p.vx = -p.vx * this.bounce;
      }

      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = p.color;
      this.ctx.shadowColor = p.color;
      this.ctx.shadowBlur = 10;
      this.ctx.fill();
      this.ctx.shadowBlur = 0;
    }

    requestAnimationFrame(() => this.loop());
  }
}

document.addEventListener("DOMContentLoaded", () => {
  window.DevNexusLab = new WebDevLab();
});

