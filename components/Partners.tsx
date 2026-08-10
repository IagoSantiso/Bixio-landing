import Link from "next/link";
import { PartnerDashboardIllustration } from "./illustrations/PartnerDashboardIllustration";

/**
 * Antes esta sección vendía fidelización de inquilinos a los trasteros. Ese
 * argumento no aguanta: un self-storage se elige por proximidad y
 * disponibilidad, y un inventario ordenado puede acelerar que el inquilino
 * vacíe el box en vez de retenerlo. Ahora dice lo único que es verdad —
 * cuánto se gana — y reparte a las dos páginas comerciales.
 */
const routes = [
  {
    num: "15 €",
    label: "de margen en cada pack que vendas en tu mostrador",
  },
  {
    num: "40 %",
    label: "de cada suscripción que entre con tu enlace, y el 15 % de cada renovación",
  },
];

export function Partners() {
  return (
    <section className="b2b" id="partners">
      <div className="wrap b2b-grid">
        <div>
          <div className="eyebrow">Para negocios</div>
          <h2>Dos formas de ganar dinero con esto.</h2>
          <p className="lead">
            Si tienes mostrador, lo vendes: te lo dejamos en depósito y te quedas 15 € de cada
            pack. Si tratas con gente que se está mudando, lo recomiendas y cobras comisión
            mientras tus clientes sigan usándolo. Sin exclusividad y sin objetivos.
          </p>
          <div className="comisiones">
            {routes.map(({ num, label }) => (
              <div className="com" key={num}>
                <div className="num">{num}</div>
                <div className="lbl">{label}</div>
              </div>
            ))}
          </div>
          <div className="b2b-cta">
            <Link className="btn" href="/comercios">
              Venderlo en mi tienda
            </Link>
            <Link className="btn btn-ghost btn-on-dark" href="/recomienda">
              Recomendarlo a mis clientes
            </Link>
          </div>
        </div>

        <div className="b2b-art">
          <PartnerDashboardIllustration />
        </div>
      </div>
    </section>
  );
}
