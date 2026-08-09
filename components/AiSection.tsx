import { BooksIcon, ClothesIcon, ToolsIcon } from "./icons";
import { AiFlowIllustration } from "./illustrations/AiFlowIllustration";

const categories = [
  {
    icon: <ToolsIcon />,
    title: "Herramientas",
    examples: "Taladro, llave inglesa, brocas, nivel",
  },
  {
    icon: <ClothesIcon />,
    title: "Ropa de temporada",
    examples: "Abrigos, jerséis, botas, bufandas",
  },
  {
    icon: <BooksIcon />,
    title: "Libros y papeles",
    examples: "Novelas, apuntes, documentos, álbumes",
  },
];

export function AiSection() {
  return (
    <section id="ia">
      <div className="wrap ia-grid">
        <div>
          <div className="eyebrow">Catalogado automático</div>
          <h2>
            Una foto entra.
            <br />
            Una lista ordenada sale.
          </h2>
          <p className="ia-lead">
            No hay que escribir nada. Bixio reconoce los objetos de la foto, los nombra y los agrupa
            por categoría para que la búsqueda funcione incluso cuando no recuerdas la palabra
            exacta.
          </p>
          <div className="ia-list">
            {categories.map(({ icon, title, examples }) => (
              <div className="ia-item" key={title}>
                <span className="ia-chip">{icon}</span>
                <div>
                  <strong>{title}</strong>
                  <span>{examples}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="ia-art">
          <AiFlowIllustration />
        </div>
      </div>
    </section>
  );
}
