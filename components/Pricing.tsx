import Link from "next/link";
import { GUARANTEE, PLANS as plans, TAG_PACK } from "@/lib/pricing";
import { CheckIcon } from "./icons";

export function Pricing() {
  return (
    <section id="precios">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Precios</div>
          <h2>Una mudanza se paga una vez. Una casa entera, cada año.</h2>
          <p>
            Los tags van incluidos: no hay una segunda compra escondida. Si solo te mudas, no
            necesitas suscripción.
          </p>
        </div>
        <div className="price-grid">
          {plans.map((plan) => (
            <div className={plan.featured ? "plan featured" : "plan"} key={plan.id}>
              {plan.badge && <span className="badge">{plan.badge}</span>}
              <div className="plan-tagline">{plan.tagline}</div>
              <div className="plan-name">{plan.name}</div>
              <p className="plan-desc">{plan.desc}</p>
              <div className="plan-price">
                {plan.price}
                <small>{plan.period}</small>
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <span className="check">
                      <CheckIcon color={plan.featured ? "#FFC857" : "#C43417"} />
                    </span>{" "}
                    {feature}
                  </li>
                ))}
              </ul>
              <Link
                className={plan.featured ? "btn" : "btn btn-ghost"}
                href="/lista-de-espera"
                data-cta={`plan-${plan.id}`}
                data-segment={plan.segment}
              >
                {plan.cta}
              </Link>
            </div>
          ))}
        </div>

        <p className="price-note">
          <strong>{GUARANTEE}</strong> Si necesitas más tags de los que trae tu plan, el pack de{" "}
          {TAG_PACK.units} cuesta {TAG_PACK.price} y son reutilizables. ¿Gestionas un negocio de
          trasteros? Tienes <Link href="/trasteros">comisión por cada venta</Link>.
        </p>
      </div>
    </section>
  );
}
