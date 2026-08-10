import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { BusinessTypePicker } from "@/components/commercial/BusinessTypePicker";
import { CrossLink } from "@/components/commercial/CrossLink";
import { Faq, type FaqItem } from "@/components/commercial/Faq";
import { LeadForm, type LeadField } from "@/components/commercial/LeadForm";
import { MetricBand } from "@/components/commercial/MetricBand";
import { PackPhoto } from "@/components/commercial/PackPhoto";
import { Steps } from "@/components/commercial/Steps";
import { TrackedCta } from "@/components/commercial/TrackedCta";
import { businessTypes } from "@/components/commercial/data";

const title = "Bixio para comercios — 15 € de margen por pack, en depósito";
const description =
  "Etiquetas NFC para saber qué hay en cada caja sin abrirla. El pack se vende a 29 € y te " +
  "quedas 15 €. Te lo dejamos en depósito: no pagas nada por adelantado y devuelves lo que no vendas.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/comercios" },
  openGraph: { title, description, siteName: "Bixio", locale: "es_ES", type: "website" },
};

const steps = [
  {
    title: "Te mandamos un expositor",
    text: "Con 10 packs. Sin coste y sin compromiso.",
  },
  {
    title: "Lo pones donde te encaje",
    text: "Mostrador o lineal, donde tú veas.",
  },
  {
    title: "Pagas solo lo vendido",
    text: "Nos dices cuánto ha salido a fin de mes y abonas 14 € por pack. Ni un euro más.",
  },
  {
    title: "Repones o devuelves",
    text: "Si funciona, te mandamos más. Si no, nos llevamos lo que quede y aquí no ha pasado nada.",
  },
];

const faq: FaqItem[] = [
  {
    q: "¿Tengo que pagar algo por adelantado?",
    a: "No. El expositor y los primeros 10 packs van en depósito. Solo abonas los que vendas.",
  },
  {
    q: "¿Y si no vendo ninguno?",
    a: "Nos los devuelves y no pagas nada. Nos ha costado a nosotros, no a ti.",
  },
  {
    q: "¿Tengo que explicárselo a los clientes?",
    a: "No. El pack lleva la explicación y un QR. Si alguien pregunta, le dices que escanee.",
  },
  {
    q: "¿Cuánto ocupa el expositor?",
    a: "Menos que una caja de zapatos. Cabe en cualquier mostrador.",
  },
  {
    q: "¿Cómo sabéis cuántos he vendido?",
    a: "Nos lo dices tú a fin de mes. Cada lote lleva su código, así que el QR también nos lo confirma.",
  },
  {
    q: "¿Hay exclusividad en mi zona?",
    a: "No. Tampoco te pedimos objetivos ni permanencia.",
  },
  {
    q: "¿Y si mi cliente tiene un problema con la app?",
    a: "Nos escribe a nosotros. El contacto está dentro de la app y en el propio pack. A ti no te va a llamar nadie.",
  },
];

const fields: LeadField[] = [
  { name: "negocio", label: "Nombre del negocio", type: "text", required: true, autoComplete: "organization" },
  {
    name: "tipo_negocio",
    label: "Tipo de negocio",
    type: "select",
    required: true,
    options: [...businessTypes.map((type) => type.chip), "Otro"],
  },
  { name: "poblacion", label: "Población", type: "text", required: true, autoComplete: "address-level2" },
  { name: "contacto", label: "Teléfono o email", type: "text", required: true, autoComplete: "tel" },
];

export default function ComerciosPage() {
  return (
    <>
      <SiteHeader variant="comercial" cta={{ href: "#solicitar", label: "Quiero el expositor" }} />

      <section className="hero hero-comercial">
        <div className="wrap">
          <div className="eyebrow">Para comercios</div>
          <h1>
            Un producto más en tu lineal.
            <br />
            <span className="accent">La mitad del margen</span> para ti.
          </h1>
          <p className="hero-sub">
            Bixio son etiquetas NFC para saber qué hay dentro de una caja sin abrirla. El pack se
            vende a 29 € y tú te quedas 15 €. Te lo dejamos en depósito: no pagas nada por
            adelantado y devuelves lo que no vendas.
          </p>
          <div className="hero-cta">
            <TrackedCta href="#solicitar" location="hero">
              Quiero el expositor de prueba
            </TrackedCta>
          </div>
          <p className="hero-note">
            <span className="dot" /> Sin pedido mínimo. Sin exclusividad. Sin permanencia.
          </p>
        </div>
      </section>

      <MetricBand
        metrics={[
          { num: "29 €", label: "precio de venta al público" },
          { num: "15 €", label: "te quedas tú en cada pack" },
          { num: "0 €", label: "pagas por adelantado" },
        ]}
      >
        <p>
          Pagas 14 € por pack solo cuando lo has vendido. Lo que no salga, nos lo devuelves y no lo
          abonas.
        </p>
        <p>
          Y si alguien compra la suscripción escaneando el QR de tu expositor, te llevas además el
          30 % de esa venta.
        </p>
      </MetricBand>

      <section className="explica">
        <div className="wrap ia-grid">
          <div>
            <div className="eyebrow">La objeción de siempre</div>
            <h2>No tienes que explicar qué es.</h2>
            <p className="ia-lead">
              El pack lo explica solo. En la parte de delante pone qué hace, detrás están los tres
              pasos con dibujos, y el QR lleva directo a probarlo gratis.
            </p>
            <p className="ia-lead">
              Tú lo pones en el lineal y cobras. Si alguien te pregunta algo que no sabes, le dices
              que escanee el código y ya está.
            </p>
          </div>
          <PackPhoto />
        </div>
      </section>

      <BusinessTypePicker />

      <Steps
        eyebrow="Cómo funciona el depósito"
        title="No arriesgas nada: el stock sigue siendo nuestro hasta que lo vendes."
        steps={steps}
      />

      <Faq title="Lo que nos preguntan los comercios." items={faq} />

      <section className="cierre" id="solicitar">
        <div className="wrap">
          <div className="eyebrow eyebrow-center">Pídelo</div>
          <h2>Te lo acercamos esta semana</h2>
          <p>
            Somos de A Coruña. Si estás en la zona, te lo llevamos en mano y lo ves antes de decidir
            nada.
          </p>
          <LeadForm
            leadType="comercio"
            fields={fields}
            submitLabel="Quiero el expositor de prueba"
            confirmation="Recibido. Te escribimos esta semana para acordar cuándo te acercamos el expositor."
          />
        </div>
      </section>

      <CrossLink href="/recomienda">¿Prefieres recomendarlo en vez de venderlo?</CrossLink>

      <SiteFooter />
    </>
  );
}
