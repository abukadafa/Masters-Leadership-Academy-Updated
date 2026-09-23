"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ImpactStats from "@/components/ImpactStats";
import WebsiteAnalytics from "@/components/WebsiteAnalytics";
import { CORE_PHILOSOPHY, ORG_FACTS, LEADERSHIP_TEAM } from "@/lib/site";

export default function Home() {
  useEffect(() => {
    const revealEls = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
          }
        });
      },
      { threshold: 0.1 }
    );
    revealEls.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="bg-white min-h-screen text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* ========================================================= */}
      {/* 1. HERO SECTION (Spacious, Crisp Architectural Aesthetic) */}
      {/* ========================================================= */}
      <section className="relative bg-executive-pattern overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200">
        {/* Soft Ambient Depth Accents */}
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Animated Live Status Pill */}
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-semibold tracking-wide mb-6 shadow-2xs">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
                </span>
                <span>2026/2027 Executive Seminars &amp; Cohorts Open</span>
              </div>

              {/* Main Authority Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-serif font-extrabold text-slate-950 leading-[1.18] tracking-tight">
                Building Leadership With<br />
                <span className="relative inline-block my-1.5">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 via-teal-800 to-amber-700">
                    Lasting Impact
                  </span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-emerald-200/50 -z-10 rounded-sm"></span>
                </span><br />
                Across <span className="text-slate-400 font-light">Generations.</span>
              </h1>

              {/* Exact Requested Subtitle */}
              <p className="mt-6 text-lg sm:text-xl text-slate-700 max-w-2xl leading-relaxed font-normal">
                Empowering executives, managers, and institutions with diagnostic decision frameworks, executive seminars, and strategic technical services.
              </p>

              {/* Strategic Focus Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  "Seminars & Symposiums",
                  "Executive Conferences",
                  "Technical Advisory",
                  "Thought Leadership",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 shadow-2xs rounded-full px-4 py-1.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/programmes"
                  className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-emerald-700 text-white font-semibold text-sm rounded-xl hover:bg-emerald-800 transition-all duration-200 shadow-[0_4px_16px_rgba(5,150,105,0.25)] hover:shadow-[0_6px_22px_rgba(5,150,105,0.35)] hover:-translate-y-0.5 group"
                >
                  <span>Explore Programmes &amp; Seminars</span>
                  <svg
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  href="/corporate-training"
                  className="inline-flex items-center gap-2 px-7 py-3.5 border border-slate-300 bg-white text-slate-700 font-semibold text-sm rounded-xl hover:bg-slate-50 hover:border-slate-400 transition-all duration-200 shadow-2xs hover:-translate-y-0.5"
                >
                  <span>Corporate Advisory</span>
                  <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {/* Fast Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 mt-8 pt-6 border-t border-slate-200/80 text-xs text-slate-500 font-mono">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>CAC Registered: BN 2357164</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span>CRBN 635769</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Abuja Corporate Office: Utako</span>
                </div>
              </div>
            </div>

            {/* Right Visual Showcase Column — Stacked Cleanly Without Overlapping */}
            <div className="lg:col-span-5 relative flex flex-col items-center">
              {/* Primary White Focus Card */}
              <div className="relative w-full max-w-[430px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/90 p-7 sm:p-8">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold shadow-2xs">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-100/70 px-3 py-1 rounded-full uppercase tracking-wider">
                    Academy Focus
                  </span>
                </div>

                <h3 className="text-xl font-serif font-bold text-slate-900 mb-1 leading-snug">
                  Strategic Advisory &amp; Pillars
                </h3>
                <p className="text-slate-500 text-xs leading-relaxed mb-5">
                  Transforming executives, public institutions, and corporate boards into high-performing entities.
                </p>

                {/* Progress Indicators */}
                <div className="space-y-3.5">
                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Seminars &amp; Symposiums</span>
                      <span className="text-emerald-700 font-bold font-mono text-[11px]">Executive</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 w-[94%] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Conferences &amp; Summits</span>
                      <span className="text-emerald-700 font-bold font-mono text-[11px]">Pan-African</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-600 w-[88%] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Technical Advisory &amp; Governance</span>
                      <span className="text-amber-600 font-bold font-mono text-[11px]">Institutional</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-amber-500 w-[92%] rounded-full" />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
                      <span>Thought Leadership Briefs</span>
                      <span className="text-slate-500 font-bold font-mono text-[11px]">Continuous</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-slate-400 w-[80%] rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Core Philosophy Block — Placed Neatly Inside the Card with Zero Overlap */}
                <div className="mt-6 pt-5 border-t border-slate-100 bg-slate-950 text-white rounded-2xl p-4 sm:p-5 shadow-xs">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold">
                      Core Philosophy
                    </span>
                  </div>
                  <p className="font-serif text-sm font-bold text-white mb-1 leading-snug">
                    Integrity · Excellence · Partnership · Impact
                  </p>
                  <p className="text-[11px] text-slate-300 leading-relaxed font-light">
                    Measurable outcomes achieved by our partners — not merely activity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 2. VISION, MISSION & CORE VALUES SECTION */}
      {/* ========================================================= */}
      <section className="py-20 lg:py-28 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="eyebrow text-emerald-700 mb-3 justify-center block">Foundational Direction</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-extrabold text-slate-950 tracking-tight mb-4">
              Vision, Mission &amp; Core Values
            </h2>
            <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
              We anchor every advisory engagement, executive symposium, and curriculum module in clear principles of integrity, institutional rigour, and enduring generational impact.
            </p>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-12">
            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 left-0 w-2.5 h-full bg-emerald-600" />
              <div>
                <span className="font-mono text-xs font-bold text-emerald-700 uppercase tracking-widest block mb-4">
                  Our Vision
                </span>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-snug mb-4">
                  &ldquo;Building a leadership lifestyle with lasting impact across generations.&rdquo;
                </h3>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-5">
                Instilling habits, ethical clarity, and decision competence that sustain beyond immediate tenures.
              </p>
            </div>

            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm relative overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300">
              <div className="absolute top-0 left-0 w-2.5 h-full bg-amber-500" />
              <div>
                <span className="font-mono text-xs font-bold text-amber-700 uppercase tracking-widest block mb-4">
                  Our Mission
                </span>
                <p className="text-base sm:text-lg text-slate-900 font-serif leading-relaxed mb-4">
                  &ldquo;Equipping leaders and institutions with strategic insight and practical tools to translate ambition into measurable outcomes — bridging the boardroom, the classroom and the public square.&rdquo;
                </p>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-5">
                Bridging academic rigour, corporate boardroom reality, and civic public policy.
              </p>
            </div>
          </div>

          {/* 4 Core Values Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_PHILOSOPHY.coreValues.map((val) => (
              <div
                key={val.title}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-800 font-serif font-bold text-lg flex items-center justify-center mb-5 group-hover:bg-emerald-700 group-hover:text-white transition-colors">
                    {val.title.charAt(0)}
                  </div>
                  <h4 className="text-lg font-serif font-bold text-slate-900 mb-2">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. EXECUTIVE FACULTY WITH REAL PICTURES */}
      {/* ========================================================= */}
      <section className="py-20 lg:py-28 bg-white border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-5 border-b border-slate-200">
            <div className="max-w-2xl">
              <span className="eyebrow text-emerald-700 mb-2 block">Faculty &amp; Leadership</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-950 tracking-tight">
                Executive Leadership Council
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                Direct advisory and instruction from seasoned corporate veterans, engineering fellows, and business school faculty.
              </p>
            </div>
            <Link
              href="/about#leadership"
              className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-800 hover:text-emerald-950 font-mono shrink-0"
            >
              <span>View Full Leadership Dossiers</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {LEADERSHIP_TEAM.map((member) => (
              <div
                key={member.name}
                className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs hover:shadow-lg hover:border-emerald-600/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div>
                  {/* Real Portrait Photo */}
                  <div className="w-full h-60 sm:h-64 rounded-xl overflow-hidden relative border border-slate-200 bg-slate-100 mb-4">
                    {member.image ? (
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-emerald-50 text-emerald-800 font-serif font-bold text-3xl">
                        {member.name.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                      </div>
                    )}
                  </div>

                  <span className="font-mono text-[10px] text-emerald-800 font-bold uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded mb-2 inline-block border border-emerald-200/60">
                    {member.credentials}
                  </span>

                  <h3 className="font-serif text-base sm:text-lg font-bold text-slate-950 mb-1 leading-snug group-hover:text-emerald-800 transition-colors">
                    {member.name}
                  </h3>

                  <div className="text-xs font-semibold text-slate-700 mb-2 font-mono">
                    {member.role}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-3">
                    {member.bio}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] font-mono text-slate-500 line-clamp-1">
                  {member.organization}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. IMPACT STATS SECTION */}
      {/* ========================================================= */}
      <ImpactStats />

      {/* ========================================================= */}
      {/* 5. CHAIRMAN'S MESSAGE */}
      {/* ========================================================= */}
      <section className="bg-white text-slate-900 py-20 lg:py-28 border-b border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 items-center bg-[#F8FAFC] p-8 sm:p-12 rounded-3xl border border-slate-200">
            <div className="w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] rounded-2xl overflow-hidden border border-slate-200 shadow-sm shrink-0 relative mx-auto md:mx-0">
              <Image
                src="/chairman.jpg"
                alt="Dr. Orovwiroro Orakpowenri Godwin, Chairman & Founder, Masters Leadership Academy"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="eyebrow text-emerald-700 mb-3 block">A Message From Our Chairman</span>
              <p className="text-lg sm:text-xl font-serif italic leading-relaxed text-slate-900 mb-5 max-w-[58ch]">
                &ldquo;Our mission has always been to develop leaders who can hold up under pressure, think clearly, and serve their organisations and communities with integrity. Every seminar, conference and technical engagement we run is built toward that end.&rdquo;
              </p>
              <div className="font-serif text-lg text-slate-950 font-bold">
                Dr. Orovwiroro Orakpowenri Godwin, FIMC, CMC
              </div>
              <div className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-mono">
                Chairman &amp; Founder, Masters Leadership Academy
              </div>
              <div className="text-xs text-slate-400 font-mono mt-0.5">
                Visiting Lecturer, University of Port Harcourt Business School &amp; Garden City Premier Business School
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 6. LIVE PLATFORM ANALYTICS SECTION */}
      {/* ========================================================= */}
      <WebsiteAnalytics />
    </div>
  );
}
