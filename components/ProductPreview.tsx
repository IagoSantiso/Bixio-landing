/**
 * Mockup del producto, deliberadamente ilustrado y no fotorrealista: el brief
 * pide prueba visual, pero una imagen que finja ser una captura real de una app
 * que aún no existe sería mentir. Lleva su aviso debajo.
 */

const pantallas = [
  {
    titulo: "1. Fotografías la caja",
    contenido: (
      <>
        <rect x="18" y="46" width="124" height="96" rx="10" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.5" />
        <path
          d="M34 62h-6v-6M126 62h6v-6M34 126h-6v6M126 126h6v6"
          stroke="#FFF8F3"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
        />
        <rect x="36" y="72" width="34" height="26" rx="4" fill="#FFC857" stroke="#2D2A32" strokeWidth="2" />
        <rect x="80" y="78" width="28" height="34" rx="4" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2" />
        <rect x="40" y="108" width="60" height="20" rx="4" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2" />
        <circle cx="80" cy="168" r="13" fill="none" stroke="#2D2A32" strokeWidth="3" />
      </>
    ),
  },
  {
    titulo: "2. La IA escribe la lista",
    contenido: (
      <>
        <rect x="18" y="46" width="124" height="22" rx="7" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.2" />
        <path d="M28 57h40" stroke="#2D2A32" strokeWidth="2.4" strokeLinecap="round" />
        {[80, 110, 140, 170].map((y, index) => (
          <g key={y}>
            <rect
              x="18"
              y={y}
              width="124"
              height="22"
              rx="7"
              fill="#FFF8F3"
              stroke="#2D2A32"
              strokeWidth="2"
            />
            <circle cx="31" cy={y + 11} r="4" fill="#FF7A5C" />
            <path
              d={`M42 ${y + 11}h${[62, 74, 50, 66][index]}`}
              stroke="#2D2A32"
              strokeWidth="2.4"
              strokeLinecap="round"
              opacity=".55"
            />
          </g>
        ))}
      </>
    ),
  },
  {
    titulo: "3. Buscas y aparece",
    contenido: (
      <>
        <rect x="18" y="46" width="124" height="26" rx="13" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2.5" />
        <path d="M32 59h44" stroke="#2D2A32" strokeWidth="2.4" strokeLinecap="round" opacity=".5" />
        <circle cx="120" cy="59" r="8" fill="none" stroke="#2D2A32" strokeWidth="2.4" />
        <path d="M126 65l6 6" stroke="#2D2A32" strokeWidth="2.4" strokeLinecap="round" />
        <rect x="18" y="88" width="124" height="70" rx="12" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.5" />
        <path d="M34 112h70M34 130h44" stroke="#2D2A32" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="126" cy="100" r="12" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.4" />
        <path
          d="M120 100l4 4 7-8"
          stroke="#FFF8F3"
          strokeWidth="2.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </>
    ),
  },
];

export function ProductPreview() {
  return (
    <section className="preview">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Cómo se ve</div>
          <h2>Foto, lista y búsqueda. No hay más pantallas que aprender.</h2>
        </div>
        <div className="preview-grid">
          {pantallas.map(({ titulo, contenido }) => (
            <figure className="preview-item" key={titulo}>
              <svg viewBox="0 0 160 200" role="img" aria-label={titulo}>
                <rect
                  x="2"
                  y="2"
                  width="156"
                  height="196"
                  rx="18"
                  fill="#FFF8F3"
                  stroke="#2D2A32"
                  strokeWidth="3"
                />
                <rect x="58" y="14" width="44" height="6" rx="3" fill="#2D2A32" opacity=".2" />
                {contenido}
              </svg>
              <figcaption>{titulo}</figcaption>
            </figure>
          ))}
        </div>
        <p className="preview-note">
          Ilustración del funcionamiento, no capturas de la app. Cuando esté lista, aquí van las de
          verdad.
        </p>
      </div>
    </section>
  );
}
