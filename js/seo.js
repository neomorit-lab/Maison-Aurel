(function () {
  const baseUrl = "https://neomorit-lab.github.io/Maison-Aurel/";
  const path = window.location.pathname.split("/").pop() || "index.html";
  const canonicalPath = path === "index.html" ? "" : path;
  const canonicalUrl = baseUrl + canonicalPath + window.location.search;

  if (!document.querySelector('link[rel="canonical"]')) {
    const link = document.createElement("link");
    link.rel = "canonical";
    link.href = canonicalUrl;
    document.head.appendChild(link);
  }

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "JewelryStore", "LocalBusiness"],
        "@id": baseUrl + "#organization",
        "name": "Maison Aurel",
        "url": baseUrl,
        "logo": baseUrl + "images/logo-maison-aurel.jpeg",
        "image": baseUrl + "images/editorial-loose-gemstones.png",
        "areaServed": ["Rabat", "MA"],
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Rabat",
          "addressCountry": "MA"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 34.0209,
          "longitude": -6.8416
        },
        "description": "Joaillerie marocaine à Rabat spécialisée en or, pierres précieuses et créations sur demande.",
        "priceRange": "$$"
      },
      {
        "@type": "WebSite",
        "@id": baseUrl + "#website",
        "url": baseUrl,
        "name": "Maison Aurel",
        "publisher": { "@id": baseUrl + "#organization" },
        "inLanguage": "fr-MA"
      },
      {
        "@type": "WebPage",
        "@id": canonicalUrl + "#webpage",
        "url": canonicalUrl,
        "name": document.title || "Maison Aurel",
        "isPartOf": { "@id": baseUrl + "#website" },
        "inLanguage": "fr-MA"
      }
    ]
  };

  if (path.startsWith("article-")) {
    graph["@graph"].push({
      "@type": "Article",
      "headline": document.querySelector("h1")?.textContent || document.title,
      "image": document.querySelector(".article-image")?.src || baseUrl + "images/editorial-loose-gemstones.png",
      "author": { "@id": baseUrl + "#organization" },
      "publisher": { "@id": baseUrl + "#organization" },
      "mainEntityOfPage": { "@id": canonicalUrl + "#webpage" },
      "inLanguage": "fr-MA"
    });
  }

  if (path === "faq.html") {
    const questions = Array.from(document.querySelectorAll(".legal-content h2")).map((heading) => ({
      "@type": "Question",
      "name": heading.textContent,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": heading.nextElementSibling?.textContent || ""
      }
    }));
    graph["@graph"].push({ "@type": "FAQPage", "mainEntity": questions });
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(graph);
  document.head.appendChild(script);
})();
