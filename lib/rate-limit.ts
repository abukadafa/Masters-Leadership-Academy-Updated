/**
 * Minimal in-memory sliding-window rate limiter, keyed by client IP + a caller-supplied
 * bucket name (e.g. "contact", "login"). This protects public form endpoints and the
 * admin login route from basic spam/brute-force abuse without adding an external
 * dependency (Redis, etc.).
 *
 * Deliberately simple, matching the single-instance / VPS deployment model this app
 * already assumes for SQLite (see lib/db.ts). Limits are enforced per Node process, so
 * if this app is ever deployed across multiple instances or serverless functions, swap
 * the in-memory Map below for a shared store (Redis, or a `rate_limit_hits` table in the
 * existing database) so limits are enforced globally rather than per-instance.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

declare global {
  var __mlaRateLimitBuckets: Map<string, Bucket> | undefined;
}

const buckets = global.__mlaRateLimitBuckets ?? new Map<string, Bucket>();
if (process.env.NODE_ENV !== "production") {
  global.__mlaRateLimitBuckets = buckets;
}

let lastSweep = Date.now();
/** Drops expired buckets so memory doesn't grow unbounded over a long-running process. */
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

/**
 * Returns true if the request is within the allowed rate, false if it should be rejected
 * with a 429. `limit` requests are allowed per `windowMs` per bucket+IP.
 */
export function checkRateLimit(
  req: Request,
  bucketName: string,
  { limit, windowMs }: { limit: number; windowMs: number }
): boolean {
  const now = Date.now();
  sweep(now);

  const key = `${bucketName}:${getClientIp(req)}`;
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= limit) return false;

  existing.count += 1;
  return true;
}
