/** Shared validation helpers for public form API routes (app/api/**\/route.ts). */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  return email.length > 0 && email.length <= 254 && EMAIL_RE.test(email);
}

/** Generic field length ceiling for short text inputs (names, subjects, single-line values). */
export const MAX_SHORT_FIELD = 200;
/** Generic field length ceiling for long text inputs (messages, details). */
export const MAX_LONG_FIELD = 5000;

/**
 * Reads a trimmed string field from a parsed JSON body. Returns null if the value exceeds
 * maxLength, so the caller can reject the request with a 400 instead of silently truncating
 * or storing an oversized value.
 */
export function readBoundedField(value: unknown, maxLength: number): string | null {
  const s = String(value ?? "").trim();
  if (s.length > maxLength) return null;
  return s;
}

/**
 * Honeypot check for public forms: a hidden field (conventionally named `website`) that real
 * users never see or fill in. If it's non-empty, the submission is very likely automated.
 * Callers should respond as if the submission succeeded (without persisting it) so bots don't
 * learn they were caught.
 */
export function isHoneypotFilled(body: Record<string, unknown>): boolean {
  return String(body.website ?? "").trim().length > 0;
}
