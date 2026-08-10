import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { CheckIcon } from "@/components/icons";
import { CrossLink } from "@/components/commercial/CrossLink";
import { Faq, type FaqItem } from "@/components/commercial/Faq";
import { LeadForm, type LeadField } from "@/components/commercial/LeadForm";
import { MetricBand } from "@/components/commercial/MetricBand";
import { TrackedCta } from "@/components/commercial/TrackedCta";
import { profiles } from "@/components/commercial/data";

const title = "Recomienda Bixio — 40 % de cada venta y 15 % de cada renovación";
const description =
  "Si recomiendas Bixio a tus clientes te llevas el 40 % de cada suscripción que entre con tu " +
  "enlace y el 15 % de cada renovación, mientras sigan usándolo. Sin stock, sin soporte y sin instalar nada.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/recomienda" },
  openGraph: { title, description, siteName: "Bixio", locale: "es_ES", type: "website" },
};

const perks = [
  {
    title: "Tu enlace y tu código",
    text: "Todo lo que entre con ellos es tuyo.",
  },
  {
    title: "Un QR descargable",
    text: "Para imprimir, meter en un presupuesto o poner en el mostrador.",
  },
  {
    title: "Textos listos",
    text: "Para tu email de bienvenida, tu web o tu WhatsApp. No tienes que escribir nada.",
  },
  {
    title: "Un panel",
    text: "Ves cuánto has generado y cuánto has cobrado.",
  },
];

const faq: FaqItem[] = [
  {
    q: "¿Tengo que comprar algo?",
    a: "No. Esto es solo tu enlace. Si además quieres vender packs en mostrador, eso es otro programa: está en la página de comercios.",
  },
  {
    q: "¿Cuándo cobro?",
    a: "Transferencia mensual a partir de 25 € acumulados. Por debajo se acumula al mes siguiente.",
  },
  {
    q: "¿Y si mi cliente tiene un problema?",
    a: "Nos escribe a nosotros. No vas a recibir llamadas por esto.",
  },
  {
    q: "¿Tengo que firmar algo?",
    a: "No. Ni exclusividad, ni permanencia, ni objetivos. Si dejas de recomendarlo, dejas de cobrar y ya está.",
  },
  {
    q: "¿Puedo ver qué guardan mis clientes?",
    a: "No, y es a propósito. Tú ves cuántas ventas has generado. Lo que guarda cada persona no lo ve nadie, ni tú ni nosotros. Es la razón por la que se fían de usarlo.",
  },
];

const fields: LeadField[] = [
  { name: "negocio", label: "Nombre y negocio", type: "text", required: true, autoComplete: "organization" },
  {
    name: "perfil",
    label: "A qué te dedicas",
    type: "select",
    required: true,
    options: [...profiles.map((profile) => profile.title), "Otro"],
  },
  { name: "contacto", label: "Email", type: "email", required: true, autoComplete: "email" },
];

export default function RecomiendaPage() {
  return (
    <>
      <SiteHeader variant="comercial" cta={{ href: "#enlace", label: "Quiero mi enlace" }} />

      <section className="hero hero-comercial">
        <div className="wrap">
          <div className="eyebrow">Para quien recomienda</div>
          <h1>
            Tus clientes te lo van a agradecer.
            <br />
            Y tú <span className="accent">cobras por ello</span>.
          </h1>
          <p className="hero-sub">
            Bixio hace que la gente sepa qué hay en cada caja sin abrirla. Si se lo recomiendas a
            tus clientes, te llevas el 40 % de cada venta y el 15 % de cada renovación, mientras
            sigan usándolo.
          </p>
          <div className="hero-cta">
            <TrackedCta href="#enlace" location="hero">
              Quiero mi enlace
            </TrackedCta>
          </div>
          <p className="hero-note">
            <span className="dot" /> Sin stock. Sin soporte. Sin instalar nada.
          </p>
        </div>
      </section>

      <MetricBand
        metrics={[
          { num: "40 %", label: "de cada suscripción que entre con tu enlace" },
          { num: "15 %", label: "cada año que ese cliente renueve" },
        ]}
      >
        <p>
          Mientras tu cliente siga usándolo, tú sigues cobrando. Sin cuota de alta, sin exclusividad
          y sin objetivos mínimos.
        </p>
      </MetricBand>

      <section className="casos">
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Por qué encaja contigo</div>
            <h2>Cada uno lo recomienda por un motivo distinto. Busca el tuyo.</h2>
          </div>
          <div className="casos-grid">
            {profiles.map(({ title: profileTitle, text }) => (
              <div className="caso caso-texto" key={profileTitle}>
                <h3>{profileTitle}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <div className="eyebrow">Lo que te damos</div>
            <h2>Qué recibes el mismo día.</h2>
          </div>
          <div className="ia-list ia-list-2">
            {perks.map(({ title: perkTitle, text }) => (
              <div className="ia-item" key={perkTitle}>
                <span className="ia-chip">
                  <CheckIcon />
                </span>
                <div>
                  <strong>{perkTitle}</strong>
                  <span>{text}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Faq title="Lo que nos preguntan los prescriptores." items={faq} />

      <section className="cierre" id="enlace">
        <div className="wrap">
          <div className="eyebrow eyebrow-center">Empieza</div>
          <h2>Te mandamos el enlace hoy</h2>
          <LeadForm
            leadType="prescriptor"
            fields={fields}
            submitLabel="Quiero mi enlace"
            confirmation="Recibido. Hoy mismo te mandamos tu enlace, tu código y el QR al email que nos has dejado."
          />
        </div>
      </section>

      <CrossLink href="/comercios">¿Prefieres venderlo en tu mostrador?</CrossLink>

      <SiteFooter />
    </>
  );
}
