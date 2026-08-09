/** Datos del sitio usados por metadatos, sitemap, schema y navegación. */

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://bixiotag.com").replace(
  /\/$/,
  "",
);

export const SITE_NAME = "Bixio";

/**
 * Definición en una frase. Se repite casi literal en el hero, en llms.txt y en
 * el JSON-LD: es la frase que queremos que cite un buscador o un asistente.
 */
export const ONE_LINER =
  "Bixio es una app de inventario doméstico: pegas un tag NFC en cada caja, haces una foto del contenido y la IA cataloga lo que hay dentro, para que luego encuentres cualquier objeto buscando su nombre sin abrir ninguna caja.";

/**
 * Buzón al que van los botones de "Solicitar condiciones" de /trasteros.
 * CONFIRMAR que existe antes de publicar: si no, esos leads se pierden.
 */
export const PARTNERS_EMAIL = "partners@bixiotag.com";

export const PARTNERS_MAILTO = `mailto:${PARTNERS_EMAIL}?subject=${encodeURIComponent(
  "Condiciones para trasteros",
)}`;

export const MAIN_NAV = [
  { href: "/particulares", label: "Para tu casa" },
  { href: "/trasteros", label: "Para trasteros" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
  { href: "/#precios", label: "Precios" },
];

export const LEGAL_NAV = [
  { href: "/legal/aviso-legal", label: "Aviso legal" },
  { href: "/legal/privacidad", label: "Privacidad" },
  { href: "/legal/condiciones", label: "Condiciones" },
  { href: "/legal/cookies", label: "Cookies" },
];

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
