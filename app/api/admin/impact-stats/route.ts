import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { canAccessSection } from "@/lib/permissions";
import { impactStats } from "@/lib/models";
import { MAX_SHORT_FIELD, readBoundedField } from "@/lib/validate";

function readValue(raw: unknown): number | null {
  const n = Number(raw);
  if (!Number.isFinite(n) || !Number.isInteger(n) || n < 0 || n > 1_000_000_000) return null;
  return n;
}

export async function POST(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user || !canAccessSection(user.role, "impact")) {
    return NextResponse.json({ error: "You do not have access to this section." }, { status: 403 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const label = readBoundedField(body.label, MAX_SHORT_FIELD);
  const value = readValue(body.value);

  if (label === null || !label) {
    return NextResponse.json({ error: "A label is required." }, { status: 400 });
  }
  if (value === null) {
    return NextResponse.json({ error: "Value must be a whole number of 0 or more." }, { status: 400 });
  }

  const stat = impactStats.create({ label, value });
  return NextResponse.json({ ok: true, stat });
}
