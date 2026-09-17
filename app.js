/* ===================== DATA ===================== */
const COMPANY = {
  name: "Lanka Seagull (Pvt) Ltd",
  shortName: "Lanka Seagull",
  tagline: "Premium Seafood Products",
  addressLine1: "69/1 Mullikandal,",
  addressLine2: "Adampan,",
  addressLine3: "Sri Lanka",
  phoneDisplay: "076 117 7764",
  phoneTel: "+94761177764",
  whatsappE164: "94778348603",
  email: "lankaseagull@gmail.com",
  facebookUrl: "https://www.facebook.com/share/175gsiL2DA/?mibextid=wwXIfr",
  instagramUrl: "http://www.instagram.com/lankaseagull_company",
  mapsUrl: "https://www.google.com/maps/place/Lanka+Seagull+(pvt)+Ltd/@8.9624804,80.0043468,18.25z/data=!4m6!3m5!1s0x3afdd1c5d93fd317:0x4fd65fc7a8fc1005!8m2!3d8.9630959!4d80.0046974",
  mapsQuery: "Adampan, Mannar, Sri Lanka",
};

const NAV_LINKS = [
  { href: "index.html", page: "home", label: "Home" },
  { href: "products.html", page: "products", label: "Products" },
  { href: "about.html", page: "about", label: "About" },
  { href: "gallery.html", page: "gallery", label: "Gallery" },
  { href: "contact.html", page: "contact", label: "Contact" },
];

const CATEGORIES = [
  { id: "cat-sea-cucumber", name: "Sea Cucumber", slug: "sea-cucumber" },
  { id: "cat-sea-shells", name: "Sea Shells", slug: "sea-shells" },
  { id: "cat-other", name: "Other Seafood Products", slug: "other-seafood" },
];

const UNITS = {
  kg: { label: "KG", min: 0.5, step: 0.5 },
  pcs: { label: "PCS", min: 1, step: 1 },
};

const PRODUCT_PRICE_ADJUSTMENT = 1.5;

const PRODUCTS = [
  { id: "prod-sea-cucumber", name: "Sandfish Sea Cucumber", slug: "sea-cucumber", categoryId: "cat-sea-cucumber", description: "Premium quality sea cucumber sourced from the sea.", pricePerKg: 891, unit: "kg", available: true, featured: true, image: "sea-cucumber.jpeg" },
  { id: "prod-sea-shells", name: "Sea Shells", slug: "sea-shells", categoryId: "cat-sea-shells", description: "Natural and premium quality sea shells sourced from the sea.", pricePerKg: 801, unit: "pcs", available: true, featured: true, image: "sea-shells.jpeg" },

  // ---- Sea Cucumber varieties ----
  { id: "prod-curry-fish", name: "Curry Fish Sea Cucumber", slug: "curry-fish", categoryId: "cat-sea-cucumber", description: "Dried Curry Fish sea cucumber, hand-graded for size and quality. Update pricing anytime in admin.", pricePerKg: 941, unit: "kg", available: true, featured: true, image: "curry-fish.jpg" },
  { id: "prod-curry-fish-white", name: "Curry Fish (White Grade)", slug: "curry-fish-white", categoryId: "cat-sea-cucumber", description: "Bleached, white-grade Curry Fish sea cucumber. Update pricing anytime in admin.", pricePerKg: 991, unit: "kg", available: true, featured: false, image: "curry-fish-white.jpg" },
  { id: "prod-baby-curry-fish", name: "Baby Curry Fish", slug: "baby-curry-fish", categoryId: "cat-sea-cucumber", description: "Smaller-sized, dark-grade Curry Fish sea cucumber. Update pricing anytime in admin.", pricePerKg: 741, unit: "kg", available: true, featured: false, image: "baby-curry-fish.jpg" },
  { id: "prod-golden-sandfish-2", name: "Golden Sandfish Sea Cucumber", slug: "golden-sandfish-premium", categoryId: "cat-sea-cucumber", description: "Premium dried Golden Sandfish sea cucumber. Update pricing anytime in admin.", pricePerKg: 124, unit: "kg", available: true, featured: true, image: "golden-sandfish-2.jpg" },
  { id: "prod-loli-fish", name: "Lolly Fish Sea Cucumber", slug: "loli-fish", categoryId: "cat-sea-cucumber", description: "Dried Loli Fish sea cucumber, dark grade. Update pricing anytime in admin.", pricePerKg: 841, unit: "kg", available: true, featured: false, image: "loli-fish.webp" },
  { id: "prod-sanfish", name: "Sanfish", slug: "sanfish", categoryId: "cat-sea-cucumber", description: "Dried Sanfish sea cucumber, ridged skin, sourced and graded for export. Update pricing anytime in admin.", pricePerKg: 891, unit: "kg", available: true, featured: false, image: "sanfish.jpg" },
  { id: "prod-whate-nool", name: "Whate Nool", slug: "whate-nool", categoryId: "cat-sea-cucumber", description: "Dried Whate Nool sea cucumber. Update pricing anytime in admin.", pricePerKg: 7958, unit: "kg", available: true, featured: false, image: "whate-nool.jpg" },
  { id: "prod-whate-tiger", name: "White Tiger Sea Cucumber", slug: "whate-tiger", categoryId: "cat-sea-cucumber", description: "Dried Whate Tiger sea cucumber with distinctive textured skin. Update pricing anytime in admin.", pricePerKg: 109, unit: "kg", available: true, featured: false, image: "whate-tiger.jpg" },
  { id: "prod-xiang-pi", name: "Xiang Pi", slug: "xiang-pi", categoryId: "cat-sea-cucumber", description: "Dried Xiang Pi sea cucumber. Update pricing anytime in admin.", pricePerKg: 945, unit: "kg", available: true, featured: false, image: "xiang-pi.jpg" },
  { id: "prod-dhambela", name: "Dhambela", slug: "dhambela", categoryId: "cat-sea-cucumber", description: "Dried Dhambela sea cucumber. Update pricing anytime in admin.", pricePerKg: 845, unit: "kg", available: true, featured: false, image: "dhambela.jpg" },
  { id: "prod-surf-red-fish", name: "Surf Red Fish Sea Cucumber", slug: "surf-red-fish", categoryId: "cat-sea-cucumber", description: "Update pricing anytime in admin.", pricePerKg: 895, unit: "kg", available: true, featured: false, image: "surf-red-fish.png" },
  { id: "prod-black-tiger", name: "Black Tiger Sea Cucumber", slug: "black-tiger-sea-cucumber", categoryId: "cat-sea-cucumber", description: "Update pricing anytime in admin.", pricePerKg: 895, unit: "kg", available: true, featured: false, image: "black-tiger-sea-cucumber.png" },
  { id: "prod-black-fish", name: "Black Fish Sea Cucumber", slug: "black-fish-sea-cucumber", categoryId: "cat-sea-cucumber", description: "Update pricing anytime in admin.", pricePerKg: 895, unit: "kg", available: true, featured: false, image: "black-fish-sea-cucumber.png" },

  // ---- Sea Shell varieties ----
  { id: "prod-patty-shell", name: "Patty Shell", slug: "patty-shell", categoryId: "cat-sea-shells", description: "Natural Patty sea shells, hand selected. Update pricing anytime in admin.", pricePerKg: 858, unit: "pcs", available: true, featured: true, image: "patty-shell.jpg" },
  { id: "prod-kachchan-shell", name: "Kachchan Shell", slug: "kachchan-shell", categoryId: "cat-sea-shells", description: "Natural Kachchan sea shells, hand selected. Update pricing anytime in admin.", pricePerKg: 808, unit: "pcs", available: true, featured: false, image: "kachchan-shell.jpg" },
  { id: "prod-tapasiyem-shell", name: "Tapasiyem Shell", slug: "tapasiyem-shell", categoryId: "cat-sea-shells", description: "Natural Tapasiyem sea shells with banded patterning. Update pricing anytime in admin.", pricePerKg: 838, unit: "pcs", available: true, featured: false, image: "tapasiyem-shell.jpg" },
  { id: "prod-gavuri-shell", name: "Gavuri Shell", slug: "gavuri-shell", categoryId: "cat-sea-shells", description: "Natural Gavuri sea shells, hand selected. Update pricing anytime in admin.", pricePerKg: 808, unit: "pcs", available: true, featured: false, image: "gavuri-shell.jpg" },
  { id: "prod-jathi-shell", name: "Jathi Shell", slug: "jathi-shell", categoryId: "cat-sea-shells", description: "Natural Jathi sea shells, hand selected. Update pricing anytime in admin.", pricePerKg: 808, unit: "pcs", available: true, featured: false, image: "jathi-shell.jpg" },

  // ---- Other Seafood Products ----
  { id: "prod-dried-sea-snail", name: "Dried Sea Snail", slug: "dried-sea-snail", categoryId: "cat-other", description: "Dried sea snail meat, cleaned and prepared. Update pricing anytime in admin.", pricePerKg: 645, unit: "kg", available: true, featured: true, image: "dried-sea-snail.jpg" },
  { id: "prod-dried-sea-snail-white", name: "Dried Sea Snail (White Grade)", slug: "dried-sea-snail-white", categoryId: "cat-other", description: "Dried sea snail meat, white grade, cleaned and prepared. Update pricing anytime in admin.", pricePerKg: 695, unit: "kg", available: true, featured: false, image: "dried-sea-snail-white.jpg" },
  { id: "prod-sea-operculum-1", name: "Spider Conch Operculum", slug: "sea-operculum-natural", categoryId: "cat-other", description: "Update pricing anytime in admin.", pricePerKg: 595, unit: "kg", available: true, featured: false, image: "operculum-1.jpg" },
  { id: "prod-sea-operculum-2", name: "Murex Operculum", slug: "sea-operculum-red", categoryId: "cat-other", description: "Update pricing anytime in admin.", pricePerKg: 645, unit: "kg", available: true, featured: false, image: "images/operculum-2.jpg" },
  { id: "prod-sea-operculum-3", name: "Turbinella Pyrum Shell Operculum (Grade B)", slug: "sea-operculum-dark", categoryId: "cat-other", description: "Update pricing anytime in admin.", pricePerKg: 545, unit: "kg", available: true, featured: false, image: "operculum-3.jpg" },
  { id: "prod-sea-operculum-4", name: "Trapezium Shell Operculum (Grade B)", slug: "sea-operculum-golden", categoryId: "cat-other", description: "Update pricing anytime in admin.", pricePerKg: 695, unit: "kg", available: true, featured: false, image: "operculum-4.webp" },
  { id: "prod-sea-operculum-5", name: "Turbinella Pyrum Shell Operculum", slug: "sea-operculum-mixed", categoryId: "cat-other", description: "Update pricing anytime in admin.", pricePerKg: 545, unit: "kg", available: true, featured: false, image: "operculum-5.jpg" },
  { id: "prod-sea-operculum-6", name: "Murex Operculum (Grade B)", slug: "sea-operculum-premium-red", categoryId: "cat-other", description: "Update pricing anytime in admin.", pricePerKg: 745, unit: "kg", available: true, featured: false, image: "operculum-6.avif" },
  { id: "prod-trapezium-operculum", name: "Trapezium Shell Operculum", slug: "trapezium-shell-operculum", categoryId: "cat-other", description: "Update pricing anytime in admin.", pricePerKg: 595, unit: "kg", available: true, featured: false, image: "trapezium-shell-operculum.jpg" },

  // ---- More Sea Shell varieties ----
  { id: "prod-babylonia-shell", name: "Babylonia Shell", slug: "babylonia-shell", categoryId: "cat-sea-shells", description: "Natural Babylonia (whelk) sea shells with mottled brown patterning. Update pricing anytime in admin.", pricePerKg: 908, unit: "pcs", available: true, featured: false, image: "babylonia-shell.webp" },
  { id: "prod-cone-shell-1", name: "Cone Shell", slug: "cone-shell", categoryId: "cat-sea-shells", description: "Natural cone sea shell, hand selected. Update pricing anytime in admin.", pricePerKg: 958, unit: "pcs", available: true, featured: false, image: "cone-shell-1.webp" },
  { id: "prod-frog-shell-1", name: "Frog Shell", slug: "frog-shell", categoryId: "cat-sea-shells", description: "Natural frog sea shell with banded brown patterning. Update pricing anytime in admin.", pricePerKg: 858, unit: "pcs", available: true, featured: false, image: "frog-shell-1.jpg" },
  { id: "prod-frog-shell-2", name: "Frog Shell (Pair Grade)", slug: "frog-shell-pair", categoryId: "cat-sea-shells", description: "Natural frog sea shells, matched pair grade. Update pricing anytime in admin.", pricePerKg: 878, unit: "pcs", available: true, featured: false, image: "frog-shell-2.jpg" },
  { id: "prod-spindle-shell", name: "Spindle Shell", slug: "spindle-shell", categoryId: "cat-sea-shells", description: "Natural spindle sea shell with fine striped patterning. Update pricing anytime in admin.", pricePerKg: 908, unit: "pcs", available: true, featured: false, image: "spindle-shell.jpg" },
  { id: "prod-murex-shell", name: "Murex Shell", slug: "murex-shell", categoryId: "cat-sea-shells", description: "Natural Murex sea shell with distinctive spiky, frilled edges. Update pricing anytime in admin.", pricePerKg: 105, unit: "pcs", available: true, featured: false, image: "murex-shell.jpg" },
  { id: "prod-cone-shell-2", name: "Cone Shell (Textile Grade)", slug: "cone-shell-textile", categoryId: "cat-sea-shells", description: "Natural textile cone sea shells, orange zigzag patterning. Update pricing anytime in admin.", pricePerKg: 958, unit: "pcs", available: true, featured: false, image: "cone-shell-2.jpg" },
  { id: "prod-cone-shell-3", name: "Cone Shell (Single Grade)", slug: "cone-shell-single", categoryId: "cat-sea-shells", description: "Natural cone sea shell, single piece grade. Update pricing anytime in admin.", pricePerKg: 938, unit: "pcs", available: true, featured: false, image: "cone-shell-3.jpg" },
].map(product => ({
  ...product,
  pricePerKg: Number((product.pricePerKg + PRODUCT_PRICE_ADJUSTMENT).toFixed(2))
}));

