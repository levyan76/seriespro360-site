# SeriesPro360 Site — Contexte projet pour Claude Code

> Lire ce fichier EN ENTIER avant toute intervention.

---

## Identité du projet

**seriespro360-site** — Site marketing de la suite SeriesPro360. Contient les landing pages de chaque application (CalcuPro360, DevisPro360, MesurePro360, etc.) ainsi que la page principale seriespro360.com.

- **Stack :** HTML statique + CSS + JavaScript + React JSX (landing pages)
- **Répertoire :** `D:\Applications\SeriesPro360_Suite\seriespro360-site-repo\`
- **GitHub :** levyan76/seriespro360-site (Public)
- **Priorité :** 🔴 À déployer

---

## Architecture

```
seriespro360-site-repo/
├── index.html              ← Page d'accueil SeriesPro360
├── landing.jsx             ← Landing principale React
├── calculator.jsx          ← Composant calculatrice
├── calcupro360-landing.jsx ← Landing CalcuPro360
├── calcupro360.html        ← Version HTML CalcuPro360
├── devispro360.html        ← Landing DevisPro360
├── mesurePro360.html       ← Landing MesurePro360
├── logos/                  ← Logos des apps
├── logos.jsx               ← Composant logos
├── i18n.jsx                ← Internationalisation
├── dist/                   ← Build de production
└── docs/                   ← Documentation
```

## Stack technique

| Couche | Technologie |
|--------|-------------|
| Pages | HTML statique + JSX React |
| Style | CSS vanilla |
| i18n | i18n.jsx (FR/EN) |
| Déploiement | Cloudflare Pages probable |

## Conventions

- Une landing HTML par application de la suite
- Logos cohérents dans `logos/`
- Texte bilingue FR/EN via `i18n.jsx`
- Checkpoint Cloudflare documenté : `checkpoint_cloudflare.md`

## Règles importantes

- Site vitrine — pas d'authentification ni de backend ici
- Cohérence visuelle entre toutes les landing pages (même palette SP360)
- `dist/` = build final à déployer, ne pas modifier manuellement
