import {
  MovingIllustration,
  StorageBusinessIllustration,
  WardrobeIllustration,
} from "./illustrations/UseCaseIllustrations";

const useCases = [
  {
    illustration: <MovingIllustration />,
    tag: "Mudanza",
    title: "Familias que cambian de casa",
    text: "Cuarenta cajas idénticas en el salón nuevo. Con Bixio sabes cuál abrir la primera noche y cuál puede esperar un mes.",
  },
  {
    illustration: <WardrobeIllustration />,
    tag: "Temporada",
    title: "Parejas y cambio de armario",
    text: "Guardas el invierno en dos cajas y en octubre te acuerdas de que existían, pero no de dónde.",
  },
  {
    illustration: <StorageBusinessIllustration />,
    tag: "Negocio",
    title: "Negocios que viven de las cajas",
    text: "Papelerías, embalaje, trasteros, mudanzas. Lo venden en el mostrador o se lo recomiendan a sus clientes, y cobran por ello.",
  },
];

export function UseCases() {
  return (
    <section className="casos" id="casos">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Para quién es</div>
          <h2>Tres momentos en los que todo acaba dentro de una caja sin etiqueta.</h2>
        </div>
        <div className="casos-grid">
          {useCases.map(({ illustration, tag, title, text }) => (
            <div className="caso" key={tag}>
              {illustration}
              <span className="tag">{tag}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
