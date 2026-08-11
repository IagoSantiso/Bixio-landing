/**
 * Router de /admin.
 *
 * Regla única: todo lo que cuelgue de /admin exige sesión válida, salvo la
 * propia pantalla de login. La comprobación está aquí arriba y no en cada
 * pantalla, para que añadir una ruta nueva no pueda dejarla abierta por olvido.
 */

import type { Env } from "../env";
import {
  clearCookie,
  csrfOk,
  csrfToken,
  loginBlocked,
  loginFailed,
  loginSucceeded,
  readConfig,
  readSession,
  sessionCookie,
  verifyPassword,
  type AdminConfig,
  type Session,
} from "./auth";
import { csvResponse } from "./csv";
import {
  ESTADOS,
  counts,
  filtersToQuery,
  getLead,
  listAllLeads,
  listLeads,
  parseFilters,
  segmentos,
  updateLead,
  type Estado,
} from "./queries";
import { detailPage, errorPage, listPage, loginPage, setupPage, sinBasePage } from "./views";

function redirect(location: string, extraHeaders: Record<string, string> = {}): Response {
  return new Response(null, {
    status: 303,
    headers: { Location: location, "Cache-Control": "no-store, private", ...extraHeaders },
  });
}

function clientIp(request: Request): string {
  return request.headers.get("CF-Connecting-IP") ?? "desconocida";
}

/**
 * `request.formData()` lanza si el cuerpo no es un formulario (o no hay
 * cuerpo). Eso lo provoca cualquiera con un POST vacío, así que no puede ser
 * un 500: un cuerpo ilegible es simplemente un formulario sin campos, y sin
 * campos no hay token CSRF válido y la petición se rechaza sola.
 */
async function readForm(request: Request): Promise<FormData> {
  try {
    return await request.formData();
  } catch {
    return new FormData();
  }
}

export async function handleAdmin(request: Request, env: Env, url: URL, path: string): Promise<Response> {
  try {
    return await route(request, env, url, path);
  } catch (error) {
    // Lo más probable aquí es una D1 sin migrar. Se registra entero y al
    // navegador solo le llega que ha fallado: los mensajes de la base de datos
    // no son para enseñarlos.
    console.error("ADMIN_ERROR", path, String(error));
    return errorPage();
  }
}

async function route(request: Request, env: Env, url: URL, path: string): Promise<Response> {
  const config = readConfig(env);
  if (!config) return setupPage();

  const session = await readSession(request, config);

  if (path === "/admin/login") {
    // Con sesión abierta, el login no pinta nada.
    if (session) return redirect("/admin");
    return request.method === "POST" ? doLogin(request, config) : loginPage();
  }

  if (!session) {
    // Sin sesión, todo /admin es la pantalla de entrar. No se conserva a dónde
    // se iba: con un usuario y una pantalla principal no compensa la
    // superficie que abre un parámetro de redirección.
    return path === "/admin" && request.method === "GET" ? loginPage() : redirect("/admin/login");
  }

  if (path === "/admin/logout") {
    if (request.method !== "POST") return redirect("/admin");
    const form = await readForm(request);
    if (!(await csrfOk(config, session, form.get("csrf")))) return redirect("/admin");
    return redirect("/admin/login", { "Set-Cookie": clearCookie() });
  }

  // A partir de aquí hace falta la base de datos.
  if (!env.DB) return sinBasePage();

  if (path === "/admin") return listView(env.DB, config, session, url);
  if (path === "/admin/export.csv") return exportView(env.DB, url);

  const detalle = /^\/admin\/lead\/(\d+)$/.exec(path);
  if (detalle) {
    const id = Number(detalle[1]);
    return request.method === "POST"
      ? saveLeadView(request, env.DB, config, session, url, id)
      : detailView(env.DB, config, session, url, id);
  }

  return redirect("/admin");
}

// ----------------------------------------------------------------- login

async function doLogin(request: Request, config: AdminConfig): Promise<Response> {
  const ip = clientIp(request);
  if (loginBlocked(ip)) {
    return loginPage("Demasiados intentos. Espera unos minutos y vuelve a probar.");
  }

  const form = await readForm(request);
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");

  // El email se comprueba, pero el mensaje de error es el mismo que si falla
  // la contraseña: no hay nada que ganar confirmando cuál de los dos es.
  const emailOk = email.toLowerCase() === config.email.toLowerCase();
  const passwordOk = await verifyPassword(config.passwordHash, password);

  if (!emailOk || !passwordOk) {
    loginFailed(ip);
    return loginPage("Email o contraseña incorrectos.");
  }

  loginSucceeded(ip);
  return redirect("/admin", { "Set-Cookie": await sessionCookie(config) });
}

// --------------------------------------------------------------- listado

async function listView(
  db: D1Database,
  config: AdminConfig,
  session: Session,
  url: URL,
): Promise<Response> {
  const filters = parseFilters(url.searchParams);

  const [countsData, segmentosDisponibles, { rows, total }, csrf] = await Promise.all([
    counts(db),
    segmentos(db, filters.origen),
    listLeads(db, filters),
    csrfToken(config, session),
  ]);

  return listPage(session.email, csrf, filters, countsData, segmentosDisponibles, rows, total);
}

async function exportView(db: D1Database, url: URL): Promise<Response> {
  const leads = await listAllLeads(db, parseFilters(url.searchParams));
  return csvResponse(leads);
}

// --------------------------------------------------------------- detalle

async function detailView(
  db: D1Database,
  config: AdminConfig,
  session: Session,
  url: URL,
  id: number,
): Promise<Response> {
  const lead = await getLead(db, id);
  if (!lead) return redirect("/admin");

  const query = filtersToQuery(parseFilters(url.searchParams));
  const csrf = await csrfToken(config, session);
  return detailPage(session.email, csrf, lead, query, url.searchParams.get("ok") === "1");
}

async function saveLeadView(
  request: Request,
  db: D1Database,
  config: AdminConfig,
  session: Session,
  url: URL,
  id: number,
): Promise<Response> {
  const form = await readForm(request);
  if (!(await csrfOk(config, session, form.get("csrf")))) return redirect(`/admin/lead/${id}`);

  const estado = String(form.get("estado") ?? "");
  if (!(ESTADOS as readonly string[]).includes(estado)) return redirect(`/admin/lead/${id}`);

  const notas = String(form.get("notas") ?? "").trim().slice(0, 5000);
  await updateLead(db, id, estado as Estado, notas || null);

  // Redirección tras POST para que recargar no vuelva a guardar. Los filtros
  // se recuperan de la propia URL del formulario, no de un campo del cuerpo:
  // así no hay forma de que un destino de redirección venga de fuera.
  const query = filtersToQuery(parseFilters(url.searchParams));
  return redirect(`/admin/lead/${id}${query ? `${query}&ok=1` : "?ok=1"}`);
}
