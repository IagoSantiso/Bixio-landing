import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PartnerDashboardIllustration } from "@/components/illustrations/PartnerDashboardIllustration";
import { FAQ_TRASTEROS } from "@/lib/faq";
import { PARTNER_COMMISSIONS, TAG_PACK } from "@/lib/pricing";
import { PARTNERS_MAILTO } from "@/lib/site";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";

const title = "Programa de partners para trasteros y self-storage";
const description =
  "Ofrece Bixio a tus inquilinos: entregas un pack de tags NFC con el contrato, dejan de llamarte para preguntar qué guardaron y cobras el 40 % de cada suscripción activa más el 20 % de cada pack vendido.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/trasteros" },
  openGraph: {
    title: `${title} | Bixio`,
    description,
    url: "/trasteros",
    type: "article",
  },
};

const trail = [
  { name: "Inicio", path: "/" },
  { name: "Para trasteros", path: "/trasteros" },
];

const pasos = [
  {
    num: "01",
    title: "Entregas el pack con el contrato",
    text: `Cuando firmas un alquiler, el pack de ${TAG_PACK.units} tags NFC va dentro. Ni instalación, ni formación, ni tocar las cosas del inquilino.`,
  },
  {
    num: "02",
    title: "El cliente organiza su box solo",
    text: "Pega un tag por caja, hace una foto y la IA cataloga el contenido. Todo desde su móvil, sin que tu personal intervenga.",
  },
  {
    num: "03",
    title: "Cobras cada mes que siga activo",
    text: "Cada suscripción que renueve te paga comisión, y cada pack que vendas en el mostrador también. Se ve en tu panel de partner.",
  },
];

const beneficios = [
  {
    title: "Menos llamadas al mostrador",
    text: "«¿Tú sabes si dejé ahí la sombrilla?» deja de ser tu problema: el inquilino lo consulta en su móvil.",
  },
  {
    title: "Un motivo para no irse",
    text: "El cliente que tiene su trastero catalogado en tu casa se lo piensa más antes de mudarse a la competencia.",
  },
  {
    title: "Ingreso recurrente sin stock",
    text: "La suscripción no la gestionas tú: cobras un porcentaje mientras el cliente siga dentro.",
  },
  {
    title: "Argumento de venta en la visita",
    text: "Enseñar que el box viene con inventario incluido diferencia tu presupuesto del de al lado.",
  },
];

export default function TrasterosPage() {
  return (
    <>
      <SiteHeader />
      <Breadcrumbs trail={trail} />
      <main id="contenido">
        <section className="page-hero b2b">
          <div className="wrap page-hero-grid">
            <div>
              <div className="eyebrow">Para trasteros y self-storage</div>
              <h1>
                Tus inquilinos ya te preguntan qué guardaron.{" "}
                <span className="accent-warm">Cóbralo.</span>
              </h1>
              <p className="lead">
                Entregas un pack de tags con el contrato de alquiler. El cliente organiza su trastero
                solo, deja de llamarte, y cada suscripción que renueve te paga a ti también.
              </p>
              <div className="hero-cta">
                <Link className="btn" href="#condiciones">
                  Solicitar condiciones
                </Link>
                <Link className="btn btn-ghost btn-ghost-dark" href="#como-funciona">
                  Ver cómo encaja
                </Link>
              </div>
            </div>
            <div className="b2b-art">
              <PartnerDashboardIllustration />
            </div>
          </div>
        </section>

        <section className="answer">
          <div className="wrap">
            <div className="answer-box">
              <h2>¿Qué gana un trastero ofreciendo Bixio?</h2>
              <p>
                Dos cosas: ingreso recurrente y menos fricción operativa. El programa de partners de
                Bixio paga al trastero el <strong>40 % de cada suscripción</strong> mientras el
                cliente siga activo y el <strong>20 % de cada pack de tags NFC</strong> vendido en el
                mostrador. A cambio, el inquilino que sabe qué guardó y en qué caja deja de llamar
                para preguntarlo, y tiene una razón más para renovar el box.
              </p>
            </div>
          </div>
        </section>

        <section id="como-funciona">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Cómo encaja en tu operativa</div>
              <h2>Tres pasos, y ninguno lo das tú más de una vez.</h2>
            </div>
            <div className="pasos-grid">
              {pasos.map(({ num, title: stepTitle, text }) => (
                <div className="paso paso-text" key={num}>
                  <div className="paso-num-big">{num}</div>
                  <h3>{stepTitle}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="b2b" id="condiciones">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Condiciones</div>
              <h2>Lo que te llevas por cada cliente.</h2>
            </div>
            <div className="comisiones">
              {PARTNER_COMMISSIONS.map(({ num, label }) => (
                <div className="com" key={num}>
                  <div className="num">{num}</div>
                  <div className="lbl">{label}</div>
                </div>
              ))}
            </div>
            <p className="b2b-note">
              Sin cuota de alta, sin exclusividad y sin acceso al inventario de tus inquilinos: sus
              fotos son suyas. Tú ves tu panel con ingresos del mes, clientes activos y packs
              vendidos.
            </p>
            <Link className="btn" href={PARTNERS_MAILTO}>
              Solicitar condiciones
            </Link>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Por qué funciona</div>
              <h2>El inventario es tuyo como argumento, del cliente como servicio.</h2>
            </div>
            <div className="value-grid">
              {beneficios.map(({ title: benefitTitle, text }) => (
                <div className="value-card" key={benefitTitle}>
                  <h3>{benefitTitle}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Faq
          items={FAQ_TRASTEROS}
          title="Lo que preguntan los gestores de trasteros"
          intro="Las dudas de producto —compatibilidad, precios, privacidad— están en preguntas frecuentes."
        />

        <CtaBand
          eyebrow="Hablemos"
          title="Cuéntanos cuántos boxes gestionas y te pasamos condiciones."
          text="Sin compromiso y sin exclusividad. Si no encaja, te lo decimos nosotros."
          cta="Solicitar condiciones"
          href={PARTNERS_MAILTO}
          secondary={{ label: "Soy particular", href: "/particulares" }}
        />
      </main>
      <SiteFooter />
      <JsonLd data={graph(faqSchema(FAQ_TRASTEROS), breadcrumbSchema(trail))} />
    </>
  );
}
