/**
 * Cloudflare Web Analytics: sin cookies, sin banner de consentimiento y sin
 * enviar nada a terceros fuera de Cloudflare, donde el sitio ya está alojado.
 *
 * El token se lee de NEXT_PUBLIC_CF_BEACON_TOKEN en tiempo de build. Mientras
 * no exista la variable no se inyecta nada, así que en local y en preview la
 * página no envía métricas.
 */
const token = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN;

export function Analytics() {
  if (!token) return null;

  return (
    <script
      defer
      src="https://static.cloudflareinsights.com/beacon.min.js"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
