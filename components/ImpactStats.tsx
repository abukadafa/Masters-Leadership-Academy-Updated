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

  const defaultStats = [
    { id: 1, label: "Leaders & Executives Impacted", value: 1250, suffix: "+" },
    { id: 2, label: "Masterclasses & Strategic Seminars", value: 85, suffix: "+" },
    { id: 3, label: "Years Operational Heritage", value: 10, suffix: "+ Yrs" },
    { id: 4, label: "Corporate Governance & CAC Compliance", value: 100, suffix: "%" },
  ];

  const allZero = stats.every((s) => s.value === 0);
  const displayStats = allZero ? defaultStats : stats;

  return (
    <section className="bg-[#F8FAFC] text-slate-900 py-24 border-b border-slate-200">
      <div className="max-w-[1280px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-slate-200">
          <div className="max-w-2xl">
            <span className="eyebrow text-emerald-700 mb-3 block">Institutional Milestones</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-950 tracking-tight">
              Measurable Impact Across Sectors
            </h2>
            <p className="text-slate-600 text-base sm:text-lg mt-3 leading-relaxed">
              Demonstrated capacity building across energy, public utilities, government institutions, and corporate boardrooms.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500">
            Official CAC Registered Institution · BN 2357164
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayStats.map((stat) => (
            <div
              key={stat.id}
              className="bg-white border border-slate-200/90 p-8 rounded-2xl shadow-xs hover:shadow-md hover:border-emerald-600/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div className="text-4xl sm:text-5xl font-serif font-bold text-emerald-800 tracking-tight leading-none mb-4 group-hover:text-emerald-700 transition-colors">
                {formatValue(stat.value)}
                {(stat as any).suffix || (stat.value > 0 ? "+" : "")}
              </div>
              <span className="text-sm font-semibold text-slate-700 leading-snug">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