const GALLERY_CATEGORIES = ["All","Seafood Products","Sea Cucumber","Sea Shells","Processing","Packaging","Company","Ocean / Marine"];

const GALLERY_ITEMS = [
  { id:"g1", title:"Ocean harvest", category:"Ocean / Marine", image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80" },
  { id:"g2", title:"Fresh catch display", category:"Seafood Products", image:"https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=1400&q=80" },
  { id:"g3", title:"Prepared seafood", category:"Seafood Products", image:"https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80" },
  { id:"g4", title:"Marine life", category:"Sea Cucumber", image:"https://images.unsplash.com/photo-1583212292454-1fe6229603b7?auto=format&fit=crop&w=1400&q=80" },
  { id:"g5", title:"Underwater texture", category:"Sea Cucumber", image:"https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=1400&q=80" },
  { id:"g6", title:"Natural shells", category:"Sea Shells", image:"https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=1400&q=80" },
  { id:"g7", title:"Coastal shells", category:"Sea Shells", image:"https://images.unsplash.com/photo-1471922694854-ff1b8b9cd32f?auto=format&fit=crop&w=1400&q=80" },
  { id:"g8", title:"Careful handling", category:"Processing", image:"https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?auto=format&fit=crop&w=1400&q=80" },
  { id:"g9", title:"Selection table", category:"Processing", image:"https://images.unsplash.com/photo-1534604973900-df686240d72f?auto=format&fit=crop&w=1400&q=80" },
  { id:"g10", title:"Packed with care", category:"Packaging", image:"https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1400&q=80" },
  { id:"g11", title:"Ready for dispatch", category:"Packaging", image:"https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1400&q=80" },
  { id:"g12", title:"Company workspace", category:"Company", image:"https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80" },
  { id:"g13", title:"Calm waters", category:"Ocean / Marine", image:"https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=1400&q=80" },
  { id:"g14", title:"Sri Lankan coastline", category:"Company", image:"https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80" },
  { id:"g15", title:"Graded sea cucumber", category:"Sea Cucumber", image:"sea-cucumber.jpeg" },
  { id:"g16", title:"Dried sea cucumber, Sanfish grade", category:"Sea Cucumber", image:"dried-sea-cucumber-sanfish.jpeg" },
  { id:"g17", title:"Golden Sandfish", category:"Sea Cucumber", image:"golden-sandfish.jpeg" },
  { id:"g18", title:"Natural sea shells", category:"Sea Shells", image:"sea-shells.jpeg" },
  { id:"g19", title:"Sea shells, hand selected", category:"Sea Shells", image:"sea-shells-hand-selected.jpeg" },
  { id:"g20", title:"Curry Fish sea cucumber", category:"Sea Cucumber", image:"curry-fish.jpg" },
  { id:"g21", title:"Curry Fish, white grade", category:"Sea Cucumber", image:"curry-fish-white.jpg" },
  { id:"g22", title:"Baby Curry Fish sea cucumber", category:"Sea Cucumber", image:"baby-curry-fish.jpg" },
  { id:"g23", title:"Golden Sandfish, premium grade", category:"Sea Cucumber", image:"golden-sandfish-2.jpg" },
  { id:"g24", title:"Loli Fish sea cucumber", category:"Sea Cucumber", image:"loli-fish.webp" },
  { id:"g25", title:"Sanfish sea cucumber", category:"Sea Cucumber", image:"sanfish.jpg" },
  { id:"g26", title:"Whate Nool sea cucumber", category:"Sea Cucumber", image:"whate-nool.jpg" },
  { id:"g27", title:"Whate Tiger sea cucumber", category:"Sea Cucumber", image:"whate-tiger.jpg" },
  { id:"g28", title:"Xiang Pi sea cucumber", category:"Sea Cucumber", image:"xiang-pi.jpg" },
  { id:"g29", title:"Dhambela sea cucumber", category:"Sea Cucumber", image:"dhambela.jpg" },
  { id:"g30", title:"Patty sea shells", category:"Sea Shells", image:"patty-shell.jpg" },
  { id:"g31", title:"Kachchan sea shells", category:"Sea Shells", image:"kachchan-shell.jpg" },
  { id:"g32", title:"Tapasiyem sea shells", category:"Sea Shells", image:"tapasiyem-shell.jpg" },
  { id:"g33", title:"Gavuri sea shells", category:"Sea Shells", image:"gavuri-shell.jpg" },
  { id:"g34", title:"Jathi sea shells", category:"Sea Shells", image:"jathi-shell.jpg" },
  { id:"g35", title:"Dried sea snail", category:"Seafood Products", image:"dried-sea-snail.jpg" },
  { id:"g36", title:"Dried sea snail, white grade", category:"Seafood Products", image:"dried-sea-snail-white.jpg" },
  { id:"g37", title:"Sea operculum", category:"Seafood Products", image:"operculum-1.jpg" },
  { id:"g38", title:"Sea operculum, close grade", category:"Seafood Products", image:"operculum-2.jpg" },
  { id:"g39", title:"Sea operculum, dark grade", category:"Seafood Products", image:"operculum-3.jpg" },
  { id:"g40", title:"Sea operculum, white grade", category:"Seafood Products", image:"operculum-4.webp" },
  { id:"g41", title:"Sea operculum, mixed lot", category:"Seafood Products", image:"operculum-5.jpg" },
  { id:"g42", title:"Sea operculum, bulk lot", category:"Seafood Products", image:"operculum-6.avif" },
  { id:"g43", title:"Babylonia shell", category:"Sea Shells", image:"babylonia-shell.webp" },
  { id:"g44", title:"Cone shell", category:"Sea Shells", image:"cone-shell-1.webp" },
  { id:"g45", title:"Frog shell", category:"Sea Shells", image:"frog-shell-1.jpg" },
  { id:"g46", title:"Frog shell pair", category:"Sea Shells", image:"frog-shell-2.jpg" },
  { id:"g47", title:"Spindle shell", category:"Sea Shells", image:"spindle-shell.jpg" },
  { id:"g48", title:"Murex shell", category:"Sea Shells", image:"murex-shell.jpg" },
  { id:"g49", title:"Cone shell, textile grade", category:"Sea Shells", image:"cone-shell-2.jpg" },
  { id:"g50", title:"Cone shell, single grade", category:"Sea Shells", image:"cone-shell-3.jpg" },
];

/* ===================== SOCIAL LINKS ===================== */
const SOCIAL_LINKS = [
  { key:"whatsapp", label:"WhatsApp",  url: `https://wa.me/${COMPANY.whatsappE164}`, color:"#25D366", icon:"whatsapp" },
  { key:"facebook", label:"Facebook",  url: COMPANY.facebookUrl, color:"#1877F2", icon:"facebook" },
  { key:"instagram",label:"Instagram", url: COMPANY.instagramUrl,color:"#f56040", icon:"instagram" },
  { key:"maps",     label:"Location",  url: COMPANY.mapsUrl,     color:"#EA4335", icon:"pin" },
];

function socialIconSvg(icon){
  const icons = {
    whatsapp: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2Zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1s-.6.8-.7.9-.3.2-.5.1a6.6 6.6 0 0 1-1.9-1.2 7.1 7.1 0 0 1-1.3-1.6c-.1-.2 0-.3.1-.4l.4-.4.2-.3a.5.5 0 0 0 0-.5c-.1-.1-.5-1.3-.7-1.8s-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.9 2 4.7 4.7 0 0 0 1 2.5 10.7 10.7 0 0 0 4.1 3.6c.6.2 1 .4 1.4.5a3.3 3.3 0 0 0 1.5.1 2.5 2.5 0 0 0 1.6-1.1 2 2 0 0 0 .1-1.1c-.1-.1-.2-.2-.4-.3Z"/></svg>`,
    facebook: `<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.6h2.6l.4-3h-3V8.4c0-.9.2-1.5 1.5-1.5h1.6V4.2A21 21 0 0 0 14.2 4c-2.4 0-4 1.5-4 4.1v2.3H7.5v3h2.7V21Z"/></svg>`,
    instagram: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="3.6"/><circle cx="17" cy="7" r="1" fill="currentColor" stroke="none"/></svg>`,
    pin: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s7-6.3 7-11.5A7 7 0 0 0 5 9.5C5 14.7 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.3"/></svg>`,
    phone: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6.6 10.8a15 15 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.3 11 11 0 0 0 3.5.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 11 11 0 0 0 .6 3.5 1 1 0 0 1-.3 1Z"/></svg>`,
    mail: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>`,
    home: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 11.5 12 4l8 7.5"/><path d="M6 10v9h12v-9"/></svg>`,
  };
  return icons[icon] || "";
}

function socialButtonsHtml(size){
  size = size || "footer";
  return SOCIAL_LINKS.map(s => `
    <a href="${s.url}" target="_blank" rel="noreferrer" class="${size==='footer'?'social-btn':'cc-social-btn'}" style="color:${s.color};" aria-label="${s.label}">
      ${socialIconSvg(s.icon)}
    </a>`).join("");
}

/* ===================== LANGUAGE & CURRENCY PREFERENCES ===================== */
const LANGUAGES = [
  { code:"en", label:"English" },
  { code:"si", label:"සිංහල" },
  { code:"ta", label:"தமிழ்" },
];

const CURRENCIES = [
  { code:"LKR", symbol:"Rs", label:"LKR Rs", rate:1 },
  { code:"USD", symbol:"$", label:"USD $", rate:1/305 },
  { code:"EUR", symbol:"€", label:"EUR €", rate:1/335 },
  { code:"AED", symbol:"AED", label:"AED", rate:1/83 },
  { code:"INR", symbol:"₹", label:"INR ₹", rate:1/3.65 },
  { code:"GBP", symbol:"£", label:"GBP £", rate:1/385 },
];

const I18N = {
  en: {
    navHome:"Home", navProducts:"Products", navAbout:"About", navGallery:"Gallery", navContact:"Contact",
    orderNow:"Order Now", prefTitle:"Please Choose Your Language & Currency Preferences",
    prefSub:"Set how you'd like to browse Seagull Global — you can change this anytime.",
    prefLanguage:"Language", prefCurrency:"Currency", prefNote:"Rates are indicative and update periodically.",
    prefClose:"Close", prefUpdate:"Update Preferences",
    heroTitle:"Premium Seafood, Naturally Sourced", heroSub:"Quality seafood products from Lanka Seagull (Pvt) Ltd.",
    exploreProducts:"Explore Products", whatsappUs:"WhatsApp Us", contactUs:"Contact Us",
  },
  si: {
    navHome:"මුල් පිටුව", navProducts:"නිෂ්පාදන", navAbout:"අප ගැන", navGallery:"ගැලරිය", navContact:"සම්බන්ධ වන්න",
    orderNow:"මිලදී ගන්න", prefTitle:"භාෂාව සහ මුදල් ඒකකය තෝරන්න",
    prefSub:"Seagull Global බ්‍රවුස් කරන ආකාරය සකසන්න — ඕනෑම වේලාවක වෙනස් කළ හැක.",
    prefLanguage:"භාෂාව", prefCurrency:"මුදල් ඒකකය", prefNote:"මුදල් අනුපාත දර්ශක පමණි, කලින් කලට යාවත්කාලීන වේ.",
    prefClose:"වසන්න", prefUpdate:"යාවත්කාලීන කරන්න",
    heroTitle:"උසස් තත්ත්වයේ මුහුදු ආහාර, ස්වභාවිකව සපයන ලද", heroSub:"Lanka Seagull (Pvt) Ltd වෙතින් උසස් තත්ත්වයේ මුහුදු ආහාර නිෂ්පාදන.",
    exploreProducts:"නිෂ්පාදන බලන්න", whatsappUs:"WhatsApp මගින්", contactUs:"සම්බන්ධ වන්න",
  },
  ta: {
    navHome:"முகப்பு", navProducts:"பொருட்கள்", navAbout:"எங்களைப் பற்றி", navGallery:"படத்தொகுப்பு", navContact:"தொடர்பு",
    orderNow:"ஆர்டர் செய்யவும்", prefTitle:"மொழி மற்றும் நாணய விருப்பங்களைத் தேர்வு செய்யவும்",
    prefSub:"Seagull Global-ஐ நீங்கள் எப்படி பார்க்க விரும்புகிறீர்கள் என்பதை அமைக்கவும் — எப்போது வேண்டுமானாலும் மாற்றலாம்.",
    prefLanguage:"மொழி", prefCurrency:"நாணயம்", prefNote:"விகிதங்கள் குறிப்புக்காக மட்டுமே, அவ்வப்போது புதுப்பிக்கப்படும்.",
    prefClose:"மூடு", prefUpdate:"விருப்பங்களை புதுப்பிக்கவும்",
    heroTitle:"தரமான கடல் உணவு, இயற்கையாக பெறப்பட்டது", heroSub:"Lanka Seagull (Pvt) Ltd நிறுவனத்தின் தரமான கடல் உணவு பொருட்கள்.",
    exploreProducts:"பொருட்களை பார்க்க", whatsappUs:"WhatsApp வழியாக", contactUs:"தொடர்பு கொள்ளுங்கள்",
  },
};

const PREFS_KEY = "lankaSeagullPrefs";
function loadPrefs(){
  try{
    const raw = localStorage.getItem(PREFS_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return null;
}
function savePrefs(p){
  try{ localStorage.setItem(PREFS_KEY, JSON.stringify(p)); }catch(e){}
}
const existingPrefs = loadPrefs();
const prefs = {
  language: (existingPrefs && existingPrefs.language) || "en",
  currency: (existingPrefs && existingPrefs.currency) || "LKR",
};
let pendingPrefs = { language: prefs.language, currency: prefs.currency };

function t(key){
  const dict = I18N[prefs.language] || I18N.en;
  return dict[key] !== undefined ? dict[key] : (I18N.en[key] || key);
}
function currencyInfo(code){ return CURRENCIES.find(c => c.code === code) || CURRENCIES[0]; }

function renderPrefModalOptions(){
  const langWrap = document.getElementById("prefLangOptions");
  const curWrap = document.getElementById("prefCurrencyOptions");
  document.getElementById("prefTitle").textContent = t("prefTitle");
  document.querySelector("#prefOverlay .pref-sub").textContent = t("prefSub");
  document.querySelectorAll("#prefOverlay .pref-heading")[0].textContent = t("prefLanguage");
  document.querySelectorAll("#prefOverlay .pref-heading")[1].textContent = t("prefCurrency");
  document.querySelector("#prefOverlay .pref-note").textContent = t("prefNote");
  document.getElementById("prefCloseBtn").textContent = t("prefClose");
  document.getElementById("prefUpdateBtn").textContent = t("prefUpdate");

  langWrap.innerHTML = LANGUAGES.map(l => `
    <label class="pref-option ${pendingPrefs.language===l.code?'selected':''}" data-pref-lang="${l.code}">
      <input type="radio" name="prefLang" value="${l.code}" ${pendingPrefs.language===l.code?'checked':''}>
      ${l.label}
    </label>`).join("");

  curWrap.innerHTML = CURRENCIES.map(c => `
    <label class="pref-option ${pendingPrefs.currency===c.code?'selected':''}" data-pref-cur="${c.code}">
      <input type="radio" name="prefCur" value="${c.code}" ${pendingPrefs.currency===c.code?'checked':''}>
      ${c.label}
    </label>`).join("");

  langWrap.querySelectorAll("[data-pref-lang]").forEach(el => {
    el.addEventListener("click", () => {
      pendingPrefs.language = el.getAttribute("data-pref-lang");
      langWrap.querySelectorAll(".pref-option").forEach(o => o.classList.remove("selected"));
      el.classList.add("selected");
    });
  });
  curWrap.querySelectorAll("[data-pref-cur]").forEach(el => {
    el.addEventListener("click", () => {
      pendingPrefs.currency = el.getAttribute("data-pref-cur");
      curWrap.querySelectorAll(".pref-option").forEach(o => o.classList.remove("selected"));
      el.classList.add("selected");
    });
  });
}

function openPrefModal(){
  pendingPrefs = { language: prefs.language, currency: prefs.currency };
  renderPrefModalOptions();
  document.getElementById("prefOverlay").classList.add("open");
}
function closePrefModal(){
  document.getElementById("prefOverlay").classList.remove("open");
}
function applyPrefs(){
  prefs.language = pendingPrefs.language;
  prefs.currency = pendingPrefs.currency;
  savePrefs(prefs);
  closePrefModal();
  toast(prefs.language === "en" ? "Preferences updated" : t("prefUpdate"));
  render();
  renderNavLinks();
}

document.getElementById("prefOpenBtn").addEventListener("click", openPrefModal);
document.getElementById("prefCloseBtn").addEventListener("click", closePrefModal);
document.getElementById("prefUpdateBtn").addEventListener("click", applyPrefs);
document.getElementById("prefOverlay").addEventListener("click", (e) => {
  if(e.target.id === "prefOverlay") closePrefModal();
});

/* Show the preferences prompt once per browser tab/session (not once ever
   like a true SPA would, since every page here is a real navigation) so it
   doesn't reappear on every single page the visitor opens. */
const PREFS_PROMPT_SHOWN_KEY = "lankaSeagullPrefsPromptShown";
function wasPrefsPromptShown(){
  try{ return sessionStorage.getItem(PREFS_PROMPT_SHOWN_KEY) === "1"; }catch(e){ return false; }
}
function markPrefsPromptShown(){
  try{ sessionStorage.setItem(PREFS_PROMPT_SHOWN_KEY, "1"); }catch(e){}
}
if(!existingPrefs && !wasPrefsPromptShown()){
  markPrefsPromptShown();
  setTimeout(openPrefModal, 400);
}

/* ===================== HELPERS ===================== */
function formatLkr(n){
  const cur = currencyInfo(prefs.currency);
  const converted = n * cur.rate;
  const rounded = cur.code === "LKR" ? Math.round(converted) : Math.round(converted * 100) / 100;
  return cur.symbol + " " + rounded.toLocaleString("en-US", cur.code === "LKR" ? {} : {minimumFractionDigits:2, maximumFractionDigits:2});
}
function unitInfo(unit){ return UNITS[unit] || UNITS.kg; }
function esc(s){ return String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function findProduct(slug){ return PRODUCTS.find(p => p.slug === slug); }
function findCategory(id){ return CATEGORIES.find(c => c.id === id); }

/* ===================== CART =====================
   Persisted to sessionStorage so the cart survives real navigation between
   the separate HTML pages (each page load runs this script fresh), while
   still clearing automatically when the browser tab/session ends — the
   same "resets on reload of the browser" behaviour as the original
   single-page app's in-memory cart. */
const CART_KEY = "lankaSeagullCart";
function loadCartItems(){
  try{
    const raw = sessionStorage.getItem(CART_KEY);
    if(raw) return JSON.parse(raw);
  }catch(e){}
  return [];
}
function saveCartItems(){
  try{ sessionStorage.setItem(CART_KEY, JSON.stringify(cart.items)); }catch(e){}
}
const cart = { items: loadCartItems() };

function cartTotal(){ return cart.items.reduce((s,i)=> s + i.pricePerKg*i.quantityKg, 0); }
function cartCount(){ return cart.items.length; }

function addToCart(product, qty){
  if(!product.available) return;
  const info = unitInfo(product.unit);
  const q = Math.max(info.min, qty || info.step);
  const existing = cart.items.find(i => i.productId === product.id);
  if(existing){ existing.quantityKg = Math.round((existing.quantityKg + q)*100)/100; }
  else{
    cart.items.push({ productId: product.id, name: product.name, image: product.image, pricePerKg: product.pricePerKg, unit: product.unit, quantityKg: q });
  }
  saveCartItems();
  updateCartBadge();
}
function setCartQty(productId, qty){
  const item = cart.items.find(i => i.productId === productId);
  const info = unitInfo(item ? item.unit : "kg");
  const q = Math.max(info.min, Math.round(qty*100)/100);
  if(item) item.quantityKg = q;
  saveCartItems();
  updateCartBadge();
  if(currentRoute().page === "cart") render();
}
function removeFromCart(productId){
  cart.items = cart.items.filter(i => i.productId !== productId);
  saveCartItems();
  updateCartBadge();
  if(currentRoute().page === "cart") render();
}
function updateCartBadge(){
  const badge = document.getElementById("cartBadge");
  const n = cartCount();
  badge.textContent = n;
  badge.style.display = n > 0 ? "flex" : "none";
}

/* ===================== TOAST ===================== */
function toast(msg){
  const wrap = document.getElementById("toastWrap");
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(()=> el.remove(), 2800);
}

/* ===================== WHATSAPP MESSAGE BUILDER ===================== */
function buildOrderWhatsAppMessage({customerName, phone, address, items, total}){
  const lines = items.map(i => `- ${i.name}: ${i.quantityKg} ${unitInfo(i.unit).label} (${formatLkr(i.pricePerKg*i.quantityKg)})`).join("\n");
  return `New order from ${customerName} (${phone})\nDelivery: ${address}\n\nItems:\n${lines}\n\nTotal: ${formatLkr(total)}`;
}
function whatsappUrl(message){
  return `https://wa.me/${COMPANY.whatsappE164}?text=${encodeURIComponent(message)}`;
}

/* ===================== ROUTER =====================
   Each physical HTML page declares its own identity via <body data-page="...">.
   Hash routing is kept ONLY for the flows that are not one of the five main
   pages: product detail (nested under Products), cart, order and order
   success. These render into #app on top of whichever page is currently
   open, so cart/order/product-detail keep working from any page. Legacy
   hash links from the old single-page router (e.g. "#/products", "#/about")
   are still recognised and mapped to the matching page so old bookmarks or
   shared links keep working. */
const CURRENT_PAGE = (document.body && document.body.getAttribute("data-page")) || "home";

function currentRoute(){
  const hash = (location.hash || "").replace(/^#/, "");
  const parts = hash.split("/").filter(Boolean);
  if(parts.length === 0) return { page: CURRENT_PAGE };
  if(parts[0] === "products" && parts[1]) return { page: "product-detail", slug: parts[1] };
  if(parts[0] === "cart") return { page: "cart" };
  if(parts[0] === "order" && parts[1] === "success") return { page: "order-success" };
  if(parts[0] === "order") return { page: "order" };
  if(parts[0] === "products") return { page: "products" };
  if(parts[0] === "about") return { page: "about" };
  if(parts[0] === "gallery") return { page: "gallery" };
  if(parts[0] === "contact") return { page: "contact" };
  return { page: CURRENT_PAGE };
}

/* ===================== NAV RENDER ===================== */
function renderNavLinks(){
  const route = currentRoute();
  const isActive = (navPage) => navPage === route.page ||
    (navPage === "products" && route.page === "product-detail");

  const navLabels = { home:t("navHome"), products:t("navProducts"), about:t("navAbout"), gallery:t("navGallery"), contact:t("navContact") };

  document.getElementById("navLinks").innerHTML = NAV_LINKS.map(l =>
    `<a href="${l.href}" class="${isActive(l.page) ? 'active' : ''}">${navLabels[l.page]}</a>`
  ).join("");

  document.getElementById("navOrderBtn").textContent = t("orderNow");

  document.getElementById("footerLinks").innerHTML = NAV_LINKS.map(l =>
    `<a href="${l.href}">${navLabels[l.page]}</a>`
  ).join("") + `<a href="#/order">${t("orderNow")}</a>`;

  document.getElementById("mobileMenu").innerHTML = NAV_LINKS.map(l =>
    `<a href="${l.href}">${navLabels[l.page]}</a>`
  ).join("") + `<a href="#/order" class="order-cta">${t("orderNow")}</a>`;

  document.getElementById("footerContact").innerHTML =
    `${COMPANY.addressLine1}<br>${COMPANY.addressLine2} ${COMPANY.addressLine3}<br>${COMPANY.phoneDisplay}<br>${COMPANY.email}`;

  document.getElementById("footerSocials").innerHTML = socialButtonsHtml("footer");
  document.getElementById("waFloat").href = `https://wa.me/${COMPANY.whatsappE164}`;
}

function updateNavbarStyle(){
  const navbar = document.getElementById("navbar");
  const route = currentRoute();
  const isHomeHero = route.page === "home";
  const scrolled = window.scrollY > 12;
  const mobileOpen = document.getElementById("mobileMenu").classList.contains("open");
  const solid = scrolled || !isHomeHero || mobileOpen;
  navbar.classList.toggle("solid", solid);
}

/* ===================== QUANTITY SELECTOR WIDGET ===================== */
function qtySelectorHtml(id, value, pricePerKg, unit){
  unit = unit || "kg";
  const info = unitInfo(unit);
  const totalHtml = typeof pricePerKg === "number"
    ? `<p class="qty-total" data-qty-total="${id}">Total: ${formatLkr(pricePerKg*value)}</p>` : "";
  return `
    <div class="qty-selector" data-qty-widget="${id}" data-price="${pricePerKg||0}" data-unit="${unit}">
      <div class="qty-row">
        <button type="button" class="qty-btn" data-qty-action="dec" data-qty-target="${id}" aria-label="Decrease quantity">−</button>
        <div class="qty-val" data-qty-display="${id}">${value} ${info.label}</div>
        <button type="button" class="qty-btn" data-qty-action="inc" data-qty-target="${id}" aria-label="Increase quantity">+</button>
      </div>
      <label class="qty-label">Custom ${info.label}
        <input type="number" min="${info.min}" step="${info.step}" value="${value}" class="qty-input" data-qty-input="${id}">
      </label>
      ${totalHtml}
    </div>`;
}

const qtyState = {};
function initQtyWidgets(root){
  root.querySelectorAll("[data-qty-widget]").forEach(widget => {
    const id = widget.getAttribute("data-qty-widget");
    if(qtyState[id] === undefined) qtyState[id] = parseFloat(widget.querySelector("[data-qty-input]").value) || 1;
  });
  root.querySelectorAll("[data-qty-action]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-qty-target");
      const widget = root.querySelector(`[data-qty-widget="${id}"]`);
      const info = unitInfo(widget ? widget.getAttribute("data-unit") : "kg");
      const dir = btn.getAttribute("data-qty-action") === "inc" ? 1 : -1;
      setQtyState(root, id, (qtyState[id]||info.step) + dir*info.step);
    });
  });
  root.querySelectorAll("[data-qty-input]").forEach(input => {
    input.addEventListener("change", () => {
      const id = input.getAttribute("data-qty-input");
      const widget = root.querySelector(`[data-qty-widget="${id}"]`);
      const info = unitInfo(widget ? widget.getAttribute("data-unit") : "kg");
      setQtyState(root, id, parseFloat(input.value) || info.min);
    });
  });
}
function setQtyState(root, id, next){
  const widget = root.querySelector(`[data-qty-widget="${id}"]`);
  const info = unitInfo(widget ? widget.getAttribute("data-unit") : "kg");
  const safe = Math.max(info.min, Math.round(next*100)/100);
  qtyState[id] = safe;
  const display = root.querySelector(`[data-qty-display="${id}"]`);
  const input = root.querySelector(`[data-qty-input="${id}"]`);
  const totalEl = root.querySelector(`[data-qty-total="${id}"]`);
  if(display) display.textContent = `${safe} ${info.label}`;
  if(input) input.value = safe;
  if(totalEl){
    const price = widget ? (parseFloat(widget.getAttribute("data-price")) || 0) : 0;
    totalEl.textContent = `Total: ${formatLkr(price*safe)}`;
  }
  if(id.startsWith("cart-")){
    setCartQty(id.replace("cart-",""), safe);
  }
}
function getQty(id){ return qtyState[id] || 1; }

/* ===================== PRODUCT CARD ===================== */
function productCardHtml(product, ctx){
  const qtyId = `${ctx||"card"}-${product.id}`;
  return `
    <article class="product-card">
      <a href="#/products/${product.slug}" class="product-thumb">
        <img src="${product.image}" alt="${esc(product.name)}" loading="lazy">
        <span class="avail-badge ${product.available ? "" : "unavail"}">${product.available ? "Available" : "Unavailable"}</span>
      </a>
      <div class="product-body">
        <div>
          <h3>${esc(product.name)}</h3>
          <p class="product-desc">${esc(product.description)}</p>
        </div>
        <p class="product-price">${formatLkr(product.pricePerKg)} <span>/ ${unitInfo(product.unit).label}</span></p>
        ${qtySelectorHtml(qtyId, unitInfo(product.unit).step, product.pricePerKg, product.unit)}
        <div class="product-actions">
          <button type="button" class="btn btn-navy btn-sm" ${product.available?"":"disabled"} data-add-cart="${product.id}" data-qty-id="${qtyId}">Add to Cart</button>
          <button type="button" class="btn btn-aqua btn-sm" ${product.available?"":"disabled"} data-buy-now="${product.id}" data-qty-id="${qtyId}">Buy Now</button>
        </div>
      </div>
    </article>`;
}
function bindProductCardActions(root){
  root.querySelectorAll("[data-add-cart]").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = PRODUCTS.find(p => p.id === btn.getAttribute("data-add-cart"));
      const qty = getQty(btn.getAttribute("data-qty-id"));
      addToCart(product, qty);
      toast(`${product.name} added to cart`);
    });
  });
  root.querySelectorAll("[data-buy-now]").forEach(btn => {
    btn.addEventListener("click", () => {
      const product = PRODUCTS.find(p => p.id === btn.getAttribute("data-buy-now"));
      const qty = getQty(btn.getAttribute("data-qty-id"));
      addToCart(product, qty);
      location.hash = "#/order";
    });
  });
}

