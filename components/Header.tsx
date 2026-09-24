"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";

interface SubItem {
  href: string;
  label: string;
}

interface NavLinkItem {
  href: string;
  label: string;
  subItems?: SubItem[];
}

interface DropdownGroup {
  id: string;
  label: string;
  links: NavLinkItem[];
}

export default function Header({ dict, locale }: { dict: Dictionary; locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (id: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 250);
  };

  const toggleDropdown = (id: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  const exploreLinks: NavLinkItem[] = [
    { href: "/about", label: dict.nav.about || "About Us" },
    { href: "/services", label: dict.nav.services || "Services" },
    { href: "/programmes", label: dict.nav.programmes || "Programmes" },
    { href: "/corporate-training", label: "Corporate Training" },
    {
      href: "/events",
      label: dict.nav.events || "Events",
      subItems: [
        { href: "/events#monthly-webinar", label: "Monthly Webinar" },
        { href: "/events#corporate-retreat", label: "Corporate Retreat" },
        { href: "/events#upcoming-events", label: "Upcoming Events" },
      ],
    },
  ];

  const mediaKnowledgeLinks: NavLinkItem[] = [
    { href: "/media", label: dict.nav.media || "Media" },
    { href: "/knowledge-centre", label: "Knowledge Centre" },
    { href: "/testimonials", label: dict.footer.testimonials || "Testimonials" },
    { href: "/resources", label: dict.footer.resources || "Resources" },
  ];

  const companyLinks: NavLinkItem[] = [
    { href: "/leadership", label: dict.footer.leadership || "Leadership" },
    { href: "/clients", label: dict.footer.clients || "Clients" },
    { href: "/partnerships", label: dict.footer.partnerships || "Partnerships" },
    { href: "/careers", label: dict.footer.careers || "Careers" },
    { href: "/contact", label: dict.nav.contact || "Contact" },
  ];

  const getInvolvedLinks: NavLinkItem[] = [
    { href: "/register", label: dict.footer.registration || "Registration" },
    { href: "/donate", label: "Donate" },
    { href: "/verify-certificate", label: dict.footer.verifyCertificate || "Verify Certificate" },
    { href: "/faq", label: dict.footer.faq || "FAQ" },
  ];

  const dropdownGroups: DropdownGroup[] = [
    { id: "explore", label: dict.footer.explore || "Explore", links: exploreLinks },
    { id: "media", label: dict.footer.mediaKnowledge || "Media & Knowledge", links: mediaKnowledgeLinks },
    { id: "company", label: dict.footer.company || "Company", links: companyLinks },
    { id: "getInvolved", label: dict.footer.getInvolved || "Get Involved", links: getInvolvedLinks },
  ];

  const toggleMobileAccordion = (id: string) => {
    setMobileExpanded(mobileExpanded === id ? null : id);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <nav className="flex items-center justify-between px-4 sm:px-6 lg:px-6 xl:px-8 2xl:px-10 py-2.5 sm:py-3 max-w-[1440px] mx-auto relative">
        {/* Brand Area with Distinct Emblem and Prominent Company Name */}
        <div className="flex items-center shrink-0 mr-2 lg:mr-3 xl:mr-5 2xl:mr-8">
          <Link href="/" className="brand flex items-center gap-2.5 sm:gap-3.5 xl:gap-4 group" aria-label="Masters Leadership Academy Home">
            <div className="w-[50px] h-[50px] sm:w-[58px] sm:h-[58px] lg:w-[62px] lg:h-[62px] xl:w-[68px] xl:h-[68px] relative shrink-0 bg-white rounded-2xl p-1.5 sm:p-2 border border-slate-200/90 shadow-sm group-hover:scale-105 group-hover:border-emerald-600/60 transition-all duration-300">
              <Image
                src="/logo.jpg"
                alt="Masters Leadership Academy Logo"
                fill
                sizes="(max-width: 640px) 50px, (max-width: 1024px) 62px, 68px"
                className="object-contain rounded-xl"
                priority
              />
            </div>
            <span className="font-serif text-lg sm:text-xl lg:text-[1.22rem] xl:text-[1.42rem] 2xl:text-[1.6rem] font-black text-slate-950 tracking-tight leading-tight group-hover:text-emerald-800 transition-colors whitespace-nowrap">
              Masters Leadership Academy
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links — Centered, Well-Spaced, Intelligent Dropdown Alignment */}
        <div className="hidden lg:flex items-center gap-1 lg:gap-1.5 xl:gap-2.5 2xl:gap-4 shrink-0">
          {dropdownGroups.map((group) => {
            const dropdownAlignClass =
              group.id === "getInvolved"
                ? "right-0"
                : group.id === "company" || group.id === "media"
                ? "left-1/2 -translate-x-1/2"
                : "left-0";

            return (
              <div
                key={group.id}
                className="relative py-2"
                onMouseEnter={() => handleMouseEnter(group.id)}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  type="button"
                  onClick={() => toggleDropdown(group.id)}
                  className={`flex items-center gap-1 lg:gap-1.5 px-2 py-1.5 lg:px-2.5 lg:py-1.5 xl:px-3 xl:py-2 rounded-lg text-[13px] xl:text-[14px] 2xl:text-[15px] font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    activeDropdown === group.id ? "text-emerald-800 font-bold bg-emerald-50/90" : "text-slate-700 hover:text-emerald-800 hover:bg-slate-50"
                  }`}
                >
                  <span>{group.label}</span>
                  <svg
                    className={`w-3 h-3 xl:w-3.5 xl:h-3.5 transition-transform duration-200 ${
                      activeDropdown === group.id ? "rotate-180 text-emerald-700" : "text-slate-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu — opens properly aligned so it never goes off-screen */}
                <div
                  onMouseEnter={() => {
                    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
                  }}
                  onMouseLeave={handleMouseLeave}
                  className={`absolute ${dropdownAlignClass} top-full pt-1.5 ${group.id === "getInvolved" || group.id === "media" ? "w-72" : "w-64"} z-50 transition-all duration-200 ${
                    activeDropdown === group.id
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="bg-white border border-slate-200/90 shadow-2xl rounded-2xl p-2.5 before:absolute before:-top-3 before:left-0 before:right-0 before:h-4">
                    {group.links.map((link: NavLinkItem) => (
                      <div key={link.href} className="px-1 py-0.5">
                        <Link
                          href={link.href}
                          onClick={() => setActiveDropdown(null)}
                          className={`block px-3 py-2 text-[13px] rounded-xl font-medium transition-colors ${
                            pathname === link.href
                              ? "bg-emerald-50 text-emerald-800 font-semibold"
                              : "text-slate-700 hover:text-emerald-800 hover:bg-slate-50"
                          }`}
                        >
                          {link.label}
                        </Link>

                        {/* Sub-items */}
                        {link.subItems && (
                          <div className="ml-3 border-l border-slate-200 my-1 pl-3 flex flex-col gap-1">
                            {link.subItems.map((sub: SubItem) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setActiveDropdown(null)}
                                className="block px-2 py-1 text-[12px] text-slate-500 hover:text-emerald-700 hover:underline transition-colors"
                              >
                                ↳ {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Contact Direct Link */}
          <Link
            href="/contact"
            className={`px-2 py-1.5 lg:px-2.5 lg:py-1.5 xl:px-3 xl:py-2 rounded-lg text-[13px] xl:text-[14px] 2xl:text-[15px] font-semibold transition-all whitespace-nowrap ${
              pathname === "/contact"
                ? "text-emerald-800 font-bold bg-emerald-50/90"
                : "text-slate-700 hover:text-emerald-800 hover:bg-slate-50"
            }`}
          >
            {dict.nav.contact || "Contact"}
          </Link>
        </div>

        {/* Right CTA & Language Switcher */}
        <div className="flex items-center gap-2 lg:gap-2.5 xl:gap-3 lg:pl-3 xl:pl-4 2xl:pl-5 lg:border-l lg:border-slate-200 shrink-0">
          <div className="hidden md:block">
            <LanguageSwitcher current={locale} label={dict.language.switchLanguage} />
          </div>
          <Link
            href="/register"
            className="hidden sm:inline-flex px-3.5 py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs xl:text-sm font-bold rounded-xl transition-all shadow-xs hover:shadow-md whitespace-nowrap"
          >
            Register / Enquire
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <span className="text-2xl leading-none">{isOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[76px] sm:top-[86px] bg-slate-950/60 backdrop-blur-xs z-40">
          <div className="bg-white w-full max-h-[calc(100vh-76px)] sm:max-h-[calc(100vh-86px)] overflow-y-auto px-6 py-6 pb-24 border-b border-slate-200 shadow-xl flex flex-col gap-4">
            <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500 uppercase tracking-wider font-semibold">
                Language
              </span>
              <LanguageSwitcher current={locale} label={dict.language.switchLanguage} />
            </div>

            {dropdownGroups.map((group) => (
              <div key={group.id} className="border-b border-slate-100 pb-3">
                <button
                  onClick={() => toggleMobileAccordion(group.id)}
                  className="w-full flex items-center justify-between py-2 text-base font-serif font-bold text-slate-900"
                >
                  <span>{group.label}</span>
                  <span className="text-slate-400 text-sm">
                    {mobileExpanded === group.id ? "▲" : "▼"}
                  </span>
                </button>

                {mobileExpanded === group.id && (
                  <div className="pl-3 mt-2 flex flex-col gap-1.5 border-l-2 border-emerald-600">
                    {group.links.map((link) => (
                      <div key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="block py-1.5 text-sm text-slate-700 hover:text-emerald-700 font-medium"
                        >
                          {link.label}
                        </Link>
                        {link.subItems && (
                          <div className="pl-3 flex flex-col gap-1 my-1">
                            {link.subItems.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                onClick={() => setIsOpen(false)}
                                className="block py-1 text-xs text-slate-500 hover:text-emerald-700"
                              >
                                ↳ {sub.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="py-2 text-base font-serif font-bold text-slate-900"
            >
              {dict.nav.contact || "Contact"}
            </Link>

            <div className="pt-4 pb-6 border-t border-slate-100">
              <Link
                href="/register"
                onClick={() => setIsOpen(false)}
                className="w-full py-3 bg-emerald-700 text-white text-center font-semibold text-sm rounded-xl block shadow-sm"
              >
                Register / Enquire
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
