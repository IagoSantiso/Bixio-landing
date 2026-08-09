const displayFont = { fontFamily: "var(--font-display)" };
const bodyFont = { fontFamily: "var(--font-body)" };

const kpis = [
  { x: 28, value: "312 €", label: "este mes", fill: "#FFC857", text: "#2D2A32" },
  { x: 152, value: "48", label: "clientes activos", fill: "#FF7A5C", text: "#FFF8F3" },
  { x: 276, value: "9", label: "packs vendidos", fill: "#FFF8F3", text: "#2D2A32" },
];

export function PartnerDashboardIllustration() {
  return (
    <svg viewBox="0 0 420 300" role="img" aria-label="Panel de partner con ingresos y clientes activos">
      <rect x="10" y="14" width="400" height="272" rx="18" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2.5" />
      <path d="M10 54h400" stroke="#2D2A32" strokeWidth="2.5" />
      <circle cx="32" cy="34" r="5" fill="#FF7A5C" />
      <circle cx="50" cy="34" r="5" fill="#FFC857" />
      <circle cx="68" cy="34" r="5" fill="#2D2A32" opacity=".25" />
      <text x="150" y="40" style={displayFont} fontSize="15" fontWeight="600" fill="#2D2A32">
        Panel de partner
      </text>

      {/* KPIs */}
      {kpis.map(({ x, value, label, fill, text }) => (
        <g key={label}>
          <rect x={x} y="74" width="112" height="60" rx="12" fill={fill} stroke="#2D2A32" strokeWidth="2.2" />
          <text x={x + 16} y="104" style={displayFont} fontSize="24" fontWeight="600" fill={text}>
            {value}
          </text>
          <text x={x + 16} y="122" style={bodyFont} fontSize="12" fill={text}>
            {label}
          </text>
        </g>
      ))}

      {/* gráfica */}
      <rect x="28" y="152" width="360" height="118" rx="14" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2.2" />
      <path d="M48 244h320M48 214h320M48 184h320" stroke="#2D2A32" strokeWidth="1.4" opacity=".16" />
      <path
        d="M50 240c40-6 62-4 88-22 26-18 44-8 74-26 30-18 60-14 90-32"
        fill="none"
        stroke="#FF7A5C"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="302" cy="160" r="6" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.2" />
      <rect x="50" y="252" width="46" height="10" rx="5" fill="#2D2A32" opacity=".14" />
    </svg>
  );
}
