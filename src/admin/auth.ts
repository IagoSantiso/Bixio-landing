/**
 * Acceso al panel: un único usuario, sesión en cookie firmada.
 *
 * La cuenta vive en D1 (tabla `admin_user`, ver migrations/0003_admin_user.sql)
 * y no en secretos del Worker: así se puede crear la primera vez desde
 * `/admin/setup` y cambiar después desde `/admin/cuenta`, sin tocar
 * `wrangler secret put`. Es el mismo nivel de acceso que ya hace falta para
 * todo lo demás del panel — nadie gana un privilegio nuevo por poder
 * gestionar su propia contraseña.
 *
 * La sesión es una cookie httpOnly firmada con HMAC usando el
 * `session_secret` de esa fila: no hay tabla de sesiones en D1, así que
 * cerrar sesión en todas partes es rotar ese secreto (lo que hace, de paso,
 * cualquier cambio de contraseña — ver `updateAdmin`).
 */

const COOKIE = "bixio_admin";
const SESSION_HOURS = 12;
/**
 * 100.000 y no más: es el tope real que aplica `workerd` en producción a
 * `crypto.subtle.deriveBits` con PBKDF2 — por encima lanza `NotSupportedError`
 * (visto en Workers Logs, no está documentado en un límite obvio). `wrangler
 * dev --local` no lo hace cumplir, así que un valor mayor pasa el desarrollo
 * local y revienta en producción. El número de iteraciones va dentro del
 * propio hash (`pbkdf2$<iteraciones>$...`), así que bajar esta constante no
 * invalida ninguna cuenta ya creada con un valor distinto.
 */
const ITERATIONS = 100_000;

export type Admin = {
  email: string;
  passwordHash: string;
  secret: string;
};

/** null si todavía no se ha creado la cuenta del panel. */
export async function getAdmin(db: D1Database): Promise<Admin | null> {
  const row = await db
    .prepare("SELECT email, password_hash, session_secret FROM admin_user WHERE id = 1")
    .first<{ email: string; password_hash: string; session_secret: string }>();
  if (!row) return null;
  return { email: row.email, passwordHash: row.password_hash, secret: row.session_secret };
}

/**
 * Solo tiene efecto si todavía no existe la fila (`INSERT ... id = 1` choca
 * con la que ya hubiera). Quien llama debe comprobar `getAdmin` primero: así
 * el mensaje que ve quien lo intenta después de que ya exista es "esa cuenta
 * ya está creada", no un error de la base de datos.
 */
export async function createAdmin(db: D1Database, email: string, password: string): Promise<void> {
  const passwordHash = await hashPassword(password);
  const secret = bytesToBase64(crypto.getRandomValues(new Uint8Array(32)));
  await db
    .prepare("INSERT INTO admin_user (id, email, password_hash, session_secret) VALUES (1, ?, ?, ?)")
    .bind(email, passwordHash, secret)
    .run();
}

/**
 * Cambia email y/o contraseña. El `session_secret` se rota siempre que se
 * llama, tanto si cambia la contraseña como si no: es lo que invalida de
 * golpe cualquier sesión abierta que no sea la que acaba de hacer el cambio
 * (esa se reemite aparte, ver `saveAccountView` en index.ts).
 */
export async function updateAdmin(
  db: D1Database,
  updates: { email: string; password?: string },
): Promise<Admin> {
  const passwordHash = updates.password ? await hashPassword(updates.password) : null;
  const secret = bytesToBase64(crypto.getRandomValues(new Uint8Array(32)));

  await db
    .prepare(
      `UPDATE admin_user
          SET email = ?, session_secret = ?, updated_at = datetime('now'),
              password_hash = COALESCE(?, password_hash)
        WHERE id = 1`,
    )
    .bind(updates.email, secret, passwordHash)
    .run();

  const admin = await getAdmin(db);
  if (!admin) throw new Error("admin_user desapareció durante la actualización");
  return admin;
}

// ---------------------------------------------------------------- utilidades

const encoder = new TextEncoder();

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function base64UrlEncode(value: string): string {
  return bytesToBase64(encoder.encode(value)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(value: string): string {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/");
  return new TextDecoder().decode(base64ToBytes(padded + "=".repeat((4 - (padded.length % 4)) % 4)));
}

/**
 * Comparación en tiempo constante. Con un solo usuario el riesgo real es
 * bajo, pero comparar firmas con `===` es la clase de atajo que envejece mal.
 */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function hmac(secret: string, message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return bytesToBase64(new Uint8Array(signature))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

// ----------------------------------------------------------------- contraseña

/**
 * Genera `pbkdf2$<iteraciones>$<salt b64>$<hash b64>`. Corre en el propio
 * Worker (Web Crypto, no Node): es lo que permite crear y cambiar la cuenta
 * desde una petición HTTP en vez de con un script aparte.
 */
async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations: ITERATIONS, hash: "SHA-256" },
    key,
    256,
  );
  return `pbkdf2$${ITERATIONS}$${bytesToBase64(salt)}$${bytesToBase64(new Uint8Array(bits))}`;
}

