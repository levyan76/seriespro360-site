// product-page.jsx — Page de présentation complète d'un produit SeriesPro360
// Utilisé par: trimpro360.html, calcupro360.html, mesuropro360.html, devispro360.html
// Style: Procore-inspired — Hero split, stats, features, comparaison, calculateur (CalcuPro360 seulement)

const { useState: uS, useEffect: uE } = React;

function DemoCard({ v, fr }) {
  const [open, setOpen] = uS(false);
  return React.createElement("div", { className: "pp-demo-item" },
    React.createElement("div", { className: "pp-demo-video-wrap" },
      React.createElement("iframe", {
        src: "https://www.youtube.com/embed/" + v.id + "?rel=0&modestbranding=1",
        title: fr ? v.titleFr : v.titleEn,
        style: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: "none" },
        allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
        allowFullScreen: true
      })
    ),
    React.createElement("div", { className: "pp-demo-caption" },
      React.createElement("div", { className: "pp-demo-title" }, fr ? v.titleFr : v.titleEn),
      (v.descFr || v.descEn) && React.createElement(React.Fragment, null,
        React.createElement("p", { className: "pp-demo-desc" + (open ? "" : " pp-demo-desc--clamped") },
          fr ? v.descFr : v.descEn
        ),
        React.createElement("button", {
          className: "pp-demo-toggle",
          onClick: () => setOpen(!open)
        },
          open
            ? (fr ? "Réduire ↑" : "Show less ↑")
            : (fr ? "Afficher plus ↓" : "Show more ↓")
        )
      )
    )
  );
}
const { createRoot } = ReactDOM;

// ── Map logos produit
const PRODUCT_LOGOS = {
  "TrimPro360": "/logos/logo-trimpro360.png",
  "CalcuPro360": "/logos/logo-calcupro360.png",
};

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
    "arrow-up": "M12 19V5M5 12l7-7 7 7",
    "arrow-down": "M12 5v14M5 12l7 7 7-7",
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

// ── Carte fonctionnalité cliquable avec expansion
function FeatCard({ f, colors, expanded, onToggle }) {
  const detail = f.detail || null;
  return React.createElement("div", {
    key: f.title,
    className: "pp-feat-card pp-feat-card-clickable" + (expanded ? " pp-feat-card-open" : ""),
    onClick: onToggle,
    role: "button",
    tabIndex: 0,
    onKeyDown: (e) => e.key === "Enter" && onToggle(),
  },
    React.createElement("div", { className: "pp-feat-card-top" },
      React.createElement("div", { className: "pp-feat-icon", style: { background: colors.soft, color: colors.accent } },
        React.createElement(Icon, { name: f.icon, size: 22 })
      ),
      React.createElement("div", { className: "pp-feat-card-text" },
        React.createElement("h3", { className: "pp-feat-title" }, f.title),
        React.createElement("p", { className: "pp-feat-desc" }, f.desc),
      ),
      React.createElement("div", { className: "pp-feat-chevron", style: { color: colors.accent } },
        React.createElement(Icon, { name: expanded ? "arrow-up" : "arrow-down", size: 16 })
      ),
    ),
    expanded && detail && React.createElement("div", { className: "pp-feat-detail", style: { borderTop: `1px solid ${colors.soft}` } },
      detail.map((line, i) => React.createElement("p", { key: i, className: "pp-feat-detail-line" },
        React.createElement("span", { className: "pp-feat-detail-dot", style: { background: colors.accent } }),
        line
      ))
    )
  );
}

