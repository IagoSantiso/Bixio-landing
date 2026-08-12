-- Unifica las tres fuentes de captación en una sola tabla y le añade lo que
-- necesita el panel de /admin.
--
-- Aplicar con:
--   npx wrangler d1 migrations apply bixio-leads --remote
--
-- Qué cambia y por qué:
--
--   lead_type   admite 'particular'. Hasta ahora solo entraban leads de
--               /comercios y /recomienda porque la home no capturaba nada.
--   segmento    sustituye a `tipo_negocio` y `perfil`. Son la misma columna
--               con tres nombres según de dónde venga el lead ("Papelería",
--               "Empresas de mudanzas", "mudanza"), y el panel los lista
--               juntos: si viven separadas hay que hacer tres consultas para
--               responder a una pregunta.
--   nombre      persona que deja el lead. `negocio` sigue siendo el nombre
--               comercial, que no siempre es el de quien escribe.
--   cta         qué botón lo generó. Sin esto se sabe qué página convierte
--               pero no qué la hace convertir, que es la mitad de la pregunta.
--   estado      seguimiento comercial. Solo se toca en comercio/prescriptor,
--               pero la columna existe para todos: un particular que pida
--               presupuesto de negocio se marca igual.
--   notas       texto libre del panel.
--
-- SQLite no deja cambiar un CHECK con ALTER TABLE, así que la tabla se
-- reconstruye. Los índices viejos se van con el DROP y se recrean al final.

ALTER TABLE leads RENAME TO leads_old;

CREATE TABLE leads (
  id                INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at        TEXT NOT NULL DEFAULT (datetime('now')),
  lead_type         TEXT NOT NULL CHECK (lead_type IN ('particular', 'comercio', 'prescriptor')),
  segmento          TEXT,
  nombre            TEXT,
  negocio           TEXT,
  poblacion         TEXT,
  contacto          TEXT NOT NULL,
  page              TEXT,
  cta               TEXT,
  utm_source        TEXT,
  utm_campaign      TEXT,
  utm_content       TEXT,
  country           TEXT,
  user_agent        TEXT,
  estado            TEXT NOT NULL DEFAULT 'nuevo'
                    CHECK (estado IN ('nuevo', 'contactado', 'conversacion', 'cerrado', 'descartado')),
  notas             TEXT,
  estado_updated_at TEXT
);

INSERT INTO leads
  (id, created_at, lead_type, segmento, negocio, poblacion, contacto,
   page, utm_source, utm_campaign, utm_content, country, user_agent)
SELECT
  id, created_at, lead_type, COALESCE(tipo_negocio, perfil), negocio, poblacion, contacto,
  page, utm_source, utm_campaign, utm_content, country, user_agent
FROM leads_old;

DROP TABLE leads_old;

-- El listado del panel ordena siempre por fecha descendente y filtra por
-- origen; el contador destacado de la cabecera filtra además por estado.
CREATE INDEX IF NOT EXISTS idx_leads_fecha ON leads (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_type_fecha ON leads (lead_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_estado ON leads (estado, lead_type);
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON leads (utm_campaign);
