import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";
import { hashPassword } from "./password";

// SQLite via node:sqlite (native Node.js v22.5+/v24 module): compiles/runs fully offline, no external engine download needed.
// Note: this stores data in a local file, which works for a single-instance / VPS deployment
// but NOT for serverless platforms with an ephemeral filesystem (e.g. Vercel) — on those,
// point DATABASE_DIR at a mounted persistent volume, or swap this module for a hosted
// Postgres connection (the models.ts query surface is small and deliberately easy to port).
const DATA_DIR = process.env.DATABASE_DIR || path.join(process.cwd(), "data");
if (!fs.existsSync(/*turbopackIgnore: true*/ DATA_DIR)) fs.mkdirSync(/*turbopackIgnore: true*/ DATA_DIR, { recursive: true });
const DB_PATH = path.join(DATA_DIR, "academy.db");

declare global {
  var __mlaDb: DatabaseSync | undefined;
}

function sleep(ms: number) {
  try {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
  } catch {
    const end = Date.now() + ms;
    while (Date.now() < end) {}
  }
}

function init(): DatabaseSync {
  const db = new DatabaseSync(DB_PATH);
  try {
    db.exec("PRAGMA busy_timeout = 15000;");
    db.exec("PRAGMA journal_mode = WAL;");
  } catch {}

  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS corporate_training_requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      team_size TEXT,
      focus_areas TEXT,
      timeline TEXT,
      details TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS partner_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      organisation TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      email TEXT NOT NULL,
      category TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS sponsor_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      organisation TEXT NOT NULL,
      contact_name TEXT NOT NULL,
      email TEXT NOT NULL,
      tier TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS facilitator_applications (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      expertise TEXT NOT NULL,
      years_experience TEXT,
      linkedin TEXT,
      availability TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS registration_interests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      interest TEXT,
      status TEXT NOT NULL DEFAULT 'new',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      reference TEXT UNIQUE NOT NULL,
      provider TEXT NOT NULL,
      purpose TEXT NOT NULL,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      amount REAL NOT NULL,
      currency TEXT NOT NULL DEFAULT 'NGN',
      status TEXT NOT NULL DEFAULT 'pending',
      metadata TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS push_subscriptions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      endpoint TEXT UNIQUE NOT NULL,
      p256dh TEXT NOT NULL,
      auth TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS impact_stats (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      value INTEGER NOT NULL DEFAULT 0,
      sort_order INTEGER NOT NULL DEFAULT 0,
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
      break;
    } catch (e: any) {
      if (attempt < 4) {
        sleep(100 * (attempt + 1));
      } else {
        break;
      }
    }
  }

  try {
    // Seed initial admin user only if explicit credentials are provided via environment variables
    const { c: userCount } = db.prepare("SELECT COUNT(*) as c FROM users").get() as { c: number };
    if (userCount === 0) {
      const initialPassword = process.env.ADMIN_INITIAL_PASSWORD || process.env.ADMIN_PASSWORD;
      const initialEmail = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
      if (initialPassword && initialEmail) {
        db.prepare(
          "INSERT INTO users (email, password_hash, name, role) VALUES (@email, @password_hash, @name, @role)"
        ).run({
          email: initialEmail,
          password_hash: hashPassword(initialPassword),
          name: process.env.ADMIN_NAME || "Academy Administrator",
          role: "SUPER_ADMIN",
        });
      }
    }

    // Seed a starter set of impact counters on first run only
    const { c: impactStatsCount } = db.prepare("SELECT COUNT(*) as c FROM impact_stats").get() as {
      c: number;
    };
    if (impactStatsCount === 0) {
      const seed = db.prepare(
        "INSERT INTO impact_stats (label, value, sort_order) VALUES (@label, @value, @sort_order)"
      );
      [
        { label: "Students Trained", value: 0, sort_order: 0 },
        { label: "Seminars Delivered", value: 0, sort_order: 1 },
        { label: "Workshops Delivered", value: 0, sort_order: 2 },
        { label: "Conferences Hosted", value: 0, sort_order: 3 },
      ].forEach((row) => seed.run(row));
    }
  } catch {}

  return db;
}

// Cache the connection on the global object so Next.js dev-mode hot reload doesn't
// open a new file handle on every module re-evaluation.
const db = global.__mlaDb ?? init();
if (process.env.NODE_ENV !== "production") {
  global.__mlaDb = db;
}

export default db;
