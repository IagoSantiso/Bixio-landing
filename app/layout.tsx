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
      <head>
        {/*
          Analítica sin cookies ni banner de Plausible. Va como HTML manual y
          no como `next/script`: con `output: "export"` esta home es el único
          layout raíz de las tres páginas públicas, así que basta este sitio;
          y `next/script` con `beforeInteractive` no deja el tag en el HTML
          exportado, lo inyecta desde JS en tiempo de ejecución.
        */}
        <script async src="https://plausible.io/js/pa-oFm90TPwrpBVrw7n6odAV.js" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
plausible.init()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
