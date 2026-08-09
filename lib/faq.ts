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
    a: "Sí, y es una de las razones de usar NFC. Los tags no necesitan internet: acercas el móvil a la caja y ves ahí mismo lo que hay dentro, aunque estés en un sótano sin una raya de señal. Y si vas a catalogar, también puedes hacerlo sin conexión: escaneas y fotografías todo lo que quieras, se guarda en el móvil, y cuando sales y recuperas cobertura se sincroniza solo.",
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
    a: "Sí, hay un programa de partners para trasteros y self-storage. Recibes un enlace y un código propios y los pones donde quieras: en el contrato de alquiler, en un expositor en recepción o en una pegatina en la puerta de cada box. De cada venta que entre con tu enlace o tu código cobras el 40 % de la suscripción y el 20 % del pack de tags.",
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
    q: "¿Qué es exactamente Bixio?",
    a: "Bixio es una app de inventario para quien guarda cosas en cajas. El inquilino pega un tag NFC en cada caja, hace una foto del contenido y la IA escribe la lista de lo que hay dentro; después encuentra cualquier objeto buscando su nombre, y acercando el móvil a una caja ve qué contiene sin abrirla. Para un trastero es un producto que se vende en recepción, no un software que haya que instalar.",
  },
  {
    q: "¿Cuánto cobra un trastero por vender Bixio?",
    a: "El 40 % de cada suscripción vendida con tu enlace o tu código, y el 20 % de cada pack de tags NFC. La comisión se cobra en la venta: las renovaciones posteriores no generan comisión. No hay cuota de alta ni objetivos mínimos.",
  },
  {
    q: "¿Cuánto trabajo me da esto?",
    a: "El que tú quieras darle. Recibes un enlace y un código de partner y eliges dónde ponerlos: incluirlo en el contrato de alquiler, tener un expositor en la entrada, pegar una pegatina con el código en la puerta de cada box o mandarlo por email a tus clientes. Se parece más a vender una tarjeta regalo en un kiosco que a montar un servicio nuevo.",
  },
  {
    q: "¿Tengo que tener stock de tags?",
    a: "No es obligatorio. Puedes tener packs en recepción y venderlos en el mostrador, o no tener ninguno y dejar que Bixio se los envíe al cliente. En los dos casos, si la compra entra con tu enlace o tu código, la comisión es tuya.",
  },
  {
    q: "¿Y si mis inquilinos no son muy de apps?",
    a: "No todos lo usarán, y no pasa nada: el que no lo quiera sigue alquilando su box igual. Bixio es un extra que vendes a quien le interese, no un requisito que impongas a toda tu cartera.",
  },
  {
    q: "¿Tengo acceso a los datos de mis inquilinos?",
    a: "No. El inventario es del cliente y sus fotos son suyas. Tú ves tu panel de partner con lo tuyo: ventas del mes, comisiones y packs vendidos.",
  },
];
