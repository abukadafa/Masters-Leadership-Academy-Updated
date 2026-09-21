import React from "react";
import PageHero from "@/components/PageHero";
import CMSPlaceholder from "@/components/CMSPlaceholder";

export const metadata = {
  title: "Refund & Cancellation Policy",
  description: "Masters Leadership Academy's refund and cancellation policy for registrations and enrolments.",
  robots: { index: false, follow: true },
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Legal"
          title="Refund & Cancellation Policy"
          description="Terms for cancelling a registration or requesting a refund for Academy programmes and events."
        />
        <div className="border-t border-rule-paper pt-12 max-w-[760px] flex flex-col gap-8 text-[15px] text-muted-paper leading-relaxed">
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">Status</h2>
            <p>
              No programme currently accepts paid registration, so no refund transactions have occurred under this
              policy yet. The clauses below are placeholders to be finalised before payment processing goes live.
            </p>
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">1. Cancellation by Participant</h2>
            <CMSPlaceholder text="Define refund percentages by notice period (e.g. full refund 14+ days before, 50% within 7 days, no refund within 48 hours)." />
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">2. Cancellation by the Academy</h2>
            <CMSPlaceholder text="Define what happens if the Academy postpones or cancels an event — full refund, credit toward a future cohort, or rescheduling." />
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">3. Refund Processing Time</h2>
            <CMSPlaceholder text="State how many business days a refund takes once approved, and the method (original payment channel, bank transfer, etc.)." />
          </section>
          <p className="text-[12px] text-muted-paper font-mono">Last updated: not yet published.</p>
        </div>
      </div>
    </div>
  );
}
