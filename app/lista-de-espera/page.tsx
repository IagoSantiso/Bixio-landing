import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { WaitlistForm } from "@/components/WaitlistForm";

export const metadata: Metadata = {
  title: "Lista de espera",
  description: "Bixio abre en septiembre. Déjanos tu email y entra de los primeros.",
  // Es el destino de fallback de los CTA, no una página para posicionar.
  robots: { index: false, follow: true },
};

export default function WaitlistPage() {
  return (
    <>
      <SiteHeader />
      <main id="contenido">
        <section className="page-hero page-hero-narrow">
          <div className="wrap legal-wrap">
            <div className="eyebrow">Lista de espera</div>
            <h1>Bixio abre en septiembre.</h1>
            <p className="hero-sub">
              Déjanos tu email y eres de los primeros. Los primeros 100 entran con el pack de tags
              gratis.
            </p>
            <div className="form-card">
              <WaitlistForm origin="/lista-de-espera" cta="pagina-lista-de-espera" />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
