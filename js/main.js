document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initHeaderScroll();
  initWhatsAppLinks();
  initContactForm();
  initProductPage();
  initStonePage();
  initRevealOnScroll();
  initSocialLinks();
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
      `Message : ${data.get("message") || ""}`
    ].join("\n");

    const summaryNode = form.querySelector(".form-summary");
    if (summaryNode) summaryNode.value = summary;

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

function initRevealOnScroll() {
  const targets = document.querySelectorAll("section, .product-card, .stone-card, .blog-card, .collection-card, .article-content h2, .article-content p");
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
