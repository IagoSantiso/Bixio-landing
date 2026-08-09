import type { Metadata, Viewport } from "next";
import { fredoka, nunitoSans } from "./fonts";
import "./globals.css";

const title = "Bixio — Despídete del caos de tus cajas";
const description =
  "Pega un tag NFC, haz una foto y Bixio cataloga lo que hay dentro. " +
  "Luego preguntas “¿dónde está el taladro?” y te dice en qué caja está. Sin abrir nada.";

export const metadata: Metadata = {
  title,
  description,
  applicationName: "Bixio",
  keywords: [
    "inventario doméstico",
    "tags NFC",
    "mudanza",
    "trastero",
    "self-storage",
    "organizar cajas",
  ],
  openGraph: {
    title,
    description,
    siteName: "Bixio",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF8F3",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${fredoka.variable} ${nunitoSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
