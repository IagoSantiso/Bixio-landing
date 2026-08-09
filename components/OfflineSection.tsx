const puntos = [
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <circle cx="13" cy="13" r="2.6" fill="#2D2A32" />
        <path
          d="M17 8.6a7 7 0 0 1 0 8.8M20.6 5a12 12 0 0 1 0 16"
          stroke="#2D2A32"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M9 8.6a7 7 0 0 0 0 8.8M5.4 5a12 12 0 0 0 0 16"
          stroke="#2D2A32"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          opacity=".35"
        />
      </svg>
    ),
    title: "El NFC no necesita internet",
    text: "Acercas el móvil a la caja y ves lo que hay dentro ahí mismo, en el pasillo del trastero, sin abrirla y sin una sola raya de cobertura.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <rect
          x="6"
          y="2.5"
          width="14"
          height="21"
          rx="3.5"
          stroke="#2D2A32"
          strokeWidth="2.2"
          fill="#FFF8F3"
        />
        <path d="M10 9h6M10 13h6M10 17h3.5" stroke="#2D2A32" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
    ),
    title: "Catalogas sin conexión",
    text: "Bajas al trastero, escaneas los tags y fotografías todo lo que quieras. Se guarda en el móvil aunque no haya red: no tienes que subir a la calle entre caja y caja.",
  },
  {
    icon: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
        <path
          d="M4 13a9 9 0 0 1 15.5-6.2M22 13a9 9 0 0 1-15.5 6.2"
          stroke="#2D2A32"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M19.5 2.5v4.5H15M6.5 23.5V19H11"
          stroke="#2D2A32"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    ),
    title: "Se sincroniza solo al salir",
    text: "En cuanto recuperas cobertura, el móvil sube lo que hiciste y la IA cataloga las fotos. Tú no tienes que acordarte de darle a ningún botón.",
  },
];

export function OfflineSection() {
  return (
    <section className="offline" id="sin-cobertura">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Sin cobertura</div>
          <h2>Tu trastero está en un sótano y no entra el móvil. Da igual.</h2>
          <p>
            Es la primera pega que pone todo el mundo, y es justo la razón de usar NFC en vez de un
            código que haya que consultar en internet.
          </p>
        </div>
        <div className="offline-grid">
          {puntos.map(({ icon, title, text }) => (
            <div className="offline-card" key={title}>
              <span className="offline-chip">{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
