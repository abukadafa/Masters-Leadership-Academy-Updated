import React from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import CmsGridSlot from "@/components/CmsGridSlot";

export const metadata = {
  title: "Testimonials & Case Studies",
  description: "What participants and partners say about Masters Leadership Academy.",
};

export default function TestimonialsPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Proof of Work"
          title="Testimonials & Case Studies"
          description="Real outcomes from real engagements — challenge, solution, programme delivered, and result. Published here as client organisations confirm their stories."
        />

        <div className="border-t border-rule-paper pt-12 flex flex-col gap-16">
          <div>
            <h2 className="text-[22px] font-serif text-ink-text mb-6">Case Studies</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {["Case Study Slot", "Case Study Slot"].map((label, i) => (
                <div key={i} className="bg-paper-2 border border-rule-paper/40 p-6 rounded-[2px] flex flex-col gap-3">
                  <span className="font-mono text-[10px] text-copper uppercase tracking-wider">
                    [CMS Placeholder]
                  </span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[13px] text-muted-paper">
                    <span className="font-mono uppercase text-[11px] text-slate">Client</span>
                    <span className="font-mono uppercase text-[11px] text-slate">Programme Delivered</span>
                    <span>Not yet supplied</span>
                    <span>Not yet supplied</span>
                    <span className="font-mono uppercase text-[11px] text-slate">Challenge</span>
                    <span className="font-mono uppercase text-[11px] text-slate">Outcome</span>
                    <span>Not yet supplied</span>
                    <span>Not yet supplied</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[22px] font-serif text-ink-text mb-6">Testimonials</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <CmsGridSlot label="No testimonial quote supplied yet." />
              <CmsGridSlot label="No testimonial quote supplied yet." />
              <CmsGridSlot label="No testimonial quote supplied yet." />
            </div>
          </div>

          <div className="bg-ink text-cream-text p-10 rounded-[3px] flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-[22px] mb-2">Delivered a programme with us?</h3>
              <p className="text-[14px] text-[#B9C6C2] max-w-[48ch]">
                We&apos;d welcome your feedback and outcome data for a future case study.
              </p>
            </div>
            <Link href="/contact" className="btn btn-outline-dark whitespace-nowrap">
              Share Your Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
