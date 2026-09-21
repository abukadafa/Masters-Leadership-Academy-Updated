"use client";

import React, { useState } from "react";
import CMSPlaceholder from "@/components/CMSPlaceholder";
import Honeypot from "@/components/Honeypot";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/contact", {
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
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[800px] mb-12">
          <span className="eyebrow text-slate mb-4">Contact Us</span>
          <h1 className="text-[36px] md:text-[48px] font-serif leading-tight text-ink-text mb-6">
            Get in touch with Masters Leadership Academy
          </h1>
          <p className="text-[18px] text-muted-paper leading-relaxed">
            Inquire about our seminars, conferences, and technical services. Our official office is based in Port Harcourt, Rivers State.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start border-t border-rule-paper pt-12">
          {/* Left Column: Contact Form */}
          <div className="bg-paper-2 border border-rule-paper/60 p-8 rounded-[3px]">
            <h2 className="text-[22px] font-serif text-ink-text mb-6">Send a Message</h2>
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
                <label className="block text-xs font-mono uppercase text-slate mb-2">Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate mb-2">Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper resize-none"
                />
              </div>
              <button type="submit" disabled={loading} className="btn btn-copper w-full justify-center cursor-pointer disabled:opacity-60">
                {loading ? "Sending..." : "Submit Enquiry"}
              </button>
              {error && (
                <div className="text-[13px] text-[#B23A3A] mt-1 text-center">{error}</div>
              )}
              {submitted && (
                <div className="text-[13px] font-semibold text-ink-text mt-2 p-3 bg-copper/10 border border-copper/30 text-center">
                  Thank you! Your message has been sent successfully. We will respond shortly.
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Office Details */}
          <div className="flex flex-col gap-8">
            <div>
              <span className="text-[12px] font-semibold text-slate tracking-[0.12em] uppercase block mb-3">
                Registered Head Office
              </span>
              <p className="text-[16px] text-ink-text font-serif leading-relaxed mb-2">
                Masters Leadership Academy
              </p>
              <p className="text-[15px] text-muted-paper leading-relaxed">
                Plot 4Y2K Crescent, off Tony Okocha Road,<br />
                New Rumuigbo, Port Harcourt,<br />
                Rivers State, Nigeria.
              </p>
            </div>

            <div className="border-t border-rule-paper/50 pt-8">
              <span className="text-[12px] font-semibold text-slate tracking-[0.12em] uppercase block mb-3">
                Direct Contact Channels
              </span>
              <div className="flex flex-col gap-6">
                <div>
                  <span className="text-[11px] font-mono text-muted-paper uppercase block mb-1">Email Address</span>
                  <CMSPlaceholder text="Provide a valid corporate email address (e.g. contact@mastersleadership.academy)" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-muted-paper uppercase block mb-1">Telephone Line</span>
                  <CMSPlaceholder text="Provide a primary office telephone number with international code" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-muted-paper uppercase block mb-1">Facebook Page</span>
                  <a
                    href="https://www.facebook.com/LeadMastersAcademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[14px] text-ink-text hover:text-copper underline font-medium block"
                  >
                    LeadMastersAcademy on Facebook
                  </a>
                </div>
              </div>
            </div>

            <div className="border-t border-rule-paper/50 pt-8">
              <span className="text-[12px] font-semibold text-slate tracking-[0.12em] uppercase block mb-2">
                Business Compliance
              </span>
              <p className="text-[13px] text-muted-paper leading-relaxed font-mono">
                BN 2357164 · CRBN 635769<br />
                Registered pursuant to CAMA 1990 s.659
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