/* ===================== PAGE TEMPLATES ===================== */
function wavesHtml(){
  return `
    <div class="wave-layer wave-back" aria-hidden="true">
      <svg viewBox="0 0 1600 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,60 C200,110 400,10 600,60 C800,110 1000,10 1200,60 C1300,85 1500,85 1600,60 L1600,120 L0,120 Z
                 M1600,60 C1800,110 2000,10 2200,60 C2400,110 2600,10 2800,60 C2900,85 3100,85 3200,60 L3200,120 L1600,120 Z"
              fill="#4ecdc4"/>
      </svg>
    </div>
    <div class="wave-layer wave-mid" aria-hidden="true">
      <svg viewBox="0 0 1600 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,70 C150,20 350,120 550,70 C750,20 950,120 1150,70 C1300,35 1450,35 1600,70 L1600,120 L0,120 Z
                 M1600,70 C1750,20 1950,120 2150,70 C2350,20 2550,120 2750,70 C2900,35 3050,35 3200,70 L3200,120 L1600,120 Z"
              fill="#156fa0"/>
      </svg>
    </div>
    <div class="wave-layer wave-front" aria-hidden="true">
      <svg viewBox="0 0 1600 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,80 C220,40 420,110 640,80 C860,50 1060,110 1280,80 C1400,65 1500,65 1600,80 L1600,120 L0,120 Z
                 M1600,80 C1820,40 2020,110 2240,80 C2460,50 2660,110 2880,80 C3000,65 3100,65 3200,80 L3200,120 L1600,120 Z"
              fill="#04101f"/>
      </svg>
    </div>`;
}

