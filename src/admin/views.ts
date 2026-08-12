/**
 * Las tres pantallas: login, listado y detalle.
 *
 * Todo es HTML renderizado en el Worker. La landing es un export estático, así
 * que aquí no hay React ni componentes de servidor de Next: el panel se sirve
 * entero desde `src/`, que además es la única forma de que /admin esté
 * realmente protegido — un HTML en `out/` lo sirve el binding de assets sin
 * pasar por el Worker, y por tanto sin comprobar la sesión.
 */

import { LEAD_TYPES } from "../leads";
import { escape, formatDate, page, topBar } from "./html";
import {
  COMERCIALES,
  ESTADOS,
  ESTADO_LABEL,
  ORIGEN_LABEL,
  PAGE_SIZE,
  filtersToQuery,
  type Counts,
  type Filters,
  type Lead,
} from "./queries";

// ---------------------------------------------------------------- login

export function loginPage(error?: string): Response {
  return page(
    "Entrar",
    `<div class="login">
  <h1>Panel de leads</h1>
  <p class="sub">Acceso interno de Bixio.</p>
  ${error ? `<p class="error">${escape(error)}</p>` : ""}
  <form method="post" action="/admin/login">
    <div class="campo">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" autocomplete="username" required autofocus>
    </div>
    <div class="campo">
      <label for="password">Contraseña</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required>
    </div>
    <button type="submit">Entrar</button>
  </form>
</div>`,
    error ? 401 : 200,
  );
}

/** `/admin/cuenta`: cambiar email y/o contraseña desde el propio panel. */
export function accountPage(email: string, csrf: string, guardado: boolean, error?: string): Response {
  return page(
    "Mi cuenta",
    `${topBar(email, csrf)}
<div class="main">
  <a class="volver" href="/admin">← Volver al listado</a>
  <h1>Mi cuenta</h1>
  <div class="caja" style="max-width:420px">
    ${error ? `<p class="error">${escape(error)}</p>` : ""}
    <form method="post" action="/admin/cuenta">
      <input type="hidden" name="csrf" value="${escape(csrf)}">
      <div class="campo">
        <label for="email">Email</label>
        <input id="email" name="email" type="email" value="${escape(email)}" autocomplete="username" required>
      </div>
      <div class="campo">
        <label for="password_actual">Contraseña actual</label>
        <input id="password_actual" name="password_actual" type="password" autocomplete="current-password" required>
      </div>
      <p style="color:var(--muted);font-size:12.5px;margin:-6px 0 4px">
        Hace falta siempre, cambie o no el email: es lo que confirma que eres tú.
      </p>
      <div class="campo">
        <label for="password_nueva">Nueva contraseña</label>
        <input id="password_nueva" name="password_nueva" type="password" autocomplete="new-password">
      </div>
      <div class="campo">
        <label for="password_repite">Repite la nueva contraseña</label>
        <input id="password_repite" name="password_repite" type="password" autocomplete="new-password">
      </div>
      <p style="color:var(--muted);font-size:12.5px;margin:-6px 0 12px">
        Deja los dos campos de contraseña en blanco para no cambiarla.
      </p>
      <button type="submit">Guardar</button>
      ${guardado ? `<span class="guardado">Guardado</span>` : ""}
    </form>
  </div>
</div>`,
    error ? 400 : 200,
  );
}

/**
 * Se sirve mientras no exista ninguna cuenta todavía (tabla `admin_user`
 * vacía). Cualquiera que llegue aquí antes que el dueño real del panel se
 * queda con el acceso: es el mismo riesgo que un "crear cuenta de admin" de
 * cualquier instalador, y aceptable porque no hay nada que proteger todavía
 * — pero conviene visitarla justo después de aplicar las migraciones, no
 * dejarla abierta esperando.
 */
export function setupPage(error?: string): Response {
  return page(
    "Crear el acceso",
    `<div class="login">
  <h1>Crear el acceso al panel</h1>
  <p class="sub">Todavía no hay ninguna cuenta. Esta es la única vez que se pide sin haber entrado antes.</p>
  ${error ? `<p class="error">${escape(error)}</p>` : ""}
  <form method="post" action="/admin/setup">
    <div class="campo">
      <label for="email">Email</label>
      <input id="email" name="email" type="email" autocomplete="username" required autofocus>
    </div>
    <div class="campo">
      <label for="password">Contraseña</label>
      <input id="password" name="password" type="password" autocomplete="new-password" required>
    </div>
    <button type="submit">Crear y entrar</button>
  </form>
</div>`,
    error ? 400 : 200,
  );
}

