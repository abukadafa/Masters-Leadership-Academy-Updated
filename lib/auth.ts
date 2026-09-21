/**
 * Session token signing/verification.
 *
 * Deliberately built on the Web Crypto API (globalThis.crypto.subtle) rather than Node's
 * `crypto` module, so the SAME code can run both in Next.js Middleware (Edge runtime, where
 * Node's `crypto` module is unavailable) and in route handlers (Node runtime). This keeps
 * route protection working in middleware without needing the database or Node-only APIs there.
 *
 * Password hashing (which IS Node-only, via scrypt) lives separately in lib/password.ts and is
 * only ever used from Node-runtime route handlers and scripts.
 */

export type Role =
  | "SUPER_ADMIN"
  | "CONTENT_MANAGER"
  | "PROGRAMME_MANAGER"
  | "EVENT_MANAGER"
  | "FINANCE_OFFICER"
  | "FACILITATOR"
  | "PARTICIPANT";

export const ALL_ROLES: Role[] = [
  "SUPER_ADMIN",
  "CONTENT_MANAGER",
  "PROGRAMME_MANAGER",
  "EVENT_MANAGER",
  "FINANCE_OFFICER",
  "FACILITATOR",
  "PARTICIPANT",
];

export interface SessionUser {
  id: number;
  email: string;
  name: string;
  role: Role;
}

export const SESSION_COOKIE = "mla_session";
export const SESSION_TTL_SECONDS = 60 * 60 * 8; // 8 hours

function getSecret(): string {
  const s = process.env.SESSION_SECRET;
  if (!s) {
    if (process.env.NODE_ENV === "production") {
      throw new Error(
        "SESSION_SECRET environment variable must be set in production. See .env.example."
      );
    }
    return "dev-only-insecure-secret-change-me";
  }
  return s;
}

async function hmacKey(): Promise<CryptoKey> {
  const enc = new TextEncoder();
  return crypto.subtle.importKey(
    "raw",
    enc.encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function toBase64Url(bytes: ArrayBuffer | Uint8Array): string {
  const buf = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let str = "";
  for (const b of buf) str += String.fromCharCode(b);
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(b64url: string): Uint8Array<ArrayBuffer> {
  const b64 = b64url
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(Math.ceil(b64url.length / 4) * 4, "=");
  const str = atob(b64);
  const bytes = new Uint8Array(new ArrayBuffer(str.length));
  for (let i = 0; i < str.length; i++) bytes[i] = str.charCodeAt(i);
  return bytes;
}

export async function createSessionToken(user: SessionUser): Promise<string> {
  const payload = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const payloadB64 = toBase64Url(new TextEncoder().encode(JSON.stringify(payload)));
  const key = await hmacKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payloadB64));
  return `${payloadB64}.${toBase64Url(sig)}`;
}

export async function verifySessionToken(
  token: string | undefined | null
): Promise<SessionUser | null> {
  if (!token) return null;
  const [payloadB64, sigB64] = token.split(".");
  if (!payloadB64 || !sigB64) return null;

  try {
    const key = await hmacKey();
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sigB64),
      new TextEncoder().encode(payloadB64)
    );
    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(payloadB64)));
    if (typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    const { id, email, name, role } = payload;
    if (!id || !email || !name || !role) return null;
    return { id, email, name, role };
  } catch {
    return null;
  }
}
