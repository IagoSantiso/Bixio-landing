import { OG_SIZE, ogImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Bixio para tu casa — organiza mudanza, trastero y garaje";

export default function Image() {
  return ogImage({
    eyebrow: "Para tu casa",
    title: "Sabes lo que guardaste. No dónde.",
    subtitle: "Mudanzas, trasteros, garajes y ropa de temporada, catalogados con una foto.",
  });
}
