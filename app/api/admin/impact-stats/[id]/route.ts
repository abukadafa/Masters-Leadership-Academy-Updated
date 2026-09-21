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

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || !canAccessSection(user.role, "impact")) {
    return NextResponse.json({ error: "You do not have access to this section." }, { status: 403 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
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

  const updated = impactStats.update(id, { label, value });
  if (!updated) {
    return NextResponse.json({ error: "Stat not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const user = await getCurrentUser();
  if (!user || !canAccessSection(user.role, "impact")) {
    return NextResponse.json({ error: "You do not have access to this section." }, { status: 403 });
  }

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }

  const removed = impactStats.remove(id);
  if (!removed) {
    return NextResponse.json({ error: "Stat not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
