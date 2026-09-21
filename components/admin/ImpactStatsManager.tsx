"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface ImpactStat {
  id: number;
  label: string;
  value: number;
  sort_order: number;
  updated_at: string;
}

function StatRow({ stat, onChanged }: { stat: ImpactStat; onChanged: () => void }) {
  const [label, setLabel] = useState(stat.label);
  const [value, setValue] = useState(String(stat.value));
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const dirty = label !== stat.label || value !== String(stat.value);

  const handleSave = async () => {
    setSaving(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/impact-stats/${stat.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label, value: Number(value) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not save.");
        return;
      }
      onChanged();
    } catch {
      setError("Could not save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Remove "${stat.label}" from the impact counters?`)) return;
    setDeleting(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/impact-stats/${stat.id}`, { method: "DELETE" });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || "Could not delete.");
        return;
      }
      onChanged();
    } catch {
      setError("Could not delete.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-wrap items-start gap-3 border-b border-rule-paper/40 py-4 last:border-none">
      <input
        value={label}
        onChange={(e) => setLabel(e.target.value)}
        maxLength={200}
        className="flex-1 min-w-[220px] p-2.5 border border-rule-paper bg-paper text-ink-text text-[14px] focus:outline-none focus:border-copper"
      />
      <input
        type="number"
        min={0}
        step={1}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-[140px] p-2.5 border border-rule-paper bg-paper text-ink-text text-[14px] font-mono focus:outline-none focus:border-copper"
      />
      <button
        onClick={handleSave}
        disabled={!dirty || saving}
        className="btn btn-outline-ink !py-2.5 !px-4 text-[13px] disabled:opacity-40 cursor-pointer"
      >
        {saving ? "Saving..." : "Save"}
      </button>
      <button
        onClick={handleDelete}
        disabled={deleting}
        className="text-[13px] text-[#C0503B] px-3 py-2.5 border border-[#C0503B]/40 hover:bg-[#C0503B]/5 transition-colors disabled:opacity-40 cursor-pointer"
      >
        {deleting ? "Removing..." : "Remove"}
      </button>
      {error && <span className="w-full text-[12px] text-[#C0503B]">{error}</span>}
    </div>
  );
}

export default function ImpactStatsManager({ initialStats }: { initialStats: ImpactStat[] }) {
  const router = useRouter();
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("0");
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState("");

  const refresh = () => router.refresh();

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    setAddError("");
    try {
      const res = await fetch("/api/admin/impact-stats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ label: newLabel, value: Number(newValue) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setAddError(data.error || "Could not add stat.");
        return;
      }
      setNewLabel("");
      setNewValue("0");
      refresh();
    } catch {
      setAddError("Could not add stat.");
    } finally {
      setAdding(false);
    }
  };

  return (
    <div>
      <div className="border border-rule-paper/50 rounded-[2px] bg-paper-2 px-5">
        {initialStats.length === 0 ? (
          <p className="text-[14px] text-muted-paper py-8 text-center">
            No impact counters yet — add the first one below.
          </p>
        ) : (
          initialStats.map((stat) => <StatRow key={stat.id} stat={stat} onChanged={refresh} />)
        )}
      </div>

      <form
        onSubmit={handleAdd}
        className="mt-8 border border-dashed border-rule-paper p-5 flex flex-wrap items-start gap-3"
      >
        <div className="flex-1 min-w-[220px]">
          <label className="block text-[11px] font-mono uppercase text-slate mb-1.5">New Counter Label</label>
          <input
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            placeholder="e.g. Corporate Partners"
            required
            maxLength={200}
            className="w-full p-2.5 border border-rule-paper bg-paper text-ink-text text-[14px] focus:outline-none focus:border-copper"
          />
        </div>
        <div>
          <label className="block text-[11px] font-mono uppercase text-slate mb-1.5">Value</label>
          <input
            type="number"
            min={0}
            step={1}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            className="w-[140px] p-2.5 border border-rule-paper bg-paper text-ink-text text-[14px] font-mono focus:outline-none focus:border-copper"
          />
        </div>
        <button
          type="submit"
          disabled={adding || !newLabel.trim()}
          className="btn btn-copper !py-[13px] disabled:opacity-50 cursor-pointer self-end"
        >
          {adding ? "Adding..." : "Add Counter"}
        </button>
        {addError && <span className="w-full text-[12px] text-[#C0503B]">{addError}</span>}
      </form>
    </div>
  );
}
