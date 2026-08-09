import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { PartnerCalculator } from "@/components/PartnerCalculator";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { breadcrumbSchema, graph } from "@/lib/schema";

const title = "Calculadora: cuánto gana un trastero con Bixio";
const description =
  "Simula la comisión y, sobre todo, lo que vale retener a tus clientes un mes más. Pon las unidades de tu centro, la ocupación y el precio medio.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/trasteros/calculadora" },
  openGraph: { title: `${title} | Bixio`, description, url: "/trasteros/calculadora", type: "article" },
};

const trail = [
  { name: "Inicio", path: "/" },
  { name: "Para trasteros", path: "/trasteros" },
  { name: "Calculadora", path: "/trasteros/calculadora" },
];

export default function CalculadoraPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs trail={trail} />
      <main id="contenido">
        <section className="page-hero page-hero-narrow">
          <div className="wrap">
            <div className="eyebrow">Calculadora de partner</div>
            <h1>Los números de tu centro, no los de un caso genérico.</h1>
            <p className="hero-sub">
              Mueve los cuatro controles y verás dos cifras: la comisión, que es la pequeña, y el
              valor de retención, que es la que decide.
            </p>
          </div>
        </section>

        <section className="calc-section">
          <div className="wrap">
            <PartnerCalculator />
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd data={graph(breadcrumbSchema(trail))} />
    </>
  );
}
