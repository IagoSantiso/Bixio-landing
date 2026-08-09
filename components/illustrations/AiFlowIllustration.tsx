/**
 * Las etiquetas <text> usan `style` en vez del atributo `font-family` porque
 * next/font expone las familias como variables CSS, y los atributos de
 * presentación de SVG no resuelven var().
 */
const displayFont = { fontFamily: "var(--font-display)" };
const bodyFont = { fontFamily: "var(--font-body)" };

const outputs = [
  { y: 70, label: "Herramientas" },
  { y: 130, label: "Ropa" },
  { y: 190, label: "Libros" },
];

export function AiFlowIllustration() {
  return (
    <svg
      viewBox="0 0 440 300"
      role="img"
      aria-label="Diagrama: la foto de una caja se clasifica en categorías"
    >
      {/* móvil con foto */}
      <rect x="14" y="46" width="118" height="208" rx="16" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="3" />
      <rect x="26" y="72" width="94" height="132" rx="10" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.5" />
      <path
        d="M40 88h-6v-6M106 88h6v-6M40 188h-6v6M106 188h6v6"
        stroke="#FFF8F3"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="44" y="104" width="26" height="20" rx="4" fill="#FFC857" stroke="#2D2A32" strokeWidth="2" />
      <rect x="78" y="112" width="22" height="26" rx="4" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2" />
      <rect x="46" y="140" width="52" height="16" rx="4" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2" />
      <rect x="52" y="166" width="34" height="18" rx="4" fill="#FFC857" stroke="#2D2A32" strokeWidth="2" />
      <circle cx="73" cy="226" r="9" fill="none" stroke="#2D2A32" strokeWidth="2.5" />

      {/* nodo central */}
      <g transform="translate(216 150)">
        <circle className="wave" r="34" fill="none" stroke="#FF7A5C" strokeWidth="2.5" />
        <circle r="26" fill="#FFC857" stroke="#2D2A32" strokeWidth="3" />
        <text x="0" y="6" textAnchor="middle" style={displayFont} fontSize="15" fontWeight="600" fill="#2D2A32">
          IA
        </text>
      </g>

      {/* conexiones */}
      <path d="M138 150h48" stroke="#2D2A32" strokeWidth="2.5" strokeDasharray="6 7" fill="none" />
      <path
        d="M248 138c34-14 44-32 70-46M250 150h64M248 162c34 14 44 32 70 46"
        stroke="#2D2A32"
        strokeWidth="2.5"
        strokeDasharray="6 7"
        fill="none"
        opacity=".8"
      />

      {/* salidas */}
      {outputs.map(({ y, label }) => (
        <g key={label}>
          <rect x="318" y={y} width="112" height="42" rx="12" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2.5" />
          <text x="340" y={y + 26} style={bodyFont} fontSize="14" fontWeight="700" fill="#2D2A32">
            {label}
          </text>
          <circle cx="330" cy={y + 21} r="4" fill="#FF7A5C" />
        </g>
      ))}
    </svg>
  );
}
