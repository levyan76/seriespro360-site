// trimpro360-landing.jsx — Page TrimPro360 style SeriesPro360
// Structure: Nav · Hero · Origin · Features · Workflow · Pricing · FAQ · Footer

const { useState: uS, useEffect: uE } = React;
const { createRoot } = ReactDOM;

// ── Icônes SVG
function Icon({ name, size = 16 }) {
  const icons = {
    "arrow-left": "M19 12H5M12 19l-7-7 7-7",
    "arrow-right": "M5 12h14M12 5l7 7-7 7",
    "check": "M20 6L9 17l-5-5",
    "external-link": "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3",
    "package": "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
    "file": "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6",
    "cpu": "M12 2a10 10 0 110 20A10 10 0 0112 2zm0 6v4l3 3",
    "globe": "M12 2a10 10 0 110 20A10 10 0 0112 2zM2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20",
    "zap": "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    "users": "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    "tag": "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01",
    "star": "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
    "menu": "M3 12h18M3 6h18M3 18h18",
    "x": "M18 6L6 18M6 6l12 12",
  };
  return React.createElement("svg", {
    width: size, height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  }, React.createElement("path", { d: icons[name] || "" }));
}

// ── Navigation style SeriesPro360
function Nav({ lang, setLang, isScrolled }) {
  const t = {
    fr: { produits: "Produits", tarifs: "Tarifs", demo: "Démo", faq: "FAQ", login: "Connexion", cta: "Commencer" },
    en: { produits: "Products", tarifs: "Pricing", demo: "Demo", faq: "FAQ", login: "Login", cta: "Get started" }
  }[lang];

  return React.createElement("header", { className: "tp-nav" + (isScrolled ? " is-scrolled" : "") },
    React.createElement("div", { className: "tp-container tp-nav-inner" },
      React.createElement("a", { href: "/", className: "tp-nav-brand" },
        React.createElement("img", {
          src: "/logos/icone-SeriesPro360.png",
          alt: "SeriesPro360",
          className: "tp-nav-logo-img",
          width: 28,
          height: 28
        }),
        React.createElement("span", null, "SeriesPro360")
      ),
      React.createElement("nav", { className: "tp-nav-links" },
        React.createElement("a", { href: "#features" }, t.produits),
        React.createElement("a", { href: "#pricing" }, t.tarifs),
        React.createElement("a", { href: "#demo" }, t.demo),
        React.createElement("a", { href: "#faq" }, t.faq)
      ),
      React.createElement("div", { className: "tp-nav-actions" },
        React.createElement("div", { className: "tp-lang-toggle" },
          React.createElement("button", { onClick: () => setLang("fr"), className: lang === "fr" ? "is-on" : "" }, "FR"),
          React.createElement("button", { onClick: () => setLang("en"), className: lang === "en" ? "is-on" : "" }, "EN")
        ),
        React.createElement("button", { className: "tp-btn tp-btn-primary", disabled: true, style: { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } }, t.cta)
      )
    )
  );
}

// ── Hero style SeriesPro360
function Hero({ lang }) {
  const t = {
    fr: {
      eyebrow: "TRIMPRO360",
      headline: "Du dessin à la livraison — sans papier, sans oublis.",
      subtitle: "La plateforme de gestion pour fabricants de profilés métalliques. Canvas vectoriel, catalogue 56 profils, workflow commandes complet.",
      cta: "Accéder à l'app",
      meta1: "Essai gratuit 14 jours",
      meta2: "Aucune carte de crédit",
      meta3: "FR / EN natif"
    },
    en: {
      eyebrow: "TRIMPRO360",
      headline: "From drawing to delivery — no paper, no missed specs.",
      subtitle: "The management platform for metal cladding manufacturers. Vector canvas, 56-profile catalog, complete order workflow.",
      cta: "Access the app",
      meta1: "14-day free trial",
      meta2: "No credit card",
      meta3: "Native FR / EN"
    }
  }[lang];

  return React.createElement("section", { id: "top", className: "tp-hero" },
    React.createElement("div", { className: "tp-hero-grid-bg" }),
    React.createElement("div", { className: "tp-container tp-hero-inner" },
      React.createElement("div", { className: "tp-hero-logo-wrap" },
        React.createElement("img", {
          src: "/logos/TrimPro360-transparent.png",
          alt: "TrimPro360",
          className: "tp-hero-logo"
        })
      ),
      React.createElement("h1", { className: "tp-hero-headline" }, t.headline),
      React.createElement("p", { className: "tp-hero-subtitle" }, t.subtitle),
      React.createElement("div", { className: "tp-hero-ctas" },
        React.createElement("button", { className: "tp-btn tp-btn-primary tp-btn-lg", disabled: true, style: { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } }, t.cta)
      ),
      React.createElement("ul", { className: "tp-hero-meta" },
        React.createElement("li", null, React.createElement(Icon, { name: "check", size: 14 }), t.meta1),
        React.createElement("li", null, React.createElement(Icon, { name: "check", size: 14 }), t.meta2),
        React.createElement("li", null, React.createElement(Icon, { name: "check", size: 14 }), t.meta3)
      )
    )
  );
}

