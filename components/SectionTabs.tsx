"use client";

import React, { useState } from "react";

interface Tab {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface SectionTabsProps {
  tabs: Tab[];
  theme?: "light" | "dark";
}

export default function SectionTabs({ tabs, theme = "light" }: SectionTabsProps) {
  const [active, setActive] = useState(tabs[0]?.id);
  const isDark = theme === "dark";

  return (
    <div>
      <div
        className={`flex flex-wrap gap-2 mb-10 border-b ${
          isDark ? "border-rule" : "border-rule-paper"
        }`}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-4 py-3 text-[13px] font-mono uppercase tracking-[0.06em] transition-all cursor-pointer border-b-2 -mb-px ${
                isActive
                  ? "border-copper text-copper-light font-semibold"
                  : isDark
                  ? "border-transparent text-[#9AACA6] hover:text-cream-text"
                  : "border-transparent text-muted-paper hover:text-ink-text"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
      <div>{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}
