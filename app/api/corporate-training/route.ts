import { NextRequest, NextResponse } from "next/server";
import { corporateTrainingRequests } from "@/lib/models";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  MAX_LONG_FIELD,
  MAX_SHORT_FIELD,
  isHoneypotFilled,
  isValidEmail,
  readBoundedField,
} from "@/lib/validate";

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req, "corporate-training", { limit: 5, windowMs: 10 * 60 * 1000 })) {
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

  const company = readBoundedField(body.company, MAX_SHORT_FIELD);
  const contact_name = readBoundedField(body.contactName, MAX_SHORT_FIELD);
  const email = readBoundedField(body.email, MAX_SHORT_FIELD);
  const details = readBoundedField(body.details, MAX_LONG_FIELD);
  const phone = readBoundedField(body.phone, MAX_SHORT_FIELD);
  const team_size = readBoundedField(body.teamSize, MAX_SHORT_FIELD);
  const focus_areas = readBoundedField(body.focusAreas, MAX_SHORT_FIELD);
  const timeline = readBoundedField(body.timeline, MAX_SHORT_FIELD);

  if (
    [company, contact_name, email, details, phone, team_size, focus_areas, timeline].some(
      (v) => v === null
    )
  ) {
    return NextResponse.json({ error: "One or more fields exceed the maximum allowed length." }, { status: 400 });
  }

  if (!company || !contact_name || !email || !details) {
    return NextResponse.json(
      { error: "Company, contact name, email and project details are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  corporateTrainingRequests.insert({
    company,
    contact_name,
    email,
    phone: phone || null,
    team_size: team_size || null,
    focus_areas: focus_areas || null,
    timeline: timeline || null,
    details,
    status: "new",
  });
  return NextResponse.json({ ok: true });
}
