/** Iconos pequeños reutilizados en varias secciones. */

export function BixioMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <rect x="2" y="9" width="26" height="18" rx="4" fill="#FF7A5C" stroke="#2D2A32" strokeWidth="2" />
      <path d="M2 14h26" stroke="#2D2A32" strokeWidth="2" />
      <path d="M8 9 11 3h8l3 6" stroke="#2D2A32" strokeWidth="2" strokeLinejoin="round" fill="#FFC857" />
      <circle cx="15" cy="20" r="2" fill="#2D2A32" />
      <path
        d="M18.6 17.4a5 5 0 0 1 0 5.2M21.2 15.4a8.4 8.4 0 0 1 0 9.2"
        stroke="#2D2A32"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg className={className} width="46" height="16" viewBox="0 0 46 16" fill="none" aria-hidden="true">
      <path
        d="M1 8h40m0 0-7-6m7 6-7 6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CheckIcon({ color = "#FF7A5C" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3 8.5l3.5 3.5L13 5"
        stroke={color}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ToolsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M13 2a5 5 0 0 0-4.6 7L2 15.4 4.6 18l6.4-6.4A5 5 0 1 0 13 2Z"
        stroke="#2D2A32"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ClothesIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M10 3c-2 0-3 1-5 1.6L6.6 9 8 8.4V17h4V8.4L13.4 9 15 4.6C13 4 12 3 10 3Z"
        stroke="#2D2A32"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function BooksIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M3 4h5a2 2 0 0 1 2 2v10a2 2 0 0 0-2-2H3V4ZM17 4h-5a2 2 0 0 0-2 2v10a2 2 0 0 1 2-2h5V4Z"
        stroke="#2D2A32"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}
