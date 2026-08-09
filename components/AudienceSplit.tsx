import Link from "next/link";

const audiences = [
  {
    href: "/particulares",
    eyebrow: "Para tu casa",
    title: "Me mudo o tengo un trastero hecho un desastre",
    text: "Mudanzas, ropa de temporada, garaje, altillo y trastero alquilado. Catalogas una vez y encuentras cualquier cosa buscando su nombre.",
    cta: "Ver cómo funciona en casa",
  },
  {
    href: "/trasteros",
    eyebrow: "Para tu negocio",
    title: "Gestiono trasteros o self-storage",
    text: "Entregas los tags con el contrato, tus inquilinos dejan de llamarte para preguntar qué guardaron y cobras comisión de cada suscripción activa.",
    cta: "Ver el programa de partners",
  },
];

export function AudienceSplit() {
  return (
    <section className="split">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Dos caminos</div>
          <h2>¿Vienes a ordenar lo tuyo o a ganar dinero con esto?</h2>
        </div>
        <div className="split-grid">
          {audiences.map(({ href, eyebrow, title, text, cta }) => (
            <Link className="split-card" href={href} key={href}>
              <div className="plan-tagline">{eyebrow}</div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="split-cta">
                {cta}
                <svg width="20" height="12" viewBox="0 0 46 16" fill="none" aria-hidden="true">
                  <path
                    d="M1 8h40m0 0-7-6m7 6-7 6"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
