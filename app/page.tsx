"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import CMSPlaceholder from "@/components/CMSPlaceholder";
import ImpactStats from "@/components/ImpactStats";
import WebsiteAnalytics from "@/components/WebsiteAnalytics";

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

  const websitePages = [
    { title: "Home (Index)", path: "/", description: "Homepage with live platform analytics and academy overview" },
    { title: "About Us", path: "/about", description: "CAC registration details, legal facts, and company purpose" },
    { title: "Services", path: "/services", description: "Seminars, symposiums, conferences, and technical services" },
    { title: "Programmes", path: "/programmes", description: "Leadership development tracks and curriculum" },
    { title: "Events & Calendar", path: "/events", description: "Monthly Webinar, Corporate Retreat, and schedules" },
    { title: "Corporate Training", path: "/corporate-training", description: "Custom institutional and executive training packages" },
    { title: "Media", path: "/media", description: "Video player and event gallery" },
    { title: "Knowledge Centre", path: "/knowledge-centre", description: "Articles, insights, and leadership publications" },
    { title: "Leadership", path: "/leadership", description: "Executive team and board profiles" },
    { title: "Clients & Partners", path: "/clients", description: "Client organizations and institutional partners" },
    { title: "Contact", path: "/contact", description: "Inquiry form, office address, and contact details" },
    { title: "Registration", path: "/register", description: "Participant registration for upcoming sessions" },
    { title: "Donate", path: "/donate", description: "Support academy initiatives and leadership grants" },
    { title: "Verify Certificate", path: "/verify-certificate", description: "Online certificate verification system" },
    { title: "FAQ", path: "/faq", description: "Frequently asked questions and support" },
  ];

  return (
    <div className="bg-ink min-h-screen text-cream-text">
      {/* HERO SECTION */}
      <section className="hero bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1C2C42] via-[#0D1B2A] to-[#070E17] relative overflow-hidden py-20 md:py-32 border-b border-[#D4AF37]/25 shadow-2xl">
        <div className="max-w-[1200px] mx-auto px-8 relative z-10 text-center flex flex-col items-center justify-center">
          <div className="max-w-[900px] mx-auto flex flex-col items-center text-center">
            {/* Gold Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] font-mono text-[12px] uppercase tracking-[0.18em] mb-8 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
              Masters Leadership Academy
            </div>

            {/* Centralized Main Heading */}
            <h1 className="text-[44px] sm:text-[64px] md:text-[76px] lg:text-[88px] font-serif leading-[1.05] tracking-tight text-[#F8F9FA] text-center font-bold drop-shadow-lg">
              Welcome to Master Leadership Academy
            </h1>

            {/* Decorative Gold Accent Line */}
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent my-7 rounded-full opacity-80" />

            {/* Subtitle */}
            <p className="text-[18px] sm:text-[21px] md:text-[23px] text-[#C5D5D0] max-w-[62ch] leading-[1.6] text-center font-light">
              Empowering executives, managers, and institutions with diagnostic decision frameworks, executive seminars, and strategic technical services.
            </p>
          </div>
        </div>

        {/* LEDGER STRIP */}
        <div className="bg-[#050B12]/90 border-t border-[#D4AF37]/20 py-[20px] mt-[60px]">
          <div className="max-w-[1200px] mx-auto px-8">
            <div className="flex flex-wrap gap-[14px_40px] justify-between text-[#AEC0BB]">
              <span className="text-[12px] flex items-center gap-[9px] whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                CAC Registered Business Name
              </span>
              <span className="text-[12px] flex items-center gap-[9px] whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                BN 2357164
              </span>
              <span className="text-[12px] flex items-center gap-[9px] whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                Est. 2015
              </span>
              <span className="text-[12px] flex items-center gap-[9px] whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                Seminars & Symposiums
              </span>
              <span className="text-[12px] flex items-center gap-[9px] whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                Conferences
              </span>
              <span className="text-[12px] flex items-center gap-[9px] whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                Technical Services
              </span>
              <span className="text-[12px] flex items-center gap-[9px] whitespace-nowrap">
                <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
                Port Harcourt, Rivers State
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* WEBSITE ANALYTICS SECTION */}
      <WebsiteAnalytics />

      {/* WEBSITE PAGES DIRECTORY NAVIGATOR */}
      <section className="bg-ink-2 border-b border-rule py-16">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-4 border-b border-rule">
            <div>
              <span className="text-[11px] font-mono text-copper-light uppercase tracking-[0.14em] block mb-1">
                Website Directory
              </span>
              <h2 className="text-[28px] md:text-[36px] font-serif text-cream-text">
                Explore All Website Pages
              </h2>
            </div>
            <p className="text-xs text-[#AEC0BB] font-mono">
              Click any page card to navigate
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {websitePages.map((page) => (
              <Link
                key={page.path}
                href={page.path}
                className="bg-ink border border-rule hover:border-copper-light/60 p-6 rounded-[4px] group transition-all duration-200 flex flex-col justify-between hover:-translate-y-0.5 shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-serif text-[18px] text-cream-text font-semibold group-hover:text-copper-light transition-colors">
                      {page.title}
                    </h3>
                    <span className="text-copper-light opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      →
                    </span>
                  </div>
                  <p className="text-[13px] text-[#AEC0BB] leading-relaxed">
                    {page.description}
                  </p>
                </div>
                <span className="font-mono text-[11px] text-copper-light/80 mt-4 block">
                  {page.path}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="bg-paper text-ink-text py-[80px]" id="about">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="max-w-[640px] mb-[48px]">
            <span className="eyebrow text-slate mb-[16px]">Who we are</span>
            <h2 className="text-[28px] md:text-[36px] lg:text-[42px] leading-[1.12] font-serif text-ink-text">
              A registered training and events firm based in Rivers State
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[60px]">
            <div className="flex flex-col justify-start">
              <span className="text-[12px] font-semibold text-slate tracking-[0.12em] uppercase mb-[14px]">
                Registered Purpose
              </span>
              <p className="text-[17px] text-muted-paper leading-[1.6]">
                Masters Leadership Academy is registered with the Corporate Affairs Commission of Nigeria as a Business Name, with a stated general nature of business covering the organising of seminars and symposiums, the organising of conferences, and technical services.
              </p>
              <div className="mt-6">
                <Link href="/about" className="btn btn-outline-ink">
                  Read Full Registration Background
                </Link>
              </div>
            </div>
            <div className="flex flex-col justify-start">
              <span className="text-[12px] font-semibold text-slate tracking-[0.12em] uppercase mb-[14px]">
                Our Story & Mission
              </span>
              <CMSPlaceholder text="Add the Academy's founding story, mission statement and vision here." />
            </div>
          </div>
        </div>
      </section>

      <ImpactStats />

      {/* CHAIRMAN'S MESSAGE */}
      <section className="bg-paper-2 text-ink-text py-[80px]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-10 items-start">
            <div className="w-[200px] h-[200px] md:w-[240px] md:h-[240px] rounded-[4px] overflow-hidden border border-rule-paper bg-paper shrink-0 relative">
              <Image
                src="/chairman.jpg"
                alt="Dr. Orovwiroro Orakpowenri Godwin, Chairman & Founder, Masters Leadership Academy"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>
            <div>
              <span className="eyebrow text-slate mb-[14px] block">A Message From Our Chairman</span>
              <p className="text-[19px] md:text-[22px] font-serif italic leading-[1.5] text-ink-text mb-[22px] max-w-[62ch]">
                &ldquo;Our mission has always been to develop leaders who can hold up under pressure, think
                clearly, and serve their organisations and communities with integrity. Every seminar,
                conference and technical engagement we run is built toward that end.&rdquo;
              </p>
              <div className="font-serif text-[17px] text-ink-text font-semibold">Dr. Orovwiroro Orakpowenri Godwin</div>
              <div className="text-[13px] text-muted-paper uppercase tracking-[0.08em] mt-1">
                Chairman &amp; Founder, Masters Leadership Academy
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
