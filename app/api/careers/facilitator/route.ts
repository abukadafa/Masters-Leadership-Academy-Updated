import { NextRequest, NextResponse } from "next/server";
import { facilitatorApplications } from "@/lib/models";
import { checkRateLimit } from "@/lib/rate-limit";
import {
  MAX_SHORT_FIELD,
  isHoneypotFilled,
  isValidEmail,
  readBoundedField,
} from "@/lib/validate";

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req, "facilitator", { limit: 5, windowMs: 10 * 60 * 1000 })) {
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
  const expertise = readBoundedField(body.expertise, MAX_SHORT_FIELD);
  const years_experience = readBoundedField(body.yearsExperience, MAX_SHORT_FIELD);
  const linkedin = readBoundedField(body.linkedin, MAX_SHORT_FIELD);
  const availability = readBoundedField(body.availability, MAX_SHORT_FIELD);

  if ([name, email, expertise, years_experience, linkedin, availability].some((v) => v === null)) {
    return NextResponse.json({ error: "One or more fields exceed the maximum allowed length." }, { status: 400 });
  }

  if (!name || !email || !expertise) {
    return NextResponse.json(
      { error: "Name, email and area of expertise are required." },
      { status: 400 }
    );
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  facilitatorApplications.insert({
    name,
    email,
    expertise,
    years_experience: years_experience || null,
    linkedin: linkedin || null,
    availability: availability || null,
    status: "new",
  });
  return NextResponse.json({ ok: true });
}
