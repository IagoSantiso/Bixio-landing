import Link from "next/link";

/**
 * En una página de consumidor, el bloque B2B completo sobraba: al particular no
 * le importa la comisión y le hace pensar que esto es un negocio y no una app
 * para él. Queda un banner de dos líneas que enruta a /trasteros.
 */
export function PartnersBanner() {
  return (
    <section className="partners-banner">
      <div className="wrap partners-banner-inner">
        <div>
          <h2>¿Gestionas trasteros o self-storage?</h2>
          <p>
            Tus inquilinos pueden catalogar su box desde el móvil, y tú te llevas comisión de cada
            venta que entre con tu código.
          </p>
        </div>
        <Link className="btn" href="/trasteros">
          Ver el programa
        </Link>
      </div>
    </section>
  );
}
