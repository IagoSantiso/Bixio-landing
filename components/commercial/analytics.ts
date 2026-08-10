/**
 * Puente de eventos, sin dependencias ni scripts de terceros.
 *
 * El sitio no carga hoy ninguna herramienta de analítica. En vez de meter una,
 * empujamos los eventos a los tres buzones que cualquiera de ellas usa
 * (`dataLayer` de GTM, `gtag`, `plausible`). Mientras no haya ninguna cargada
 * esto es un no-op silencioso; el día que se añada el tag, los eventos ya
 * están emitidos y no hay que tocar los componentes.
 */

type EventProps = Record<string, string | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (command: string, name: string, props?: EventProps) => void;
    plausible?: (name: string, options?: { props: EventProps }) => void;
  }
}

export function trackEvent(name: string, props: EventProps = {}) {
  if (typeof window === "undefined") return;

  // `page` va en todos los eventos: los CTAs se repiten entre /comercios y
  // /recomienda y sin esto no se pueden distinguir.
  const payload: EventProps = { page: window.location.pathname, ...props };

  window.dataLayer?.push({ event: name, ...payload });
  window.gtag?.("event", name, payload);
  window.plausible?.(name, { props: payload });
}

const UTM_KEYS = ["utm_source", "utm_campaign", "utm_content"] as const;

export type Utm = Partial<Record<(typeof UTM_KEYS)[number], string>>;

const STORAGE_KEY = "bixio_utm";

/**
 * Lee las UTMs de la URL y las recuerda durante la sesión.
 *
 * Hace falta recordarlas porque el email del agente aterriza en el hero y el
 * formulario está al final de la página: si alguien navega entre /comercios y
 * /recomienda antes de enviarlo, los parámetros ya no están en la URL y el
 * lead se quedaría sin atribuir a su ola.
 */
export function readUtm(): Utm {
  if (typeof window === "undefined") return {};

  const params = new URLSearchParams(window.location.search);
  const fromUrl: Utm = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) fromUrl[key] = value;
  }

  try {
    if (Object.keys(fromUrl).length > 0) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
      return fromUrl;
    }
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Utm) : {};
  } catch {
    // Safari en modo privado puede tirar al tocar sessionStorage. Perder la
    // atribución no puede impedir que el formulario se envíe.
    return fromUrl;
  }
}
