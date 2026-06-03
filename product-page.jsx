// product-page.jsx — Page de présentation complète d'un produit SeriesPro360
// Utilisé par: trimpro360.html, calcupro360.html, mesuropro360.html, devispro360.html

const { useState: uS, useEffect: uE } = React;
const { createRoot } = ReactDOM;

// ── Détecte le produit depuis l'attribut data-product sur #root
function getProduct(lang) {
  const slug = document.getElementById("root")?.dataset?.product || "";
  const suite = window.T[lang].suite.products;
  return suite.find(p => p.name.toLowerCase().replace(/[^a-z0-9]/g, "") === slug) || suite[0];
}

// ── Icônes SVG inline légers
function Icon({ name, size = 16 }) {
  const icons = {
    "arrow-left": "M19 12H5M12 19l-7-7 7-7",
    "arrow-right": "M5 12h14M12 5l7 7-7 7",
    "check": "M20 6L9 17l-5-5",
    "external-link": "M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3",
    "ruler": "M2 12h20M2 6h4M2 18h4M18 6h4M18 18h4",
    "package": "M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z",
    "file": "M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z M14 2v6h6",
    "cpu": "M12 2a10 10 0 110 20A10 10 0 0112 2zm0 6v4l3 3",
    "globe": "M12 2a10 10 0 110 20A10 10 0 0112 2zM2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20",
    "wifi-off": "M1 1l22 22M16.72 11.06A10.94 10.94 0 0119 12.55M5 12.55a10.94 10.94 0 015.17-2.39M10.71 5.05A16 16 0 0122.56 9M1.42 9a15.91 15.91 0 014.7-2.88M8.53 16.11a6 6 0 016.95 0M12 20h.01",
    "zap": "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    "users": "M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75",
    "tag": "M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82zM7 7h.01",
    "calculator": "M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zM8 10h8M8 14h4M8 6h8",
    "bell": "M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0",
    "star": "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  };
  return React.createElement("svg", {
    width: size, height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": "true",
  }, React.createElement("path", { d: icons[name] || "" }));
}

// ── Logo simplifié pour la nav
function NavLogo() {
  return React.createElement("a", { href: "/", className: "pp-nav-logo" },
    React.createElement("svg", { width: 28, height: 28, viewBox: "0 0 32 32" },
      React.createElement("rect", { width: 32, height: 32, rx: 6, fill: "#0E0F12" }),
      React.createElement("rect", { x: 6, y: 8, width: 20, height: 2.5, rx: 1, fill: "#FF6B1A" }),
      React.createElement("rect", { x: 6, y: 14.75, width: 14, height: 2.5, rx: 1, fill: "#FF6B1A", opacity: .55 }),
      React.createElement("rect", { x: 6, y: 21.5, width: 8, height: 2.5, rx: 1, fill: "#FF6B1A", opacity: .85 }),
    ),
    React.createElement("span", null, "SeriesPro360")
  );
}

// ── Couleurs par produit
const COLOR_MAP = {
  orange: { accent: "#FF6B1A", soft: "rgba(255,107,26,0.12)", grad: "linear-gradient(135deg, rgba(255,107,26,0.15) 0%, transparent 60%)" },
  yellow: { accent: "#EAB308", soft: "rgba(234,179,8,0.12)", grad: "linear-gradient(135deg, rgba(234,179,8,0.15) 0%, transparent 60%)" },
  blue:   { accent: "#3B82F6", soft: "rgba(59,130,246,0.12)", grad: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, transparent 60%)" },
  green:  { accent: "#10B981", soft: "rgba(16,185,129,0.12)", grad: "linear-gradient(135deg, rgba(16,185,129,0.15) 0%, transparent 60%)" },
};

// ── Page produit complète
function ProductPage() {
  const [lang, setLang] = uS(() => {
    try { return localStorage.getItem("sp-lang") || "fr"; } catch { return "fr"; }
  });
  uE(() => {
    try { localStorage.setItem("sp-lang", lang); } catch {}
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
  }, [lang]);

  const product = getProduct(lang);
  const m = product?.modal;
  const fr = lang === "fr";
  const colors = COLOR_MAP[product?.color] || COLOR_MAP.orange;
  const isLive = product?.tag === "Actif" || product?.tag === "En ligne" || product?.tag === "Live";

  if (!product || !m) return null;

  return React.createElement("div", { className: "pp-root sp-dark", style: { "--pp-accent": colors.accent, "--pp-soft": colors.soft } },

    // ── NAV
    React.createElement("nav", { className: "pp-nav" },
      React.createElement("div", { className: "pp-nav-inner" },
        React.createElement(NavLogo),
        React.createElement("div", { className: "pp-nav-right" },
          React.createElement("div", { className: "pp-lang-toggle" },
            React.createElement("button", { className: lang === "fr" ? "active" : "", onClick: () => setLang("fr") }, "FR"),
            React.createElement("button", { className: lang === "en" ? "active" : "", onClick: () => setLang("en") }, "EN"),
          ),
          React.createElement("a", { href: "/", className: "pp-back-btn" },
            React.createElement(Icon, { name: "arrow-left", size: 15 }),
            fr ? "Retour" : "Back"
          ),
          isLive && React.createElement("a", {
            href: product.url,
            target: "_blank",
            rel: "noopener",
            className: "pp-cta-btn",
            style: { background: colors.accent }
          },
            product.cta,
            React.createElement(Icon, { name: "external-link", size: 14 })
          ),
        )
      )
    ),

    // ── HERO PRODUIT
    React.createElement("header", { className: "pp-hero", style: { background: colors.grad } },
      React.createElement("div", { className: "pp-hero-inner" },
        React.createElement("div", { className: "pp-hero-badge", style: { color: colors.accent, background: colors.soft } },
          product.tag
        ),
        React.createElement("h1", { className: "pp-hero-title" }, product.name),
        React.createElement("p", { className: "pp-hero-tagline" }, product.tagline),
        React.createElement("p", { className: "pp-hero-headline" }, m.headline),
        React.createElement("p", { className: "pp-hero-about" }, m.about),
        isLive
          ? React.createElement("a", {
              href: product.url, target: "_blank", rel: "noopener",
              className: "pp-hero-cta",
              style: { background: colors.accent }
            },
              product.cta, " ", React.createElement(Icon, { name: "external-link", size: 16 })
            )
          : React.createElement("div", { className: "pp-coming-soon-badge" },
              fr ? "Lancement à venir" : "Coming soon"
            ),
      )
    ),

    // ── FONCTIONNALITÉS
    React.createElement("section", { className: "pp-section" },
      React.createElement("div", { className: "pp-section-inner" },
        React.createElement("h2", { className: "pp-section-title" },
          fr ? "Fonctionnalités" : "Features"
        ),
        React.createElement("div", { className: "pp-features-grid" },
          m.features.map((f) =>
            React.createElement("div", { key: f.title, className: "pp-feat-card" },
              React.createElement("div", { className: "pp-feat-icon", style: { background: colors.soft, color: colors.accent } },
                React.createElement(Icon, { name: f.icon, size: 22 })
              ),
              React.createElement("h3", { className: "pp-feat-title" }, f.title),
              React.createElement("p", { className: "pp-feat-desc" }, f.desc),
            )
          )
        )
      )
    ),

    // ── COMMENT ÇA MARCHE
    m.steps && m.steps.length > 0 && React.createElement("section", { className: "pp-section pp-section-alt" },
      React.createElement("div", { className: "pp-section-inner" },
        React.createElement("h2", { className: "pp-section-title" },
          fr ? "Comment ça marche" : "How it works"
        ),
        React.createElement("ol", { className: "pp-steps" },
          m.steps.map((s, i) =>
            React.createElement("li", { key: i, className: "pp-step" },
              React.createElement("span", { className: "pp-step-num", style: { color: colors.accent } },
                String(i + 1).padStart(2, "0")
              ),
              React.createElement("span", { className: "pp-step-text" }, s)
            )
          )
        )
      )
    ),

    // ── TARIFICATION / NOTE
    React.createElement("section", { className: "pp-section" },
      React.createElement("div", { className: "pp-section-inner pp-pricing-note" },
        React.createElement("div", { className: "pp-pricing-icon", style: { color: colors.accent } },
          React.createElement(Icon, { name: "tag", size: 20 })
        ),
        React.createElement("p", null, m.pricing_note),
        isLive && React.createElement("a", {
          href: product.url, target: "_blank", rel: "noopener",
          className: "pp-cta-btn",
          style: { background: colors.accent }
        },
          product.cta, " ", React.createElement(Icon, { name: "external-link", size: 14 })
        ),
      )
    ),

    // ── FORMULAIRE NOTIFICATION (apps à venir)
    !isLive && React.createElement("section", { className: "pp-section pp-section-notify" },
      React.createElement("div", { className: "pp-section-inner" },
        React.createElement("h2", { className: "pp-section-title" },
          fr ? "Être notifié au lancement" : "Get notified at launch"
        ),
        React.createElement("p", { className: "pp-notify-sub" },
          fr
            ? "Entre ton courriel pour être parmi les premiers informés quand l'app sera disponible."
            : "Enter your email to be among the first to know when the app launches."
        ),
        React.createElement("form", { className: "pp-notify-form", onSubmit: e => e.preventDefault() },
          React.createElement("input", { type: "email", placeholder: fr ? "ton@courriel.com" : "your@email.com", required: true }),
          React.createElement("button", { type: "submit", style: { background: colors.accent } },
            fr ? "M'avertir" : "Notify me",
            " ", React.createElement(Icon, { name: "bell", size: 14 })
          )
        )
      )
    ),

    // ── FOOTER SIMPLE
    React.createElement("footer", { className: "pp-footer" },
      React.createElement("a", { href: "/", className: "pp-footer-back" },
        React.createElement(Icon, { name: "arrow-left", size: 14 }),
        fr ? "Retour à SeriesPro360" : "Back to SeriesPro360"
      ),
      React.createElement("span", null, "© 2026 SeriesPro360")
    )
  );
}

// ── Mount
const root = createRoot(document.getElementById("root"));
root.render(React.createElement(ProductPage));
