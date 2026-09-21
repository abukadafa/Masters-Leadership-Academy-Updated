import { NextResponse } from "next/server";
import { impactStats } from "@/lib/models";

export async function GET() {
  return NextResponse.json({ stats: impactStats.list() });
}
