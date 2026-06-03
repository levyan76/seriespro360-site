/**
 * SeriesPro360 — Cloudflare Worker : formulaire notification liste d'attente
 *
 * Déploiement :
 *   cd worker
 *   npm install wrangler --save-dev
 *   npx wrangler deploy
 *
 * Après déploiement, mettre à jour NOTIFY_WORKER_URL dans landing.jsx
 * avec l'URL réelle : https://seriespro-notify-worker.{account}.workers.dev/notify
 *
 * Email de réception : mettre à jour TO_EMAIL ci-dessous.
 */

const TO_EMAIL = "levyan76@gmail.com";
const FROM_EMAIL = "notifications@seriespro360.com";

export interface Env {
  SEND_EMAIL: SendEmail;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const origin = request.headers.get("Origin") || "";
    const allowedOrigins = [
      "https://seriespro360.com",
      "https://www.seriespro360.com",
      "http://localhost:3000",
      "http://localhost:5173"
    ];
    const corsHeaders = {
      "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : allowedOrigins[0],
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    // Pré-vérification CORS
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);

    if (request.method === "POST" && url.pathname === "/notify") {
      try {
        const data = await request.json() as { name?: string; email?: string; type?: string };
        const { name, email, type } = data;

        // Validation basique côté serveur
        if (!name || !email || !type) {
          return new Response(
            JSON.stringify({ error: "Champs manquants." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        // Validation format email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          return new Response(
            JSON.stringify({ error: "Adresse courriel invalide." }),
            { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
          );
        }

        await env.SEND_EMAIL.send({
          from: FROM_EMAIL,
          to: TO_EMAIL,
          subject: `🔔 Nouveau prospect SeriesPro360 : ${name} (${type})`,
          text: [
            "Nouveau prospect inscrit sur la liste d'attente :",
            "",
            `Nom : ${name}`,
            `Courriel : ${email}`,
            `Type d'entreprise : ${type}`,
            "",
            "---",
            "SeriesPro360 · seriespro360.com",
          ].join("\n"),
        });

        return new Response(
          JSON.stringify({ success: true }),
          { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Erreur inconnue";
        console.error("Worker error:", msg);
        return new Response(
          JSON.stringify({ error: "Erreur serveur. Veuillez réessayer." }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    }

    return new Response("Not Found", { status: 404 });
  },
};
