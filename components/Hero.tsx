import { HeroIllustration } from "./illustrations/HeroIllustration";

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="eyebrow">Inventario con tags NFC</div>
          <h1>
            Despídete del
            <br />
            <span className="accent">caos</span> de tus cajas.
          </h1>
          <p className="hero-sub">
            Pega un tag, haz una foto y Bixio cataloga lo que hay dentro. Luego solo preguntas
            “¿dónde está el taladro?” y te dice en qué caja está. Sin abrir nada.
          </p>
          <div className="hero-cta">
            <a className="btn" href="#precios">
              Empezar gratis
            </a>
            <a className="btn btn-ghost" href="#como">
              Ver cómo funciona
            </a>
          </div>
          <p className="hero-note">
            <span className="dot" /> Sin tarjeta. 10 cajas incluidas para probar.
          </p>
        </div>

        <div className="hero-art">
          <HeroIllustration />
        </div>
      </div>
    </section>
  );
}
