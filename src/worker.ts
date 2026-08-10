/**
 * Worker del sitio.
 *
 * La landing sigue siendo un export estático (`out/`), que Cloudflare sirve
 * directamente desde el binding de assets. Este script solo se ejecuta en las
 * rutas listadas en `run_worker_first` de wrangler.jsonc, que son las cuatro
 * cosas que un montón de HTML no puede hacer:
 *
 *   POST /api/lead   guardar los leads de /comercios y /recomienda
 *   GET  /trasteros  301 a /comercios
 *   GET  /sitemap.xml
 *   GET  /robots.txt
 *
 * sitemap y robots se generan aquí, y no en el build, para poder usar el
 * dominio real de la petición: el repo no sabe en qué dominio vive el sitio.
 */

export interface Env {
  ASSETS: Fetcher;
  /**
   * Opcional a propósito. Mientras no exista la base de datos (ver README,
   * "Leads y D1") el binding no está y los leads se vuelcan a Workers Logs en
   * vez de perderse.
   */
  DB?: D1Database;
}

/** Rutas que se indexan. Las páginas nuevas son captación orgánica, no solo destino de email. */
const INDEXABLE = ["/", "/comercios", "/recomienda"];

const MAX_FIELD = 300;

type LeadPayload = Record<string, unknown>;

function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_FIELD);
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

async function saveLead(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return json({ error: "method_not_allowed" }, 405);
  }

  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return json({ error: "bad_json" }, 400);
  }

  const leadType = text(payload.lead_type);
  if (leadType !== "comercio" && leadType !== "prescriptor") {
    return json({ error: "bad_lead_type" }, 400);
  }

  const lead = {
    lead_type: leadType,
    negocio: text(payload.negocio),
    tipo_negocio: text(payload.tipo_negocio),
    poblacion: text(payload.poblacion),
    perfil: text(payload.perfil),
    contacto: text(payload.contacto),
    page: text(payload.page),
    utm_source: text(payload.utm_source),
    utm_campaign: text(payload.utm_campaign),
    utm_content: text(payload.utm_content),
    country: request.headers.get("CF-IPCountry"),
    user_agent: text(request.headers.get("User-Agent")),
  };

  // Un lead sin forma de contestar no sirve de nada.
  if (!lead.contacto) return json({ error: "missing_contact" }, 400);

  if (!env.DB) {
    // Sin binding todavía: al menos queda en Workers Logs, recuperable a mano.
    console.log("LEAD_SIN_D1", JSON.stringify(lead));
    return json({ ok: true, stored: false });
  }

  try {
    await env.DB.prepare(
      `INSERT INTO leads
         (lead_type, negocio, tipo_negocio, poblacion, perfil, contacto,
          page, utm_source, utm_campaign, utm_content, country, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        lead.lead_type,
        lead.negocio,
        lead.tipo_negocio,
        lead.poblacion,
        lead.perfil,
        lead.contacto,
        lead.page,
        lead.utm_source,
        lead.utm_campaign,
        lead.utm_content,
        lead.country,
        lead.user_agent,
      )
      .run();
    return json({ ok: true, stored: true });
  } catch (error) {
    // El lead vale más que el esquema: si el INSERT falla, queda en el log y
    // el visitante ve una confirmación, no un error que no puede resolver.
    console.error("LEAD_INSERT_ERROR", String(error), JSON.stringify(lead));
    return json({ ok: true, stored: false });
  }
}

function sitemap(origin: string) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = INDEXABLE.map(
    (path) =>
      `  <url><loc>${origin}${path}</loc><lastmod>${lastmod}</lastmod></url>`,
  ).join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml", "Cache-Control": "max-age=3600" } },
  );
}

function robots(origin: string) {
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`,
    { headers: { "Content-Type": "text/plain", "Cache-Control": "max-age=3600" } },
  );
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (path === "/api/lead") return saveLead(request, env);

    // /trasteros ya no existe: su público es el chip "Trasteros" de /comercios.
    if (path === "/trasteros") {
      return Response.redirect(new URL("/comercios", url).toString(), 301);
    }

    if (path === "/sitemap.xml") return sitemap(url.origin);
    if (path === "/robots.txt") return robots(url.origin);

    return env.ASSETS.fetch(request);
  },
};
