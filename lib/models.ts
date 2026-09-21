import db from "./db";
import type { Role } from "./auth";

export interface DbUser {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  role: Role;
  created_at: string;
}

export function findUserByEmail(email: string): DbUser | undefined {
  return db.prepare("SELECT * FROM users WHERE email = ?").get(email) as DbUser | undefined;
}

export function createUser(input: {
  email: string;
  passwordHash: string;
  name: string;
  role: Role;
}): DbUser {
  db.prepare(
    "INSERT INTO users (email, password_hash, name, role) VALUES (@email, @passwordHash, @name, @role)"
  ).run(input);
  return findUserByEmail(input.email)!;
}

export function countUsers(): number {
  const row = db.prepare("SELECT COUNT(*) as c FROM users").get() as { c: number };
  return row.c;
}

/** Statuses every submission table shares — kept in one place so the admin UI and the API
 * route that writes them agree on the same allowed set. */
export const SUBMISSION_STATUSES = ["new", "in_review", "contacted", "closed"] as const;
export type SubmissionStatus = (typeof SUBMISSION_STATUSES)[number];

/** Small factory for the repeated insert/list/count/status shape each submission table needs. */
function makeTable<T>(table: string) {
  return {
    insert(row: Record<string, unknown>): number {
      const cols = Object.keys(row);
      const placeholders = cols.map((c) => `@${c}`).join(", ");
      const stmt = db.prepare(`INSERT INTO ${table} (${cols.join(", ")}) VALUES (${placeholders})`);
      const info = stmt.run(row as Record<string, string | number | null>);
      return Number(info.lastInsertRowid);
    },
    list(): T[] {
      return db.prepare(`SELECT * FROM ${table} ORDER BY created_at DESC`).all() as T[];
    },
    count(): number {
      const row = db.prepare(`SELECT COUNT(*) as c FROM ${table}`).get() as { c: number };
      return row.c;
    },
    updateStatus(id: number, status: SubmissionStatus): boolean {
      const info = db.prepare(`UPDATE ${table} SET status = ? WHERE id = ?`).run(status, id);
      return info.changes > 0;
    },
  };
}

export interface Enquiry {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
  created_at: string;
}
export const enquiries = makeTable<Enquiry>("enquiries");

export interface CorporateTrainingRequest {
  id: number;
  company: string;
  contact_name: string;
  email: string;
  phone: string | null;
  team_size: string | null;
  focus_areas: string | null;
  timeline: string | null;
  details: string;
  status: string;
  created_at: string;
}
export const corporateTrainingRequests = makeTable<CorporateTrainingRequest>(
  "corporate_training_requests"
);

export interface PartnerApplication {
  id: number;
  organisation: string;
  contact_name: string;
  email: string;
  category: string | null;
  message: string;
  status: string;
  created_at: string;
}
export const partnerApplications = makeTable<PartnerApplication>("partner_applications");

export interface SponsorApplication {
  id: number;
  organisation: string;
  contact_name: string;
  email: string;
  tier: string | null;
  message: string;
  status: string;
  created_at: string;
}
export const sponsorApplications = makeTable<SponsorApplication>("sponsor_applications");

export interface FacilitatorApplication {
  id: number;
  name: string;
  email: string;
  expertise: string;
  years_experience: string | null;
  linkedin: string | null;
  availability: string | null;
  status: string;
  created_at: string;
}
export const facilitatorApplications = makeTable<FacilitatorApplication>(
  "facilitator_applications"
);

export interface RegistrationInterest {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  status: string;
  created_at: string;
}
export const registrationInterests = makeTable<RegistrationInterest>("registration_interests");

export interface PushSubscriptionRow {
  id: number;
  endpoint: string;
  p256dh: string;
  auth: string;
  created_at: string;
}

/** Stores browser push subscriptions. Sending pushes to them is not implemented yet —
 * see public/sw.js and README for what's needed to turn that on (VAPID keys + web-push). */
