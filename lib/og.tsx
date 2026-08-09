import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };

/**
 * Imagen de Open Graph compartida por todas las páginas: la que se ve cuando
 * alguien pega el enlace en WhatsApp, LinkedIn o Slack.
 *
 * Satori (el motor de next/og) solo entiende flexbox y no carga las fuentes del
 * sitio, así que aquí se usa la tipografía por defecto y una composición simple.
 */
export function ogImage({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#FFF8F3",
          color: "#2D2A32",
          padding: 72,
          border: "16px solid #2D2A32",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 44, height: 30, background: "#FF7A5C", borderRadius: 6 }} />
          <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>BIXIO</div>
          <div style={{ fontSize: 24, color: "#E85E40", letterSpacing: 4, marginLeft: 12 }}>
            {eyebrow.toUpperCase()}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
          <div style={{ fontSize: 30, color: "#6E6873", marginTop: 24, lineHeight: 1.35 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ height: 10, width: 120, background: "#FFC857", borderRadius: 999 }} />
          <div style={{ fontSize: 24, color: "#6E6873" }}>bixiotag.com</div>
        </div>
      </div>
    ),
    OG_SIZE,
  );
}