/** Cuando no hay binding de D1: los leads existen, pero en Workers Logs. */
export function sinBasePage(): Response {
  return page(
    "Sin base de datos",
    `<div class="aviso">
  <h1>No hay base de datos conectada</h1>
  <p>
    El Worker no tiene el binding <code>DB</code>, así que los leads se están
    volcando a Workers Logs con el prefijo <code>LEAD_SIN_D1</code> en vez de
    guardarse. Para crearla:
  </p>
  <pre>npx wrangler d1 create bixio-leads   # devuelve el database_id
# pégalo en el bloque d1_databases de wrangler.jsonc
npx wrangler d1 migrations apply bixio-leads --remote</pre>
</div>`,
    503,
  );
}

/**
 * Cualquier fallo inesperado. Casi siempre es una D1 conectada pero sin
 * migrar, así que la primera pista que se da es esa.
 */
export function errorPage(): Response {
  return page(
    "Error",
    `<div class="aviso">
  <h1>Algo ha fallado</h1>
  <p>
    El detalle está en Workers Logs con el prefijo <code>ADMIN_ERROR</code>. Si
    el panel acaba de conectarse a una base de datos nueva, lo más probable es
    que falten las migraciones:
  </p>
  <pre>npx wrangler d1 migrations apply bixio-leads --remote</pre>
  <p><a href="/admin">Volver al listado</a></p>
</div>`,
    500,
  );
}

// -------------------------------------------------------------- listado

function tagOrigen(lead: Lead): string {
  return `<span class="tag tag-${lead.lead_type}">${escape(ORIGEN_LABEL[lead.lead_type])}</span>`;
}

function tagEstado(lead: Lead): string {
  // Un particular no se trabaja a mano: enseñar "Nuevo" en su fila sugiere una
  // gestión pendiente que no existe.
  if (!COMERCIALES.includes(lead.lead_type)) return `<span style="color:#aab0ba">—</span>`;
  return `<span class="tag est-${lead.estado}">${escape(ESTADO_LABEL[lead.estado])}</span>`;
}

function option(value: string, label: string, selected: string): string {
  return `<option value="${escape(value)}"${value === selected ? " selected" : ""}>${escape(label)}</option>`;
}

function filtros(filters: Filters, segmentosDisponibles: string[]): string {
  const origenOptions = [
    option("", "Todos", filters.origen),
    option("negocio", "Solo negocio (comercio + prescriptor)", filters.origen),
    ...LEAD_TYPES.map((type) => option(type, ORIGEN_LABEL[type], filters.origen)),
  ].join("");

  const segmentoOptions = [
    option("", "Todos", filters.segmento),
    ...segmentosDisponibles.map((value) => option(value, value, filters.segmento)),
  ].join("");

  const estadoOptions = [
    option("", "Todos", filters.estado),
    ...ESTADOS.map((estado) => option(estado, ESTADO_LABEL[estado], filters.estado)),
  ].join("");

  const ordenOptions = [
    option("fecha_desc", "Más recientes primero", filters.orden),
    option("fecha_asc", "Más antiguos primero", filters.orden),
    option("origen", "Por origen", filters.orden),
  ].join("");

  // El estado solo aplica a los leads comerciales: fuera de ese contexto el
  // desplegable devolvería listas vacías sin explicar por qué.
  const muestraEstado = filters.origen === "negocio" || COMERCIALES.includes(filters.origen as never);

  return `<form class="filtros" method="get" action="/admin">
  <div class="filtro">
    <label for="f-origen">Origen</label>
    <select id="f-origen" name="origen" onchange="this.form.submit()">${origenOptions}</select>
  </div>
  <div class="filtro">
    <label for="f-segmento">Segmento</label>
    <select id="f-segmento" name="segmento">${segmentoOptions}</select>
  </div>
  ${
    muestraEstado
      ? `<div class="filtro">
    <label for="f-estado">Estado</label>
    <select id="f-estado" name="estado">${estadoOptions}</select>
  </div>`
      : ""
  }
  <div class="filtro">
    <label for="f-desde">Desde</label>
    <input id="f-desde" name="desde" type="date" value="${escape(filters.desde)}">
  </div>
  <div class="filtro">
    <label for="f-hasta">Hasta</label>
    <input id="f-hasta" name="hasta" type="date" value="${escape(filters.hasta)}">
  </div>
  <div class="filtro">
    <label for="f-q">Email o negocio</label>
    <input id="f-q" name="q" type="search" value="${escape(filters.q)}" placeholder="buscar…">
  </div>
  <div class="filtro">
    <label for="f-orden">Orden</label>
    <select id="f-orden" name="orden">${ordenOptions}</select>
  </div>
  <button type="submit">Filtrar</button>
  <a class="btn-plano" style="border:1px solid var(--line);border-radius:4px;padding:6px 13px;background:#fff;color:var(--ink)" href="/admin">Limpiar</a>
  <a class="btn-plano" style="border:1px solid var(--line);border-radius:4px;padding:6px 13px;background:#fff;color:var(--ink)" href="/admin/export.csv${escape(filtersToQuery(filters, { page: 1 }))}">Exportar CSV</a>
</form>`;
}

