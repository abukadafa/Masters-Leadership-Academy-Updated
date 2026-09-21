"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const STATUS_LABELS: Record<string, string> = {
  new: "New",
  in_review: "In Review",
  contacted: "Contacted",
  closed: "Closed",
};

const STATUS_OPTIONS = ["new", "in_review", "contacted", "closed"];

interface StatusSelectProps {
  table:
    | "enquiries"
    | "corporate-training"
    | "partner-applications"
    | "sponsor-applications"
    | "facilitators"
    | "registrations";
  id: number;
  status: string;
}

export default function StatusSelect({ table, id, status }: StatusSelectProps) {
  const router = useRouter();
  const [value, setValue] = useState(status);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value;
    const prev = value;
    setValue(next);
    setSaving(true);
    setError("");
    try {
      const res = await fetch("/api/admin/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table, id, status: next }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setValue(prev);
        setError(data.error || "Could not update status.");
        return;
      }
      router.refresh();
    } catch {
      setValue(prev);
      setError("Could not update status.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="inline-flex flex-col gap-1">
      <select
        value={value}
        onChange={handleChange}
        disabled={saving}
        className="font-mono text-[11px] uppercase tracking-[0.05em] border border-rule-paper bg-paper-2 text-ink-text px-2 py-1.5 rounded-[2px] focus:outline-none focus:border-copper disabled:opacity-60 cursor-pointer"
      >
        {STATUS_OPTIONS.map((opt) => (
          <option key={opt} value={opt}>
            {STATUS_LABELS[opt] ?? opt}
          </option>
        ))}
      </select>
      {error && <span className="text-[11px] text-[#C0503B]">{error}</span>}
    </div>
  );
}
