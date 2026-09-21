import React from "react";

interface CmsGridSlotProps {
  label: string;
  className?: string;
}

/** A compact, repeatable empty-state tile for grids (resources, publications, vacancies, etc.) */
export default function CmsGridSlot({ label, className = "" }: CmsGridSlotProps) {
  return (
    <div
      className={`border border-dashed border-rule-paper bg-paper-2/50 p-6 flex flex-col items-center justify-center text-center min-h-[140px] rounded-[2px] ${className}`}
    >
      <span className="font-mono text-[10px] text-copper uppercase tracking-wider mb-2">
        [CMS Placeholder]
      </span>
      <p className="text-[13px] text-muted-paper max-w-[30ch]">{label}</p>
    </div>
  );
}
