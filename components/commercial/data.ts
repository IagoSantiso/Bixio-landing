/**
 * Contenido compartido de las páginas comerciales (/comercios y /recomienda).
 *
 * Vive aquí, y no dentro de cada componente, porque los mismos datos se usan
 * en dos sitios: el selector de tipo de negocio y el desplegable del
 * formulario tienen que ofrecer exactamente las mismas opciones, y el valor
 * elegido viaja a D1 para alimentar la priorización del agente.
 */

export type BusinessType = {
  /** Texto del chip y valor que se persiste en D1. */
  chip: string;
  /** Única cosa que cambia al pulsar el chip. */
  frase: string;
  /**
   * Foto de contexto del pack colocado en ese tipo de negocio.
   * TODO(foto): no hay fotos de contexto todavía. En cuanto existan, poner
   * aquí la ruta (`/fotos/papeleria.jpg`, …) y el selector la mostrará solo.
   */
  imagen: string | null;
};

export const businessTypes: BusinessType[] = [
  {
    chip: "Papelería",
    frase:
      "Al lado de las etiquetas y el material de archivo. Quien viene a por carpetas viene a ordenar.",
    imagen: null,
  },
  {
    chip: "Embalaje y cajas",
    frase:
      "En el mismo lineal que la cinta y el rotulador. Quien compra cajas las va a cerrar hoy.",
    imagen: null,
  },
  {
    chip: "Ferretería y bazar",
    frase:
      "Junto a las cajas de plástico y las cestas de almacenaje. Es el mismo cliente.",
    imagen: null,
  },
  {
    chip: "Estanco y kiosco",
    frase:
      "En el expositor del mostrador, como las tarjetas de saldo. Mismo formato, misma venta.",
    imagen: null,
  },
  {
    chip: "Paquetería",
    frase:
      "Tu cliente ve cajas todo el día. Es el sitio más natural del mundo para esto.",
    imagen: null,
  },
  {
    chip: "Trasteros",
    frase:
      "En recepción, junto a los candados. Quien acaba de alquilar un box está a punto de llenarlo.",
    imagen: null,
  },
  {
    chip: "Informática",
    frase: "Con los accesorios. Tu cliente ya sabe lo que es NFC.",
    imagen: null,
  },
];

export type Profile = {
  /** Se persiste en D1 como perfil del prescriptor. */
  title: string;
  text: string;
};

export const profiles: Profile[] = [
  {
    title: "Empresas de mudanzas",
    text: "Tu cliente llega a la casa nueva con cuarenta cajas iguales y te llama preguntando dónde está la cafetera. Con el inventario hecho, no te llama. Y puedes venderlo como servicio premium del presupuesto.",
  },
  {
    title: "Alquiler de furgonetas",
    text: "Quien alquila una furgoneta se está mudando hoy. Mientras rellenáis el papeleo, le mencionas el pack. Es el momento con más contexto que existe.",
  },
  {
    title: "Inmobiliarias y agencias de alquiler",
    text: "Entregas llaves a alguien que está a punto de empaquetar su vida entera. Un detalle útil el día de la firma se recuerda.",
  },
  {
    title: "Administradores de fincas",
    text: "Cuando hay obra y hay que vaciar los trasteros comunitarios, tú eres quien da la mala noticia. Poder dar también la solución cambia la conversación.",
  },
  {
    title: "Organizadores profesionales",
    text: "Ordenas una casa en un día y a los seis meses está otra vez igual, porque el sistema depende de la memoria. Esto lo hace permanente y es lo que le da continuidad a tu trabajo.",
  },
  {
    title: "Vaciado de pisos y herencias",
    text: "Documentar qué había y dónde estaba, con fotos y fecha, evita la mitad de las discusiones entre herederos.",
  },
];
