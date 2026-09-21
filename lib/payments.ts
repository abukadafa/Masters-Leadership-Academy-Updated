/**
 * Payment provider integration (Paystack + Flutterwave).
 *
 * Both providers are called directly over their REST APIs (no SDK dependency needed).
 * Secret keys are read from environment variables and never sent to the client —
 * see .env.example for the variable names to set in your hosting provider's dashboard.
 *
 * Currency: amounts are always handled in the main unit (e.g. Naira), not kobo/cents.
 * Paystack requires kobo, so we multiply by 100 only at the Paystack call site.
 */

export type PaymentProvider = "paystack" | "flutterwave";

export function generateReference(prefix: string): string {
  const random = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now()}_${random}`.toUpperCase();
}

interface InitializeInput {
  reference: string;
  email: string;
  name: string;
  amount: number; // main currency unit, e.g. Naira
  currency: string; // e.g. "NGN"
  callbackUrl: string;
  description: string;
}

interface InitializeResult {
  authorizationUrl: string;
}

export async function initializePaystack(input: InitializeInput): Promise<InitializeResult> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "PAYSTACK_SECRET_KEY is not configured. Add it in your hosting provider's environment variables."
    );
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      reference: input.reference,
      email: input.email,
      amount: Math.round(input.amount * 100), // kobo
      currency: input.currency,
      callback_url: input.callbackUrl,
      metadata: { name: input.name, description: input.description },
    }),
  });

  const data = await res.json();
  if (!res.ok || !data.status) {
    throw new Error(data.message || "Failed to initialize Paystack transaction.");
  }

  return { authorizationUrl: data.data.authorization_url as string };
}

export async function verifyPaystack(reference: string): Promise<{ success: boolean; raw: unknown }> {
  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    throw new Error("PAYSTACK_SECRET_KEY is not configured.");
  }

  const res = await fetch(
    `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
    { headers: { Authorization: `Bearer ${secretKey}` } }
  );
  const data = await res.json();
  const success = res.ok && data.status && data.data?.status === "success";
  return { success, raw: data };
}

export async function initializeFlutterwave(input: InitializeInput): Promise<InitializeResult> {
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secretKey) {
    throw new Error(
      "FLUTTERWAVE_SECRET_KEY is not configured. Add it in your hosting provider's environment variables."
    );
  }

  const res = await fetch("https://api.flutterwave.com/v3/payments", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tx_ref: input.reference,
      amount: input.amount,
      currency: input.currency,
      redirect_url: input.callbackUrl,
      customer: { email: input.email, name: input.name },
      customizations: {
        title: "Masters Leadership Academy",
        description: input.description,
      },
    }),
  });

  const data = await res.json();
  if (!res.ok || data.status !== "success") {
    throw new Error(data.message || "Failed to initialize Flutterwave transaction.");
  }

  return { authorizationUrl: data.data.link as string };
}

export async function verifyFlutterwave(
  transactionId: string,
  expectedReference: string
): Promise<{ success: boolean; raw: unknown }> {
  const secretKey = process.env.FLUTTERWAVE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("FLUTTERWAVE_SECRET_KEY is not configured.");
  }

  const res = await fetch(
    `https://api.flutterwave.com/v3/transactions/${encodeURIComponent(transactionId)}/verify`,
    { headers: { Authorization: `Bearer ${secretKey}` } }
  );
  const data = await res.json();
  const success =
    res.ok &&
    data.status === "success" &&
    data.data?.status === "successful" &&
    data.data?.tx_ref === expectedReference;
  return { success, raw: data };
}
