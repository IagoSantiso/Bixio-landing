import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  description: "Qué datos trata Bixio, con qué base legal, cuánto tiempo y qué derechos tienes.",
};

export default function PrivacidadPage() {
  return (
    <>
      <h1>Política de privacidad</h1>
      <p className="prose-meta">Última actualización: pendiente</p>

      <h2>Responsable del tratamiento</h2>
      <ul>
        <li>
          <strong>Responsable:</strong> [RAZÓN SOCIAL] — [NIF]
        </li>
        <li>
          <strong>Domicilio:</strong> [DIRECCIÓN]
        </li>
        <li>
          <strong>Contacto de privacidad:</strong> [EMAIL]
        </li>
        <li>
          <strong>Delegado de protección de datos:</strong> [SI PROCEDE]
        </li>
      </ul>

      <h2>Qué datos tratamos y para qué</h2>
      <p>
        Hay que enumerar aquí cada tratamiento real. A modo de esqueleto, los previsibles en este
        servicio son:
      </p>
      <ul>
        <li>
          <strong>Cuenta de usuario:</strong> correo electrónico y contraseña, para dar acceso al
          servicio. Base legal: ejecución del contrato.
        </li>
        <li>
          <strong>Fotografías del contenido de las cajas:</strong> imágenes subidas por la persona
          usuaria y el listado de objetos que genera el sistema a partir de ellas. Base legal:
          ejecución del contrato. [DESCRIBIR si el procesado ocurre en servidores propios o de un
          proveedor de IA, y cuál.]
        </li>
        <li>
          <strong>Datos de pago:</strong> gestionados por la pasarela de pago [PROVEEDOR]; el titular
          no almacena los datos de la tarjeta.
        </li>
        <li>
          <strong>Analítica web:</strong> métricas agregadas de visitas mediante Cloudflare Web
          Analytics, que no usa cookies ni identifica a personas concretas.
        </li>
      </ul>

      <h2>Conservación</h2>
      <p>
        [PLAZOS REALES por tratamiento. Ojo: el plan Mudanza indica que el inventario se borra al
        acabar los 30 días; ese plazo debe describirse aquí de forma coherente con lo que anuncian
        los precios.]
      </p>

      <h2>Destinatarios y encargados</h2>
      <p>
        [LISTAR los proveedores que acceden a datos: alojamiento, pasarela de pago, proveedor de IA,
        correo. Indicar si hay transferencias internacionales y con qué garantías.]
      </p>

      <h2>Uso de las fotografías</h2>
      <p>
        Las fotografías que sube la persona usuaria son suyas. No se venden a terceros ni se utilizan
        para entrenar modelos de inteligencia artificial. [Confirmar que esto es cierto también
        respecto de los proveedores subcontratados y reflejarlo en el contrato con ellos.]
      </p>

      <h2>Derechos</h2>
      <p>
        Puedes ejercer los derechos de acceso, rectificación, supresión, oposición, limitación y
        portabilidad escribiendo a [EMAIL], acreditando tu identidad. También puedes reclamar ante la
        Agencia Española de Protección de Datos (www.aepd.es).
      </p>

      <h2>Menores</h2>
      <p>[EDAD MÍNIMA para usar el servicio y cómo se comprueba.]</p>
    </>
  );
}
