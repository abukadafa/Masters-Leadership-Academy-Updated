import React from "react";
import CMSPlaceholder from "@/components/CMSPlaceholder";
import LedgerCard from "@/components/LedgerCard";

export const metadata = {
  title: "About Us",
  description:
    "About Masters Leadership Academy, a registered business organising seminars, symposiums, conferences and technical services from Port Harcourt, Rivers State, Nigeria.",
};

export default function AboutPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[800px] mb-12">
          <span className="eyebrow text-slate mb-4">About the Academy</span>
          <h1 className="text-[36px] md:text-[48px] font-serif leading-tight text-ink-text mb-6">
            A legally registered training institution in Nigeria
          </h1>
          <p className="text-[18px] text-muted-paper leading-relaxed">
            Masters Leadership Academy is established under the laws of the Federal Republic of Nigeria. This page lists our official corporate profile and verifiable registration records.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-start border-t border-rule-paper pt-12">
          {/* Left Column: Narrative and Placeholders */}
          <div className="flex flex-col gap-10">
            <div>
              <h2 className="text-[24px] font-serif text-ink-text mb-4">Corporate Status</h2>
              <p className="text-muted-paper leading-relaxed mb-4 text-[16px]">
                Masters Leadership Academy is formally registered as a Business Name under the{" "}
                <strong className="text-ink-text font-semibold">Companies and Allied Matters Act 1990, pursuant to Section 659</strong>.
                The registration was initialised on the{" "}
                <strong className="text-ink-text font-semibold">18th day of August, 2015</strong>, and formalised with
                certificate issuance on the{" "}
                <strong className="text-ink-text font-semibold">5th day of July, 2017</strong> by{" "}
                <strong className="text-ink-text font-semibold">Bello Mahmud</strong>, the Registrar of Business Names
                for the Corporate Affairs Commission (CAC).
              </p>
              <p className="text-muted-paper leading-relaxed text-[16px]">
                Our registered head office and principal place of business is located at{" "}
                <strong className="text-ink-text font-semibold">
                  Plot 4Y2K Crescent, off Tony Okocha Road, New Rumuigbo, Port Harcourt, Rivers State, Nigeria
                </strong>.
              </p>
            </div>

            <div className="border-t border-rule-paper/50 pt-8">
              <h2 className="text-[24px] font-serif text-ink-text mb-4">Our Mission & Vision</h2>
              <CMSPlaceholder text="Add the Academy's mission statement, vision statement, and primary values here." />
            </div>

            <div className="border-t border-rule-paper/50 pt-8">
              <h2 className="text-[24px] font-serif text-ink-text mb-2">Our Team & Facilitators</h2>
              <p className="text-muted-paper text-[14px] mb-6">
                No leadership profile or director names are declared on the registration certificate. The placeholders below are ready for authentic biography data.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-paper-2 border border-rule-paper/40 p-5 rounded-[2px]">
                  <div className="text-[11px] text-slate tracking-[0.1em] uppercase mb-2">[Role]</div>
                  <div className="font-serif text-[16px] text-ink-text font-semibold mb-1">[CMS Placeholder]</div>
                  <div className="text-[12px] text-muted-paper leading-relaxed">Add biography, credentials, and track record.</div>
                </div>
                <div className="bg-paper-2 border border-rule-paper/40 p-5 rounded-[2px]">
                  <div className="text-[11px] text-slate tracking-[0.1em] uppercase mb-2">[Role]</div>
                  <div className="font-serif text-[16px] text-ink-text font-semibold mb-1">[CMS Placeholder]</div>
                  <div className="text-[12px] text-muted-paper leading-relaxed">Add biography, credentials, and track record.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Ledger Card */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            <h3 className="text-[20px] font-serif text-ink-text">Official CAC Records</h3>
            <LedgerCard />
          </div>
        </div>
      </div>
    </div>
  );
}
