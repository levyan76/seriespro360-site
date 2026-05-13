// calculator.jsx — Interactive concrete slab estimator
// Real math, same defaults as CalcuPro360 in production.
// Quebec taxes: GST 5% + QST 9.975%.

const { useState, useMemo, useRef, useEffect } = React;

// ──────────────────────────────────────────────────────────────────────────────
// Core math
// Returns metric volumes (m³), imperial display where requested,
// itemized costs CAD, and a printable quote breakdown.
// ──────────────────────────────────────────────────────────────────────────────
function calcSlab({ length, width, thickness, system, waste, concretePrice, mesh, rebar, gravel, vapor }) {
  const L = Math.max(0, +length || 0);
  const W = Math.max(0, +width || 0);
  const T = Math.max(0, +thickness || 0);

  // Net volume + slab surface in m² and ft²
  let volM3, areaM2, areaFt2;
  if (system === "metric") {
    // L,W in m; T in cm
    volM3 = L * W * (T / 100);
    areaM2 = L * W;
    areaFt2 = areaM2 * 10.7639;
  } else {
    // L,W in ft; T in inches
    const ftCubed = L * W * (T / 12);
    volM3 = ftCubed * 0.0283168;
    areaFt2 = L * W;
    areaM2 = areaFt2 * 0.092903;
  }

  const wasteRate = Math.max(0, +waste || 0) / 100;
  const volWithWaste = volM3 * (1 + wasteRate);
  // Concrete delivery is typically rounded UP to the nearest 0.5 m³
  const volOrdered = Math.ceil(volWithWaste * 2) / 2;

  // Lines
  const lines = [];
  const concreteCost = volOrdered * +concretePrice;
  lines.push({
    sku: "BÉT-30MPA",
    label: system === "metric" ? "Béton 30 MPa livré" : "30 MPa concrete (delivered)",
    qty: volOrdered, unit: "m³",
    unitPrice: +concretePrice, total: concreteCost,
  });

  if (mesh) {
    const meshArea = areaFt2 * 1.1; // 10% overlap
    const meshCost = meshArea * 1.40;
    lines.push({
      sku: "TREILL-6×6",
      label: "Treillis soudé 6×6 W2.9×W2.9",
      qty: Math.ceil(meshArea), unit: "pi²", unitPrice: 1.40, total: meshCost,
    });
  }
  if (rebar) {
    const rebarLF = areaFt2 * 1.5; // both directions, 16" OC
    const rebarCost = rebarLF * 0.55;
    lines.push({
      sku: "REBAR-#4",
      label: "Barres d'armature #4 @ 16\" OC",
      qty: Math.ceil(rebarLF), unit: "pi", unitPrice: 0.55, total: rebarCost,
    });
  }
  if (gravel) {
    // 4" gravel base
    const gravelYd3 = (areaFt2 * (4 / 12)) / 27;
    const gravelCost = gravelYd3 * 40;
    lines.push({
      sku: "GRAV-3/4",
      label: "Gravier concassé 3/4\" — lit 4\"",
      qty: +gravelYd3.toFixed(2), unit: "vg³", unitPrice: 40, total: gravelCost,
    });
  }
  if (vapor) {
    const vapArea = areaFt2 * 1.15; // overlap + edges
    const vapCost = vapArea * 0.22;
    lines.push({
      sku: "POLY-6MIL",
      label: "Pare-vapeur polyéthylène 6 mil",
      qty: Math.ceil(vapArea), unit: "pi²", unitPrice: 0.22, total: vapCost,
    });
  }

  const subtotal = lines.reduce((s, l) => s + l.total, 0);
  const tps = subtotal * 0.05;
  const tvq = subtotal * 0.09975;
  const total = subtotal + tps + tvq;

  return {
    volM3, volWithWaste, volOrdered, areaM2, areaFt2,
    lines, subtotal, tps, tvq, total,
  };
}

