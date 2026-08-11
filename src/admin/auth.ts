/**
 * Acceso al panel: un único usuario, sesión en cookie firmada.
 *
 * No hay tabla de usuarios ni registro ni recuperación de contraseña. Las
 * credenciales son tres secretos del Worker (ver `Env`) y la sesión es una
 * cookie httpOnly firmada con HMAC: sin estado en D1, así que cerrar sesión en
 * todas partes es cambiar `ADMIN_SESSION_SECRET`.
 */

import type { Env } from "../env";

const COOKIE = "bixio_admin";
const SESSION_HOURS = 12;

export type AdminConfig = {
  email: string;
  passwordHash: string;
  secret: string;
};

/** Devuelve null si el panel no está configurado todavía. */
export function readConfig(env: Env): AdminConfig | null {
  const email = env.ADMIN_EMAIL?.trim();
  const passwordHash = env.ADMIN_PASSWORD_HASH?.trim();
  const secret = env.ADMIN_SESSION_SECRET?.trim();
  if (!email || !passwordHash || !secret) return null;
  return { email, passwordHash, secret };
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
 * Verifica contra `pbkdf2$<iteraciones>$<salt b64>$<hash b64>`.
 * El hash lo genera `npm run admin:password`, que usa el mismo formato.
 */
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

async function sign(config: AdminConfig, payload: SessionPayload): Promise<string> {
  const body = base64UrlEncode(JSON.stringify(payload));
  return `${body}.${await hmac(config.secret, body)}`;
}

async function verify(config: AdminConfig, token: string): Promise<SessionPayload | null> {
  const dot = token.lastIndexOf(".");
  if (dot < 1) return null;

  const body = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  if (!timingSafeEqual(await hmac(config.secret, body), signature)) return null;

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
export async function readSession(request: Request, config: AdminConfig): Promise<Session | null> {
  const token = readCookie(request, COOKIE);
  if (!token) return null;
  const payload = await verify(config, token);
  // Si cambia el email del admin, las sesiones del anterior dejan de valer.
  if (!payload || payload.sub !== config.email) return null;
  return { email: payload.sub };
}

/**
 * `Secure` va siempre, también en `wrangler dev` sobre http://localhost:
 * los navegadores admiten cookies Secure en localhost precisamente para esto.
 * `SameSite=Strict` es la primera defensa contra CSRF; el token de §csrf es la
 * segunda.
 */
export async function sessionCookie(config: AdminConfig): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_HOURS * 3600;
  const token = await sign(config, { sub: config.email, exp });
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${SESSION_HOURS * 3600}`;
}

export function clearCookie(): string {
  return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

// ---------------------------------------------------------------------- csrf

/** Token ligado a la sesión: sin cookie válida no se puede fabricar. */
export async function csrfToken(config: AdminConfig, session: Session): Promise<string> {
  return hmac(config.secret, `csrf:${session.email}`);
}

export async function csrfOk(
  config: AdminConfig,
  session: Session,
  candidate: unknown,
): Promise<boolean> {
  if (typeof candidate !== "string" || !candidate) return false;
  return timingSafeEqual(await csrfToken(config, session), candidate);
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
