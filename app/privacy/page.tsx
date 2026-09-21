import React from "react";
import PageHero from "@/components/PageHero";
import CMSPlaceholder from "@/components/CMSPlaceholder";

export const metadata = {
  title: "Privacy Policy",
  description: "How Masters Leadership Academy collects, uses, and protects personal data.",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Legal"
          title="Privacy Policy"
          description="How Masters Leadership Academy collects, uses and protects personal data submitted through this website."
        />
        <div className="border-t border-rule-paper pt-12 max-w-[760px] flex flex-col gap-8 text-[15px] text-muted-paper leading-relaxed">
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">1. Data Controller</h2>
            <p>
              Masters Leadership Academy (BN 2357164, CRBN 635769), registered at Plot 4Y2K Crescent, off Tony
              Okocha Road, New Rumuigbo, Port Harcourt, Rivers State, Nigeria, is the data controller for
              information submitted through this website.
            </p>
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">2. Information We Collect</h2>
            <p>
              We collect information you provide directly — through the contact form, enquiry forms, registration
              interest list, facilitator and partnership applications — including name, email address, phone
              number, organisation, and message content.
            </p>
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">3. How We Use Your Information</h2>
            <p>
              We use submitted information to respond to enquiries, process programme registrations, communicate
              about events and programmes you register interest in, and evaluate partnership, sponsorship and
              facilitator applications.
            </p>
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">4. Data Sharing</h2>
            <CMSPlaceholder text="Confirm whether any third-party processors (email service, payment provider, hosting) are used, and name them here." />
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">5. Data Retention</h2>
            <CMSPlaceholder text="Specify how long enquiry, registration and application data is retained." />
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">6. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data held by the Academy by
              contacting us through the Contact page.
            </p>
          </section>
          <section>
            <h2 className="text-[20px] font-serif text-ink-text mb-3">7. Contact</h2>
            <CMSPlaceholder text="Provide a dedicated data protection / privacy contact email." />
          </section>
          <p className="text-[12px] text-muted-paper font-mono">Last updated: not yet published.</p>
        </div>
      </div>
    </div>
  );
}
