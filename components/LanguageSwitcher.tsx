"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LOCALES, LOCALE_COOKIE, type Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher({ current, label }: { current: Locale; label: string }) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    document.cookie = `${LOCALE_COOKIE}=${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    document.cookie = `googtrans=/en/${nextLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    window.location.reload();
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={current}
        onChange={handleChange}
        aria-label={label}
        className="text-xs font-mono font-semibold uppercase bg-slate-50 hover:bg-slate-100 border border-slate-300 text-slate-800 rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-emerald-600 cursor-pointer transition-colors shadow-2xs"
      >
        {LOCALES.map((l) => (
          <option key={l.code} value={l.code} className="bg-white text-slate-900 font-sans text-sm">
            {l.nativeLabel} ({l.code.toUpperCase()})
          </option>
        ))}
      </select>
    </div>
  );
}
