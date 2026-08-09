import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { FAQ_ALL, FAQ_PARTICULARES, FAQ_TRASTEROS } from "@/lib/faq";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

const title = "Preguntas frecuentes sobre Bixio";
const description =
  "Compatibilidad NFC, precios, cuántos tags necesitas, qué pasa con tus fotos, si funciona sin cobertura y cuándo Bixio no te compensa.";

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

const everything = [...FAQ_ALL, ...FAQ_PARTICULARES, ...FAQ_TRASTEROS];

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
              Sin rodeos, incluidos los casos en los que Bixio no te va a servir de nada.
            </p>
          </div>
        </section>

        <Faq items={FAQ_ALL} title="Sobre Bixio en general" eyebrow="Lo básico" />
        <Faq
          items={FAQ_PARTICULARES}
          title="Mudanzas, trasteros y casa"
          eyebrow="Para particulares"
        />
        <Faq
          items={FAQ_TRASTEROS}
          title="Negocios de trasteros y self-storage"
          eyebrow="Para partners"
        />

        <CtaBand
          eyebrow="¿Seguimos?"
          title="Diez cajas gratis para comprobar si esto te sirve."
          text="Sin tarjeta. Si no te convence, no has perdido nada."
          cta="Empezar gratis"
          href="/#precios"
          secondary={{ label: "Ver cómo funciona", href: "/particulares" }}
        />
      </main>
      <SiteFooter />
      <JsonLd data={graph(faqSchema(everything), breadcrumbSchema(trail))} />
    </>
  );
}
