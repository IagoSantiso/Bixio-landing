import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { OfflineSection } from "@/components/OfflineSection";
import { Pricing } from "@/components/Pricing";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { FAQ_PARTICULARES } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, graph, howToSchema } from "@/lib/schema";

const title = "Organizar una mudanza, un trastero o un garaje sin abrir cajas";
const description =
  "Cómo saber qué hay dentro de cada caja sin abrirla: pega un tag NFC, haz una foto y busca después por el nombre del objeto. Para mudanzas, trasteros, garajes y ropa de temporada.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/particulares" },
  openGraph: {
    title: `${title} | Bixio`,
    description,
    url: "/particulares",
    type: "article",
  },
};

const trail = [
  { name: "Inicio", path: "/" },
  { name: "Para tu casa", path: "/particulares" },
];

const situaciones = [
  {
    id: "mudanza",
    tag: "Mudanza",
    title: "Te estás mudando",
    text: "Cuarenta cajas idénticas en el salón nuevo y ninguna pista de qué hay en cada una. Con el inventario hecho buscas «sábanas» o «cafetera» y sabes cuál abrir la primera noche y cuál puede esperar un mes en el pasillo.",
    bullets: [
      "Hasta 5 personas catalogando la misma mudanza",
      "Funciona igual con cajas prestadas o de segunda mano",
      "Al desempaquetar, tachas y listo",
    ],
  },
  {
    id: "temporada",
    tag: "Temporada",
    title: "Guardas la ropa de invierno",
    text: "Metes abrigos, jerséis y botas en dos cajas al altillo y en octubre te acuerdas de que existían, pero no de dónde. Una foto por caja al guardarlas y la búsqueda hace el resto seis meses después.",
    bullets: [
      "Una foto por caja al cerrar",
      "Búsqueda por prenda, no por caja",
      "Sirve igual para el material de esquí o la sombrilla",
    ],
  },
  {
    id: "trastero",
    tag: "Trastero y garaje",
    title: "Tienes un trastero, un garaje o un sótano",
    text: "El sitio donde acaba lo que no cabe en casa: herramientas, la caja de los cables, el cochecito del niño, los libros de la carrera. Catalogado una vez, dejas de bajar a mirar «a ver si está aquí».",
    bullets: [
      "Ubicación por caja, estantería y espacio",
      "Vale para trastero alquilado y para el de casa",
      "Objetos sueltos, no solo cajas, en el plan Particulares+",
    ],
  },
];

const comparativa = [
  {
    metodo: "Rotulador en la caja",
    coste: "Casi nada",
    problema: "Solo cabe una etiqueta genérica y no se puede buscar",
    cuando: "Cuatro cajas y las abres esta semana",
  },
  {
    metodo: "Hoja de cálculo",
    coste: "Gratis, pero tu tiempo",
    problema: "Hay que escribirlo todo a mano y nadie la actualiza después",
    cuando: "Te gusta hacer listas y tienes la tarde libre",
  },
  {
    metodo: "Bixio",
    coste: "Desde 0 €, tags aparte",
    problema: "Necesitas un móvil con NFC y comprar los tags una vez",
    cuando: "Muchas cajas, cerradas durante meses",
  },
];

export default function ParticularesPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs trail={trail} />
      <main id="contenido">
        <section className="page-hero">
          <div className="wrap page-hero-grid">
            <div>
              <div className="eyebrow">Para tu casa</div>
              <h1>
                Sabes lo que guardaste.
                <br />
                <span className="accent">No dónde.</span>
              </h1>
              <p className="hero-sub">
                Bixio cataloga tus cajas por ti: pegas un tag NFC, haces una foto del contenido y
                después encuentras cualquier objeto buscando su nombre. Sirve igual para una mudanza
                de cuarenta cajas que para el altillo de casa.
              </p>
              <div className="hero-cta">
                <Link className="btn" href="/#precios">
                  Empezar gratis
                </Link>
                <Link className="btn btn-ghost" href="/preguntas-frecuentes">
                  Resolver mis dudas
                </Link>
              </div>
              <p className="hero-note">
                <span className="dot" /> 10 cajas gratis, sin tarjeta.
              </p>
            </div>
            <div className="hero-art">
              <HeroIllustration />
            </div>
          </div>
        </section>

        <section className="answer">
          <div className="wrap">
            <div className="answer-box">
              <h2>¿Cómo sé qué hay en una caja sin abrirla?</h2>
              <p>
                Pegando en la caja un tag NFC que la identifica y fotografiando el contenido antes de
                cerrarla. La IA de Bixio reconoce los objetos de la foto y escribe la lista; a partir
                de ahí buscas por el nombre del objeto —«taladro», «cargadores», «botas»— y la app te
                dice en qué caja está y dónde está esa caja. No hay que escribir nada a mano ni
                abrir nada para comprobarlo.
              </p>
            </div>
          </div>
        </section>

        <HowItWorks />

        <OfflineSection />

        <section className="casos" id="situaciones">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Tres situaciones</div>
              <h2>Todo acaba dentro de una caja sin etiqueta. La cuestión es cuándo.</h2>
            </div>
            <div className="casos-grid">
              {situaciones.map(({ id, tag, title: cardTitle, text, bullets }) => (
                <div className="caso caso-text" id={id} key={id}>
                  <span className="tag">{tag}</span>
                  <h3>{cardTitle}</h3>
                  <p>{text}</p>
                  <ul className="tick-list">
                    {bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Comparado con lo de siempre</div>
              <h2>¿No basta con un rotulador?</h2>
              <p>
                Para cuatro cajas, sí. La diferencia aparece con volumen y con el tiempo: el
                rotulador no se puede buscar y tu memoria no llega a seis meses.
              </p>
            </div>
            {/* tabIndex hace la tabla desplazable con teclado: en móvil hay scroll
                horizontal y sin esto no se puede alcanzar sin ratón. */}
            <div className="table-wrap" tabIndex={0} role="region" aria-label="Comparativa de métodos para saber qué hay en cada caja">
              <table className="cmp-table">
                <thead>
                  <tr>
                    <th scope="col">Método</th>
                    <th scope="col">Coste</th>
                    <th scope="col">Dónde falla</th>
                    <th scope="col">Cuándo compensa</th>
                  </tr>
                </thead>
                <tbody>
                  {comparativa.map(({ metodo, coste, problema, cuando }) => (
                    <tr key={metodo}>
                      <th scope="row">{metodo}</th>
                      <td>{coste}</td>
                      <td>{problema}</td>
                      <td>{cuando}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <Pricing />

        <Faq
          items={FAQ_PARTICULARES}
          title="Dudas de quien se está mudando"
          intro="Las generales —compatibilidad, precios, privacidad— están en preguntas frecuentes."
        />

        <CtaBand
          eyebrow="Empieza hoy"
          title="La próxima vez que guardes algo, sabrás dónde está."
          text="Diez cajas gratis, sin tarjeta. Si te sirve, sigues."
          cta="Crear mi inventario"
          href="/#precios"
          secondary={{ label: "Gestiono trasteros", href: "/trasteros" }}
        />
      </main>
      <SiteFooter />
      <JsonLd
        data={graph(howToSchema(), faqSchema(FAQ_PARTICULARES), breadcrumbSchema(trail))}
      />
    </>
  );
}
