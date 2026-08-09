export function TagStepIllustration() {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="Mano pegando un tag NFC en una caja">
      <path
        d="M22 58h64l-5 40a10 10 0 0 1-10 9H37a10 10 0 0 1-10-9l-5-40Z"
        fill="#FF7A5C"
        stroke="#2D2A32"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M22 58 12 40l20-7 12 25-22 0Z" fill="#FFC857" stroke="#2D2A32" strokeWidth="3" strokeLinejoin="round" />
      <path d="M86 58l10-18-20-7-12 25 22 0Z" fill="#FFC857" stroke="#2D2A32" strokeWidth="3" strokeLinejoin="round" />
      <g transform="translate(54 74)">
        <circle className="wave" r="20" fill="none" stroke="#2D2A32" strokeWidth="2.5" />
        <circle r="13" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="2.5" />
        <circle r="2.6" fill="#2D2A32" />
        <path
          d="M4.5 -4a7 7 0 0 1 0 8M8.5 -8.5a13 13 0 0 1 0 17"
          stroke="#2D2A32"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
      </g>
      <path
        d="M96 84c-6-2-11 1-14 5-3-6-9-3-8 2 1 8 8 16 15 19 8-3 14-10 14-18 0-6-5-9-7-8Z"
        fill="#FFF8F3"
        stroke="#2D2A32"
        strokeWidth="3"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhotoStepIllustration() {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="Móvil fotografiando el contenido de la caja">
      <rect x="34" y="14" width="52" height="92" rx="12" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="3" />
      <rect x="42" y="26" width="36" height="54" rx="6" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.5" />
      {/* marco de escaneo */}
      <path
        d="M46 34v-4h6M74 34v-4h-6M46 72v4h6M74 72v4h-6"
        stroke="#FFF8F3"
        strokeWidth="2.6"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="52" y="42" width="16" height="12" rx="3" fill="#FFC857" stroke="#2D2A32" strokeWidth="2" />
      <path d="M52 62h16" stroke="#FFF8F3" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="60" cy="92" r="7" fill="none" stroke="#2D2A32" strokeWidth="2.5" />
      <path d="M96 42c4 4 4 10 0 14" stroke="#FFC857" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M24 42c-4 4-4 10 0 14" stroke="#FFC857" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

export function SearchStepIllustration() {
  return (
    <svg viewBox="0 0 120 120" role="img" aria-label="Búsqueda que devuelve la caja donde está el objeto">
      <rect x="14" y="30" width="80" height="24" rx="12" fill="#FFF8F3" stroke="#2D2A32" strokeWidth="3" />
      <path d="M28 42h34" stroke="#2D2A32" strokeWidth="2.6" strokeLinecap="round" opacity=".5" />
      <circle cx="76" cy="42" r="7" fill="none" stroke="#2D2A32" strokeWidth="2.6" />
      <path d="M81 47l6 6" stroke="#2D2A32" strokeWidth="2.6" strokeLinecap="round" />
      <rect x="26" y="68" width="68" height="38" rx="10" fill="#FFC857" stroke="#2D2A32" strokeWidth="3" />
      <path d="M40 78h34M40 90h22" stroke="#2D2A32" strokeWidth="2.6" strokeLinecap="round" />
      <circle cx="88" cy="66" r="11" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2.6" />
      <path
        d="M83 66l3.5 3.5L93 62"
        stroke="#FFF8F3"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
