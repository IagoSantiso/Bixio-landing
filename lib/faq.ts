/**
 * Preguntas y respuestas.
 *
 * Cada una tiene `id` (ancla estable, para poder enlazarla y para que un LLM la
 * extraiga como unidad), `a` (respuesta completa, solo en /preguntas-frecuentes)
 * y opcionalmente `short` (2-3 frases, para las páginas satélite).
 *
 * Esa separación evita la canibalización: /preguntas-frecuentes es la fuente
 * canónica y la única que emite schema FAQPage; el resto resume y enlaza.
 *
 * Reglas al escribir: responder en la primera frase, sin introducción; incluir
 * el dato concreto; y decir también dónde Bixio no es la respuesta.
 */

export type FaqItem = {
  id: string;
  q: string;
  a: string;
  short?: string;
};

/** Producto: compatibilidad, precio, privacidad. */
export const FAQ_PRODUCTO: FaqItem[] = [
  {
    id: "que-hay-en-la-caja",
    q: "¿Cómo sé qué hay dentro de una caja sin abrirla?",
    a: "Pegas un tag NFC en la caja, acercas el móvil para darla de alta y haces una foto de lo que metes dentro. Bixio reconoce los objetos de la foto y escribe la lista por ti. A partir de ahí buscas por el nombre del objeto y la app te dice en qué caja está y dónde está esa caja; o acercas el móvil a una caja concreta y ves su contenido en pantalla.",
    short:
      "Pegas un tag NFC en la caja y fotografías el contenido antes de cerrarla. La IA escribe la lista, y después buscas el objeto por su nombre o acercas el móvil a la caja para ver qué hay dentro.",
  },
  {
    id: "movil-con-nfc",
    q: "¿Necesito un móvil con NFC?",
    a: "Para dar de alta una caja acercando el móvil, sí: el teléfono tiene que leer etiquetas NFC. La mayoría de móviles Android de gama media en adelante y los iPhone recientes lo hacen; en iPhone antiguos hay que abrir la app antes de acercar el tag. Consulta las especificaciones de tu modelo antes de comprar tags de más.",
    short:
      "Sí, el móvil tiene que leer etiquetas NFC. La mayoría de Android de gama media en adelante y los iPhone recientes lo hacen; en iPhone antiguos hay que abrir la app antes de acercar el tag.",
  },
  {
    id: "sin-cobertura",
    q: "¿Funciona en un trastero sin cobertura?",
    a: "Sí, y es una de las razones de usar NFC. Los tags no necesitan internet: acercas el móvil a la caja y ves ahí mismo lo que hay dentro, aunque estés en un sótano sin una raya de señal. Y si vas a catalogar, también puedes hacerlo sin conexión: escaneas y fotografías todo lo que quieras, se guarda en el móvil, y cuando sales y recuperas cobertura se sincroniza solo.",
    short:
      "Sí. El tag no necesita internet, así que en un sótano sin señal acercas el móvil y ves el contenido. Catalogar también funciona sin conexión y se sincroniza al salir.",
  },
  {
    id: "precio",
    q: "¿Cuánto cuesta Bixio?",
    a: "Bixio tiene un plan gratuito de hasta 10 cajas y 5 fotos con IA al mes, sin tarjeta. El plan Mudanza son 19,99 € de pago único con 25 tags incluidos y 30 días de acceso completo para hasta 5 personas. Los planes anuales son 45 € al año con 25 tags incluidos, y 69 € al año con 60 tags si quieres juntar casa y trastero. Los packs adicionales de 100 tags cuestan 29 €, y los planes anuales llevan 30 días de garantía de devolución.",
    short:
      "Hay un plan gratuito de 10 cajas sin tarjeta. Mudanza son 19,99 € una vez con 25 tags incluidos; los anuales, 45 € o 69 € al año con los tags dentro y 30 días de garantía.",
  },
  {
    id: "tags-reutilizables",
    q: "¿Los tags se pueden reutilizar?",
    a: "Sí. Los tags NFC de Bixio no son material consumible: si vacías una caja, despegas el tag y lo vuelves a asignar a otra desde la app. Los planes de pago llevan tags incluidos —25 en Mudanza y Particulares, 60 en Particulares+— y si necesitas más, el pack de 100 cuesta 29 €.",
    short:
      "Sí. Despegas el tag de una caja vacía y lo asignas a otra desde la app: no es material consumible. Los planes de pago ya llevan tags incluidos.",
  },
  {
    id: "mis-fotos",
    q: "¿Qué pasa con mis fotos?",
    a: "Las fotos que subes a Bixio son tuyas. Se guardan cifradas en servidores europeos, no se venden a terceros y no se usan para entrenar modelos. Puedes exportar tu inventario completo en un clic, en formato abierto, y llevártelo cuando quieras.",
    short:
      "Son tuyas: se guardan cifradas en servidores europeos, no se venden y no se usan para entrenar modelos. Puedes exportar todo el inventario en un clic.",
  },
  {
    id: "vs-rotulador",
    q: "¿En qué se diferencia de escribir en la caja con un rotulador?",
    a: "En que el rotulador solo cabe una etiqueta genérica —«cocina», «varios»— y la letra no se puede buscar. Con Bixio la caja lleva la lista de lo que hay dentro y encuentras el objeto buscando su nombre, no recordando en qué caja lo metiste. Para cuatro cajas que vas a abrir esta semana, el rotulador gana: es gratis e inmediato. La diferencia aparece a partir de diez o quince cajas, o cuando pasan meses.",
  },
  {
    id: "cuando-no-compensa",
    q: "¿Cuándo NO te compensa Bixio?",
    a: "Si guardas pocas cosas y las tienes a la vista, no compensa: el valor aparece cuando hay volumen y las cajas están cerradas meses. Tampoco sustituye a un inventario contable ni a una tasación para el seguro. Y si tu móvil no lee NFC, la parte de identificar la caja acercando el teléfono no te va a funcionar.",
    short:
      "Si guardas poco y lo tienes a la vista, no compensa. Tampoco sustituye a un inventario contable ni a una tasación de seguro, y necesita un móvil con NFC.",
  },
];

