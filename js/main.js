document.addEventListener("DOMContentLoaded", () => {
  initSelectionNav();
  initNavigation();
  initHeaderScroll();
  initWhatsAppLinks();
  initContactForm();
  initProductPage();
  initStonePage();
  initSelectionButtons();
  initSelectionPage();
  initRevealOnScroll();
  initSocialLinks();
  initSoftParallax();
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

function initHeaderScroll() {
  const header = document.querySelector(".site-header");
  if (!header) return;

  const update = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  update();
  window.addEventListener("scroll", update, { passive: true });
}

function initWhatsAppLinks() {
  const config = window.MAISON_AUREL_CONFIG || {};
  const number = String(config.whatsappNumber || "").replace(/\D/g, "");
  const defaultMessage = config.whatsappDefaultMessage || "Bonjour Maison Aurel, je souhaite un conseil.";

  document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
    const message = link.getAttribute("data-whatsapp-message") || defaultMessage;
    const encoded = encodeURIComponent(message);
    link.href = number ? `https://wa.me/${number}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
    link.target = "_blank";
    link.rel = "noopener";
    if (!link.querySelector(".wa-icon") && (link.classList.contains("whatsapp-float") || link.classList.contains("btn-whatsapp") || link.classList.contains("whatsapp-inline"))) {
      link.innerHTML = `<span class="wa-icon" aria-hidden="true"><i class="fa-brands fa-whatsapp"></i></span><span>${link.textContent.trim() || "WhatsApp"}</span>`;
    }
  });
}

function initSocialLinks() {
  const config = window.MAISON_AUREL_CONFIG || {};
  if (!document.querySelector(".social-dock")) {
    const dock = document.createElement("div");
    dock.className = "social-dock";
    dock.setAttribute("aria-label", "Réseaux Maison Aurel");
    dock.innerHTML = `
      <a href="${config.instagramUrl || "#"}" target="_blank" rel="noopener" aria-label="Instagram Maison Aurel"><i class="fa-brands fa-instagram" aria-hidden="true"></i></a>
      <a href="${config.facebookUrl || "#"}" target="_blank" rel="noopener" aria-label="Facebook Maison Aurel"><i class="fa-brands fa-facebook-f" aria-hidden="true"></i></a>
    `;
    document.body.appendChild(dock);
  }
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
      `Type de demande : ${data.get("project") || "À préciser"}`,
      `Message : ${data.get("message") || ""}`
    ].join("\n");

    const summaryNode = form.querySelector(".form-summary");
    if (summaryNode) {
      summaryNode.value = summary;
      summaryNode.classList.add("show");
    }

    const whatsappLink = form.querySelector("[data-whatsapp-link]");
    if (whatsappLink) {
      const config = window.MAISON_AUREL_CONFIG || {};
      const number = String(config.whatsappNumber || "").replace(/\D/g, "");
      const encoded = encodeURIComponent(`Bonjour Maison Aurel,\n\n${summary}`);
      whatsappLink.href = number ? `https://wa.me/${number}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
      whatsappLink.classList.add("show");
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
  const productId = params.get("id") || Object.keys(window.MAISON_AUREL_PRODUCTS)[0];
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
  const whatsapp = document.querySelector("[data-product-whatsapp]");
  if (whatsapp) {
    whatsapp.setAttribute("data-whatsapp-message", `Bonjour Maison Aurel, je souhaite recevoir un conseil pour ${product.name}. Merci de m'indiquer le budget, la disponibilité et le délai.`);
    initWhatsAppLinks();
  }

  if (visual) {
    visual.className = `product-visual ${product.tone}`;
    visual.innerHTML = "";
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    visual.appendChild(image);
  }

  if (specs) renderKeyValues(specs, product.specs);

  setSelectionButton({
    type: "Bijou",
    id: productId,
    name: product.name,
    meta: product.range,
    price: product.price,
    url: `produit.html?id=${encodeURIComponent(productId)}`
  });
}

function initStonePage() {
  const title = document.querySelector("#stoneTitle");
  if (!title || !window.MAISON_AUREL_STONES) return;

  const params = new URLSearchParams(window.location.search);
  const stone = window.MAISON_AUREL_STONES[params.get("id")] || window.MAISON_AUREL_STONES.saphir;
  const stoneId = params.get("id") || "saphir";
  const meta = document.querySelector("#stoneMeta");
  const intro = document.querySelector("#stoneIntro");
  const specs = document.querySelector("#stoneSpecs");
  const image = document.querySelector("#stoneImage");
  const gallery = document.querySelector("#stoneGallery");
  const approach = document.querySelector("#stoneApproach");
  const checklist = document.querySelector("#stoneChecklist");
  const source = document.querySelector("#stoneSource");
  const whatsapp = document.querySelector("[data-stone-whatsapp]");

  document.title = `${stone.name} - Maison Aurel`;
  title.textContent = stone.title;
  if (meta) meta.textContent = stone.name;
  if (intro) intro.textContent = stone.meta;
  if (approach) approach.textContent = stone.approach;
  if (image) {
    image.src = stone.image;
    image.alt = stone.name;
  }
  if (gallery) renderStoneGallery(gallery, image, stone);
  if (checklist) renderList(checklist, stone.checklist);
  if (whatsapp) {
    whatsapp.setAttribute("data-whatsapp-message", `Bonjour Maison Aurel, je souhaite un conseil pour ${stone.name}. Merci de me guider sur la pierre, le budget et la possibilite de montage en bijou.`);
  }
  if (source) {
    source.href = stone.source;
    source.textContent = stone.sourceLabel;
  }
  if (specs) renderHistorySections(specs, stone.sections);

  setSelectionButton({
    type: "Pierre",
    id: stoneId,
    name: stone.name,
    meta: "Pierre seule ou base de création",
    price: "Sur devis selon disponibilité",
    url: `pierre.html?id=${encodeURIComponent(stoneId)}`
  });
}

function getSelection() {
  try {
    return JSON.parse(localStorage.getItem("maisonAurelSelection") || "[]");
  } catch (error) {
    return [];
  }
}

function saveSelection(items) {
  localStorage.setItem("maisonAurelSelection", JSON.stringify(items));
  updateSelectionCount();
}

function addToSelection(item) {
  const items = getSelection();
  const key = `${item.type}:${item.id}`;
  const exists = items.some((entry) => `${entry.type}:${entry.id}` === key);
  if (!exists) {
    items.push({ ...item, addedAt: new Date().toISOString() });
    saveSelection(items);
  }
  return !exists;
}

function removeFromSelection(key) {
  const items = getSelection().filter((entry) => `${entry.type}:${entry.id}` !== key);
  saveSelection(items);
  renderSelectionPage();
}

function clearSelection() {
  saveSelection([]);
  renderSelectionPage();
}

function initSelectionNav() {
  const nav = document.querySelector(".nav-links");
  if (!nav || nav.querySelector("[data-selection-count]")) return;
  const item = document.createElement("li");
  item.innerHTML = `<a class="selection-nav-link" href="selection.html">Sélection <span data-selection-count>0</span></a>`;
  nav.appendChild(item);
  updateSelectionCount();
}

function updateSelectionCount() {
  const count = getSelection().length;
  document.querySelectorAll("[data-selection-count]").forEach((node) => {
    node.textContent = String(count);
    node.classList.toggle("has-items", count > 0);
  });
}

function setSelectionButton(item) {
  const button = document.querySelector("[data-add-selection]");
  if (!button) return;
  button.dataset.selectionItem = JSON.stringify(item);
  const inSelection = getSelection().some((entry) => `${entry.type}:${entry.id}` === `${item.type}:${item.id}`);
  button.textContent = inSelection ? "Déjà dans ma sélection" : "Ajouter à ma sélection";
  button.classList.toggle("is-added", inSelection);
}

function initSelectionButtons() {
  document.querySelectorAll("[data-add-selection]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = JSON.parse(button.dataset.selectionItem || "{}");
      if (!item.id) return;
      const added = addToSelection(item);
      button.textContent = added ? "Ajouté à ma sélection" : "Déjà dans ma sélection";
      button.classList.add("is-added");
    });
  });
}

