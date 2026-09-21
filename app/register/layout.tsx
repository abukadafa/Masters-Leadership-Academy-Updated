import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Participant Registration",
  description: "Register your interest in Masters Leadership Academy's seminars, symposiums, and conferences.",
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
