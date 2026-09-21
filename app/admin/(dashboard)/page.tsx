import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/session";
import {
  enquiries,
  corporateTrainingRequests,
  partnerApplications,
  sponsorApplications,
  facilitatorApplications,
  registrationInterests,
  impactStats,
} from "@/lib/models";
import { canAccessSection, type Section } from "@/lib/permissions";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null; // layout redirects before this can render

  const cards: { label: string; count: number; section: Section; href: string }[] = [
    { label: "Enquiries", count: enquiries.count(), section: "enquiries", href: "/admin/enquiries" },
    {
      label: "Corporate Training Requests",
      count: corporateTrainingRequests.count(),
      section: "corporate-training",
      href: "/admin/corporate-training",
    },
    {
      label: "Partner Applications",
      count: partnerApplications.count(),
      section: "partnerships",
      href: "/admin/partnerships",
    },
    {
      label: "Sponsor Enquiries",
      count: sponsorApplications.count(),
      section: "partnerships",
      href: "/admin/partnerships",
    },
    {
      label: "Facilitator Applications",
      count: facilitatorApplications.count(),
      section: "facilitators",
      href: "/admin/facilitators",
    },
    {
      label: "Registration Interest",
      count: registrationInterests.count(),
      section: "registrations",
      href: "/admin/registrations",
    },
    {
      label: "Impact Counters",
      count: impactStats.list().length,
      section: "impact",
      href: "/admin/impact",
    },
  ];

  const visibleCards = cards.filter((c) => canAccessSection(user.role, c.section));

  return (
    <div>
      <h1 className="font-serif text-[28px] text-ink-text mb-2">Welcome, {user.name}</h1>
      <p className="text-[14px] text-muted-paper mb-10">
        Signed in as{" "}
        <span className="font-mono uppercase text-copper text-[13px]">{user.role.replace(/_/g, " ")}</span>. You
        see only the sections your role has access to.
      </p>
      {visibleCards.length === 0 ? (
        <p className="text-[14px] text-muted-paper">Your role does not currently have access to any submission sections.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleCards.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className="bg-paper-2 border border-rule-paper/50 p-6 rounded-[2px] hover:border-copper transition-colors"
            >
              <span className="font-mono text-[36px] text-copper block mb-2">{c.count}</span>
              <span className="text-[14px] text-ink-text">{c.label}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
