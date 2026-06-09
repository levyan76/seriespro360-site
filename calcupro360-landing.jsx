// calcupro360-landing.jsx — Page de présentation CalcuPro360 style SeriesPro360
// Structure: Hero, Stats, Features, Workflow, Demo, Pricing, FAQ

const { createElement: h } = React;
const { createRoot } = ReactDOM;

// ── Icon component
function Icon({ name, size = 20 }) {
  const icons = {
    check: { el: "path", d: "M20 6L9 17l-5-5", stroke: "currentColor", strokeWidth: "2", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" },
    chevron: { el: "path", d: "M6 9l6 6 6-6", stroke: "currentColor", strokeWidth: "2", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" },
    package: { el: "path", d: "M12 2L2 7v10l10 5 10-5V7L12 2zm0 5v5m0 0v5m0-5l5-2.5m-5 2.5L7 9.5", stroke: "currentColor", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" },
    cpu: { el: "rect", x: "4", y: "4", width: "16", height: "16", rx: "2", stroke: "currentColor", strokeWidth: "1.5", fill: "none" },
    file: { el: "path", d: "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8", stroke: "currentColor", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" },
    wifiOff: { el: "path", d: "M1 1l22 22M16.72 11.06A10.94 10.94 0 0121 12.55M5 12.55a10.94 10.94 0 011.72-1.49m12.56 5.39a5.77 5.77 0 00-1.64-1.18M5.42 16.45A5.77 5.77 0 016 15.45m6.27 6.79a.75.75 0 00.46.77.7.7 0 00.94-.34.75.75 0 00-.46-.77.7.7 0 00-.94.34z", stroke: "currentColor", strokeWidth: "1.5", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" },
    calculator: { el: "rect", x: "4", y: "2", width: "16", height: "20", rx: "2", stroke: "currentColor", strokeWidth: "1.5", fill: "none" },
    globe: { el: "circle", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "1.5", fill: "none" },
    menu: { el: "path", d: "M3 12h18M3 6h18M3 18h18", stroke: "currentColor", strokeWidth: "2", fill: "none", strokeLinecap: "round", strokeLinejoin: "round" }
  };
  const icon = icons[name];
  if (!icon) return null;
  const { el, ...props } = icon;
  return h("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none" }, h(el, props));
}

// ── Navigation
function Nav({ lang, setLang, isScrolled }) {
  const t = {
    fr: { produits: "Produits", tarifs: "Tarifs", demo: "Démo", faq: "FAQ", cta: "Commencer" },
    en: { produits: "Products", tarifs: "Pricing", demo: "Demo", faq: "FAQ", cta: "Get started" }
  }[lang];

  return h("header", { className: "cp-nav" + (isScrolled ? " is-scrolled" : "") },
    h("div", { className: "cp-container cp-nav-inner" },
      h("a", { href: "/", className: "cp-nav-brand" },
        h("img", { src: "/logos/icone-SeriesPro360.png", alt: "SeriesPro360", className: "cp-nav-logo-img", width: 28, height: 28 }),
        h("span", null, "SeriesPro360")
      ),
      h("nav", { className: "cp-nav-links" },
        h("a", { href: "#features" }, t.produits),
        h("a", { href: "#pricing" }, t.tarifs),
        h("a", { href: "#demo" }, t.demo),
        h("a", { href: "#faq" }, t.faq)
      ),
      h("div", { className: "cp-nav-actions" },
        h("div", { className: "cp-lang-toggle" },
          h("button", { className: lang === "fr" ? "active" : "", onClick: () => setLang("fr") }, "FR"),
          h("button", { className: lang === "en" ? "active" : "", onClick: () => setLang("en") }, "EN")
        ),
        h("button", { className: "cp-btn cp-btn-primary", disabled: true, style: { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } }, t.cta)
      )
    )
  );
}

// ── Hero
function Hero({ lang }) {
  const t = {
    fr: {
      headline: "Estimer. Calculer. Livrer en 90 secondes.",
      subtitle: "Remplacez les feuilles Excel et les calculs à la main. 21 matériaux, assistant IA, devis PDF prêt-client en quelques clics.",
      cta: "Accéder à l'app"
    },
    en: {
      headline: "Estimate. Calculate. Deliver in 90 seconds.",
      subtitle: "Replace Excel sheets and manual calculations. 21 materials, AI assistant, client-ready PDF quotes in a few clicks.",
      cta: "Access the app"
    }
  }[lang];

  return h("section", { id: "top", className: "cp-hero" },
    h("div", { className: "cp-hero-grid-bg" }),
    h("div", { className: "cp-container cp-hero-inner" },
      h("div", { className: "cp-hero-logo-wrap" },
        h("img", { src: "/logos/logo-calcupro360.png", alt: "CalcuPro360", className: "cp-hero-logo" })
      ),
      h("h1", { className: "cp-hero-headline" }, t.headline),
      h("p", { className: "cp-hero-subtitle" }, t.subtitle),
      h("div", { className: "cp-hero-ctas" },
        h("button", { className: "cp-btn cp-btn-primary cp-btn-lg", disabled: true, style: { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } }, t.cta)
      )
    )
  );
}

// ── Stats strip
function StatsStrip({ lang }) {
  const stats = {
    fr: [
      { value: "21", label: "Matériaux complets" },
      { value: "90s", label: "Devis PDF généré" },
      { value: "∞", label: "Calculs pi-po ↔ métrique" },
      { value: "0$", label: "Gratuit 5/mois" }
    ],
    en: [
      { value: "21", label: "Full materials" },
      { value: "90s", label: "PDF quote ready" },
      { value: "∞", label: "Ft-mtr conversions" },
      { value: "$0", label: "Free 5/month" }
    ]
  }[lang];

  return h("section", { className: "cp-stats" },
    h("div", { className: "cp-container" },
      h("div", { className: "cp-stats-grid" },
        stats.map((s, i) => h("div", { key: i, className: "cp-stat" },
          h("div", { className: "cp-stat-value", style: { color: "#E8420A" } }, s.value),
          h("div", { className: "cp-stat-label" }, s.label)
        ))
      )
    )
  );
}

// ── Features
function Features({ lang }) {
  const t = {
    fr: {
      eyebrow: "FONCTIONNALITÉS",
      title: "Calculez comme un pro, sans être ingénieur.",
      items: [
        { icon: "package", title: "21 matériaux complets", desc: "Béton, bois, isolation, revêtement, toiture, excavation — avec prix QC mis à jour." },
        { icon: "cpu", title: "Assistant IA Gemini 2.5", desc: "Questions sur codes CNB, CCQ, RBQ. Réponses sourcées, pas d'inventions." },
        { icon: "file", title: "Devis PDF en 1 clic", desc: "Logo, coordonnées client, lignes détaillées, TPS+TVQ, conditions — prêt à envoyer." },
        { icon: "wifiOff", title: "Hors-ligne natif (PWA)", desc: "Fonctionne sans réseau au sous-sol ou en région éloignée." },
        { icon: "calculator", title: "Calculatrice pi-po intégrée", desc: "Conversion pi-po ↔ métrique instantanée. Zéro erreur." },
        { icon: "globe", title: "Bilingue FR / EN", desc: "Devis en français comme l'exige la Loi 96." }
      ]
    },
    en: {
      eyebrow: "FEATURES",
      title: "Calculate like a pro, without being an engineer.",
      items: [
        { icon: "package", title: "21 complete materials", desc: "Concrete, wood, insulation, siding, roofing, excavation — with updated QC prices." },
        { icon: "cpu", title: "AI Assistant Gemini 2.5", desc: "Ask about NBC, CCQ, RBQ codes. Sourced answers, no hallucinations." },
        { icon: "file", title: "PDF quote in 1 click", desc: "Logo, client details, detailed lines, GST+QST, terms — ready to send." },
        { icon: "wifiOff", title: "Offline native (PWA)", desc: "Works without network in basements or remote areas." },
        { icon: "calculator", title: "Built-in ft-in calculator", desc: "Instant ft-in ↔ metric conversion. Zero error." },
        { icon: "globe", title: "Bilingual FR / EN", desc: "Quotes in French as required by Quebec's Law 96." }
      ]
    }
  }[lang];

  return h("section", { id: "features", className: "cp-section cp-section-alt" },
    h("div", { className: "cp-container" },
      h("div", { className: "cp-section-head" },
        h("div", { className: "cp-eyebrow" }, t.eyebrow),
        h("h2", { className: "cp-section-title" }, t.title)
      ),
      h("div", { className: "cp-features-grid" },
        t.items.map((f, i) => h("div", { key: i, className: "cp-feature" },
          h("div", { className: "cp-feature-icon" }, h(Icon, { name: f.icon, size: 24 })),
          h("h3", { className: "cp-feature-title" }, f.title),
          h("p", { className: "cp-feature-desc" }, f.desc)
        ))
      )
    )
  );
}

// ── Workflow
function Workflow({ lang }) {
  const t = {
    fr: {
      eyebrow: "PRISE EN MAIN",
      title: "Comment ça marche",
      steps: [
        { num: "01", title: "Créez un projet", desc: "Nom du chantier, client, adresse. Tout est sauvegardé automatiquement." },
        { num: "02", title: "Choisissez un matériau", desc: "Béton, bois, isolation… 21 options avec prix QC à jour." },
        { num: "03", title: "Entrez les dimensions", desc: "Pi-po ou métrique — la conversion est instantanée." },
        { num: "04", title: "Générez le devis PDF", desc: "Logo, lignes détaillées, taxes, conditions — prêt à envoyer." }
      ]
    },
    en: {
      eyebrow: "GETTING STARTED",
      title: "How it works",
      steps: [
        { num: "01", title: "Create a project", desc: "Site name, client, address. Everything auto-saved." },
        { num: "02", title: "Choose a material", desc: "Concrete, wood, insulation… 21 options with updated QC prices." },
        { num: "03", title: "Enter dimensions", desc: "Ft-in or metric — conversion is instant." },
        { num: "04", title: "Generate PDF quote", desc: "Logo, detailed lines, taxes, terms — ready to send." }
      ]
    }
  }[lang];

  return h("section", { className: "cp-section" },
    h("div", { className: "cp-container" },
      h("div", { className: "cp-section-head" },
        h("div", { className: "cp-eyebrow" }, t.eyebrow),
        h("h2", { className: "cp-section-title" }, t.title)
      ),
      h("div", { className: "cp-steps" },
        t.steps.map((s, i) => h("div", { key: i, className: "cp-step" },
          h("div", { className: "cp-step-num" }, s.num),
          h("div", { className: "cp-step-content" },
            h("h3", { className: "cp-step-title" }, s.title),
            h("p", { className: "cp-step-desc" }, s.desc)
          )
        ))
      )
    )
  );
}

// ── Demo Videos
function DemoVideos({ lang }) {
  const t = {
    fr: {
      eyebrow: "DÉMOS",
      title: "Voir l'app en action",
      videos: [
        { id: "dQw4w9WgXcQ", title: "Créer un devis en 90 secondes", desc: "Projet → matériau → dimensions → PDF. Tout le workflow." },
        { id: "dQw4w9WgXcQ", title: "Assistant IA et codes du bâtiment", desc: "Posez vos questions, obtenez des réponses sourcées CNB/CCQ." },
        { id: "dQw4w9WgXcQ", title: "Mode hors-ligne sur le chantier", desc: "Fonctionne sans réseau. Synchronisation automatique au retour." }
      ]
    },
    en: {
      eyebrow: "DEMOS",
      title: "See the app in action",
      videos: [
        { id: "dQw4w9WgXcQ", title: "Create a quote in 90 seconds", desc: "Project → material → dimensions → PDF. Full workflow." },
        { id: "dQw4w9WgXcQ", title: "AI Assistant and building codes", desc: "Ask questions, get sourced NBC/CCQ answers." },
        { id: "dQw4w9WgXcQ", title: "Offline mode on the job site", desc: "Works without network. Auto-sync when back online." }
      ]
    }
  }[lang];

  return h("section", { id: "demo", className: "cp-section cp-section-alt" },
    h("div", { className: "cp-container" },
      h("div", { className: "cp-section-head" },
        h("div", { className: "cp-eyebrow" }, t.eyebrow),
        h("h2", { className: "cp-section-title" }, t.title)
      ),
      h("div", { className: "cp-demo-grid" },
        t.videos.map((v, i) => h("div", { key: i, className: "cp-demo-card" },
          h("div", { className: "cp-demo-video" },
            h("iframe", { src: `https://www.youtube.com/embed/${v.id}?rel=0&modestbranding=1`, title: v.title, allowFullScreen: true })
          ),
          h("h3", { className: "cp-demo-title" }, v.title),
          h("p", { className: "cp-demo-desc" }, v.desc)
        ))
      )
    )
  );
}

// ── Pricing
function Pricing({ lang }) {
  const t = {
    fr: {
      eyebrow: "TARIFS",
      title: "Simple. Transparent. Sans surprise.",
      subtitle: "Gratuit pour démarrer. Pro pour les équipes actives.",
      plans: [
        { name: "Gratuit", price: "0$", cadence: "/ mois", desc: "Parfait pour tester ou usage ponctuel.", features: ["Jusqu'à 5 estimés/mois", "21 matériaux complets", "Calculs pi-po ↔ métrique", "Devis PDF basique"], cta: "Commencer", highlight: false },
        { name: "Pro", price: "14,99$", cadence: "CAD / mois", desc: "Pour les professionnels qui estiment tous les jours.", features: ["Estimés illimités", "21 matériaux complets", "Assistant IA Gemini 2.5", "Devis PDF personnalisé", "Hors-ligne natif", "Support prioritaire"], cta: "Passer Pro", highlight: true }
      ],
      faqTitle: "Questions fréquentes",
      faq: [
        { q: "Que comprend la version gratuite ?", a: "5 estimés complets par mois avec tous les matériaux et la génération PDF. Parfait pour tester ou un usage ponctuel." },
        { q: "Dois-je installer l'application ?", a: "Non. CalcuPro360 fonctionne dans votre navigateur. Installez-le comme PWA pour le mode hors-ligne." },
        { q: "Puis-je annuler mon abonnement ?", a: "Oui, à tout moment. Vous gardez l'accès jusqu'à la fin de la période payée." }
      ]
    },
    en: {
      eyebrow: "PRICING",
      title: "Simple. Transparent. No surprises.",
      subtitle: "Free to start. Pro for active teams.",
      plans: [
        { name: "Free", price: "$0", cadence: "/ month", desc: "Perfect for testing or occasional use.", features: ["Up to 5 estimates/month", "21 complete materials", "Ft-in ↔ metric conversions", "Basic PDF quotes"], cta: "Get started", highlight: false },
        { name: "Pro", price: "$14.99", cadence: "CAD / month", desc: "For professionals who estimate daily.", features: ["Unlimited estimates", "21 complete materials", "Gemini 2.5 AI Assistant", "Custom branded PDFs", "Native offline mode", "Priority support"], cta: "Go Pro", highlight: true }
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "What's included in the free version?", a: "5 complete estimates per month with all materials and PDF generation. Perfect for testing or occasional use." },
        { q: "Do I need to install the app?", a: "No. CalcuPro360 works in your browser. Install as PWA for offline mode." },
        { q: "Can I cancel my subscription?", a: "Yes, anytime. You keep access until the end of the paid period." }
      ]
    }
  }[lang];

  return h("section", { id: "pricing", className: "cp-section" },
    h("div", { className: "cp-container" },
      h("div", { className: "cp-section-head" },
        h("div", { className: "cp-eyebrow" }, t.eyebrow),
        h("h2", { className: "cp-section-title" }, t.title),
        h("p", { className: "cp-section-sub" }, t.subtitle)
      ),
      h("div", { className: "cp-pricing-grid" },
        t.plans.map((plan, i) => h("div", { key: i, className: "cp-pricing-card" + (plan.highlight ? " cp-pricing-card--highlight" : "") },
          plan.highlight && h("div", { className: "cp-pricing-badge" }, "POPULAIRE"),
          h("h3", { className: "cp-pricing-name" }, plan.name),
          h("div", { className: "cp-pricing-price" },
            h("span", { className: "cp-pricing-amount" }, plan.price),
            h("span", { className: "cp-pricing-cadence" }, plan.cadence)
          ),
          h("p", { className: "cp-pricing-desc" }, plan.desc),
          h("ul", { className: "cp-pricing-features" },
            plan.features.map((f, j) => h("li", { key: j }, h(Icon, { name: "check", size: 14 }), f))
          ),
          h("button", { className: "cp-pricing-cta cp-btn" + (plan.highlight ? " cp-btn-primary" : " cp-btn-secondary"), disabled: true, style: { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } }, plan.cta)
        ))
      ),
      h("div", { className: "cp-faq" },
        h("h3", { className: "cp-faq-title" }, t.faqTitle),
        t.faq.map((item, i) => h("details", { key: i, className: "cp-faq-item" },
          h("summary", null, item.q, h(Icon, { name: "chevron", size: 16 })),
          h("p", null, item.a)
        ))
      )
    )
  );
}

// ── Footer
function Footer({ lang }) {
  const t = {
    fr: { copy: "© 2025 CalcuPro360 — Série Pro 360. Tous droits réservés." },
    en: { copy: "© 2025 CalcuPro360 — Series Pro 360. All rights reserved." }
  }[lang];
  return h("footer", { className: "cp-footer" },
    h("div", { className: "cp-container cp-footer-inner" },
      h("span", null, t.copy)
    )
  );
}

// ── App
function App() {
  const [lang, setLang] = React.useState("fr");
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.classList.remove("sp-dark");
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return h("div", { className: "cp-app" },
    h(Nav, { lang, setLang, isScrolled: scrolled }),
    h("main", null,
      h(Hero, { lang }),
      h(StatsStrip, { lang }),
      h(Features, { lang }),
      h(Workflow, { lang }),
      h(Pricing, { lang })
    ),
    h(Footer, { lang })
  );
}

// Mount
createRoot(document.getElementById("root")).render(h(App));
