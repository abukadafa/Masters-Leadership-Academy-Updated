import React from "react";
import { getCurrentUser } from "@/lib/session";
import { corporateTrainingRequests } from "@/lib/models";
import { canAccessSection } from "@/lib/permissions";
import AdminTable from "@/components/admin/AdminTable";
import StatusSelect from "@/components/admin/StatusSelect";

export default async function CorporateTrainingAdminPage() {
  const user = await getCurrentUser();
  if (!user || !canAccessSection(user.role, "corporate-training")) {
    return <p className="text-[14px] text-muted-paper">Your role does not have access to this section.</p>;
  }

  const rows = corporateTrainingRequests.list();

  return (
    <div>
      <h1 className="font-serif text-[26px] text-ink-text mb-6">Corporate Training Requests</h1>
      <AdminTable
        rows={rows}
        emptyLabel="No corporate training requests submitted yet."
        columns={[
          { key: "created_at", label: "Received" },
          { key: "company", label: "Company" },
          { key: "contact_name", label: "Contact" },
          { key: "email", label: "Email" },
          { key: "team_size", label: "Team Size" },
          { key: "timeline", label: "Timeline" },
          {
            key: "details",
            label: "Details",
            render: (r) => <span className="line-clamp-3 max-w-[36ch] block">{r.details}</span>,
          },
          {
            key: "status",
            label: "Status",
            render: (r) => <StatusSelect table="corporate-training" id={r.id} status={r.status} />,
          },
        ]}
      />
    </div>
  );
}