/** Mudanza y uso doméstico. */
export const FAQ_PARTICULARES: FaqItem[] = [
  {
    id: "organizar-mudanza",
    q: "¿Cómo organizo una mudanza para no perder nada?",
    a: "Cataloga cada caja en el momento de cerrarla, no después: es el único momento en que sabes lo que hay dentro. Con Bixio son tres pasos por caja —pegar el tag y acercarle el móvil, fotografiar el contenido antes de cerrarla, y anotar a qué habitación va—, y al llegar a la casa nueva buscas por objeto en vez de por caja. Si prefieres no usar app, el equivalente manual es numerar cada caja y llevar una lista en el móvil: funciona, pero hay que escribirlo todo a mano y nadie mantiene la lista después.",
    short:
      "Cataloga cada caja al cerrarla, que es cuando sabes lo que hay dentro: tag, foto y habitación de destino. Al llegar buscas por objeto en vez de abrir cajas a ciegas.",
  },
  {
    id: "que-caja-abro-primero",
    q: "¿Qué caja abro primero al llegar a la casa nueva?",
    a: "La que tenga lo de la primera noche: sábanas, cargadores, cepillo de dientes, papel higiénico y algo de cocina. Con el inventario hecho la localizas buscando cualquiera de esos objetos. Sin inventario, el truco clásico es preparar una «caja cero» marcada aparte antes de empezar a empaquetar.",
    short:
      "La de la primera noche: sábanas, cargadores y algo de cocina. Con el inventario hecho la encuentras buscando cualquiera de esos objetos.",
  },
  {
    id: "cuantas-cajas-mudanza",
    q: "¿Cuántas cajas necesito para mudarme?",
    a: "Como orientación, un estudio o un piso de una habitación se mueve en torno a 15-25 cajas; uno de dos o tres habitaciones, entre 30 y 50; y una casa familiar, de 60 en adelante. Depende mucho de los libros, la ropa y la cocina, que son lo que más cajas consume. Cuenta un tag por caja: los planes de pago de Bixio incluyen 25 o 60 tags, y el pack adicional de 100 cuesta 29 €.",
    short:
      "Orientativo: 15-25 cajas para un estudio, 30-50 para un piso de dos o tres habitaciones y 60 o más para una casa familiar. Un tag por caja.",
  },
  {
    id: "etiquetar-cajas",
    q: "¿Cuál es la mejor forma de etiquetar cajas de mudanza?",
    a: "Etiqueta por destino y por contenido, y escribe en dos caras de la caja: apiladas, solo se ve una. El sistema de colores por habitación funciona muy bien para descargar rápido, pero no te dice qué hay dentro; el número por caja más una lista sí, y es la versión manual de lo que hace Bixio con un tag NFC y una foto. Lo que no funciona es una sola palabra genérica: «varios» en seis cajas es lo mismo que no etiquetar.",
    short:
      "Por destino y por contenido, escrito en dos caras. Los colores por habitación ayudan a descargar; para saber qué hay dentro hace falta número más lista, o un tag.",
  },
  {
    id: "ropa-temporada",
    q: "¿Cómo guardo la ropa de temporada sin perderla de vista?",
    a: "Guarda por tipo de prenda y no por persona, y fotografía el contenido antes de cerrar: en octubre buscas «abrigo» o «botas» y sabes en qué caja está sin vaciar el altillo. Añade antipolillas y evita el plástico hermético con prendas de lana, que necesita algo de transpiración. Es uno de los usos más repetidos de Bixio porque son pocas cajas y muchos meses cerradas.",
    short:
      "Por tipo de prenda, no por persona, y con una foto del contenido antes de cerrar. En octubre buscas «abrigo» y sabes en qué caja está.",
  },
];

