"use client";

import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import Honeypot from "@/components/Honeypot";

export default function CorporateTrainingPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    company: "",
    contactName: "",
    email: "",
    phone: "",
    teamSize: "",
    focusAreas: "",
    timeline: "",
    details: "",
  });
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/corporate-training", {
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
      setForm({
        company: "",
        contactName: "",
        email: "",
        phone: "",
        teamSize: "",
        focusAreas: "",
        timeline: "",
        details: "",
      });
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="For Organisations"
          title="Corporate Training & Technical Services"
          description="Request a tailored proposal for in-house leadership training, seminars, or technical advisory services delivered under our registered Technical Services line."
        />

        <div className="border-t border-rule-paper pt-12 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12">
          <div className="bg-paper-2 border border-rule-paper/60 p-8 rounded-[3px]">
            <h2 className="text-[22px] font-serif text-ink-text mb-6">Request a Proposal</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Honeypot value={website} onChange={setWebsite} />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate mb-2">Company Name</label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate mb-2">Contact Name</label>
                  <input
                    type="text"
                    required
                    value={form.contactName}
                    onChange={(e) => setForm({ ...form, contactName: e.target.value })}
                    className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
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
                  <label className="block text-xs font-mono uppercase text-slate mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-slate mb-2">Team Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 20-50 staff"
                    value={form.teamSize}
                    onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                    className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono uppercase text-slate mb-2">Preferred Timeline</label>
                  <input
                    type="text"
                    placeholder="e.g. Q1 2027"
                    value={form.timeline}
                    onChange={(e) => setForm({ ...form, timeline: e.target.value })}
                    className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate mb-2">Focus Areas</label>
                <input
                  type="text"
                  placeholder="e.g. Governance, Change Management, Technical Advisory"
                  value={form.focusAreas}
                  onChange={(e) => setForm({ ...form, focusAreas: e.target.value })}
                  className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate mb-2">Project Details</label>
                <textarea
                  required
                  rows={5}
                  value={form.details}
                  onChange={(e) => setForm({ ...form, details: e.target.value })}
                  className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper resize-none"
                />
              </div>
              <button type="submit" disabled={loading} className="btn btn-copper w-full justify-center cursor-pointer disabled:opacity-60">
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
              {error && <div className="text-[13px] text-[#B23A3A] mt-1 text-center">{error}</div>}
              {submitted && (
                <div className="text-[13px] font-semibold text-ink-text mt-2 p-3 bg-copper/10 border border-copper/30 text-center">
                  Thank you. Your proposal request has been recorded — our team will follow up.
                </div>
              )}
            </form>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-ink text-cream-text p-8 rounded-[3px]">
              <h3 className="font-serif text-[19px] mb-3">What&apos;s Included</h3>
              <ul className="text-[14px] text-[#B9C6C2] leading-relaxed flex flex-col gap-2 list-disc pl-5">
                <li>Needs assessment and scoping call</li>
                <li>Custom curriculum aligned to your organisation</li>
                <li>Facilitator matching from our faculty</li>
                <li>On-site or virtual delivery</li>
                <li>Post-programme evaluation report</li>
              </ul>
            </div>
            <p className="text-[13px] text-muted-paper leading-relaxed">
              This is our registered Technical Services line — proposals are reviewed and a follow-up call is
              scheduled directly with your organisation. No pricing is published here; every engagement is scoped
              individually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
