export function MovingIllustration() {
  return (
    <svg viewBox="0 0 260 140" role="img" aria-label="Familia cargando cajas en una mudanza">
      <ellipse cx="130" cy="128" rx="96" ry="9" fill="#FF7A5C" opacity=".14" />
      {/* adulto */}
      <circle cx="72" cy="42" r="15" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.5" />
      <path
        d="M56 122V78a16 16 0 0 1 32 0v44"
        fill="#FFF8F3"
        stroke="#2D2A32"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="88" y="66" width="46" height="38" rx="6" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.5" />
      <path d="M88 82h46" stroke="#2D2A32" strokeWidth="2.2" opacity=".45" />
      {/* niño */}
      <circle cx="176" cy="66" r="11" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.5" />
      <path
        d="M165 122V92a11 11 0 0 1 22 0v30"
        fill="#FFF8F3"
        stroke="#2D2A32"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="188" y="88" width="30" height="24" rx="5" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.5" />
      {/* caja suelo */}
      <rect x="212" y="94" width="34" height="28" rx="5" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.5" />
    </svg>
  );
}

export function WardrobeIllustration() {
  return (
    <svg viewBox="0 0 260 140" role="img" aria-label="Pareja guardando ropa de temporada">
      <ellipse cx="130" cy="128" rx="96" ry="9" fill="#FF7A5C" opacity=".14" />
      {/* armario */}
      <rect x="150" y="16" width="94" height="106" rx="8" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2.5" />
      <path d="M197 16v106" stroke="#2D2A32" strokeWidth="2.2" />
      <path d="M186 62v10M208 62v10" stroke="#2D2A32" strokeWidth="2.6" strokeLinecap="round" />
      {/* ropa colgada */}
      <path d="M160 36h28l6 26h-40l6-26Z" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.2" strokeLinejoin="round" />
      <path d="M208 36h26l5 26h-36l5-26Z" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.2" strokeLinejoin="round" />
      {/* personas */}
      <circle cx="46" cy="44" r="14" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.5" />
      <path
        d="M31 122V80a15 15 0 0 1 30 0v42"
        fill="#FFF8F3"
        stroke="#2D2A32"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <circle cx="98" cy="52" r="13" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.5" />
      <path
        d="M84 122V86a14 14 0 0 1 28 0v36"
        fill="#FFF8F3"
        stroke="#2D2A32"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <rect x="52" y="92" width="40" height="30" rx="5" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.5" />
    </svg>
  );
}

export function PackingIllustration() {
  return (
    <svg viewBox="0 0 260 140" role="img" aria-label="Cajas de mudanza etiquetadas antes de cerrarlas">
      <ellipse cx="130" cy="128" rx="96" ry="9" fill="#FF7A5C" opacity=".14" />
      {/* torre de cajas ya cerradas, la de abajo con su tag puesto */}
      <rect x="40" y="40" width="54" height="32" rx="5" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.5" />
      <path d="M40 54h54" stroke="#2D2A32" strokeWidth="2.2" opacity=".45" />
      <rect x="28" y="72" width="78" height="50" rx="6" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.5" />
      <path d="M28 88h78" stroke="#2D2A32" strokeWidth="2.2" opacity=".45" />
      <g transform="translate(67 104)">
        <circle r="10" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2.5" />
        <circle r="2.2" fill="#2D2A32" />
        <path
          d="M3.8 -3.4a5.4 5.4 0 0 1 0 6.8"
          stroke="#2D2A32"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      {/* la siguiente, todavía abierta */}
      <path
        d="M148 76h84v40a6 6 0 0 1-6 6h-72a6 6 0 0 1-6-6V76Z"
        fill="#FFF8F3"
        stroke="#2D2A32"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M148 76l-14-16 20-7 12 23h-18Z" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M232 76l14-16-20-7-12 23h18Z" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M166 96h48M166 106h30" stroke="#2D2A32" strokeWidth="2.4" strokeLinecap="round" opacity=".35" />
    </svg>
  );
}