/** Trastero, garaje y organización a largo plazo. */
export const FAQ_ORGANIZAR: FaqItem[] = [
  {
    id: "organizar-trastero",
    q: "¿Cómo organizo un trastero para encontrar las cosas seis meses después?",
    a: "El problema de un trastero no es ordenarlo, es acordarse. Ordenar bien —estanterías, cajas iguales, lo pesado abajo, pasillo central— resuelve el día que lo montas; lo que falla es el día que vuelves. Para eso hace falta que cada caja diga lo que tiene dentro de una forma consultable: una lista por caja, un número visible y algo que puedas buscar. Bixio lo hace con un tag NFC y una foto, pero el principio vale igual con una hoja de cálculo: si no puedes buscar, vas a abrir cajas.",
    short:
      "Ordenar resuelve el día que lo montas; el problema es el día que vuelves. Cada caja necesita una lista consultable de lo que hay dentro, no una etiqueta genérica.",
  },
  {
    id: "que-no-guardar-trastero",
    q: "¿Qué no se puede guardar en un trastero en España?",
    a: "Los contratos de self-storage prohíben de forma prácticamente universal: inflamables y combustibles, explosivos y munición, productos químicos peligrosos, bombonas de gas, alimentos perecederos, animales vivos o plantas, residuos, y cualquier cosa de origen ilícito. Tampoco se puede vivir ni montar un taller dentro. Antes de guardar vehículos, baterías de litio u obras de arte, pregunta: cada operador tiene sus propias condiciones y su seguro. La lista concreta está siempre en tu contrato.",
    short:
      "Inflamables, explosivos, químicos peligrosos, bombonas, alimentos perecederos, animales y residuos. Tampoco se puede vivir ni trabajar dentro. La lista exacta está en tu contrato.",
  },
  {
    id: "inventario-seguro",
    q: "¿Cómo hago un inventario de mi casa para el seguro?",
    a: "Recorre la casa habitación por habitación fotografiando lo que tenga valor, anota marca, modelo y año cuando lo sepas, guarda las facturas junto a cada foto y mantén una copia fuera de casa. Es la parte que casi nadie hace y la que decide una indemnización. Bixio te da las fotos y la lista de objetos por ubicación, que es la mitad del trabajo, pero no sustituye a una tasación ni al peritaje de tu aseguradora: para objetos de mucho valor te pedirán documentación específica.",
    short:
      "Habitación por habitación, con fotos, marca, modelo y facturas, y una copia fuera de casa. Bixio te da fotos y lista por ubicación, pero no sustituye a una tasación.",
  },
  {
    id: "merece-la-pena-trastero",
    q: "¿Merece la pena alquilar un trastero?",
    a: "Haz la cuenta antes: un trastero pequeño en España suele moverse en un rango de 50 a 150 € al mes según ciudad y tamaño, así que en un año son entre 600 y 1.800 €. Compensa cuando lo que guardas vale más que eso, cuando es temporal —una obra, una mudanza, medio año fuera— o cuando el espacio que liberas en casa vale más que la cuota. No compensa para guardar cosas que no vas a volver a usar: eso sale más barato regalarlo. Y si al final alquilas uno, cataloga lo que metes: pagar por guardar algo que no recuerdas tener es la peor versión de este gasto.",
    short:
      "Depende de la cuenta: entre 600 y 1.800 € al año según ciudad y tamaño. Compensa si lo guardado vale más que eso, o si es temporal. No, para cosas que no vas a volver a usar.",
  },
];

