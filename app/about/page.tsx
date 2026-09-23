import React from "react";
import Image from "next/image";
import LedgerCard from "@/components/LedgerCard";
import { CORE_PHILOSOPHY, ORG_FACTS, LEADERSHIP_TEAM } from "@/lib/site";

export const metadata = {
  title: "About Us | Masters Leadership Academy",
  description:
    "About Masters Leadership Academy — Vision, Mission, Core Values, CAC Registration facts, and Corporate profile in Abuja and Port Harcourt, Nigeria.",
};

export default function AboutPage() {
  return (
    <div className="bg-white py-16 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        {/* Page Header */}
        <div className="max-w-[840px] mb-12">
          <span className="eyebrow text-emerald-700 mb-3">Corporate Profile</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-950 leading-tight mb-5">
            A Legally Registered Leadership &amp; Advisory Institution
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Masters Leadership Academy is established under the laws of the Federal Republic of Nigeria. We equip leaders and institutions with strategic insight, executive decision frameworks, and practical tools for lasting generational impact.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-12 items-start border-t border-slate-200 pt-12">
          {/* Left Column: Narrative, Vision, Mission, Values */}
          <div className="flex flex-col gap-10">
            {/* Corporate Status */}
            <div className="bg-[#F8FAFC] p-8 rounded-2xl border border-slate-200">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-3">
                Corporate Status &amp; Registration
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4 text-sm sm:text-base">
                Masters Leadership Academy is formally registered as a Business Name under the{" "}
                <strong className="text-slate-900 font-semibold">Companies and Allied Matters Act 1990, pursuant to Section 659</strong>.
                The registration was initialised on the{" "}
                <strong className="text-slate-900 font-semibold">18th day of August, 2015</strong>, and formalised with
                certificate issuance on the{" "}
                <strong className="text-slate-900 font-semibold">5th day of July, 2017</strong> by{" "}
                <strong className="text-slate-900 font-semibold">Bello Mahmud</strong>, Registrar of Business Names for the Corporate Affairs Commission (CAC).
              </p>
              
              <div className="pt-4 border-t border-slate-200/80 space-y-2 text-sm text-slate-700">
                <div>
                  <span className="font-semibold text-slate-900">Abuja Corporate Office:</span>{" "}
                  36 Moses Majekodunmi Street, Utako, Abuja, FCT, Nigeria
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Direct Contact:</span>{" "}
                  +234 811 464 6340 · mastersleadershipacademy@gmail.com
                </div>
                <div>
                  <span className="font-semibold text-slate-900">Historic Registered Address:</span>{" "}
                  Plot 4Y2K Crescent, off Tony Okocha Road, New Rumuigbo, Port Harcourt, Rivers State
                </div>
              </div>
            </div>

            {/* Vision & Mission Statements */}
            <div className="border-t border-slate-200 pt-8 space-y-6">
              <h2 className="text-2xl font-serif font-bold text-slate-900">
                Vision &amp; Mission
              </h2>

              {/* Vision Card */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 p-6 sm:p-8 rounded-xl relative overflow-hidden">
                <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">
                  Our Vision
                </span>
                <p className="font-serif text-xl sm:text-2xl font-bold text-slate-950 leading-snug">
                  &ldquo;{CORE_PHILOSOPHY.vision}&rdquo;
                </p>
              </div>

              {/* Mission Card */}
              <div className="bg-amber-50/60 border border-amber-200/80 p-6 sm:p-8 rounded-xl relative overflow-hidden">
                <span className="font-mono text-xs font-bold text-amber-800 uppercase tracking-widest block mb-2">
                  Our Mission
                </span>
                <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-serif">
                  {CORE_PHILOSOPHY.mission}
                </p>
              </div>
            </div>

            {/* Core Values */}
            <div className="border-t border-slate-200 pt-8">
              <h2 className="text-2xl font-serif font-bold text-slate-900 mb-2">
                Our Core Values
              </h2>
              <p className="text-slate-600 text-sm mb-6">
                Four foundational values dictate how we design curricula, deliver strategic advisory, and measure organisational transformation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CORE_PHILOSOPHY.coreValues.map((val) => (
                  <div
                    key={val.title}
                    className="bg-white border border-slate-200 p-5 rounded-xl shadow-2xs hover:border-emerald-500 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs mb-3 font-mono">
                      {val.title.charAt(0)}
                    </div>
                    <h3 className="font-serif text-lg font-bold text-slate-900 mb-1">
                      {val.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {val.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            {/* Leadership & Faculty Team (From Winman Limited) */}
            <div className="border-t border-slate-200 pt-10">
              <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">
                Executive Leadership &amp; Advisory Council
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-950 mb-3">
                Meet Our Leadership Team
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Our programmes and advisory engagements are directed by seasoned corporate executives, registered engineers, and business school lecturers with decades of cross-industry leadership across energy, utilities, manufacturing, and public governance.
              </p>

              <div className="grid grid-cols-1 gap-8">
                {LEADERSHIP_TEAM.map((member) => (
                  <div
                    key={member.name}
                    className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-xs hover:shadow-md hover:border-emerald-600/60 transition-all duration-300 flex flex-col md:flex-row gap-6 items-start"
                  >
                    {/* Portrait Photo */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl overflow-hidden relative shrink-0 border border-slate-200 shadow-xs bg-slate-100">
                      {member.image ? (
                        <Image
                          src={member.image}
                          alt={member.name}
                          fill
                          sizes="(max-width: 768px) 112px, 128px"
                          className="object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-800 font-serif font-bold text-2xl">
                          {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                        </div>
                      )}
                    </div>

                    <div className="flex-1 w-full">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-4">
                        <div>
                          <div className="flex flex-wrap items-baseline gap-2">
                            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-950">
                              {member.name}
                            </h3>
                            <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                              {member.credentials}
                            </span>
                          </div>
                          <div className="text-sm font-semibold text-slate-800 mt-1">
                            {member.role}
                          </div>
                        </div>
                        <div className="text-xs font-mono text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/60 self-start sm:self-auto">
                          {member.organization}
                        </div>
                      </div>

                      <p className="text-sm text-slate-600 leading-relaxed mb-5">
                        {member.bio}
                      </p>

                      <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
                        <span className="text-xs font-mono text-slate-400 font-medium self-center mr-1">
                          Core Competencies:
                        </span>
                        {member.expertise.map((exp) => (
                          <span
                            key={exp}
                            className="text-[11px] font-mono font-medium text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200/80"
                          >
                            {exp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Ledger Card */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-6">
            <h3 className="text-xl font-serif font-bold text-slate-900">Official CAC Records</h3>
            <LedgerCard />
          </div>
        </div>
      </div>
    </div>
  );
}
