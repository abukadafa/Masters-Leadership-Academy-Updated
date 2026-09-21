import { NextRequest, NextResponse } from "next/server";
import { payments, type PaymentProvider, type PaymentPurpose } from "@/lib/models";
import { checkRateLimit } from "@/lib/rate-limit";
import { MAX_SHORT_FIELD, isValidEmail, readBoundedField } from "@/lib/validate";
import { generateReference, initializeFlutterwave, initializePaystack } from "@/lib/payments";

const PROVIDERS: PaymentProvider[] = ["paystack", "flutterwave"];
const PURPOSES: PaymentPurpose[] = ["donation", "registration"];
const CURRENCY = "NGN";
const MIN_AMOUNT = 100; // NGN 100 floor to avoid provider-side rejections on tiny amounts

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req, "payments-initialize", { limit: 10, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = readBoundedField(body.name, MAX_SHORT_FIELD);
  const email = readBoundedField(body.email, MAX_SHORT_FIELD);
  const provider = readBoundedField(body.provider, 20) as PaymentProvider | null;
  const purpose = readBoundedField(body.purpose, 20) as PaymentPurpose | null;
  const note = readBoundedField(body.note, MAX_SHORT_FIELD) ?? "";
  const amountRaw = Number(body.amount);

  if (name === null || email === null || provider === null || purpose === null) {
    return NextResponse.json({ error: "One or more fields exceed the maximum allowed length." }, { status: 400 });
  }
  if (!name || !email || !isValidEmail(email)) {
    return NextResponse.json({ error: "A valid name and email are required." }, { status: 400 });
  }
  if (!PROVIDERS.includes(provider)) {
    return NextResponse.json({ error: "Unsupported payment provider." }, { status: 400 });
  }
  if (!PURPOSES.includes(purpose)) {
    return NextResponse.json({ error: "Unsupported payment purpose." }, { status: 400 });
  }
  if (!Number.isFinite(amountRaw) || amountRaw < MIN_AMOUNT) {
    return NextResponse.json({ error: `Amount must be at least ₦${MIN_AMOUNT}.` }, { status: 400 });
  }

  const amount = Math.round(amountRaw * 100) / 100;
  const reference = generateReference(purpose === "donation" ? "DON" : "REG");
  const origin = req.nextUrl.origin;
  const description =
    purpose === "donation"
      ? "Donation to Masters Leadership Academy"
      : "Masters Leadership Academy — Programme Registration Fee";

  payments.create({
    reference,
    provider,
    purpose,
    name,
    email,
    amount,
    currency: CURRENCY,
    metadata: note || null,
  });

  try {
    if (provider === "paystack") {
      const { authorizationUrl } = await initializePaystack({
        reference,
        email,
        name,
        amount,
        currency: CURRENCY,
        callbackUrl: `${origin}/payment/callback?provider=paystack&reference=${reference}`,
        description,
      });
      return NextResponse.json({ url: authorizationUrl, reference });
    }

    const { authorizationUrl } = await initializeFlutterwave({
      reference,
      email,
      name,
      amount,
      currency: CURRENCY,
      callbackUrl: `${origin}/payment/callback?provider=flutterwave&reference=${reference}`,
      description,
    });
    return NextResponse.json({ url: authorizationUrl, reference });
  } catch (err) {
    payments.updateStatus(reference, "failed");
    const message = err instanceof Error ? err.message : "Failed to start payment.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
