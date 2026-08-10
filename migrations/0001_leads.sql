-- Leads de las páginas comerciales (/comercios y /recomienda).
--
-- Aplicar con:
--   npx wrangler d1 migrations apply bixio-leads --remote
--
-- `tipo_negocio` y `poblacion` (comercios) y `perfil` (prescriptores) no son
-- adorno: son lo que usa el agente de prospección para priorizar. Las utm_*
-- son la única forma de atribuir un lead a la ola de emails que lo trajo.

CREATE TABLE IF NOT EXISTS leads (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  lead_type     TEXT NOT NULL CHECK (lead_type IN ('comercio', 'prescriptor')),
  negocio       TEXT,
  tipo_negocio  TEXT,
  poblacion     TEXT,
  perfil        TEXT,
  contacto      TEXT NOT NULL,
  page          TEXT,
  utm_source    TEXT,
  utm_campaign  TEXT,
  utm_content   TEXT,
  country       TEXT,
  user_agent    TEXT
);

CREATE INDEX IF NOT EXISTS idx_leads_type_fecha ON leads (lead_type, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_utm_campaign ON leads (utm_campaign);