/** Programa de partners: producto y condiciones. */
export const FAQ_TRASTEROS: FaqItem[] = [
  {
    id: "que-es-bixio-operador",
    q: "¿Qué es exactamente Bixio, para un operador?",
    a: "Un producto que vendes en recepción, no un software que tengas que instalar ni operar. Tu inquilino pega un tag NFC en cada caja, fotografía el contenido y la IA escribe la lista; después encuentra cualquier cosa buscando su nombre, o acercando el móvil a la caja. Tú no gestionas el servicio, no das soporte y no tocas las cosas de nadie.",
    short:
      "Un producto que vendes en recepción, no un software que tengas que operar. El inquilino cataloga sus cajas con el móvil; tú no gestionas nada ni das soporte.",
  },
  {
    id: "comision-partner",
    q: "¿Cuánto cobra un trastero por vender Bixio?",
    a: "El 40 % de cada suscripción vendida con tu enlace o tu código, y el 20 % de cada pack de tags NFC. La comisión se cobra en la venta: las renovaciones posteriores no generan comisión. No hay cuota de alta, ni exclusividad, ni objetivos mínimos. En dinero: cada cliente que se suscribe al plan anual de 45 € te deja unos 18 €.",
    short:
      "El 40 % de cada suscripción vendida con tu código y el 20 % de cada pack de tags. Se cobra en la venta, no en las renovaciones: unos 18 € por cliente del plan anual.",
  },
  {
    id: "trabajo-partner",
    q: "¿Cuánto trabajo me da esto?",
    a: "El que tú quieras darle. Recibes un enlace y un código de partner y eliges dónde ponerlos: en el contrato de alquiler, en un expositor en la entrada, en una pegatina en la puerta de cada box o en un email a tus clientes. Se parece más a vender una tarjeta regalo en un kiosco que a montar un servicio nuevo.",
    short:
      "El que quieras: enlace en un email, código en el contrato, pegatina en cada puerta o expositor en recepción. Como vender una tarjeta regalo en un kiosco.",
  },
  {
    id: "stock-tags",
    q: "¿Tengo que tener stock de tags?",
    a: "No es obligatorio. Puedes tener packs en recepción y venderlos en el mostrador, o no tener ninguno y dejar que Bixio se los envíe al cliente. En los dos casos, si la compra entra con tu enlace o tu código, la comisión es tuya.",
    short:
      "No. Puedes tener packs en el mostrador o dejar que Bixio se los envíe al cliente: la comisión es tuya en los dos casos.",
  },
  {
    id: "soporte-partner",
    q: "¿Y si mis clientes me llaman a mí cuando algo falle?",
    a: "No van a llamarte, porque el soporte lo llevamos nosotros y el contacto está dentro de la app. Aun así, te mandamos una hoja de una cara con las cinco preguntas que te van a hacer en el mostrador y su respuesta. Todo lo que vaya más allá, lo derivas con una frase.",
    short:
      "El soporte lo llevamos nosotros y el contacto está en la app. Te damos una hoja de una cara con las cinco preguntas de mostrador y su respuesta.",
  },
  {
    id: "datos-inquilinos",
    q: "¿Tengo acceso a los datos de mis inquilinos?",
    a: "No, y es a propósito. Tú ves cuántas ventas has generado y cuánto has cobrado. Lo que guarda cada inquilino en sus cajas no lo ve nadie: ni tú, ni nosotros. Es la razón por la que tus clientes se fían de usarlo, y también lo que te mantiene fuera de cualquier problema de protección de datos.",
    short:
      "No, y es a propósito. Ves tus ventas y tus comisiones; lo que hay en las cajas no lo ve nadie. Eso es lo que hace que tus clientes se fíen.",
  },
];

