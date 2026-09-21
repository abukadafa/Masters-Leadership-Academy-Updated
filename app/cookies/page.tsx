import React from "react";
import PageHero from "@/components/PageHero";
import CMSPlaceholder from "@/components/CMSPlaceholder";

export const metadata = {
  title: "Cookie Policy",
  description: "How Masters Leadership Academy uses cookies on this website.",
  robots: { index: false, follow: true },
};

export default function CookiesPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Legal"
          title="Cookie Policy"
          description="How this website uses cookies and similar technologies."
        />
        <div className="border-t border-rule-paper pt-12 max-w-[760px] flex flex-col gap-8 text-[15px] text-muted-paper leading-relaxed">
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">1. What Are Cookies</h2>
            <p>
              Cookies are small text files stored on your device that help websites function and remember your
              preferences.
            </p>
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">2. Cookies We Use</h2>
            <CMSPlaceholder text="List actual cookies in use once analytics, session, or payment-provider cookies are integrated (currently none are set beyond what Next.js requires)." />
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">3. Managing Cookies</h2>
            <p>
              You can control or delete cookies through your browser settings. Restricting cookies may affect the
              functionality of registration and enquiry forms on this site.
            </p>
          </section>
          <p className="text-[12px] text-muted-paper font-mono">Last updated: not yet published.</p>
        </div>
      </div>
    </div>
  );
}
