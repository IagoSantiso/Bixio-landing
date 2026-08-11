/**
 * Captación: `POST /api/lead`.
 *
 * Un único endpoint para las tres fuentes (modal de particulares de la home,
 * formulario de /comercios y formulario de /recomienda) porque acaban en la
 * misma tabla y el panel las lee juntas. Lo único que las distingue es
 * `lead_type` y qué campos tienen sentido en cada una.
 */

import { json, type Env } from "./env";

export const LEAD_TYPES = ["particular", "comercio", "prescriptor"] as const;
export type LeadType = (typeof LEAD_TYPES)[number];

/**
 * Segmentos de particular. Cerrado a propósito: es la respuesta a "¿cuánta
 * demanda hay y de qué tipo?", y con texto libre esa pregunta no se puede
 * contestar. Los de comercio y prescriptor sí son abiertos, porque salen de
 * `components/commercial/data.ts` y cambian con el negocio.
 */
export const SEGMENTOS_PARTICULAR = ["mudanza", "casa", "trastero", "negocio"] as const;

const MAX_FIELD = 300;

type LeadPayload = Record<string, unknown>;

export function text(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, MAX_FIELD);
}

function isLeadType(value: string | null): value is LeadType {
  return value !== null && (LEAD_TYPES as readonly string[]).includes(value);
}

export async function saveLead(request: Request, env: Env): Promise<Response> {
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
  if (!isLeadType(leadType)) {
    return json({ error: "bad_lead_type" }, 400);
  }

  // `tipo_negocio` (comercios) y `perfil` (prescriptores) son el mismo dato
  // con otro nombre: en la tabla los tres viajan como `segmento`.
  const segmento = text(payload.segmento) ?? text(payload.tipo_negocio) ?? text(payload.perfil);

  if (
    leadType === "particular" &&
    (segmento === null || !(SEGMENTOS_PARTICULAR as readonly string[]).includes(segmento))
  ) {
    return json({ error: "bad_segmento" }, 400);
  }

  const lead = {
    lead_type: leadType,
    segmento,
    nombre: text(payload.nombre),
    negocio: text(payload.negocio),
    poblacion: text(payload.poblacion),
    contacto: text(payload.contacto),
    page: text(payload.page),
    cta: text(payload.cta),
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
         (lead_type, segmento, nombre, negocio, poblacion, contacto,
          page, cta, utm_source, utm_campaign, utm_content, country, user_agent)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
      .bind(
        lead.lead_type,
        lead.segmento,
        lead.nombre,
        lead.negocio,
        lead.poblacion,
        lead.contacto,
        lead.page,
        lead.cta,
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
