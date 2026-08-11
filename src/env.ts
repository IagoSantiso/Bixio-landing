/** Bindings y secretos del Worker. */
export interface Env {
  ASSETS: Fetcher;
  /**
   * Opcional a propósito. Mientras no exista la base de datos (ver README,
   * "Leads y D1") el binding no está y los leads se vuelcan a Workers Logs en
   * vez de perderse. El panel de /admin sí la necesita y lo dice claramente si
   * falta, en vez de fallar con un 500.
   */
  DB?: D1Database;

  // Sin secretos de acceso al panel: la cuenta (email, contraseña, clave de
  // sesión) vive en D1 (`admin_user`, ver migrations/0003_admin_user.sql).
  // Se crea la primera vez que alguien visita /admin sin que exista ninguna
  // todavía (`/admin/setup`) y se cambia después desde `/admin/cuenta`. Ver
  // src/admin/auth.ts.
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