function pageHeroHtml(title, subtitle, image){
  return `
    <section class="page-hero">
      <div class="hero-bg" style="background-image:url('${image}');"></div>
      <div class="hero-overlay"></div>
      ${wavesHtml()}
      <div class="page-hero-inner">
        <p class="eyebrow">Lanka Seagull (Pvt) Ltd</p>
        <h1>${title}</h1>
        <p>${subtitle}</p>
      </div>
    </section>`;
}

function renderHome(){
  const featured = PRODUCTS.filter(p => p.featured).slice(0,6);
  const previewGallery = GALLERY_ITEMS.slice(0,6);
  return `
    <section class="hero">
      <div class="hero-bg" style="background-image:url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80');"></div>
      <video class="hero-video" autoplay muted loop playsinline preload="auto" poster="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=80">
        <source src="videos/lanka-seagull-hero.mp4" type="video/mp4">
      </video>
      <div class="hero-overlay"></div>
      ${wavesHtml()}
      <div class="hero-content">
        <p class="eyebrow fade-up">Lanka Seagull (Pvt) Ltd</p>
        <h1 class="fade-up">${t("heroTitle")}</h1>
        <p class="fade-up">${t("heroSub")}</p>
        <div class="hero-cta fade-up">
          <a href="products.html" class="btn btn-aqua">${t("exploreProducts")}</a>
          <a href="#/order" class="btn btn-outline-white">${t("orderNow")}</a>
        </div>
      </div>
    </section>

    <section class="bg-white">
      <div class="container grid grid-4">
        ${[
          ["Premium Quality","Selected with care for buyers who value consistency."],
          ["Fresh &amp; Carefully Selected","Products are chosen with attention to condition and presentation."],
          ["Reliable Supply","Straightforward ordering and dependable communication."],
          ["Customer Satisfaction","A professional process from enquiry to confirmed order."],
        ].map(([tl,b])=>`
          <div class="feature-card">
            <div class="feature-bar"></div>
            <h3>${tl}</h3>
            <p>${b}</p>
          </div>`).join("")}
      </div>
    </section>

    <section>
      <div class="container">
        <div class="section-head">
          <div>
            <p class="section-eyebrow">Catalogue</p>
            <h2 class="section-title">Featured Products</h2>
          </div>
          <a href="products.html" class="link-ocean">View all</a>
        </div>
        <div class="grid grid-3">
          ${featured.map(p=>productCardHtml(p,"home")).join("")}
        </div>
      </div>
    </section>

    <section class="bg-navy">
      <div class="container about-grid">
        <div class="about-image" style="background-image:url('https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=1400&q=80');"></div>
        <div>
          <p class="eyebrow">Our company</p>
          <h2 style="margin-top:.75rem;font-size:2.25rem;">About Lanka Seagull</h2>
          <p class="lead">Lanka Seagull (Pvt) Ltd is a seafood company based in Adampan, Sri Lanka. We supply carefully selected seafood products and make it simple for customers to review availability, choose a quantity in kilograms, and place an order.</p>
          <p class="small">Add your full company story, sourcing notes, and service details on the About page whenever you are ready.</p>
          <a href="about.html" class="btn btn-aqua" style="margin-top:2rem;">Learn More</a>
        </div>
      </div>
    </section>

    <section>
      <div class="container">
        <h2 class="center-title">Why Choose Lanka Seagull?</h2>
        <div class="why-grid">
          ${[
            ["Quality Products","Clear product details and kilogram pricing."],
            ["Carefully Selected Seafood","Attention to selection before an order is confirmed."],
            ["Reliable Service","Direct contact by phone and WhatsApp."],
            ["Professional Packaging","Packed with care for handling and delivery."],
            ["Customer Focused","Straightforward ordering and follow-up."],
          ].map(([tl,b],i)=>`
            <div class="why-card">
              <div class="why-num">${i+1}</div>
              <h3>${tl}</h3>
              <p>${b}</p>
            </div>`).join("")}
        </div>
      </div>
    </section>

    <section class="bg-white">
      <div class="container">
        <div class="section-head">
          <h2 class="section-title">Gallery</h2>
          <a href="gallery.html" class="link-ocean">Open gallery</a>
        </div>
        <div class="gallery-grid-home">
          ${previewGallery.map(g=>`
            <div class="gallery-thumb"><img src="${g.image}" alt="${esc(g.title)}" loading="lazy"></div>
          `).join("")}
        </div>
      </div>
    </section>

    <section class="cta-band">
      <div class="hero-bg" style="background-image:url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=2000&q=80');"></div>
      <div class="dark-overlay"></div>
      <div class="cta-inner">
        <h2>Looking for premium seafood products?</h2>
        <p>Contact Lanka Seagull today.</p>
        <div class="hero-cta">
          <a href="contact.html" class="btn btn-white">${t("contactUs")}</a>
          <a href="https://wa.me/${COMPANY.whatsappE164}" target="_blank" rel="noreferrer" class="btn btn-whatsapp">${t("whatsappUs")}</a>
        </div>
      </div>
    </section>`;
}

