import Link from "next/link";
import { PARTNER_COMMISSIONS as commissions } from "@/lib/pricing";
import { PartnerDashboardIllustration } from "./illustrations/PartnerDashboardIllustration";

export function Partners() {
  return (
    <section className="b2b" id="partners">
      <div className="wrap b2b-grid">
        <div>
          <div className="eyebrow">Para trasteros y self-storage</div>
          <h2>Un producto más que vender, y no lo gestionas tú.</h2>
          <p className="lead">
            Recibes un enlace y un código de partner y los pones donde quieras: en el contrato, en un
            expositor de recepción o en una pegatina en cada box. De cada venta que entre con ellos,
            te llevas comisión.
          </p>
          <div className="comisiones">
            {commissions.map(({ num, label }) => (
              <div className="com" key={num}>
                <div className="num">{num}</div>
                <div className="lbl">{label}</div>
              </div>
            ))}
          </div>
          <Link className="btn" href="/trasteros">
            Ver cómo funciona el programa
          </Link>
        </div>

        <div className="b2b-art">
          <PartnerDashboardIllustration />
        </div>
      </div>
    </section>
  );
}
