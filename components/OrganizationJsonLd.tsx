import { SITE_URL, ORG_FACTS } from "@/lib/site";

/**
 * Organization structured data, rendered once in the root layout. Uses only the
 * verified facts from reference/registration-certificate.pdf (name, registration
 * numbers, address) — no fabricated phone/email/social profiles, per the
 * content-integrity rule in README.md / PROJECT_AUDIT.md.
 */
export default function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: ORG_FACTS.legalName,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/icon-512.png`,
    address: {
      "@type": "PostalAddress",
      streetAddress: ORG_FACTS.streetAddress,
      addressLocality: ORG_FACTS.addressLocality,
      addressRegion: ORG_FACTS.addressRegion,
      addressCountry: ORG_FACTS.addressCountry,
    },
    identifier: [ORG_FACTS.businessNumber, ORG_FACTS.crbn],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
