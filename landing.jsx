// landing.jsx — Main SeriesPro360 marketing page
// Composes: Nav · Hero · Trust · Suite · Live Demo · Features · Workflow · Pricing · FAQ · CTA · Footer

const { useState: uS, useEffect: uE, useRef: uR, useCallback: uC } = React;
const { createPortal } = ReactDOM;

// ──────────────────────────────────────────────────────────────────────────────
// SCROLL REVEAL — IntersectionObserver-based entrance animations
// ──────────────────────────────────────────────────────────────────────────────
function useReveal(opts) {
  const ref = uR(null);
  uE(() => {
    const el = ref.current;
    if (!el) return;
    el.classList.add("is-visible");
  }, []);
  return ref;
}

// ──────────────────────────────────────────────────────────────────────────────
// TWEAK DEFAULTS
// ──────────────────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "fr",
  "accent": "#E8420A",
  "logoVariant": "real",
  "density": "regular",
  "heroLogoSize": 500,
  "heroTopPad": 0
}/*EDITMODE-END*/;

// ──────────────────────────────────────────────────────────────────────────────
// SECTION — NAV
// ──────────────────────────────────────────────────────────────────────────────
function Nav({ lang, setLang, logoVariant, openMobile, setOpenMobile, openLogin, user }) {
  const t = window.T[lang].nav;
  const [scrolled, setScrolled] = uS(false);
  uE(() => {
    const on = () => setScrolled(window.scrollY > 8);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={"sp-nav" + (scrolled ? " is-scrolled" : "")}>
      <div className="sp-container sp-nav-inner">
        <a href="#top" className="sp-nav-brand" style={{ width: 0, overflow: "hidden" }} aria-hidden="true" />
        <nav className="sp-nav-links">
          <a href="#suite">{t.products}</a>
          <a href="#demo">{t.demo}</a>
          <a href="#pricing">{t.pricing}</a>
          <a href="#faq">{t.faq}</a>
        </nav>
        <div className="sp-nav-actions">
          <div className="sp-lang-toggle" role="tablist" aria-label="Language">
            <button onClick={() => setLang("fr")} className={lang === "fr" ? "is-on" : ""}>FR</button>
            <button onClick={() => setLang("en")} className={lang === "en" ? "is-on" : ""}>EN</button>
          </div>
          {user ? (
            <button className="sp-btn sp-btn-ghost-sm sp-nav-login sp-nav-user" onClick={openLogin}>
              <span className="sp-nav-avatar">{(user.email || "?")[0].toUpperCase()}</span>
              <span className="sp-nav-user-email">{user.email}</span>
            </button>
          ) : (
            <button className="sp-btn sp-btn-ghost-sm sp-nav-login" onClick={openLogin}>{t.login}</button>
          )}
          <a href="#suite" className="sp-btn sp-btn-primary sp-btn-sm">{t.cta} <Icon name="arrow-right" size={14} /></a>
          <button className="sp-nav-burger" onClick={() => setOpenMobile(!openMobile)} aria-label="Menu">
            <Icon name={openMobile ? "x" : "menu"} size={18} />
          </button>
        </div>
      </div>
      {openMobile && (
        <div className="sp-nav-mobile">
          <a href="#suite" onClick={() => setOpenMobile(false)}>{t.products}</a>
          <a href="#demo" onClick={() => setOpenMobile(false)}>{t.demo}</a>
          <a href="#pricing" onClick={() => setOpenMobile(false)}>{t.pricing}</a>
          <a href="#faq" onClick={() => setOpenMobile(false)}>{t.faq}</a>
          <a href="#" className="sp-btn sp-btn-primary" onClick={() => setOpenMobile(false)}>{t.cta}</a>
        </div>
      )}
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// ──────────────────────────────────────────────────────────────────────────────
// INTERACTIVE LOGO — zones cliquables sur les feuilles orange
// ──────────────────────────────────────────────────────────────────────────────
function InteractiveLogo({ lang, height }) {
  const [tooltip, setTooltip] = React.useState(null);
  const leaves = [
    {
      id: "trimpro",
      url: "/trimpro360",
      left: "34%", top: "22%", width: "5%", height: "8%",
      label: "TrimPro360",
      desc: lang === "fr" ? "Commande & production de profilés métalliques" : "Metal cladding order & production",
    },
    {
      id: "calcupro",
      url: "/calcupro360",
      left: "38%", top: "35%", width: "5%", height: "8%",
      label: "CalcuPro360",
      desc: lang === "fr" ? "Calcul, estimation et devis PDF" : "Calculation, estimation & PDF quote",
    },
  ];
  return (
    <div style={{ position: "relative", display: "inline-block", lineHeight: 0 }}>
      <img
        src="/logos/logo_seriespro360_ FR..png"
        alt="SeriesPro360"
        style={{ height: height || 500, width: "auto", maxWidth: "90vw", objectFit: "contain", display: "block" }}
      />
      <p style={{ position: "absolute", bottom: "23%", left: 0, right: "55%", fontSize: 12, color: "#94A3B8", margin: 0, textAlign: "center", letterSpacing: "0.02em", zIndex: 2, pointerEvents: "none" }}>
        {lang === "fr" ? "🍂 Cliquez sur une feuille orange pour explorer une app" : "🍂 Click an orange leaf to explore an app"}
      </p>
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          onClick={() => { window.location.href = leaf.url; }}
          onMouseEnter={() => setTooltip(leaf.id)}
          onMouseLeave={() => setTooltip(null)}
          style={{
            position: "absolute",
            left: leaf.left, top: leaf.top,
            width: leaf.width, height: leaf.height,
            cursor: "pointer",
            borderRadius: "50%",
          }}
        >
          {tooltip === leaf.id && (
            <div style={{
              position: "absolute",
              top: "calc(100% + 8px)",
              left: "50%",
              transform: "translateX(-50%)",
              background: "#0F1C35",
              color: "#FFFFFF",
              borderRadius: 10,
              padding: "10px 14px",
              minWidth: 180,
              maxWidth: 220,
              boxShadow: "0 4px 20px rgba(0,0,0,0.18)",
              zIndex: 100,
              pointerEvents: "none",
              whiteSpace: "normal",
            }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: "#E8420A" }}>{leaf.label}</div>
              <div style={{ fontSize: 12, lineHeight: 1.5, color: "#CBD5E1" }}>{leaf.desc}</div>
              <div style={{ fontSize: 11, marginTop: 6, color: "#94A3B8", fontWeight: 600 }}>
                {lang === "fr" ? "Cliquer pour voir →" : "Click to view →"}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// SECTION — HERO
// Left: copy. Right: technical mockup card with grid, dimensions, live mini-estimate.
// ──────────────────────────────────────────────────────────────────────────────
function Hero({ lang, heroLogoSize, heroTopPad }) {
  const t = window.T[lang].hero;
  return (
    <section id="top" className="sp-hero sp-hero-centered">
      <div className="sp-hero-grid-bg" aria-hidden="true" />
      <div className="sp-container sp-hero-center-inner">
        <div style={{ marginBottom: 0, display: "flex", flexDirection: "column", alignItems: "center", marginTop: -75 + (heroTopPad || 0) }}>
          <InteractiveLogo lang={lang} height={heroLogoSize || 500} />
        </div>
        <h1 className="sp-hero-headline" style={{ textAlign: "center", maxWidth: "22ch" }}>{t.headline}</h1>
        <p className="sp-hero-sub-centered">{t.subtitle}</p>
        <div className="sp-hero-ctas-centered">
          <a href="#suite" className="sp-btn sp-btn-primary sp-btn-lg">{t.cta_primary} <Icon name="arrow-right" size={16} /></a>
          <a href="#demo" className="sp-btn sp-btn-ghost-sm sp-btn-lg">{lang === "fr" ? "Voir la démo" : "Watch demo"}</a>
        </div>
        <ul className="sp-hero-meta sp-hero-meta-centered">
          <li><Icon name="check" size={14} />{t.meta_1}</li>
          <li><Icon name="check" size={14} />{t.meta_2}</li>
          <li><Icon name="check" size={14} />{t.meta_3}</li>
        </ul>
      </div>
    </section>
  );
}


// ──────────────────────────────────────────────────────────────────────────────
// SECTION — TRUST STRIP
// ──────────────────────────────────────────────────────────────────────────────
function TrustStrip({ lang }) {
  const t = window.T[lang].trust;
  const r = useReveal();
  return (
    <section className="sp-trust">
      <div className="sp-container sp-reveal" ref={r}>
        <div className="sp-trust-stats">
          {t.stats.map((s) => (
            <div key={s.value} className="sp-trust-stat">
              <div className="sp-trust-stat-value">{s.value}</div>
              <div className="sp-trust-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="sp-trust-heading">{t.heading}</div>
        <div className="sp-trust-row sp-reveal-stagger">
          {t.logos.map((item) => (
            <div className="sp-trust-logo" key={item.label || item} style={{ display: "flex", alignItems: "center", gap: 7 }}>
              {item.icon && <Icon name={item.icon} size={14} />}
              {item.label || item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION — ORIGIN (histoire Yan + positionnement)
// ──────────────────────────────────────────────────────────────────────────────
function Origin({ lang }) {
  const t = window.T[lang].origin;
  return (
    <section style={{ background: "#FFFFFF", padding: "80px 0", borderTop: "1px solid rgba(27,42,74,0.08)" }}>
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E8420A", marginBottom: 12 }}>
          {t.eyebrow}
        </div>
        <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, color: "#0F1C35", lineHeight: 1.1, margin: "0 0 24px", letterSpacing: "-0.02em" }}>
          {t.headline}
        </h2>
        <p style={{ fontSize: 17, color: "#3D4F6E", lineHeight: 1.75, margin: "0 0 48px" }}>
          {t.story}
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16, marginBottom: 40, textAlign: "left" }}>
          {t.positioning.map((p) => (
            <div key={p.label} style={{ background: "#F8F7F4", borderRadius: 12, padding: "20px 20px", display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(232,66,10,0.10)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={p.icon} size={18} />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: "#0F1C35", marginBottom: 4 }}>{p.label}</div>
                <div style={{ fontSize: 13, color: "#3D4F6E", lineHeight: 1.5 }}>{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <a href="/trimpro360" className="sp-btn sp-btn-primary">
          {t.cta} <Icon name="arrow-right" size={14} />
        </a>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION — SUITE
// ──────────────────────────────────────────────────────────────────────────────
function AppGrid({ lang }) {
  const t = window.T[lang].suite;
  const slugMap = { "TrimPro360": "trimpro360", "CalcuPro360": "calcupro360", "MesurePro360": "mesurepro360", "DevisPro360": "devispro360" };
  const logoMap = { "TrimPro360": "/logos/logo-trimpro360.png", "CalcuPro360": "/logos/logo-calcupro360.png" };
  const accentByColor = { yellow: "#E8420A", blue: "#3B82F6", green: "#10B981", orange: "#E8420A" };
  return (
    <section id="suite" style={{ background: "#F8F7F4", padding: "80px 0" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E8420A", marginBottom: 12 }}>
            {t.eyebrow}
          </div>
          <h2 style={{ fontSize: "clamp(28px, 3.8vw, 42px)", fontWeight: 700, color: "#0F1C35", lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
            {t.title}
          </h2>
          <p style={{ fontSize: 16, color: "#3D4F6E", lineHeight: 1.65, maxWidth: 600, margin: 0 }}>
            {t.subtitle}
          </p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {t.products.map((p) => {
            const accent = accentByColor[p.color] || "#E8420A";
            const url = "/" + (slugMap[p.name] || p.name.toLowerCase().replace(/[^a-z0-9]/g, ""));
            const isLive = p.tag === "En ligne" || p.tag === "Actif" || p.tag === "Live";
            return (
              <a key={p.name} href={url} style={{ textDecoration: "none", display: "flex", flexDirection: "column", background: "#FFFFFF", borderRadius: 16, padding: "28px 24px 24px", border: "1px solid rgba(27,42,74,0.10)", boxShadow: "0 2px 12px rgba(27,42,74,0.06)", transition: "transform 0.2s, box-shadow 0.2s", minHeight: 220 }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(27,42,74,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(27,42,74,0.06)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 56, height: 56, borderRadius: 12, background: "#FFFFFF", border: "1px solid rgba(27,42,74,0.08)", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: 4 }}>
                    {logoMap[p.name]
                      ? <img src={logoMap[p.name]} alt={p.name} style={{ width: 46, height: 46, objectFit: "contain" }} />
                      : <span style={{ fontSize: 22 }}>{p.icon || "🔧"}</span>}
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 999, background: isLive ? "rgba(16,185,129,0.12)" : "rgba(59,130,246,0.12)", color: isLive ? "#047857" : "#1B2A4A", border: isLive ? "1px solid rgba(16,185,129,0.25)" : "1px solid rgba(59,130,246,0.2)" }}>
                    {p.tag}
                  </span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#0F1C35", margin: "0 0 6px", letterSpacing: "-0.01em" }}>{p.name}</h3>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#6B7A96", marginBottom: 12 }}>{p.tagline}</div>
                <p style={{ fontSize: 13, color: "#3D4F6E", lineHeight: 1.6, margin: "0 0 20px", flex: 1 }}>{p.desc}</p>
                <div style={{ fontSize: 13, fontWeight: 600, color: accent, display: "flex", alignItems: "center", gap: 6 }}>
                  {lang === "fr" ? "En savoir plus" : "Learn more"} →
                </div>
                <div style={{ height: 3, borderRadius: 999, background: accent, marginTop: 16, opacity: 0.7 }} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Suite({ lang }) {
  const t = window.T[lang].suite;
  const r1 = useReveal();
  const r2 = useReveal({ threshold: 0.05 });
  const slugMap = { "TrimPro360": "trimpro360", "CalcuPro360": "calcupro360", "MesurePro360": "mesurepro360", "DevisPro360": "devispro360" };
  return (
    <section id="suite" className="sp-suite">
      <div className="sp-container">
        <div className="sp-reveal" ref={r1}><SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} /></div>
        <div className="sp-suite-grid sp-reveal sp-reveal-stagger" ref={r2}>
          {t.products.map((p) => {
            const isLive = p.tag === "Actif" || p.tag === "En ligne" || p.tag === "Live";
            const tagClass = isLive ? "live" : (p.placeholder ? "soon" : "beta");
            const pageUrl = "/" + (slugMap[p.name] || p.name.toLowerCase().replace(/[^a-z0-9]/g, ""));
            return (
              <a
                key={p.name}
                href={pageUrl}
                className={"sp-product sp-product-" + p.color + (p.placeholder ? " sp-product-placeholder" : "") + " sp-product-clickable"}
                style={{ textDecoration: "none", display: "block" }}
              >
                <header className="sp-product-head">
                  <ProductMark kind={p.name} color={p.color} size={44} />
                  <span className={"sp-product-tag sp-product-tag-" + tagClass}>{p.tag}</span>
                </header>
                <div className="sp-product-body">
                  <h3 className="sp-product-name" style={{ color: "#0F1C35" }}>{p.name}</h3>
                  <div className="sp-product-tagline" style={{ color: "#3D4F6E" }}>{p.tagline}</div>
                  <p className="sp-product-desc" style={{ color: "#3D4F6E" }}>{p.desc}</p>
                </div>
                <div className="sp-product-footer">
                  <span className="sp-product-learn" style={{ color: "#3D4F6E" }}>
                    {lang === "fr" ? "En savoir plus" : "Learn more"} <Icon name="arrow-right" size={13} />
                  </span>
                </div>
                <div className={"sp-product-bar sp-product-bar-" + p.color} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProductModal({ product, lang, onClose }) {
  if (!product) return null;
  const m = product.modal;
  const content = (() => {
    if (!m) {
      const isLive = product.tag === "Actif" || product.tag === "Live";
      return (
        <div className="sp-modal-backdrop" onClick={onClose} style={{ zIndex: 9000 }}>
          <div className="sp-product-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true">
            <button className="sp-login-close" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
            <div className="sp-pm-header">
              <div className="sp-pm-header-left">
                <ProductMark kind={product.name} color={product.color} size={52} />
                <div><h2 className="sp-pm-name">{product.name}</h2><div className="sp-pm-tagline">{product.tagline}</div></div>
              </div>
            </div>
            <div className="sp-pm-body"><p className="sp-pm-about">{product.desc}</p></div>
          </div>
        </div>
      );
    }
    const isLive = product.tag === "Actif" || product.tag === "Live";
    const fr = lang === "fr";
    const colorMap = { orange: "#FF6B1A", blue: "#3B82F6", green: "#10B981", yellow: "#EAB308" };
    const accentColor = colorMap[product.color] || "#FF6B1A";
    return (
      <div className="sp-modal-backdrop" onClick={onClose} style={{ zIndex: 9000 }}>
        <div
          className="sp-product-modal"
          onClick={e => e.stopPropagation()}
          role="dialog" aria-modal="true"
          style={{ "--pm-accent": accentColor }}
        >
          <button className="sp-login-close" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
          <div className="sp-pm-header" style={{ borderBottom: `1px solid color-mix(in srgb, ${accentColor} 25%, transparent)` }}>
            <div className="sp-pm-header-left">
              <ProductMark kind={product.name} color={product.color} size={52} />
              <div>
                <h2 className="sp-pm-name">{product.name}</h2>
                <div className="sp-pm-tagline">{product.tagline}</div>
              </div>
            </div>
            {isLive && (
              <a href={product.url} target="_blank" rel="noopener" className="sp-btn sp-btn-primary" style={{ flexShrink: 0 }}>
                {product.cta} <Icon name="arrow-right" size={14} />
              </a>
            )}
          </div>
          <div className="sp-pm-body">
            <p className="sp-pm-headline">{m.headline}</p>
            <p className="sp-pm-about">{m.about}</p>
            <h3 className="sp-pm-section-title">{fr ? "Fonctionnalités" : "Features"}</h3>
            <div className="sp-pm-features">
              {m.features.map((f) => (
                <div key={f.title} className="sp-pm-feat">
                  <div className="sp-pm-feat-icon" style={{ background: `color-mix(in srgb, ${accentColor} 14%, transparent)`, color: accentColor }}>
                    <Icon name={f.icon} size={18} />
                  </div>
                  <div>
                    <div className="sp-pm-feat-title">{f.title}</div>
                    <div className="sp-pm-feat-desc">{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            {m.steps && m.steps.length > 0 && (
              <>
                <h3 className="sp-pm-section-title">{fr ? "Comment ça marche" : "How it works"}</h3>
                <ol className="sp-pm-steps">
                  {m.steps.map((s, i) => (
                    <li key={i} className="sp-pm-step">
                      <span className="sp-pm-step-num" style={{ color: accentColor }}>{String(i + 1).padStart(2, "0")}</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ol>
              </>
            )}
            <div className="sp-pm-pricing-note"><Icon name="tag" size={14} />{m.pricing_note}</div>
            {!isLive && (
              <div className="sp-pm-notify">
                <p>{fr ? "Sois parmi les premiers informés du lancement." : "Be among the first to know when it launches."}</p>
                <form className="sp-pm-notify-form" onSubmit={e => e.preventDefault()}>
                  <input type="email" placeholder={fr ? "ton@courriel.com" : "your@email.com"} required />
                  <button type="submit" className="sp-btn sp-btn-primary">{fr ? "M'avertir" : "Notify me"} <Icon name="bell" size={14} /></button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  })();
  return createPortal(content, document.body);
}


// ──────────────────────────────────────────────────────────────────────────────
// SECTION — FEATURES
// ──────────────────────────────────────────────────────────────────────────────
function Features({ lang }) {
  const t = window.T[lang].features;
  const icons = ["shield", "wifi-off", "cpu", "globe", "zap", "file"];
  const r1 = useReveal();
  const r2 = useReveal({ threshold: 0.05 });
  return (
    <section className="sp-features">
      <div className="sp-container">
        <div className="sp-reveal" ref={r1}><SectionHeader eyebrow={t.eyebrow} title={t.title} /></div>
        <div className="sp-feat-grid sp-reveal sp-reveal-stagger" ref={r2}>
          {t.items.map((it, i) => (
            <article key={it.title} className="sp-feat">
              <span className="sp-feat-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <div className="sp-feat-icon">
                <Icon name={icons[i]} size={22} />
              </div>
              <h3 className="sp-feat-title">{it.title}</h3>
              <p className="sp-feat-desc">{it.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION — WORKFLOW (3 steps with mini mockups)
// ──────────────────────────────────────────────────────────────────────────────
function Workflow({ lang }) {
  const t = window.T[lang].workflow;
  const r1 = useReveal();
  const r2 = useReveal({ threshold: 0.05 });
  return (
    <section className="sp-workflow">
      <div className="sp-container">
        <div className="sp-reveal" ref={r1}><SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} /></div>
        <div className="sp-flow-grid sp-reveal sp-reveal-stagger" ref={r2}>
          {t.steps.map((s, i) => (
            <article key={s.num} className="sp-flow-step">
              <div className="sp-flow-num mono">{s.num}</div>
              <div className="sp-flow-mock">
                {i === 0 && <FlowMockProject lang={lang} />}
                {i === 1 && <FlowMockEstimate lang={lang} />}
                {i === 2 && <FlowMockPDF lang={lang} />}
              </div>
              <h3 className="sp-flow-title">{s.title}</h3>
              <p className="sp-flow-desc">{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function FlowMockProject({ lang }) {
  return (
    <div className="sp-mini-card">
      <div className="sp-mini-bar"><span /><span /><span /></div>
      <div className="sp-mini-field"><label>{lang === "fr" ? "Nom du chantier" : "Site name"}</label><div className="sp-mini-input">Garage Lefebvre</div></div>
      <div className="sp-mini-field"><label>Client</label><div className="sp-mini-input">Marc Lefebvre</div></div>
      <div className="sp-mini-field"><label>{lang === "fr" ? "Adresse" : "Address"}</label><div className="sp-mini-input">125, ch. du Lac-Beauport</div></div>
      <div className="sp-mini-pill">{lang === "fr" ? "Brouillon" : "Draft"}</div>
    </div>
  );
}

function FlowMockEstimate({ lang }) {
  return (
    <div className="sp-mini-card">
      <div className="sp-mini-bar"><span /><span /><span /></div>
      <div className="sp-mini-eyebrow mono">{lang === "fr" ? "Béton / Dalle" : "Concrete / Slab"}</div>
      <div className="sp-mini-row">
        <div className="sp-mini-dim"><span>L</span><b>24′</b></div>
        <div className="sp-mini-dim"><span>l</span><b>22′</b></div>
        <div className="sp-mini-dim"><span>ép</span><b>4″</b></div>
      </div>
      <div className="sp-mini-result">
        <div><span>{lang === "fr" ? "Volume" : "Volume"}</span><b className="mono">6.61 m³</b></div>
        <div><span>{lang === "fr" ? "Total" : "Total"}</span><b className="mono">1 798,12 $</b></div>
      </div>
    </div>
  );
}

function FlowMockPDF({ lang }) {
  return (
    <div className="sp-mini-card sp-mini-pdf">
      <div className="sp-mini-pdf-head">
        <div>
          <div className="sp-mini-pdf-brand mono">CONSTRUCTION DEMO INC.</div>
          <div className="sp-mini-pdf-addr">QC · RBQ 5678-1234-01</div>
        </div>
        <div className="sp-mini-pdf-num mono">SP-2841</div>
      </div>
      <div className="sp-mini-pdf-lines">
        <div /><div /><div /><div />
      </div>
      <div className="sp-mini-pdf-total mono">1 798,12 $ <span>CAD</span></div>
      <div className="sp-mini-pdf-cta">
        <Icon name="download" size={12} /> {lang === "fr" ? "Télécharger PDF" : "Download PDF"}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION — PRICING
// ──────────────────────────────────────────────────────────────────────────────
function Pricing({ lang }) {
  const t = window.T[lang].pricing;
  const r1 = useReveal();
  const r2 = useReveal({ threshold: 0.05 });
  return (
    <section id="pricing" className="sp-pricing">
      <div className="sp-container">
        <div className="sp-reveal" ref={r1}><SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} align="center" /></div>
        <div className="sp-price-grid sp-reveal sp-reveal-stagger" ref={r2}>
          {t.plans.map((p) => (
            <article key={p.name} className={"sp-plan" + (p.highlight ? " is-featured" : "")}>
              {p.highlight && <div className="sp-plan-flag">{lang === "fr" ? "Plus populaire" : "Most popular"}</div>}
              <div className="sp-plan-name">{p.name}</div>
              <div className="sp-plan-price">
                <span className="sp-plan-amount">{p.price}</span>
                <span className="sp-plan-cadence">{p.cadence}</span>
              </div>
              <p className="sp-plan-desc">{p.desc}</p>
              <ul className="sp-plan-features">
                {p.features.map((f) => (
                  <li key={f}><Icon name="check" size={14} /> {f}</li>
                ))}
              </ul>
              <button className={"sp-btn " + (p.highlight ? "sp-btn-primary" : "sp-btn-ghost") + " sp-btn-block"}>
                {p.cta}
              </button>
            </article>
          ))}
        </div>
        <div className="sp-price-note">{t.tax_note}</div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION — FAQ
// ──────────────────────────────────────────────────────────────────────────────
function FAQ({ lang }) {
  const t = window.T[lang].faq;
  const [open, setOpen] = uS(0);
  const r = useReveal();
  return (
    <section id="faq" className="sp-faq">
      <div className="sp-container sp-faq-inner sp-reveal" ref={r}>
        <div className="sp-faq-head">
          <div className="sp-eyebrow">{t.eyebrow}</div>
          <h2 className="sp-section-title">{t.title}</h2>
        </div>
        <div className="sp-faq-list">
          {t.items.map((it, i) => (
            <details key={i} open={open === i} onToggle={(e) => e.target.open && setOpen(i)}>
              <summary>
                <span>{it.q}</span>
                <Icon name="chevron-down" size={16} />
              </summary>
              <div className="sp-faq-a">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION — CTA BAND + FOOTER
// ──────────────────────────────────────────────────────────────────────────────
function CTABand({ lang }) {
  const t = window.T[lang].cta_band;
  const r = useReveal();
  return (
    <section className="sp-cta-band">
      <div className="sp-cta-band-bg" aria-hidden="true" />
      <div className="sp-container sp-cta-inner sp-reveal" ref={r}>
        <h2 className="sp-cta-title">{t.title}</h2>
        <p className="sp-cta-sub">{t.subtitle}</p>
        <div className="sp-cta-actions">
          <a href="#suite" className="sp-btn sp-btn-primary sp-btn-lg">{t.primary} <Icon name="arrow-right" size={16} /></a>
          <a href="/trimpro360" className="sp-btn sp-btn-ghost-on-dark sp-btn-lg">{t.secondary}</a>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// FEEDBACK MODAL
// ──────────────────────────────────────────────────────────────────────────────
function FeedbackModal({ lang, onClose }) {
  const fr = lang === "fr";
  const [metier, setMetier] = uS("");
  const [irritant, setIrritant] = uS("");
  const [aide, setAide] = uS("");
  const [sent, setSent] = uS(false);
  const [sending, setSending] = uS(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    const sb = getSupabase();
    if (sb) {
      await sb.from("feedback").insert({ metier, irritant, aide, lang, created_at: new Date().toISOString() });
      setSent(true);
    } else {
      const body = encodeURIComponent(`Métier: ${metier}\n\nIrritant: ${irritant}\n\nCe qui aiderait: ${aide}`);
      window.open(`mailto:yan@seriespro360.com?subject=Feedback SeriesPro360&body=${body}`);
      setSent(true);
    }
    setSending(false);
  };

  const content = (
    <div className="sp-modal-backdrop" onClick={onClose} style={{ zIndex: 9500 }}>
      <div className="sp-product-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" style={{ maxWidth: 480 }}>
        <button className="sp-login-close" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
        {sent ? (
          <div style={{ textAlign: "center", padding: "40px 24px" }}>
            <div style={{ fontSize: 40, marginBottom: 16 }}>🙏</div>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0F1C35", margin: "0 0 8px" }}>
              {fr ? "Merci pour votre retour !" : "Thanks for your feedback!"}
            </h2>
            <p style={{ color: "#3D4F6E", fontSize: 15 }}>
              {fr ? "Vos commentaires nous aident à améliorer nos outils." : "Your input helps us improve our tools."}
            </p>
          </div>
        ) : (
          <>
            <div className="sp-pm-header" style={{ borderBottom: "1px solid rgba(27,42,74,0.08)" }}>
              <div className="sp-pm-header-left">
                <div style={{ fontSize: 24 }}>💬</div>
                <div>
                  <h2 className="sp-pm-name">{fr ? "Donnez votre avis" : "Share your feedback"}</h2>
                  <div className="sp-pm-tagline">{fr ? "3 questions, 2 minutes — ça nous aide vraiment." : "3 questions, 2 minutes — it really helps."}</div>
                </div>
              </div>
            </div>
            <div className="sp-pm-body">
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0F1C35", marginBottom: 6 }}>
                    {fr ? "Votre métier dans la construction" : "Your construction trade"}
                  </label>
                  <input
                    type="text"
                    required
                    value={metier}
                    onChange={e => setMetier(e.target.value)}
                    placeholder={fr ? "ex: charpentier, estimateur, contremaître…" : "e.g. carpenter, estimator, foreman…"}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(27,42,74,0.2)", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0F1C35", marginBottom: 6 }}>
                    {fr ? "Votre principal irritant au quotidien" : "Your main daily frustration"}
                  </label>
                  <textarea
                    required
                    value={irritant}
                    onChange={e => setIrritant(e.target.value)}
                    rows={3}
                    placeholder={fr ? "Ce qui vous fait perdre du temps, ce qui est flou, ce qui manque…" : "What wastes your time, what's unclear, what's missing…"}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(27,42,74,0.2)", fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0F1C35", marginBottom: 6 }}>
                    {fr ? "Ce qui vous aiderait le plus" : "What would help you most"}
                  </label>
                  <textarea
                    value={aide}
                    onChange={e => setAide(e.target.value)}
                    rows={3}
                    placeholder={fr ? "Un outil, une fonctionnalité… ou rien si vous n'avez pas d'idée." : "A tool, a feature… or nothing if you have no idea."}
                    style={{ width: "100%", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(27,42,74,0.2)", fontSize: 14, resize: "vertical", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <button type="submit" disabled={sending} className="sp-btn sp-btn-primary" style={{ alignSelf: "flex-end", minWidth: 140 }}>
                  {sending ? (fr ? "Envoi…" : "Sending…") : (fr ? "Envoyer" : "Submit")} <Icon name="arrow-right" size={14} />
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
  return createPortal(content, document.body);
}

function Footer({ lang, logoVariant, setActivePage, onFeedback }) {
  const t = window.T[lang].footer;
  const pages = window.T[lang].pages;
  const fr = lang === "fr";

  const handlePageClick = (e, linkName) => {
    e.preventDefault();
    if (pages[linkName]) setActivePage(linkName);
  };

  return (
    <footer className="sp-footer">
      <div className="sp-container sp-footer-inner">
        <div className="sp-footer-brand">
          <Logo variant={logoVariant} size={28} />
          <p>{t.tagline}</p>
          <div className="sp-footer-meta">{t.made_in}</div>
        </div>
        <div className="sp-footer-cols">
          <div>
            <div className="sp-footer-col-title">{t.product}</div>
            <ul>{t.product_links.map((l) => {
              const appUrls = { "TrimPro360": "https://trimpro360-v3.vercel.app", "CalcuPro360": "https://calcupro360.seriespro360.com" };
              return appUrls[l]
                ? <li key={l}><a href={appUrls[l]} target="_blank" rel="noopener">{l}</a></li>
                : <li key={l}><a href="#!" onClick={(e) => handlePageClick(e, l)}>{l}</a></li>;
            })}</ul>
          </div>
          <div>
            <div className="sp-footer-col-title">{t.company}</div>
            <ul>
              {t.company_links.map((l) => <li key={l}><a href="#!" onClick={(e) => handlePageClick(e, l)}>{l}</a></li>)}
              <li><a href="#!" onClick={(e) => { e.preventDefault(); onFeedback && onFeedback(); }} style={{ color: "#E8420A", fontWeight: 600 }}>💬 {fr ? "Donner mon avis" : "Share feedback"}</a></li>
            </ul>
          </div>
          <div>
            <div className="sp-footer-col-title">{t.legal}</div>
            <ul>{t.legal_links.map((l) => <li key={l}><a href="#!" onClick={(e) => handlePageClick(e, l)}>{l}</a></li>)}</ul>
          </div>
        </div>
      </div>
      <div className="sp-container sp-footer-bottom">
        <span>{t.copyright}</span>
        <span className="mono">seriespro360.com</span>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Section header helper
// ──────────────────────────────────────────────────────────────────────────────
function Testimonials({ lang }) {
  const t = window.T[lang].testimonials;
  const r1 = useReveal();
  const r2 = useReveal({ threshold: 0.05 });
  return (
    <section className="sp-testimonials">
      <div className="sp-container">
        <div className="sp-reveal" ref={r1}>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} align="center" />
        </div>
        <div className="sp-testi-grid sp-reveal sp-reveal-stagger" ref={r2}>
          {t.items.map((item) => (
            <article key={item.name} className="sp-testi-card">
              <div className="sp-testi-quote">&ldquo;{item.quote}&rdquo;</div>
              <div className="sp-testi-author">
                <div className="sp-testi-avatar">{item.initials}</div>
                <div>
                  <div className="sp-testi-name">{item.name}</div>
                  <div className="sp-testi-role">{item.role}</div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhySpecialized({ lang }) {
  const t = window.T[lang].why_specialized;
  return (
    <section style={{ background: "#F8F7F4", padding: "80px 0", borderTop: "1px solid rgba(27,42,74,0.08)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#E8420A", marginBottom: 12 }}>{t.eyebrow}</div>
          <h2 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, color: "#0F1C35", lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-0.02em" }}>{t.title}</h2>
          <p style={{ fontSize: 16, color: "#3D4F6E", lineHeight: 1.65, maxWidth: 580, margin: "0 auto" }}>{t.subtitle}</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
          {t.points.map((pt) => (
            <div key={pt.title} style={{ background: "#FFFFFF", borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(27,42,74,0.08)", boxShadow: "0 2px 12px rgba(27,42,74,0.05)" }}>
              <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(232,66,10,0.10)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                <Icon name={pt.icon} size={18} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: "#0F1C35", margin: "0 0 8px" }}>{pt.title}</h3>
              <p style={{ fontSize: 14, color: "#3D4F6E", lineHeight: 1.6, margin: 0 }}>{pt.desc}</p>
            </div>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <a href="/trimpro360" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#E8420A", textDecoration: "none" }}>
            {t.cta} <Icon name="arrow-right" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <header className={"sp-section-head sp-section-head-" + align}>
      <div className="sp-eyebrow" style={{ color: "#E8420A" }}>{eyebrow}</div>
      <h2 className="sp-section-title" style={{ color: "#0F1C35" }}>{title}</h2>
      {subtitle && <p className="sp-section-sub" style={{ color: "#3D4F6E" }}>{subtitle}</p>}
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// APP ROOT
// ──────────────────────────────────────────────────────────────────────────────
function getSupabase() {
  if (!window.supabase || !window.SP_CONFIG || !window.SP_CONFIG.supabaseUrl || window.SP_CONFIG.supabaseUrl.includes("VOTRE")) return null;
  if (!window._sb) window._sb = window.supabase.createClient(window.SP_CONFIG.supabaseUrl, window.SP_CONFIG.supabaseKey);
  return window._sb;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [openMobile, setOpenMobile] = uS(false);
  const [activePage, setActivePage] = uS(null);
  const [loginOpen, setLoginOpen] = uS(false);
  const [activeProduct, setActiveProduct] = uS(null);
  const [user, setUser] = uS(null);
  const [feedbackOpen, setFeedbackOpen] = uS(false);

  uE(() => {
    const sb = getSupabase();
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => { if (data.session) setUser(data.session.user); });
    const { data: listener } = sb.auth.onAuthStateChange((_e, session) => setUser(session ? session.user : null));
    return () => listener.subscription.unsubscribe();
  }, []);

  // Apply accent + density CSS vars
  uE(() => {
    const html = document.documentElement;
    html.classList.add("sp-light");
    html.classList.remove("sp-dark");
    html.style.setProperty("--sp-accent", t.accent);
    html.style.setProperty("--sp-accent-soft", hexAlpha(t.accent, 0.18));
    html.style.setProperty("--sp-density", t.density);
    window._heroLogoSize = t.heroLogoSize;
    window._heroTopPad = t.heroTopPad;
  }, [t.accent, t.density, t.heroLogoSize, t.heroTopPad]);

  return (
    <div className={"sp-app sp-density-" + t.density}>
      <Nav
        lang={t.lang}
        setLang={(v) => setTweak("lang", v)}
        logoVariant={t.logoVariant}
        openMobile={openMobile}
        setOpenMobile={setOpenMobile}
        openLogin={() => setLoginOpen(true)}
        user={user}
      />
      <main>
        <Hero lang={t.lang} heroLogoSize={t.heroLogoSize} heroTopPad={t.heroTopPad} />
        <Origin lang={t.lang} />
        <TrustStrip lang={t.lang} />
        <AppGrid lang={t.lang} />
        <WhySpecialized lang={t.lang} />
        <Testimonials lang={t.lang} />
      </main>
      <Footer lang={t.lang} logoVariant={t.logoVariant} setActivePage={setActivePage} onFeedback={() => setFeedbackOpen(true)} />

      <PageModal
        title={activePage}
        content={activePage ? window.T[t.lang].pages[activePage] : null}
        onClose={() => setActivePage(null)}
      />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} lang={t.lang} user={user} setUser={setUser} />
      {feedbackOpen && <FeedbackModal lang={t.lang} onClose={() => setFeedbackOpen(false)} />}
      <ProductModal product={activeProduct} lang={t.lang} onClose={() => setActiveProduct(null)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label={t.lang === "fr" ? "Apparence" : "Appearance"} />
        <TweakRadio label={t.lang === "fr" ? "Langue" : "Language"} value={t.lang} options={["fr", "en"]} onChange={(v) => setTweak("lang", v)} />
        <TweakRadio label={t.lang === "fr" ? "Densité" : "Density"} value={t.density} options={["compact", "regular", "comfy"]} onChange={(v) => setTweak("density", v)} />
        <TweakColor label={t.lang === "fr" ? "Couleur d'accent" : "Accent"}
          value={t.accent}
          options={["#E8420A", "#FF6B1A", "#EAB308", "#3B82F6", "#10B981"]}
          onChange={(v) => setTweak("accent", v)} />

        <TweakSection label={t.lang === "fr" ? "Hero — Logo & Espacement" : "Hero — Logo & Spacing"} />
        <TweakSlider label={t.lang === "fr" ? "Taille logo (px)" : "Logo size (px)"} value={t.heroLogoSize} min={100} max={700} step={10} onChange={(v) => setTweak("heroLogoSize", v)} />
        <TweakSlider label={t.lang === "fr" ? "Espace haut (px)" : "Top padding (px)"} value={t.heroTopPad} min={0} max={120} step={4} onChange={(v) => setTweak("heroTopPad", v)} />
        <TweakSection label={t.lang === "fr" ? "Logo variante" : "Logo variant"} />
        <TweakRadio
          label={t.lang === "fr" ? "Variante" : "Variant"}
          value={t.logoVariant}
          options={["real", "strata", "compass", "bracket"]}
          onChange={(v) => setTweak("logoVariant", v)}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 6, padding: "4px 0" }}>
          <LogoPreview kind="real" active={t.logoVariant === "real"} onClick={() => setTweak("logoVariant", "real")} />
          <LogoPreview kind="strata" active={t.logoVariant === "strata"} onClick={() => setTweak("logoVariant", "strata")} />
          <LogoPreview kind="compass" active={t.logoVariant === "compass"} onClick={() => setTweak("logoVariant", "compass")} />
          <LogoPreview kind="bracket" active={t.logoVariant === "bracket"} onClick={() => setTweak("logoVariant", "bracket")} />
        </div>
      </TweaksPanel>
    </div>
  );
}

function LogoPreview({ kind, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? "rgba(255,107,26,0.12)" : "rgba(0,0,0,0.04)",
        border: active ? "1px solid #FF6B1A" : "1px solid rgba(0,0,0,0.08)",
        borderRadius: 8, padding: "8px 4px", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
      }}>
      <Logo variant={kind} wordmark={false} size={22} color="#1a1a1a" accent="#FF6B1A" />
      <span style={{ fontSize: 9, opacity: 0.7, textTransform: "capitalize" }}>{kind}</span>
    </button>
  );
}

function LoginModal({ open, onClose, lang, user, setUser }) {
  const [tab, setTab] = uS("login");
  const [email, setEmail] = uS("");
  const [pwd, setPwd] = uS("");
  const [loading, setLoading] = uS(false);
  const [error, setError] = uS(null);
  if (!open) return null;

  const fr = lang === "fr";
  const sb = getSupabase();
  const APPS = (window.SP_CONFIG && window.SP_CONFIG.apps) || [];

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!sb) return;
    setLoading(true); setError(null);
    const { data, error: err } = await sb.auth.signInWithPassword({ email, password: pwd });
    setLoading(false);
    if (err) { setError(err.message); return; }
    if (data.user) setUser(data.user);
  };

  const handleMicrosoft = async () => {
    if (!sb) return;
    setLoading(true); setError(null);
    const { error: err } = await sb.auth.signInWithOAuth({
      provider: "azure",
      options: { scopes: "email", redirectTo: window.location.origin },
    });
    if (err) { setError(err.message); setLoading(false); }
  };

  const handleLogout = async () => {
    if (sb) await sb.auth.signOut();
    setUser(null);
  };

  const openApp = async (app) => {
    if (!sb) { window.open(app.url, "_blank"); return; }
    const { data } = await sb.auth.getSession();
    const token = data?.session?.access_token;
    const refresh = data?.session?.refresh_token;
    const url = token ? `${app.url}/auth/token?access_token=${token}&refresh_token=${refresh}` : app.url;
    window.open(url, "_blank");
  };

  return (
    <div className="sp-modal-backdrop" onClick={onClose} style={{ zIndex: 9999 }}>
      <div className="sp-login-modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={fr ? "Connexion" : "Sign in"}>
        <button className="sp-login-close" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>

        <div className="sp-login-brand">
          <Logo variant="strata" size={28} />
        </div>

        {user ? (
          <div className="sp-login-dashboard">
            <div className="sp-login-welcome">
              <div className="sp-login-avatar-lg">{(user.email || "?")[0].toUpperCase()}</div>
              <div>
                <p className="sp-login-welcome-name">{user.email}</p>
                <p className="sp-login-welcome-sub">{fr ? "Connecté à SeriesPro360" : "Signed in to SeriesPro360"}</p>
              </div>
            </div>
            <p className="sp-login-apps-label">{fr ? "Mes applications" : "My applications"}</p>
            <div className="sp-login-apps">
              {APPS.length === 0 && (
                <p style={{ color: "var(--sp-text-2)", fontSize: 13, textAlign: "center", padding: "12px 0" }}>
                  {fr ? "Aucune application active pour ce compte." : "No active applications for this account."}
                </p>
              )}
              {APPS.map(app => (
                <button key={app.name} className="sp-login-app-btn" onClick={() => openApp(app)}>
                  <span className="sp-login-app-icon" style={{ background: app.color + "22", color: app.color }}>
                    <Icon name={app.icon || "zap"} size={18} />
                  </span>
                  <span className="sp-login-app-name">{app.name}</span>
                  <Icon name="arrow-right" size={14} />
                </button>
              ))}
            </div>
            <button className="sp-login-signout" onClick={handleLogout}>
              {fr ? "Se déconnecter" : "Sign out"}
            </button>
          </div>
        ) : (
          <>
            <div className="sp-login-tabs">
              <button className={"sp-login-tab" + (tab === "login" ? " is-active" : "")} onClick={() => { setTab("login"); setError(null); }}>
                {fr ? "Connexion" : "Sign in"}
              </button>
              <button className={"sp-login-tab" + (tab === "register" ? " is-active" : "")} onClick={() => { setTab("register"); setError(null); }}>
                {fr ? "Créer un compte" : "Create account"}
              </button>
            </div>

            {error && <div className="sp-login-error">{error}</div>}

            <div className="sp-login-sso">
              <button className="sp-login-sso-btn" onClick={handleMicrosoft} disabled={loading}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <rect x="0" y="0" width="8.5" height="8.5" fill="#F25022" />
                  <rect x="9.5" y="0" width="8.5" height="8.5" fill="#7FBA00" />
                  <rect x="0" y="9.5" width="8.5" height="8.5" fill="#00A4EF" />
                  <rect x="9.5" y="9.5" width="8.5" height="8.5" fill="#FFB900" />
                </svg>
                {fr ? "Continuer avec Microsoft" : "Continue with Microsoft"}
              </button>
            </div>

            <div className="sp-login-divider"><span>{fr ? "ou par courriel" : "or by email"}</span></div>

            <form className="sp-login-form" onSubmit={handleLogin}>
              <div className="sp-login-field">
                <label>{fr ? "Adresse courriel" : "Email address"}</label>
                <input
                  type="email" required
                  placeholder={fr ? "vous@entreprise.com" : "you@company.com"}
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              {tab === "login" && (
                <div className="sp-login-field">
                  <label>{fr ? "Mot de passe" : "Password"}</label>
                  <input
                    type="password" required
                    placeholder="••••••••"
                    value={pwd}
                    onChange={e => setPwd(e.target.value)}
                  />
                </div>
              )}
              <button type="submit" className="sp-btn sp-btn-primary" disabled={loading} style={{ width: "100%", justifyContent: "center", padding: "13px 16px", fontSize: 14 }}>
                {loading ? (fr ? "Connexion…" : "Signing in…") : tab === "login" ? (fr ? "Se connecter" : "Sign in") : (fr ? "Créer mon compte" : "Create my account")}
                {!loading && <Icon name="arrow-right" size={15} />}
              </button>
            </form>

            <p className="sp-login-note">
              {fr ? "En continuant, tu acceptes nos " : "By continuing, you agree to our "}
              <a href="#!">{fr ? "Conditions d'utilisation" : "Terms of use"}</a>
              {" & "}
              <a href="#!">{fr ? "Politique de confidentialité" : "Privacy policy"}</a>.
            </p>
          </>
        )}
      </div>
      <style>{`
        @keyframes sp-login-in {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)  scale(1); }
        }
      `}</style>
    </div>
  );
}

function PageModal({ title, content, onClose }) {
  if (!title) return null;
  return (
    <div className="sp-modal-backdrop" onClick={onClose} style={{ zIndex: 9999, alignItems: "flex-end", padding: 0 }}>
      <div
        className="sp-modal sp-reveal is-visible"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: 900,
          width: "100%",
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          borderBottom: 0,
          maxHeight: "85vh",
          animation: "sp-slide-up 0.3s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      >
        <div className="sp-modal-bar">
          <span className="sp-modal-bar-title">{title}</span>
          <div className="sp-modal-bar-actions">
            <button className="sp-modal-x" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
          </div>
        </div>
        <div style={{ padding: "40px", whiteSpace: "pre-wrap", lineHeight: 1.6, overflowY: "auto" }}>
          <h2 style={{ fontFamily: "var(--sp-font-display)", fontSize: 32, fontWeight: 600, color: "var(--sp-text)", marginBottom: 24, letterSpacing: "-0.02em" }}>{title}</h2>
          <div style={{ color: "var(--sp-text-2)", fontSize: 15, maxWidth: "700px" }}>{content}</div>
        </div>
      </div>
      <style>{`
        @keyframes sp-slide-up {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

function hexAlpha(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
