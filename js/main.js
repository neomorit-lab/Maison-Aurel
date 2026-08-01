document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initContactForm();
  initProductPage();
  initStonePage();
  initGemCanvases();
});

function initNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("open");
    document.body.classList.toggle("menu-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("open");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function initStonePage() {
  const title = document.querySelector("#stoneTitle");
  if (!title || !window.MAISON_AUREL_STONES) return;

  const params = new URLSearchParams(window.location.search);
  const stone = window.MAISON_AUREL_STONES[params.get("id")] || window.MAISON_AUREL_STONES.saphir;
  const meta = document.querySelector("#stoneMeta");
  const intro = document.querySelector("#stoneIntro");
  const specs = document.querySelector("#stoneSpecs");
  const stage = document.querySelector("[data-gem-canvas]");

  document.title = `${stone.name} - Maison Aurel`;
  title.textContent = stone.title;
  if (meta) meta.textContent = stone.name;
  if (intro) intro.textContent = stone.meta;
  if (stage) {
    stage.dataset.gemColor = stone.color;
    stage.dataset.gemAccent = stone.accent;
  }

  if (specs) {
    specs.innerHTML = "";
    Object.entries(stone.points).forEach(([label, value]) => {
      const item = document.createElement("span");
      item.innerHTML = `<strong>${label}</strong><br>${value}`;
      specs.appendChild(item);
    });
  }
}

function initGemCanvases() {
  document.querySelectorAll("[data-gem-canvas] canvas").forEach((canvas) => {
    const stage = canvas.closest("[data-gem-canvas]");
    const color = stage?.dataset.gemColor || "#173f7a";
    const accent = stage?.dataset.gemAccent || "#ffffff";
    animateGem(canvas, color, accent);
  });
}

function animateGem(canvas, color, accent) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const vertices = [
    [0, -1.05, 0.2], [0.72, -0.48, 0.18], [0.95, 0.22, 0.05], [0.45, 0.92, -0.12],
    [-0.45, 0.92, -0.12], [-0.95, 0.22, 0.05], [-0.72, -0.48, 0.18],
    [0, 0, 0.72], [0, 0, -0.72]
  ];
  const faces = [
    [0, 1, 7], [1, 2, 7], [2, 3, 7], [3, 4, 7], [4, 5, 7], [5, 6, 7], [6, 0, 7],
    [1, 0, 8], [2, 1, 8], [3, 2, 8], [4, 3, 8], [5, 4, 8], [6, 5, 8], [0, 6, 8]
  ];
  let rotation = 0;

  function hexToRgb(hex) {
    const normalized = hex.replace("#", "");
    const value = parseInt(normalized.length === 3 ? normalized.split("").map((c) => c + c).join("") : normalized, 16);
    return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
  }

  function project([x, y, z]) {
    const cos = Math.cos(rotation);
    const sin = Math.sin(rotation);
    const rx = x * cos - z * sin;
    const rz = x * sin + z * cos;
    const scale = canvas.width * 0.27 / (1.9 + rz);
    return [canvas.width / 2 + rx * scale, canvas.height / 2 + y * scale, rz];
  }

  function frame() {
    const [r, g, b] = hexToRgb(color);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const glow = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 20, canvas.width / 2, canvas.height / 2, canvas.width * 0.42);
    glow.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0.26)`);
    glow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    faces.map((face) => {
      const pts = face.map((index) => project(vertices[index]));
      return { pts, depth: pts.reduce((sum, point) => sum + point[2], 0) / pts.length };
    }).sort((a, b) => a.depth - b.depth).forEach(({ pts, depth }, index) => {
      const light = Math.max(0.18, Math.min(0.82, 0.45 + depth * 0.35 + (index % 3) * 0.08));
      ctx.beginPath();
      ctx.moveTo(pts[0][0], pts[0][1]);
      pts.slice(1).forEach((point) => ctx.lineTo(point[0], point[1]));
      ctx.closePath();
      ctx.fillStyle = `rgba(${Math.round(r * light)}, ${Math.round(g * light)}, ${Math.round(b * light)}, 0.9)`;
      ctx.fill();
      ctx.strokeStyle = "rgba(255,255,255,0.42)";
      ctx.lineWidth = 1.2;
      ctx.stroke();
    });

    ctx.beginPath();
    ctx.arc(canvas.width * (0.44 + Math.sin(rotation) * 0.06), canvas.height * 0.35, 9, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.72;
    ctx.fill();
    ctx.globalAlpha = 1;
    rotation += 0.012;
    requestAnimationFrame(frame);
  }

  frame();
}

function initContactForm() {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const summary = [
      `Nom : ${data.get("name") || ""}`,
      `Téléphone : ${data.get("phone") || ""}`,
      `Email : ${data.get("email") || ""}`,
      `Pierre : ${data.get("stone") || "À conseiller"}`,
      `Message : ${data.get("message") || ""}`
    ].join("\n");

    const summaryNode = form.querySelector(".form-summary");
    if (summaryNode) {
      summaryNode.value = summary;
    }

    const success = form.querySelector(".form-success");
    if (success) {
      success.classList.add("show");
      success.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  });
}

function initProductPage() {
  const nameNode = document.querySelector("#productName");
  if (!nameNode || !window.MAISON_AUREL_PRODUCTS) return;

  const params = new URLSearchParams(window.location.search);
  const product = window.MAISON_AUREL_PRODUCTS[params.get("id")] || Object.values(window.MAISON_AUREL_PRODUCTS)[0];
  const visual = document.querySelector("#productVisual");
  const range = document.querySelector("#productRange");
  const meta = document.querySelector("#productMeta");
  const price = document.querySelector("#productPrice");
  const description = document.querySelector("#productDescription");
  const specs = document.querySelector("#productSpecs");

  document.title = `${product.name} - Maison Aurel`;
  nameNode.textContent = product.name;
  if (range) range.textContent = product.range;
  if (meta) meta.textContent = product.meta;
  if (price) price.textContent = product.price;
  if (description) description.textContent = product.description;
  const gemStage = document.querySelector("[data-gem-canvas]");
  const stone = findStoneByTone(product.tone);
  if (gemStage && stone) {
    gemStage.dataset.gemColor = stone.color;
    gemStage.dataset.gemAccent = stone.accent;
  }
  if (visual) {
    visual.className = `product-visual ${product.tone}`;
    visual.innerHTML = "";
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    visual.appendChild(image);
  }

  if (specs) {
    specs.innerHTML = "";
    Object.entries(product.specs).forEach(([label, value]) => {
      const item = document.createElement("span");
      item.innerHTML = `<strong>${label}</strong><br>${value}`;
      specs.appendChild(item);
    });
  }
}

function findStoneByTone(tone) {
  if (!window.MAISON_AUREL_STONES) return null;
  return Object.values(window.MAISON_AUREL_STONES).find((stone) => stone.tone === tone) || null;
}
