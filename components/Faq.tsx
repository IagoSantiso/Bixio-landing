import Link from "next/link";
import type { FaqItem } from "@/lib/faq";

/**
 * Acordeón con <details>: cero JavaScript y, sobre todo, el texto de las
 * respuestas va en el HTML aunque estén plegadas. Si solo apareciera al hacer
 * clic, los rastreadores no lo verían y la página valdría cero.
 *
 * Cada pregunta es un <h3> con id estable, así que es enlazable y un LLM puede
 * extraerla como unidad independiente.
 *
 * `variant="compact"` muestra la versión corta y enlaza a la respuesta completa
 * en /preguntas-frecuentes, que es la fuente canónica.
 */
export function Faq({
  items,
  title,
  intro,
  eyebrow = "Preguntas frecuentes",
  variant = "full",
  headingId,
}: {
  items: FaqItem[];
  title: string;
  intro?: string;
  eyebrow?: string;
  variant?: "full" | "compact";
  headingId?: string;
}) {
  const compact = variant === "compact";

  return (
    <section className="faq-section" id={headingId ?? "faq"}>
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
          {intro && <p>{intro}</p>}
        </div>
        <div className="faq-list">
          {items.map((item) => (
            <details className="faq-item" key={item.id}>
              <summary>
                <h3 id={compact ? undefined : item.id}>{item.q}</h3>
                <span className="faq-sign" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>{compact ? (item.short ?? item.a) : item.a}</p>
                {compact && (
                  <Link href={`/preguntas-frecuentes#${item.id}`}>Respuesta completa →</Link>
                )}
              </div>
            </details>
          ))}
        </div>
        {compact && (
          <p className="faq-more">
            <Link href="/preguntas-frecuentes">Ver todas las preguntas frecuentes →</Link>
          </p>
        )}
      </div>
    </section>
  );
}