function cabecera(counts: Counts): string {
  const alerta =
    counts.negocioNuevos > 0
      ? `<a class="alerta" href="/admin?origen=negocio&amp;estado=nuevo">
  <span class="n">${counts.negocioNuevos}</span> lead${counts.negocioNuevos === 1 ? "" : "s"} de negocio sin contactar
  <span class="cta">— verlos →</span>
</a>`
      : `<p class="calma">No hay leads de negocio sin contactar.</p>`;

  const tarjetas: [number, string][] = [
    [counts.total, "leads en total"],
    [counts.particular, "particulares"],
    [counts.comercio, "comercios"],
    [counts.prescriptor, "prescriptores"],
    [counts.ultimos7, "últimos 7 días"],
  ];

  return `${alerta}
<div class="counts">
  ${tarjetas
    .map(([n, k]) => `<div class="count"><span class="n">${n}</span><span class="k">${escape(k)}</span></div>`)
    .join("\n  ")}
</div>`;
}

function fila(lead: Lead, query: string): string {
  // El detalle arrastra los filtros del listado en su propia URL: así sabe a
  // dónde volver sin tener que fiarse de un parámetro de redirección.
  const href = `/admin/lead/${lead.id}${query}`;
  // La fila entera es clicable (ver el script del final del listado), pero el
  // enlace real vive en la primera celda para que el teclado y "abrir en
  // pestaña nueva" sigan funcionando.
  return `<tr data-href="${escape(href)}">
  <td class="num"><a href="${escape(href)}">${escape(formatDate(lead.created_at))}</a></td>
  <td>${tagOrigen(lead)}</td>
  <td>${escape(lead.segmento ?? "—")}</td>
  <td title="${escape(lead.negocio ?? lead.nombre ?? "")}">${escape(lead.negocio ?? lead.nombre ?? "—")}</td>
  <td title="${escape(lead.contacto)}">${escape(lead.contacto)}</td>
  <td>${escape(lead.poblacion ?? "—")}</td>
  <td class="num">${escape(lead.page ?? "—")}</td>
  <td class="num">${escape(lead.cta ?? "—")}</td>
  <td class="num">${escape(lead.utm_campaign ?? "—")}</td>
  <td>${tagEstado(lead)}</td>
</tr>`;
}

