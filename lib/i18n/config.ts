export type Locale = "en" | "fr" | "ar";

export interface LocaleInfo {
  code: Locale;
  label: string;
  nativeLabel: string;
  dir: "ltr" | "rtl";
}

export const LOCALES: LocaleInfo[] = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "fr", label: "French", nativeLabel: "Français", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
];

export const DEFAULT_LOCALE: Locale = "en";
export const LOCALE_COOKIE = "mla_locale";

export function getLocaleInfo(code: string | undefined | null): LocaleInfo {
  return LOCALES.find((l) => l.code === code) ?? LOCALES[0];
}