// ── Stats par produit (chiffres clés visibles sous le hero)
const PRODUCT_STATS = {
  calcupro360: {
    fr: [
      { value: "90 s", label: "Pour générer un devis PDF complet" },
      { value: "±2 %", label: "Précision des estimés matériaux" },
      { value: "0 $", label: "Pour commencer — aucune carte" },
      { value: "100 %", label: "Conforme TPS+TVQ · CNB · CCQ" },
    ],
    en: [
      { value: "90 s", label: "To generate a full PDF quote" },
      { value: "±2 %", label: "Material estimate accuracy" },
      { value: "$0", label: "To start — no credit card" },
      { value: "100 %", label: "GST+QST · NBC · CCQ compliant" },
    ],
  },
  trimpro360: {
    fr: [
      { value: "56", label: "Profils standards dans le catalogue" },
      { value: "100 %", label: "Bilingue FR / EN natif" },
      { value: "0 $", label: "Accès gratuit clients & installateurs" },
      { value: "7", label: "Statuts de commande de brouillon à livraison" },
    ],
    en: [
      { value: "56", label: "Standard profiles in the catalog" },
      { value: "100 %", label: "Native FR / EN bilingual" },
      { value: "$0", label: "Free access for clients & installers" },
      { value: "7", label: "Order statuses from draft to delivered" },
    ],
  },
};

// ── Demo translations pour le calculateur
const DEMO_T = {
  fr: {
    eyebrow: "Démo en direct",
    title: "Calculez votre dalle maintenant.",
    subtitle: "Essayez CalcuPro360 directement ici. Modifiez les dimensions et voyez les coûts se recalculer en temps réel.",
    title: "Dalle de béton — estimé en direct",
    length: "Longueur", width: "Largeur", thickness: "Épaisseur",
    waste: "Pertes %", price: "Prix béton",
    reinforce: "Armature",
    rebar_none: "Aucune", rebar_mesh: "Treillis", rebar_bars: "Barres #4",
    gravel: "Gravier 4\"", vapor: "Pare-vapeur",
    explain: "Comment sont calculés les prix?",
    explain_body: "Les prix sont basés sur les tarifs 2026 des fournisseurs québécois (Béton Provincial, Holcim, Home Depot CA, RONA). Tu peux modifier le prix du béton manuellement.",
    result_title: "Résultat",
    vol_label: "Volume net", vol_waste: "Volume commandé",
    subtotal: "Sous-total", tps: "TPS 5%", tvq: "TVQ 9,975%", total: "Total TTC",
    generate: "Générer le devis PDF",
    reset: "Réinitialiser",
    saved: "Devis généré ✓",
    unit_metric: "Métrique", unit_imperial: "Impérial",
    mock_title: "", mock_volume: "", mock_with_waste: "", mock_total: "",
  },
  en: {
    eyebrow: "Live demo",
    title: "Calculate your slab now.",
    subtitle: "Try CalcuPro360 right here. Change the dimensions and watch costs recalculate in real time.",
    title: "Concrete slab — live estimate",
    length: "Length", width: "Width", thickness: "Thickness",
    waste: "Waste %", price: "Concrete price",
    reinforce: "Reinforcement",
    rebar_none: "None", rebar_mesh: "Mesh", rebar_bars: "#4 Rebar",
    gravel: "4\" Gravel", vapor: "Vapour barrier",
    explain: "How are prices calculated?",
    explain_body: "Prices are based on 2026 Quebec supplier rates (Béton Provincial, Holcim, Home Depot CA, RONA). You can override the concrete price manually.",
    result_title: "Result",
    vol_label: "Net volume", vol_waste: "Volume ordered",
    subtotal: "Subtotal", tps: "GST 5%", tvq: "QST 9.975%", total: "Total incl. tax",
    generate: "Generate PDF quote",
    reset: "Reset",
    saved: "Quote generated ✓",
    unit_metric: "Metric", unit_imperial: "Imperial",
    mock_title: "", mock_volume: "", mock_with_waste: "", mock_total: "",
  },
};

