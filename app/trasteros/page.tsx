import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Faq } from "@/components/Faq";
import { JsonLd } from "@/components/JsonLd";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WaitlistForm } from "@/components/WaitlistForm";
import { PartnerDashboardIllustration } from "@/components/illustrations/PartnerDashboardIllustration";
import { FAQ_TRASTEROS } from "@/lib/faq";
import { PARTNER_COMMISSIONS, PARTNER_TERMS, RETENTION, TAG_PACK } from "@/lib/pricing";
import { breadcrumbSchema, graph } from "@/lib/schema";

const title = "Bixio para trasteros: un motivo más para que tus clientes se queden";
const description =
  "Tus inquilinos no saben lo que tienen dentro del box, y por eso lo acaban vaciando. Bixio hace que cada cliente lo tenga catalogado desde el móvil. Tú no gestionas nada y cobras comisión de cada venta.";

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

const apoyos = [
  {
    title: "Margen extra sobre lo que ya vendes",
    text: "El box lo alquilas igual. Esto es ingreso adicional sobre el mismo cliente, sin ampliar instalaciones ni contratar a nadie.",
  },
  {
    title: "Sin inversión ni riesgo de stock",
    text: "No hay cuota de alta ni compromiso de compra. Si prefieres no almacenar tags, Bixio se los envía al cliente y tu comisión sigue siendo tuya.",
  },
  {
    title: "El soporte no es tuyo",
    text: "Las dudas del producto las llevamos nosotros desde la app. Tú vendes; no montas un servicio nuevo en el mostrador.",
  },
  {
    title: "Te diferencia en la visita",
    text: "Cuando alguien compara tres centros por precio, «el nuestro viene con inventario incluido» es lo único que rompe esa comparación.",
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
                Tus inquilinos no saben lo que tienen dentro del box.
                <br />
                <span className="accent-warm">Por eso lo acaban vaciando.</span>
              </h1>
              <p className="lead">
                Bixio hace que cada cliente tenga su trastero catalogado desde el móvil: sabe qué hay
                en cada caja sin abrirla. Tú no gestionas nada, no compras stock y no das soporte.
                Cobras comisión de cada venta.
              </p>
              <div className="hero-cta">
                <Link className="btn" href="/trasteros/calculadora">
                  Ver cuánto ganaría mi centro
                </Link>
                <Link className="btn btn-ghost btn-ghost-dark" href="#hablemos">
                  Hablar 20 minutos
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
              <div className="eyebrow">Lo que esto te aporta</div>
              <h2>El dinero de la comisión está bien. No es el motivo.</h2>
              <p>
                Un cliente de Bixio te deja unos {RETENTION.commissionPerCustomer} € de comisión.
                Está bien, pero seamos honestos: no vas a cambiar tu negocio por eso.
              </p>
              <p>
                El motivo es otro. Un inquilino que tiene su box catalogado, con las cajas
                etiquetadas y todo localizable desde el móvil, <strong>tarda más en irse</strong>. Y
                en tu negocio, retener a un cliente un mes más vale lo que factures por esa unidad:
                del orden de {RETENTION.monthlyUnitRevenueLow} a {RETENTION.monthlyUnitRevenueHigh} €
                según ciudad y tamaño.
              </p>
              <p>
                Retén a dos clientes un mes extra al año y habrás ganado más que con toda la comisión
                de tu centro junta.
              </p>
              <p>
                Y hay una segunda parte, que pasa en la visita comercial: cuando alguien está
                comparando tres centros por precio, poder decir «el nuestro viene con inventario
                incluido» es lo único que rompe esa comparación.
              </p>
              <p>
                <strong>
                  La comisión es el extra. Lo que compras es una razón para que se queden y un
                  argumento que el de al lado no tiene.
                </strong>
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="wrap">
            <div className="value-grid">
              {apoyos.map(({ title: benefitTitle, text }) => (
                <div className="value-card" key={benefitTitle}>
                  <h3>{benefitTitle}</h3>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="casos" id="como-lo-ofreces">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Cuánto trabajo te da</div>
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

        <section id="que-compra">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Qué compra tu inquilino</div>
              <h2>Un tag por caja, una foto, y lo encuentra buscando.</h2>
              <p>
                Pega la etiqueta, fotografía el contenido y la IA escribe la lista. Después busca
                «taladro» y sabe en qué caja está, o acerca el móvil a una caja y ve lo que hay
                dentro aunque en el box no haya cobertura.
              </p>
            </div>
          </div>
        </section>

        <section className="b2b" id="condiciones">
          <div className="wrap">
            <div className="section-head">
              <div className="eyebrow">Condiciones</div>
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
            <Link className="btn" href="/trasteros/calculadora">
              Calcular lo de mi centro
            </Link>
          </div>
        </section>

        <Faq
          items={FAQ_TRASTEROS}
          variant="compact"
          title="Lo que preguntan los gestores de trasteros"
          intro="Las respuestas completas están en preguntas frecuentes, junto con las de negocio."
        />

        <section className="cierre" id="hablemos">
          <div className="wrap legal-wrap">
            <div className="eyebrow eyebrow-center">Hablemos</div>
            <h2>Estamos eligiendo los primeros cinco centros.</h2>
            <p>
              Buscamos cinco operadores para arrancar antes que nadie: condiciones de fundador,
              comisión mejorada de por vida y voz en lo que construimos.
            </p>
            <p>Veinte minutos por teléfono. Si no encaja, te lo decimos nosotros.</p>
            <div className="form-card">
              <WaitlistForm origin="/trasteros" cta="cierre-trasteros" partner />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <JsonLd data={graph(breadcrumbSchema(trail))} />
    </>
  );
}
