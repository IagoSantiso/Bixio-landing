import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { FAQ_ALL, FAQ_GROUPS } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

const title = "Preguntas frecuentes sobre Bixio, mudanzas y trasteros";
const description =
  "Compatibilidad NFC, precios, cuántos tags necesitas, si funciona sin cobertura, cuántas cajas hacen falta para mudarse, qué no se puede guardar en un trastero y cuándo Bixio no te compensa.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/preguntas-frecuentes" },
  openGraph: { title: `${title} | Bixio`, description, url: "/preguntas-frecuentes", type: "article" },
};

const trail = [
  { name: "Inicio", path: "/" },
  { name: "Preguntas frecuentes", path: "/preguntas-frecuentes" },
];

export default function FaqPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs trail={trail} />
      <main id="contenido">
        <section className="page-hero page-hero-narrow">
          <div className="wrap">
            <div className="eyebrow">Preguntas frecuentes</div>
            <h1>Todo lo que se pregunta antes de empezar.</h1>
            <p className="hero-sub">
              Sin rodeos, incluidos los casos en los que Bixio no te va a servir de nada. Esta es la
              página de referencia: el resto del sitio resume y enlaza aquí.
            </p>
            <nav className="faq-index" aria-label="Índice de preguntas">
              <ul>
                {FAQ_GROUPS.map((group) => (
                  <li key={group.title}>
                    <a href={`#${slug(group.title)}`}>{group.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        {FAQ_GROUPS.map((group) => (
          <Faq
            key={group.title}
            items={group.items}
            title={group.title}
            eyebrow={group.eyebrow}
            headingId={slug(group.title)}
          />
        ))}

        <CtaBand
          eyebrow="¿Seguimos?"
          title="Diez cajas gratis para comprobar si esto te sirve."
          text="Sin tarjeta. Si no te convence, no has perdido nada."
          cta="Entrar en la lista"
          href="/lista-de-espera"
          dataCta="cierre-faq"
          secondary={{ label: "Ver cómo funciona", href: "/particulares" }}
        />
      </main>
      <SiteFooter />
      <JsonLd data={graph(faqSchema(FAQ_ALL), breadcrumbSchema(trail))} />
    </>
  );
}

function slug(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
