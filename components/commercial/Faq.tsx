export type FaqItem = { q: string; a: string };

/** "¿Cuánto ocupa el expositor?" → "cuanto-ocupa-el-expositor" */
export function faqSlug(question: string) {
  return question
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Acordeón nativo con `<details>`: el contenido de las respuestas va en el HTML
 * que sale del build, no detrás de un clic, así que Google y los lectores de
 * pantalla lo ven aunque esté plegado.
 */
export function Faq({ title, items }: { title: string; items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map(({ q, a }) => ({
      "@type": "Question",
      "@id": `#${faqSlug(q)}`,
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section className="faq-section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Preguntas</div>
          <h2>{title}</h2>
        </div>
        <div className="faq">
          {items.map(({ q, a }) => (
            <details className="faq-item" key={q} id={faqSlug(q)}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
