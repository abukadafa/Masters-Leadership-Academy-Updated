import React from "react";
import { cookies } from "next/headers";
import EmptyState from "@/components/EmptyState";
import TimezoneSwitcher from "@/components/TimezoneSwitcher";
import { formatEventDateTime, TIMEZONE_COOKIE } from "@/lib/locale";

export const metadata = {
  title: "Events — Monthly Webinars, Corporate Retreats & Schedules",
  description: "Explore monthly webinars, corporate retreats, and upcoming seminars & conferences from Masters Leadership Academy.",
};

export default async function EventsPage() {
  const store = await cookies();
  const timezone = store.get(TIMEZONE_COOKIE)?.value || "Africa/Lagos";

  const exampleIso = "2027-03-15T09:00:00Z";

  return (
    <div className="bg-ink text-cream-text py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[800px] mb-12">
          <span className="eyebrow text-copper-light mb-4">Events & Calendar</span>
          <h1 className="text-[36px] md:text-[48px] font-serif leading-tight text-cream-text mb-6">
            Academy Webinars, Retreats & Conferences
          </h1>
          <p className="text-[18px] text-[#B9C6C2] leading-relaxed">
            Stay informed on our monthly webinars, executive corporate retreats, leadership symposiums, and upcoming training schedules.
          </p>
        </div>

        {/* Quick Jump Navigation */}
        <div className="flex flex-wrap gap-4 mb-10 pb-6 border-b border-rule">
          <a href="#monthly-webinar" className="btn btn-outline-dark text-xs">
            Monthly Webinar
          </a>
          <a href="#corporate-retreat" className="btn btn-outline-dark text-xs">
            Corporate Retreat
          </a>
          <a href="#upcoming-events" className="btn btn-outline-dark text-xs">
            Upcoming Events
          </a>
        </div>

        <div className="border-t border-rule pt-8 flex flex-col gap-14">
          {/* Time Zone Switcher Banner */}
          <div className="bg-ink-2 border border-rule p-6 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] text-copper-light uppercase tracking-wider block mb-1">
                Time Zone
              </span>
              <p className="text-[13px] text-[#B9C6C2] max-w-[54ch] leading-relaxed">
                Event times display in your selected time zone. Example format:{" "}
                <strong className="text-cream-text">{formatEventDateTime(exampleIso, timezone)}</strong>
              </p>
            </div>
            <TimezoneSwitcher current={timezone} />
          </div>

          {/* Section 1: Monthly Webinar */}
          <div id="monthly-webinar" className="scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-rule pb-3 mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-copper-light block mb-1">
                  Virtual Leadership Series
                </span>
                <h2 className="text-[26px] font-serif text-cream-text">Monthly Webinar</h2>
              </div>
              <span className="text-xs text-[#AEC0BB] font-mono mt-2 md:mt-0">Monthly Online Masterclass</span>
            </div>

            <div className="bg-ink-2 border border-rule p-8 rounded-[4px] relative overflow-hidden">
              <div className="max-w-[700px]">
                <div className="inline-block bg-copper/20 text-copper-light font-mono text-[11px] px-3 py-1 rounded-[2px] uppercase tracking-wider mb-4">
                  Interactive Live Session
                </div>
                <h3 className="text-[22px] font-serif text-cream-text mb-3">
                  Monthly Leadership & Strategic Decision Masterclass
                </h3>
                <p className="text-[15px] text-[#B9C6C2] leading-relaxed mb-6">
                  Join our monthly interactive webinar bringing together business executives, managers, and aspiring leaders across Africa. Each session covers real-world decision frameworks, organizational alignment, and strategic risk management.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <a href="/contact" className="btn btn-copper">
                    Register Interest for Next Webinar
                  </a>
                  <span className="text-xs text-[#AEC0BB]">Free & Open to Professionals</span>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Corporate Retreat */}
          <div id="corporate-retreat" className="scroll-mt-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-rule pb-3 mb-6">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-copper-light block mb-1">
                  Executive Immersion
                </span>
                <h2 className="text-[26px] font-serif text-cream-text">Corporate Retreat</h2>
              </div>
              <span className="text-xs text-[#AEC0BB] font-mono mt-2 md:mt-0">Executive & Board Retreats</span>
            </div>

            <div className="bg-ink-2 border border-rule p-8 rounded-[4px] relative overflow-hidden">
              <div className="max-w-[700px]">
                <div className="inline-block bg-copper/20 text-copper-light font-mono text-[11px] px-3 py-1 rounded-[2px] uppercase tracking-wider mb-4">
                  Custom On-Site & Off-Site Programs
                </div>
                <h3 className="text-[22px] font-serif text-cream-text mb-3">
                  Executive Corporate Leadership Retreats
                </h3>
                <p className="text-[15px] text-[#B9C6C2] leading-relaxed mb-6">
                  Tailored high-impact retreat packages designed for corporate executive teams, board members, and senior leadership. Held in serene retreat destinations, focusing on strategic clarity, team alignment, and leadership renewal.
                </p>
                <div className="flex flex-wrap gap-4 items-center">
                  <a href="/contact" className="btn btn-copper">
                    Book a Corporate Retreat
                  </a>
                  <a href="/services" className="btn btn-outline-dark">
                    View Technical Services
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Upcoming Events */}
          <div id="upcoming-events" className="scroll-mt-24">
            <h2 className="text-[26px] font-serif text-cream-text mb-6 border-b border-rule pb-3">Upcoming Events</h2>
            <EmptyState
              title="No upcoming public events scheduled yet"
              description="Upcoming seminars, symposiums and conferences will be published here once dates are confirmed. Online and hybrid delivery options for international participants will be indicated per event."
              theme="dark"
            />
          </div>

          {/* Past Sessions */}
          <div className="mt-4">
            <h2 className="text-[26px] font-serif text-cream-text mb-6 border-b border-rule pb-3">Past Events & Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  id: "ldp-1",
                  title: "Leadership Decision Protocol — Session 1",
                  date: "2018-04-03T09:00:00Z",
                  description: "Inaugural session introducing diagnostic frameworks, root cause analysis, and strategic communication.",
                  url: "https://www.facebook.com/events/1476771059118309/?event_time_id=1476771079118307",
                },
                {
                  id: "ldp-2",
                  title: "Leadership Decision Protocol — Session 2",
                  date: "2018-04-10T09:00:00Z",
                  description: "Deep dive into scenario planning, contingency risk mapping, and decision thresholds.",
                  url: "https://www.facebook.com/events/1476771059118309/?event_time_id=1476771065784975",
                },
                {
                  id: "ldp-3",
                  title: "Leadership Decision Protocol — Session 3",
                  date: "2018-04-17T09:00:00Z",
                  description: "Case study analyses covering organizational communication protocols and strategic escalation paths.",
                  url: "https://www.facebook.com/events/1476771059118309/?event_time_id=1476771072451641",
                },
                {
                  id: "ldp-4",
                  title: "Leadership Decision Protocol — Session 4",
                  date: "2018-04-24T09:00:00Z",
                  description: "Interactive simulation workshop focusing on crisis management and cross-functional team coordination.",
                  url: "https://www.facebook.com/events/1476771059118309/?event_time_id=1476771075784974",
                },
                {
                  id: "ldp-5",
                  title: "Leadership Decision Protocol — Session 5",
                  date: "2018-05-01T09:00:00Z",
                  description: "Evaluation frameworks, executive reporting, and post-decision impact auditing.",
                  url: "https://www.facebook.com/events/1476771059118309/?event_time_id=1476771069118308",
                },
                {
                  id: "ldp-all",
                  title: "Leadership Decision Protocol — Seminar Series",
                  date: "2018-05-08T09:00:00Z",
                  description: "Full event listing and summary resources from the executive training programme.",
                  url: "https://www.facebook.com/events/1476771059118309/",
                }
              ].map((event) => (
                <div key={event.id} className="bg-ink-2 border border-rule p-6 rounded-[2px] flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10px] text-copper-light uppercase tracking-wider block mb-2">
                      {formatEventDateTime(event.date, timezone)}
                    </span>
                    <h3 className="font-serif text-[18px] text-cream-text font-medium leading-tight mb-2">
                      {event.title}
                    </h3>
                    <p className="text-[13px] text-[#AEC0BB] leading-relaxed mb-4">
                      {event.description}
                    </p>
                  </div>
                  <a
                    href={event.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[12px] text-copper hover:underline font-semibold flex items-center gap-1.5 self-start"
                  >
                    View details on Facebook ↗
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center border-t border-rule pt-8">
            <a
              href="https://www.facebook.com/LeadMastersAcademy/events"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-dark inline-flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
              </svg>
              View All Events on Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
