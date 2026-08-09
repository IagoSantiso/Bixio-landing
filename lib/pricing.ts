/**
 * Fuente única de precios y condiciones. La usan la tabla de precios, las
 * páginas, el JSON-LD de ofertas, la página de condiciones y llms.txt.
 *
 * Los tags van INCLUIDOS en los planes de pago (decisión D2 del brief): antes
 * el usuario sumaba 35 € + 29 € y decidía dos veces. Ahora el precio se lee
 * como un producto completo.
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
  /** Segmento con el que se precarga el formulario de lista de espera */
  segment?: string;
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
      "5 fotos catalogadas con IA cada mes",
      "Búsqueda por nombre de objeto",
      "Un usuario",
    ],
    cta: "Crear cuenta",
    segment: "casa",
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
      "25 tags NFC incluidos",
      "Cajas sin límite durante 30 días",
      "Fotos con IA sin límite durante los 30 días",
      "Hasta 5 personas en la misma mudanza",
      "Al acabar, tu inventario sigue visible en modo lectura",
    ],
    cta: "Activar mudanza",
    segment: "mudanza",
  },
  {
    id: "particulares",
    tagline: "Anual",
    name: "Particulares",
    desc: "Tu casa organizada todo el año, en una sola ubicación.",
    amount: 45,
    price: "45 €",
    period: " / año",
    billing: "Suscripción anual",
    features: [
      "25 tags NFC incluidos",
      "Cajas sin límite",
      "200 fotos con IA al año",
      "Una ubicación y hasta 5 usuarios",
      "Fotos guardadas sin caducidad y copia de seguridad",
    ],
    cta: "Elegir este plan",
    segment: "casa",
  },
  {
    id: "particulares-plus",
    tagline: "Anual",
    name: "Particulares+",
    desc: "Trastero alquilado, garaje propio y lo que hay en casa, todo junto.",
    amount: 69,
    price: "69 €",
    period: " / año",
    billing: "Suscripción anual",
    features: [
      "60 tags NFC incluidos",
      "Dos ubicaciones: casa y trastero",
      "Fotos con IA sin límite",
      "Objetos sueltos, no solo cajas",
      "Cuenta compartida con toda la casa",
    ],
    cta: "Elegir este plan",
    segment: "trastero",
    featured: true,
    badge: "Completa",
  },
];

/** Packs adicionales, para quien se queda corto con los tags incluidos. */
export const TAG_PACK = {
  units: 100,
  price: "29 €",
  amount: 29,
};

/** Decisión D3 del brief. */
export const GUARANTEE =
  "30 días de garantía en los planes anuales. Si no te sirve, te devolvemos el dinero sin preguntas y los tags te los quedas.";

/**
 * Comisión POR VENTA, no por recurrencia: decisión de Iago, mantenida frente a
 * la recomendación del brief. Si algún día pasa a recurrente, hay que tocar
 * también el mock del panel de partner y el texto de PARTNER_TERMS.
 */
export const PARTNER_COMMISSIONS = [
  { num: "40 %", label: "de cada suscripción vendida con tu enlace o tu código" },
  { num: "20 %", label: "de cada pack de tags NFC que salga de tu recepción" },
];

export const PARTNER_TERMS =
  "La comisión se cobra en la venta, no en las renovaciones. Sin cuota de alta, sin exclusividad y sin objetivos mínimos.";

/**
 * Cifras del sector que sostienen el argumento de retención en /trasteros.
 * Son estimaciones de rango, no datos medidos: se presentan como tales.
 */
export const RETENTION = {
  monthlyUnitRevenueLow: 90,
  monthlyUnitRevenueHigh: 150,
  /** 40 % de una suscripción de 45 € */
  commissionPerCustomer: 18,
};