function fmtCAD(n, lang = "fr") {
  return new Intl.NumberFormat(lang === "fr" ? "fr-CA" : "en-CA", {
    style: "currency", currency: "CAD", minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(n || 0);
}
function fmtNum(n, dig = 2) {
  return (Math.round((n || 0) * Math.pow(10, dig)) / Math.pow(10, dig)).toLocaleString(undefined, {
    minimumFractionDigits: dig, maximumFractionDigits: dig,
  });
}

// ──────────────────────────────────────────────────────────────────────────────
// Inputs — number stepper with unit suffix
// ──────────────────────────────────────────────────────────────────────────────
function NumField({ label, value, onChange, unit, step = 0.5, min = 0, max = 9999 }) {
  const inc = (d) => onChange(Math.max(min, Math.min(max, +(value + d * step).toFixed(2))));
  return (
    <label style={{ display: "block" }}>
      <div className="sp-input-label">{label}</div>
      <div className="sp-input-stepper">
        <button type="button" className="sp-step" onClick={() => inc(-1)} aria-label="−"><Icon name="minus" size={14} /></button>
        <input
          type="number" value={value} step={step} min={min} max={max}
          onChange={(e) => onChange(e.target.value === "" ? 0 : +e.target.value)}
          className="sp-step-input"
        />
        <span className="sp-step-unit">{unit}</span>
        <button type="button" className="sp-step" onClick={() => inc(1)} aria-label="+"><Icon name="plus" size={14} /></button>
      </div>
    </label>
  );
}

function ToggleChip({ active, onClick, children }) {
  return (
    <button type="button" onClick={onClick} className={"sp-chip" + (active ? " is-on" : "")}>
      <span className={"sp-chip-dot" + (active ? " is-on" : "")} />
      {children}
    </button>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// PDF Quote modal — printable representation of the live estimate
// ──────────────────────────────────────────────────────────────────────────────
function QuoteModal({ open, onClose, est, system, lang, t }) {
  if (!open) return null;
  const date = new Date().toLocaleDateString(lang === "fr" ? "fr-CA" : "en-CA", {
    year: "numeric", month: "long", day: "numeric"
  });
  const quoteNum = "SP-" + String(Math.floor(Math.random() * 9000) + 1000);

  return (
    <div className="sp-modal-backdrop" onClick={onClose}>
      <div className="sp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="sp-modal-bar">
          <span className="sp-modal-bar-title">
            {lang === "fr" ? "Aperçu devis PDF" : "PDF quote preview"}
          </span>
          <div className="sp-modal-bar-actions">
            <button className="sp-btn sp-btn-ghost-sm" onClick={() => window.print()}>
              <Icon name="download" size={14} /> {lang === "fr" ? "Imprimer / PDF" : "Print / PDF"}
            </button>
            <button className="sp-modal-x" onClick={onClose} aria-label="Close"><Icon name="x" size={16} /></button>
          </div>
        </div>
        <div className="sp-quote-page">
          <header className="sp-quote-head">
            <div>
              <Logo size={28} />
              <div className="sp-quote-company">
                Construction Demo Inc.<br />
                418, rue Saint-Joseph Est<br />
                Québec, QC G1K 3B1<br />
                RBQ 5678-1234-01 · NEQ 1170123456
              </div>
            </div>
            <div className="sp-quote-meta">
              <div className="sp-quote-meta-title">
                {lang === "fr" ? "DEVIS" : "QUOTE"}
              </div>
              <table>
                <tbody>
                  <tr><td>{lang === "fr" ? "Nº" : "No"}</td><td>{quoteNum}</td></tr>
                  <tr><td>Date</td><td>{date}</td></tr>
                  <tr><td>{lang === "fr" ? "Validité" : "Valid"}</td><td>30 j</td></tr>
                </tbody>
              </table>
            </div>
          </header>

          <section className="sp-quote-client">
            <div className="sp-quote-section-title">{lang === "fr" ? "CLIENT" : "CLIENT"}</div>
            <div>
              <strong>Lefebvre, Marc</strong><br />
              125, chemin du Lac-Beauport<br />
              Lac-Beauport, QC G3B 0A1<br />
              {lang === "fr" ? "Projet : Dalle de garage détaché" : "Project: Detached garage slab"}
            </div>
          </section>

          <table className="sp-quote-table">
            <thead>
              <tr>
                <th style={{ width: 80 }}>SKU</th>
                <th>{lang === "fr" ? "Description" : "Description"}</th>
                <th style={{ width: 70, textAlign: "right" }}>{lang === "fr" ? "Qté" : "Qty"}</th>
                <th style={{ width: 50 }}>U</th>
                <th style={{ width: 90, textAlign: "right" }}>{lang === "fr" ? "Prix u." : "Unit"}</th>
                <th style={{ width: 100, textAlign: "right" }}>Total</th>
              </tr>
            </thead>
            <tbody>
              {est.lines.map((l) => (
                <tr key={l.sku}>
                  <td className="mono">{l.sku}</td>
                  <td>{l.label}</td>
                  <td style={{ textAlign: "right" }} className="mono">{fmtNum(l.qty, 2)}</td>
                  <td className="mono">{l.unit}</td>
                  <td style={{ textAlign: "right" }} className="mono">{fmtCAD(l.unitPrice, lang)}</td>
                  <td style={{ textAlign: "right" }} className="mono">{fmtCAD(l.total, lang)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="sp-quote-totals">
            <table>
              <tbody>
                <tr><td>{t.subtotal}</td><td className="mono">{fmtCAD(est.subtotal, lang)}</td></tr>
                <tr><td>{t.tps}</td><td className="mono">{fmtCAD(est.tps, lang)}</td></tr>
                <tr><td>{t.tvq}</td><td className="mono">{fmtCAD(est.tvq, lang)}</td></tr>
                <tr className="sp-quote-grand">
                  <td>{t.total}</td>
                  <td className="mono">{fmtCAD(est.total, lang)}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <footer className="sp-quote-foot">
            <div>
              {lang === "fr"
                ? "Conditions : prix valides 30 jours. Acompte 30% à la signature. Solde à la livraison du béton. Garantie 1 an sur la fissuration."
                : "Terms: prices valid 30 days. 30% deposit at signature. Balance on concrete delivery. 1-year crack warranty."}
            </div>
            <div className="sp-quote-foot-brand">
              {lang === "fr" ? "Généré par" : "Generated by"} <strong>SeriesPro360 · CalcuPro360</strong>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// Main estimator widget
// ──────────────────────────────────────────────────────────────────────────────
function SlabEstimator({ lang, t, compact = false }) {
  const [system, setSystem] = useState("imperial");   // imperial is default for QC chantier
  const [length, setLength] = useState(24);            // 24 ft
  const [width, setWidth] = useState(22);              // 22 ft
  const [thickness, setThickness] = useState(4);       // 4 in
  const [waste, setWaste] = useState(10);
  const [price, setPrice] = useState(185);
  const [mesh, setMesh] = useState(true);
  const [rebar, setRebar] = useState(false);
  const [gravel, setGravel] = useState(true);
  const [vapor, setVapor] = useState(true);
  const [showQuote, setShowQuote] = useState(false);
  const [toast, setToast] = useState("");

  // Convert L/W defaults when switching units
  const switchSystem = (next) => {
    if (next === system) return;
    if (next === "metric") {
      setLength(+(length * 0.3048).toFixed(2));
      setWidth(+(width * 0.3048).toFixed(2));
      setThickness(+(thickness * 2.54).toFixed(1));
    } else {
      setLength(+(length / 0.3048).toFixed(2));
      setWidth(+(width / 0.3048).toFixed(2));
      setThickness(+(thickness / 2.54).toFixed(1));
    }
    setSystem(next);
  };

  const est = useMemo(
    () => calcSlab({ length, width, thickness, system, waste, concretePrice: price, mesh, rebar, gravel, vapor }),
    [length, width, thickness, system, waste, price, mesh, rebar, gravel, vapor]
  );

  const reset = () => {
    setSystem("imperial"); setLength(24); setWidth(22); setThickness(4);
    setWaste(10); setPrice(185); setMesh(true); setRebar(false); setGravel(true); setVapor(true);
  };

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(showToast._t);
    showToast._t = setTimeout(() => setToast(""), 2400);
  };

  const lUnit = system === "metric" ? "m" : "ft";
  const tUnit = system === "metric" ? "cm" : "in";

  return (
    <div className="sp-estimator">
      <div className="sp-est-grid">
        {/* LEFT — INPUTS */}
        <div className="sp-est-inputs">
          <div className="sp-est-header">
            <div>
              <div className="sp-eyebrow-mini">CalcuPro360 / {lang === "fr" ? "Béton" : "Concrete"} / {lang === "fr" ? "Dalle" : "Slab"}</div>
              <h3 className="sp-est-title">{t.title}</h3>
            </div>
            <div className="sp-unit-toggle" role="tablist">
              <button onClick={() => switchSystem("metric")}   className={system === "metric" ? "is-on" : ""}>{t.unit_metric}</button>
              <button onClick={() => switchSystem("imperial")} className={system === "imperial" ? "is-on" : ""}>{t.unit_imperial}</button>
            </div>
          </div>

          <div className="sp-input-row sp-input-row-3">
            <NumField label={t.length}    value={length}    onChange={setLength}    unit={lUnit} step={0.5} />
            <NumField label={t.width}     value={width}     onChange={setWidth}     unit={lUnit} step={0.5} />
            <NumField label={t.thickness} value={thickness} onChange={setThickness} unit={tUnit} step={0.5} />
          </div>

          <div className="sp-input-row sp-input-row-2">
            <NumField label={t.waste} value={waste} onChange={setWaste} unit="%" step={1} max={50} />
            <NumField label={t.price} value={price} onChange={setPrice} unit="$/m³" step={5} max={500} />
          </div>

          <div className="sp-opts">
            <div className="sp-input-label">{t.reinforce}</div>
            <div className="sp-opts-row">
              <ToggleChip active={!mesh && !rebar} onClick={() => { setMesh(false); setRebar(false); }}>{t.rebar_none}</ToggleChip>
              <ToggleChip active={mesh}            onClick={() => { setMesh(!mesh); if (!mesh) setRebar(false); }}>{t.rebar_mesh}</ToggleChip>
              <ToggleChip active={rebar}           onClick={() => { setRebar(!rebar); if (!rebar) setMesh(false); }}>{t.rebar_bars}</ToggleChip>
            </div>
            <div className="sp-opts-row" style={{ marginTop: 10 }}>
              <ToggleChip active={gravel} onClick={() => setGravel(!gravel)}>{t.gravel}</ToggleChip>
              <ToggleChip active={vapor}  onClick={() => setVapor(!vapor)}>{t.vapor}</ToggleChip>
            </div>
          </div>

          <details className="sp-explain">
            <summary>{t.explain}</summary>
            <p>{t.explain_body}</p>
          </details>
        </div>

        {/* RIGHT — LIVE RESULT */}
        <div className="sp-est-result">
          <div className="sp-est-result-head">
            <div className="sp-eyebrow-mini sp-eyebrow-on-accent">{t.result_title}</div>
            <div className="sp-est-livedot"><span /> {lang === "fr" ? "Calcul en direct" : "Live"}</div>
          </div>

          <div className="sp-stat-grid">
            <div className="sp-stat">
              <div className="sp-stat-label">{t.vol_label}</div>
              <div className="sp-stat-value"><span className="sp-stat-num">{fmtNum(est.volM3, 2)}</span><span className="sp-stat-unit">m³</span></div>
            </div>
            <div className="sp-stat">
              <div className="sp-stat-label">{t.vol_waste}</div>
              <div className="sp-stat-value">
                <span className="sp-stat-num">{fmtNum(est.volOrdered, 2)}</span><span className="sp-stat-unit">m³</span>
              </div>
              <div className="sp-stat-sub">{lang === "fr" ? `arrondi au 0,5 m³` : `rounded to 0.5 m³`}</div>
            </div>
          </div>

          <div className="sp-quote-lines">
            {est.lines.map((l) => (
              <div className="sp-line" key={l.sku}>
                <div className="sp-line-left">
                  <span className="sp-line-sku mono">{l.sku}</span>
                  <span className="sp-line-label">{l.label}</span>
                </div>
                <div className="sp-line-right mono">
                  <span className="sp-line-qty">{fmtNum(l.qty, l.qty < 10 ? 2 : 0)} {l.unit}</span>
                  <span className="sp-line-total">{fmtCAD(l.total, lang)}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="sp-totals">
            <div className="sp-totals-row"><span>{t.subtotal}</span><span className="mono">{fmtCAD(est.subtotal, lang)}</span></div>
            <div className="sp-totals-row sp-totals-row-muted"><span>{t.tps}</span><span className="mono">{fmtCAD(est.tps, lang)}</span></div>
            <div className="sp-totals-row sp-totals-row-muted"><span>{t.tvq}</span><span className="mono">{fmtCAD(est.tvq, lang)}</span></div>
            <div className="sp-totals-row sp-totals-grand">
              <span>{t.total}</span>
              <span className="mono">{fmtCAD(est.total, lang)}</span>
            </div>
          </div>

          <div className="sp-est-actions">
            <button className="sp-btn sp-btn-primary" onClick={() => { setShowQuote(true); showToast(t.saved); }}>
              {t.generate}
            </button>
            <button className="sp-btn sp-btn-ghost" onClick={reset}>{t.reset}</button>
          </div>
        </div>
      </div>

      {toast && <div className="sp-toast">{toast}</div>}
      <QuoteModal open={showQuote} onClose={() => setShowQuote(false)} est={est} system={system} lang={lang} t={t} />
    </div>
  );
}

window.SlabEstimator = SlabEstimator;
window.calcSlab = calcSlab;
window.fmtCAD = fmtCAD;
window.fmtNum = fmtNum;
