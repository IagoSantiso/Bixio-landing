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

  /**
   * Acceso al panel. Los tres son secretos (`npx wrangler secret put …`), no
   * variables de wrangler.jsonc: ese archivo está en el repo.
   *
   *   ADMIN_EMAIL           email del único usuario
   *   ADMIN_PASSWORD_HASH   `pbkdf2$<iteraciones>$<salt b64>$<hash b64>`,
   *                         generado con `npm run admin:password`
   *   ADMIN_SESSION_SECRET  clave para firmar la cookie de sesión; una cadena
   *                         larga y aleatoria, cambiarla cierra las sesiones
   *
   * Si falta cualquiera de los tres, /admin responde 503 con instrucciones.
   * Nunca hay usuario por defecto: un panel de leads sin contraseña puesta es
   * peor que un panel que no existe.
   */
  ADMIN_EMAIL?: string;
  ADMIN_PASSWORD_HASH?: string;
  ADMIN_SESSION_SECRET?: string;
}

export function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}
