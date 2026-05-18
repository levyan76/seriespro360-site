# Checkpoint SeriesPro360 - 2026-05-15

## Travaux réalisés aujourd'hui
- **Formulaire de Notification** : Ajouté à la page d'accueil avec les champs Nom, Email et Type d'entreprise (dropdown).
- **Internationalisation** : Toutes les étiquettes du formulaire sont traduites en FR et EN.
- **Correction i18n** : Nettoyage des doublons dans `i18n.jsx`.
- **Build** : Le site a été compilé avec succès (`dist/landing.js`).

## Configuration Cloudflare (À faire demain)
Voici les codes prêts pour le déploiement sur Cloudflare Workers :

### 1. `wrangler.jsonc` (Configuration)
```json
{
  "$schema": "node_modules/wrangler/config-schema.json",
  "name": "seriespro-notify-worker",
  "main": "src/index.ts",
  "compatibility_date": "2025-02-04",
  "send_email": [
    {
      "name": "SEND_EMAIL"
    }
  ]
}
```

### 2. `src/index.ts` (Logique du Worker)
```typescript
export default {
  async fetch(request, env) {
    // Gestion du CORS pour permettre les appels depuis le site web
    if (request.method === "OPTIONS") {
      return new Response(null, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }

    if (request.method === "POST") {
      try {
        const data = await request.json();
        const { name, email, type } = data;

        // Notification par email
        await env.SEND_EMAIL.send({
          from: "notifications@seriespro360.com",
          to: "votre-email@exemple.com", // REMPLACER PAR VOTRE EMAIL
          subject: `Nouveau prospect : ${name} (${type})`,
          text: `Détails du prospect :\n\nNom: ${name}\nEmail: ${email}\nType d'entreprise: ${type}`,
        });

        return new Response(JSON.stringify({ success: true }), {
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      } catch (e) {
        return new Response(JSON.stringify({ error: e.message }), {
          status: 500,
          headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" }
        });
      }
    }

    return new Response("Not Found", { status: 404 });
  }
}
```

## Prochaines étapes
1. Déployer le Worker sur votre compte Cloudflare.
2. Récupérer l'URL du Worker déployé.
3. Dans `landing.jsx`, remplacer la simulation `setTimeout` dans `handleSubmit` par un `fetch` vers l'URL de votre Worker.
