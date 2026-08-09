/**
 * Preguntas y respuestas.
 *
 * Están escritas para ser citables: cada respuesta se entiende sola, sin haber
 * leído las anteriores, nombra "Bixio" explícitamente y da el dato concreto
 * (precio, número, condición). Eso es lo que hace que un buscador o un
 * asistente puedan extraerlas sin tergiversarlas.
 */

export type FaqItem = { q: string; a: string };

/** Las que salen en la home. Subconjunto de las generales. */
export const FAQ_HOME: FaqItem[] = [
  {
    q: "¿Cómo sé qué hay dentro de una caja sin abrirla?",
    a: "Pegas un tag NFC en la caja, acercas el móvil para darla de alta y haces una foto de lo que metes dentro. Bixio reconoce los objetos de la foto y escribe la lista por ti. A partir de ahí buscas por el nombre del objeto y la app te dice en qué caja está y dónde está esa caja.",
  },
  {
    q: "¿Necesito un móvil con NFC?",
    a: "Para dar de alta una caja acercando el móvil, sí: el teléfono tiene que leer etiquetas NFC. La mayoría de móviles Android de gama media en adelante y los iPhone recientes lo hacen; en iPhone antiguos hay que abrir la app antes de acercar el tag. Consulta las especificaciones de tu modelo antes de comprar el pack de tags.",
  },
  {
    q: "¿Funciona en un trastero sin cobertura?",
    a: "Un trastero en un sótano suele no tener señal, y es justo donde necesitas consultar el inventario. Comprueba en la app qué parte funciona sin conexión antes de fiarte: consultar lo ya catalogado y buscar objetos debería poder hacerse sin datos, mientras que subir fotos nuevas para que la IA las procese sí necesita conexión.",
  },
  {
    q: "¿Cuánto cuesta Bixio?",
    a: "Bixio tiene un plan gratuito de hasta 10 cajas sin tarjeta. El plan Mudanza son 19,99 € de pago único por 30 días de acceso completo para hasta 5 personas. Los planes anuales son 35 € al año para una ubicación y 59 € al año si quieres juntar trastero, garaje y casa. Los tags NFC se compran aparte: 29 € el pack de 100 unidades, y son reutilizables.",
  },
  {
    q: "¿Los tags se pueden reutilizar?",
    a: "Sí. Los tags NFC de Bixio se compran una vez y se reutilizan: si vacías una caja, despegas el tag y lo vuelves a asignar a otra. El pack son 100 unidades por 29 €.",
  },
  {
    q: "¿Qué pasa con mis fotos?",
    a: "Las fotos que subes a Bixio son tuyas. Bixio no las vende ni las usa para entrenar modelos.",
  },
];

