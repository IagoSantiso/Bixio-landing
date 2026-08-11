/**
 * Todo lo que el panel le pregunta a D1.
 *
 * Las consultas se arman a trozos, pero cada trozo que viene del usuario va
 * como parámetro (`?`), nunca interpolado; lo único que se concatena son
 * nombres de columna elegidos de una lista cerrada.
 */

import { LEAD_TYPES, type LeadType } from "../leads";

export const ESTADOS = ["nuevo", "contactado", "conversacion", "cerrado", "descartado"] as const;
export type Estado = (typeof ESTADOS)[number];

export const ESTADO_LABEL: Record<Estado, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  conversacion: "En conversación",
  cerrado: "Cerrado (ganado)",
  descartado: "Descartado",
};

export const ORIGEN_LABEL: Record<LeadType, string> = {
  particular: "Particular",
  comercio: "Comercio",
  prescriptor: "Prescriptor",
};

/** Los dos orígenes que alimentan el pipeline de LOI. */
export const COMERCIALES: LeadType[] = ["comercio", "prescriptor"];

export type Lead = {
  id: number;
  created_at: string;
  lead_type: LeadType;
  segmento: string | null;
  nombre: string | null;
  negocio: string | null;
  poblacion: string | null;
  contacto: string;
  page: string | null;
  cta: string | null;
  utm_source: string | null;
  utm_campaign: string | null;
  utm_content: string | null;
  country: string | null;
  user_agent: string | null;
  estado: Estado;
  notas: string | null;
  estado_updated_at: string | null;
};

export type Filters = {
  /** "negocio" agrupa comercio + prescriptor: es el filtro del contador destacado. */
  origen: LeadType | "negocio" | "";
  segmento: string;
  estado: Estado | "";
  desde: string;
  hasta: string;
  q: string;
  orden: "fecha_desc" | "fecha_asc" | "origen";
  page: number;
};

export const PAGE_SIZE = 100;

const ORDER_SQL: Record<Filters["orden"], string> = {
  fecha_desc: "created_at DESC, id DESC",
  fecha_asc: "created_at ASC, id ASC",
  origen: "lead_type ASC, created_at DESC",
};

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export function parseFilters(params: URLSearchParams): Filters {
  const origen = params.get("origen") ?? "";
  const estado = params.get("estado") ?? "";
  const orden = params.get("orden") ?? "";
  const desde = params.get("desde") ?? "";
  const hasta = params.get("hasta") ?? "";
  const page = Number(params.get("p") ?? "1");

  return {
    origen:
      origen === "negocio" || (LEAD_TYPES as readonly string[]).includes(origen)
        ? (origen as Filters["origen"])
        : "",
    segmento: (params.get("segmento") ?? "").slice(0, 100),
    estado: (ESTADOS as readonly string[]).includes(estado) ? (estado as Estado) : "",
    desde: DATE_RE.test(desde) ? desde : "",
    hasta: DATE_RE.test(hasta) ? hasta : "",
    q: (params.get("q") ?? "").trim().slice(0, 100),
    orden: orden in ORDER_SQL ? (orden as Filters["orden"]) : "fecha_desc",
    page: Number.isInteger(page) && page > 0 ? page : 1,
  };
}

/** Reconstruye la query string, para enlaces que conservan los filtros. */
export function filtersToQuery(filters: Filters, overrides: Partial<Filters> = {}): string {
  const merged = { ...filters, ...overrides };
  const params = new URLSearchParams();
  if (merged.origen) params.set("origen", merged.origen);
  if (merged.segmento) params.set("segmento", merged.segmento);
  if (merged.estado) params.set("estado", merged.estado);
  if (merged.desde) params.set("desde", merged.desde);
  if (merged.hasta) params.set("hasta", merged.hasta);
  if (merged.q) params.set("q", merged.q);
  if (merged.orden !== "fecha_desc") params.set("orden", merged.orden);
  if (merged.page > 1) params.set("p", String(merged.page));
  const query = params.toString();
  return query ? `?${query}` : "";
}

function where(filters: Filters): { sql: string; binds: unknown[] } {
  const clauses: string[] = [];
  const binds: unknown[] = [];

  if (filters.origen === "negocio") {
    clauses.push("lead_type IN ('comercio', 'prescriptor')");
  } else if (filters.origen) {
    clauses.push("lead_type = ?");
    binds.push(filters.origen);
  }

  if (filters.segmento) {
    clauses.push("segmento = ?");
    binds.push(filters.segmento);
  }

  if (filters.estado) {
    clauses.push("estado = ?");
    binds.push(filters.estado);
  }

  if (filters.desde) {
    clauses.push("created_at >= ?");
    binds.push(filters.desde);
  }

  // `created_at` es "YYYY-MM-DD HH:MM:SS", así que el día final se incluye
  // entero comparando contra su último segundo.
  if (filters.hasta) {
    clauses.push("created_at <= ?");
    binds.push(`${filters.hasta} 23:59:59`);
  }

  // La búsqueda libre es "email o nombre de negocio", más el nombre de la
  // persona, que en /recomienda viene mezclado con el del negocio.
  if (filters.q) {
    clauses.push("(contacto LIKE ? OR negocio LIKE ? OR nombre LIKE ?)");
    const like = `%${filters.q}%`;
    binds.push(like, like, like);
  }

  return { sql: clauses.length ? `WHERE ${clauses.join(" AND ")}` : "", binds };
}

