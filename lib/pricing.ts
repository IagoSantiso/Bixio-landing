/**
 * Fuente única de los precios: la usan la tabla de precios, las páginas de
 * particulares y trasteros, y el JSON-LD de ofertas. Si cambia un precio,
 * cambia aquí y se propaga a todo, incluidos los datos estructurados.
 */

export type Plan = {
  id: string;
  tagline: string;
  name: string;
  desc: string;
  /** Valor numérico para schema.org */
  amount: number;
  price: string;
  period: string;
  /** Texto de periodicidad para schema.org */
  billing: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
  badge?: string;
};

export const CURRENCY = "EUR";

export const PLANS: Plan[] = [
  {
    id: "gratis",
    tagline: "Para probar",
    name: "Gratis",
    desc: "Un armario, un trastero pequeño, o ver si esto te sirve.",
    amount: 0,
    price: "0 €",
    period: " / siempre",
    billing: "Gratis, sin caducidad",
    features: [
      "Hasta 10 cajas",
      "Catalogado por foto, con cuota mensual",
      "Búsqueda por nombre de objeto",
      "Un usuario",
    ],
    cta: "Crear cuenta",
    href: "#",
  },
  {
    id: "mudanza",
    tagline: "Pago único",
    name: "Mudanza",
    desc: "Treinta días para empaquetar, mover y desempaquetar. Sin suscripción.",
    amount: 19.99,
    price: "19,99 €",
    period: " / una vez",
    billing: "Pago único, 30 días de acceso",
    features: [
      "30 días de acceso completo",
      "Hasta 5 personas en la misma mudanza",
      "Catalogado por foto sin racanear",
      "Al acabar, pasas a anual o se borra",
    ],
    cta: "Activar mudanza",
    href: "#",
  },
  {
    id: "particulares",
    tagline: "Anual",
    name: "Particulares",
    desc: "Tu casa organizada todo el año, en una sola ubicación.",
    amount: 35,
    price: "35 €",
    period: " / año",
    billing: "Suscripción anual",
    features: [
      "Una ubicación (casa o trastero)",
      "Fotos guardadas sin caducidad",
      "Búsqueda con IA y copia de seguridad",
      "Pack de tags aparte",
    ],
    cta: "Elegir este plan",
    href: "#",
  },
  {
    id: "particulares-plus",
    tagline: "Anual",
    name: "Particulares+",
    desc: "Trastero alquilado, garaje propio y lo que hay en casa, todo junto.",
    amount: 59,
    price: "59 €",
    period: " / año",
    billing: "Suscripción anual",
    features: [
      "Trastero externo + ubicación propia",
      "Objetos sueltos de casa, no solo cajas",
      "Hasta 100 tags activables",
      "Cuenta compartida con toda la casa",
    ],
    cta: "Elegir este plan",
    href: "#",
    featured: true,
    badge: "Completa",
  },
];

export const TAG_PACK = {
  units: 100,
  price: "29 €",
  amount: 29,
};

/**
 * Comisión POR VENTA, no por recurrencia: el partner cobra cuando entra la
 * venta, y las renovaciones se las queda Bixio. Los porcentajes vienen de la
 * versión anterior de la página; CONFIRMAR que siguen siendo estos ahora que
 * no incluyen la recurrencia.
 */
export const PARTNER_COMMISSIONS = [
  { num: "40 %", label: "de cada suscripción vendida con tu enlace o tu código" },
  { num: "20 %", label: "de cada pack de tags NFC que salga de tu recepción" },
];

export const PARTNER_TERMS =
  "La comisión se cobra en la venta, no en las renovaciones: cuando el cliente renueva al año siguiente, esa suscripción ya no genera comisión. A cambio no hay cuota de alta, ni exclusividad, ni objetivos mínimos.";