/** Todas, para /preguntas-frecuentes. */
export const FAQ_ALL: FaqItem[] = [
  ...FAQ_HOME,
  {
    q: "¿En qué se diferencia de escribir en la caja con un rotulador?",
    a: "En que el rotulador solo cabe una etiqueta genérica —«cocina», «varios»— y la letra no se puede buscar. Con Bixio la caja lleva una lista de lo que hay dentro, y encuentras el objeto buscando su nombre en vez de recordando en qué caja lo metiste. La diferencia se nota cuando tienes más de diez cajas o cuando pasan meses.",
  },
  {
    q: "¿Sirve para organizar un garaje o un trastero, no solo una mudanza?",
    a: "Sí. El caso de la mudanza es el más evidente porque todo acaba en cajas a la vez, pero Bixio está pensado igual para un garaje, un trastero alquilado, un sótano o el altillo de casa: cualquier sitio donde guardas cosas que no ves a diario y luego no recuerdas dónde están.",
  },
  {
    q: "¿Puedo compartir el inventario con mi pareja o mi familia?",
    a: "Sí. El plan Mudanza admite hasta 5 personas en la misma mudanza, y el plan anual Particulares+ es una cuenta compartida con toda la casa. El plan gratuito es de un solo usuario.",
  },
  {
    q: "¿Qué pasa cuando se acaban los 30 días del plan Mudanza?",
    a: "El plan Mudanza son 19,99 € de pago único que dan 30 días de acceso completo. Al acabar ese plazo pasas al plan anual o el inventario se borra; no se convierte en una suscripción automática.",
  },
  {
    q: "¿Cuántos tags necesito?",
    a: "Uno por caja: si vas a mover treinta cajas, necesitas treinta tags. El pack son 100 unidades por 29 €, así que para una mudanza o un trastero normal sobra, y lo que no uses vale para la próxima porque los tags se reutilizan.",
  },
  {
    q: "¿Tengo que corregir lo que escribe la IA?",
    a: "Solo si se equivoca. Bixio reconoce los objetos de la foto, los nombra y los agrupa por categoría; tú revisas la lista y corriges lo que haga falta. La idea es no tener que escribir nada desde cero.",
  },
  {
    q: "Tengo un negocio de trasteros, ¿puedo ofrecer Bixio a mis clientes?",
    a: "Sí, hay un programa de partners para trasteros y self-storage: entregas un pack de tags con el contrato de alquiler y cobras el 40 % de cada suscripción mientras el cliente siga activo, más el 20 % de cada pack de tags que vendas en tu mostrador.",
  },
  {
    q: "¿Cuándo NO te compensa Bixio?",
    a: "Si guardas pocas cosas y las tienes a la vista, no compensa: el valor aparece cuando hay volumen y las cajas están cerradas meses. Tampoco sustituye a un inventario contable ni a una tasación para el seguro. Y si tu móvil no lee NFC, la parte de identificar la caja acercando el teléfono no te va a funcionar.",
  },
];

/** Específicas de particulares. */
export const FAQ_PARTICULARES: FaqItem[] = [
  {
    q: "¿Cómo organizo una mudanza para no perder nada?",
    a: "El método que propone Bixio son tres pasos por caja: pegar un tag NFC y acercarle el móvil para darla de alta, hacer una foto del contenido antes de cerrarla para que la IA escriba la lista, y etiquetar la caja con su destino. Al llegar a la casa nueva buscas por objeto —«cafetera», «cargadores»— y sabes qué caja abrir la primera noche y cuál puede esperar un mes.",
  },
  {
    q: "¿Qué caja abro primero al llegar a la casa nueva?",
    a: "La que contiene lo que necesitas esa noche. Con el inventario hecho, buscas en Bixio «sábanas» o «cafetera» y te dice en qué caja están, en vez de abrir seis cajas hasta dar con ellas.",
  },
  {
    q: "¿Sirve para la ropa de temporada?",
    a: "Sí, es uno de los usos más habituales: guardas el invierno en dos o tres cajas con su foto, y en octubre buscas «abrigo» o «botas» y sabes exactamente en cuál está, sin vaciar el altillo.",
  },
];

/** Específicas de negocio. */
export const FAQ_TRASTEROS: FaqItem[] = [
  {
    q: "¿Cuánto cobra un trastero por ofrecer Bixio?",
    a: "El programa de partners de Bixio paga al trastero el 40 % de cada suscripción mientras el cliente siga activo, y el 20 % de cada pack de tags NFC vendido en el mostrador. Es ingreso recurrente que se suma al alquiler del box, sin coste de instalación.",
  },
  {
    q: "¿Qué tengo que hacer para empezar?",
    a: "Entregar un pack de tags junto con el contrato de alquiler. El cliente organiza su trastero él solo desde su móvil; el trastero no tiene que catalogar nada ni tocar las cosas del inquilino.",
  },
  {
    q: "¿Esto reduce las llamadas de clientes?",
    a: "Ese es el objetivo: el inquilino que sabe qué guardó y en qué caja deja de llamar al trastero para preguntarlo. Es la fricción que ataca Bixio, y cada llamada que no entra es tiempo de mostrador que recuperas.",
  },
  {
    q: "¿Tengo acceso a los datos de mis inquilinos?",
    a: "No. El inventario es del cliente y sus fotos son suyas. El trastero ve su panel de partner con lo suyo: ingresos del mes, clientes activos y packs vendidos.",
  },
];
