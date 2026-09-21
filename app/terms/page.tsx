import React from "react";
import PageHero from "@/components/PageHero";
import CMSPlaceholder from "@/components/CMSPlaceholder";

export const metadata = {
  title: "Terms of Use",
  description: "Terms of use for the Masters Leadership Academy website and services.",
  robots: { index: false, follow: true },
};

export default function TermsPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Legal"
          title="Terms of Use"
          description="The terms governing use of this website and engagement with Masters Leadership Academy's services."
        />
        <div className="border-t border-rule-paper pt-12 max-w-[760px] flex flex-col gap-8 text-[15px] text-muted-paper leading-relaxed">
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing this website you agree to these Terms of Use. This website is operated by Masters
              Leadership Academy, a Business Name registered under the Companies and Allied Matters Act 1990
              (BN 2357164, CRBN 635769).
            </p>
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">2. Services</h2>
            <p>
              The Academy provides Seminars &amp; Symposiums, Conferences, and Technical Services as described on
              the Services page. Specific programme terms, fees and cancellation conditions will be published
              alongside each programme once confirmed.
            </p>
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">3. Registration &amp; Payment</h2>
            <CMSPlaceholder text="Define registration terms, payment methods, deposit requirements, and confirmation process once the registration system is live." />
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">4. Intellectual Property</h2>
            <p>
              All content on this website, including text, graphics, logos and course materials, is the property
              of Masters Leadership Academy unless otherwise stated, and may not be reproduced without permission.
            </p>
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">5. Limitation of Liability</h2>
            <CMSPlaceholder text="Add a liability clause reviewed by qualified legal counsel before publishing." />
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">6. Governing Law</h2>
            <p>These terms are governed by the laws of the Federal Republic of Nigeria.</p>
          </section>
          <p className="text-[12px] text-muted-paper font-mono">Last updated: not yet published.</p>
        </div>
      </div>
    </div>
  );
}
