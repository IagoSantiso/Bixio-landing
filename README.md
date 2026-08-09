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
```

La landing original en HTML de una sola pieza ya no está en el árbol; queda en
el historial de git (`git show 42fa3a6:index.html`).

### Dónde tocar cada cosa

- **Textos, precios y enlaces**: cada sección declara su contenido en un array
  al principio del archivo (`plans` en `Pricing.tsx`, `useCases` en `UseCases.tsx`,
  `steps` en `HowItWorks.tsx`, `columns` en `SiteFooter.tsx`, etc.).
- **Colores y tipografías**: variables CSS en `:root`, al principio de `app/globals.css`.
- **Título y metadatos**: `metadata` en `app/layout.tsx`.

## Despliegue

El sitio se exporta como estático (`output: "export"` en `next.config.ts`), así
que `npm run build` deja el sitio listo en `out/`. Cloudflare despliega solo al
detectar un commit; su configuración de build debe ser:

| Ajuste | Valor |
| --- | --- |
| Build command | `npm run build` |
| Output directory | `out` |
| Node version | 22 |

## Notas

- Las fuentes ya no se piden a `fonts.googleapis.com`: `next/font` las descarga en
  el build y las sirve desde el propio dominio (mejor LCP y cero CLS).
