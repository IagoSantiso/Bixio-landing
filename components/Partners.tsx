import { PartnerDashboardIllustration } from "./illustrations/PartnerDashboardIllustration";

const commissions = [
  { num: "40 %", label: "de cada suscripción, mientras el cliente siga activo" },
  { num: "20 %", label: "de cada pack de tags NFC que vendas en tu mostrador" },
];

export function Partners() {
  return (
    <section className="b2b" id="partners">
      <div className="wrap b2b-grid">
        <div>
          <div className="eyebrow">Para trasteros y self-storage</div>
          <h2>Tus inquilinos ya te preguntan qué guardaron. Cóbralo.</h2>
          <p className="lead">
            Entregas un pack de tags con el contrato de alquiler. El cliente organiza su trastero
            solo, deja de llamarte, y cada suscripción que renueve te paga a ti también.
          </p>
          <div className="comisiones">
            {commissions.map(({ num, label }) => (
              <div className="com" key={num}>
                <div className="num">{num}</div>
                <div className="lbl">{label}</div>
              </div>
            ))}
          </div>
          <a className="btn" href="#">
            Solicitar condiciones
          </a>
        </div>

        <div className="b2b-art">
          <PartnerDashboardIllustration />
        </div>
      </div>
    </section>
  );
}
