window.MAISON_AUREL_PRODUCTS = {
  "ess-saphir": {
    name: "Pendentif saphir bleu",
    range: "Collection Essentielle",
    price: "Indication : 1.400 DH",
    image: "images/product-sapphire-pendant.png",
    tone: "sapphire",
    meta: "Or et saphir sélectionné",
    description: "Un pendentif épuré imaginé pour laisser la profondeur du saphir bleu dialoguer avec une monture sobre.",
    specs: {
      Pierre: "Saphir",
      Monture: "Or, finition polie",
      Usage: "Quotidien, cadeau, première sélection",
      Disponibilité: "Selon sélection atelier",
      Note: "Indication variable selon le poids d'or et la pierre disponible"
    }
  },
  "ess-rubis": {
    name: "Bague rubis délicate",
    range: "Collection Essentielle",
    price: "Indication : 1.800 DH",
    image: "images/product-ruby-ring.png",
    tone: "ruby",
    meta: "Or et rubis rouge",
    description: "Une bague fine au caractère chaleureux, conçue pour souligner l'intensité du rubis sans alourdir la ligne.",
    specs: { Pierre: "Rubis", Monture: "Or, finition polie", Style: "Ligne épurée", Disponibilité: "Selon taille et pierre", Note: "Pièce ajustable selon disponibilité" }
  },
  "ess-emeraude": {
    name: "Pendentif émeraude",
    range: "Collection Essentielle",
    price: "Indication : 1.900 DH",
    image: "images/product-emerald-pendant.png",
    tone: "emerald",
    meta: "Or et émeraude lumineuse",
    description: "Une pièce lumineuse autour d'une émeraude choisie pour sa couleur, pensée comme une création essentielle.",
    specs: { Pierre: "Émeraude", Monture: "Or, finition polie", Style: "Pendentif", Disponibilité: "Sur demande", Note: "La nuance de vert peut varier selon la pierre" }
  },
  "ess-diamant-labo": {
    name: "Clou diamant de laboratoire",
    range: "Collection Essentielle",
    price: "Indication : 1.600 DH",
    image: "images/product-lab-diamond-stud.png",
    tone: "diamond",
    meta: "Or et diamant de laboratoire",
    description: "Un bijou discret et lumineux qui met en avant l'éclat du diamant de laboratoire dans une ligne contemporaine.",
    specs: { Pierre: "Diamant de laboratoire", Monture: "Or, finition polie", Style: "Minimal", Disponibilité: "Selon caractéristiques", Note: "Caractéristiques précisées selon la pierre disponible" }
  },
  "sig-saphir": {
    name: "Bague saphir profond",
    range: "Collection Signature",
    price: "Indication : 4.800 DH",
    image: "images/product-sapphire-pendant.png",
    tone: "sapphire",
    meta: "Or et saphir bleu",
    description: "Une bague de caractère, construite autour d'un saphir bleu expressif et d'une monture équilibrée.",
    specs: { Pierre: "Saphir", Monture: "Or", Gamme: "Signature", Note: "Sur devis selon pierre et taille" }
  },
  "sig-rubis": {
    name: "Pendentif rubis signature",
    range: "Collection Signature",
    price: "Indication : 5.200 DH",
    image: "images/product-ruby-ring.png",
    tone: "ruby",
    meta: "Or et rubis central",
    description: "Un pendentif centré sur l'intensité du rubis, pour une pièce marquée sans perdre en sobriété.",
    specs: { Pierre: "Rubis", Monture: "Or", Gamme: "Signature", Note: "Couleur et dimensions précisées lors du conseil" }
  },
  "sig-emeraude": {
    name: "Bague émeraude",
    range: "Collection Signature",
    price: "Indication : 6.400 DH",
    image: "images/product-emerald-pendant.png",
    tone: "emerald",
    meta: "Or et émeraude ovale",
    description: "Une bague élégante autour d'une émeraude ovale, pensée pour valoriser la couleur et la présence de la pierre.",
    specs: { Pierre: "Émeraude", Monture: "Or", Gamme: "Signature", Note: "Fiche descriptive fournie lorsque disponible" }
  },
  "sig-diamant-labo": {
    name: "Solitaire diamant de laboratoire",
    range: "Collection Signature",
    price: "Indication : 6.900 DH",
    image: "images/product-lab-diamond-stud.png",
    tone: "diamond",
    meta: "Or et diamant de laboratoire",
    description: "Un solitaire contemporain qui met en relation l'éclat du diamant de laboratoire, la précision de la ligne et l'équilibre de la monture.",
    specs: { Pierre: "Diamant de laboratoire", Monture: "Or", Gamme: "Signature", Note: "Détails de la pierre confirmés avant commande" }
  }
};

Object.entries(window.MAISON_AUREL_PRODUCTS).forEach(([id, product]) => {
  const isSignature = id.startsWith("sig-");
  product.status = product.status || "Sur demande";
  product.availabilityLabel = product.availabilityLabel || (isSignature ? "Sur devis après choix de la pierre" : "Selon disponibilité atelier");
  product.delay = product.delay || (isSignature ? "Délai confirmé au devis" : "Délai indicatif confirmé sur WhatsApp");
  product.uniqueness = product.uniqueness || (isSignature ? "Pièce personnalisable" : "Petite série ou pièce adaptée selon pierre");
  product.specs = {
    ...product.specs,
    Statut: product.status,
    Disponibilité: product.specs.Disponibilité || product.availabilityLabel,
    Délai: product.delay,
    Type: product.uniqueness
  };
});