function initSelectionPage() {
  if (!document.querySelector("[data-selection-page]")) return;
  renderSelectionPage();
}

function renderSelectionPage() {
  const list = document.querySelector("[data-selection-list]");
  const empty = document.querySelector("[data-selection-empty]");
  const actions = document.querySelector("[data-selection-actions]");
  const whatsapp = document.querySelector("[data-selection-whatsapp]");
  if (!list) return;

  const items = getSelection();
  list.innerHTML = "";
  if (empty) empty.hidden = items.length > 0;
  if (actions) actions.hidden = items.length === 0;

  items.forEach((item) => {
    const key = `${item.type}:${item.id}`;
    const card = document.createElement("article");
    card.className = "selection-item";
    card.innerHTML = `
      <div>
        <span class="price-range">${item.type}</span>
        <h2>${item.name}</h2>
        <p>${item.meta || ""}</p>
        <p class="product-price">${item.price || "Sur devis"}</p>
      </div>
      <div class="selection-item-actions">
        <a class="btn btn-small" href="${item.url}">Voir fiche</a>
        <button class="btn btn-small" type="button" data-remove-selection="${key}">Retirer</button>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll("[data-remove-selection]").forEach((button) => {
    button.addEventListener("click", () => removeFromSelection(button.dataset.removeSelection));
  });

  document.querySelectorAll("[data-clear-selection]").forEach((button) => {
    button.onclick = clearSelection;
  });

  if (whatsapp) {
    const message = buildSelectionMessage(items);
    const number = String((window.MAISON_AUREL_CONFIG || {}).whatsappNumber || "").replace(/\D/g, "");
    const encoded = encodeURIComponent(message);
    whatsapp.href = number ? `https://wa.me/${number}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
    whatsapp.target = "_blank";
    whatsapp.rel = "noopener";
  }
}

function buildSelectionMessage(items) {
  const lines = items.map((item, index) => (
    `${index + 1}. ${item.type} - ${item.name}\n${item.meta || ""}\n${item.price || "Sur devis"}\n${location.origin}${location.pathname.replace(/[^/]*$/, "")}${item.url}`
  ));
  return `Bonjour Maison Aurel,\n\nJe souhaite recevoir un conseil pour cette sélection :\n\n${lines.join("\n\n")}\n\nMerci de me confirmer disponibilité, budget final, délai et modalités de commande.`;
}

function renderStoneGallery(container, mainImage, stone) {
  container.innerHTML = "";
  const images = stone.gallery && stone.gallery.length ? stone.gallery : [stone.image];
  images.forEach((src, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = index === 0 ? "is-active" : "";
    button.setAttribute("aria-label", `Afficher le visuel ${index + 1} de ${stone.name}`);
    button.innerHTML = `<img loading="lazy" decoding="async" src="${src}" alt="">`;
    button.addEventListener("click", () => {
      if (mainImage) {
        mainImage.src = src;
        mainImage.alt = `${stone.name} - visuel ${index + 1}`;
      }
      container.querySelectorAll("button").forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
    });
    container.appendChild(button);
  });
}

function renderList(container, entries = []) {
  container.innerHTML = "";
  entries.forEach((value) => {
    const item = document.createElement("li");
    item.textContent = value;
    container.appendChild(item);
  });
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

function initRevealOnScroll() {
  const targets = document.querySelectorAll("section, .product-card, .stone-card, .blog-card, .collection-card, .article-content h2, .article-content p, .stone-story-content > *, .history-list article, .stone-advice-panel");
  targets.forEach((target, index) => {
    target.classList.add("reveal");
    target.style.setProperty("--reveal-delay", `${Math.min(index % 6, 5) * 70}ms`);
  });

  if (!("IntersectionObserver" in window)) {
    targets.forEach((target) => target.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

  targets.forEach((target) => observer.observe(target));
}

function initSoftParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const images = document.querySelectorAll(".hero-visual img, .article-image, .stone-gallery-main, .contact-hero-image");
  if (!images.length) return;

  let ticking = false;
  const update = () => {
    images.forEach((image) => {
      const rect = image.getBoundingClientRect();
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      if (rect.bottom < 0 || rect.top > viewport) return;
      const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
      image.style.setProperty("--parallax-y", `${Math.max(-10, Math.min(10, progress * -18))}px`);
    });
    ticking = false;
  };

  const requestUpdate = () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  };

  update();
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
}
