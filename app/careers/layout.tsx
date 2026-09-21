import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers",
  description: "Facilitator and career opportunities at Masters Leadership Academy.",
};

export default function CareersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
