/**
 * Inyecta datos estructurados. El JSON se serializa escapando `<` para que un
 * texto con HTML no pueda cerrar la etiqueta <script> antes de tiempo.
 */
export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
