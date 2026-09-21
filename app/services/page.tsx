import React from "react";
import CMSPlaceholder from "@/components/CMSPlaceholder";

export const metadata = {
  title: "Services",
  description:
    "Seminars & symposiums, conferences, and technical services from Masters Leadership Academy, Port Harcourt, Nigeria.",
};

export default function ServicesPage() {
  const serviceLines = [
    {
      num: "01",
      title: "Seminars & Symposiums",
      desc: "Comprehensive leadership training symposiums and thematic seminars designed for public sector executives, corporate leadership teams, and community directors.",
      placeholder: "Describe the specific formats, session durations, typical audiences, and core topics (e.g. governance, organizational development) covered under your Seminars & Symposiums.",
    },
    {
      num: "02",
      title: "Conferences",
      desc: "Full-scale professional leadership conference planning, facilitation, and hosting, uniting industry leaders to exchange strategic perspectives.",
      placeholder: "Describe conference curation capabilities, annual themes, event scales, venue capacities, and past/future flagship conference series.",
    },
    {
      num: "03",
      title: "Technical Services",
      desc: "Strategic technical support, curriculum drafting, research initiatives, and advisory services for institutional capacity building.",
      placeholder: "Describe the specific advisory, research, curriculum design, technology integration, or custom coaching programs delivered as part of your Technical Services.",
    },
  ];

  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[800px] mb-12">
          <span className="eyebrow text-slate mb-4">Our Service Lines</span>
          <h1 className="text-[36px] md:text-[48px] font-serif leading-tight text-ink-text mb-6">
            Registered business capacity and training solutions
          </h1>
          <p className="text-[18px] text-muted-paper leading-relaxed">
            Masters Leadership Academy is legally registered to operate in three core service sectors in Nigeria. Learn about our authorized focus areas below.
          </p>
        </div>

        <div className="flex flex-col gap-12 border-t border-rule-paper pt-12">
          {serviceLines.map((svc) => (
            <div key={svc.num} className="grid grid-cols-1 lg:grid-cols-[0.3fr_1fr_1.7fr] gap-8 pb-12 border-b border-rule-paper/40 last:border-none">
              {/* Number */}
              <div className="font-mono text-[24px] text-copper font-medium">
                {svc.num}
              </div>

              {/* Title & Static description */}
              <div>
                <h2 className="text-[24px] font-serif text-ink-text mb-3">{svc.title}</h2>
                <p className="text-[15px] text-muted-paper leading-relaxed mb-4">
                  {svc.desc}
                </p>
                <span className="inline-flex items-center text-[11px] font-mono text-copper uppercase tracking-[0.06em] bg-paper-2 border border-rule-paper px-2 py-1">
                  Verified Service Line
                </span>
              </div>

              {/* Editable detail placeholder */}
              <div className="bg-paper-2/50 border border-rule-paper/30 p-6 rounded-[2px]">
                <span className="text-[11px] font-mono text-slate uppercase tracking-[0.1em] block mb-3">
                  Service Descriptions & Details
                </span>
                <CMSPlaceholder text={svc.placeholder} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
