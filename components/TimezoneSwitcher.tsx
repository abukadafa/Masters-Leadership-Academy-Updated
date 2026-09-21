"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SUPPORTED_TIMEZONES, TIMEZONE_COOKIE } from "@/lib/locale";

export default function TimezoneSwitcher({ current }: { current: string }) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    document.cookie = `${TIMEZONE_COOKIE}=${e.target.value}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.refresh();
  };

  return (
    <select
      value={current}
      onChange={handleChange}
      aria-label="Preferred time zone"
      className="text-[13px] font-mono border border-rule bg-ink-2 px-3 py-2 text-cream-text focus:outline-none focus:border-copper-light cursor-pointer"
    >
      {SUPPORTED_TIMEZONES.map((t) => (
        <option key={t.tz} value={t.tz}>
          {t.label}
        </option>
      ))}
    </select>
  );
}