// ── Stats strip
function StatsStrip({ lang }) {
  const stats = {
    fr: [
      { value: "56", label: "Profilés standard" },
      { value: "Canvas", label: "Dessin vectoriel" },
      { value: "Temps réel", label: "Suivi production" },
      { value: "Mobile", label: "App terrain" }
    ],
    en: [
      { value: "56", label: "Standard profiles" },
      { value: "Canvas", label: "Vector drawing" },
      { value: "Real-time", label: "Production tracking" },
      { value: "Mobile", label: "Field app" }
    ]
  }[lang];

  return React.createElement("section", { className: "tp-stats" },
    React.createElement("div", { className: "tp-container tp-stats-inner" },
      stats.map((s, i) =>
        React.createElement("div", { key: i, className: "tp-stat" },
          React.createElement("div", { className: "tp-stat-value" }, s.value),
          React.createElement("div", { className: "tp-stat-label" }, s.label)
        )
      )
    )
  );
}

// ── Features section
function Features({ lang }) {
  const t = {
    fr: {
      eyebrow: "FONCTIONNALITÉS",
      title: "Tout ce dont vous avez besoin, rien de superflu.",
      features: [
        { icon: "cpu", title: "Canvas vectoriel", desc: "Dessinez n'importe quel profilé segment par segment. Replis simples/doubles, K-factor automatique, export DXF + PDF." },
        { icon: "package", title: "Catalogue 56 profils", desc: "J-trim, solin, noue, bardage, faîtière, coin. Prévisualisation annotée, commande en 2 minutes." },
        { icon: "zap", title: "Workflow complet", desc: "De BROUILLON à LIVRÉ. Validation serveur, notifications, historique horodaté, rappels automatiques." },
        { icon: "users", title: "Multi-rôles", desc: "Client, installateur, chargé de projet, production — chacun voit ce dont il a besoin." },
        { icon: "file", title: "Gestion de projets", desc: "Regroupez les commandes par chantier. Vue d'avancement globale, coordination des équipes." },
        { icon: "globe", title: "Bilingue FR / EN", desc: "Bascule instantanée. Interface complète en français et anglais, conforme Loi 96." }
      ]
    },
    en: {
      eyebrow: "FEATURES",
      title: "Everything you need, nothing you don't.",
      features: [
        { icon: "cpu", title: "Vector Canvas", desc: "Draw any profile segment by segment. Single/double bends, auto K-factor, DXF + PDF export." },
        { icon: "package", title: "56-Profile Catalog", desc: "J-trim, drip edge, ridge, siding, corner. Annotated preview, order in 2 minutes." },
        { icon: "zap", title: "Complete Workflow", desc: "From DRAFT to DELIVERED. Server validation, notifications, timestamped history, auto reminders." },
        { icon: "users", title: "Multi-role", desc: "Client, installer, project manager, production — each sees what they need." },
        { icon: "file", title: "Project Management", desc: "Group orders by jobsite. Global progress view, team coordination." },
        { icon: "globe", title: "Bilingual FR / EN", desc: "Instant switch. Full interface in French and English, Bill 96 compliant." }
      ]
    }
  }[lang];

  return React.createElement("section", { id: "features", className: "tp-section tp-section-alt" },
    React.createElement("div", { className: "tp-container" },
      React.createElement("div", { className: "tp-section-head" },
        React.createElement("div", { className: "tp-eyebrow" }, t.eyebrow),
        React.createElement("h2", { className: "tp-section-title" }, t.title)
      ),
      React.createElement("div", { className: "tp-features-grid" },
        t.features.map((f, i) =>
          React.createElement("div", { key: i, className: "tp-feature-card" },
            React.createElement("div", { className: "tp-feature-icon" }, React.createElement(Icon, { name: f.icon, size: 20 })),
            React.createElement("h3", { className: "tp-feature-title" }, f.title),
            React.createElement("p", { className: "tp-feature-desc" }, f.desc)
          )
        )
      )
    )
  );
}

