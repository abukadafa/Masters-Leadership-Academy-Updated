import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/session";
import { canAccessSection, type Section } from "@/lib/permissions";
import {
  enquiries,
  corporateTrainingRequests,
  partnerApplications,
  sponsorApplications,
  facilitatorApplications,
  registrationInterests,
  SUBMISSION_STATUSES,
  type SubmissionStatus,
} from "@/lib/models";

/** Whitelisted table keys → { model, section }. Keeps the client from ever supplying a raw
 * table name that reaches SQL, and ties each table to the permission section that guards it. */
const TABLES = {
  enquiries: { model: enquiries, section: "enquiries" as Section },
  "corporate-training": { model: corporateTrainingRequests, section: "corporate-training" as Section },
  "partner-applications": { model: partnerApplications, section: "partnerships" as Section },
  "sponsor-applications": { model: sponsorApplications, section: "partnerships" as Section },
  facilitators: { model: facilitatorApplications, section: "facilitators" as Section },
  registrations: { model: registrationInterests, section: "registrations" as Section },
} as const;

type TableKey = keyof typeof TABLES;

export async function PATCH(req: NextRequest) {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const table = String(body.table ?? "") as TableKey;
  const id = Number(body.id);
  const status = String(body.status ?? "") as SubmissionStatus;

  if (!(table in TABLES)) {
    return NextResponse.json({ error: "Unknown table." }, { status: 400 });
  }
  if (!Number.isInteger(id) || id <= 0) {
    return NextResponse.json({ error: "Invalid id." }, { status: 400 });
  }
  if (!SUBMISSION_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid status." }, { status: 400 });
  }

  const { model, section } = TABLES[table];
  if (!canAccessSection(user.role, section)) {
    return NextResponse.json({ error: "You do not have access to this section." }, { status: 403 });
  }

  const updated = model.updateStatus(id, status);
  if (!updated) {
    return NextResponse.json({ error: "Record not found." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
