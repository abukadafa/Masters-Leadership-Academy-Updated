import React from "react";
import { getCurrentUser } from "@/lib/session";
import { enquiries } from "@/lib/models";
import { canAccessSection } from "@/lib/permissions";
import AdminTable from "@/components/admin/AdminTable";
import StatusSelect from "@/components/admin/StatusSelect";

export default async function EnquiriesAdminPage() {
  const user = await getCurrentUser();
  if (!user || !canAccessSection(user.role, "enquiries")) {
    return <p className="text-[14px] text-muted-paper">Your role does not have access to this section.</p>;
  }

  const rows = enquiries.list();

  return (
    <div>
      <h1 className="font-serif text-[26px] text-ink-text mb-6">Contact Enquiries</h1>
      <AdminTable
        rows={rows}
        emptyLabel="No enquiries submitted yet."
        columns={[
          { key: "created_at", label: "Received" },
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "subject", label: "Subject" },
          {
            key: "message",
            label: "Message",
            render: (r) => <span className="line-clamp-3 max-w-[36ch] block">{r.message}</span>,
          },
          {
            key: "status",
            label: "Status",
            render: (r) => <StatusSelect table="enquiries" id={r.id} status={r.status} />,
          },
        ]}
      />
    </div>
  );
}
