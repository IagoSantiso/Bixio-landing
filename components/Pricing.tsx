import Link from "next/link";
import { CheckIcon } from "./icons";

type Plan = {
  tagline: string;
  name: string;
  desc: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  href: string;
  featured?: boolean;
  badge?: string;
};

const plans: Plan[] = [
  {
    tagline: "Para probar",
    name: "Gratis",
    desc: "Un armario, un trastero pequeño, o ver si esto te sirve.",
    price: "0 €",
    period: " / siempre",
    features: [
      "Hasta 10 cajas",
      "Catalogado por foto, con cuota mensual",
      "Búsqueda por nombre de objeto",
      "Un usuario",
    ],
    cta: "Crear cuenta",
    href: "#",
  },
  {
    tagline: "Pago único",
    name: "Mudanza",
    desc: "Treinta días para empaquetar, mover y desempaquetar. Sin suscripción.",
    price: "19,99 €",
    period: " / una vez",
    features: [
      "30 días de acceso completo",
      "Hasta 5 personas en la misma mudanza",
      "Catalogado por foto sin racanear",
      "Al acabar, pasas a anual o se borra",
    ],
    cta: "Activar mudanza",
    href: "#",
  },
  {
    tagline: "Anual",
    name: "Particulares",
    desc: "Tu casa organizada todo el año, en una sola ubicación.",
    price: "35 €",
    period: " / año",
    features: [
      "Una ubicación (casa o trastero)",
      "Fotos guardadas sin caducidad",
      "Búsqueda con IA y copia de seguridad",
      "Pack de tags aparte",
    ],
    cta: "Elegir este plan",
    href: "#",
  },
  {
    tagline: "Anual",
    name: "Particulares+",
    desc: "Trastero alquilado, garaje propio y lo que hay en casa, todo junto.",
    price: "59 €",
    period: " / año",
    features: [
      "Trastero externo + ubicación propia",
      "Objetos sueltos de casa, no solo cajas",
      "Hasta 100 tags activables",
      "Cuenta compartida con toda la casa",
    ],
    cta: "Elegir este plan",
    href: "#",
    featured: true,
    badge: "Completa",
  },
];

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
          Los <strong>tags NFC se compran una vez</strong> y son reutilizables: pack de 100 unidades
          por 29 €.
        </p>

        {/*
          Única mención al canal de negocio en toda la home, y a propósito no
          dice nada del trato: ni cifras, ni comisiones, ni márgenes. A quien no
          tiene un negocio no le aporta y le distrae del plan que estaba
          mirando; a quien lo tiene le basta para saber que existe una puerta.
          El destino es /comercios, que ya remata con su propio enlace a
          /recomienda para quien encaje mejor ahí.
        */}
        <p className="price-b2b">
          ¿Tienes un negocio y crees que esto encaja en tu tienda o con tus clientes?{" "}
          <Link href="/comercios">Cuéntanos</Link>.
        </p>
      </div>
    </section>
  );
}