// ── Page produit complète — style Procore
function ProductPage() {
  const [lang, setLang] = uS(() => {
    try { return localStorage.getItem("sp-lang") || "fr"; } catch { return "fr"; }
  });
  const [openFeat, setOpenFeat] = uS(null);
  const [feedbackOpen, setFeedbackOpen] = uS(false);
  const [fbMetier, setFbMetier] = uS("");
  const [fbIrritant, setFbIrritant] = uS("");
  const [fbAide, setFbAide] = uS("");
  const [fbSent, setFbSent] = uS(false);
  const [fbSending, setFbSending] = uS(false);

  const handleFeedback = async (e) => {
    e.preventDefault();
    setFbSending(true);
    const sb = (window.supabase && window.SP_CONFIG && window.SP_CONFIG.supabaseUrl && !window.SP_CONFIG.supabaseUrl.includes("VOTRE"))
      ? (window._sb || (window._sb = window.supabase.createClient(window.SP_CONFIG.supabaseUrl, window.SP_CONFIG.supabaseKey)))
      : null;
    if (sb) {
      await sb.from("feedback").insert({ metier: fbMetier, irritant: fbIrritant, aide: fbAide, lang, created_at: new Date().toISOString() });
      setFbSent(true);
    } else {
      const body = encodeURIComponent(`Métier: ${fbMetier}\n\nIrritant: ${fbIrritant}\n\nCe qui aiderait: ${fbAide}`);
      window.open(`mailto:yan@seriespro360.com?subject=Feedback SeriesPro360&body=${body}`);
      setFbSent(true);
    }
    setFbSending(false);
  };
  uE(() => {
    try { localStorage.setItem("sp-lang", lang); } catch {}
    document.documentElement.lang = lang === "fr" ? "fr-CA" : "en-CA";
  }, [lang]);

  const product = getProduct(lang);
  const m = product?.modal;
  const fr = lang === "fr";
  const colors = COLOR_MAP[product?.color] || COLOR_MAP.orange;
  const isLive = product?.tag === "Actif" || product?.tag === "En ligne" || product?.tag === "Live";
  const slug = document.getElementById("root")?.dataset?.product || "";
  const stats = (PRODUCT_STATS[slug] || {})[lang] || null;
  const isCalcu = slug === "calcupro360";

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
            href: product.url, target: "_blank", rel: "noopener",
            className: "pp-cta-btn",
            style: { background: colors.accent }
          },
            product.cta, React.createElement(Icon, { name: "external-link", size: 14 })
          ),
        )
      )
    ),

    // ── HERO SPLIT (Procore-style)
    React.createElement("header", { className: "pp-hero pp-hero-split" },

      // Bande logo centrée
      PRODUCT_LOGOS[product.name] && React.createElement("div", { className: "pp-hero-logo-band" },
        React.createElement("img", {
          src: PRODUCT_LOGOS[product.name],
          alt: product.name,
          className: "pp-hero-logo-centered"
        })
      ),

      React.createElement("div", { className: "pp-hero-split-inner" },

        // LEFT — copy
        React.createElement("div", { className: "pp-hero-left" },
          React.createElement("div", { className: "pp-hero-badge", style: { color: colors.accent, background: colors.soft, fontWeight: 700, letterSpacing: "0.08em" } },
            product.tag
          ),
          React.createElement("h1", { className: "pp-hero-title" }, product.name),
          React.createElement("p", { className: "pp-hero-tagline" }, product.tagline),
          React.createElement("p", { className: "pp-hero-hook" },
            fr
              ? "Du dessin à la livraison — sans papier, sans oublis, sans ressaisie."
              : "From drawing to delivery — no paper, no missed specs, no re-entry."
          ),
          React.createElement("div", { className: "pp-hero-ctas" },
            isLive
              ? React.createElement("a", {
                  href: product.url, target: "_blank", rel: "noopener",
                  className: "pp-cta-btn",
                  style: { background: colors.accent }
                },
                  product.cta, " ", React.createElement(Icon, { name: "external-link", size: 16 })
                )
              : React.createElement("div", { className: "pp-coming-soon-badge" },
                  fr ? "Lancement à venir" : "Coming soon"
                ),
            isLive && isCalcu && React.createElement("a", {
              href: "#demo",
              className: "pp-ghost-btn"
            },
              fr ? "Voir la démo" : "Try demo",
              React.createElement(Icon, { name: "arrow-down", size: 14 })
            )
          ),
          React.createElement("div", { className: "pp-hero-trust-line" },
            React.createElement(Icon, { name: "check", size: 12 }),
            fr ? "Essai gratuit 14 jours" : "14-day free trial",
            React.createElement("span", { className: "pp-trust-dot" }),
            fr ? "Aucune carte de crédit" : "No credit card",
            React.createElement("span", { className: "pp-trust-dot" }),
            fr ? "FR / EN natif" : "Native FR / EN"
          ),
          React.createElement("ul", { className: "pp-hero-meta" },
            (m.bullets || (m.steps && m.steps.slice(0, 3)) || []).map((s, i) =>
              React.createElement("li", { key: i },
                React.createElement(Icon, { name: "check", size: 14 }),
                s
              )
            )
          ),
        ),

        // RIGHT — visual mock enrichi
        React.createElement("div", { className: "pp-hero-right" },
          React.createElement("div", { className: "pp-hero-visual-card", style: { borderColor: "rgba(255,255,255,0.08)" } },
            React.createElement("div", { className: "pp-hero-quote-accent", style: { background: colors.accent } }),

            // Headline quote
            React.createElement("blockquote", { className: "pp-hero-quote-text" },
              "\u201c", m.headline, "\u201d"
            ),
            React.createElement("div", { className: "pp-hero-quote-label", style: { color: colors.accent, marginBottom: 28 } },
              product.name, " · ", fr ? "Promesse produit" : "Product promise"
            ),

            // Workflow statuts (TrimPro uniquement)
            slug === "trimpro360" && React.createElement("div", { className: "pp-hero-workflow" },
              React.createElement("div", { className: "pp-hero-workflow-label", style: { color: "rgba(15,28,53,0.35)" } },
                fr ? "Workflow commandes" : "Order workflow"
              ),
              React.createElement("div", { className: "pp-hero-workflow-steps" },
                [fr ? "Brouillon" : "Draft", fr ? "Soumise" : "Submitted", fr ? "Approuvée" : "Approved", fr ? "Production" : "In Production", fr ? "Livrée" : "Delivered"].map((label, i, arr) =>
                  React.createElement("div", { key: i, className: "pp-wf-step", style: { opacity: i === 3 ? 1 : (i === 4 ? 0.45 : 0.5 + i * 0.1) } },
                    React.createElement("div", { className: "pp-wf-dot" + (i === 3 ? " active" : ""), style: { background: i === 3 ? colors.accent : "rgba(15,28,53,0.12)" } }),
                    React.createElement("span", null, label),
                    i < arr.length - 1 && React.createElement("div", { className: "pp-wf-line" })
                  )
                )
              )
            ),

            // Mini feature badges
            React.createElement("div", { className: "pp-hero-badges" },
              (m.modules || m.features || []).slice(0, 3).map((f) =>
                React.createElement("div", { key: f.title, className: "pp-hero-feat-badge", style: { background: colors.soft, color: colors.accent } },
                  React.createElement(Icon, { name: f.icon, size: 13 }),
                  React.createElement("span", null, f.title)
                )
              )
            )
          )
        )
      )
    ),

    // ── STATS (si disponibles)
    stats && React.createElement("section", { className: "pp-stats-strip" },
      React.createElement("div", { className: "pp-stats-inner" },
        stats.map((s) =>
          React.createElement("div", { key: s.value, className: "pp-stat-item" },
            React.createElement("div", { className: "pp-stat-value", style: { color: colors.accent } }, s.value),
            React.createElement("div", { className: "pp-stat-label" }, s.label),
          )
        )
      )
    ),

    // ── POSITIONNEMENT (origine du produit)
    (m.origin || (window.T[lang].origin && window.T[lang].origin.positioning)) && React.createElement("section", { className: "pp-section pp-section-alt" },
      React.createElement("div", { className: "pp-section-inner" },
        React.createElement("div", { className: "pp-eyebrow", style: { color: colors.accent, textAlign: "center", marginBottom: 8 } },
          fr ? "Pourquoi " + product.name + " ?" : "Why " + product.name + "?"
        ),
        React.createElement("h2", { className: "pp-section-title" },
          fr ? "Conçu par quelqu'un qui a vécu le problème." : "Built by someone who lived the problem."
        ),
        React.createElement("p", { style: { textAlign: "center", fontSize: 15, color: "rgba(15,28,53,0.55)", maxWidth: 600, margin: "0 auto 40px", lineHeight: 1.65 } },
          (m.origin || window.T[lang].origin || {}).story
        ),
        React.createElement("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 } },
          ((m.origin || window.T[lang].origin || {}).positioning || []).map((pt) =>
            React.createElement("div", { key: pt.label, style: { background: "#FFFFFF", border: "1px solid rgba(15,28,53,0.09)", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 10, boxShadow: "0 2px 8px rgba(15,28,53,0.04)" } },
              React.createElement("div", { style: { width: 38, height: 38, borderRadius: 8, background: colors.soft, color: colors.accent, display: "flex", alignItems: "center", justifyContent: "center" } },
                React.createElement(Icon, { name: pt.icon, size: 18 })
              ),
              React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "#0F1C35", lineHeight: 1.4 } }, pt.label),
              React.createElement("div", { style: { fontSize: 13, color: "rgba(15,28,53,0.55)", lineHeight: 1.55 } }, pt.sub)
            )
          )
        )
      )
    ),

    // ── VIDÉOS DÉMO
    m.demoVideos && m.demoVideos.length > 0 && React.createElement("section", { className: "pp-section pp-section-alt" },
      React.createElement("div", { className: "pp-section-inner" },
        React.createElement("div", { className: "pp-eyebrow", style: { color: colors.accent, textAlign: "center", marginBottom: 8 } },
          fr ? "Démos" : "Demos"
        ),
        React.createElement("h2", { className: "pp-section-title" },
          fr ? "Voir l'app en action" : "See the app in action"
        ),
        React.createElement("div", { className: "pp-demo-grid" },
          m.demoVideos.map((v) =>
            React.createElement(DemoCard, { key: v.id, v, fr })
          )
        )
      )
    ),

    // ── FONCTIONNALITÉS
    React.createElement("section", { className: "pp-section" },
      React.createElement("div", { className: "pp-section-inner" },
        React.createElement("div", { className: "pp-eyebrow", style: { color: colors.accent, textAlign: "center", marginBottom: 8 } },
          fr ? "Ce que ça fait" : "What it does"
        ),
        React.createElement("h2", { className: "pp-section-title" },
          fr ? "Fonctionnalités" : "Features"
        ),
        React.createElement("div", { className: "pp-features-grid" },
          m.features.map((f, i) =>
            React.createElement(FeatCard, {
              key: f.title, f, colors,
              expanded: openFeat === i,
              onToggle: () => setOpenFeat(openFeat === i ? null : i),
            })
          )
        )
      )
    ),

    // ── CALCULATEUR INTERACTIF (CalcuPro360 seulement)
    isCalcu && typeof SlabEstimator !== "undefined" && React.createElement("section", { id: "demo", className: "pp-section pp-section-alt pp-section-demo" },
      React.createElement("div", { className: "pp-section-inner" },
        React.createElement("div", { className: "pp-demo-head" },
          React.createElement("div", { className: "pp-eyebrow", style: { color: colors.accent } }, DEMO_T[lang].eyebrow),
          React.createElement("h2", { className: "pp-section-title" }, fr ? "Essayez CalcuPro360 maintenant." : "Try CalcuPro360 right now."),
          React.createElement("p", { className: "pp-section-sub" }, DEMO_T[lang].subtitle),
        ),
        React.createElement(SlabEstimator, { lang, t: DEMO_T[lang] })
      )
    ),

    // ── MODULES COMPLETS
    m.modules && m.modules.length > 0 && React.createElement("section", { className: "pp-section" },
      React.createElement("div", { className: "pp-section-inner" },
        React.createElement("div", { className: "pp-eyebrow", style: { color: colors.accent, textAlign: "center", marginBottom: 8 } },
          fr ? "Vue d'ensemble" : "Full overview"
        ),
        React.createElement("h2", { className: "pp-section-title" },
          fr ? "Tous les modules" : "All modules"
        ),
        React.createElement("p", { className: "pp-modules-sub" },
          fr ? "Une plateforme complète. Chaque module est fonctionnel et intégré." : "A complete platform. Every module is live and fully integrated."
        ),
        React.createElement("div", { className: "pp-modules-grid" },
          m.modules.map((mod) =>
            React.createElement("div", { key: mod.title, className: "pp-module-row" },
              React.createElement("div", { className: "pp-module-icon", style: { background: colors.soft, color: colors.accent } },
                React.createElement(Icon, { name: mod.icon, size: 18 })
              ),
              React.createElement("div", null,
                React.createElement("div", { className: "pp-module-title" }, mod.title),
                React.createElement("div", { className: "pp-module-desc" }, mod.desc),
              )
            )
          )
        )
      )
    ),

    // ── COMMENT ÇA MARCHE
    m.steps && m.steps.length > 0 && React.createElement("section", { className: "pp-section pp-section-alt" },
      React.createElement("div", { className: "pp-section-inner" },
        React.createElement("div", { className: "pp-eyebrow", style: { color: colors.accent, textAlign: "center", marginBottom: 8 } },
          fr ? "Prise en main" : "Getting started"
        ),
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

    // ── COMPARAISON
    m.comparison && React.createElement("section", { className: "pp-section" },
      React.createElement("div", { className: "pp-section-inner" },
        React.createElement("h2", { className: "pp-section-title" }, m.comparison.title),
        React.createElement("div", { className: "pp-compare-table" },
          React.createElement("div", { className: "pp-compare-head" },
            React.createElement("div", { className: "pp-compare-col-feature" }),
            React.createElement("div", { className: "pp-compare-col pp-compare-col-us", style: { color: colors.accent } }, product.name),
            React.createElement("div", { className: "pp-compare-col pp-compare-col-other" }, fr ? "Alternatives" : "Alternatives"),
          ),
          m.comparison.rows.map((row, i) =>
            React.createElement("div", { key: i, className: "pp-compare-row" },
              React.createElement("div", { className: "pp-compare-col-feature" }, row.feature),
              React.createElement("div", { className: "pp-compare-col pp-compare-col-us" },
                React.createElement("span", { className: "pp-compare-check", style: { color: colors.accent } }, "✓ "),
                row.trimpro
              ),
              React.createElement("div", { className: "pp-compare-col pp-compare-col-other" }, row.other),
            )
          )
        ),
        React.createElement("p", { className: "pp-compare-note" }, m.comparison.note)
      )
    ),

    // ── TARIFICATION / NOTE
    React.createElement("section", { className: "pp-section pp-section-alt" },
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

    // ── FOOTER
    React.createElement("footer", { className: "pp-footer" },
      React.createElement("a", { href: "/", className: "pp-footer-back" },
        React.createElement(Icon, { name: "arrow-left", size: 14 }),
        fr ? "Retour à SeriesPro360" : "Back to SeriesPro360"
      ),
      React.createElement("a", { href: "#!", onClick: (e) => { e.preventDefault(); setFeedbackOpen(true); }, style: { color: "#E8420A", fontWeight: 600, fontSize: 14, textDecoration: "none" } },
        "💬 ", fr ? "Donner mon avis" : "Share feedback"
      ),
      React.createElement("span", null, "© 2026 SeriesPro360")
    ),

    // ── FEEDBACK MODAL
    feedbackOpen && ReactDOM.createPortal(
      React.createElement("div", { className: "sp-modal-backdrop", onClick: () => setFeedbackOpen(false), style: { zIndex: 9500 } },
        React.createElement("div", { className: "sp-product-modal", onClick: e => e.stopPropagation(), role: "dialog", style: { maxWidth: 480 } },
          React.createElement("button", { className: "sp-login-close", onClick: () => setFeedbackOpen(false) }, React.createElement(Icon, { name: "x", size: 16 })),
          fbSent
            ? React.createElement("div", { style: { textAlign: "center", padding: "40px 24px" } },
                React.createElement("div", { style: { fontSize: 40, marginBottom: 16 } }, "🙏"),
                React.createElement("h2", { style: { fontSize: 20, fontWeight: 700, color: "#0F1C35", margin: "0 0 8px" } }, fr ? "Merci pour votre retour !" : "Thanks for your feedback!"),
                React.createElement("p", { style: { color: "#3D4F6E", fontSize: 15 } }, fr ? "Vos commentaires nous aident à améliorer nos outils." : "Your input helps us improve our tools.")
              )
            : React.createElement(React.Fragment, null,
                React.createElement("div", { className: "sp-pm-header", style: { borderBottom: "1px solid rgba(27,42,74,0.08)" } },
                  React.createElement("div", { className: "sp-pm-header-left" },
                    React.createElement("div", { style: { fontSize: 24 } }, "💬"),
                    React.createElement("div", null,
                      React.createElement("h2", { className: "sp-pm-name" }, fr ? "Donnez votre avis" : "Share your feedback"),
                      React.createElement("div", { className: "sp-pm-tagline" }, fr ? "3 questions, 2 minutes — ça nous aide vraiment." : "3 questions, 2 minutes — it really helps.")
                    )
                  )
                ),
                React.createElement("div", { className: "sp-pm-body" },
                  React.createElement("form", { onSubmit: handleFeedback, style: { display: "flex", flexDirection: "column", gap: 20 } },
                    React.createElement("div", null,
                      React.createElement("label", { style: { display: "block", fontSize: 13, fontWeight: 600, color: "#0F1C35", marginBottom: 6 } }, fr ? "Votre métier dans la construction" : "Your construction trade"),
                      React.createElement("input", { type: "text", required: true, value: fbMetier, onChange: e => setFbMetier(e.target.value), placeholder: fr ? "ex: charpentier, estimateur…" : "e.g. carpenter, estimator…", style: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(27,42,74,0.2)", fontSize: 14, outline: "none", boxSizing: "border-box" } })
                    ),
                    React.createElement("div", null,
                      React.createElement("label", { style: { display: "block", fontSize: 13, fontWeight: 600, color: "#0F1C35", marginBottom: 6 } }, fr ? "Votre principal irritant au quotidien" : "Your main daily frustration"),
                      React.createElement("textarea", { required: true, value: fbIrritant, onChange: e => setFbIrritant(e.target.value), rows: 3, placeholder: fr ? "Ce qui vous fait perdre du temps…" : "What wastes your time…", style: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(27,42,74,0.2)", fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box" } })
                    ),
                    React.createElement("div", null,
                      React.createElement("label", { style: { display: "block", fontSize: 13, fontWeight: 600, color: "#0F1C35", marginBottom: 6 } }, fr ? "Ce qui vous aiderait le plus" : "What would help you most"),
                      React.createElement("textarea", { value: fbAide, onChange: e => setFbAide(e.target.value), rows: 3, placeholder: fr ? "Un outil, une fonctionnalité…" : "A tool, a feature…", style: { width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(27,42,74,0.2)", fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box" } })
                    ),
                    React.createElement("button", { type: "submit", disabled: fbSending, className: "sp-btn sp-btn-primary", style: { alignSelf: "flex-end", minWidth: 140 } },
                      fbSending ? (fr ? "Envoi…" : "Sending…") : (fr ? "Envoyer" : "Submit"),
                      " ", React.createElement(Icon, { name: "arrow-right", size: 14 })
                    )
                  )
                )
              )
        )
      ),
      document.body
    )
  );
}

// ── Mount
const root = createRoot(document.getElementById("root"));
root.render(React.createElement(ProductPage));
