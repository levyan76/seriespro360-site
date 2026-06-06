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
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add("is-visible"); obs.disconnect(); } },
      { threshold: (opts && opts.threshold) || 0.1, rootMargin: (opts && opts.rootMargin) || "0px 0px -48px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ──────────────────────────────────────────────────────────────────────────────
// TWEAK DEFAULTS
// ──────────────────────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "lang": "fr",
  "dark": true,
  "accent": "#FF6B1A",
  "logoVariant": "strata",
  "density": "regular"
}/*EDITMODE-END*/;

// ──────────────────────────────────────────────────────────────────────────────
// SECTION — NAV
// ──────────────────────────────────────────────────────────────────────────────
function Nav({ lang, setLang, dark, setDark, logoVariant, openMobile, setOpenMobile, openLogin, user }) {
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
        <a href="#top" className="sp-nav-brand">
          <Logo variant={logoVariant} size={28} />
        </a>
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
          <button className="sp-theme-toggle" onClick={() => setDark(!dark)} aria-label="Theme">
            <Icon name={dark ? "sun" : "moon"} size={16} />
          </button>
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
// SECTION — HERO
// Left: copy. Right: technical mockup card with grid, dimensions, live mini-estimate.
// ──────────────────────────────────────────────────────────────────────────────
function Hero({ lang }) {
  const t = window.T[lang].hero;
  return (
    <section id="top" className="sp-hero sp-hero-centered">
      <div className="sp-hero-grid-bg" aria-hidden="true" />
      <div className="sp-container sp-hero-center-inner">
        <div className="sp-hero-badge">
          <span className="sp-hero-badge-dot" />{t.badge}
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

function HeroMock({ lang, t }) {
  // Mini live estimate visible in hero card
  const est = calcSlab({
    length: 24, width: 22, thickness: 4, system: "imperial",
    waste: 10, concretePrice: 185, mesh: true, rebar: false, gravel: true, vapor: true,
  });
  return (
    <div className="sp-hero-mock">
      <div className="sp-hero-mock-frame">
        <div className="sp-hero-mock-grid" aria-hidden="true" />
        <div className="sp-hero-mock-windowbar">
          <span className="sp-hero-mock-dots"><i /><i /><i /></span>
          <span className="sp-hero-mock-url mono">calcupro360.seriespro360.com</span>
          <span className="sp-hero-mock-stat"><span className="sp-hero-mock-stat-dot" /> Pro</span>
        </div>

        <div className="sp-hero-mock-body">
          <div className="sp-hero-mock-eyebrow mono">CalcuPro360 · {lang === "fr" ? "Béton / Dalle" : "Concrete / Slab"}</div>
          <div className="sp-hero-mock-title">{t.mock_title}</div>

          <div className="sp-hero-mock-dims">
            <Dim label="L" value="24′ 0″" />
            <Dim label="l" value="22′ 0″" />
            <Dim label="ép." value="4″" accent />
          </div>

          <div className="sp-hero-mock-results">
            <div className="sp-hero-mock-row">
              <span>{t.mock_volume}</span>
              <strong className="mono">{fmtNum(est.volM3, 2)} m³</strong>
            </div>
            <div className="sp-hero-mock-row">
              <span>{t.mock_with_waste}</span>
              <strong className="mono">{fmtNum(est.volOrdered, 2)} m³</strong>
            </div>
            <div className="sp-hero-mock-row sp-hero-mock-row-grand">
              <span>{t.mock_total}</span>
              <strong className="mono">{fmtCAD(est.total, lang)}</strong>
            </div>
          </div>

          <div className="sp-hero-mock-pdf">
            <Icon name="file" size={14} />
            <span>{lang === "fr" ? "Devis PDF prêt" : "PDF quote ready"}</span>
            <span className="sp-hero-mock-pdf-time mono">· 1.8 s</span>
          </div>
        </div>
      </div>

      <div className="sp-hero-mock-float sp-hero-mock-float-1">
        <Icon name="zap" size={14} />
        <span>{lang === "fr" ? "Calcul instantané" : "Instant calc"}</span>
      </div>
      <div className="sp-hero-mock-float sp-hero-mock-float-2">
        <Icon name="shield" size={14} />
        <span>{lang === "fr" ? "Code CNB / CCQ" : "NBC / CCQ"}</span>
      </div>
    </div>
  );
}

function Dim({ label, value, accent }) {
  return (
    <div className={"sp-dim" + (accent ? " sp-dim-accent" : "")}>
      <span className="sp-dim-label">{label}</span>
      <span className="sp-dim-value mono">{value}</span>
    </div>
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
          {t.logos.map((name) => (
            <div className="sp-trust-logo" key={name}>{name}</div>
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
  const r1 = useReveal();
  const r2 = useReveal({ threshold: 0.05 });
  return (
    <section className="sp-origin">
      <div className="sp-container">
        <div className="sp-reveal" ref={r1}>
          <SectionHeader eyebrow={t.eyebrow} title={t.headline} />
          <p className="sp-origin-story">{t.story}</p>
        </div>
        <div className="sp-origin-grid sp-reveal sp-reveal-stagger" ref={r2}>
          {t.positioning.map((p) => (
            <div key={p.label} className="sp-origin-card">
              <div className="sp-origin-icon"><Icon name={p.icon} size={20} /></div>
              <div>
                <div className="sp-origin-label">{p.label}</div>
                <div className="sp-origin-sub">{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="sp-reveal sp-origin-cta" ref={useReveal()}>
          <a href="/trimpro360" className="sp-btn sp-btn-primary">
            {t.cta} <Icon name="arrow-right" size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// SECTION — SUITE
// ──────────────────────────────────────────────────────────────────────────────
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
                  <h3 className="sp-product-name">{p.name}</h3>
                  <div className="sp-product-tagline">{p.tagline}</div>
                  <p className="sp-product-desc">{p.desc}</p>
                </div>
                <div className="sp-product-footer">
                  <span className="sp-product-learn">
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
// SECTION — INTERACTIVE DEMO
// ──────────────────────────────────────────────────────────────────────────────
function Demo({ lang }) {
  const t = window.T[lang].demo;
  const r1 = useReveal();
  const r2 = useReveal({ threshold: 0.05, rootMargin: "0px 0px -20px 0px" });
  return (
    <section id="demo" className="sp-demo">
      <div className="sp-container">
        <div className="sp-reveal" ref={r1}><SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} align="center" /></div>
        <div className="sp-reveal" ref={r2}><SlabEstimator lang={lang} t={t} /></div>
      </div>
    </section>
  );
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
          <a href="#demo" className="sp-btn sp-btn-primary sp-btn-lg">{t.primary} <Icon name="arrow-right" size={16} /></a>
          <a href="#demo" className="sp-btn sp-btn-ghost-on-dark sp-btn-lg">{t.secondary}</a>
        </div>
      </div>
    </section>
  );
}

function Footer({ lang, logoVariant, setActivePage }) {
  const t = window.T[lang].footer;
  const pages = window.T[lang].pages;

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
            <ul>{t.company_links.map((l) => <li key={l}><a href="#!" onClick={(e) => handlePageClick(e, l)}>{l}</a></li>)}</ul>
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

function VsExcel({ lang }) {
  const t = window.T[lang].vs_excel;
  const r1 = useReveal();
  const r2 = useReveal({ threshold: 0.05 });
  return (
    <section className="sp-vs-excel">
      <div className="sp-container">
        <div className="sp-reveal" ref={r1}>
          <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} align="center" />
        </div>
        <div className="sp-vs-table sp-reveal" ref={r2}>
          <div className="sp-vs-header">
            <div className="sp-vs-col-label"></div>
            <div className="sp-vs-col sp-vs-col-excel">
              <Icon name="file" size={16} /> Excel
            </div>
            <div className="sp-vs-col sp-vs-col-sp360">
              <Logo variant="strata" wordmark={false} size={18} color="#fff" accent="#FF6B1A" /> SeriesPro360
            </div>
          </div>
          {t.rows.map((row, i) => (
            <div key={i} className="sp-vs-row">
              <div className="sp-vs-col-label">{row.label}</div>
              <div className="sp-vs-col sp-vs-col-excel">
                <Icon name="x" size={14} className="sp-vs-no" />
                {row.excel}
              </div>
              <div className="sp-vs-col sp-vs-col-sp360">
                <Icon name="check" size={14} className="sp-vs-yes" />
                {row.sp360}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHeader({ eyebrow, title, subtitle, align = "left" }) {
  return (
    <header className={"sp-section-head sp-section-head-" + align}>
      <div className="sp-eyebrow">{eyebrow}</div>
      <h2 className="sp-section-title">{title}</h2>
      {subtitle && <p className="sp-section-sub">{subtitle}</p>}
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

  uE(() => {
    const sb = getSupabase();
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => { if (data.session) setUser(data.session.user); });
    const { data: listener } = sb.auth.onAuthStateChange((_e, session) => setUser(session ? session.user : null));
    return () => listener.subscription.unsubscribe();
  }, []);

  // Apply theme + accent CSS vars to html
  uE(() => {
    const html = document.documentElement;
    html.classList.toggle("sp-dark", !!t.dark);
    html.classList.toggle("sp-light", !t.dark);
    html.style.setProperty("--sp-accent", t.accent);
    html.style.setProperty("--sp-accent-soft", hexAlpha(t.accent, 0.18));
    html.style.setProperty("--sp-density", t.density);
  }, [t.dark, t.accent, t.density]);

  return (
    <div className={"sp-app sp-density-" + t.density}>
      <Nav
        lang={t.lang}
        setLang={(v) => setTweak("lang", v)}
        dark={t.dark}
        setDark={(v) => setTweak("dark", v)}
        logoVariant={t.logoVariant}
        openMobile={openMobile}
        setOpenMobile={setOpenMobile}
        openLogin={() => setLoginOpen(true)}
        user={user}
      />
      <main>
        <Hero lang={t.lang} />
        <TrustStrip lang={t.lang} />
        <Suite lang={t.lang} />
        <VsExcel lang={t.lang} />
        <Origin lang={t.lang} />
        <Testimonials lang={t.lang} />
      </main>
      <Footer lang={t.lang} logoVariant={t.logoVariant} setActivePage={setActivePage} />

      <PageModal
        title={activePage}
        content={activePage ? window.T[t.lang].pages[activePage] : null}
        onClose={() => setActivePage(null)}
      />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} lang={t.lang} user={user} setUser={setUser} />
      <ProductModal product={activeProduct} lang={t.lang} onClose={() => setActiveProduct(null)} />

      <TweaksPanel title="Tweaks">
        <TweakSection label={t.lang === "fr" ? "Apparence" : "Appearance"} />
        <TweakToggle label={t.lang === "fr" ? "Mode sombre" : "Dark mode"} value={t.dark} onChange={(v) => setTweak("dark", v)} />
        <TweakRadio label={t.lang === "fr" ? "Langue" : "Language"} value={t.lang} options={["fr", "en"]} onChange={(v) => setTweak("lang", v)} />
        <TweakRadio label={t.lang === "fr" ? "Densité" : "Density"} value={t.density} options={["compact", "regular", "comfy"]} onChange={(v) => setTweak("density", v)} />
        <TweakColor label={t.lang === "fr" ? "Couleur d'accent" : "Accent"}
          value={t.accent}
          options={["#FF6B1A", "#EAB308", "#3B82F6", "#10B981", "#EF4444"]}
          onChange={(v) => setTweak("accent", v)} />

        <TweakSection label={t.lang === "fr" ? "Logo SeriesPro360" : "SeriesPro360 logo"} />
        <TweakRadio
          label={t.lang === "fr" ? "Variante" : "Variant"}
          value={t.logoVariant}
          options={["strata", "compass", "bracket"]}
          onChange={(v) => setTweak("logoVariant", v)}
        />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, padding: "4px 0" }}>
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
