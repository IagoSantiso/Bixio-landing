import { ArrowIcon } from "../icons";

export type Step = { title: string; text: string };

/**
 * Mismo patrón visual que los tres pasos de la home (`.pasos` / `.paso`), pero
 * con un número en un círculo en lugar de ilustración: estos pasos son un
 * trámite comercial, no el producto, y no tienen dibujo propio.
 */
export function Steps({
  eyebrow,
  title,
  steps,
}: {
  eyebrow: string;
  title: string;
  steps: Step[];
}) {
  return (
    <section className="pasos">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">{eyebrow}</div>
          <h2>{title}</h2>
        </div>
        <div className="pasos-grid pasos-4">
          {steps.map(({ title: stepTitle, text }, index) => (
            <div className="paso" key={stepTitle}>
              <span className="paso-badge">{index + 1}</span>
              <h3>{stepTitle}</h3>
              <p>{text}</p>
              {index < steps.length - 1 && <ArrowIcon className="paso-arrow" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
