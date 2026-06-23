// trimpro360-landing.jsx — Page TrimPro360 style SeriesPro360
// Structure V2 (2026-06-20) : Nav · Hero · Problem · Solution · Workflow · Demos · Origin · Pricing · RiskReversal · CTA · Footer
// Copy aligné sur .agents/copy-trimpro360-v1.md (TrimPro360 v3)

// ============================================================
// ⚙️ MODE PRÉ-LANCEMENT
// Mettre à `false` quand le rollout pricing V3 est prêt (cf. TODO-pricing-v3-rollout.md)
// Effets quand `true` :
//   - Banner pre-launch en haut de la page
//   - Tous les CTAs d'achat / essai → mailto liste d'attente (avec subject du plan)
//   - Tableau pricing reste visible (création d'anchor + capture intérêt)
// ============================================================
const PRELAUNCH_MODE = false;
const WAITLIST_EMAIL = "yan@seriespro360.com";

// URL checkout Lemon Live (tous les 6 variants actives) — le user choisit son
// plan + sa recurrence (mensuel/annuel) sur la page Lemon.
// TODO Option B : remplacer par 6 URLs distinctes par variant pour pre-selection
// automatique depuis le toggle Mensuel/Annuel du site.
const LEMON_CHECKOUT_URL = "https://seriespro-360.lemonsqueezy.com/checkout/buy/0f8458e9-8b4e-41c6-997f-0cb3199233c8";

const WAITLIST_LABEL = {
  fr: "Rejoindre la liste d'attente",
  en: "Join the waitlist"
};
const WAITLIST_PREFIX = {
  fr: "[Waitlist TrimPro360]",
  en: "[TrimPro360 Waitlist]"
};

function waitlistHref(lang, planLabel) {
  const subject = encodeURIComponent(`${WAITLIST_PREFIX[lang]} ${planLabel || ""}`.trim());
  const body = encodeURIComponent(
    lang === "fr"
      ? "Bonjour Yan,\n\nJe souhaite être informé(e) du lancement officiel de TrimPro360.\n\nNom de l'entreprise : \nVille : \nTéléphone : \nPlan d'intérêt : " + (planLabel || "Pas encore décidé") + "\n\nMerci !"
      : "Hi Yan,\n\nI'd like to be notified when TrimPro360 officially launches.\n\nCompany name: \nCity: \nPhone: \nPlan of interest: " + (planLabel || "Not yet decided") + "\n\nThanks!"
  );
  return `mailto:${WAITLIST_EMAIL}?subject=${subject}&body=${body}`;
}

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
    "phone": "M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z",
    "moon": "M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z",
    "wrench": "M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z",
    "shield": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    "rotate-ccw": "M1 4v6h6M3.51 15a9 9 0 102.13-9.36L1 10",
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

// ── Banner pre-launch (affiché uniquement en mode PRELAUNCH_MODE)
function PrelaunchBanner({ lang }) {
  const t = {
    fr: {
      text: "Programme Fondateur — ouverture officielle bientôt.",
      cta: "Rejoignez la liste d'attente pour être notifié en premier →"
    },
    en: {
      text: "Founder Program — official launch coming soon.",
      cta: "Join the waitlist to be notified first →"
    }
  }[lang];
  return React.createElement("a", {
    href: waitlistHref(lang, ""),
    className: "tp-prelaunch-banner"
  },
    React.createElement("span", { className: "tp-prelaunch-dot" }),
    React.createElement("span", { className: "tp-prelaunch-text" }, t.text),
    React.createElement("span", { className: "tp-prelaunch-cta" }, t.cta)
  );
}

