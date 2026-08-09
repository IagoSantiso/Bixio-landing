import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFF8F3",
        }}
      >
        <div
          style={{
            width: 118,
            height: 84,
            background: "#FF7A5C",
            border: "8px solid #2D2A32",
            borderRadius: 18,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ width: 22, height: 22, borderRadius: 999, background: "#2D2A32" }} />
        </div>
      </div>
    ),
    size,
  );
}
