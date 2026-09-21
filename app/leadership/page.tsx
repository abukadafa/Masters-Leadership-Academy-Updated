import React from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";

const roles = [
  "Executive Director",
  "Head of Programmes",
  "Lead Facilitator, Seminars & Symposiums",
  "Lead Facilitator, Conferences",
  "Technical Services Advisor",
  "Facilitator",
];

export const metadata = {
  title: "Leadership & Faculty",
  description: "Meet the leadership and facilitators of Masters Leadership Academy.",
};

export default function LeadershipPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="People"
          title="Leadership & Faculty"
          description="The registration certificate does not declare director or facilitator names. This directory is ready for authentic profiles as they are supplied."
        />

        <div className="border-t border-rule-paper pt-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 items-start bg-paper-2 border border-rule-paper/60 p-8 rounded-[3px]">
            <div className="w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-[4px] overflow-hidden border border-rule-paper bg-paper shrink-0 relative">
              <Image
                src="/chairman.jpg"
                alt="Dr. Orovwiroro Orakpowenri Godwin, Chairman & Founder, Masters Leadership Academy"
                fill
                sizes="220px"
                className="object-cover"
              />
            </div>
            <div>
              <div className="text-[11px] text-slate tracking-[0.1em] uppercase mb-2">Chairman &amp; Founder</div>
              <div className="font-serif text-[24px] text-ink-text font-semibold mb-3">Dr. Orovwiroro Orakpowenri Godwin</div>
              <p className="text-[14px] text-muted-paper leading-relaxed max-w-[64ch]">
                Dr. Orovwiroro Orakpowenri Godwin founded Masters Leadership Academy in 2015 with a mandate to develop leaders
                across the public and private sectors through practical, rigorous seminars, conferences and
                technical services. [CMS Placeholder — add full biography, credentials and track record.]
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-rule-paper pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {roles.map((role) => (
              <div key={role} className="bg-paper-2 border border-rule-paper/40 p-6 rounded-[2px]">
                <div className="w-14 h-14 rounded-full bg-rule-paper/50 border border-dashed border-rule-paper mb-4" />
                <div className="text-[11px] text-slate tracking-[0.1em] uppercase mb-2">{role}</div>
                <div className="font-serif text-[17px] text-ink-text font-semibold mb-1">[CMS Placeholder]</div>
                <div className="text-[12px] text-muted-paper leading-relaxed">
                  Add name, photograph, biography, credentials and track record.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
