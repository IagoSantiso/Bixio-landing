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
  StartModal.tsx  # captación de particulares (lo abre cualquier CTA)
  icons.tsx       # logo, check, flecha, iconos de categoría
  illustrations/  # las ilustraciones SVG grandes, una por archivo
  commercial/     # piezas de /comercios y /recomienda (ver abajo)
src/
  worker.ts       # router: /api/lead, /admin, 301 de /trasteros, sitemap, robots
  leads.ts        # POST /api/lead, común a las tres fuentes de captación
  env.ts          # bindings
  admin/          # el panel de leads (ver abajo)
migrations/       # esquema de D1 para los leads y la cuenta del panel
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
- **La home casi no las menciona, y es a propósito.** Ni el menú del header, ni
  la sección b2b que hubo, ni las tarjetas de "Para quién es": a quien viene a
  organizar su casa no se le ofrece un camino de negocio. Solo quedan dos
  puertas, las dos calladas — la columna "Para negocios" del footer y una línea
  al final del bloque de precios (`.price-b2b`). **Esa línea no puede llevar
  cifras, porcentajes, comisiones ni márgenes**: dice que existe una vía para
  negocios y nada más, porque el trato no es asunto de un particular que está
  eligiendo plan. El resto del tráfico llega por email del agente o por un
  buscador.
- Nada de lo anterior es una decisión de indexación: las dos páginas siguen
  siendo URLs públicas, sin `noindex` ni ningún tipo de puerta, en el sitemap, y
  `robots.txt` da permiso explícito a GPTBot, ClaudeBot y PerplexityBot además
  del `*`.

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

Hay **tres** sitios donde se captan leads, y los tres hacen `POST /api/lead`
contra el Worker, que los guarda en la misma tabla:

| Origen (`lead_type`) | Dónde | Qué distingue a ese lead (`segmento`) |
| --- | --- | --- |
| `particular` | modal de la home (`StartModal`) | `mudanza`, `casa`, `trastero` o `negocio` |
| `comercio` | formulario de `/comercios` | el tipo de negocio (`Papelería`, …) |
| `prescriptor` | formulario de `/recomienda` | el perfil (`Empresas de mudanzas`, …) |

Una sola tabla y no tres porque la pregunta que hay que contestar —cuánta
demanda hay y de qué tipo— cruza las tres fuentes. Por eso el tipo de negocio,
el perfil del prescriptor y el "para qué" del particular viven en la misma
columna `segmento`: son el mismo dato con tres nombres.

Cada lead guarda además la página de origen, **el CTA que lo generó** y las
`utm_*`. Sin el CTA se sabe qué página convierte pero no qué la hace convertir;
sin las UTM no hay forma de atribuir un lead a la ola de emails que lo trajo.

Los segmentos de particular son una lista cerrada (`SEGMENTOS_PARTICULAR` en
`src/leads.ts`) y el endpoint rechaza cualquier otro: con texto libre, "¿qué
porcentaje viene por mudanza?" deja de tener respuesta. Los de comercio y
prescriptor sí son abiertos, porque salen de `components/commercial/data.ts` y
cambian con el negocio.

La base de datos todavía no existe. Para crearla:

```bash
npx wrangler d1 create bixio-leads          # devuelve el database_id
# pega ese id y descomenta el bloque "d1_databases" de wrangler.jsonc
npx wrangler d1 migrations apply bixio-leads --remote
```

Mientras tanto el endpoint responde `{"ok":true,"stored":false}` y vuelca cada
lead a Workers Logs con el prefijo `LEAD_SIN_D1`, así que no se pierde ninguno,
pero hay que ir a buscarlos a mano. Una vez creada, los leads se miran en el
panel (siguiente sección); a mano sigue siendo:

```bash
npx wrangler d1 execute bixio-leads --remote \
  --command "SELECT created_at, lead_type, segmento, negocio, estado FROM leads ORDER BY id DESC LIMIT 20"
```

### Panel de leads (`/admin`)

