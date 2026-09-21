import React from "react";
import Link from "next/link";

export const metadata = {
  title: "Clients & Partners",
  description: "The organisations Masters Leadership Academy has worked with and partnered alongside.",
};

export default function ClientsPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[800px] mb-12">
          <span className="eyebrow text-slate mb-4">Engagements</span>
          <h1 className="text-[36px] md:text-[48px] font-serif leading-tight text-ink-text mb-6">
            Clients, Partners & Affiliations
          </h1>
          <p className="text-[18px] text-muted-paper leading-relaxed">
            Masters Leadership Academy is committed to serving corporate entities, public offices, academic
            institutions and civic organisations across Nigeria.
          </p>
        </div>

        <div className="border-t border-rule-paper pt-12 flex flex-col gap-16">
          <div>
            <h2 className="text-[20px] font-serif text-ink-text mb-4">Client Organisations</h2>
            <p className="text-muted-paper text-sm mb-8 max-w-[64ch] leading-relaxed">
              No client list was supplied with the official registration records. Verified client logos and case
              studies will be displayed here as engagements are confirmed.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[1px] bg-rule-paper border border-rule-paper">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-paper-2 h-[100px] flex items-center justify-center font-mono text-[11px] text-muted-paper text-center p-4"
                >
                  Client Logo Slot
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] font-serif text-ink-text mb-4">Affiliations & Professional Bodies</h2>
            <p className="text-muted-paper text-sm mb-8 max-w-[64ch] leading-relaxed">
              Memberships and accreditations with professional and regulatory bodies will be listed here once
              confirmed.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[1px] bg-rule-paper border border-rule-paper">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-paper-2 h-[100px] flex items-center justify-center font-mono text-[11px] text-muted-paper text-center p-4"
                >
                  Affiliation Logo Slot
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[20px] font-serif text-ink-text mb-4">Sponsors</h2>
            <p className="text-muted-paper text-sm mb-8 max-w-[64ch] leading-relaxed">
              Event and conference sponsors will be recognised here by tier once a sponsorship agreement is
              confirmed. See Partnerships for current sponsorship packages.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-[1px] bg-rule-paper border border-rule-paper">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-paper-2 h-[100px] flex items-center justify-center font-mono text-[11px] text-muted-paper text-center p-4"
                >
                  Sponsor Logo Slot
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact" className="btn btn-copper">
              Become a Client Organisation
            </Link>
            <Link href="/partnerships" className="btn btn-outline-ink">
              Explore Partnerships & Sponsorship
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
