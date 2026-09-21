"use client";

import React, { useEffect, useState } from "react";

interface ImpactStat {
  id: number;
  label: string;
  value: number;
}

function formatValue(n: number): string {
  return n.toLocaleString("en-US");
}

export default function ImpactStats() {
  const [stats, setStats] = useState<ImpactStat[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/impact-stats")
      .then((res) => (res.ok ? res.json() : { stats: [] }))
      .then((data) => {
        if (!cancelled) setStats(data.stats ?? []);
      })
      .catch(() => {
        if (!cancelled) setStats([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  // While loading, render nothing. If nothing has been configured yet, show nothing either —
  // the admin can populate real numbers from /admin/impact.
  if (!stats || stats.length === 0) return null;

  const allZero = stats.every((s) => s.value === 0);

  return (
    <section className="bg-ink text-cream-text py-[80px]">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[640px] mb-[50px]">
          <span className="eyebrow text-copper-light mb-[16px]">Our Impact</span>
          <h2 className="text-[26px] md:text-[34px] leading-[1.15] font-serif">
            The Academy in numbers
          </h2>
        </div>
        {allZero ? (
          <div className="border border-dashed border-rule p-[40px_32px] text-center">
            <p className="mono text-[14px] text-[#C7D2CE] italic">
              [CMS PLACEHOLDER] — Impact counters have been created but not yet given real values.
            </p>
            <span className="inline-flex items-center gap-[8px] mt-[16px] font-mono text-[11px] text-copper-light uppercase tracking-[0.06em] border border-dashed border-rule px-[10px] py-[6px]">
              Editable from /admin/impact
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-rule border border-rule">
            {stats.map((stat) => (
              <div key={stat.id} className="bg-ink-2 p-[30px_22px] flex flex-col gap-2">
                <span className="font-mono text-[34px] md:text-[42px] text-copper-light leading-none">
                  {formatValue(stat.value)}
                  {stat.value > 0 ? "+" : ""}
                </span>
                <span className="text-[13px] text-[#C7D2CE]">{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
