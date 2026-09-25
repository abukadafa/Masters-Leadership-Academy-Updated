import { NextRequest, NextResponse } from "next/server";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import db from "@/lib/db";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";
const MAX_FILE_SIZE = 25 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml", "video/mp4", "video/webm"]);

db.exec(`
  CREATE TABLE IF NOT EXISTS media_assets (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, type TEXT NOT NULL, category TEXT NOT NULL,
    url TEXT NOT NULL, original_name TEXT NOT NULL, mime_type TEXT NOT NULL,
    size INTEGER NOT NULL, description TEXT, created_at TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

async function requireMediaAdmin(req: NextRequest) {
  const token = req.cookies.get(SESSION_COOKIE)?.value;
  const user = await verifySessionToken(token);
  return user && ["SUPER_ADMIN", "CONTENT_MANAGER"].includes(user.role) ? user : null;
}

export async function GET(req: NextRequest) {
  if (!(await requireMediaAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ assets: db.prepare("SELECT * FROM media_assets ORDER BY created_at DESC").all() });
}

export async function POST(req: NextRequest) {
  if (!(await requireMediaAdmin(req))) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file");
  if (!(file instanceof File) || !file.size) return NextResponse.json({ error: "Choose a file to upload." }, { status: 400 });
  if (file.size > MAX_FILE_SIZE) return NextResponse.json({ error: "Files must be 25 MB or smaller." }, { status: 400 });
  if (!ALLOWED_TYPES.has(file.type)) return NextResponse.json({ error: "Unsupported file type." }, { status: 400 });

  const category = String(form.get("category") || "media_gallery");
  const name = String(form.get("name") || file.name).trim().slice(0, 160);
  const description = String(form.get("description") || "").trim().slice(0, 500);
  const type = file.type.startsWith("video/") ? "video" : "image";
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9._-]+/g, "-").replace(/^-+|-+$/g, "");
  const id = crypto.randomUUID();
  const filename = `${id}-${safeName || "upload"}`;
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(path.join(uploadDir, filename), Buffer.from(await file.arrayBuffer()));
  const url = `/uploads/${filename}`;
  db.prepare(`INSERT INTO media_assets (id, name, type, category, url, original_name, mime_type, size, description)
    VALUES (@id, @name, @type, @category, @url, @original_name, @mime_type, @size, @description)`).run({
      id, name, type, category, url, original_name: file.name, mime_type: file.type, size: file.size, description,
    });
  return NextResponse.json({ asset: { id, name, type, category, url, description } }, { status: 201 });
}
