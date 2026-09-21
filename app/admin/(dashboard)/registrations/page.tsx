import React from "react";
import { getCurrentUser } from "@/lib/session";
import { registrationInterests } from "@/lib/models";
import { canAccessSection } from "@/lib/permissions";
import AdminTable from "@/components/admin/AdminTable";
import StatusSelect from "@/components/admin/StatusSelect";

export default async function RegistrationsAdminPage() {
  const user = await getCurrentUser();
  if (!user || !canAccessSection(user.role, "registrations")) {
    return <p className="text-[14px] text-muted-paper">Your role does not have access to this section.</p>;
  }

  const rows = registrationInterests.list();

  return (
    <div>
      <h1 className="font-serif text-[26px] text-ink-text mb-6">Participant Registration Interest</h1>
      <AdminTable
        rows={rows}
        emptyLabel="No registration interest submitted yet."
        columns={[
          { key: "created_at", label: "Received" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "interest", label: "Area of Interest" },
          {
            key: "status",
            label: "Status",
            render: (r) => <StatusSelect table="registrations" id={r.id} status={r.status} />,
          },
        ]}
      />
    </div>
  );
}
