import type { Role } from "./auth";

/** Roles allowed into the admin dashboard at all. Facilitator and Participant get a future
 * portal, not the internal admin — see README for the Participant/Learning Portal roadmap. */
export const ADMIN_ROLES: Role[] = [
  "SUPER_ADMIN",
  "CONTENT_MANAGER",
  "PROGRAMME_MANAGER",
  "EVENT_MANAGER",
  "FINANCE_OFFICER",
];

export const SECTIONS = [
  "enquiries",
  "corporate-training",
  "partnerships",
  "facilitators",
  "registrations",
  "impact",
] as const;

export type Section = (typeof SECTIONS)[number];

/** Which roles can view which submission types. SUPER_ADMIN always sees everything. */
export const SECTION_ACCESS: Record<Section, Role[]> = {
  enquiries: ["SUPER_ADMIN", "CONTENT_MANAGER"],
  "corporate-training": ["SUPER_ADMIN", "PROGRAMME_MANAGER", "FINANCE_OFFICER"],
  partnerships: ["SUPER_ADMIN", "PROGRAMME_MANAGER", "FINANCE_OFFICER"],
  facilitators: ["SUPER_ADMIN", "PROGRAMME_MANAGER"],
  registrations: ["SUPER_ADMIN", "PROGRAMME_MANAGER", "EVENT_MANAGER"],
  impact: ["SUPER_ADMIN", "CONTENT_MANAGER"],
};

export function canAccessSection(role: Role, section: Section): boolean {
  return SECTION_ACCESS[section]?.includes(role) ?? false;
}