// ── Workflow / How it works
function Workflow({ lang }) {
  const t = {
    fr: {
      eyebrow: "PRISE EN MAIN",
      title: "Comment ça marche",
      steps: [
        { num: "01", title: "Sélectionnez un profil", desc: "Choisissez dans le catalogue 56 profils ou dessinez dans le Canvas vectoriel." },
        { num: "02", title: "Saisissez les dimensions", desc: "Matériau, calibre, couleur, quantité. Tout est validé en temps réel." },
        { num: "03", title: "Soumettez la commande", desc: "Le chargé de projet est notifié automatiquement. Suivi temps réel jusqu'à la livraison." }
      ]
    },
    en: {
      eyebrow: "GETTING STARTED",
      title: "How it works",
      steps: [
        { num: "01", title: "Select a profile", desc: "Choose from the 56-profile catalog or draw in the vector Canvas." },
        { num: "02", title: "Enter dimensions", desc: "Material, gauge, color, quantity. All validated in real-time." },
        { num: "03", title: "Submit the order", desc: "Project manager is automatically notified. Real-time tracking until delivery." }
      ]
    }
  }[lang];

  return React.createElement("section", { className: "tp-section" },
    React.createElement("div", { className: "tp-container" },
      React.createElement("div", { className: "tp-section-head" },
        React.createElement("div", { className: "tp-eyebrow" }, t.eyebrow),
        React.createElement("h2", { className: "tp-section-title" }, t.title)
      ),
      React.createElement("div", { className: "tp-steps" },
        t.steps.map((s, i) =>
          React.createElement("div", { key: i, className: "tp-step" },
            React.createElement("div", { className: "tp-step-num" }, s.num),
            React.createElement("div", { className: "tp-step-content" },
              React.createElement("h3", { className: "tp-step-title" }, s.title),
              React.createElement("p", { className: "tp-step-desc" }, s.desc)
            )
          )
        )
      )
    )
  );
}

// ── Demo Videos section
function DemoVideos({ lang }) {
  const t = {
    fr: {
      eyebrow: "DÉMOS",
      title: "Voir l'app en action",
      videos: [
        { id: "YdTywKqRv1c", title: "Canvas vectoriel — dessiner un profilé en quelques clics", desc: "Dessinez n'importe quel profilé avec replis, validez et commandez en moins de 2 minutes." },
        { id: "H7DHtr0_K5A", title: "Import Excel — transférer votre inventaire", desc: "Importez votre stock existant. L'app apprend de vos corrections pour les prochains imports." },
        { id: "dkfscdElgQw", title: "Module Commandes — du client à l'atelier", desc: "Workflow complet : brouillon → soumise → approvée → production → livrée." }
      ]
    },
    en: {
      eyebrow: "DEMOS",
      title: "See the app in action",
      videos: [
        { id: "YdTywKqRv1c", title: "Vector Canvas — draw a profile in a few clicks", desc: "Draw any profile with bends, validate and order in under 2 minutes." },
        { id: "H7DHtr0_K5A", title: "Excel Import — migrate your inventory", desc: "Import your existing stock. The app learns from your corrections for next time." },
        { id: "dkfscdElgQw", title: "Orders Module — from client to shop", desc: "Complete workflow: draft → submitted → approved → production → delivered." }
      ]
    }
  }[lang];

  return React.createElement("section", { id: "demo", className: "tp-section tp-section-alt" },
    React.createElement("div", { className: "tp-container" },
      React.createElement("div", { className: "tp-section-head" },
        React.createElement("div", { className: "tp-eyebrow" }, t.eyebrow),
        React.createElement("h2", { className: "tp-section-title" }, t.title)
      ),
      React.createElement("div", { className: "tp-demo-grid" },
        t.videos.map((v, i) =>
          React.createElement("div", { key: i, className: "tp-demo-card" },
            React.createElement("div", { className: "tp-demo-video" },
              React.createElement("iframe", {
                src: "https://www.youtube.com/embed/" + v.id + "?rel=0&modestbranding=1",
                title: v.title,
                allowFullScreen: true
              })
            ),
            React.createElement("h3", { className: "tp-demo-title" }, v.title),
            React.createElement("p", { className: "tp-demo-desc" }, v.desc)
          )
        )
      )
    )
  );
}