function renderProducts(activeCat){
  activeCat = activeCat || "all";
  const visible = activeCat === "all" ? PRODUCTS : PRODUCTS.filter(p => p.categoryId === activeCat);
  return `
    ${pageHeroHtml("Seafood Catalogue","Select a product, choose quantity in kilograms, and add it to your order.","https://images.unsplash.com/photo-1498654896293-37aacf113fd9?auto=format&fit=crop&w=2000&q=80")}
    <section>
      <div class="container">
        <div class="chips" id="catChips">
          <button type="button" class="chip ${activeCat==='all'?'active':''}" data-cat="all">All</button>
          ${CATEGORIES.map(c=>`<button type="button" class="chip ${activeCat===c.id?'active':''}" data-cat="${c.id}">${c.name}</button>`).join("")}
        </div>
        <div id="productsGridWrap" style="margin-top:2rem;">
          ${visible.length === 0 ? `
            <div class="empty-state">
              <h2>No products in this category</h2>
              <p>Add products from the admin dashboard or choose another category.</p>
            </div>` : `
            <div class="grid grid-3">
              ${visible.map(p=>productCardHtml(p,"cat")).join("")}
            </div>`}
        </div>
      </div>
    </section>`;
}

function renderProductDetail(slug){
  const product = findProduct(slug);
  if(!product){
    return `<section class="container" style="padding-top:8rem;text-align:center;"><h1 class="font-display">Product not found</h1><p><a href="products.html" class="link-ocean">Back to products</a></p></section>`;
  }
  const category = findCategory(product.categoryId);
  const related = PRODUCTS.filter(p => p.id !== product.id).slice(0,3);
  const qtyId = `detail-${product.id}`;
  return `
    <section class="container" style="padding-top:7rem;padding-bottom:5rem;">
      <p class="crumb"><a href="products.html">Products</a> / ${esc(product.name)}</p>
      <div class="detail-grid">
        <div class="detail-image" style="background-image:url('${product.image}');"></div>
        <div>
          <p class="detail-cat">${category ? esc(category.name) : "Seafood"}</p>
          <h1 class="detail-title">${esc(product.name)}</h1>
          <p class="detail-desc">${esc(product.description)}</p>
          <p class="detail-price">${formatLkr(product.pricePerKg)} <span>/ ${unitInfo(product.unit).label}</span></p>
          <p class="detail-status">Status: <strong style="color:${product.available ? 'var(--ocean)' : 'var(--muted)'}">${product.available ? "Available" : "Unavailable"}</strong></p>
          <div class="buy-box">
            ${qtySelectorHtml(qtyId, unitInfo(product.unit).step, product.pricePerKg, product.unit)}
            <div class="product-actions" style="margin-top:1rem;">
              <button type="button" class="btn btn-navy btn-sm" ${product.available?"":"disabled"} data-add-cart="${product.id}" data-qty-id="${qtyId}">Add to Cart</button>
              <button type="button" class="btn btn-aqua btn-sm" ${product.available?"":"disabled"} data-buy-now="${product.id}" data-qty-id="${qtyId}">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
      ${related.length ? `
      <div style="margin-top:4rem;">
        <h2 class="font-display" style="font-size:1.9rem;color:var(--navy);">More products</h2>
        <div class="grid grid-3" style="margin-top:1.5rem;">
          ${related.map(p=>productCardHtml(p,"related")).join("")}
        </div>
      </div>` : ""}
    </section>`;
}

