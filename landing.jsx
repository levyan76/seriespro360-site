// landing.jsx — Main SeriesPro360 marketing page
// Composes: Nav · Hero · Trust · Suite · Live Demo · Features · Workflow · Pricing · FAQ · CTA · Footer

const { useState: uS, useEffect: uE, useRef: uR, useCallback: uC } = React;

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
function Nav({ lang, setLang, dark, setDark, logoVariant, openMobile, setOpenMobile }) {
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
          <a href="#" className="sp-btn sp-btn-ghost-sm sp-nav-login">{t.login}</a>
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
    <section id="top" className="sp-hero">
      <div className="sp-hero-grid-bg" aria-hidden="true" />
      <div className="sp-container sp-hero-inner">
        <div className="sp-hero-copy">
          <div className="sp-hero-badge">
            <span className="sp-hero-badge-dot" />{t.badge}
          </div>
          <h1 className="sp-hero-title">
            <span className="sp-hero-word">{t.title_a}<span className="sp-hero-period">.</span></span>
            <span className="sp-hero-word">{t.title_b}<span className="sp-hero-period">.</span></span>
            <span className="sp-hero-word sp-hero-word-accent">{t.title_c}<span className="sp-hero-period">.</span></span>
            <span className="sp-hero-tail">{t.title_tail}</span>
          </h1>
          <p className="sp-hero-sub">{t.subtitle}</p>
          <div className="sp-hero-ctas">
            <a href="#suite" className="sp-btn sp-btn-primary sp-btn-lg">{t.cta_primary} <Icon name="arrow-right" size={16} /></a>
            <a href="#demo" className="sp-btn sp-btn-ghost sp-btn-lg">{t.cta_secondary}</a>
          </div>
          <ul className="sp-hero-meta">
            <li><Icon name="check" size={14} />{t.meta_1}</li>
            <li><Icon name="check" size={14} />{t.meta_2}</li>
            <li><Icon name="check" size={14} />{t.meta_3}</li>
          </ul>
        </div>
        <HeroMock lang={lang} t={t} />
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
// SECTION — SUITE
// ──────────────────────────────────────────────────────────────────────────────
function Suite({ lang }) {
  const t = window.T[lang].suite;
  const r1 = useReveal();
  const r2 = useReveal({ threshold: 0.05 });
  return (
    <section id="suite" className="sp-suite">
      <div className="sp-container">
        <div className="sp-reveal" ref={r1}><SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} /></div>
        <div className="sp-suite-grid sp-reveal sp-reveal-stagger" ref={r2}>
          {t.products.map((p) => {
            const isLive = p.tag === "Actif" || p.tag === "Live";
            const tagClass = isLive ? "live" : (p.placeholder ? "soon" : "beta");
            return (
              <article key={p.name} className={"sp-product sp-product-" + p.color + (p.placeholder ? " sp-product-placeholder" : "")}>
                <header className="sp-product-head">
                  <ProductMark kind={p.name} color={p.color} size={44} />
                  <span className={"sp-product-tag sp-product-tag-" + tagClass}>{p.tag}</span>
                </header>
                <div className="sp-product-body">
                  <h3 className="sp-product-name">{p.name}</h3>
                  <div className="sp-product-tagline">{p.tagline}</div>
                  <p className="sp-product-desc">{p.desc}</p>
                </div>
                <a
                  href={p.url === "#" ? "#!" : p.url}
                  onClick={(e) => { if (p.url === "#") e.preventDefault(); }}
                  target={isLive ? "_blank" : "_self"}
                  rel={isLive ? "noopener" : ""}
                  className={"sp-product-cta " + (isLive ? "sp-product-cta-live" : "sp-product-cta-ghost")}
                >
                  {p.cta}
                  <Icon name="arrow-right" size={14} />
                </a>
                <div className={"sp-product-bar sp-product-bar-" + p.color} />
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
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
            <ul>{t.product_links.map((l) => <li key={l}><a href="#!" onClick={(e) => handlePageClick(e, l)}>{l}</a></li>)}</ul>
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
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [openMobile, setOpenMobile] = uS(false);
  const [activePage, setActivePage] = uS(null);

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
      />
      <main>
        <Hero lang={t.lang} />
        <TrustStrip lang={t.lang} />
        <Suite lang={t.lang} />
        <Demo lang={t.lang} />
        <Features lang={t.lang} />
        <Workflow lang={t.lang} />
        <Pricing lang={t.lang} />
        <FAQ lang={t.lang} />
        <CTABand lang={t.lang} />
      </main>
      <Footer lang={t.lang} logoVariant={t.logoVariant} setActivePage={setActivePage} />

      <PageModal
        title={activePage}
        content={activePage ? window.T[t.lang].pages[activePage] : null}
        onClose={() => setActivePage(null)}
      />

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
