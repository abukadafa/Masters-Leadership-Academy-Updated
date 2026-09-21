"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import EmptyState from "@/components/EmptyState";
import SectionTabs from "@/components/SectionTabs";
import Honeypot from "@/components/Honeypot";

function VacanciesTab() {
  return (
    <EmptyState
      title="No current vacancies"
      description="Open roles at Masters Leadership Academy will be listed here as they become available. Check back or submit a general CV below."
    />
  );
}

function FacultyTab() {
  return (
    <EmptyState
      title="No faculty opportunities open"
      description="Faculty positions supporting our Seminars & Symposiums and Conferences service lines will be posted here when available."
    />
  );
}

function FacilitatorForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    expertise: "",
    yearsExperience: "",
    linkedin: "",
    availability: "",
  });
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/careers/facilitator", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, website }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      setForm({ name: "", email: "", expertise: "", yearsExperience: "", linkedin: "", availability: "" });
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-paper-2 border border-rule-paper/60 p-8 rounded-[3px] max-w-[640px]">
      <h3 className="font-serif text-[20px] text-ink-text mb-2">Become an Academy Facilitator</h3>
      <p className="text-[13px] text-muted-paper mb-6 leading-relaxed">
        Submit your details below. Our team reviews facilitator applications against our current programme needs.
        (Submissions are handled locally in this preview — connect this form to the enquiry system before launch.)
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Honeypot value={website} onChange={setWebsite} />
        <div>
          <label className="block text-xs font-mono uppercase text-slate mb-2">Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase text-slate mb-2">Email Address</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase text-slate mb-2">Area of Expertise</label>
          <input
            type="text"
            required
            placeholder="e.g. Corporate Governance, Public Sector Leadership"
            value={form.expertise}
            onChange={(e) => setForm({ ...form, expertise: e.target.value })}
            className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-2">Years of Experience</label>
            <input
              type="text"
              value={form.yearsExperience}
              onChange={(e) => setForm({ ...form, yearsExperience: e.target.value })}
              className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
            />
          </div>
          <div>
            <label className="block text-xs font-mono uppercase text-slate mb-2">Availability</label>
            <input
              type="text"
              placeholder="e.g. Weekends, Full-time"
              value={form.availability}
              onChange={(e) => setForm({ ...form, availability: e.target.value })}
              className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-mono uppercase text-slate mb-2">LinkedIn Profile</label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/..."
            value={form.linkedin}
            onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
            className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
          />
        </div>
        <div>
          <label className="block text-xs font-mono uppercase text-slate mb-2">
            CV / Qualifications / Publications / Certifications
          </label>
          <div className="border border-dashed border-rule-paper p-4 text-center text-[12px] text-muted-paper">
            File upload requires a storage backend — wire this to the Downloads/Resources system before launch.
          </div>
        </div>
        <button type="submit" disabled={loading} className="btn btn-copper w-full justify-center cursor-pointer disabled:opacity-60">
          {loading ? "Submitting..." : "Submit Application"}
        </button>
        {error && <div className="text-[13px] text-[#B23A3A] mt-1 text-center">{error}</div>}
        {submitted && (
          <div className="text-[13px] font-semibold text-ink-text mt-2 p-3 bg-copper/10 border border-copper/30 text-center">
            Thank you — your facilitator application has been recorded.
          </div>
        )}
      </form>
    </div>
  );
}

export default function CareersPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Join Us"
          title="Careers at Masters Leadership Academy"
          description="Vacancies, facilitator opportunities, internships and volunteering with the Academy."
        />

        <div className="border-t border-rule-paper pt-12 flex flex-col gap-16">
          <SectionTabs
            tabs={[
              { id: "vacancies", label: "Current Vacancies", content: <VacanciesTab /> },
              { id: "faculty", label: "Faculty Opportunities", content: <FacultyTab /> },
              {
                id: "internship",
                label: "Internships",
                content: (
                  <EmptyState
                    title="No internship openings yet"
                    description="Structured internship placements will be listed here once the programme is established."
                  />
                ),
              },
              {
                id: "volunteer",
                label: "Volunteering",
                content: (
                  <EmptyState
                    title="No volunteer roles yet"
                    description="Opportunities to support Academy events and outreach as a volunteer will appear here."
                  />
                ),
              },
            ]}
          />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 border-t border-rule-paper pt-12">
            <FacilitatorForm />

            <div className="flex flex-col gap-6">
              <div className="bg-ink text-cream-text p-8 rounded-[3px]">
                <h3 className="font-serif text-[19px] mb-2">Submit a General CV</h3>
                <p className="text-[14px] text-[#B9C6C2] mb-5 leading-relaxed">
                  Not applying to a specific role? Send your CV and we&apos;ll keep it on file for future openings.
                </p>
                <Link href="/contact" className="btn btn-outline-dark">
                  Send CV via Contact Form
                </Link>
              </div>
              <p className="text-[13px] text-muted-paper leading-relaxed">
                General applications are routed through our contact channel until a dedicated applicant tracking
                system is connected.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
