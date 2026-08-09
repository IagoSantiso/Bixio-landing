import Link from "next/link";

export function FinalCta() {
  return (
    <section className="cierre">
      <div className="wrap">
        <div className="eyebrow eyebrow-center">Empieza hoy</div>
        <h2>La próxima vez que guardes algo, sabrás dónde está.</h2>
        <p>Diez cajas gratis, sin tarjeta. Si te sirve, sigues.</p>
        <div className="cierre-cta">
          <Link className="btn btn-coral" href="/lista-de-espera" data-cta="cierre-home">
            Crear mi inventario
          </Link>
        </div>
      </div>
    </section>
  );
}