const COLUMNS = `id, created_at, lead_type, segmento, nombre, negocio, poblacion, contacto,
  page, cta, utm_source, utm_campaign, utm_content, country, user_agent,
  estado, notas, estado_updated_at`;

export async function listLeads(
  db: D1Database,
  filters: Filters,
  limit = PAGE_SIZE,
): Promise<{ rows: Lead[]; total: number }> {
  const clause = where(filters);
  const offset = (filters.page - 1) * PAGE_SIZE;

  const [rows, total] = await Promise.all([
    db
      .prepare(
        `SELECT ${COLUMNS} FROM leads ${clause.sql} ORDER BY ${ORDER_SQL[filters.orden]} LIMIT ? OFFSET ?`,
      )
      .bind(...clause.binds, limit, offset)
      .all<Lead>(),
    db
      .prepare(`SELECT COUNT(*) AS n FROM leads ${clause.sql}`)
      .bind(...clause.binds)
      .first<{ n: number }>(),
  ]);

  return { rows: rows.results ?? [], total: total?.n ?? 0 };
}

/** Para el export: los mismos filtros, sin paginar. */
export async function listAllLeads(db: D1Database, filters: Filters, cap = 10000): Promise<Lead[]> {
  const clause = where(filters);
  const rows = await db
    .prepare(`SELECT ${COLUMNS} FROM leads ${clause.sql} ORDER BY ${ORDER_SQL[filters.orden]} LIMIT ?`)
    .bind(...clause.binds, cap)
    .all<Lead>();
  return rows.results ?? [];
}

export async function getLead(db: D1Database, id: number): Promise<Lead | null> {
  return db.prepare(`SELECT ${COLUMNS} FROM leads WHERE id = ?`).bind(id).first<Lead>();
}

export async function updateLead(
  db: D1Database,
  id: number,
  estado: Estado,
  notas: string | null,
): Promise<void> {
  // `estado_updated_at` solo se mueve si el estado cambia de verdad: guardar
  // una nota no es haber avanzado con el lead.
  await db
    .prepare(
      `UPDATE leads
          SET notas = ?,
              estado_updated_at = CASE WHEN estado = ? THEN estado_updated_at ELSE datetime('now') END,
              estado = ?
        WHERE id = ?`,
    )
    .bind(notas, estado, estado, id)
    .run();
}

export type Counts = {
  total: number;
  particular: number;
  comercio: number;
  prescriptor: number;
  ultimos7: number;
  /** El número que manda ahora mismo: negocio sin contactar. */
  negocioNuevos: number;
};

/**
 * Contadores de cabecera. Van sin filtros a propósito: son el estado del
 * negocio, no el del filtro que tengas puesto.
 */
export async function counts(db: D1Database): Promise<Counts> {
  const row = await db
    .prepare(
      `SELECT
         COUNT(*) AS total,
         SUM(lead_type = 'particular')  AS particular,
         SUM(lead_type = 'comercio')    AS comercio,
         SUM(lead_type = 'prescriptor') AS prescriptor,
         SUM(created_at >= datetime('now', '-7 days')) AS ultimos7,
         SUM(lead_type IN ('comercio', 'prescriptor') AND estado = 'nuevo') AS negocioNuevos
       FROM leads`,
    )
    .first<Record<keyof Counts, number | null>>();

  return {
    total: row?.total ?? 0,
    particular: row?.particular ?? 0,
    comercio: row?.comercio ?? 0,
    prescriptor: row?.prescriptor ?? 0,
    ultimos7: row?.ultimos7 ?? 0,
    negocioNuevos: row?.negocioNuevos ?? 0,
  };
}

/**
 * Segmentos que existen de verdad en la tabla, para el desplegable. Se calcula
 * en vez de escribirse a mano porque los de comercio y prescriptor salen de
 * `data.ts` y cambiarían el filtro sin avisar.
 */
export async function segmentos(db: D1Database, origen: Filters["origen"]): Promise<string[]> {
  const clause =
    origen === "negocio"
      ? "AND lead_type IN ('comercio', 'prescriptor')"
      : origen
        ? "AND lead_type = ?"
        : "";
  const statement = db.prepare(
    `SELECT DISTINCT segmento FROM leads WHERE segmento IS NOT NULL ${clause} ORDER BY segmento`,
  );
  const rows = await (origen && origen !== "negocio" ? statement.bind(origen) : statement).all<{
    segmento: string;
  }>();
  return (rows.results ?? []).map((row) => row.segmento);
}
