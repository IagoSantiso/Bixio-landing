/**
 * Router de /admin.
 *
 * Regla única: todo lo que cuelgue de /admin exige sesión válida, salvo
 * `/admin/setup` (crear la cuenta, solo si no existe ninguna) y
 * `/admin/login`. La comprobación está aquí arriba y no en cada pantalla,
 * para que añadir una ruta nueva no pueda dejarla abierta por olvido.
 */

import type { Env } from "../env";
import {
  clearCookie,
  createAdmin,
  csrfOk,
  csrfToken,
  getAdmin,
  loginBlocked,
  loginFailed,
  loginSucceeded,
  readSession,
  sessionCookie,
  updateAdmin,
  verifyPassword,
  type Admin,
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
import {
  accountPage,
  detailPage,
  errorPage,
  listPage,
  loginPage,
  setupPage,
  sinBasePage,
  trafficPage,
} from "./views";

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
  // La cuenta del panel vive en D1: sin binding no hay ni leads que ver ni
  // dónde guardarla, así que esto va antes que cualquier otra cosa.
  if (!env.DB) return sinBasePage();
  const db = env.DB;

  const admin = await getAdmin(db);

  if (path === "/admin/setup") {
    // Ya hay cuenta: crear una segunda no tiene sentido con un solo acceso.
    if (admin) return redirect("/admin/login");
    return request.method === "POST" ? doSetup(request, db) : setupPage();
  }

  if (!admin) {
    // Sin cuenta todavía, todo lo demás manda a crearla primero.
    return redirect("/admin/setup");
  }

  const session = await readSession(request, admin);

  if (path === "/admin/login") {
    // Con sesión abierta, el login no pinta nada.
    if (session) return redirect("/admin");
    return request.method === "POST" ? doLogin(request, admin) : loginPage();
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
    if (!(await csrfOk(admin, session, form.get("csrf")))) return redirect("/admin");
    return redirect("/admin/login", { "Set-Cookie": clearCookie() });
  }

  if (path === "/admin/cuenta") {
    return request.method === "POST"
      ? saveAccountView(request, db, admin, session)
      : accountView(admin, session, url);
  }

  if (path === "/admin") return listView(db, admin, session, url);
  if (path === "/admin/export.csv") return exportView(db, url);
  if (path === "/admin/trafico") return trafficView(env, admin, session);

  const detalle = /^\/admin\/lead\/(\d+)$/.exec(path);
  if (detalle) {
    const id = Number(detalle[1]);
    return request.method === "POST"
      ? saveLeadView(request, db, admin, session, url, id)
      : detailView(db, admin, session, url, id);
  }

  return redirect("/admin");
}

// ----------------------------------------------------------------- setup

async function doSetup(request: Request, db: D1Database): Promise<Response> {
  const form = await readForm(request);
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");

  if (!email || !password) {
    return setupPage("Hace falta un email y una contraseña.");
  }

  await createAdmin(db, email, password);
  const admin = await getAdmin(db);
  // No puede pasar (acaba de crearse), pero si pasa, mejor al login que un 500.
  if (!admin) return redirect("/admin/login");

  return redirect("/admin", { "Set-Cookie": await sessionCookie(admin) });
}

// ----------------------------------------------------------------- login

async function doLogin(request: Request, admin: Admin): Promise<Response> {
  const ip = clientIp(request);
  if (loginBlocked(ip)) {
    return loginPage("Demasiados intentos. Espera unos minutos y vuelve a probar.");
  }

  const form = await readForm(request);
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");

  // El email se comprueba, pero el mensaje de error es el mismo que si falla
  // la contraseña: no hay nada que ganar confirmando cuál de los dos es.
  const emailOk = email.toLowerCase() === admin.email.toLowerCase();
  const passwordOk = await verifyPassword(admin.passwordHash, password);

  if (!emailOk || !passwordOk) {
    loginFailed(ip);
    return loginPage("Email o contraseña incorrectos.");
  }

  loginSucceeded(ip);
  return redirect("/admin", { "Set-Cookie": await sessionCookie(admin) });
}

