import { NextRequest, NextResponse } from "next/server";
import { pushSubscriptions } from "@/lib/models";

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const endpoint = String(body.endpoint ?? "").trim();
  const keys = body.keys as { p256dh?: string; auth?: string } | undefined;
  const p256dh = String(keys?.p256dh ?? "").trim();
  const auth = String(keys?.auth ?? "").trim();

  if (!endpoint || !p256dh || !auth) {
    return NextResponse.json({ error: "Invalid subscription object." }, { status: 400 });
  }

  pushSubscriptions.upsert({ endpoint, p256dh, auth });
  return NextResponse.json({ ok: true });
}
