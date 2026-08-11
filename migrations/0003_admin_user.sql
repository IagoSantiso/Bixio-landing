-- Cuenta del panel, autogestionada desde el propio panel.
--
-- Hasta ahora las credenciales vivían en tres secretos del Worker
-- (ADMIN_EMAIL, ADMIN_PASSWORD_HASH, ADMIN_SESSION_SECRET), que solo se
-- podían cambiar con `wrangler secret put` desde una máquina con acceso a la
-- cuenta de Cloudflare. Pasan a D1 para que email y contraseña se puedan
-- crear y cambiar enteros desde `/admin/setup` y `/admin/cuenta`, con el
-- mismo nivel de acceso que ya hace falta para todo lo demás del panel:
-- nadie gana un privilegio nuevo por poder cambiar su propia contraseña.
--
-- Aplicar con:
--   npx wrangler d1 migrations apply bixio-leads --remote
--
-- No se seedea ninguna credencial aquí, ni siquiera una débil de arranque:
-- un valor por defecto en una migración queda en el historial de git para
-- siempre. La cuenta se crea la primera vez que alguien visita /admin sin
-- que exista ninguna todavía (ver src/admin/auth.ts).
--
-- Una sola fila (id = 1): un único acceso de admin, como pide el brief.

CREATE TABLE IF NOT EXISTS admin_user (
  id             INTEGER PRIMARY KEY CHECK (id = 1),
  email          TEXT NOT NULL,
  password_hash  TEXT NOT NULL,
  session_secret TEXT NOT NULL,
  updated_at     TEXT NOT NULL DEFAULT (datetime('now'))
);
