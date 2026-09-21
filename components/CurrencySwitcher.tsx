"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { SUPPORTED_CURRENCIES, CURRENCY_COOKIE, type CurrencyCode } from "@/lib/locale";

export default function CurrencySwitcher({ current }: { current: CurrencyCode }) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    document.cookie = `${CURRENCY_COOKIE}=${e.target.value}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    router.refresh();
  };

  return (
    <select
      value={current}
      onChange={handleChange}
      aria-label="Preferred currency"
      className="text-[13px] font-mono border border-rule-paper bg-paper px-3 py-2 text-ink-text focus:outline-none focus:border-copper cursor-pointer"
    >
      {SUPPORTED_CURRENCIES.map((c) => (
        <option key={c.code} value={c.code}>
          {c.symbol} {c.code}
        </option>
      ))}
    </select>
  );
}
