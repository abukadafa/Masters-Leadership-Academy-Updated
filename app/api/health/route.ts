import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  let database: "ok" | "error" = "ok";
  try {
    db.prepare("SELECT 1").get();
  } catch {
    database = "error";
  }

  const status = database === "ok" ? "ok" : "degraded";
  return NextResponse.json({ status, database }, { status: database === "ok" ? 200 : 503 });
}
