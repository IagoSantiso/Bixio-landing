/**
 * Endpoint de captura de leads sobre D1. NO está activo todavía: para
 * enchufarlo hay que crear la base y añadir el binding (ver worker/README.md).
 *
 * Se deja escrito y versionado para que activarlo sea un paso de
 * configuración, no un desarrollo.
 */

/**
 * Tipos mínimos de las APIs de Cloudflare que usa este archivo. Se declaran
 * aquí en vez de instalar @cloudflare/workers-types para no meter una
 * definición global de Request/Response que choque con la del DOM que usa Next.
 */
interface D1Result {
  success: boolean;
}
interface D1PreparedStatement {
  bind(...values: unknown[]): D1PreparedStatement;
  run(): Promise<D1Result>;
}
interface D1Database {
  prepare(query: string): D1PreparedStatement;
}
interface Fetcher {
  fetch(request: Request): Promise<Response>;
}

export interface Env {
  LEADS: D1Database;
  /** Origen permitido, p. ej. https://bixiotag.com */
  ALLOWED_ORIGIN: string;
  ASSETS: Fetcher;
}

type LeadBody = {
  email?: string;
  segment?: string;
  partnerLead?: boolean;
  origin?: string;
  cta?: string;
  phone?: string;
  boxes?: string;
};

const EMAIL = /^[^@\s]+@[^@\s.]+\.[^@\s]+$/;

const handler = {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname !== "/api/leads") {
      // Todo lo demás lo sirve el sitio estático.
      return env.ASSETS.fetch(request);
    }

    const cors = {
      "access-control-allow-origin": env.ALLOWED_ORIGIN,
      "access-control-allow-headers": "content-type",
      "access-control-allow-methods": "POST, OPTIONS",
    };

    if (request.method === "OPTIONS") return new Response(null, { headers: cors });
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: cors });
    }

    let body: LeadBody;
    try {
      body = (await request.json()) as LeadBody;
    } catch {
      return json({ error: "JSON inválido" }, 400, cors);
    }

    const email = (body.email ?? "").trim().toLowerCase();
    if (!EMAIL.test(email) || email.length > 254) {
      return json({ error: "Email inválido" }, 400, cors);
    }

    try {
      await env.LEADS.prepare(
        `INSERT INTO leads (email, segment, partner_lead, origin, cta, phone, boxes, created_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))
         ON CONFLICT(email) DO UPDATE SET
           segment = excluded.segment,
           partner_lead = excluded.partner_lead,
           origin = excluded.origin,
           cta = excluded.cta,
           phone = COALESCE(excluded.phone, leads.phone),
           boxes = COALESCE(excluded.boxes, leads.boxes)`,
      )
        .bind(
          email,
          str(body.segment, 40),
          body.partnerLead ? 1 : 0,
          str(body.origin, 200),
          str(body.cta, 80),
          str(body.phone, 40),
          str(body.boxes, 20),
        )
        .run();
    } catch {
      return json({ error: "No se ha podido guardar" }, 500, cors);
    }

    return json({ ok: true }, 200, cors);
  },
};

export default handler;

function str(value: unknown, max: number) {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed ? trimmed.slice(0, max) : null;
}

function json(data: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...headers, "content-type": "application/json" },
  });
}
