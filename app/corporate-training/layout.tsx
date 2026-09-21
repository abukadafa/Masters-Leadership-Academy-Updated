import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Training",
  description: "Corporate training and technical services from Masters Leadership Academy for organisations and teams.",
};

export default function CorporateTrainingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
