import { OG_SIZE, ogImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Bixio — Despídete del caos de tus cajas";

export default function Image() {
  return ogImage({
    eyebrow: "Inventario con tags NFC",
    title: "Despídete del caos de tus cajas.",
    subtitle: "Pega un tag, haz una foto y encuentra cualquier cosa sin abrir nada.",
  });
}
