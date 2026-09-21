import React from "react";
import { getCurrentUser } from "@/lib/session";
import { facilitatorApplications } from "@/lib/models";
import { canAccessSection } from "@/lib/permissions";
import AdminTable from "@/components/admin/AdminTable";
import StatusSelect from "@/components/admin/StatusSelect";

export default async function FacilitatorsAdminPage() {
  const user = await getCurrentUser();
  if (!user || !canAccessSection(user.role, "facilitators")) {
    return <p className="text-[14px] text-muted-paper">Your role does not have access to this section.</p>;
  }

  const rows = facilitatorApplications.list();

  return (
    <div>
      <h1 className="font-serif text-[26px] text-ink-text mb-6">Facilitator Applications</h1>
      <AdminTable
        rows={rows}
        emptyLabel="No facilitator applications submitted yet."
        columns={[
          { key: "created_at", label: "Received" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "expertise", label: "Expertise" },
          { key: "years_experience", label: "Years" },
          { key: "availability", label: "Availability" },
          {
            key: "linkedin",
            label: "LinkedIn",
            render: (r) =>
              r.linkedin ? (
                <a href={r.linkedin} target="_blank" rel="noopener noreferrer" className="text-copper underline">
                  Profile
                </a>
              ) : (
                "—"
              ),
          },
          {
            key: "status",
            label: "Status",
            render: (r) => <StatusSelect table="facilitators" id={r.id} status={r.status} />,
          },
        ]}
      />
    </div>
  );
}
