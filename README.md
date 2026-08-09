# Bixio-landing

Landing page de Bixio, construida con [Next.js 16](https://nextjs.org) (App Router) y TypeScript.

## Arrancar en local

```bash
npm install
npm run dev        # http://localhost:3000
```

Otros comandos:

```bash
npm run build      # build de producción
npm start          # sirve el build
npm run typecheck  # comprueba tipos sin compilar
```

## Estructura

```
app/
  layout.tsx      # <html lang="es">, metadatos SEO/Open Graph, fuentes
  page.tsx        # composición de la home
  globals.css     # todos los estilos del sitio (variables de color, grids, responsive)
  fonts.ts        # Fredoka + Nunito Sans vía next/font (autoalojadas)
components/
  SiteHeader.tsx  HowItWorks.tsx  UseCases.tsx  Partners.tsx  SiteFooter.tsx
  Hero.tsx        AiSection.tsx   Pricing.tsx   FinalCta.tsx
  icons.tsx       # logo, check, flecha, iconos de categoría
  illustrations/  # las ilustraciones SVG grandes, una por archivo
legacy/
  index.html      # la landing original en HTML, conservada como referencia
```

### Dónde tocar cada cosa

- **Textos, precios y enlaces**: cada sección declara su contenido en un array
  al principio del archivo (`plans` en `Pricing.tsx`, `useCases` en `UseCases.tsx`,
  `steps` en `HowItWorks.tsx`, `columns` en `SiteFooter.tsx`, etc.).
- **Colores y tipografías**: variables CSS en `:root`, al principio de `app/globals.css`.
- **Título y metadatos**: `metadata` en `app/layout.tsx`.

## Notas

- Las fuentes ya no se piden a `fonts.googleapis.com`: `next/font` las descarga en
  el build y las sirve desde el propio dominio (mejor LCP y cero CLS).
- La página se prerenderiza como estática. Si quieres publicarla en un hosting de
  ficheros (GitHub Pages, Netlify Drop…), descomenta `output: "export"` en
  `next.config.ts` y `npm run build` generará la carpeta `out/`.
