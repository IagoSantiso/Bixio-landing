import type { Metadata } from "next";
import { PLANS, TAG_PACK } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Condiciones de contratación",
  description: "Planes, precios, duración, renovación, desistimiento y envío de los tags NFC.",
};

export default function CondicionesPage() {
  return (
    <>
      <h1>Condiciones de contratación</h1>
      <p className="prose-meta">Última actualización: pendiente</p>

      <h2>Planes y precios</h2>
      <p>Precios con impuestos [CONFIRMAR si los importes mostrados incluyen IVA]:</p>
      <ul>
        {PLANS.map((plan) => (
          <li key={plan.id}>
            <strong>{plan.name}:</strong> {plan.price}
            {plan.period} — {plan.billing}.
          </li>
        ))}
        <li>
          <strong>Pack de {TAG_PACK.units} tags NFC:</strong> {TAG_PACK.price}, pago único.
        </li>
      </ul>

      <h2>Duración y renovación</h2>
      <p>
        [DETALLAR: los planes anuales, ¿se renuevan automáticamente? ¿con cuánta antelación se avisa?
        ¿cómo se cancela? El plan Mudanza se anuncia como pago único de 30 días sin suscripción, y
        eso debe quedar explícito aquí.]
      </p>

      <h2>Qué ocurre con el inventario al terminar</h2>
      <p>
        [La página de precios dice que al acabar el plan Mudanza «pasas a anual o se borra».
        Concretar: plazo de gracia, aviso previo y si existe exportación de los datos antes del
        borrado. Este punto genera reclamaciones si no está claro.]
      </p>

      <h2>Derecho de desistimiento</h2>
      <p>
        [Obligatorio en venta a consumidores: 14 días naturales. Detallar cómo se aplica a un
        servicio digital que empieza a usarse de inmediato y al pack físico de tags, que sigue las
        reglas de devolución de un producto.]
      </p>

      <h2>Envío de los tags</h2>
      <p>[Plazos, zonas de envío, gastos y qué ocurre si el pack llega defectuoso.]</p>

      <h2>Programa de partners</h2>
      <p>
        [Condiciones del 40 % por suscripción activa y 20 % por pack vendido: cuándo se devenga,
        cómo y cuándo se liquida, qué pasa si el cliente se da de baja y causas de terminación.]
      </p>

      <h2>Atención al cliente y reclamaciones</h2>
      <p>[EMAIL de soporte y plazo de respuesta. Mención a la plataforma europea de resolución de litigios si procede.]</p>
    </>
  );
}
