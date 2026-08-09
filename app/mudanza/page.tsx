import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { HowItWorks } from "@/components/HowItWorks";
import { JsonLd } from "@/components/JsonLd";
import { ProductPreview } from "@/components/ProductPreview";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { TrustBlock } from "@/components/TrustBlock";
import { HeroIllustration } from "@/components/illustrations/HeroIllustration";
import { FAQ_PARTICULARES } from "@/lib/faq";
import { PLANS } from "@/lib/pricing";
import { breadcrumbSchema, graph, howToSchema } from "@/lib/schema";

const movingPlan = PLANS.find((plan) => plan.id === "mudanza")!;

const title = "Organizar una mudanza: cómo saber qué hay en cada caja";
const description =
  "El método para no perder nada en una mudanza: un tag NFC por caja, una foto del contenido y búsqueda por objeto al llegar. Cuántas cajas necesitas, cómo etiquetarlas y qué abrir primero.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/mudanza" },
  openGraph: { title: `${title} | Bixio`, description, url: "/mudanza", type: "article" },
};

const trail = [
  { name: "Inicio", path: "/" },
  { name: "Mudanza", path: "/mudanza" },
];

const cronologia = [
  {
    cuando: "30 días antes",
    title: "Empieza por lo que no usas",
    text: "Libros, ropa de otra temporada, decoración. Son las cajas que más tiempo van a estar cerradas y las que más se agradece tener catalogadas.",
  },
  {
    cuando: "7 días antes",
    title: "Cataloga mientras empaquetas",
    text: "Foto al contenido antes de cerrar cada caja. Hacerlo después es imposible: nadie abre cuarenta cajas para apuntar lo que hay dentro.",
  },
  {
    cuando: "El día de",
    title: "Marca la caja cero",
    text: "Sábanas, cargadores, papel higiénico, cafetera y herramientas básicas. Con el inventario hecho la encuentras buscando cualquiera de esas cosas.",
  },
  {
    cuando: "La primera noche",
    title: "Busca, no abras",
    text: "En vez de abrir seis cajas buscando el cepillo de dientes, lo buscas por su nombre y abres una.",
  },
];

export default function MudanzaPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs trail={trail} />
      <main id="contenido">
        <section className="page-hero">
          <div className="wrap page-hero-grid">
            <div>
              <div className="eyebrow">Mudanzas</div>
              <h1>
                Cuarenta cajas iguales.
                <br />
                <span className="accent">Y ninguna dice qué lleva.</span>
              </h1>
              <p className="hero-sub">
                Cataloga cada caja en el momento de cerrarla y al llegar a la casa nueva busca por
                objeto en vez de por caja. Un tag NFC, una foto, y la IA escribe la lista.
              </p>
              <div className="hero-cta">
                <Link className="btn" href="/lista-de-espera" data-cta="hero-mudanza" data-segment="mudanza">
                  Empezar con mi mudanza
                </Link>
                <Link className="btn btn-ghost" href="#cronologia">
                  Ver el método
                </Link>
              </div>
              <p className="hero-note">
                <span className="dot" /> Plan Mudanza: {movingPlan.price} una vez, 25 tags incluidos,
                hasta 5 personas.
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
              <h2>¿Cómo organizo una mudanza para no perder nada?</h2>
              <p>
                Catalogando cada caja en el momento de cerrarla, que es el único momento en que sabes
                lo que hay dentro. Con Bixio son tres gestos por caja: pegar un tag NFC y acercarle el
                móvil, fotografiar el contenido antes de precintarla y anotar a qué habitación va.
                Después, en la casa nueva, buscas «cafetera» o «sábanas» y sabes qué caja abrir, en
                vez de abrir cuatro hasta dar con ella.
              </p>
            </div>
          </div>
        </section>

        <ProductPreview />

        <HowItWorks />

        <section id="cronologia">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">El método, por fechas</div>
              <h2>Qué hacer y cuándo, para que el día de la mudanza no sea el problema.</h2>
            </div>
            <div className="formas-grid">
              {cronologia.map(({ cuando, title: stepTitle, text }) => (
                <div className="forma-card" key={cuando}>
                  <span className="tag">{cuando}</span>
                  <h3>{stepTitle}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <TrustBlock />

        <Faq
          items={FAQ_PARTICULARES}
          variant="compact"
          title="Dudas de quien se está mudando"
          intro="Cuántas cajas necesitas, cómo etiquetarlas y cuál abrir primero."
        />

        <CtaBand
          eyebrow="Antes de empaquetar"
          title="La caja se cataloga sola. Tú solo tienes que hacerle una foto."
          text={`${movingPlan.price} de pago único, 25 tags incluidos y hasta 5 personas en la misma mudanza.`}
          cta="Empezar con mi mudanza"
          href="/lista-de-espera"
          dataCta="cierre-mudanza"
          segment="mudanza"
          secondary={{ label: "Ver todos los planes", href: "/#precios" }}
        />
      </main>
      <SiteFooter />
      <JsonLd data={graph(howToSchema(), breadcrumbSchema(trail))} />
    </>
  );
}
