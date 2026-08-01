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
      link.innerHTML = `<span class="wa-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20.5 11.8a8.4 8.4 0 0 1-12.4 7.4L4 20.4l1.3-4A8.3 8.3 0 1 1 20.5 11.8Zm-8.4-6.7a6.7 6.7 0 0 0-5.7 10.2l.2.3-.8 2.3 2.4-.8.3.2a6.7 6.7 0 1 0 3.6-12.2Zm3.8 9.8c-.2.6-1.1 1.1-1.6 1.2-.4.1-.9.2-2.9-.6-2.4-1-3.9-3.4-4-3.6-.1-.1-1-1.3-1-2.5s.6-1.8.9-2c.2-.2.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.7 1.7c.1.2.1.4 0 .6l-.4.5c-.1.2-.3.3-.1.6.2.3.7 1.1 1.4 1.8 1 .8 1.8 1.1 2.1 1.2.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l1.6.8c.3.2.5.2.6.4.1.1.1.6-.1 1Z"/></svg></span><span>${link.textContent.trim() || "WhatsApp"}</span>`;
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
      <a href="${config.instagramUrl || "#"}" target="_blank" rel="noopener" aria-label="Instagram Maison Aurel"><svg viewBox="0 0 24 24"><path d="M7.8 2h8.4A5.8 5.8 0 0 1 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8A5.8 5.8 0 0 1 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2Zm0 2A3.8 3.8 0 0 0 4 7.8v8.4A3.8 3.8 0 0 0 7.8 20h8.4a3.8 3.8 0 0 0 3.8-3.8V7.8A3.8 3.8 0 0 0 16.2 4H7.8Zm4.2 3.5A4.5 4.5 0 1 1 12 16.5a4.5 4.5 0 0 1 0-9Zm0 2A2.5 2.5 0 1 0 12 14.5 2.5 2.5 0 0 0 12 9.5Zm5-2.3a1.1 1.1 0 1 1-1.1 1.1A1.1 1.1 0 0 1 17 7.2Z"/></svg></a>
      <a href="${config.facebookUrl || "#"}" target="_blank" rel="noopener" aria-label="Facebook Maison Aurel"><svg viewBox="0 0 24 24"><path d="M14 8.5V6.9c0-.7.5-.9 1-.9h2V2.3c-.9-.1-1.8-.2-2.7-.2-2.7 0-4.5 1.6-4.5 4.6v1.8H7v4h2.8V22H14v-9.5h2.8l.5-4H14Z"/></svg></a>
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
