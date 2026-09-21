"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LOCALES, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    document.cookie = `${LOCALE_COOKIE}=${e.target.value}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.refresh();
  };

  return (
    <select
      value={current}
      onChange={handleChange}
      aria-label={label}
      className="text-[12px] font-mono uppercase bg-transparent border border-rule text-cream-text px-2 py-1.5 focus:outline-none focus:border-copper-light cursor-pointer"
    >
      {LOCALES.map((l) => (
        <option key={l.code} value={l.code} className="bg-ink text-cream-text">
          {l.nativeLabel}
        </option>
      ))}
    </select>
  );
}