/** Negocio de self-storage: preguntas informativas que traen operadores nuevos. */
export const FAQ_OPERADORES: FaqItem[] = [
  {
    id: "aumentar-ingresos-trasteros",
    q: "¿Cómo aumento los ingresos de mi centro de trasteros sin ampliar metros?",
    a: "Sin obra, quedan tres palancas: subir el precio por metro, subir la ocupación y añadir ingresos que no ocupen espacio. La tercera es la que casi nadie explota: seguros, cajas y embalaje, candados, alquiler de furgoneta, custodia de llaves y servicios digitales. Todos comparten la misma virtud —no consumen metros— y la mayoría también fideliza, que acaba valiendo más que el margen directo: retener a un cliente un mes más vale lo que factures por esa unidad, entre 90 y 150 € en un rango habitual.",
    short:
      "Sin obra quedan tres palancas: precio, ocupación e ingresos que no ocupen metros. La tercera —embalaje, seguro, servicios digitales— es la que casi nadie explota.",
  },
  {
    id: "por-que-se-van-clientes",
    q: "¿Por qué se van los clientes de self-storage?",
    a: "Casi siempre porque desaparece el motivo por el que entraron: acaba la obra, se resuelve la mudanza, se vende la casa. Pero hay una segunda causa, más silenciosa y sobre la que sí se puede actuar: el cliente deja de saber qué tiene guardado, empieza a ver la cuota como un gasto sin contrapartida y decide vaciar. Un inquilino que sabe exactamente qué hay en su box —y que sigue viendo valor en ello— tarda más en tomar esa decisión.",
    short:
      "Porque desaparece el motivo que los trajo, y porque dejan de saber qué tienen guardado: cuando la cuota parece un gasto sin contrapartida, se vacía el box.",
  },
  {
    id: "servicios-complementarios",
    q: "¿Qué servicios complementarios funcionan en un centro de trasteros?",
    a: "Los que se venden en el mismo momento del alta y no consumen metros: material de embalaje, candados, seguro, alquiler o préstamo de furgoneta, recepción de paquetes y, cada vez más, servicios digitales de inventario. Los que suelen fallar son los que exigen personal dedicado o espacio propio, porque el margen no cubre el coste operativo. La regla práctica: si añade una tarea al mostrador en cada uso, revisa el número antes de lanzarlo.",
    short:
      "Los que se venden en el alta y no consumen metros: embalaje, candados, seguro, furgoneta, inventario digital. Fallan los que exigen personal o espacio propio.",
  },
  {
    id: "cuanto-se-gana-trasteros",
    q: "¿Cuánto se gana con un negocio de trasteros en España?",
    a: "El ingreso depende de tres números: unidades, ocupación y precio medio por unidad y mes, que en un rango habitual va de 90 a 150 € según ciudad y tamaño. Un centro de 100 unidades al 80 % de ocupación y 110 € de media factura del orden de 105.000 € al año antes de gastos —alquiler o amortización de la nave, personal, seguros y suministros—. Es un negocio de ocupación y permanencia más que de precio: cada mes que un cliente se queda de más entra casi entero al margen, porque el coste fijo ya está pagado.",
    short:
      "Depende de unidades, ocupación y precio medio, en un rango habitual de 90 a 150 € por unidad y mes. Es un negocio de ocupación y permanencia más que de precio.",
  },
];

/** Todo junto, para el schema y la página canónica. */
export const FAQ_GROUPS = [
  { title: "Sobre Bixio", eyebrow: "Lo básico", items: FAQ_PRODUCTO },
  { title: "Mudanzas y casa", eyebrow: "Para particulares", items: FAQ_PARTICULARES },
  { title: "Trastero, garaje y seguro", eyebrow: "Organizar", items: FAQ_ORGANIZAR },
  { title: "Programa de partners", eyebrow: "Para trasteros", items: FAQ_TRASTEROS },
  { title: "Negocio de self-storage", eyebrow: "Para operadores", items: FAQ_OPERADORES },
];

export const FAQ_ALL: FaqItem[] = FAQ_GROUPS.flatMap((group) => group.items);
