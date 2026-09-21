/**
 * Social media links, footer-wide.
 *
 * Facebook is confirmed (supplied by the Academy). Instagram, LinkedIn, and X are not
 * confirmed yet, so they fall back to placeholder handles built from the Academy name —
 * the same "wire it, don't fake a live number" approach used for WhatsApp
 * (components/WhatsAppButton.tsx). Swap in the real handles via the env vars below as
 * soon as the Academy confirms them; nothing else needs to change.
 *
 * NEXT_PUBLIC_SOCIAL_FACEBOOK, NEXT_PUBLIC_SOCIAL_INSTAGRAM, NEXT_PUBLIC_SOCIAL_LINKEDIN,
 * NEXT_PUBLIC_SOCIAL_X — full URLs, optional. See .env.example.
 */

export type SocialLink = {
  name: string;
  href: string;
  /** True once a real, Academy-confirmed handle is set via env var. */
  confirmed: boolean;
};

export const socialLinks: SocialLink[] = [
  {
    name: "Facebook",
    href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK || "https://web.facebook.com/LeadMastersAcademy",
    confirmed: true,
  },
  {
    name: "Instagram",
    href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM || "https://www.instagram.com/masters_leadership_academy/",
    confirmed: true,
  },
  {
    name: "LinkedIn",
    href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN || "https://www.linkedin.com/company/masters-leadership-academy",
    confirmed: Boolean(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN),
  },
  {
    name: "X",
    href: process.env.NEXT_PUBLIC_SOCIAL_X || "https://x.com/mlaportharcourt",
    confirmed: Boolean(process.env.NEXT_PUBLIC_SOCIAL_X),
  },
];