// ---------------------------------------------------------------- cuenta

async function accountView(admin: Admin, session: Session, url: URL): Promise<Response> {
  const csrf = await csrfToken(admin, session);
  return accountPage(admin.email, csrf, url.searchParams.get("ok") === "1");
}

async function saveAccountView(
  request: Request,
  db: D1Database,
  admin: Admin,
  session: Session,
): Promise<Response> {
  const form = await readForm(request);
  const csrf = await csrfToken(admin, session);
  if (!(await csrfOk(admin, session, form.get("csrf")))) {
    return accountPage(admin.email, csrf, false, "No se pudo verificar el formulario. Vuelve a intentarlo.");
  }

  const email = String(form.get("email") ?? "").trim();
  const passwordActual = String(form.get("password_actual") ?? "");
  const passwordNueva = String(form.get("password_nueva") ?? "");
  const passwordRepite = String(form.get("password_repite") ?? "");

  const fallo = (mensaje: string) => accountPage(email || admin.email, csrf, false, mensaje);

  if (!email) return fallo("El email no puede quedar vacío.");
  // La contraseña actual se exige siempre, cambie o no el email: evita que
  // una sesión abierta en un ordenador ajeno se pueda usar para tomar la
  // cuenta sin saber la contraseña.
  if (!(await verifyPassword(admin.passwordHash, passwordActual))) {
    return fallo("La contraseña actual no es correcta.");
  }
  if (passwordNueva && passwordNueva !== passwordRepite) {
    return fallo("La nueva contraseña no coincide en los dos campos.");
  }

  const updated = await updateAdmin(db, { email, password: passwordNueva || undefined });

  // `updateAdmin` rota la clave de sesión, así que la cookie que llegó con
  // esta petición ya no vale: se reemite aquí para no dejar a quien acaba de
  // guardar fuera de su propia cuenta.
  return redirect("/admin/cuenta?ok=1", { "Set-Cookie": await sessionCookie(updated) });
}

// --------------------------------------------------------------- listado

async function listView(db: D1Database, admin: Admin, session: Session, url: URL): Promise<Response> {
  const filters = parseFilters(url.searchParams);

  const [countsData, segmentosDisponibles, { rows, total }, csrf] = await Promise.all([
    counts(db),
    segmentos(db, filters.origen),
    listLeads(db, filters),
    csrfToken(admin, session),
  ]);

  return listPage(session.email, csrf, filters, countsData, segmentosDisponibles, rows, total);
}

async function exportView(db: D1Database, url: URL): Promise<Response> {
  const leads = await listAllLeads(db, parseFilters(url.searchParams));
  return csvResponse(leads);
}

// --------------------------------------------------------------- tráfico

/**
 * Sección independiente del CRM de leads: solo enseña el shared link de
 * Plausible en un iframe. No hay nada que consultar en D1 aquí — Plausible ya
 * es su propio backend — así que la única cosa que puede fallar es que
 * `PLAUSIBLE_SHARE_URL` no esté configurado, y en ese caso lo dice en vez de
 * enseñar un iframe roto.
 */
async function trafficView(env: Env, admin: Admin, session: Session): Promise<Response> {
  const csrf = await csrfToken(admin, session);
  return trafficPage(session.email, csrf, env.PLAUSIBLE_SHARE_URL);
}

// --------------------------------------------------------------- detalle

async function detailView(
  db: D1Database,
  admin: Admin,
  session: Session,
  url: URL,
  id: number,
): Promise<Response> {
  const lead = await getLead(db, id);
  if (!lead) return redirect("/admin");

  const query = filtersToQuery(parseFilters(url.searchParams));
  const csrf = await csrfToken(admin, session);
  return detailPage(session.email, csrf, lead, query, url.searchParams.get("ok") === "1");
}

async function saveLeadView(
  request: Request,
  db: D1Database,
  admin: Admin,
  session: Session,
  url: URL,
  id: number,
): Promise<Response> {
  const form = await readForm(request);
  if (!(await csrfOk(admin, session, form.get("csrf")))) return redirect(`/admin/lead/${id}`);

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
