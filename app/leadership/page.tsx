import React from "react";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import { LEADERSHIP_TEAM } from "@/lib/site";

export const metadata = {
  title: "Leadership & Faculty | Masters Leadership Academy",
  description: "Meet the executive leadership and senior advisory faculty of Masters Leadership Academy.",
};

export default function LeadershipPage() {
  return (
    <div className="bg-white py-16 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <PageHero
          eyebrow="Faculty & Leadership"
          title="Executive Leadership & Advisory Council"
          description="Masters Leadership Academy is directed by experienced industry practitioners, engineers, and management consultants with decades of proven corporate and public governance leadership."
        />

        {/* Chairman Featured Profile */}
        <div className="border-t border-slate-200 pt-12 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8 items-start bg-[#F8FAFC] border border-slate-200 p-8 sm:p-10 rounded-2xl shadow-xs">
            <div className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-xl overflow-hidden border border-slate-200 bg-white shrink-0 relative shadow-sm mx-auto md:mx-0">
              <Image
                src="/chairman.jpg"
                alt="Dr. Orovwiroro O. Godwin, Founder & Chairman"
                fill
                sizes="240px"
                className="object-cover"
                priority
              />
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">
                Founder &amp; Chairman
              </span>
              <div className="flex flex-wrap items-baseline gap-2.5 mb-2">
                <h2 className="font-serif text-2xl sm:text-3xl text-slate-950 font-bold">
                  {LEADERSHIP_TEAM[0].name}
                </h2>
                <span className="font-mono text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {LEADERSHIP_TEAM[0].credentials}
                </span>
              </div>
              <div className="text-xs font-mono text-slate-500 mb-4">
                {LEADERSHIP_TEAM[0].organization}
              </div>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
                {LEADERSHIP_TEAM[0].bio}
              </p>
              <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-200">
                {LEADERSHIP_TEAM[0].expertise.map((exp) => (
                  <span
                    key={exp}
                    className="text-xs font-mono font-medium text-slate-700 bg-white px-3 py-1 rounded-md border border-slate-200"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Executive Directors & Faculty Grid */}
        <div className="border-t border-slate-200 pt-12">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs font-bold text-emerald-800 uppercase tracking-widest block mb-2">
              Advisory Directors &amp; Senior Facilitators
            </span>
            <h3 className="font-serif text-2xl font-bold text-slate-950">
              Technical &amp; Commercial Leadership
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {LEADERSHIP_TEAM.slice(1).map((member) => (
              <div
                key={member.name}
                className="bg-white border border-slate-200 p-6 sm:p-7 rounded-2xl shadow-xs hover:shadow-md hover:border-emerald-600/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-full h-64 sm:h-72 rounded-xl overflow-hidden relative border border-slate-200 bg-slate-100 mb-5">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-800 font-serif font-bold text-3xl">
                        {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2 mb-1">
                    <h4 className="font-serif text-lg font-bold text-slate-950">
                      {member.name}
                    </h4>
                  </div>
                  <span className="inline-block text-[11px] font-mono font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60 mb-2">
                    {member.credentials}
                  </span>
                  <div className="text-xs font-semibold text-slate-800 mb-1">
                    {member.role}
                  </div>
                  <div className="text-[11px] font-mono text-slate-400 mb-4">
                    {member.organization}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {member.bio}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {member.expertise.map((exp) => (
                    <span
                      key={exp}
                      className="text-[10px] font-mono text-slate-600 bg-slate-50 px-2 py-0.5 rounded border border-slate-200/80"
                    >
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
