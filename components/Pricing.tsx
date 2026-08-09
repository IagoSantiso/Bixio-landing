import Link from "next/link";
import { PLANS as plans, TAG_PACK } from "@/lib/pricing";
import { CheckIcon } from "./icons";

export function Pricing() {
  return (
    <section id="precios">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Precios</div>
          <h2>Una mudanza se paga una vez. Una casa entera, cada año.</h2>
          <p>
            Si solo te mudas, no necesitas suscripción. Si quieres tenerlo todo controlado siempre,
            el plan anual mantiene tus fotos y la búsqueda activas.
          </p>
        </div>
        <div className="price-grid">
          {plans.map((plan) => (
            <div className={plan.featured ? "plan featured" : "plan"} key={plan.name}>
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
                      <CheckIcon color={plan.featured ? "#FFC857" : "#FF7A5C"} />
                    </span>{" "}
                    {feature}
                  </li>
                ))}
              </ul>
              <a className={plan.featured ? "btn" : "btn btn-ghost"} href={plan.href}>
                {plan.cta}
              </a>
            </div>
          ))}
        </div>

        <p className="price-note">
          Los <strong>tags NFC se compran una vez</strong> y son reutilizables: pack de{" "}
          {TAG_PACK.units} unidades por {TAG_PACK.price}. ¿Gestionas un negocio de trasteros? Tienes{" "}
          <Link href="/trasteros">licencia por unidad y comisión</Link>.
        </p>
      </div>
    </section>
  );
}
