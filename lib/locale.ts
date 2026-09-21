/**
 * Internationalisation utilities (see roadmap item 44).
 *
 * The Academy is currently Nigeria-based with no live pricing or scheduled events yet
 * (see README on CMS placeholders), so there is nothing real to convert or localise today.
 * This module is the architecture the item asks for — real, working formatting logic —
 * ready to apply the moment programme fees and event dates are confirmed, rather than a
 * fabricated currency converter or invented exchange rates.
 */

export type CurrencyCode = "NGN" | "USD" | "GBP" | "EUR";

export interface Region {
  code: string;
  label: string;
  currency: CurrencyCode;
  /** IANA timezone used as the default when a viewer in this region hasn't picked their own. */
  timezone: string;
}

export const REGIONS: Region[] = [
  { code: "NG", label: "Nigeria", currency: "NGN", timezone: "Africa/Lagos" },
  { code: "AFR", label: "Africa (other)", currency: "USD", timezone: "Africa/Lagos" },
  { code: "INTL", label: "International", currency: "USD", timezone: "Etc/UTC" },
];

export const DEFAULT_REGION_CODE = "NG";

export const REGION_COOKIE = "mla_region";
export const CURRENCY_COOKIE = "mla_currency";
export const TIMEZONE_COOKIE = "mla_timezone";

export function getRegion(code: string | undefined | null): Region {
  return REGIONS.find((r) => r.code === code) ?? REGIONS[0];
}

/**
 * Every currency this site is architected to eventually price programmes in. NGN is the
 * Academy's home currency; USD/GBP/EUR cover the "international payment / USD/GBP/EUR
 * pricing" item explicitly. No conversion rates are applied — real fees will be entered
 * per-currency by whoever manages the programme catalogue, the same way most multi-currency
 * course platforms work, rather than this site silently converting at a rate that could be
 * stale or wrong.
 */
export const SUPPORTED_CURRENCIES: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: "NGN", label: "Nigerian Naira", symbol: "₦" },
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "GBP", label: "British Pound", symbol: "£" },
  { code: "EUR", label: "Euro", symbol: "€" },
];

export function formatCurrency(amount: number, currency: CurrencyCode, locale = "en-NG"): string {
  try {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    const symbol = SUPPORTED_CURRENCIES.find((c) => c.code === currency)?.symbol ?? "";
    return `${symbol}${amount.toLocaleString()}`;
  }
}

/**
 * A representative set of timezones a Nigeria-headquartered Academy with an international
 * audience needs: home base plus one anchor per major participant region.
 */
export const SUPPORTED_TIMEZONES: { tz: string; label: string }[] = [
  { tz: "Africa/Lagos", label: "West Africa Time (Lagos, Abuja, Port Harcourt)" },
  { tz: "Etc/UTC", label: "UTC" },
  { tz: "Europe/London", label: "London" },
  { tz: "America/New_York", label: "US Eastern" },
  { tz: "Asia/Dubai", label: "Gulf Standard Time" },
];

export function formatEventDateTime(iso: string, timeZone: string, locale = "en-GB"): string {
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "full",
    timeStyle: "short",
    timeZone,
  }).format(new Date(iso));
}
