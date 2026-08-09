import { OG_SIZE, ogImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Bixio para trasteros — vende con tu código y llévate comisión";

export default function Image() {
  return ogImage({
    eyebrow: "Para trasteros",
    title: "Un producto más que vender, y no lo gestionas tú.",
    subtitle: "40 % de cada suscripción vendida con tu código y 20 % de cada pack de tags.",
  });
}
