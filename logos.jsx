// logos.jsx — SeriesPro360 brand marks + product icons
// Three evolutions of the SeriesPro360 logo (Variant A, B, C)
// Product marks share a 24×24 square frame, color-coded per app.

const SP_FONT_DISPLAY = { fontFamily: "'Space Grotesk', sans-serif" };
const SP_FONT_MONO = { fontFamily: "'JetBrains Mono', monospace" };

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT A — "Strata"
// Stacked horizontal precision-bars (like a building cross-section / spirit level)
// Wordmark: SeriesPro with 360 as orange accent
// ─────────────────────────────────────────────────────────────────────────────
function LogoStrata({ size = 28, color = "currentColor", accent = "var(--sp-accent)", wordmark = true, mono = false }) {
  const c = mono ? color : color;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, ...SP_FONT_DISPLAY }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="0" y="0" width="32" height="32" rx="6" fill={c} />
        {/* Three precision bars of decreasing length — top-aligned to a left rail */}
        <rect x="6" y="8"  width="20" height="2.5" rx="1" fill={mono ? "transparent" : accent} stroke={mono ? accent : "none"} strokeWidth={mono ? 1.5 : 0} />
        <rect x="6" y="14.75" width="14" height="2.5" rx="1" fill={mono ? accent : accent} opacity={mono ? 1 : 0.55} />
        <rect x="6" y="21.5"  width="8"  height="2.5" rx="1" fill={mono ? accent : accent} opacity={mono ? 1 : 0.85} />
      </svg>
      {wordmark && (
        <span style={{ fontWeight: 600, fontSize: size * 0.62, letterSpacing: "-0.02em", lineHeight: 1, color: c }}>
          SeriesPro<span style={{ color: accent, fontWeight: 500 }}>360</span>
        </span>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT B — "Compass" (360 loop)
// A circle (the 360°) with three measurement ticks. Refined, instrument-like.
// ─────────────────────────────────────────────────────────────────────────────
function LogoCompass({ size = 28, color = "currentColor", accent = "var(--sp-accent)", wordmark = true }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, ...SP_FONT_DISPLAY }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="0" y="0" width="32" height="32" rx="6" fill={color} />
        <circle cx="16" cy="16" r="7.5" stroke={accent} strokeWidth="2" fill="none" />
        {/* Three precision ticks at 0°, 120°, 240° — quarter-arc style */}
        <line x1="16" y1="5" x2="16" y2="8" stroke={accent} strokeWidth="2" strokeLinecap="round" />
        <line x1="25.5" y1="21.5" x2="22.9" y2="20" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <line x1="6.5" y1="21.5" x2="9.1" y2="20" stroke={accent} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        {/* Center dot */}
        <circle cx="16" cy="16" r="1.5" fill={accent} />
      </svg>
      {wordmark && (
        <span style={{ fontWeight: 600, fontSize: size * 0.62, letterSpacing: "-0.02em", lineHeight: 1, color }}>
          SeriesPro<span style={{ color: accent, fontWeight: 500 }}>360</span>
        </span>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT C — "Bracket" (Carpenter's square — current logo evolved)
// Two L-brackets forming a square, accent corner highlighted.
// Direct evolution of the existing blue-square-orange-square logo.
// ─────────────────────────────────────────────────────────────────────────────
function LogoBracket({ size = 28, color = "currentColor", accent = "var(--sp-accent)", wordmark = true }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 10, ...SP_FONT_DISPLAY }}>
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="0" y="0" width="32" height="32" rx="6" fill={color} />
        {/* Outer L-bracket */}
        <path d="M7 7 H21 V11 H11 V25 H7 Z" fill={accent} opacity="0.95" />
        {/* Inner accent dot — the "360" reference */}
        <rect x="17" y="17" width="8" height="8" rx="1.5" fill={accent} opacity="0.55" />
      </svg>
      {wordmark && (
        <span style={{ fontWeight: 600, fontSize: size * 0.62, letterSpacing: "-0.02em", lineHeight: 1, color }}>
          SeriesPro<span style={{ color: accent, fontWeight: 500 }}>360</span>
        </span>
      )}
    </span>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// VARIANT D — "Real" (vrai logo PNG officiel FR)
// ─────────────────────────────────────────────────────────────────────────────
function LogoReal({ orientation = "horizontal" }) {
  const src = orientation === "vertical"
    ? "/logos/logo-sp360-transp-1.png"
    : "/logos/logo-sp360-transp-2.png";
  return (
    <img
      src={src}
      alt="SeriesPro360"
      style={{ height: "100%", width: "auto", maxWidth: 240, objectFit: "contain", display: "block" }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Logo router (driven by tweaks)
// ─────────────────────────────────────────────────────────────────────────────
function Logo({ variant = "strata", ...rest }) {
  if (variant === "real")    return <LogoReal {...rest} />;
  if (variant === "compass") return <LogoCompass {...rest} />;
  if (variant === "bracket") return <LogoBracket {...rest} />;
  return <LogoStrata {...rest} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Product marks — one glyph per app in the suite
// Color-coded; same 24×24 frame for a cohesive family.
// ─────────────────────────────────────────────────────────────────────────────
const PRODUCT_COLORS = {
  orange: { bg: "#FF6B1A", on: "#fff" },
  blue:   { bg: "#3B82F6", on: "#fff" },
  green:  { bg: "#10B981", on: "#fff" },
  yellow: { bg: "#EAB308", on: "#0a0a0a" },
};

// PNG logo map for products with official transparent logos
const PRODUCT_LOGO_MAP = {
  "CalcuPro360":  "/logos/calcupro360-transparent.png",
  "TrimPro360":   "/logos/trimpro360-transparent.png",
  "MesurePro360": "/logos/measurepro360-transparent.png",
  "PanelPro360":  "/logos/Logos PanelPro360/logo-PanelPro360-transparent.png",
};

function ProductMark({ kind, color, size = 40 }) {
  // Use official PNG transparent logo if available
  const pngSrc = PRODUCT_LOGO_MAP[kind];
  if (pngSrc) {
    return (
      <img
        src={pngSrc}
        alt={kind}
        style={{
          width: size,
          height: size,
          objectFit: "contain",
          borderRadius: size * 0.12,
          display: "block",
        }}
      />
    );
  }

  // SVG fallback for products without a PNG logo
  const map = {
    // DevisPro360 — document with search lens
    DevisPro360: { color: "green", glyph: (c) => (
      <g stroke={c} strokeWidth="1.6" strokeLinecap="round" fill="none">
        {/* Document folded corner */}
        <path d="M6 4.5 H13 L17 8.5 V19.5 H6 Z" />
        <path d="M13 4.5 V8.5 H17" opacity="0.6" />
        <line x1="8" y1="11" x2="14.5" y2="11" opacity="0.55" />
        <line x1="8" y1="13.5" x2="13" y2="13.5" opacity="0.55" />
        {/* Magnifier overlay on lower-right */}
        <circle cx="14.5" cy="16" r="2.2" fill={c} stroke="none" opacity="0.95" />
        <line x1="16.1" y1="17.6" x2="17.8" y2="19.3" stroke={c} strokeWidth="1.6" />
      </g>
    )},
    // ThermoPro — thermometer + heat dot
    ThermoPro: { color: "yellow", glyph: (c) => (
      <g stroke={c} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none">
        {/* Thermometer body */}
        <path d="M12 4.5 a2 2 0 0 1 2 2 V14 a3 3 0 1 1 -4 0 V6.5 a2 2 0 0 1 2 -2 z" />
        <circle cx="12" cy="16.5" r="1.4" fill={c} stroke="none" />
        {/* Bulb level fill — small extra line */}
        <line x1="12" y1="9" x2="12" y2="14" />
      </g>
    )},
  };
  const def = map[kind] || map.DevisPro360;
  const palette = PRODUCT_COLORS[color || def.color] || PRODUCT_COLORS.orange;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="0" y="0" width="24" height="24" rx="5" fill={palette.bg} />
      {def.glyph(palette.on)}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Misc UI icons (inline SVG — avoids dependency on Lucide etc.)
// ─────────────────────────────────────────────────────────────────────────────
function Icon({ name, size = 16, stroke = "currentColor" }) {
  const props = {
    width: size, height: size, viewBox: "0 0 24 24", fill: "none",
    stroke, strokeWidth: 1.75, strokeLinecap: "round", strokeLinejoin: "round",
  };
  switch (name) {
    case "arrow-right": return <svg {...props}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 5 19 12 13 19" /></svg>;
    case "arrow-down":  return <svg {...props}><line x1="12" y1="5" x2="12" y2="19" /><polyline points="5 13 12 19 19 13" /></svg>;
    case "check":       return <svg {...props}><polyline points="4 12 10 18 20 6" /></svg>;
    case "plus":        return <svg {...props}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>;
    case "minus":       return <svg {...props}><line x1="5" y1="12" x2="19" y2="12" /></svg>;
    case "sun":         return <svg {...props}><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="5" /><line x1="12" y1="19" x2="12" y2="22" /><line x1="2" y1="12" x2="5" y2="12" /><line x1="19" y1="12" x2="22" y2="12" /><line x1="4.9" y1="4.9" x2="7" y2="7" /><line x1="17" y1="17" x2="19.1" y2="19.1" /><line x1="4.9" y1="19.1" x2="7" y2="17" /><line x1="17" y1="7" x2="19.1" y2="4.9" /></svg>;
    case "moon":        return <svg {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" /></svg>;
    case "download":    return <svg {...props}><line x1="12" y1="3" x2="12" y2="15" /><polyline points="6 11 12 17 18 11" /><line x1="4" y1="21" x2="20" y2="21" /></svg>;
    case "file":        return <svg {...props}><path d="M14 3 H7 a2 2 0 0 0 -2 2 v14 a2 2 0 0 0 2 2 h10 a2 2 0 0 0 2 -2 V8 z" /><polyline points="14 3 14 8 19 8" /></svg>;
    case "zap":         return <svg {...props}><polygon points="13 2 4 13 11 13 9 22 20 11 13 11 15 2" /></svg>;
    case "ruler":       return <svg {...props}><path d="M2 13 L13 2 L22 11 L11 22 Z" /><line x1="5.5" y1="9.5" x2="7.5" y2="11.5" /><line x1="8.5" y1="6.5" x2="11.5" y2="9.5" /><line x1="11.5" y1="3.5" x2="13.5" y2="5.5" /></svg>;
    case "cpu":         return <svg {...props}><rect x="5" y="5" width="14" height="14" rx="2" /><rect x="9" y="9" width="6" height="6" /><line x1="9" y1="2" x2="9" y2="4" /><line x1="15" y1="2" x2="15" y2="4" /><line x1="9" y1="20" x2="9" y2="22" /><line x1="15" y1="20" x2="15" y2="22" /><line x1="2" y1="9" x2="4" y2="9" /><line x1="2" y1="15" x2="4" y2="15" /><line x1="20" y1="9" x2="22" y2="9" /><line x1="20" y1="15" x2="22" y2="15" /></svg>;
    case "shield":      return <svg {...props}><path d="M12 2 L4 6 v6 c0 5 3.5 9 8 10 4.5 -1 8 -5 8 -10 V6 z" /></svg>;
    case "wifi-off":    return <svg {...props}><line x1="2" y1="2" x2="22" y2="22" /><path d="M8.5 16.4 a5 5 0 0 1 7 0" /><path d="M2 8.8 a17 17 0 0 1 3.7 -2.4" /><path d="M22 8.8 a17 17 0 0 0 -8 -3.8" /><line x1="12" y1="20" x2="12.01" y2="20" /></svg>;
    case "globe":       return <svg {...props}><circle cx="12" cy="12" r="9" /><line x1="3" y1="12" x2="21" y2="12" /><path d="M12 3 a13 13 0 0 1 0 18 a13 13 0 0 1 0 -18 z" /></svg>;
    case "menu":        return <svg {...props}><line x1="4" y1="7" x2="20" y2="7" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="17" x2="14" y2="17" /></svg>;
    case "x":           return <svg {...props}><line x1="6" y1="6" x2="18" y2="18" /><line x1="6" y1="18" x2="18" y2="6" /></svg>;
    case "chevron-down":return <svg {...props}><polyline points="6 9 12 15 18 9" /></svg>;
    case "star":        return <svg {...props}><polygon points="12 3 14.5 9.5 21 10 16 14.5 17.5 21 12 17.5 6.5 21 8 14.5 3 10 9.5 9.5" /></svg>;
    default: return null;
  }
}

window.Logo = Logo;
window.LogoStrata = LogoStrata;
window.LogoCompass = LogoCompass;
window.LogoBracket = LogoBracket;
window.ProductMark = ProductMark;
window.Icon = Icon;
