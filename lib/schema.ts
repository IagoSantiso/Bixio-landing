import type { FaqItem } from "./faq";
import { CURRENCY, PLANS, TAG_PACK } from "./pricing";
import { ONE_LINER, SITE_NAME, absoluteUrl } from "./site";

/**
 * Datos estructurados (JSON-LD). Sirven a dos públicos a la vez: a Google para
 * resultados enriquecidos, y a los asistentes que leen la página, porque les da
 * los hechos —precios, condiciones, respuestas— sin tener que deducirlos del
 * diseño.
 */

const ORG_ID = absoluteUrl("/#organization");
const SITE_ID = absoluteUrl("/#website");
const APP_ID = absoluteUrl("/#app");

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icon.svg"),
    description: ONE_LINER,
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    name: SITE_NAME,
    url: absoluteUrl("/"),
    inLanguage: "es-ES",
    publisher: { "@id": ORG_ID },
  };
}

export function softwareApplicationSchema() {
  return {
    "@type": "SoftwareApplication",
    "@id": APP_ID,
    name: SITE_NAME,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "Inventario doméstico",
    operatingSystem: "Android, iOS",
    inLanguage: "es-ES",
    description: ONE_LINER,
    url: absoluteUrl("/"),
    publisher: { "@id": ORG_ID },
    featureList: [
      "Identificación de cajas con tags NFC reutilizables",
      "Catalogado automático del contenido a partir de una foto",
      "Búsqueda de objetos por nombre",
      "Ubicación de cada caja por estantería y trastero",
      "Cuenta compartida entre varias personas",
    ],
    offers: [
      ...PLANS.map((plan) => ({
        "@type": "Offer",
        name: `Plan ${plan.name}`,
        description: plan.desc,
        price: plan.amount,
        priceCurrency: CURRENCY,
        category: plan.billing,
      })),
      {
        "@type": "Offer",
        name: `Pack de ${TAG_PACK.units} tags NFC`,
        description: "Tags NFC reutilizables, uno por caja.",
        price: TAG_PACK.amount,
        priceCurrency: CURRENCY,
        category: "Pago único",
      },
    ],
  };
}

export function faqSchema(items: FaqItem[]) {
  return {
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

export function howToSchema() {
  return {
    "@type": "HowTo",
    name: "Cómo saber qué hay en cada caja sin abrirla",
    description:
      "Método de tres pasos para catalogar cajas de mudanza, trastero o garaje con Bixio y poder encontrar después cualquier objeto por su nombre.",
    inLanguage: "es-ES",
    totalTime: "PT2M",
    supply: [
      { "@type": "HowToSupply", name: "Un tag NFC por caja" },
      { "@type": "HowToSupply", name: "Un móvil con lector NFC" },
    ],
    tool: [{ "@type": "HowToTool", name: "App de Bixio" }],
    step: [
      {
        "@type": "HowToStep",
        name: "Pega el tag y escanéalo",
        text: "Pega un tag NFC en la caja y acerca el móvil. La caja queda dada de alta en tu inventario.",
      },
      {
        "@type": "HowToStep",
        name: "Haz una foto del contenido",
        text: "Antes de cerrar la caja, fotografía lo que hay dentro. La IA reconoce los objetos y escribe la lista por ti; tú corriges si hace falta.",
      },
      {
        "@type": "HowToStep",
        name: "Busca por el nombre del objeto",
        text: "Cuando necesites algo, búscalo por su nombre. Bixio te dice en qué caja está y dónde está esa caja, sin abrir nada.",
      },
    ],
  };
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

/** Envuelve varios nodos en un único @graph, que es lo que se inyecta. */
export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
