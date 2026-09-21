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
  if (!endpoint) {
    return NextResponse.json({ error: "Endpoint is required." }, { status: 400 });
  }

  pushSubscriptions.deleteByEndpoint(endpoint);
  return NextResponse.json({ ok: true });
}