function renderAbout(){
  return `
    ${pageHeroHtml("About Lanka Seagull","A professional seafood company based in Adampan, Sri Lanka.","https://images.unsplash.com/photo-1439405326854-014607f694d7?auto=format&fit=crop&w=2000&q=80")}
    <section>
      <div class="container" style="max-width:64rem;display:flex;flex-direction:column;gap:4rem;">
        <article class="about-article">
          <h2>Who We Are</h2>
          <p>Lanka Seagull (Pvt) Ltd supplies seafood products with a focus on careful selection, clear communication, and a straightforward ordering process. Customers can browse products, choose a quantity in kilograms, and place an order online or through WhatsApp.</p>
        </article>
        <div class="about-split">
          <div class="about-image" style="background-image:url('https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1400&q=80');"></div>
          <article class="about-article">
            <h2>Our Story</h2>
            <p>Use this section to describe how the company started, the people behind the work, and the values that guide day-to-day operations. Keep the story accurate and update it from this page whenever you want the public profile to grow.</p>
          </article>
        </div>
        <div class="grid grid-2">
          <article class="about-article">
            <h2>Our Mission</h2>
            <p>To provide carefully selected seafood products and a professional buying experience, from first enquiry to confirmed order.</p>
          </article>
          <article class="about-article">
            <h2>Our Vision</h2>
            <p>To be a trusted Sri Lankan seafood company known for quality, reliability, and respectful customer service. Refine this statement as your business goals develop.</p>
          </article>
        </div>
        <div class="about-split reverse">
          <div class="about-image" style="background-image:url('https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1400&q=80');"></div>
          <article class="about-article">
            <h2>Quality &amp; Freshness</h2>
            <p>Product condition, handling, and presentation matter. Describe your own quality checks, storage approach, and packing standards here so buyers know exactly what to expect.</p>
          </article>
        </div>
        <article class="about-article">
          <h2>Responsible Seafood Sourcing</h2>
          <p>Share how products are sourced, who you work with, and the care taken at each stage. This placeholder is ready for your own sourcing notes — without adding claims that have not been confirmed.</p>
        </article>
        <div>
          <h2 style="font-size:1.9rem;color:var(--navy);">Why customers choose us</h2>
          <ul class="why-list">
            ${["Clear kilogram pricing before you order","Direct contact by phone and WhatsApp","A simple cart and checkout process","A local company you can reach in Adampan"].map(tl=>`<li>${tl}</li>`).join("")}
          </ul>
        </div>
      </div>
    </section>`;
}

