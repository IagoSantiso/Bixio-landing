import { OG_SIZE, ogImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Bixio para trasteros — programa de partners con comisión recurrente";

export default function Image() {
  return ogImage({
    eyebrow: "Para trasteros",
    title: "Tus inquilinos ya preguntan qué guardaron. Cóbralo.",
    subtitle: "40 % de cada suscripción activa y 20 % de cada pack de tags vendido.",
  });
}
