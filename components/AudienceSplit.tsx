import Link from "next/link";

const audiences = [
  {
    href: "/particulares",
    eyebrow: "Para tu casa",
    title: "Me mudo o tengo un trastero hecho un desastre",
    cta: "Cómo funciona en casa",
  },
  {
    href: "/trasteros",
    eyebrow: "Para tu negocio",
    title: "Gestiono trasteros o self-storage",
    cta: "Programa de partners",
  },
];

/**
 * Va justo debajo del hero y su única función es enrutar, no vender: si el
 * operador de trasteros tiene que llegar a media página para saber que hay algo
 * para él, ya se ha ido.
 */
export function AudienceSplit() {
  return (
    <section className="split">
      <div className="wrap split-grid">
        {audiences.map(({ href, eyebrow, title, cta }) => (
          <Link className="split-card" href={href} key={href}>
            <div className="plan-tagline">{eyebrow}</div>
            <h2>{title}</h2>
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
    </section>
  );
}