let galleryFilter = "All";
function renderGallery(){
  const items = galleryFilter === "All" ? GALLERY_ITEMS : GALLERY_ITEMS.filter(i => i.category === galleryFilter);
  return `
    ${pageHeroHtml("Gallery","A visual look at seafood, handling, packaging, and the coastal setting around our work.","https://images.unsplash.com/photo-1505118380757-91f5f5632de0?auto=format&fit=crop&w=2000&q=80")}
    <section>
      <div class="container">
        <div class="chips" id="galleryChips">
          ${GALLERY_CATEGORIES.map(c=>`<button type="button" class="chip ${galleryFilter===c?'active':''}" data-gcat="${esc(c)}">${c}</button>`).join("")}
        </div>
        <div class="masonry" id="masonryWrap">
          ${items.map(item=>`
            <button type="button" class="masonry-item" data-gallery-item="${item.id}">
              <img src="${item.image}" alt="${esc(item.title)}" loading="lazy">
              <span class="masonry-caption">${esc(item.title)}<span>${esc(item.category)}</span></span>
            </button>`).join("")}
        </div>
      </div>
    </section>
    <div id="lightboxWrap"></div>`;
}

function renderContact(){
  const mapsSrc = `https://maps.google.com/maps?q=${encodeURIComponent(COMPANY.mapsQuery)}&t=&z=12&ie=UTF8&iwloc=&output=embed`;
  return `
    ${pageHeroHtml("Contact","Call, message, or send an enquiry. We will respond as soon as we can.","https://images.unsplash.com/photo-1471922694854-ff1b8b9cd32f?auto=format&fit=crop&w=2000&q=80")}
    <section>
      <div class="container" style="max-width:22rem;">
        <div class="contact-card">
          <img src="images/logo.png" alt="Lanka Seagull logo" style="height:96px;width:96px;border-radius:50%;object-fit:cover;box-shadow:0 8px 20px rgba(7,20,40,.15);background:#fff;">
          <h3 style="margin:0;font-size:1.3rem;color:var(--navy);">${COMPANY.name}</h3>
          <div class="cc-line">${socialIconSvg("phone")} <a href="tel:${COMPANY.phoneTel}">${COMPANY.phoneDisplay}</a></div>
          <div class="cc-line">${socialIconSvg("mail")} <a href="mailto:${COMPANY.email}">${COMPANY.email}</a></div>
          <div class="cc-line">${socialIconSvg("home")} <span>${COMPANY.addressLine1} ${COMPANY.addressLine2}</span></div>
          <div class="cc-socials">${socialButtonsHtml("card")}</div>
        </div>
      </div>
    </section>
    <section style="padding-top:0;">
      <div class="container contact-grid">
        <div>
          <p class="section-eyebrow">Visit or call</p>
          <h2 class="section-title">${COMPANY.name}</h2>
          <p style="margin-top:1rem;line-height:1.8;color:var(--muted);">
            ${COMPANY.addressLine1}<br>${COMPANY.addressLine2}<br>${COMPANY.addressLine3}
          </p>
          <p style="margin-top:1rem;font-size:1.1rem;font-weight:600;color:var(--navy);">Phone: ${COMPANY.phoneDisplay}</p>
          <p style="margin-top:.5rem;font-size:.9rem;color:var(--muted);">Email: ${COMPANY.email}</p>
          <div class="hero-cta" style="margin-top:1.5rem;">
            <a href="tel:${COMPANY.phoneTel}" class="btn btn-navy">Call Now</a>
            <a href="https://wa.me/${COMPANY.whatsappE164}" target="_blank" rel="noreferrer" class="btn btn-whatsapp">WhatsApp</a>
          </div>
          <div class="map-frame"><iframe title="Lanka Seagull location" src="${mapsSrc}" loading="lazy"></iframe></div>
        </div>
        <form class="contact-form" id="contactForm">
          <h3 style="font-size:1.7rem;color:var(--navy);margin:0 0 1.25rem;">Send a message</h3>
          <label class="field">Name<input name="name" required></label>
          <label class="field">Phone<input name="phone" required></label>
          <label class="field">Email<input name="email" type="email"></label>
          <label class="field">Message<textarea name="message" rows="5" required></textarea></label>
          <div id="contactMsg"></div>
          <button type="submit" class="btn btn-navy btn-block" id="contactSubmitBtn">Send Message</button>
        </form>
      </div>
    </section>`;
}

function renderCart(){
  const items = cart.items;
  return `
    ${pageHeroHtml("Your Cart","Review quantities in kilograms before you proceed to order.","https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=2000&q=80")}
    <section>
      <div class="container" style="max-width:72rem;">
        ${items.length === 0 ? `
          <div class="empty-state">
            <h2>Your cart is empty</h2>
            <p>Add seafood products by the kilogram from the catalogue to start an order.</p>
            <div style="margin-top:1.5rem;"><a href="products.html" class="btn btn-navy">Browse products</a></div>
          </div>` : `
          <div class="cart-grid">
            <div style="display:flex;flex-direction:column;gap:1rem;">
              ${items.map(item => `
                <article class="cart-item">
                  <div class="cart-thumb"><img src="${item.image}" alt="${esc(item.name)}"></div>
                  <div>
                    <h3>${esc(item.name)}</h3>
                    <p class="price-sm">${formatLkr(item.pricePerKg)} / ${unitInfo(item.unit).label}</p>
                    <div style="margin-top:.75rem;max-width:220px;">
                      ${qtySelectorHtml("cart-"+item.productId, item.quantityKg, item.pricePerKg, item.unit)}
                    </div>
                  </div>
                  <div class="cart-side">
                    <p class="product-price" data-cart-subtotal="${item.productId}">${formatLkr(item.pricePerKg*item.quantityKg)}</p>
                    <button type="button" class="remove-link" data-remove-item="${item.productId}">Remove</button>
                  </div>
                </article>`).join("")}
            </div>
            <aside class="summary-box">
              <h2>Order Total</h2>
              <p class="summary-total">${formatLkr(cartTotal())}</p>
              <a href="#/order" class="btn btn-aqua btn-block" style="margin-top:1.5rem;">Proceed to Order</a>
            </aside>
          </div>`}
      </div>
    </section>`;
}

function renderOrder(){
  const products = PRODUCTS.filter(p => p.available);
  return `
    ${pageHeroHtml("Place your order","Share your details and we will confirm the order with you shortly.","https://images.unsplash.com/photo-1534604973900-df686240d72f?auto=format&fit=crop&w=2000&q=80")}
    <section>
      <div class="container order-grid">
        <form class="order-form" id="orderForm">
          <h2 style="font-size:1.7rem;color:var(--navy);margin:0;">Order details</h2>
          <label class="field">Full Name<input name="customerName" required></label>
          <label class="field">Phone Number<input name="phone" required></label>
          <label class="field">WhatsApp Number<input name="whatsapp"></label>
          <label class="field">Delivery Address<input name="address" required></label>
          <label class="field">City<input name="city" required></label>
          <label class="field">Product
            <select name="formProduct" id="orderProductSelect">
              ${products.map(p=>`<option value="${p.id}" data-unit="${p.unit}">${esc(p.name)} — ${formatLkr(p.pricePerKg)} / ${unitInfo(p.unit).label}</option>`).join("")}
            </select>
          </label>
          <label class="field" id="orderQtyLabel">Quantity in ${products.length ? unitInfo(products[0].unit).label : "KG"}
            <input type="number" min="${products.length ? unitInfo(products[0].unit).min : 0.5}" step="${products.length ? unitInfo(products[0].unit).step : 0.5}" value="${products.length ? unitInfo(products[0].unit).step : 1}" name="formQty" id="orderQtyInput">
          </label>
          ${cart.items.length === 0 ? `<button type="button" class="btn" style="border:1px solid var(--ocean);color:var(--ocean);align-self:flex-start;" id="addSelectedToOrder">Add this product to the order</button>` : ""}
          <label class="field">Order Notes<textarea name="notes" rows="4"></textarea></label>
          <div id="orderMsg"></div>
          <button type="submit" class="btn btn-navy btn-block" id="placeOrderBtn">Place Order</button>
          <button type="button" class="btn btn-whatsapp btn-block" id="orderViaWhatsApp">Order via WhatsApp</button>
        </form>
        <aside class="order-summary-box" id="orderSummaryBox"></aside>
      </div>
    </section>`;
}

function renderOrderSuccess(){
  const wa = `https://wa.me/${COMPANY.whatsappE164}`;
  return `
    <section class="success-box">
      <p class="eyebrow" style="color:var(--ocean);">Order confirmed</p>
      <h1>Thank You for Your Order!</h1>
      <p>Your order has been received. Our team will contact you shortly to confirm your order.</p>
      <p style="margin-top:1.5rem;font-weight:600;color:var(--navy);">Contact us: ${COMPANY.phoneDisplay}</p>
      <div class="success-cta">
        <a href="${wa}" target="_blank" rel="noreferrer" class="btn btn-whatsapp">Send order on WhatsApp</a>
        <a href="products.html" class="btn btn-navy">Continue shopping</a>
      </div>
    </section>`;
}

