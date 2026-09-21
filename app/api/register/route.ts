import { NextRequest, NextResponse } from "next/server";
import { registrationInterests } from "@/lib/models";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  MAX_SHORT_FIELD,
  isHoneypotFilled,
  isValidEmail,
  readBoundedField,
} from "@/lib/validate";

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req, "register", { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (isHoneypotFilled(body)) {
    return NextResponse.json({ ok: true });
  }

  const name = readBoundedField(body.name, MAX_SHORT_FIELD);
  const email = readBoundedField(body.email, MAX_SHORT_FIELD);
  const phone = readBoundedField(body.phone, MAX_SHORT_FIELD);
  const interest = readBoundedField(body.interest, MAX_SHORT_FIELD);

  if (name === null || email === null || phone === null || interest === null) {
    return NextResponse.json({ error: "One or more fields exceed the maximum allowed length." }, { status: 400 });
  }

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  registrationInterests.insert({ name, email, phone: phone || null, interest: interest || null, status: "new" });
  return NextResponse.json({ ok: true });
}
