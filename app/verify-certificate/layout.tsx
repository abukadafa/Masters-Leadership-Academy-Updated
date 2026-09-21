import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify a Certificate",
  description: "Verify the authenticity of a Masters Leadership Academy certificate of completion.",
};

export default function VerifyCertificateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
