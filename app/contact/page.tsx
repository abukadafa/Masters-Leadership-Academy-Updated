"use client";

import React, { useState } from "react";
import Honeypot from "@/components/Honeypot";
import { ORG_FACTS } from "@/lib/site";

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
    <div className="bg-white py-16 text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        {/* Page Heading */}
        <div className="max-w-[840px] mb-12">
          <span className="eyebrow text-emerald-700 mb-3">Contact Us</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-950 leading-tight mb-5">
            Connect With Masters Leadership Academy
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Inquire about our executive seminars, institutional symposiums, national conferences, or bespoke technical advisory services. Visit our Abuja corporate office or reach our advisory desk directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-slate-200 pt-12">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#F8FAFC] border border-slate-200 p-8 sm:p-10 rounded-2xl shadow-xs">
            <h2 className="text-2xl font-serif font-bold text-slate-950 mb-2">Send an Official Enquiry</h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Our programme coordinators and technical advisory team will review your message promptly.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <Honeypot value={website} onChange={setWebsite} />
              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full p-3.5 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                  Official / Corporate Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@organization.com"
                  className="w-full p-3.5 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                  Subject / Area of Interest
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  placeholder="e.g. Executive Seminar / Corporate Advisory"
                  className="w-full p-3.5 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 shadow-2xs"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-semibold uppercase text-slate-700 mb-1.5">
                  Message / Brief
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Provide context on your leadership development requirements or consultation request..."
                  className="w-full p-3.5 border border-slate-300 rounded-lg bg-white text-sm text-slate-900 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 resize-none shadow-2xs"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn btn-emerald w-full justify-center !py-3.5 cursor-pointer disabled:opacity-60 text-sm font-semibold rounded-lg mt-2"
              >
                {loading ? "Sending..." : "Submit Enquiry"}
              </button>

              {error && (
                <div className="text-xs text-red-600 font-medium mt-1 text-center bg-red-50 p-2.5 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              {submitted && (
                <div className="text-sm font-semibold text-emerald-800 mt-2 p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
                  Thank you! Your message has been sent successfully. Our team will respond shortly.
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Office Details */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {/* Abuja Corporate Office */}
            <div className="bg-[#F8FAFC] border border-slate-200 p-8 rounded-2xl">
              <span className="text-xs font-mono font-bold text-emerald-700 tracking-wider uppercase block mb-3">
                Corporate Office
              </span>
              <h3 className="text-xl font-serif font-bold text-slate-950 mb-2">
                Abuja Office
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                36 Moses Majekodunmi Street,<br />
                Utako, Abuja, FCT,<br />
                Nigeria.
              </p>

              <div className="pt-4 border-t border-slate-200 space-y-3 text-sm">
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-700 font-bold">📞 Phone:</span>
                  <a href="tel:+2348114646340" className="text-slate-900 font-medium hover:text-emerald-700 transition-colors">
                    +234 811 464 6340
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-700 font-bold">✉️ Email:</span>
                  <a href="mailto:mastersleadershipacademy@gmail.com" className="text-slate-900 font-medium hover:text-emerald-700 transition-colors">
                    mastersleadershipacademy@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="text-emerald-700 font-bold">🌐 Facebook:</span>
                  <a
                    href="https://www.facebook.com/LeadMastersAcademy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-900 font-medium hover:text-emerald-700 underline"
                  >
                    LeadMastersAcademy
                  </a>
                </div>
              </div>
            </div>

            {/* Registered Head Office */}
            <div className="bg-[#F8FAFC] border border-slate-200 p-8 rounded-2xl">
              <span className="text-xs font-mono font-bold text-slate-500 tracking-wider uppercase block mb-3">
                Registered Historic Head Office
              </span>
              <p className="text-sm text-slate-700 leading-relaxed mb-2">
                Plot 4Y2K Crescent, off Tony Okocha Road,<br />
                New Rumuigbo, Port Harcourt,<br />
                Rivers State, Nigeria.
              </p>
              <div className="pt-3 border-t border-slate-200 text-xs font-mono text-slate-500">
                BN 2357164 · CRBN 635769<br />
                Registered pursuant to CAMA 1990 s.659
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
