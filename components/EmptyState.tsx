import React from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  theme?: "light" | "dark";
  className?: string;
}

export default function EmptyState({
  title,
  description,
  theme = "light",
  className = "",
}: EmptyStateProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={`border border-dashed p-[40px_20px] md:p-[60px_40px] text-center ${
        isDark
          ? "border-rule text-[#9AACA6]"
          : "border-rule-paper text-muted-paper"
      } ${className}`}
    >
      <h4
        className={`font-serif text-[20px] md:text-[21px] mb-[10px] ${
          isDark ? "text-cream-text" : "text-ink-text"
        }`}
      >
        {title}
      </h4>
      <p className="text-[14px] max-w-[52ch] mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  );
}
