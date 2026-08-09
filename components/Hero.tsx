import Link from "next/link";
import { HeroIllustration } from "./illustrations/HeroIllustration";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">Inventario con tags NFC</div>
          <h1>
            Sabe lo que hay en cada caja.
            <br />
            <span className="accent">Sin abrir ninguna.</span>
          </h1>
          <p className="hero-sub">
            Pega un tag NFC, haz una foto y Bixio cataloga el contenido solo. Luego preguntas
            «¿dónde está el taladro?» y te dice la caja, la estantería y el sitio.
          </p>
          <div className="hero-cta">
            <Link className="btn" href="/lista-de-espera" data-cta="hero-home">
              Probar gratis — 10 cajas
            </Link>
            <Link className="btn btn-ghost" href="#como">
              Ver cómo funciona
            </Link>
          </div>
          <p className="hero-note">
            <span className="dot" /> Sin tarjeta. Funciona sin cobertura. Tus fotos no salen de
            Europa.
          </p>
        </div>

        <div className="hero-art">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
