/** Export del listado, con los filtros que hubiera puestos. */

import { ESTADO_LABEL, ORIGEN_LABEL, type Lead } from "./queries";

const HEADERS = [
  "id",
  "fecha",
  "origen",
  "segmento",
  "nombre",
  "negocio",
  "poblacion",
  "contacto",
  "pagina",
  "cta",
  "utm_source",
  "utm_campaign",
  "utm_content",
  "pais",
  "estado",
  "estado_actualizado",
  "notas",
];

/**
 * Una celda de CSV.
 *
 * El prefijo con comilla simple cuando el valor empieza por `= + - @` es
 * contra la inyección de fórmulas: ese texto lo escribe cualquiera desde un
 * formulario público, y Excel ejecuta lo que parezca una fórmula al abrir el
 * archivo.
 */
function cell(value: unknown): string {
  if (value === null || value === undefined) return "";
  let text = String(value);
  if (/^[=+\-@\t\r]/.test(text)) text = `'${text}`;
  return `"${text.replace(/"/g, '""')}"`;
}

export function leadsToCsv(leads: Lead[]): string {
  const lines = [HEADERS.join(",")];

  for (const lead of leads) {
    lines.push(
      [
        lead.id,
        lead.created_at,
        ORIGEN_LABEL[lead.lead_type],
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
        ESTADO_LABEL[lead.estado],
        lead.estado_updated_at,
        lead.notas,
      ]
        .map(cell)
        .join(","),
    );
  }

  return lines.join("\r\n");
}

export function csvResponse(leads: Lead[]): Response {
  const fecha = new Date().toISOString().slice(0, 10);
  // El BOM es lo que hace que Excel abra el archivo como UTF-8 y no parta los
  // acentos. Sin él, "Papelería" llega como "PapelerÃ­a".
  return new Response(`﻿${leadsToCsv(leads)}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="bixio-leads-${fecha}.csv"`,
      "Cache-Control": "no-store, private",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}
