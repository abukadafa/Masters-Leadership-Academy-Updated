import { NextRequest, NextResponse } from "next/server";
import { enquiries } from "@/lib/models";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  MAX_LONG_FIELD,
  MAX_SHORT_FIELD,
  isHoneypotFilled,
  isValidEmail,
  readBoundedField,
} from "@/lib/validate";

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req, "contact", { limit: 5, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypot: pretend success without persisting so automated submissions can't tell they failed.
  if (isHoneypotFilled(body)) {
    return NextResponse.json({ ok: true });
  }

  const name = readBoundedField(body.name, MAX_SHORT_FIELD);
  const email = readBoundedField(body.email, MAX_SHORT_FIELD);
  const subject = readBoundedField(body.subject, MAX_SHORT_FIELD);
  const message = readBoundedField(body.message, MAX_LONG_FIELD);

  if (name === null || email === null || subject === null || message === null) {
    return NextResponse.json({ error: "One or more fields exceed the maximum allowed length." }, { status: 400 });
  }

  if (!name || !email || !subject || !message) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  enquiries.insert({ name, email, subject, message, status: "new" });
  return NextResponse.json({ ok: true });
}