export function listPage(
  email: string,
  csrf: string,
  filters: Filters,
  countsData: Counts,
  segmentosDisponibles: string[],
  rows: Lead[],
  total: number,
): Response {
  const query = filtersToQuery(filters);
  const desde = (filters.page - 1) * PAGE_SIZE;
  const pages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const tabla = rows.length
    ? `<div class="tabla-wrap">
<table>
  <colgroup>
    <col style="width:10%"><col style="width:9%"><col style="width:12%"><col style="width:13%">
    <col style="width:14%"><col style="width:8%"><col style="width:8%"><col style="width:9%">
    <col style="width:7%"><col style="width:10%">
  </colgroup>
  <thead><tr>
    <th>Fecha</th><th>Origen</th><th>Segmento</th><th>Nombre / negocio</th>
    <th>Contacto</th><th>Población</th><th>Página</th><th>CTA</th><th>Campaña</th><th>Estado</th>
  </tr></thead>
  <tbody>
${rows.map((lead) => fila(lead, query)).join("\n")}
  </tbody>
</table>
</div>`
    : `<div class="tabla-wrap"><p class="vacio">Ningún lead con estos filtros.</p></div>`;

  const pager =
    total > PAGE_SIZE
      ? `<div class="pager">
  <span>${desde + 1}–${Math.min(desde + rows.length, total)} de ${total}</span>
  ${filters.page > 1 ? `<a href="/admin${filtersToQuery(filters, { page: filters.page - 1 })}">← Anteriores</a>` : ""}
  ${filters.page < pages ? `<a href="/admin${filtersToQuery(filters, { page: filters.page + 1 })}">Siguientes →</a>` : ""}
</div>`
      : `<div class="pager"><span>${total} lead${total === 1 ? "" : "s"} con estos filtros</span></div>`;

  // Único JavaScript del listado: hacer clicable la fila entera. Va con
  // `data-href` y no con un `onclick` por fila porque el enlace lleva dentro
  // los filtros, y un filtro con comillas dentro de un atributo de evento es
  // una inyección esperando a pasar.
  const filaClicable = `<script>
document.querySelector("tbody")?.addEventListener("click", function (event) {
  if (event.target.closest("a") || getSelection()?.toString()) return;
  const fila = event.target.closest("tr[data-href]");
  if (fila) location.href = fila.dataset.href;
});
</script>`;

  return page(
    "Leads",
    `${topBar(email, csrf)}
<div class="main">
${cabecera(countsData)}
${filtros(filters, segmentosDisponibles)}
${tabla}
${pager}
</div>
${filaClicable}`,
  );
}

// --------------------------------------------------------------- detalle

function dato(label: string, value: string | null): string {
  return `<div><dt>${escape(label)}</dt><dd>${escape(value ?? "—")}</dd></div>`;
}

export function detailPage(
  email: string,
  csrf: string,
  lead: Lead,
  /** Query string de los filtros con los que se llegó, para volver a ellos. */
  query: string,
  guardado: boolean,
): Response {
  const esComercial = COMERCIALES.includes(lead.lead_type);

  const estadoBloque = esComercial
    ? `<div class="campo">
      <label for="estado">Estado</label>
      <select id="estado" name="estado">
        ${ESTADOS.map(
          (estado) =>
            `<option value="${estado}"${estado === lead.estado ? " selected" : ""}>${escape(ESTADO_LABEL[estado])}</option>`,
        ).join("\n        ")}
      </select>
    </div>
    <p style="color:var(--muted);font-size:12.5px;margin:-6px 0 12px">
      Último cambio de estado: ${escape(formatDate(lead.estado_updated_at))}
    </p>`
    : `<input type="hidden" name="estado" value="${escape(lead.estado)}">
    <p style="color:var(--muted);font-size:12.5px;margin:0 0 12px">
      Los leads de particular no se siguen a mano: solo cuentan como demanda.
    </p>`;

  return page(
    `Lead #${lead.id}`,
    `${topBar(email, csrf)}
<div class="main">
  <a class="volver" href="/admin${escape(query)}">← Volver al listado</a>
  <h1>${escape(lead.negocio ?? lead.nombre ?? lead.contacto)} ${tagOrigen(lead)}</h1>
  <div class="detalle">
    <div class="caja">
      <dl>
        ${dato("Recibido", formatDate(lead.created_at))}
        ${dato("Origen", ORIGEN_LABEL[lead.lead_type])}
        ${dato("Segmento", lead.segmento)}
        ${dato("Nombre", lead.nombre)}
        ${dato("Negocio", lead.negocio)}
        ${dato("Población", lead.poblacion)}
        ${dato("Contacto", lead.contacto)}
        ${dato("Página", lead.page)}
        ${dato("CTA", lead.cta)}
        ${dato("utm_source", lead.utm_source)}
        ${dato("utm_campaign", lead.utm_campaign)}
        ${dato("utm_content", lead.utm_content)}
        ${dato("País", lead.country)}
        ${dato("Navegador", lead.user_agent)}
      </dl>
    </div>
    <form class="caja" method="post" action="/admin/lead/${lead.id}${escape(query)}">
      <input type="hidden" name="csrf" value="${escape(csrf)}">
      ${estadoBloque}
      <div class="campo">
        <label for="notas">Notas</label>
        <textarea id="notas" name="notas" placeholder="Qué se ha hablado, cuándo volver…">${escape(lead.notas ?? "")}</textarea>
      </div>
      <button type="submit">Guardar</button>
      ${guardado ? `<span class="guardado">Guardado</span>` : ""}
    </form>
  </div>
</div>`,
  );
}
