import type { FaqItem } from "@/lib/faq";

/**
 * Acordeón con <details>: cero JavaScript, accesible por teclado, y el texto de
 * las respuestas está en el HTML aunque estén plegadas, que es lo que importa
 * para que un buscador o un asistente las lea.
 */
export function Faq({
  items,
  title,
  intro,
  eyebrow = "Preguntas frecuentes",
}: {
  items: FaqItem[];
  title: string;
  intro?: string;
  eyebrow?: string;
}) {
  return (
    <section className="faq-section" id="faq">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        <div className="faq-list">
          {items.map(({ q, a }) => (
            <details className="faq-item" key={q}>
              <summary>
                <span>{q}</span>
                <span className="faq-sign" aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
