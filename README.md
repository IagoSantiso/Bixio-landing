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
  comercios/      # /comercios — vender el pack en mostrador (margen)
  recomienda/     # /recomienda — prescriptores (comisión)
  globals.css     # todos los estilos del sitio (variables de color, grids, responsive)
  fonts.ts        # Fredoka + Nunito Sans vía next/font (autoalojadas)
components/
  SiteHeader.tsx  SiteNav.tsx     HowItWorks.tsx  UseCases.tsx  SiteFooter.tsx
  Hero.tsx        AiSection.tsx   Pricing.tsx   FinalCta.tsx
  icons.tsx       # logo, check, flecha, iconos de categoría
  illustrations/  # las ilustraciones SVG grandes, una por archivo
  commercial/     # piezas de /comercios y /recomienda (ver abajo)
src/
  worker.ts       # /api/lead, 301 de /trasteros, sitemap.xml y robots.txt
migrations/       # esquema de D1 para los leads
```

### Páginas comerciales

`/comercios` y `/recomienda` son el destino de los emails del agente de
prospección: tráfico frío, desde el móvil, con diez segundos de atención. De ahí
las reglas que siguen y que conviene no romper al editarlas:

- La cifra (15 € de margen, 40 % de comisión) tiene que entrar en la primera
  pantalla del móvil. Si añades algo al hero, comprueba que sigue entrando.
- **Un solo CTA por página.** Por eso `SiteHeader` tiene `variant="comercial"`:
  quita la navegación de consumidor y el "Empezar gratis".
- Las dos se indexan y están en el sitemap. Son captación orgánica, no solo
  destino de email.
- **La home no las menciona, y es a propósito.** Ni el menú del header, ni la
  sección b2b que hubo, ni el bloque de precios: a quien viene a organizar su
  casa no se le ofrece un camino de negocio. La única puerta desde el sitio de
  particulares es la columna "Para negocios" del footer; el resto del tráfico
  llega por email del agente o por un buscador. Es una decisión de navegación,
  no de indexación: siguen siendo URLs públicas, sin `noindex` ni ningún tipo
  de puerta, en el sitemap, y `robots.txt` da permiso explícito a GPTBot,
  ClaudeBot y PerplexityBot además del `*`.

Todo el contenido está en arrays al principio de cada `page.tsx`, salvo lo que
comparten las dos, que vive en `components/commercial/data.ts`: los tipos de
negocio (chips de `/comercios` + desplegable de su formulario) y los perfiles de
prescriptor. Cambiar un chip cambia también la opción del formulario, y ese
valor es el que llega a D1.

`components/commercial/` contiene además `LeadForm` (envía a `/api/lead`),
`Faq` (acordeón nativo con `<details>` + schema `FAQPage`), `BusinessTypePicker`,
`MetricBand`, `Steps` y `analytics.ts`.

**Pendiente y bloqueante:** `/comercios` no tiene todavía la foto del pack real.
Es el elemento que decide la conversión —el comerciante solo tiene que juzgar si
eso se vende solo en su tienda— y ahora mismo su hueco lo tapa la ilustración
del tag. Ver el TODO en `components/commercial/PackPhoto.tsx`.

### Leads y D1

El formulario de las dos páginas hace `POST /api/lead` contra el Worker, que lo
guarda en D1 con `lead_type` (`comercio` o `prescriptor`), el tipo de negocio o
el perfil, la población, la página de origen y las `utm_*`. Sin las UTM no hay
forma de atribuir un lead a la ola de emails que lo trajo.

La base de datos todavía no existe. Para crearla:

```bash
npx wrangler d1 create bixio-leads          # devuelve el database_id
# pega ese id y descomenta el bloque "d1_databases" de wrangler.jsonc
npx wrangler d1 migrations apply bixio-leads --remote
```

Mientras tanto el endpoint responde `{"ok":true,"stored":false}` y vuelca cada
lead a Workers Logs con el prefijo `LEAD_SIN_D1`, así que no se pierde ninguno,
pero hay que ir a buscarlos a mano. Consultarlos después:

```bash
npx wrangler d1 execute bixio-leads --remote \
  --command "SELECT created_at, lead_type, negocio, poblacion, utm_campaign FROM leads ORDER BY id DESC LIMIT 20"
```

### Eventos

`components/commercial/analytics.ts` emite `cta_click`, `lead_submit`,
`lead_ok`, `lead_error` y `business_type_select`, todos con la página de origen.
No carga ninguna herramienta: empuja a `dataLayer`, `gtag` y `plausible` si
existen, y si no es un no-op. El día que se añada el tag, los eventos ya están.

La landing original en HTML de una sola pieza ya no está en el árbol; queda en
el historial de git (`git show 42fa3a6:index.html`).

### Dónde tocar cada cosa

- **Textos, precios y enlaces**: cada sección declara su contenido en un array
  al principio del archivo (`plans` en `Pricing.tsx`, `useCases` en `UseCases.tsx`,
  `steps` en `HowItWorks.tsx`, `columns` en `SiteFooter.tsx`, etc.).
- **Colores y tipografías**: variables CSS en `:root`, al principio de `app/globals.css`.
- **Título y metadatos**: `metadata` en `app/layout.tsx`.

## Despliegue

El sitio vive en un Worker de Cloudflare (`bixio-landing`), conectado al repo con
Workers Builds: cada commit dispara un build, y los de `main` van a producción.

Toda la configuración está en `wrangler.jsonc`, no en el panel:

- `build.command` ejecuta `npm run build`, que con `output: "export"` genera `out/`.
- `assets.directory` publica esa carpeta; `not_found_handling` sirve `out/404.html`.
- `main` apunta a `src/worker.ts`, pero el Worker **solo** se ejecuta en las rutas
  de `assets.run_worker_first` (`/api/*`, `/trasteros`, `/sitemap.xml`,
  `/robots.txt`). El resto de peticiones las sigue sirviendo el binding de assets
  sin ejecutar código, igual que antes.

`sitemap.xml` y `robots.txt` se generan en el Worker, no en el build, para usar
el dominio real de la petición: el repo no sabe en qué dominio vive el sitio.

Por eso el *Deploy command* del panel (`npx wrangler deploy`) construye y despliega
en un solo paso, y el *Build command* puede seguir vacío.

Para desplegar a mano desde local hace falta estar autenticado (`npx wrangler login`):

```bash
npm run deploy              # build + deploy
npx wrangler deploy --dry-run   # comprueba la config sin publicar
```

## Notas

- No hay `/trasteros`. El argumento de fidelización que sostenía esa página no
  aguanta —un self-storage se elige por proximidad y disponibilidad, y un
  inventario ordenado puede acelerar que el inquilino vacíe el box en vez de
  retenerlo—, así que ese público es ahora el chip "Trasteros" de `/comercios` y
  la ruta responde un 301 desde el Worker.
- Las fuentes ya no se piden a `fonts.googleapis.com`: `next/font` las descarga en
  el build y las sirve desde el propio dominio (mejor LCP y cero CLS).
