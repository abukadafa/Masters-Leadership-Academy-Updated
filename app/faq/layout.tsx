import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ & Help Centre",
  description: "Frequently asked questions about Masters Leadership Academy's seminars, conferences, and services.",
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return children;
}
