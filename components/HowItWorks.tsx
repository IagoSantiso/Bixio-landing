import { ArrowIcon } from "./icons";
import {
  PhotoStepIllustration,
  SearchStepIllustration,
  TagStepIllustration,
} from "./illustrations/StepIllustrations";

const steps = [
  {
    illustration: <TagStepIllustration />,
    step: "Paso 1",
    title: "Pega y escanea",
    text: "Un tag por caja. Acercas el móvil y esa caja ya existe en tu inventario.",
  },
  {
    illustration: <PhotoStepIllustration />,
    step: "Paso 2",
    title: "Haz una foto",
    text: "La IA lee lo que hay en la imagen y escribe la lista por ti. Tú corriges si hace falta.",
  },
  {
    illustration: <SearchStepIllustration />,
    step: "Paso 3",
    title: "Encuentra al instante",
    text: "Buscas por nombre y Bixio te da la caja, la estantería y el trastero. Sin abrir nada.",
  },
];

export function HowItWorks() {
  return (
    <section className="pasos" id="como">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Tres pasos, una vez</div>
          <h2>Se tarda menos en catalogar una caja que en buscarla luego.</h2>
        </div>
        <div className="pasos-grid">
          {steps.map(({ illustration, step, title, text }, index) => (
            <div className="paso" key={step}>
              {illustration}
              <div className="paso-num">{step}</div>
              <h3>{title}</h3>
              <p>{text}</p>
              {index < steps.length - 1 && <ArrowIcon className="paso-arrow" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