// ── Pricing section
function Pricing({ lang }) {
  const t = {
    fr: {
      eyebrow: "TARIFS",
      title: "Simple. Transparent. Sans surprise.",
      subtitle: "Deux options claires. Choisissez celle qui correspond à votre situation.",
      plans: [
        { name: "Offre Fondateur", price: "149$", cadence: "/ mois à vie", desc: "Limité aux 10 premières entreprises.", spotsLeft: 10, features: ["Toutes les fonctionnalités", "Mises à jour incluses", "Support inclus", "Futures améliorations incluses"], cta: "Réserver ma place", highlight: true },
        { name: "Tarif Régulier", price: "299$", cadence: "/ mois", desc: "Après la période de lancement.", features: ["Toutes les fonctionnalités", "Mises à jour incluses", "Support inclus", "Futures améliorations incluses"], cta: "M'inscrire", highlight: false },
        { name: "Besoins particuliers ?", price: "Sur mesure", cadence: "", desc: "Contactez-nous pour une solution entreprise.", features: ["Intégrations ERP personnalisées", "Branding sur mesure", "Formations dédiées", "SLA garanti"], cta: "Nous contacter", highlight: false }
      ],
      faqTitle: "Questions fréquentes",
      faq: [
        { q: "Qu'est-ce que l'Offre Fondateur ?", a: "Un tarif préférentiel de 149$/mois à vie, réservé aux 10 premières entreprises. Votre abonnement et vos retours d'expérience contribuent directement à l'évolution de l'application. Ce tarif ne changera jamais." },
        { q: "Y a-t-il des frais d'implantation ?", a: "Non. Ni frais d'implantation, ni frais de mise en route. Vous démarrez immédiatement. Pour les solutions sur mesure (intégrations ERP personnalisées, branding, formations dédiées), des frais peuvent s'appliquer selon votre besoin." },
        { q: "Dois-je installer l'application ?", a: "Non. TrimPro360 fonctionne directement dans votre navigateur web — sur ordinateur, tablette ou mobile. Aucune installation, aucune mise à jour manuelle. Ouvrez simplement l'URL et commencez." }
      ]
    },
    en: {
      eyebrow: "PRICING",
      title: "Simple. Transparent. No surprises.",
      subtitle: "Two clear options. Choose what fits your situation.",
      plans: [
        { name: "Founder Offer", price: "149$", cadence: "/ month for life", desc: "Limited to first 10 companies.", spotsLeft: 10, features: ["All features", "Updates included", "Support included", "Future improvements included"], cta: "Reserve my spot", highlight: true },
        { name: "Regular Price", price: "299$", cadence: "/ month", desc: "After launch period.", features: ["All features", "Updates included", "Support included", "Future improvements included"], cta: "Sign up", highlight: false },
        { name: "Custom needs?", price: "Custom", cadence: "", desc: "Contact us for an enterprise solution.", features: ["Custom ERP integrations", "Custom branding", "Dedicated training", "Guaranteed SLA"], cta: "Contact us", highlight: false }
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "What is the Founder Offer?", a: "A preferred rate of $149/month for life, reserved for the first 10 companies. Your subscription and feedback directly contribute to the evolution of the application. This rate will never change." },
        { q: "Are there setup fees?", a: "No. No setup fees, no onboarding fees. You start immediately. For custom solutions (custom ERP integrations, branding, dedicated training), fees may apply depending on your needs." },
        { q: "Do I need to install the app?", a: "No. TrimPro360 works directly in your web browser — on desktop, tablet, or mobile. No installation, no manual updates. Simply open the URL and get started." }
      ]
    }
  }[lang];

  return React.createElement("section", { id: "pricing", className: "tp-section tp-section-alt" },
    React.createElement("div", { className: "tp-container" },
      React.createElement("div", { className: "tp-section-head" },
        React.createElement("div", { className: "tp-eyebrow" }, t.eyebrow),
        React.createElement("h2", { className: "tp-section-title" }, t.title),
        React.createElement("p", { className: "tp-section-sub" }, t.subtitle)
      ),
      React.createElement("div", { className: "tp-pricing-grid" },
        t.plans.map((plan, i) =>
          React.createElement("div", { key: i, className: "tp-pricing-card" + (plan.highlight ? " tp-pricing-card--highlight" : "") },
            plan.highlight && React.createElement("div", { className: "tp-pricing-badge" }, "LIMITÉ"),
            React.createElement("h3", { className: "tp-pricing-name" }, plan.name),
            React.createElement("div", { className: "tp-pricing-price" },
              React.createElement("span", { className: "tp-pricing-amount" }, plan.price),
              React.createElement("span", { className: "tp-pricing-cadence" }, plan.cadence)
            ),
            React.createElement("p", { className: "tp-pricing-desc" }, plan.desc),
            plan.spotsLeft && React.createElement("div", { className: "tp-pricing-spots" },
              React.createElement("span", { className: "tp-pricing-spots-number" }, plan.spotsLeft),
              " ", lang === "fr" ? "places restantes" : "spots left"
            ),
            React.createElement("ul", { className: "tp-pricing-features" },
              plan.features.map((f, j) =>
                React.createElement("li", { key: j }, React.createElement("span", { className: "tp-pricing-check" }, "✓ "), f)
              )
            ),
            React.createElement("button", {
              className: "tp-btn tp-pricing-cta" + (plan.highlight ? " tp-btn-primary" : " tp-btn-ghost"),
              disabled: true,
              style: { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" }
            }, plan.cta)
          )
        )
      ),
      React.createElement("div", { className: "tp-faq" },
        React.createElement("h3", { className: "tp-faq-title" }, t.faqTitle),
        t.faq.map((item, i) =>
          React.createElement("details", { key: i, className: "tp-faq-item" },
            React.createElement("summary", null, item.q),
            React.createElement("p", null, item.a)
          )
        )
      )
    )
  );
}

