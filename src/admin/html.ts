/**
 * Chapa y pintura del panel.
 *
 * Herramienta interna: nada del brand kit de la landing (coral, mostaza,
 * Fredoka). Aquí manda la densidad —caben muchas filas sin hacer scroll— y
 * que cargue instantáneo, así que el CSS va en línea y no hay ni una petición
 * más que la del propio HTML. Sin JavaScript salvo lo mínimo (§detalle).
 */

export function escape(value: unknown): string {
  if (value === null || value === undefined) return "";
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Fechas de D1 ("2026-08-11 09:14:02" UTC) en algo legible de un vistazo. */
export function formatDate(value: string | null): string {
  if (!value) return "—";
  const [date, time = ""] = value.split(" ");
  const [year, month, day] = date.split("-");
  if (!year || !month || !day) return value;
  return `${day}/${month}/${year.slice(2)} ${time.slice(0, 5)}`.trim();
}

const STYLES = `
:root{
  --bg:#f6f7f9; --panel:#fff; --ink:#16181d; --muted:#666c78;
  --line:#dfe3e8; --line-soft:#eceff3; --accent:#1f5eff; --warn:#b4341c;
}
*{box-sizing:border-box}
body{
  margin:0;background:var(--bg);color:var(--ink);
  font:14px/1.45 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
}
a{color:var(--accent);text-decoration:none}
a:hover{text-decoration:underline}
.bar{
  display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 16px;
  padding:10px 20px;background:var(--panel);border-bottom:1px solid var(--line);
}
/* En pantallas estrechas no cabe logo + nav + email + acciones en una fila:
   antes de este nowrap, el texto del logo se partía a media frase ("Bixio"
   / "· leads") en vez de que fuera .who quien bajara entera a su propia
   línea, que es el flex-wrap de arriba. */
.bar strong{font-size:15px;white-space:nowrap}
.bar .who{color:var(--muted);font-size:13px}
.bar-brand{display:flex;align-items:center;gap:18px}
.bar-nav{display:flex;gap:14px;font-size:13px}
.bar-nav a{color:var(--muted)}
.bar-nav a.activa{color:var(--ink);font-weight:600;text-decoration:none}
.main{padding:18px 20px 48px}

/* tráfico: el único sitio del panel que quiere ocupar la pantalla entera en
   vez de fluir con el resto del documento, así que la columna bar+main lleva
   su propio contenedor flex y no toca el layout del resto de pantallas. */
.app-shell{display:flex;flex-direction:column;min-height:100vh}
.app-shell .bar{flex:0 0 auto}
.main-trafico{flex:1 1 auto;display:flex;padding:0}
.main-trafico>*{flex:1 1 auto;min-width:0}
.trafico-iframe{border:0;display:block;width:100%;height:100%}
h1{font-size:18px;margin:0 0 14px}
h2{font-size:14px;margin:22px 0 8px;text-transform:uppercase;letter-spacing:.06em;color:var(--muted)}

/* contadores */
.counts{display:flex;flex-wrap:wrap;gap:10px;margin-bottom:14px}
.count{
  background:var(--panel);border:1px solid var(--line);border-radius:6px;
  padding:8px 14px;min-width:104px;
}
.count .n{font-size:20px;font-weight:650;font-variant-numeric:tabular-nums;display:block}
.count .k{color:var(--muted);font-size:12px}
.alerta{
  display:block;background:#fff4f1;border:1px solid #f0c3b7;border-left:4px solid var(--warn);
  border-radius:6px;padding:11px 14px;margin-bottom:14px;color:var(--warn);font-weight:600;
}
.alerta:hover{text-decoration:none;background:#ffece7}
.alerta .n{font-size:17px;font-variant-numeric:tabular-nums}
.alerta .cta{font-weight:500;color:var(--muted);margin-left:6px}
.calma{
  background:var(--panel);border:1px solid var(--line);border-radius:6px;
  padding:11px 14px;margin-bottom:14px;color:var(--muted);
}

/* filtros */
.filtros{
  display:flex;flex-wrap:wrap;align-items:flex-end;gap:10px;
  background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:12px;margin-bottom:14px;
}
.filtro{display:flex;flex-direction:column;gap:3px}
.filtro label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
input,select,textarea,button{font:inherit;color:inherit}
input,select,textarea{
  background:#fff;border:1px solid var(--line);border-radius:4px;padding:5px 7px;
}
input:focus,select:focus,textarea:focus{outline:2px solid var(--accent);outline-offset:-1px;border-color:var(--accent)}
button{
  background:var(--ink);color:#fff;border:1px solid var(--ink);border-radius:4px;
  padding:6px 13px;cursor:pointer;
}
button:hover{background:#000}
.btn-plano{background:#fff;color:var(--ink);border-color:var(--line)}
.btn-plano:hover{background:var(--line-soft)}

/* tabla */
.tabla-wrap{background:var(--panel);border:1px solid var(--line);border-radius:6px;overflow:auto}
/* Anchos fijos y no automáticos a propósito: con el reparto automático, un
   solo valor largo (un nombre de negocio kilométrico, o lo que escriba un bot
   en el formulario) ensancha su columna y empuja la de estado fuera de la
   pantalla, y el estado es media razón de ser de este listado. Con anchos
   fijos cada columna cae siempre en el mismo sitio —que es lo que hace
   legible una tabla densa— y lo que no cabe se recorta: el valor entero está
   en el detalle, a un clic, y en el title de la celda. */
table{border-collapse:collapse;width:100%;min-width:1160px;font-size:13px;table-layout:fixed}
th,td{
  text-align:left;padding:6px 10px;border-bottom:1px solid var(--line-soft);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
}
th{
  position:sticky;top:0;background:var(--panel);z-index:1;
  font-size:11px;text-transform:uppercase;letter-spacing:.05em;color:var(--muted);
  border-bottom:1px solid var(--line);
}
tbody tr:hover{background:#f2f6ff}
tbody tr:last-child td{border-bottom:0}
td.num{font-variant-numeric:tabular-nums;color:var(--muted)}
.vacio{padding:26px;text-align:center;color:var(--muted)}

.tag{
  display:inline-block;border-radius:3px;padding:1px 7px;font-size:11.5px;font-weight:600;
  border:1px solid transparent;
}
.tag-particular{background:#eef1f5;color:#3c4453;border-color:#dfe3e8}
.tag-comercio{background:#e6f0ff;color:#1a49b8;border-color:#c9dcff}
.tag-prescriptor{background:#eaf6ea;color:#256b2b;border-color:#c9e7cb}
.est-nuevo{background:#fff2d6;color:#8a5b00;border-color:#f0dcae}
.est-contactado{background:#e6f0ff;color:#1a49b8;border-color:#c9dcff}
.est-conversacion{background:#efe6ff;color:#5327a8;border-color:#dbccf7}
.est-cerrado{background:#e2f5e4;color:#1d6b26;border-color:#c2e6c6}
.est-descartado{background:#eceff3;color:#6b7280;border-color:#dfe3e8}

.pager{display:flex;align-items:center;gap:14px;margin-top:12px;color:var(--muted);font-size:13px}

/* detalle */
.detalle{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:18px;align-items:start}
.caja{background:var(--panel);border:1px solid var(--line);border-radius:6px;padding:14px 16px}
/* La rejilla va en cada par, no en el <dl>: con ella en el <dl>, los <div> que
   agrupan cada dt/dd son los que se colocan en las columnas, y las etiquetas
   acaban en una fila y sus valores en la siguiente. */
dl{margin:0}
dl div{
  display:grid;grid-template-columns:150px minmax(0,1fr);
  border-bottom:1px solid var(--line-soft);
}
dl div:last-child{border-bottom:0}
dt{color:var(--muted);padding:6px 0;font-size:12.5px}
dd{margin:0;padding:6px 0;overflow-wrap:anywhere;white-space:pre-wrap}
.campo{display:flex;flex-direction:column;gap:5px;margin-bottom:12px}
.campo label{font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
textarea{min-height:150px;resize:vertical;line-height:1.5}
.guardado{color:#1d6b26;font-weight:600;margin-left:10px}
.volver{display:inline-block;margin-bottom:12px;font-size:13px}

/* login */
.login{max-width:340px;margin:12vh auto;background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:24px}
.login h1{margin-bottom:4px}
.login p.sub{color:var(--muted);font-size:13px;margin:0 0 18px}
.login .campo input{width:100%}
.login button{width:100%;margin-top:4px;padding:8px}
.error{background:#fff1ee;border:1px solid #f0c3b7;color:var(--warn);border-radius:4px;padding:8px 10px;margin-bottom:14px;font-size:13px}
.aviso{max-width:620px;margin:12vh auto;background:var(--panel);border:1px solid var(--line);border-radius:8px;padding:24px}
.aviso pre{background:var(--line-soft);padding:12px;border-radius:5px;overflow:auto;font-size:12.5px}
`;

/**
 * `noindex` va en la meta y también en la cabecera `X-Robots-Tag`, porque
 * ninguna de las dos cubre sola todos los casos (respuestas que no son HTML,
 * rastreadores que no ejecutan nada). Y `robots.txt` desautoriza /admin, que
 * es la tercera capa.
 */
export function page(title: string, body: string, status = 200): Response {
  return new Response(
    `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow,noarchive">
<title>${escape(title)} · Bixio</title>
<style>${STYLES}</style>
</head>
<body>
${body}
</body>
</html>
`,
    {
      status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store, private",
        "X-Robots-Tag": "noindex, nofollow",
        "Referrer-Policy": "same-origin",
        "X-Content-Type-Options": "nosniff",
      },
    },
  );
}

/**
 * `active` resalta la pestaña en la que estás. Por defecto "leads" porque es
 * la pantalla de entrada del panel (listado y detalle viven ahí); "trafico"
 * lo pasa la única pantalla que no es el CRM de leads.
 */
export function topBar(email: string, csrf: string, active: "leads" | "trafico" = "leads"): string {
  const navLink = (href: string, label: string, key: "leads" | "trafico") =>
    `<a href="${href}"${key === active ? ' class="activa"' : ""}>${label}</a>`;

  return `<div class="bar">
  <div class="bar-brand">
    <strong><a href="/admin" style="color:inherit">Bixio · leads</a></strong>
    <nav class="bar-nav">
      ${navLink("/admin", "Leads", "leads")}
      ${navLink("/admin/trafico", "Tráfico", "trafico")}
    </nav>
  </div>
  <span class="who">${escape(email)}
    · <a href="/admin/cuenta">Cuenta</a>
    <form method="post" action="/admin/logout" style="display:inline">
      <input type="hidden" name="csrf" value="${escape(csrf)}">
      <button class="btn-plano" style="padding:3px 10px;font-size:12px">Salir</button>
    </form>
  </span>
</div>`;
}
