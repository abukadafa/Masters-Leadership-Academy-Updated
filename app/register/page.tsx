"use client";

import React, { useState } from "react";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import NotificationOptIn from "@/components/NotificationOptIn";
import Honeypot from "@/components/Honeypot";
import PaymentForm from "@/components/PaymentForm";

export default function RegisterPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", interest: "" });
  const [website, setWebsite] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/register", {
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
      setForm({ name: "", email: "", phone: "", interest: "" });
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
          eyebrow="Participant Registration"
          title="Register your interest"
          description="No programme currently has open registration — the catalogue is awaiting confirmed programme names, dates and fees. Join the interest list below and we'll notify you as soon as registration opens."
        />

        <div className="border-t border-rule-paper pt-12 grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12">
          <div className="bg-paper-2 border border-rule-paper/60 p-8 rounded-[3px]">
            <h2 className="text-[20px] font-serif text-ink-text mb-6">Join the Interest List</h2>
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
                <label className="block text-xs font-mono uppercase text-slate mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
                />
              </div>
              <div>
                <label className="block text-xs font-mono uppercase text-slate mb-2">Area of Interest</label>
                <input
                  type="text"
                  placeholder="e.g. Public Sector Leadership Seminar"
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                  className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
                />
              </div>
              <button type="submit" disabled={loading} className="btn btn-copper w-full justify-center cursor-pointer disabled:opacity-60">
                {loading ? "Submitting..." : "Notify Me"}
              </button>
              {error && <div className="text-[13px] text-[#B23A3A] mt-1 text-center">{error}</div>}
              {submitted && (
                <div className="text-[13px] font-semibold text-ink-text mt-2 p-3 bg-copper/10 border border-copper/30 text-center">
                  Thank you — we&apos;ll email you when programme registration opens.
                </div>
              )}
            </form>
          </div>

          <div className="flex flex-col gap-6">
            <div className="bg-ink text-cream-text p-8 rounded-[3px]">
              <h3 className="font-serif text-[19px] mb-3">How Registration Will Work</h3>
              <ol className="text-[14px] text-[#B9C6C2] leading-relaxed flex flex-col gap-2 list-decimal pl-5">
                <li>Browse the confirmed Programme Catalogue</li>
                <li>Select a cohort or event date</li>
                <li>Complete participant details and payment</li>
                <li>Receive a registration confirmation and, for physical events, a QR check-in code</li>
                <li>Attend, and receive your certificate on completion</li>
              </ol>
            </div>
            <div className="bg-paper-2 border border-rule-paper/60 p-6 rounded-[2px]">
              <h4 className="font-serif text-[16px] text-ink-text mb-2">Prefer a push notification instead?</h4>
              <p className="text-[13px] text-muted-paper mb-4 leading-relaxed">
                Opt in to be notified in your browser when registration opens — no email required.
              </p>
              <NotificationOptIn />
            </div>
            <p className="text-[13px] text-muted-paper leading-relaxed">
              No programme currently has confirmed dates or a published catalogue fee. See the{" "}
              <Link href="/programmes" className="text-copper underline">Programme Catalogue</Link> for
              current status.
            </p>
          </div>
        </div>

        <div className="border-t border-rule-paper pt-12 mt-16">
          <h2 className="text-[24px] font-serif text-ink-text mb-3">Already Have a Confirmed Fee?</h2>
          <p className="text-muted-paper mb-8 max-w-[64ch]">
            If a facilitator or the Academy has already confirmed your programme and fee, pay it securely
            below via Paystack or Flutterwave.
          </p>
          <div className="bg-paper-2 border border-rule-paper/60 p-8 rounded-[3px] max-w-[520px]">
            <PaymentForm
              purpose="registration"
              noteLabel="Programme / Cohort Name"
              noteRequired
            />
          </div>
        </div>
      </div>
    </div>
  );
}
