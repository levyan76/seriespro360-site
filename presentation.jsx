import T from './i18n.jsx';
import { Logo, Icon } from './logos.jsx';
import { useReveal, SectionHeader, Nav, Footer, CalcuPresentation, TWEAK_DEFAULTS, hexAlpha } from './landing.jsx';
import { useTweaks } from './tweaks-panel.jsx';

const { useState: uS, useEffect: uE } = React;

function PresentationPage() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [openMobile, setOpenMobile] = uS(false);

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
      <main style={{ paddingTop: 64 }}>
        <CalcuPresentation lang={t.lang} minimal={false} />

        <section className="sp-cta-band" style={{ padding: "80px 0", background: "var(--sp-card)" }}>
          <div className="sp-container" style={{ textAlign: "center" }}>
            <h2 className="sp-section-title" style={{ margin: "0 auto 24px" }}>
              {t.lang === "fr" ? "Prêt à transformer votre chantier ?" : "Ready to transform your jobsite?"}
            </h2>
            <a href="https://calcupro360.seriespro360.com" target="_blank" rel="noopener" className="sp-btn sp-btn-primary sp-btn-lg">
              {t.lang === "fr" ? "Accéder à l'application" : "Access the application"} <Icon name="arrow-right" size={16} />
            </a>
          </div>
        </section>
      </main>
      <Footer lang={t.lang} logoVariant={t.logoVariant} setActivePage={() => {}} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<PresentationPage />);
