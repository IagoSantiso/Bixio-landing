import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso legal",
  description: "Datos identificativos del titular del sitio y condiciones de uso.",
};

export default function AvisoLegalPage() {
  return (
    <>
      <h1>Aviso legal</h1>
      <p className="prose-meta">Última actualización: pendiente</p>

      <h2>Titular del sitio</h2>
      <p>
        En cumplimiento del deber de información de la Ley 34/2002 de Servicios de la Sociedad de la
        Información y de Comercio Electrónico (LSSI-CE), se hacen constar los siguientes datos:
      </p>
      <ul>
        <li>
          <strong>Titular:</strong> [RAZÓN SOCIAL O NOMBRE Y APELLIDOS]
        </li>
        <li>
          <strong>NIF/CIF:</strong> [NIF]
        </li>
        <li>
          <strong>Domicilio:</strong> [DIRECCIÓN COMPLETA]
        </li>
        <li>
          <strong>Correo de contacto:</strong> [EMAIL]
        </li>
        <li>
          <strong>Datos registrales:</strong> [SI PROCEDE: registro mercantil, tomo, folio, hoja]
        </li>
      </ul>

      <h2>Objeto</h2>
      <p>
        Este sitio web presenta el servicio Bixio de inventario doméstico mediante etiquetas NFC y
        catalogado automático de fotografías. El acceso al sitio es gratuito y no requiere registro.
      </p>

      <h2>Condiciones de uso</h2>
      <p>
        La persona usuaria se compromete a hacer un uso lícito del sitio y a no realizar acciones que
        puedan dañar su funcionamiento o los derechos de terceros.
      </p>

      <h2>Propiedad intelectual e industrial</h2>
      <p>
        Los contenidos del sitio —textos, ilustraciones, marca y diseño— pertenecen a su titular o se
        usan con autorización, y no pueden reproducirse sin permiso.
      </p>

      <h2>Responsabilidad</h2>
      <p>
        El titular no se responsabiliza del uso que terceros hagan de la información publicada ni de
        los contenidos de sitios enlazados.
      </p>

      <h2>Legislación aplicable</h2>
      <p>Esta relación se rige por la legislación española.</p>
    </>
  );
}
