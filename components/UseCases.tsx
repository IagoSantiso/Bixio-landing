import {
  MovingIllustration,
  PackingIllustration,
  WardrobeIllustration,
} from "./illustrations/UseCaseIllustrations";

/**
 * Solo particulares. La tercera tarjeta hablaba de negocios que revenden el
 * pack, y eso no pinta nada en la home: quien llega aquí viene a organizar su
 * casa. Las tres van ahora en el orden en que ocurren — empaquetar, llegar,
 * guardar la temporada.
 */
const useCases = [
  {
    illustration: <PackingIllustration />,
    tag: "Embalaje",
    title: "El día que metes la casa en cajas",
    text: "Tres días para empaquetar diez años de cosas. Catalogas cada caja antes de cerrarla y no vuelves a abrirla para comprobar qué había dentro.",
  },
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
