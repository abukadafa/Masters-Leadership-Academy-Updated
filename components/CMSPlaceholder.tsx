import React from "react";

interface CMSPlaceholderProps {
  text: string;
  className?: string;
}

export default function CMSPlaceholder({ text, className = "" }: CMSPlaceholderProps) {
  return (
    <div className={`my-4 ${className}`}>
      <p className="mono text-[14px] text-muted-paper italic">
        [CMS PLACEHOLDER] — {text}
      </p>
      <span className="inline-flex items-center gap-[8px] mt-[16px] font-mono text-[11px] text-copper uppercase tracking-[0.06em] border border-dashed border-rule-paper px-[10px] py-[6px]">
        Editable field · not yet supplied
      </span>
    </div>
  );
}
