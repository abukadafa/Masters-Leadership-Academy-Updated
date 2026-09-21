/**
 * Central site metadata — single source of truth for SEO/JSON-LD facts, so every
 * page and the structured-data block stay in sync instead of re-typing the same
 * strings. Verified facts only (name, registration numbers, address) come from
 * reference/registration-certificate.pdf per README.md's content-integrity rule —
 * nothing here should be invented.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mastersleadershipacademy.com";
// Normalise: no trailing slash, so callers can always do `${SITE_URL}/path`.
export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const SITE_NAME = "Masters Leadership Academy";

export const SITE_DESCRIPTION =
  "Masters Leadership Academy organises seminars, symposiums, conferences and technical services. CAC Registered Business Name BN 2357164, Port Harcourt, Rivers State, Nigeria.";

export const ORG_FACTS = {
  legalName: "Masters Leadership Academy",
  businessNumber: "BN 2357164",
  crbn: "CRBN 635769",
  streetAddress: "Plot 4Y2K Crescent, off Tony Okocha Road, New Rumuigbo",
  addressLocality: "Port Harcourt",
  addressRegion: "Rivers State",
  addressCountry: "NG",
};

/** Builds an absolute URL from a site-relative path. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
