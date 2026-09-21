/**
 * Generates a real VAPID key pair for Web Push, using Node's built-in crypto (ECDH on the
 * P-256 curve) — no external dependency needed just to generate keys.
 *
 * This only produces the key pair. It does NOT implement sending push messages — that
 * needs the `web-push` package (or hand-rolled Web Push encryption) plus a job that reads
 * lib/models.ts `pushSubscriptions` and sends to each endpoint. Wiring that up is future
 * work; this script exists so that work isn't blocked on generating trustworthy keys.
 *
 * Usage: npx tsx scripts/generate-vapid-keys.ts
 */
import crypto from "crypto";

function toBase64Url(buf: Buffer): string {
  return buf.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

const ecdh = crypto.createECDH("prime256v1");
ecdh.generateKeys();

const publicKey = toBase64Url(ecdh.getPublicKey());
const privateKey = toBase64Url(ecdh.getPrivateKey());

console.log("VAPID keys generated. Add these to your environment (.env.local):\n");
console.log(`NEXT_PUBLIC_VAPID_PUBLIC_KEY=${publicKey}`);
console.log(`VAPID_PRIVATE_KEY=${privateKey}`);
console.log(
  "\nThe public key is safe to expose client-side (hence NEXT_PUBLIC_). Keep the private key secret."
);