export const pushSubscriptions = {
  upsert(sub: { endpoint: string; p256dh: string; auth: string }): void {
    db.prepare(
      `INSERT INTO push_subscriptions (endpoint, p256dh, auth) VALUES (@endpoint, @p256dh, @auth)
       ON CONFLICT(endpoint) DO UPDATE SET p256dh = excluded.p256dh, auth = excluded.auth`
    ).run(sub);
  },
  deleteByEndpoint(endpoint: string): void {
    db.prepare("DELETE FROM push_subscriptions WHERE endpoint = ?").run(endpoint);
  },
  list(): PushSubscriptionRow[] {
    return db.prepare("SELECT * FROM push_subscriptions ORDER BY created_at DESC").all() as unknown as PushSubscriptionRow[];
  },
  count(): number {
    const row = db.prepare("SELECT COUNT(*) as c FROM push_subscriptions").get() as { c: number };
    return row.c;
  },
};

export interface ImpactStat {
  id: number;
  label: string;
  value: number;
  sort_order: number;
  updated_at: string;
}

/** Editable "Academy in numbers" counters (students trained, seminars delivered, etc.) shown
 * publicly on the homepage and managed from /admin/impact. */
export const impactStats = {
  list(): ImpactStat[] {
    return db.prepare("SELECT * FROM impact_stats ORDER BY sort_order ASC, id ASC").all() as unknown as ImpactStat[];
  },
  create(input: { label: string; value: number }): ImpactStat {
    const { max } = db.prepare("SELECT COALESCE(MAX(sort_order), -1) as max FROM impact_stats").get() as {
      max: number;
    };
    const info = db
      .prepare("INSERT INTO impact_stats (label, value, sort_order) VALUES (@label, @value, @sort_order)")
      .run({ label: input.label, value: input.value, sort_order: max + 1 });
    return db.prepare("SELECT * FROM impact_stats WHERE id = ?").get(info.lastInsertRowid) as unknown as ImpactStat;
  },
  update(id: number, input: { label: string; value: number }): boolean {
    const info = db
      .prepare("UPDATE impact_stats SET label = ?, value = ?, updated_at = datetime('now') WHERE id = ?")
      .run(input.label, input.value, id);
    return info.changes > 0;
  },
  remove(id: number): boolean {
    const info = db.prepare("DELETE FROM impact_stats WHERE id = ?").run(id);
    return info.changes > 0;
  },
};

export type PaymentProvider = "paystack" | "flutterwave";
export type PaymentPurpose = "donation" | "registration";
export type PaymentStatus = "pending" | "success" | "failed";

export interface PaymentRow {
  id: number;
  reference: string;
  provider: PaymentProvider;
  purpose: PaymentPurpose;
  name: string;
  email: string;
  amount: number;
  currency: string;
  status: PaymentStatus;
  metadata: string | null;
  created_at: string;
  updated_at: string;
}

/** Payment intents/records for donations and programme registration fees, created before
 * redirecting to Paystack/Flutterwave and updated once the provider confirms the outcome. */
export const payments = {
  create(input: {
    reference: string;
    provider: PaymentProvider;
    purpose: PaymentPurpose;
    name: string;
    email: string;
    amount: number;
    currency: string;
    metadata?: string | null;
  }): PaymentRow {
    db.prepare(
      `INSERT INTO payments (reference, provider, purpose, name, email, amount, currency, metadata)
       VALUES (@reference, @provider, @purpose, @name, @email, @amount, @currency, @metadata)`
    ).run({ ...input, metadata: input.metadata ?? null });
    return this.findByReference(input.reference)!;
  },
  findByReference(reference: string): PaymentRow | undefined {
    return db.prepare("SELECT * FROM payments WHERE reference = ?").get(reference) as
      | PaymentRow
      | undefined;
  },
  updateStatus(reference: string, status: PaymentStatus): void {
    db.prepare(
      "UPDATE payments SET status = ?, updated_at = datetime('now') WHERE reference = ?"
    ).run(status, reference);
  },
  list(): PaymentRow[] {
    return db.prepare("SELECT * FROM payments ORDER BY created_at DESC").all() as unknown as PaymentRow[];
  },
  count(): number {
    const row = db.prepare("SELECT COUNT(*) as c FROM payments").get() as { c: number };
    return row.c;
  },
};
