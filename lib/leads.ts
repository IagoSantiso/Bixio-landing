/**
 * Captura de leads.
 *
 * El sitio es un export estático, así que el formulario necesita un endpoint
 * externo. Se configura con NEXT_PUBLIC_LEADS_ENDPOINT en las variables del
 * proyecto de Cloudflare (ver worker/README.md para montarlo sobre D1).
 *
 * Si no hay endpoint configurado, el formulario NO se rompe ni finge haber
 * enviado nada: abre el correo del usuario con el mensaje ya escrito. Un
 * embudo con fallback es mejor que un botón que traga los datos en silencio.
 */

export const LEADS_ENDPOINT = process.env.NEXT_PUBLIC_LEADS_ENDPOINT ?? "";

export type Segment = {
  value: string;
  label: string;
  /** El lead de partner es el más valioso: va marcado para el pipeline de LOI. */
  partnerLead?: boolean;
};

export const SEGMENTS: Segment[] = [
  { value: "mudanza", label: "Una mudanza" },
  { value: "casa", label: "Mi casa" },
  { value: "trastero", label: "Un trastero alquilado" },
  { value: "partner", label: "Gestiono trasteros", partnerLead: true },
];

export type LeadPayload = {
  email: string;
  segment: string;
  partnerLead: boolean;
  /** Página desde la que se abrió el formulario */
  origin: string;
  /** Botón concreto que lo abrió */
  cta: string;
  /** Solo en el formulario de partners */
  phone?: string;
  boxes?: string;
};

export const BOXES_RANGES = [
  { value: "<50", label: "Menos de 50" },
  { value: "50-150", label: "Entre 50 y 150" },
  { value: ">150", label: "Más de 150" },
];

export async function submitLead(payload: LeadPayload): Promise<"sent" | "mailto"> {
  if (!LEADS_ENDPOINT) return "mailto";

  const response = await fetch(LEADS_ENDPOINT, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...payload, createdAt: new Date().toISOString() }),
  });
  if (!response.ok) throw new Error(`El servidor respondió ${response.status}`);
  return "sent";
}

export function mailtoFor(payload: LeadPayload, address: string) {
  const subject = payload.partnerLead
    ? "Quiero ser partner de Bixio"
    : "Quiero entrar en la lista de espera de Bixio";
  const body = [
    `Email: ${payload.email}`,
    `Qué voy a organizar: ${payload.segment}`,
    payload.boxes ? `Boxes que gestiono: ${payload.boxes}` : null,
    payload.phone ? `Teléfono: ${payload.phone}` : null,
    `Origen: ${payload.origin} (${payload.cta})`,
  ]
    .filter(Boolean)
    .join("\n");

  return `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
