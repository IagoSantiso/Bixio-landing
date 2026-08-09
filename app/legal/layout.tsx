import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * Las páginas legales están fuera del índice a propósito mientras sean
 * borradores: mejor que no aparezcan en Google a que aparezcan con huecos.
 * Cuando estén completas y revisadas, quita este bloque `robots` y añádelas
 * a app/sitemap.ts y a robots.ts (hoy están en `disallow`).
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <section className="legal">
          <div className="wrap legal-wrap">
            <p className="draft-banner">
              <strong>Borrador sin efecto legal.</strong> Este texto es una plantilla con huecos por
              rellenar. No es asesoramiento jurídico: complétalo con los datos de la empresa y
              revísalo con un profesional antes de darlo por bueno.
            </p>
            <div className="prose">{children}</div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
