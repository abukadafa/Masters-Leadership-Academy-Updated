"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log for diagnostics; no analytics/error-reporting service is wired up yet
    // (see PROJECT_AUDIT.md for known gaps) — this at least surfaces it in server logs.
    console.error(error);
  }, [error]);

  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[800px] mb-12">
          <span className="eyebrow text-slate mb-4">Something Went Wrong</span>
          <h1 className="text-[36px] md:text-[48px] font-serif leading-tight text-ink-text mb-6">
            We hit a snag loading this page
          </h1>
          <p className="text-[18px] text-muted-paper leading-relaxed">
            An unexpected error occurred. You can try again, or head back to the homepage. If this
            keeps happening, please let us know via the contact page.
          </p>
        </div>
        <div className="border-t border-rule-paper pt-12 flex flex-col sm:flex-row gap-4">
          <button onClick={() => reset()} className="btn btn-copper cursor-pointer">
            Try Again
          </button>
          <Link href="/" className="btn btn-outline-ink">
            Back to Home
          </Link>
          <Link href="/contact" className="btn btn-outline-ink">
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
