"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";

const faqs = [
  {
    q: "Is Masters Leadership Academy a legally registered entity?",
    a: "Yes. Masters Leadership Academy is registered as a Business Name (BN 2357164, CRBN 635769) with the Corporate Affairs Commission of Nigeria, pursuant to Section 659 of the Companies and Allied Matters Act 1990. See the About page for the full registration record.",
  },
  {
    q: "What services does the Academy provide?",
    a: "Our certificate of registration authorises three service lines: Seminars & Symposiums, Conferences, and Technical Services. See the Services page for details.",
  },
  {
    q: "Where is the Academy located?",
    a: "Our registered head office is at Plot 4Y2K Crescent, off Tony Okocha Road, New Rumuigbo, Port Harcourt, Rivers State, Nigeria.",
  },
  {
    q: "How do I register for a programme?",
    a: "Programme registration opens once a programme is published to the catalogue with confirmed dates and fees. Visit the Programmes page or use Participant Registration to be notified.",
  },
  {
    q: "How do I verify a certificate issued by the Academy?",
    a: "Use the Certificate Verification page and enter the certificate number printed on your certificate. Verification against issued records will be available once the Academy's certificate issuance system is live.",
  },
  {
    q: "Does the Academy offer corporate or in-house training?",
    a: "Yes, tailored corporate training and technical services can be requested via the Corporate Training page.",
  },
  {
    q: "How can my organisation become a client, partner or sponsor?",
    a: "See the Partnerships page for partner categories and sponsorship packages, or the Clients & Partners page for current organisations we work with.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Help Centre"
          title="Frequently Asked Questions"
          description="Answers grounded in our verified registration record. Anything not covered here can be sent directly to our team."
        />

        <div className="border-t border-rule-paper pt-12 max-w-[820px]">
          <div className="flex flex-col">
            {faqs.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.q} className="border-b border-rule-paper/50">
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left cursor-pointer"
                  >
                    <span className="font-serif text-[17px] text-ink-text">{item.q}</span>
                    <span className="font-mono text-copper text-lg shrink-0">{isOpen ? "−" : "+"}</span>
                  </button>
                  {isOpen && (
                    <p className="text-[14px] text-muted-paper leading-relaxed pb-6 max-w-[68ch]">{item.a}</p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-paper-2 border border-rule-paper/50 p-8 rounded-[2px] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-[19px] text-ink-text mb-1">Still have a question?</h3>
              <p className="text-[14px] text-muted-paper">Our team responds to every enquiry sent through the contact form.</p>
            </div>
            <Link href="/contact" className="btn btn-copper whitespace-nowrap">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