// ── CTA Section
function CTASection({ lang }) {
  const t = {
    fr: { title: "Prêt à transformer votre production ?", subtitle: "Rejoignez les entreprises qui ont déjà adopté TrimPro360.", cta: "Commencer gratuitement" },
    en: { title: "Ready to transform your production?", subtitle: "Join the companies that have already adopted TrimPro360.", cta: "Start for free" }
  }[lang];

  return React.createElement("section", { className: "tp-section tp-cta-section" },
    React.createElement("div", { className: "tp-container tp-cta-inner" },
      React.createElement("h2", { className: "tp-cta-title" }, t.title),
      React.createElement("p", { className: "tp-cta-subtitle" }, t.subtitle),
      React.createElement("button", { className: "tp-btn tp-btn-primary tp-btn-lg", disabled: true, style: { opacity: 0.5, cursor: "not-allowed", pointerEvents: "none" } }, t.cta)
    )
  );
}

// ── Footer
function Footer({ lang }) {
  const t = {
    fr: { back: "← Retour à SeriesPro360", feedback: "Donner mon avis", copy: "© 2026 SeriesPro360" },
    en: { back: "← Back to SeriesPro360", feedback: "Share feedback", copy: "© 2026 SeriesPro360" }
  }[lang];

  return React.createElement("footer", { className: "tp-footer" },
    React.createElement("div", { className: "tp-container tp-footer-inner" },
      React.createElement("a", { href: "/" }, t.back),
      React.createElement("a", { href: "mailto:yan@seriespro360.com" }, "💬 ", t.feedback),
      React.createElement("span", null, t.copy)
    )
  );
}

// ── App Root
function App() {
  const [lang, setLang] = uS("fr");
  const [scrolled, setScrolled] = uS(false);

  uE(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  uE(() => {
    document.documentElement.classList.add("sp-light");
    document.documentElement.classList.remove("sp-dark");
  }, []);

  return React.createElement("div", { className: "tp-app" },
    React.createElement(Nav, { lang, setLang, isScrolled: scrolled }),
    React.createElement("main", null,
      React.createElement(Hero, { lang }),
      React.createElement(StatsStrip, { lang }),
      React.createElement(Features, { lang }),
      React.createElement(Workflow, { lang }),
      React.createElement(DemoVideos, { lang }),
      React.createElement(Pricing, { lang }),
      React.createElement(CTASection, { lang })
    ),
    React.createElement(Footer, { lang })
  );
}

// Mount
createRoot(document.getElementById("root")).render(React.createElement(App));
