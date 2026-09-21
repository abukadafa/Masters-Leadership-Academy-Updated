import React from "react";
import Link from "next/link";
import EmptyState from "@/components/EmptyState";

/**
 * Template for a single programme's detail page.
 *
 * No real programme names exist yet (see README — the registration certificate does not
 * supply curriculum data). Once the CMS/catalogue is wired up, this route will render real
 * programme content fetched by slug instead of this EmptyState.
 *
 * noindex: every slug currently resolves to this "not yet published" state (no catalogue
 * exists to validate against), so none of these URLs should be indexed as if they were real
 * programme pages — avoids a soft-404 SEO problem until real programmes exist.
 */
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const readableSlug = slug.replace(/-/g, " ");
  return {
    title: `Programme: ${readableSlug}`,
    robots: { index: false, follow: true },
  };
}

export default async function ProgrammeDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[800px] mb-12">
          <span className="eyebrow text-slate mb-4">Programme Detail</span>
          <h1 className="text-[36px] md:text-[48px] font-serif leading-tight text-ink-text mb-6">
            Programme not yet published
          </h1>
          <p className="text-[18px] text-muted-paper leading-relaxed">
            There is no published programme matching{" "}
            <code className="font-mono text-[15px] bg-paper-2 px-2 py-0.5 rounded-[2px]">{slug}</code>. This page
            template is ready to render a full programme detail — overview, curriculum, schedule, facilitator,
            fees and registration — once a real programme is added to the catalogue.
          </p>
        </div>

        <div className="border-t border-rule-paper pt-12">
          <EmptyState
            title="This programme has not been published"
            description="Programme overview, learning outcomes, curriculum modules, schedule, facilitator profile and fees will appear here once supplied."
            theme="light"
          />
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link href="/programmes" className="btn btn-outline-ink">
              Back to Programme Catalogue
            </Link>
            <Link href="/register" className="btn btn-copper">
              Register Interest
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