/* ===================== ORDER SUMMARY (live) ===================== */
function renderOrderSummaryBox(){
  const box = document.getElementById("orderSummaryBox");
  if(!box) return;
  const productSelect = document.getElementById("orderProductSelect");
  const qtyInput = document.getElementById("orderQtyInput");
  const products = PRODUCTS.filter(p => p.available);
  const selected = productSelect ? products.find(p => p.id === productSelect.value) : null;
  const qty = qtyInput ? (parseFloat(qtyInput.value) || (selected ? unitInfo(selected.unit).min : 0.5)) : 1;

  let bodyHtml = "";
  let total = 0;
  if(cart.items.length === 0){
    if(selected){
      total = selected.pricePerKg * qty;
      bodyHtml = `<p>${esc(selected.name)} — ${qty} ${unitInfo(selected.unit).label}<span>${formatLkr(total)}</span></p>`;
    } else {
      bodyHtml = `<p style="color:rgba(255,255,255,.7);">No products selected yet.</p>`;
    }
  } else {
    total = cartTotal();
    bodyHtml = cart.items.map(i => `<p>${esc(i.name)} — ${i.quantityKg} ${unitInfo(i.unit).label}<span>${formatLkr(i.pricePerKg*i.quantityKg)}</span></p>`).join("");
  }

  box.innerHTML = `
    <h2>Order Summary</h2>
    <div style="margin-top:1.25rem;display:flex;flex-direction:column;gap:1rem;font-size:.9rem;">${bodyHtml}</div>
    <div class="order-total-row">Total: ${formatLkr(total)}</div>`;
}

/* ===================== RENDER ===================== */
function render(){
  const route = currentRoute();
  const app = document.getElementById("app");

  if(route.page === "home") app.innerHTML = renderHome();
  else if(route.page === "products") app.innerHTML = renderProducts(window.__activeCat || "all");
  else if(route.page === "product-detail") app.innerHTML = renderProductDetail(route.slug);
  else if(route.page === "about") app.innerHTML = renderAbout();
  else if(route.page === "gallery") app.innerHTML = renderGallery();
  else if(route.page === "contact") app.innerHTML = renderContact();
  else if(route.page === "cart") app.innerHTML = renderCart();
  else if(route.page === "order") app.innerHTML = renderOrder();
  else if(route.page === "order-success") app.innerHTML = renderOrderSuccess();
  else app.innerHTML = renderHome();

  window.scrollTo(0,0);
  bindPageEvents(route);
  renderNavLinks();
  updateNavbarStyle();
}

function bindPageEvents(route){
  const app = document.getElementById("app");
  initQtyWidgets(app);
  bindProductCardActions(app);

  if(route.page === "products"){
    app.querySelectorAll("[data-cat]").forEach(btn => {
      btn.addEventListener("click", () => {
        window.__activeCat = btn.getAttribute("data-cat");
        app.innerHTML = renderProducts(window.__activeCat);
        initQtyWidgets(app);
        bindProductCardActions(app);
        bindCatChips(app);
      });
    });
  }

  if(route.page === "gallery"){
    app.querySelectorAll("[data-gcat]").forEach(btn => {
      btn.addEventListener("click", () => {
        galleryFilter = btn.getAttribute("data-gcat");
        app.innerHTML = renderGallery();
        bindPageEvents(route);
      });
    });
    app.querySelectorAll("[data-gallery-item]").forEach(btn => {
      btn.addEventListener("click", () => {
        const item = GALLERY_ITEMS.find(g => g.id === btn.getAttribute("data-gallery-item"));
        openLightbox(item);
      });
    });
  }

  if(route.page === "cart"){
    app.querySelectorAll("[data-remove-item]").forEach(btn => {
      btn.addEventListener("click", () => removeFromCart(btn.getAttribute("data-remove-item")));
    });
  }

  if(route.page === "contact"){
    const form = document.getElementById("contactForm");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const msgEl = document.getElementById("contactMsg");
      if(!data.name || !data.phone || !data.message){
        msgEl.innerHTML = `<p class="msg-err">Please enter your name, phone number, and message.</p>`;
        return;
      }
      const btn = document.getElementById("contactSubmitBtn");
      btn.disabled = true; btn.textContent = "Sending...";
      setTimeout(() => {
        msgEl.innerHTML = `<p class="msg-ok">Thank you. Your message has been received.</p>`;
        btn.disabled = false; btn.textContent = "Send Message";
        form.reset();
        toast("Message sent — thank you!");
      }, 600);
    });
  }

  if(route.page === "order"){
    renderOrderSummaryBox();
    const productSelect = document.getElementById("orderProductSelect");
    const qtyInput = document.getElementById("orderQtyInput");
    const qtyLabel = document.getElementById("orderQtyLabel");
    function syncQtyToProduct(){
      if(!productSelect || !qtyInput) return;
      const opt = productSelect.options[productSelect.selectedIndex];
      const info = unitInfo(opt ? opt.getAttribute("data-unit") : "kg");
      qtyInput.min = info.min;
      qtyInput.step = info.step;
      qtyInput.value = info.step;
      if(qtyLabel) qtyLabel.firstChild.textContent = `Quantity in ${info.label}`;
    }
    if(productSelect) productSelect.addEventListener("change", () => { syncQtyToProduct(); renderOrderSummaryBox(); });
    if(qtyInput) qtyInput.addEventListener("input", renderOrderSummaryBox);

    const addSelected = document.getElementById("addSelectedToOrder");
    if(addSelected){
      addSelected.addEventListener("click", () => {
        const p = PRODUCTS.find(x => x.id === productSelect.value);
        const q = parseFloat(qtyInput.value) || unitInfo(p.unit).min;
        addToCart(p, q);
        toast(`${p.name} added to the order`);
        const app2 = document.getElementById("app");
        app2.innerHTML = renderOrder();
        bindPageEvents({page:"order"});
      });
    }

    const form = document.getElementById("orderForm");
    function collectOrder(){
      const data = Object.fromEntries(new FormData(form).entries());
      const customerName = (data.customerName||"").trim();
      const phone = (data.phone||"").trim();
      const address = (data.address||"").trim();
      const city = (data.city||"").trim();
      const msgEl = document.getElementById("orderMsg");
      if(!customerName || !phone || !address || !city){
        msgEl.innerHTML = `<p class="msg-err">Please complete name, phone, delivery address, and city.</p>`;
        return null;
      }
      let items = cart.items.map(i => ({ name:i.name, pricePerKg:i.pricePerKg, unit:i.unit, quantityKg:i.quantityKg }));
      if(items.length === 0){
        const p = PRODUCTS.find(x => x.id === productSelect.value);
        const q = parseFloat(qtyInput.value) || (p ? unitInfo(p.unit).min : 0.5);
        if(!p){ msgEl.innerHTML = `<p class="msg-err">Please add a product before placing the order.</p>`; return null; }
        items = [{ name:p.name, pricePerKg:p.pricePerKg, unit:p.unit, quantityKg:q }];
      }
      const total = items.reduce((s,i)=> s + i.pricePerKg*i.quantityKg, 0);
      return { customerName, phone, address: `${address}, ${city}`, items, total };
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const order = collectOrder();
      if(!order) return;
      cart.items = [];
      updateCartBadge();
      location.hash = "#/order/success";
    });

    document.getElementById("orderViaWhatsApp").addEventListener("click", () => {
      const order = collectOrder();
      if(!order) return;
      const message = buildOrderWhatsAppMessage(order);
      window.open(whatsappUrl(message), "_blank");
      cart.items = [];
      updateCartBadge();
      location.hash = "#/order/success";
    });
  }
}

function bindCatChips(app){
  app.querySelectorAll("[data-cat]").forEach(btn => {
    btn.addEventListener("click", () => {
      window.__activeCat = btn.getAttribute("data-cat");
      app.innerHTML = renderProducts(window.__activeCat);
      initQtyWidgets(app);
      bindProductCardActions(app);
      bindCatChips(app);
    });
  });
}

/* ===================== LIGHTBOX ===================== */
function openLightbox(item){
  const wrap = document.getElementById("lightboxWrap");
  wrap.innerHTML = `
    <div class="lightbox" id="lightboxOverlay" role="dialog" aria-modal="true">
      <button type="button" class="lightbox-close" id="lightboxClose">Close</button>
      <div class="lightbox-inner"><img src="${item.image}" alt="${esc(item.title)}"></div>
    </div>`;
  document.body.style.overflow = "hidden";
  const overlay = document.getElementById("lightboxOverlay");
  const close = () => { wrap.innerHTML = ""; document.body.style.overflow = ""; document.removeEventListener("keydown", onKey); };
  function onKey(e){ if(e.key === "Escape") close(); }
  overlay.addEventListener("click", close);
  overlay.querySelector(".lightbox-inner").addEventListener("click", (e) => e.stopPropagation());
  document.getElementById("lightboxClose").addEventListener("click", close);
  document.addEventListener("keydown", onKey);
}

/* ===================== MOBILE MENU / SCROLL ===================== */
document.getElementById("mobileToggle").addEventListener("click", () => {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("open");
  updateNavbarStyle();
});
window.addEventListener("scroll", updateNavbarStyle);
window.addEventListener("hashchange", () => {
  window.__activeCat = "all";
  document.getElementById("mobileMenu").classList.remove("open");
  render();
});

/* ===================== INIT ===================== */
window.__activeCat = "all";
render();
updateCartBadge();

