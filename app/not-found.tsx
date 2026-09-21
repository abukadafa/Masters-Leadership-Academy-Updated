import Link from "next/link";
import PageHero from "@/components/PageHero";

export const metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          theme="light"
          eyebrow="404 — Page Not Found"
          title="This page doesn't exist"
          description="The page you're looking for may have been moved, renamed, or never existed. Check the address, or use one of the links below to find your way."
        />
        <div className="border-t border-rule-paper pt-12 flex flex-col sm:flex-row gap-4">
          <Link href="/" className="btn btn-copper">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-outline-ink">
            Contact Us
          </Link>
          <Link href="/programmes" className="btn btn-outline-ink">
            Browse Programmes
          </Link>
        </div>
      </div>
    </div>
  );
}
