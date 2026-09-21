import React from "react";
import { getCurrentUser } from "@/lib/session";
import { partnerApplications, sponsorApplications } from "@/lib/models";
import { canAccessSection } from "@/lib/permissions";
import AdminTable from "@/components/admin/AdminTable";
import StatusSelect from "@/components/admin/StatusSelect";

export default async function PartnershipsAdminPage() {
  const user = await getCurrentUser();
  if (!user || !canAccessSection(user.role, "partnerships")) {
    return <p className="text-[14px] text-muted-paper">Your role does not have access to this section.</p>;
  }

  const partners = partnerApplications.list();
  const sponsors = sponsorApplications.list();

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="font-serif text-[26px] text-ink-text mb-6">Partner Applications</h1>
        <AdminTable
          rows={partners}
          emptyLabel="No partner applications submitted yet."
          columns={[
            { key: "created_at", label: "Received" },
            { key: "organisation", label: "Organisation" },
            { key: "contact_name", label: "Contact" },
            { key: "email", label: "Email" },
            { key: "category", label: "Category" },
            {
              key: "message",
              label: "Message",
              render: (r) => <span className="line-clamp-3 max-w-[32ch] block">{r.message}</span>,
            },
            {
              key: "status",
              label: "Status",
              render: (r) => <StatusSelect table="partner-applications" id={r.id} status={r.status} />,
            },
          ]}
        />
      </div>

      <div>
        <h2 className="font-serif text-[22px] text-ink-text mb-6">Sponsor Enquiries</h2>
        <AdminTable
          rows={sponsors}
          emptyLabel="No sponsor enquiries submitted yet."
          columns={[
            { key: "created_at", label: "Received" },
            { key: "organisation", label: "Organisation" },
            { key: "contact_name", label: "Contact" },
            { key: "email", label: "Email" },
            { key: "tier", label: "Tier" },
            {
              key: "message",
              label: "Message",
              render: (r) => <span className="line-clamp-3 max-w-[32ch] block">{r.message}</span>,
            },
            {
              key: "status",
              label: "Status",
              render: (r) => <StatusSelect table="sponsor-applications" id={r.id} status={r.status} />,
            },
          ]}
        />
      </div>
    </div>
  );
}
