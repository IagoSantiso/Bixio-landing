import { TagStepIllustration } from "../illustrations/StepIllustrations";

/**
 * ⚠️ TODO(foto-del-pack) — BLOQUEANTE PARA /comercios
 *
 * Aquí va la foto del pack real (o un mockup de alta fidelidad). Es el elemento
 * más importante de la página: lo único que el comerciante tiene que decidir es
 * si eso se vende solo en su tienda, y eso no se decide leyendo.
 *
 * Mientras no exista, este hueco cae en la ilustración del tag que ya usa la
 * home. NO es un sustituto: es un tapón para que el bloque no quede vacío.
 * En cuanto haya foto:
 *   1. Ponla en `public/pack.jpg` (o el nombre que sea).
 *   2. Pásale `src="/pack.jpg"` a este componente desde app/comercios/page.tsx.
 *   3. Borra la rama del `else` y este aviso.
 */
export function PackPhoto({ src }: { src?: string }) {
  return (
    <div className="pack-photo ia-art">
      {src ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt="El pack de etiquetas NFC de Bixio, por delante y por detrás"
          width={720}
          height={540}
        />
      ) : (
        <TagStepIllustration />
      )}
    </div>
  );
}
