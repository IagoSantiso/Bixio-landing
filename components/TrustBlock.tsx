import { GUARANTEE } from "@/lib/pricing";

const sinCobertura = {
  title: "Funciona sin cobertura",
  text: "El tag no necesita internet. En un sótano sin una raya de señal, acercas el móvil y ves lo que hay dentro.",
};

const garantia = {
  title: "30 días de garantía",
  text: GUARANTEE,
};

const comunes = [
  {
    title: "Los tags son reutilizables",
    text: "Vacías la caja, despegas el tag, lo asignas a otra. No es material consumible.",
  },
  {
    title: "Tus fotos son tuyas",
    text: "Se guardan cifradas en servidores europeos. No las vendemos ni entrenamos modelos con ellas. Nunca.",
  },
  {
    title: "Puedes irte cuando quieras",
    text: "Exportas tu inventario completo en un clic, en formato abierto.",
  },
];

/**
 * En /particulares el punto de "sin cobertura" ya tiene su propia sección, así
 * que allí se sustituye por el de la garantía para no repetir.
 */
export function TrustBlock({ variant = "cobertura" }: { variant?: "cobertura" | "garantia" }) {
  const items = [variant === "cobertura" ? sinCobertura : garantia, ...comunes];

  return (
    <section className="trust">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Antes de que preguntes</div>
          <h2>Lo que probablemente te estás preguntando.</h2>
        </div>
        <div className="trust-grid">
          {items.map(({ title, text }) => (
            <div className="trust-item" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