/** Verifica contra el formato que genera `hashPassword`. */
export async function verifyPassword(stored: string, candidate: string): Promise<boolean> {
  const parts = stored.split("$");
  if (parts.length !== 4 || parts[0] !== "pbkdf2") return false;

  const iterations = Number(parts[1]);
  if (!Number.isInteger(iterations) || iterations < 1) return false;

  let salt: Uint8Array;
  let expected: string;
  try {
    salt = base64ToBytes(parts[2]);
    expected = parts[3];
  } catch {
    return false;
  }

  const key = await crypto.subtle.importKey("raw", encoder.encode(candidate), "PBKDF2", false, [
    "deriveBits",
  ]);
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt: salt as BufferSource, iterations, hash: "SHA-256" },
    key,
    256,
  );

  return timingSafeEqual(bytesToBase64(new Uint8Array(bits)), expected);
}

// -------------------------------------------------------------------- sesión

type SessionPayload = { sub: string; exp: number };

export type Session = { email: string };

async function sign(admin: Admin, payload: SessionPayload): Promise<string> {
  const body = base64UrlEncode(JSON.stringify(payload));
  return `${body}.${await hmac(admin.secret, body)}`;
}

async function verify(admin: Admin, token: string): Promise<SessionPayload | null> {
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;

  const body = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!timingSafeEqual(await hmac(admin.secret, body), signature)) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(body)) as SessionPayload;
    if (typeof payload.exp !== "number" || payload.exp * 1000 < Date.now()) return null;
    if (typeof payload.sub !== "string") return null;
    return payload;
  } catch {
    return null;
  }
}

function readCookie(request: Request, name: string): string | null {
  const header = request.headers.get("Cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}

/** La sesión del que pide, o null si no hay ninguna válida. */
export async function readSession(request: Request, admin: Admin): Promise<Session | null> {
  const token = readCookie(request, COOKIE);
  if (!token) return null;
  const payload = await verify(admin, token);
  // Si cambia el email del admin, las sesiones del anterior dejan de valer.
  if (!payload || payload.sub !== admin.email) return null;
  return { email: payload.sub };
}

/**
 * `Secure` va siempre, también en `wrangler dev` sobre http://localhost:
 * los navegadores admiten cookies Secure en localhost precisamente para esto.
 * `SameSite=Strict` es la primera defensa contra CSRF; el token de §csrf es la
 * segunda.
 */
export async function sessionCookie(admin: Admin): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_HOURS * 3600;
  const token = await sign(admin, { sub: admin.email, exp });
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}`;
}

export function clearCookie(): string {
  return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

// ---------------------------------------------------------------------- csrf

/** Token ligado a la sesión: sin cookie válida no se puede fabricar. */
export async function csrfToken(admin: Admin, session: Session): Promise<string> {
  return hmac(admin.secret, `csrf:${session.email}`);
}

export async function csrfOk(admin: Admin, session: Session, candidate: unknown): Promise<boolean> {
  if (typeof candidate !== "string" || !candidate) return false;
  return timingSafeEqual(await csrfToken(admin, session), candidate);
}

// ------------------------------------------------------------ fuerza bruta

/**
 * Freno de intentos de login, por IP y en memoria del isolate.
 *
 * No es un rate limiter serio —Cloudflare puede reciclar el isolate o
 * repartirte en otro, y entonces el contador empieza de cero— pero corta en
 * seco el caso que importa: un script probando contraseñas contra la única
 * cuenta que existe. Si algún día hace falta de verdad, el sitio es
 * Cloudflare Rate Limiting delante de /admin/login, no más código aquí.
 */
const attempts = new Map<string, { count: number; until: number }>();
const MAX_ATTEMPTS = 8;
const WINDOW_MS = 10 * 60 * 1000;

export function loginBlocked(ip: string): boolean {
  const entry = attempts.get(ip);
  if (!entry) return false;
  if (entry.until < Date.now()) {
    attempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

export function loginFailed(ip: string): void {
  const now = Date.now();
  const entry = attempts.get(ip);
  if (!entry || entry.until < now) {
    attempts.set(ip, { count: 1, until: now + WINDOW_MS });
    return;
  }
  entry.count += 1;
}

export function loginSucceeded(ip: string): void {
  attempts.delete(ip);
}
