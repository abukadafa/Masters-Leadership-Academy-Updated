"use client";

import React, { useState } from "react";
import PageHero from "@/components/PageHero";
import Honeypot from "@/components/Honeypot";

const partnerCategories = [
  "Corporate Partners",
  "Academic Partners",
  "Government Institutions",
  "NGOs",
  "Professional Bodies",
  "International Organisations",
  "Event Sponsors",
];

const sponsorTiers = [
  { tier: "Platinum", desc: "Top-tier visibility across a flagship conference, speaking opportunity, and premium branding." },
  { tier: "Gold", desc: "Prominent branding, exhibition space, and delegate access at a flagship conference." },
  { tier: "Silver", desc: "Branding and recognition across event materials and the Academy's digital channels." },
  { tier: "Strategic Partner", desc: "A tailored, ongoing partnership aligned to shared programme or research goals." },
];

function ApplicationForm({ kind }: { kind: "partner" | "sponsor" }) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ organisation: "", contactName: "", email: "", category: "", message: "" });
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/partnerships/${kind}`, {
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
      setForm({ organisation: "", contactName: "", email: "", category: "", message: "" });
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <Honeypot value={website} onChange={setWebsite} />
      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-2">Organisation Name</label>
        <input
          type="text"
          required
          value={form.organisation}
          onChange={(e) => setForm({ ...form, organisation: e.target.value })}
          className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
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
      </div>
      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-2">
          {kind === "partner" ? "Partner Category" : "Sponsorship Tier of Interest"}
        </label>
        <input
          type="text"
          placeholder={kind === "partner" ? "e.g. Corporate Partner, NGO" : "e.g. Gold, Silver"}
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
        />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-2">Message</label>
        <textarea
          required
          rows={4}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper resize-none"
        />
      </div>
      <button type="submit" disabled={loading} className="btn btn-copper w-full justify-center cursor-pointer disabled:opacity-60">
        {loading ? "Submitting..." : kind === "partner" ? "Submit Partner Application" : "Submit Sponsorship Enquiry"}
      </button>
      {error && <div className="text-[13px] text-[#B23A3A] mt-1 text-center">{error}</div>}
      {submitted && (
        <div className="text-[13px] font-semibold text-ink-text mt-2 p-3 bg-copper/10 border border-copper/30 text-center">
          Thank you — your {kind === "partner" ? "partner application" : "sponsorship enquiry"} has been recorded.
        </div>
      )}
    </form>
  );
}

export default function PartnershipsPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Partner With Us"
          title="Partnerships & Sponsorships"
          description="Masters Leadership Academy works with corporate, academic, government, and civil-society organisations across our seminar, conference and technical service lines."
        />

        <div className="border-t border-rule-paper pt-12 flex flex-col gap-16">
          <div>
            <h2 className="text-[22px] font-serif text-ink-text mb-6">Partner Categories</h2>
            <div className="flex flex-wrap gap-3 mb-10">
              {partnerCategories.map((cat) => (
                <span
                  key={cat}
                  className="text-[12px] font-mono uppercase tracking-[0.06em] border border-rule-paper bg-paper-2 px-3 py-2 text-ink-text"
                >
                  {cat}
                </span>
              ))}
            </div>
            <div className="bg-paper-2 border border-rule-paper/60 p-8 rounded-[3px] max-w-[640px]">
              <h3 className="font-serif text-[19px] text-ink-text mb-4">Become a Partner</h3>
              <ApplicationForm kind="partner" />
            </div>
          </div>

          <div className="border-t border-rule-paper pt-12">
            <h2 className="text-[22px] font-serif text-ink-text mb-2">Sponsorship Portal</h2>
            <p className="text-[14px] text-muted-paper mb-8 max-w-[68ch] leading-relaxed">
              For major conferences, the Academy offers tiered sponsorship packages. A downloadable prospectus will
              be available here once a flagship conference is scheduled.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {sponsorTiers.map((t) => (
                <div key={t.tier} className="bg-ink text-cream-text p-6 rounded-[2px] flex flex-col gap-2">
                  <span className="font-mono text-[11px] text-copper-light uppercase tracking-[0.1em]">{t.tier}</span>
                  <p className="text-[13px] text-[#B9C6C2] leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
            <div className="border border-dashed border-rule-paper p-6 text-center mb-10">
              <span className="font-mono text-[11px] text-copper uppercase tracking-wider block mb-2">
                [CMS Placeholder]
              </span>
              <p className="text-[13px] text-muted-paper">
                Sponsorship prospectus PDF not yet uploaded. Add a downloadable file here once available.
              </p>
            </div>
            <div className="bg-paper-2 border border-rule-paper/60 p-8 rounded-[3px] max-w-[640px]">
              <h3 className="font-serif text-[19px] text-ink-text mb-4">Become a Sponsor</h3>
              <ApplicationForm kind="sponsor" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
