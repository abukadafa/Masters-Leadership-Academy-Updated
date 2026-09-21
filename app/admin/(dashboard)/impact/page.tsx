import React from "react";
import { getCurrentUser } from "@/lib/session";
import { impactStats } from "@/lib/models";
import { canAccessSection } from "@/lib/permissions";
import ImpactStatsManager from "@/components/admin/ImpactStatsManager";

export default async function ImpactAdminPage() {
  const user = await getCurrentUser();
  if (!user || !canAccessSection(user.role, "impact")) {
    return <p className="text-[14px] text-muted-paper">Your role does not have access to this section.</p>;
  }

  const stats = impactStats.list();

  return (
    <div>
      <h1 className="font-serif text-[26px] text-ink-text mb-2">Impact Counters</h1>
      <p className="text-[14px] text-muted-paper mb-8 max-w-[60ch]">
        These numbers appear in the &quot;Academy in Numbers&quot; section on the homepage. Edit a value and
        click Save, remove a counter you don&apos;t need, or add a new one — changes go live immediately.
      </p>
      <ImpactStatsManager initialStats={stats} />
    </div>
  );
}