// ── Navigation (inchangée)
function Nav({ lang, setLang, isScrolled }) {
  const t = {
    fr: { produits: "Produits", tarifs: "Tarifs", demo: "Démo", faq: "FAQ", login: "Connexion", cta: "Essai gratuit" },
    en: { produits: "Features", tarifs: "Pricing", demo: "Demo", faq: "FAQ", login: "Login", cta: "Free trial" }
  }[lang];

  return React.createElement("header", { className: "tp-nav" + (isScrolled ? " is-scrolled" : "") },
    React.createElement("div", { className: "tp-container tp-nav-inner" },
      React.createElement("a", { href: "/", className: "tp-nav-brand" },
        React.createElement("img", {
          src: "/logos/SeriesPro360/icone-SeriesPro360.png",
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
        PRELAUNCH_MODE
          ? React.createElement("a", { href: waitlistHref(lang, ""), className: "tp-btn tp-btn-primary" }, WAITLIST_LABEL[lang])
          : React.createElement("a", { href: LEMON_CHECKOUT_URL, className: "tp-btn tp-btn-primary" }, t.cta)
      )
    )
  );
}

// ── Hero V2 — verbatim 1/2 vs 1/8
function Hero({ lang }) {
  const t = {
    fr: {
      eyebrow: "TRIMPRO360 — POUR LES ATELIERS DE PLIAGE EN REVÊTEMENT EXTÉRIEUR",
      headline: "« C'est-tu 1/2 ou 1/8 qui est écrit ??? »",
      subtitle: "Si cette question vous est familière, vous savez ce que ça coûte. TrimPro360 remplace les croquis ambigus et les « j'ai jamais reçu ton email » par un flux clair, du client à la plieuse.",
      ctaPrimary: "Démarrer mon essai gratuit 14 jours",
      ctaSecondary: "Voir une démo de 90 secondes"
    },
    en: {
      eyebrow: "TRIMPRO360 — FOR METAL CLADDING BRAKE-PRESS SHOPS",
      headline: "\"Is that 1/2 or 1/8 written there???\"",
      subtitle: "If that question sounds familiar, you know what it costs. TrimPro360 replaces ambiguous sketches and \"I never got your email\" with a clean flow, from client to brake.",
      ctaPrimary: "Start my free 14-day trial",
      ctaSecondary: "Watch a 90-second demo"
    }
  }[lang];

  return React.createElement("section", { id: "top", className: "tp-hero" },
    React.createElement("div", { className: "tp-hero-grid-bg" }),
    React.createElement("div", { className: "tp-container tp-hero-inner" },
      React.createElement("div", { className: "tp-hero-logo-wrap" },
        React.createElement("img", {
          src: "/logos/Logos TrimPro360/trimpro360-transparent.png",
          alt: "TrimPro360",
          className: "tp-hero-logo"
        })
      ),
      React.createElement("div", { className: "tp-eyebrow tp-hero-eyebrow" }, t.eyebrow),
      React.createElement("h1", { className: "tp-hero-headline" }, t.headline),
      React.createElement("p", { className: "tp-hero-subtitle" }, t.subtitle),
      React.createElement("div", { className: "tp-hero-ctas" },
        PRELAUNCH_MODE
          ? React.createElement("a", { href: waitlistHref(lang, ""), className: "tp-btn tp-btn-primary tp-btn-lg" }, WAITLIST_LABEL[lang])
          : React.createElement("a", { href: LEMON_CHECKOUT_URL, className: "tp-btn tp-btn-primary tp-btn-lg" }, t.ctaPrimary),
        React.createElement("a", { href: "#demo", className: "tp-btn tp-btn-ghost tp-btn-lg" }, t.ctaSecondary)
      )
    )
  );
}

// ── Problème — 3 scènes verbatim (NOUVEAU)
function Problem({ lang }) {
  const t = {
    fr: {
      eyebrow: "LE PROBLÈME",
      title: "Vous reconnaissez ces scènes ?",
      scenes: [
        {
          icon: "phone",
          context: "Bureau ↔ Installateur",
          dialog: [
            { who: "Chargé de projet", says: "Je n'ai jamais reçu le email de ta commande..." },
            { who: "Installateur", says: "J'ai envoyé le email à 10h ce matin..." }
          ],
          cost: "Résultat : 2 heures perdues, un client qui attend."
        },
        {
          icon: "wrench",
          context: "Chantier",
          dialog: [
            { who: "Installateur", says: "Les moulures n'ont pas les bonnes dimensions." }
          ],
          cost: "Résultat : un retour à l'atelier, une journée d'installation perdue."
        },
        {
          icon: "package",
          context: "Production",
          dialog: [
            { who: "Opérateur", says: "Je n'ai plus assez de matière pour faire la commande." }
          ],
          cost: "Résultat : un délai client repoussé, une commande de matière en urgence."
        }
      ]
    },
    en: {
      eyebrow: "THE PROBLEM",
      title: "Recognize any of these?",
      scenes: [
        {
          icon: "phone",
          context: "Office ↔ Installer",
          dialog: [
            { who: "Project manager", says: "I never got the email of your order..." },
            { who: "Installer", says: "I sent the email at 10 this morning..." }
          ],
          cost: "Result: 2 hours wasted, a client waiting."
        },
        {
          icon: "wrench",
          context: "Job site",
          dialog: [
            { who: "Installer", says: "These trims aren't the right dimensions." }
          ],
          cost: "Result: a trip back to the shop, a lost installation day."
        },
        {
          icon: "package",
          context: "Production",
          dialog: [
            { who: "Operator", says: "I don't have enough material left to finish the order." }
          ],
          cost: "Result: a delayed client, an emergency restocking order."
        }
      ]
    }
  }[lang];

  return React.createElement("section", { id: "problem", className: "tp-section tp-problem" },
    React.createElement("div", { className: "tp-container" },
      React.createElement("div", { className: "tp-section-head" },
        React.createElement("div", { className: "tp-eyebrow" }, t.eyebrow),
        React.createElement("h2", { className: "tp-section-title" }, t.title)
      ),
      React.createElement("div", { className: "tp-problem-grid" },
        t.scenes.map((s, i) =>
          React.createElement("div", { key: i, className: "tp-problem-card" },
            React.createElement("div", { className: "tp-problem-icon" },
              React.createElement(Icon, { name: s.icon, size: 24 })
            ),
            React.createElement("div", { className: "tp-problem-context" }, s.context),
            React.createElement("div", { className: "tp-problem-dialog" },
              s.dialog.map((d, j) =>
                React.createElement("p", { key: j, className: "tp-problem-line" },
                  d.who && React.createElement("span", { className: "tp-problem-who" }, d.who + " : "),
                  React.createElement("em", null, "« " + d.says + " »")
                )
              )
            ),
            React.createElement("div", { className: "tp-problem-cost" }, s.cost)
          )
        )
      )
    )
  );
}

// ── Solution / Features V2 — format problème → solution
function Features({ lang }) {
  const t = {
    fr: {
      eyebrow: "LA SOLUTION",
      title: "Voici comment TrimPro360 règle chaque problème",
      labelProblem: "Au lieu de",
      labelSolution: "Avec TrimPro360",
      rows: [
        { problem: "Croquis manuscrits ambigus, écriture illisible", lead: "Dessinez comme si vous étiez au chantier.", solution: "Dessin vectoriel propre, chaque dimension est lisible et univoque, en pouces ou en métrique." },
        { problem: "Emails perdus entre bureau, installateur et atelier", lead: "Plus jamais « j'ai jamais reçu ton email ».", solution: "Une commande, un dossier, un statut visible — tout le monde voit la même chose en temps réel." },
        { problem: "Mesures floues qui mènent à des reprises de production", lead: "L'opérateur sait. Le bureau sait. Tout le monde sait.", solution: "Calcul automatique du développé — combien de matière sortir, sans calcul manuel." },
        { problem: "Allers-retours répétés pour savoir où en est une commande, interne ou externe", lead: "Chacun suit sa commande lui-même.", solution: "Portail intégré : chargé de projet, installateur, contremaître ou client externe — chacun voit son statut en direct et approuve avant production." },
        { problem: "Saisie de commande lente et répétitive", lead: "3 minutes par commande, pas 20.", solution: "Wizard 5 étapes : du catalogue à la soumission, sans détour. Validation en temps réel à chaque champ." },
        { problem: "Connexion capricieuse, ou prise de commande directement sur le chantier", lead: "Travaillez partout. Avec ou sans wifi.", solution: "Mode hors-ligne intégré (PWA) — prenez vos commandes sur le chantier, à l'atelier, dans le camion. Synchronisation automatique dès que le réseau revient." }
      ]
    },
    en: {
      eyebrow: "THE SOLUTION",
      title: "Here's how TrimPro360 fixes each problem",
      labelProblem: "Instead of",
      labelSolution: "With TrimPro360",
      rows: [
        { problem: "Handwritten ambiguous sketches, illegible handwriting", lead: "Draw as if you were on the jobsite.", solution: "Clean vector drawings, every dimension is readable and unambiguous, in inches or metric." },
        { problem: "Lost emails between office, installer and shop floor", lead: "Never again \"I never got your email.\"", solution: "One order, one file, one visible status — everyone sees the same thing in real time." },
        { problem: "Fuzzy measurements that lead to production rework", lead: "The operator knows. The office knows. Everyone knows.", solution: "Auto-calculated developed length — how much material to pull, no manual math." },
        { problem: "Repeated back-and-forth to know where an order stands, internal or external", lead: "Everyone tracks their own order.", solution: "Built-in portal: project manager, installer, foreman or external client — each sees status live and approves before production." },
        { problem: "Slow, repetitive order entry", lead: "3 minutes per order, not 20.", solution: "5-step wizard: catalog to submission, no detour. Real-time validation at every field." },
        { problem: "Spotty connection, or taking orders right on the jobsite", lead: "Work anywhere. With or without wifi.", solution: "Built-in offline mode (PWA) — take orders on site, at the shop, in the truck. Auto-sync the moment the network returns." }
      ]
    }
  }[lang];

  return React.createElement("section", { id: "features", className: "tp-section tp-section-alt" },
    React.createElement("div", { className: "tp-container" },
      React.createElement("div", { className: "tp-section-head" },
        React.createElement("div", { className: "tp-eyebrow" }, t.eyebrow),
        React.createElement("h2", { className: "tp-section-title" }, t.title)
      ),
      React.createElement("div", { className: "tp-solution-list" },
        t.rows.map((r, i) =>
          React.createElement("div", { key: i, className: "tp-solution-card" },
            React.createElement("div", { className: "tp-solution-num" }, String(i + 1).padStart(2, "0")),
            React.createElement("div", { className: "tp-solution-split" },
              React.createElement("div", { className: "tp-solution-side tp-solution-side--problem" },
                React.createElement("div", { className: "tp-solution-mark tp-solution-mark--bad" },
                  React.createElement(Icon, { name: "x", size: 14 })
                ),
                React.createElement("div", { className: "tp-solution-content" },
                  React.createElement("span", { className: "tp-solution-label" }, t.labelProblem),
                  React.createElement("p", null, r.problem)
                )
              ),
              React.createElement("div", { className: "tp-solution-side tp-solution-side--fix" },
                React.createElement("div", { className: "tp-solution-mark tp-solution-mark--good" },
                  React.createElement(Icon, { name: "check", size: 14 })
                ),
                React.createElement("div", { className: "tp-solution-content" },
                  React.createElement("span", { className: "tp-solution-label tp-solution-label--green" }, t.labelSolution),
                  React.createElement("p", null,
                    r.lead && React.createElement("strong", { className: "tp-solution-lead" }, r.lead + " "),
                    r.solution
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

// ── Workflow (inchangé)
function Workflow({ lang }) {
  const t = {
    fr: {
      eyebrow: "PRISE EN MAIN",
      title: "Comment ça marche",
      steps: [
        { num: "01", title: "Sélectionnez un profil", desc: "Choisissez dans le catalogue 50 profils ou dessinez dans le Canvas vectoriel." },
        { num: "02", title: "Saisissez les dimensions", desc: "Matériau, calibre, couleur, quantité. Tout est validé en temps réel." },
        { num: "03", title: "Soumettez la commande", desc: "Le chargé de projet est notifié automatiquement. Suivi temps réel jusqu'à la livraison." }
      ]
    },
    en: {
      eyebrow: "GETTING STARTED",
      title: "How it works",
      steps: [
        { num: "01", title: "Select a profile", desc: "Choose from the 50-profile catalog or draw in the vector Canvas." },
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

// ── Demo Videos (inchangé)
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

// ── Origin Story (NOUVEAU)
function OriginStory({ lang }) {
  const t = {
    fr: {
      eyebrow: "POURQUOI CE PROJET",
      title: "Je l'ai créé parce que je l'ai vécu",
      paragraphs: [
        "Après bientôt 10 ans dans le revêtement extérieur — dessinateur, chargé de projet, programmeur/opérateur CNC et presse plieuse.",
        "J'ai vu mes employeurs perdre beaucoup de temps, de matériel et d'argent à cause de croquis mal interprétés. J'ai été le gars qui rappelait le client « en fait il manque une dimension ». J'ai aussi été le gars qui a fait des erreurs de dimension, de couleur, de calibre dans ses propres commandes.",
        "Les solutions ERP existantes pour notre industrie demandent des frais d'implantation importants et plusieurs centaines de dollars par mois, et sont conçues par des gens qui n'ont jamais touché à une plieuse. J'ai décidé de bâtir l'outil que j'aurais voulu avoir."
      ],
      signature: "Yan Levasseur, fondateur de TrimPro360"
    },
    en: {
      eyebrow: "WHY THIS EXISTS",
      title: "I built this because I lived it",
      paragraphs: [
        "Nearly 10 years in metal cladding — drafter, project manager, CNC and brake-press programmer/operator.",
        "I watched my employers lose time, material and money to misread sketches. I was the guy calling clients back to say \"actually, a dimension is missing.\" I was also the guy who made dimension, color and gauge mistakes on his own orders.",
        "Existing ERP solutions for our industry require significant setup costs and several hundred dollars per month, and are built by people who've never touched a brake. I decided to build the tool I wished I'd had."
      ],
      signature: "Yan Levasseur, founder of TrimPro360"
    }
  }[lang];

  return React.createElement("section", { id: "origin", className: "tp-section tp-origin" },
    React.createElement("div", { className: "tp-container tp-origin-inner" },
      React.createElement("div", { className: "tp-eyebrow" }, t.eyebrow),
      React.createElement("h2", { className: "tp-section-title" }, t.title),
      React.createElement("div", { className: "tp-origin-quote" },
        t.paragraphs.map((p, i) =>
          React.createElement("p", { key: i }, p)
        )
      ),
      React.createElement("div", { className: "tp-origin-signature" },
        "— ", React.createElement("strong", null, t.signature.split(",")[0]), ",", t.signature.split(",")[1]
      )
    )
  );
}

// ── Pricing V3 — 4 plans (Fondateur/Standard/Pro/Enterprise) + toggle mensuel/annuel
function Pricing({ lang }) {
  const [billing, setBilling] = uS("monthly"); // "monthly" | "annual"
  const isAnnual = billing === "annual";

  const t = {
    fr: {
      eyebrow: "TARIFS",
      title: "Simple. Transparent. Sans surprise.",
      subtitle: "Quatre options claires. Choisissez celle qui correspond à votre atelier ou votre entreprise.",
      billingMonthly: "Mensuel",
      billingAnnual: "Annuel",
      annualSavings: "Économisez 17 %",
      foundersBadge: "🟢 10 places sur 10 disponibles",
      recommendedBadge: "RECOMMANDÉ",
      pricePer: { monthly: "/ mois", annual: "/ an" },
      lifetimeNote: "à vie",
      annualSubtitle: "Soit l'équivalent de 10 mois sur 12",
      ctaReassurance: "Aucun débit avant 14 jours · Annulez en 1 clic",
      plans: [
        {
          key: "founder",
          name: "Fondateur",
          tagline: "Pour les 10 premiers",
          priceMonthly: 149,
          priceAnnual: 1490,
          lifetime: true,
          desc: "Programme limité. Vos retours influencent directement la roadmap.",
          features: [
            "Accès complet à toute l'application",
            "Mises à jour à vie, y compris futures features Enterprise",
            "Jusqu'à 10 utilisateurs",
            "Accès direct à Yan (ligne dédiée)",
            "Aucune augmentation, jamais",
            "Aucun frais d'implantation"
          ],
          cta: "Démarrer mon essai 14 j",
          ctaHref: LEMON_CHECKOUT_URL,
          highlight: true,
          badge: "foundersBadge"
        },
        {
          key: "standard",
          name: "Standard",
          tagline: "Pour les petites équipes",
          priceMonthly: 299,
          priceAnnual: 2990,
          desc: "Tout le core de TrimPro360 pour gérer vos commandes de bout en bout.",
          features: [
            "Canvas, catalogue 50 profils, wizard, workflow complet",
            "Mode hors-ligne (PWA) + mobile OUVRIER",
            "Inventaire avec lots FIFO/FEFO",
            "Production : Kanban, calendrier, milestones",
            "Jusqu'à 10 utilisateurs",
            "Support par courriel (48 h)"
          ],
          cta: "Démarrer mon essai 14 j",
          ctaHref: LEMON_CHECKOUT_URL,
          highlight: false
        },
        {
          key: "pro",
          name: "Pro",
          tagline: "Pour les entreprises de revêtement intégrées",
          priceMonthly: 499,
          priceAnnual: 4990,
          desc: "Tout le Standard + les modules avancés pour entreprises multi-rôles.",
          features: [
            "Tout du plan Standard",
            "Module Devis/Quotes complet",
            "Workshop Quality (QA, checklists, traçabilité)",
            "Rôle CONTREMAITRE externe (partage sous-traitants)",
            "Cycle count & audit inventaire avancé",
            "Jusqu'à 25 utilisateurs",
            "Support prioritaire par courriel (24 h)"
          ],
          cta: "Démarrer mon essai 14 j",
          ctaHref: LEMON_CHECKOUT_URL,
          highlight: false,
          badge: "recommendedBadge"
        },
        {
          key: "enterprise",
          name: "Enterprise",
          tagline: "Pour les multi-sites et intégrations",
          priceMonthly: null,
          priceAnnual: null,
          customPrice: "Sur soumission",
          desc: "Solution sur mesure pour grandes entreprises avec besoins spécifiques.",
          features: [
            "Tout du plan Pro",
            "Multi-sites / multi-ateliers (roadmap Q4)",
            "API publique + intégrations BuilderTrend, JobNimbus, ERP (roadmap)",
            "SSO (SAML/OIDC) (roadmap)",
            "Utilisateurs illimités",
            "SLA garanti + onboarding personnalisé",
            "Support téléphonique direct"
          ],
          cta: "Nous contacter",
          ctaHref: "mailto:yan@seriespro360.com?subject=Demande%20Enterprise%20TrimPro360",
          highlight: false
        }
      ],
      faqTitle: "Questions fréquentes",
      faq: [
        { q: "Qu'est-ce que le plan Fondateur ?", a: "Un tarif préférentiel de 149 $/mois à vie, réservé aux 10 premières entreprises. Vous avez accès à l'application complète (équivalent du plan Enterprise) — le but est que vous testiez vraiment tout pour nous donner du feedback qui fait évoluer le produit. Ce tarif ne changera jamais, même quand le Standard augmente." },
        { q: "Pourquoi un plan Pro et un Standard ?", a: "Le Standard couvre tous les besoins essentiels d'un atelier (Canvas, wizard, workflow, inventaire de base, production). Le Pro ajoute les modules avancés qui font la différence pour une entreprise de revêtement intégrée : devis, gestion qualité, contremaîtres externes, plus d'utilisateurs. Si vous hésitez, le Pro est conçu spécifiquement pour les entrepreneurs intégrés (15-50 employés)." },
        { q: "Économies sur l'annuel ?", a: "Oui : 17 % d'économie sur tous les plans en payant à l'année, soit l'équivalent de 10 mois sur 12. Vous pouvez basculer entre mensuel et annuel à tout moment." },
        { q: "Y a-t-il des frais d'implantation ?", a: "Non. Aucun frais d'implantation, ni de mise en route. Vous démarrez immédiatement sur les plans Fondateur, Standard et Pro. Pour Enterprise (multi-sites, intégrations ERP custom), un onboarding personnalisé est inclus dans le devis." },
        { q: "Et si je dépasse la limite d'utilisateurs ?", a: "Vous serez prévenu avant d'atteindre la limite. Vous pouvez passer au plan supérieur en 1 clic, sans interruption de service. Pas de surprise sur la facture." },
        { q: "Et si je veux partir ?", a: "Annulation en 1 clic, aucun contrat, aucune pénalité. Vos données sont exportables en CSV/PDF à tout moment — vous repartez avec." },
        { q: "Que se passe-t-il si vous fermez TrimPro360 ?", a: "La stack technique est open-source (Supabase, Next.js). Vos données sont exportables. Un autre développeur peut reprendre vos données si jamais l'aventure s'arrête. C'est volontaire de notre part." }
      ]
    },
    en: {
      eyebrow: "PRICING",
      title: "Simple. Transparent. No surprises.",
      subtitle: "Four clear options. Choose what fits your shop or company.",
      billingMonthly: "Monthly",
      billingAnnual: "Annual",
      annualSavings: "Save 17%",
      foundersBadge: "🟢 10 of 10 spots available",
      recommendedBadge: "RECOMMENDED",
      pricePer: { monthly: "/ month", annual: "/ year" },
      lifetimeNote: "for life",
      annualSubtitle: "Equivalent to 10 months out of 12",
      ctaReassurance: "No charge for 14 days · Cancel in 1 click",
      plans: [
        {
          key: "founder",
          name: "Founder",
          tagline: "For the first 10 shops",
          priceMonthly: 149,
          priceAnnual: 1490,
          lifetime: true,
          desc: "Limited program. Your feedback directly shapes the roadmap.",
          features: [
            "Full access to the entire application",
            "Updates for life, including future Enterprise features",
            "Up to 10 users",
            "Direct line to Yan",
            "Price never increases, ever",
            "No setup fees"
          ],
          cta: "Start my 14-day trial",
          ctaHref: LEMON_CHECKOUT_URL,
          highlight: true,
          badge: "foundersBadge"
        },
        {
          key: "standard",
          name: "Standard",
          tagline: "For small teams",
          priceMonthly: 299,
          priceAnnual: 2990,
          desc: "All of TrimPro360's core to manage your orders end-to-end.",
          features: [
            "Canvas, 50-profile catalog, wizard, full workflow",
            "Offline mode (PWA) + mobile worker app",
            "Inventory with FIFO/FEFO lots",
            "Production: Kanban, calendar, milestones",
            "Up to 10 users",
            "Email support (48 h)"
          ],
          cta: "Start my 14-day trial",
          ctaHref: LEMON_CHECKOUT_URL,
          highlight: false
        },
        {
          key: "pro",
          name: "Pro",
          tagline: "For integrated cladding companies",
          priceMonthly: 499,
          priceAnnual: 4990,
          desc: "Everything in Standard, plus advanced modules for multi-role companies.",
          features: [
            "Everything in Standard",
            "Full Quotes module",
            "Workshop Quality (QA, checklists, traceability)",
            "External FOREMAN role (subcontractor sharing)",
            "Cycle count & advanced inventory audit",
            "Up to 25 users",
            "Priority email support (24 h)"
          ],
          cta: "Start my 14-day trial",
          ctaHref: LEMON_CHECKOUT_URL,
          highlight: false,
          badge: "recommendedBadge"
        },
        {
          key: "enterprise",
          name: "Enterprise",
          tagline: "For multi-site and integrations",
          priceMonthly: null,
          priceAnnual: null,
          customPrice: "Custom quote",
          desc: "Tailored solution for larger companies with specific needs.",
          features: [
            "Everything in Pro",
            "Multi-site / multi-shop (roadmap Q4)",
            "Public API + BuilderTrend, JobNimbus, ERP integrations (roadmap)",
            "SSO (SAML/OIDC) (roadmap)",
            "Unlimited users",
            "Guaranteed SLA + custom onboarding",
            "Direct phone support"
          ],
          cta: "Contact us",
          ctaHref: "mailto:yan@seriespro360.com?subject=TrimPro360%20Enterprise%20Inquiry",
          highlight: false
        }
      ],
      faqTitle: "Frequently asked questions",
      faq: [
        { q: "What is the Founder plan?", a: "A preferred rate of $149/month for life, reserved for the first 10 companies. You get access to the full application (equivalent to the Enterprise plan) — the point is for you to really test everything so we get the feedback that shapes the product. This rate will never change, even when Standard goes up." },
        { q: "Why both a Pro and Standard plan?", a: "Standard covers all essential needs of a shop (Canvas, wizard, workflow, base inventory, production). Pro adds the advanced modules that make a difference for an integrated cladding company: quotes, quality management, external foremen, more users. If you're an integrated contractor (15-50 employees), Pro is designed for you." },
        { q: "Annual savings?", a: "Yes: 17% off all plans when paying yearly, equivalent to 10 months out of 12. You can switch between monthly and annual anytime." },
        { q: "Are there setup fees?", a: "No. No setup or onboarding fees. You start immediately on Founder, Standard and Pro. For Enterprise (multi-site, custom ERP integrations), personalized onboarding is included in the quote." },
        { q: "What if I exceed the user limit?", a: "You'll be notified before reaching the limit. You can upgrade to the next plan in one click, no service interruption, no surprise on the bill." },
        { q: "What if I want to leave?", a: "One-click cancellation, no contract, no penalty. Your data is exportable as CSV/PDF anytime — you leave with everything." },
        { q: "What if you shut down TrimPro360?", a: "The tech stack is open-source (Supabase, Next.js). Your data is exportable. Another developer can pick up your data if the venture ever ends. This is intentional on our part." }
      ]
    }
  }[lang];

  function formatPrice(plan) {
    if (plan.customPrice) return { amount: plan.customPrice, cadence: "" };
    const amount = isAnnual ? plan.priceAnnual : plan.priceMonthly;
    const symbol = lang === "fr" ? " $" : "$";
    const formatted = lang === "fr"
      ? amount.toLocaleString("fr-CA") + symbol
      : "$" + amount.toLocaleString("en-CA");
    const cadence = plan.lifetime && !isAnnual
      ? (lang === "fr" ? "/ mois à vie" : "/ month for life")
      : t.pricePer[billing];
    return { amount: formatted, cadence };
  }

  return React.createElement("section", { id: "pricing", className: "tp-section tp-section-alt" },
    React.createElement("div", { className: "tp-container" },
      React.createElement("div", { className: "tp-section-head" },
        React.createElement("div", { className: "tp-eyebrow" }, t.eyebrow),
        React.createElement("h2", { className: "tp-section-title" }, t.title),
        React.createElement("p", { className: "tp-section-sub" }, t.subtitle)
      ),
      React.createElement("div", { className: "tp-billing-toggle" },
        React.createElement("button", {
          className: "tp-billing-option" + (!isAnnual ? " is-active" : ""),
          onClick: () => setBilling("monthly")
        }, t.billingMonthly),
        React.createElement("button", {
          className: "tp-billing-option" + (isAnnual ? " is-active" : ""),
          onClick: () => setBilling("annual")
        },
          t.billingAnnual,
          React.createElement("span", { className: "tp-billing-savings" }, t.annualSavings)
        )
      ),
      React.createElement("div", { className: "tp-pricing-grid tp-pricing-grid--four" },
        t.plans.map((plan, i) => {
          const price = formatPrice(plan);
          return React.createElement("div", { key: plan.key, className: "tp-pricing-card" + (plan.highlight ? " tp-pricing-card--highlight" : "") },
            plan.badge && React.createElement("div", {
              className: "tp-pricing-badge" + (plan.badge === "recommendedBadge" ? " tp-pricing-badge--reco" : "")
            }, t[plan.badge]),
            React.createElement("h3", { className: "tp-pricing-name" }, plan.name),
            React.createElement("div", { className: "tp-pricing-tagline" }, plan.tagline),
            React.createElement("div", { className: "tp-pricing-price" },
              React.createElement("span", { className: "tp-pricing-amount" }, price.amount),
              price.cadence && React.createElement("span", { className: "tp-pricing-cadence" }, price.cadence)
            ),
            isAnnual && !plan.customPrice && React.createElement("div", { className: "tp-pricing-annual-note" }, t.annualSubtitle),
            React.createElement("p", { className: "tp-pricing-desc" }, plan.desc),
            React.createElement("ul", { className: "tp-pricing-features" },
              plan.features.map((f, j) =>
                React.createElement("li", { key: j }, React.createElement("span", { className: "tp-pricing-check" }, "✓ "), f)
              )
            ),
            React.createElement("a", {
              href: PRELAUNCH_MODE ? waitlistHref(lang, plan.name) : plan.ctaHref,
              className: "tp-btn tp-pricing-cta" + (plan.highlight ? " tp-btn-primary" : " tp-btn-ghost")
            }, PRELAUNCH_MODE ? WAITLIST_LABEL[lang] : plan.cta),
            !PRELAUNCH_MODE && plan.key !== "enterprise" && React.createElement("div", {
              className: "tp-pricing-reassurance",
              style: { fontSize: "0.78rem", color: "#6b7280", marginTop: "0.5rem", textAlign: "center" }
            }, t.ctaReassurance)
          );
        })
      ),
      React.createElement("div", { id: "faq", className: "tp-faq" },
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

// ── Risk Reversal (NOUVEAU)
function RiskReversal({ lang }) {
  const t = {
    fr: {
      eyebrow: "ESSAYEZ SANS PEUR",
      title: "Pourquoi vous pouvez essayer sans peur",
      items: [
        { icon: "check", text: "14 jours gratuits — aucun débit avant. Carte requise au checkout pour confirmer votre essai, annulez en 1 clic avant la fin." },
        { icon: "file", text: "Vos données exportables en CSV/PDF en tout temps — vous repartez avec." },
        { icon: "rotate-ccw", text: "Annulation en 1 clic, pas de contrat, pas de pénalité." }
      ]
    },
    en: {
      eyebrow: "TRY WITHOUT FEAR",
      title: "Why you can try without fear",
      items: [
        { icon: "check", text: "14 days free — no charge until then. Card required at checkout to start your trial, cancel in 1 click before it ends." },
        { icon: "file", text: "Your data is exportable as CSV/PDF anytime — you leave with it." },
        { icon: "rotate-ccw", text: "One-click cancel, no contract, no penalty." }
      ]
    }
  }[lang];

  return React.createElement("section", { className: "tp-section tp-risk" },
    React.createElement("div", { className: "tp-container" },
      React.createElement("div", { className: "tp-section-head" },
        React.createElement("div", { className: "tp-eyebrow" }, t.eyebrow),
        React.createElement("h2", { className: "tp-section-title" }, t.title)
      ),
      React.createElement("div", { className: "tp-risk-grid" },
        t.items.map((it, i) =>
          React.createElement("div", { key: i, className: "tp-risk-item" },
            React.createElement("div", { className: "tp-risk-icon" },
              React.createElement(Icon, { name: it.icon, size: 20 })
            ),
            React.createElement("p", { className: "tp-risk-text" }, it.text)
          )
        )
      )
    )
  );
}

// ── CTA Section V2
function CTASection({ lang }) {
  const t = {
    fr: {
      title: "Prêt à ne plus jamais entendre « C'est-tu 1/2 ou 1/8 ? »",
      subtitle: "14 jours gratuits, aucun débit avant la fin de l'essai. Annulez en 1 clic à tout moment. Si on n'est pas la bonne solution pour votre atelier, on vous le dira en premier.",
      ctaPrimary: "Démarrer mon essai gratuit",
      ctaSecondary: "Demander une démo avec Yan"
    },
    en: {
      title: "Ready to never hear \"Is that 1/2 or 1/8?\" again?",
      subtitle: "14 days free, no charge until the trial ends. Cancel in 1 click anytime. If we're not the right fit for your shop, we'll tell you first.",
      ctaPrimary: "Start my free trial",
      ctaSecondary: "Request a demo with Yan"
    }
  }[lang];

  return React.createElement("section", { className: "tp-section tp-cta-section" },
    React.createElement("div", { className: "tp-container tp-cta-inner" },
      React.createElement("h2", { className: "tp-cta-title" }, t.title),
      React.createElement("p", { className: "tp-cta-subtitle" }, t.subtitle),
      React.createElement("div", { className: "tp-cta-ctas" },
        PRELAUNCH_MODE
          ? React.createElement("a", { href: waitlistHref(lang, ""), className: "tp-btn tp-btn-primary tp-btn-lg" }, WAITLIST_LABEL[lang])
          : React.createElement("a", { href: LEMON_CHECKOUT_URL, className: "tp-btn tp-btn-primary tp-btn-lg" }, t.ctaPrimary),
        React.createElement("a", { href: "mailto:yan@seriespro360.com?subject=Demande%20de%20d%C3%A9mo%20TrimPro360", className: "tp-btn tp-btn-ghost tp-btn-lg" }, t.ctaSecondary)
      )
    )
  );
}

// ── Footer (inchangé)
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

// ── App Root V2
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

  return React.createElement("div", { className: "tp-app" + (PRELAUNCH_MODE ? " tp-app--prelaunch" : "") },
    PRELAUNCH_MODE && React.createElement(PrelaunchBanner, { lang }),
    React.createElement(Nav, { lang, setLang, isScrolled: scrolled }),
    React.createElement("main", null,
      React.createElement(Hero, { lang }),
      React.createElement(Problem, { lang }),
      React.createElement(Features, { lang }),
      React.createElement(Workflow, { lang }),
      React.createElement(DemoVideos, { lang }),
      React.createElement(OriginStory, { lang }),
      React.createElement(Pricing, { lang }),
      React.createElement(RiskReversal, { lang }),
      React.createElement(CTASection, { lang })
    ),
    React.createElement(Footer, { lang })
  );
}

// Mount
createRoot(document.getElementById("root")).render(React.createElement(App));
