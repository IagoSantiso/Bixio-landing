import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { PartnerDashboardIllustration } from "@/components/illustrations/PartnerDashboardIllustration";
import {
  PhotoStepIllustration,
  SearchStepIllustration,
  TagStepIllustration,
} from "@/components/illustrations/StepIllustrations";
import { FAQ_TRASTEROS } from "@/lib/faq";
import { PARTNER_COMMISSIONS, PARTNER_TERMS, TAG_PACK } from "@/lib/pricing";
import { breadcrumbSchema, faqSchema, graph } from "@/lib/schema";
import { PARTNERS_MAILTO } from "@/lib/site";

const title = "Vende Bixio en tu trastero y llévate comisión de cada venta";
const description =
  "Bixio es el inventario con tags NFC que tus inquilinos compran para saber qué guardaron. Tú recibes un enlace y un código de partner, los pones donde quieras y cobras el 40 % de cada suscripción vendida y el 20 % de cada pack de tags.";

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

/** Qué es el producto, para quien no lo ha visto nunca. */
const queEs = [
  {
    illustration: <TagStepIllustration />,
    title: "Un tag NFC por caja",
    text: "Tu inquilino pega una etiqueta en cada caja y le acerca el móvil. La caja queda identificada.",
  },
  {
    illustration: <PhotoStepIllustration />,
    title: "Una foto del contenido",
    text: "La IA reconoce lo que hay en la imagen y escribe la lista sola. Él no teclea nada.",
  },
  {
    illustration: <SearchStepIllustration />,
    title: "Y lo encuentra buscando",
    text: "Busca «taladro» y sabe en qué caja está. O acerca el móvil a una caja y ve qué contiene sin abrirla, aunque en el box no haya cobertura.",
  },
];

/** Cuánto trabajo da: cada uno elige su nivel de esfuerzo. */
const formas = [
  {
    esfuerzo: "Esfuerzo cero",
    title: "Solo tu enlace",
    text: "Lo mandas por email a tus clientes o lo pones en tu web y en tu ficha de Google. No tocas nada más.",
  },
  {
    esfuerzo: "Un minuto por alta",
    title: "En el contrato de alquiler",
    text: "El código va impreso en el contrato o en el email de bienvenida. Cada inquilino nuevo lo ve el primer día, que es cuando está empaquetando.",
  },
  {
    esfuerzo: "Una vez y ya",
    title: "Pegatinas en las puertas",
    text: "Una pegatina con tu código en la puerta de cada box. El cliente la ve justo cuando está mirando sus cajas y no se acuerda de qué hay dentro.",
  },
  {
    esfuerzo: "Si quieres stock",
    title: "Expositor en recepción",
    text: `Packs de ${TAG_PACK.units} tags a la vista en el mostrador, como las tarjetas regalo del kiosco. Se los llevas puestos en la mano al cliente que acaba de firmar.`,
  },
];

const porQue = [
  {
    title: "Margen extra sobre lo que ya vendes",
    text: "El box lo alquilas igual. Esto es ingreso adicional sobre el mismo cliente, sin ampliar instalaciones ni contratar a nadie.",
  },
  {
    title: "Sin inversión ni riesgo de stock",
    text: "No hay cuota de alta ni compromiso de compra. Si prefieres no almacenar tags, Bixio se los envía al cliente y tu comisión sigue siendo tuya.",
  },
  {
    title: "Fideliza al inquilino",
    text: "Quien tiene su trastero catalogado tiene una cosa más atada a tu sitio. Se lo piensa más antes de llevarse las cajas a la competencia.",
  },
  {
    title: "Te diferencia en la visita",
    text: "Enseñar que tu trastero viene con inventario incluido cambia la conversación cuando el cliente está comparando presupuestos por precio.",
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
                Un producto más que vender,
                <br />
                <span className="accent-warm">y no lo gestionas tú.</span>
              </h1>
              <p className="lead">
                Bixio es la app con la que tus inquilinos saben qué hay en cada caja sin abrirla. Tú
                recibes un enlace y un código de partner, los pones donde te venga bien, y cobras
                comisión de cada venta que entre con ellos.
              </p>
              <div className="hero-cta">
                <Link className="btn" href="#condiciones">
                  Ver comisiones
                </Link>
                <Link className="btn btn-ghost btn-ghost-dark" href="#que-es">
                  ¿Qué es Bixio?
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
              <h2>En una frase</h2>
              <p>
                Bixio se vende como una tarjeta regalo en un kiosco: tú lo ofreces con tu código, el
                cliente lo compra y lo usa por su cuenta, y tú te llevas la comisión de esa venta sin
                dar soporte, sin instalar nada y sin tocar las cosas de nadie.
              </p>
            </div>
          </div>
        </section>

        <section id="que-es">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Primero, qué es</div>
              <h2>Lo que compra tu inquilino.</h2>
              <p>
                Un inventario de sus cajas que se hace solo con el móvil. Tres pasos por caja y no
                vuelve a mirarlo hasta que necesita algo.
              </p>
            </div>
            <div className="pasos-grid">
              {queEs.map(({ illustration, title: stepTitle, text }) => (
                <div className="paso" key={stepTitle}>
                  {illustration}
                  <h3>{stepTitle}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="casos" id="como-lo-ofreces">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Segundo, cuánto trabajo te da</div>
              <h2>El que tú quieras. Todas las formas acaban en el mismo código.</h2>
              <p>
                No hay integración, ni formación, ni pantalla nueva que aprender. Eliges dónde poner
                tu enlace y tu código de partner, y ya está.
              </p>
            </div>
            <div className="formas-grid">
              {formas.map(({ esfuerzo, title: formaTitle, text }) => (
                <div className="forma-card" key={formaTitle}>
                  <span className="tag">{esfuerzo}</span>
                  <h3>{formaTitle}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="b2b" id="condiciones">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Tercero, cuánto te llevas</div>
              <h2>Comisión de cada venta que entre con tu código.</h2>
            </div>
            <div className="comisiones">
              {PARTNER_COMMISSIONS.map(({ num, label }) => (
                <div className="com" key={num}>
                  <div className="num">{num}</div>
                  <div className="lbl">{label}</div>
                </div>
              ))}
            </div>
            <p className="b2b-note">{PARTNER_TERMS}</p>
            <p className="b2b-note">
              Los tags puedes tenerlos tú en recepción y venderlos en el mostrador, o no tener
              ninguno y dejar que Bixio se los mande al cliente. Mientras la compra lleve tu enlace o
              tu código, la comisión es tuya en los dos casos.
            </p>
            <Link className="btn" href={PARTNERS_MAILTO}>
              Quiero mi código de partner
            </Link>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Por qué te interesa</div>
              <h2>Más ingreso por el mismo cliente, y un motivo más para que se quede.</h2>
            </div>
            <div className="value-grid">
              {porQue.map(({ title: benefitTitle, text }) => (
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
          title="Cuéntanos cuántos boxes gestionas y te mandamos tu código."
          text="Sin cuota de alta, sin exclusividad y sin objetivos mínimos. Si no encaja, te lo decimos nosotros."
          cta="Quiero mi código de partner"
          href={PARTNERS_MAILTO}
          secondary={{ label: "Soy particular", href: "/particulares" }}
        />
      </main>
      <SiteFooter />
      <JsonLd data={graph(faqSchema(FAQ_TRASTEROS), breadcrumbSchema(trail))} />
    </>
  );
}
