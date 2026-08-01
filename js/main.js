document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initContactForm();
  initProductPage();
  initStonePage();
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
    if (summaryNode) summaryNode.value = summary;

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

  if (visual) {
    visual.className = `product-visual ${product.tone}`;
    visual.innerHTML = "";
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    visual.appendChild(image);
  }

  if (specs) renderKeyValues(specs, product.specs);
}

function initStonePage() {
  const title = document.querySelector("#stoneTitle");
  if (!title || !window.MAISON_AUREL_STONES) return;

  const params = new URLSearchParams(window.location.search);
  const stone = window.MAISON_AUREL_STONES[params.get("id")] || window.MAISON_AUREL_STONES.saphir;
  const meta = document.querySelector("#stoneMeta");
  const intro = document.querySelector("#stoneIntro");
  const specs = document.querySelector("#stoneSpecs");
  const image = document.querySelector("#stoneImage");
  const source = document.querySelector("#stoneSource");

  document.title = `${stone.name} - Maison Aurel`;
  title.textContent = stone.title;
  if (meta) meta.textContent = stone.name;
  if (intro) intro.textContent = stone.meta;
  if (image) {
    image.src = stone.image;
    image.alt = stone.name;
  }
  if (source) {
    source.href = stone.source;
    source.textContent = stone.sourceLabel;
  }
  if (specs) renderHistorySections(specs, stone.sections);
}

function renderKeyValues(container, entries) {
  container.innerHTML = "";
  Object.entries(entries).forEach(([label, value]) => {
    const item = document.createElement("span");
    item.innerHTML = `<strong>${label}</strong><br>${value}`;
    container.appendChild(item);
  });
}

function renderHistorySections(container, entries) {
  container.innerHTML = "";
  Object.entries(entries).forEach(([title, body]) => {
    const section = document.createElement("article");
    section.innerHTML = `<h2>${title}</h2><p>${body}</p>`;
    container.appendChild(section);
  });
}
