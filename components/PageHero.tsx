import React from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  theme?: "light" | "dark";
}

export default function PageHero({ eyebrow, title, description, theme = "light" }: PageHeroProps) {
  const isDark = theme === "dark";
  return (
    <div className="max-w-[800px] mb-12">
      <span className={`eyebrow mb-4 ${isDark ? "text-copper-light" : "text-slate"}`}>{eyebrow}</span>
      <h1
        className={`text-[36px] md:text-[48px] font-serif leading-tight mb-6 ${
          isDark ? "text-cream-text" : "text-ink-text"
        }`}
      >
        {title}
      </h1>
      <p className={`text-[18px] leading-relaxed ${isDark ? "text-[#B9C6C2]" : "text-muted-paper"}`}>
        {description}
      </p>
    </div>
  );
}
