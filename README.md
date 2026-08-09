# Bixio-landing

Web de Bixio, construida con [Next.js 16](https://nextjs.org) (App Router) y TypeScript.

## Arrancar en local

```bash
npm install
npm run dev        # http://localhost:3000
```

Otros comandos:

```bash
npm run build      # export estático en out/
npm start          # sirve el build
npm run typecheck  # comprueba tipos
npm run lint       # ESLint
npm run deploy     # build + deploy a Cloudflare (requiere npx wrangler login)
```

## Páginas

| Ruta | Para qué es |
| --- | --- |
| `/` | Home: enruta por público, enseña el producto, precios y FAQ resumida. |
| `/particulares` | Mudanzas, ropa de temporada, trastero y garaje. Comparativa frente al rotulador y a la hoja de cálculo. |
| `/mudanza` | Landing de intención alta: el método por fechas para no perder nada al mudarse. |
| `/trasteros` | Para operadores de self-storage: retención primero, comisión después. |
| `/trasteros/calculadora` | Simulador de comisión y de valor de retención. Lead magnet B2B. |
| `/preguntas-frecuentes` | **Fuente canónica** de las FAQ y única página con schema `FAQPage`. |
| `/lista-de-espera` | Destino de todos los CTA cuando no hay JavaScript. Sin indexar. |
| `/legal/*` | Aviso legal, privacidad, condiciones y cookies. **Borradores sin indexar.** |

## Captura de leads

Todos los CTA son enlaces a `/lista-de-espera`; una isla de cliente
(`components/LeadCapture.tsx`) intercepta el clic y abre el modal. Si el
JavaScript falla, el enlace lleva a la página completa: nunca hay un botón
muerto.

Cada lead guarda email, segmento (`¿qué vas a organizar?`), página de origen y
CTA pulsado, y marca `partnerLead` cuando la respuesta es «gestiono trasteros».

Sin `NEXT_PUBLIC_LEADS_ENDPOINT` configurado, el formulario abre el correo del
usuario con los datos escritos en vez de fingir que ha guardado algo. Para
persistir en Cloudflare D1, ver `worker/README.md`.

## Estructura

```
app/
  layout.tsx         # lang, metadatos, canónicas, schema global, analítica
  page.tsx           # home
  globals.css        # todos los estilos del sitio
  fonts.ts           # Fredoka + Nunito Sans autoalojadas (next/font)
  icon.svg           # favicon
  apple-icon.tsx     # icono de iOS, generado en el build
  opengraph-image.tsx# imagen para compartir (una por página)
  robots.ts          # robots.txt
  sitemap.ts         # sitemap.xml
components/          # secciones e ilustraciones SVG
lib/
  site.ts            # URL, navegación, email de partners, frase de una línea
  pricing.ts         # precios: los usan la tabla, las páginas y el JSON-LD
  faq.ts             # preguntas y respuestas
  schema.ts          # constructores de JSON-LD
public/llms.txt      # resumen del producto para asistentes de IA
```

### Dónde tocar cada cosa

- **Precios**: `lib/pricing.ts`. Cambia ahí y se actualizan la tabla, las páginas
  y los datos estructurados a la vez.
- **Preguntas frecuentes**: `lib/faq.ts`. Cada entrada tiene `a` (respuesta
  completa, solo en la página canónica) y `short` (resumen para las páginas
  satélite, que enlazan a la completa). Así no se canibalizan entre ellas.
- **Textos de sección**: cada componente declara su contenido en un array arriba
  del archivo.
- **Colores y tipografías**: variables CSS en `:root`, en `app/globals.css`.

## SEO y visibilidad en asistentes

- Metadatos, canónicas y Open Graph por página; imagen de compartir generada en
  el build con `next/og`.
- Datos estructurados: `Organization`, `WebSite`, `SoftwareApplication` con las
  ofertas reales, `HowTo` con los tres pasos, `FAQPage` y `BreadcrumbList`.
- `robots.txt` permite explícitamente a los rastreadores de asistentes (GPTBot,
  OAI-SearchBot, ClaudeBot, PerplexityBot…).
- `public/llms.txt` resume producto, precios, requisitos y límites en texto plano.
- Las respuestas de la FAQ están escritas para poder citarse sueltas: cada una se
  entiende sin contexto y nombra Bixio y el dato concreto.

## Analítica

Cloudflare Web Analytics, sin cookies y por tanto sin banner. Se activa
definiendo `NEXT_PUBLIC_CF_BEACON_TOKEN` en las variables del proyecto de
Cloudflare; mientras no exista, no se inyecta nada.

## Accesibilidad

Auditado con axe (WCAG 2.1 AA) en las cinco páginas, en escritorio y móvil, sin
incumplimientos. Dos decisiones que conviene no revertir sin volver a medir:

- `--coral-text` (#C43417) es el coral para **texto**; `--coral` (#FF7A5C) se
  queda para rellenos e ilustraciones. El coral original no llega a 4.5:1 sobre
  los fondos claros.
- Los botones y la insignia de color coral llevan texto carbón, no blanco: el
  blanco sobre coral se queda en 2,56:1.

## Despliegue

El sitio vive en un Worker de Cloudflare (`bixio-landing`) conectado al repo con
Workers Builds: cada commit dispara un build y los de `main` van a producción.
La configuración está en `wrangler.jsonc`, no en el panel: `build.command`
ejecuta `npm run build` y `assets.directory` publica `out/`.
