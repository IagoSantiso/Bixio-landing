import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de cookies",
  description: "Qué cookies usa este sitio web. Hoy, ninguna.",
};

export default function CookiesPage() {
  return (
    <>
      <h1>Política de cookies</h1>
      <p className="prose-meta">Última actualización: pendiente</p>

      <h2>Este sitio no usa cookies</h2>
      <p>
        A día de hoy la web de Bixio no instala cookies propias ni de terceros, ni utiliza
        almacenamiento local del navegador con fines de seguimiento. Por eso no verás un banner de
        consentimiento: no hay nada que consentir.
      </p>

      <h2>Analítica sin cookies</h2>
      <p>
        Las visitas se miden con Cloudflare Web Analytics, que obtiene métricas agregadas sin
        cookies, sin huella digital del dispositivo y sin identificar a personas concretas.
      </p>

      <h2>Si esto cambia</h2>
      <p>
        En cuanto se añada cualquier cookie que no sea estrictamente necesaria —analítica con
        identificadores, píxeles publicitarios, vídeos incrustados de terceros— habrá que publicar el
        listado aquí e implementar un banner de consentimiento previo conforme exige la AEPD.
      </p>

      <h2>Cómo controlar las cookies</h2>
      <p>
        Puedes bloquear o eliminar cookies desde la configuración de tu navegador. En este sitio no
        afectará a nada, porque no se usa ninguna.
      </p>
    </>
  );
}
