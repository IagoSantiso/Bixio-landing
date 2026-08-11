/**
 * Worker del sitio.
 *
 * La landing sigue siendo un export estático (`out/`), que Cloudflare sirve
 * directamente desde el binding de assets. Este script solo se ejecuta en las
 * rutas listadas en `run_worker_first` de wrangler.jsonc, que son las cosas
 * que un montón de HTML no puede hacer:
 *
 *   POST /api/lead   guardar los leads de las tres fuentes de captación
 *   GET  /admin/*    panel interno de leads (ver src/admin/)
 *   GET  /trasteros  301 a /comercios
 *   GET  /sitemap.xml
 *   GET  /robots.txt
 *
 * sitemap y robots se generan aquí, y no en el build, para poder usar el
 * dominio real de la petición: el repo no sabe en qué dominio vive el sitio.
 *
 * El panel también vive aquí, y no en `app/`, porque con `output: "export"`
 * una página de Next acaba siendo un HTML en `out/` que el binding de assets
 * sirve sin ejecutar código: no habría dónde comprobar la sesión.
 */

import { handleAdmin } from "./admin";
import type { Env } from "./env";
import { saveLead } from "./leads";

export type { Env };

/** Rutas que se indexan. Las páginas nuevas son captación orgánica, no solo destino de email. */
const INDEXABLE = ["/", "/comercios", "/recomienda"];

function sitemap(origin: string) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = INDEXABLE.map(
    (path) =>
      `  <url><loc>${origin}${path}</loc><lastmod>${lastmod}</lastmod></url>`,
  ).join("\n");

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n` +
      `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml", "Cache-Control": "max-age=3600" } },
  );
}

/**
 * Todo abierto menos el panel.
 *
 * /comercios y /recomienda no están en el menú del header, pero eso es una
 * decisión de navegación, no de indexación: son URLs públicas y queremos que
 * se encuentren. Los tres rastreadores de IA van con grupo propio y explícito
 * porque un bot que coincide con un `User-agent` concreto ignora el bloque
 * `*`, y así nadie los deja fuera sin querer al tocar este archivo. Por lo
 * mismo, el `Disallow: /admin` se repite en cada grupo.
 *
 * robots.txt es solo la capa educada: /admin además exige sesión y responde
 * con `noindex` en la meta y en `X-Robots-Tag`.
 */
function robots(origin: string) {
  const groups = ["*", "GPTBot", "ClaudeBot", "PerplexityBot"]
    .map((agent) => `User-agent: ${agent}\nAllow: /\nDisallow: /admin\n`)
    .join("\n");

  return new Response(`${groups}\nSitemap: ${origin}/sitemap.xml\n`, {
    headers: { "Content-Type": "text/plain", "Cache-Control": "max-age=3600" },
  });
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    if (path === "/api/lead") return saveLead(request, env);

    if (path === "/admin" || path.startsWith("/admin/")) {
      return handleAdmin(request, env, url, path);
    }

    // /trasteros ya no existe: su público es el chip "Trasteros" de /comercios.
    if (path === "/trasteros") {
      return Response.redirect(new URL("/comercios", url).toString(), 301);
    }

    if (path === "/sitemap.xml") return sitemap(url.origin);
    if (path === "/robots.txt") return robots(url.origin);

    return env.ASSETS.fetch(request);
  },
};
