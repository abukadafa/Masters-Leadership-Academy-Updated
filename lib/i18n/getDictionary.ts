import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/types";
import en from "./dictionaries/en";
import fr from "./dictionaries/fr";
import ar from "./dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = { en, fr, ar };

/**
 * Only the shared site chrome (nav + footer) is translated so far — this proves the
 * pattern end-to-end (cookie → server layout → dictionary → client components, with RTL
 * for Arabic) rather than faking full coverage. Translating the ~25 content pages is a
 * separate content task: add keys to Dictionary in dictionaries/types.ts, translate them
 * in each locale file, then swap the hardcoded strings on a page for `dict.<namespace>.<key>`
 * the same way Header/Footer do it.
 */
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en;
}
