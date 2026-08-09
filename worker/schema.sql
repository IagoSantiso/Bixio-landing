-- Esquema de la base de leads (Cloudflare D1).
-- Aplicar con: npx wrangler d1 execute bixio-leads --remote --file worker/schema.sql

CREATE TABLE IF NOT EXISTS leads (
  email        TEXT PRIMARY KEY,
  segment      TEXT,
  partner_lead INTEGER NOT NULL DEFAULT 0,
  origin       TEXT,
  cta          TEXT,
  phone        TEXT,
  boxes        TEXT,
  created_at   TEXT NOT NULL
);

-- El lead de partner es el que alimenta el pipeline de LOI: se consulta solo.
CREATE INDEX IF NOT EXISTS idx_leads_partner ON leads (partner_lead, created_at);
CREATE INDEX IF NOT EXISTS idx_leads_segment ON leads (segment);
