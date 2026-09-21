import { NextRequest, NextResponse } from "next/server";
import { partnerApplications } from "@/lib/models";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  MAX_LONG_FIELD,
  MAX_SHORT_FIELD,
  isHoneypotFilled,
  isValidEmail,
  readBoundedField,
} from "@/lib/validate";

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req, "partner", { limit: 5, windowMs: 10 * 60 * 1000 })) {
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

  const organisation = readBoundedField(body.organisation, MAX_SHORT_FIELD);
  const contact_name = readBoundedField(body.contactName, MAX_SHORT_FIELD);
  const email = readBoundedField(body.email, MAX_SHORT_FIELD);
  const message = readBoundedField(body.message, MAX_LONG_FIELD);
  const category = readBoundedField(body.category, MAX_SHORT_FIELD);

  if ([organisation, contact_name, email, message, category].some((v) => v === null)) {
    return NextResponse.json({ error: "One or more fields exceed the maximum allowed length." }, { status: 400 });
  }

  if (!organisation || !contact_name || !email || !message) {
    return NextResponse.json(
      { error: "Organisation, contact name, email and message are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  partnerApplications.insert({ organisation, contact_name, email, category: category || null, message, status: "new" });
  return NextResponse.json({ ok: true });
}