Herramienta interna, un solo usuario. Es la única forma de ver los leads sin
consultar la base de datos a mano, y por tanto de saber qué tipo de demanda hay
y qué leads comerciales están sin contactar.

Qué tiene: listado unificado de las tres fuentes con filtros (origen, segmento,
estado, rango de fechas, búsqueda por email o negocio), contadores de cabecera,
detalle por lead con estado de seguimiento y notas, y export a CSV que respeta
los filtros activos. Lo primero que se ve al entrar es cuántos leads de negocio
siguen en estado `nuevo`, con enlace directo a ese filtro: es el número que
alimenta el pipeline de LOI.

El estado (`nuevo` → `contactado` → `conversacion` → `cerrado` / `descartado`)
solo se edita en leads de comercio y prescriptor. Un particular no se trabaja a
mano: cuenta como demanda y ya.

**Está en el Worker (`src/admin/`), no en `app/`.** No es una preferencia: con
`output: "export"` una página de Next acaba siendo un HTML en `out/` que el
binding de assets sirve **sin ejecutar código**, así que no habría dónde
comprobar la sesión. Por eso `/admin` y `/admin/*` están en `run_worker_first`,
y por eso el panel es HTML renderizado en el Worker en lugar de server
components.

**La cuenta vive en D1, no en secretos del Worker.** Sin registro ni gestión de
usuarios: una sola fila (`admin_user`, `migrations/0003_admin_user.sql`) con
email, hash de contraseña y la clave que firma la sesión. Para dejarlo
operativo basta con aplicar las migraciones y visitar el panel:

```bash
npx wrangler d1 migrations apply bixio-leads --remote
```

La primera vez que alguien visita `/admin` sin que exista ninguna cuenta
todavía, se le manda a `/admin/setup` a crearla (email + contraseña) y entra
directo. Después, email y contraseña se cambian desde dentro del panel, en
`/admin/cuenta` — pide siempre la contraseña actual para confirmar el cambio, y
al guardar rota la clave de sesión, así que cierra cualquier otra sesión
abierta.

**Aviso:** hasta que se crea esa primera cuenta, `/admin/setup` no comprueba
quién la crea — es quien llegue primero, como el instalador de cualquier
aplicación. No es un problema mientras el panel no tenga datos que proteger,
pero conviene visitarla justo después de aplicar las migraciones, no dejarla
esperando.

Si más adelante hace falta algo más serio que contraseña propia —login con
Google, MFA—, la vía natural es poner **Cloudflare Access** delante de
`/admin/*` desde el dashboard de Zero Trust: sin escribir cliente OAuth
ninguno, gratis hasta 50 usuarios.

Detalles que conviene no romper al tocarlo:

- La sesión es una cookie `httpOnly; Secure; SameSite=Strict` firmada con HMAC
  usando la clave de esa fila, sin tabla de sesiones aparte. Dura 12 horas.
- La comprobación de sesión está **una sola vez**, arriba del router de
  `src/admin/index.ts`, para que añadir una ruta no pueda dejarla abierta.
- Los formularios que escriben llevan token CSRF ligado a la sesión, y
  `/admin/cuenta` además exige la contraseña actual.
- `/admin` no se indexa por tres vías a la vez: `Disallow` en `robots.txt`,
  `noindex` en la meta y en la cabecera `X-Robots-Tag`. Y no está en el sitemap.
- El CSV escapa las celdas que empiezan por `= + - @`: ese texto lo escribe
  cualquiera desde un formulario público y Excel lo ejecutaría como fórmula.

### Eventos

`components/commercial/analytics.ts` emite `cta_click`, `lead_submit`,
`lead_ok`, `lead_error` y `business_type_select`, todos con la página de origen.
El modal de particulares emite los mismos, con `lead_type: "particular"`.
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
  de `assets.run_worker_first` (`/api/*`, `/admin`, `/admin/*`, `/trasteros`,
  `/sitemap.xml`, `/robots.txt`). El resto de peticiones las sigue sirviendo el
  binding de assets sin ejecutar código, igual que antes.

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
