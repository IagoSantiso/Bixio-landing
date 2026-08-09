export function HeroIllustration() {
  return (
    <svg
      viewBox="0 0 460 400"
      role="img"
      aria-label="Caja abierta con objetos catalogándose y un tag NFC escaneando"
    >
      <ellipse cx="230" cy="352" rx="150" ry="20" fill="#FF7A5C" opacity=".13" />

      {/* objetos flotando */}
      <g className="float">
        <rect x="86" y="74" width="62" height="52" rx="9" fill="#FFC857" stroke="#2D2A32" strokeWidth="2.5" />
        <path d="M100 100h34M100 111h22" stroke="#2D2A32" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M96 88h42" stroke="#2D2A32" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      <g className="float float-b">
        <path
          d="M232 46c-10 0-14 6-22 9l7 16 8-3v34h42V68l8 3 7-16c-8-3-12-9-22-9-4 4-11 4-15 0-4 0-9 0-13 0Z"
          fill="#fff"
          stroke="#2D2A32"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
      </g>
      <g className="float float-c">
        <rect x="330" y="86" width="66" height="44" rx="8" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.5" />
        <path
          d="M344 108l10-10 9 9 8-8 11 11"
          stroke="#2D2A32"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <circle cx="349" cy="99" r="4" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2" />
      </g>

      {/* trazos de succión */}
      <path
        d="M140 132c14 22 30 34 56 40M244 108c2 24-2 42-10 58M356 136c-14 20-32 32-58 40"
        stroke="#FF7A5C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="7 9"
        fill="none"
        opacity=".7"
      />

      {/* caja */}
      <path
        d="M112 196h236l-14 132a14 14 0 0 1-14 12H140a14 14 0 0 1-14-12L112 196Z"
        fill="#FF7A5C"
        stroke="#2D2A32"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M126 240h208" stroke="#2D2A32" strokeWidth="2.5" opacity=".45" />
      {/* solapas */}
      <path
        d="M112 196 78 152l52-16 40 44-58 16Z"
        fill="#FFC857"
        stroke="#2D2A32"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M348 196l34-44-52-16-40 44 58 16Z"
        fill="#FFC857"
        stroke="#2D2A32"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M170 180h120v16H170z" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2.5" />

      {/* tag NFC */}
      <g transform="translate(300 276)">
        <circle className="wave wave-3" r="46" fill="none" stroke="#2D2A32" strokeWidth="2" opacity=".35" />
        <circle className="wave wave-2" r="46" fill="none" stroke="#2D2A32" strokeWidth="2" opacity=".5" />
        <circle className="wave" r="46" fill="none" stroke="#2D2A32" strokeWidth="2.5" />
        <circle r="30" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="3" />
        <circle r="4.5" fill="#2D2A32" />
        <path
          d="M9 -8a12 12 0 0 1 0 16M16 -15a22 22 0 0 1 0 30"
          stroke="#2D2A32"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />
      </g>
    </svg>
  );
}
