import type { Metadata, Viewport } from "next";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { graph, organizationSchema, websiteSchema } from "@/lib/schema";
import { ONE_LINER, SITE_NAME, SITE_URL } from "@/lib/site";
import { fredoka, nunitoSans } from "./fonts";
import "./globals.css";

const title = "Bixio — Despídete del caos de tus cajas";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s | Bixio",
  },
  description: ONE_LINER,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  keywords: [
    "inventario doméstico",
    "tags NFC",
    "organizar mudanza",
    "qué hay en cada caja",
    "inventario de trastero",
    "organizar garaje",
    "etiquetas para cajas",
    "self-storage",
  ],
  openGraph: {
    title,
    description: ONE_LINER,
    siteName: SITE_NAME,
    locale: "es_ES",
    type: "website",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: ONE_LINER,
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
      <body>
        <a className="skip-link" href="#contenido">
          Saltar al contenido
        </a>
        {children}
        <JsonLd data={graph(organizationSchema(), websiteSchema())} />
        <Analytics />
      </body>
    </html>
  );
}
