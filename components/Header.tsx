"use client";

import React, { useState } from "react";
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
    <header className="sticky top-0 z-50 bg-ink/95 backdrop-blur-md border-b border-rule">
      <nav className="flex items-center justify-between px-6 lg:px-8 py-5 max-w-[1200px] mx-auto relative">
        {/* Logo at header */}
        <Link href="/" className="brand flex items-center shrink-0" aria-label="Masters Leadership Academy Home">
          <div className="w-[56px] h-[56px] relative shrink-0 bg-white rounded-[6px] p-1 shadow-md hover:scale-105 transition-transform duration-200">
            <Image
              src="/logo.jpg"
              alt="Masters Leadership Academy Logo"
              fill
              sizes="56px"
              className="object-contain rounded-[4px]"
            />
          </div>
        </Link>

        {/* Requirement 4 & 5: Desktop Navigation Dropdowns */}
        <div className="hidden md:flex gap-6 lg:gap-8 items-center ml-auto mr-6">
          {dropdownGroups.map((group) => (
            <div
              key={group.id}
              className="relative group py-2"
              onMouseEnter={() => setActiveDropdown(group.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className={`flex items-center gap-1.5 text-[14px] transition-all py-1 ${
                  activeDropdown === group.id ? "text-copper-light font-medium" : "text-cream-text opacity-90 hover:opacity-100"
                }`}
              >
                {group.label}
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeDropdown === group.id ? "rotate-180 text-copper-light" : "opacity-60"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Dropdown Menu */}
              <div
                className={`absolute left-0 top-full mt-1 w-64 bg-ink border border-rule shadow-2xl rounded-[4px] py-2 z-50 transition-all duration-200 ${
                  activeDropdown === group.id
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2 pointer-events-none"
                }`}
              >
                {group.links.map((link: NavLinkItem) => (
                  <div key={link.href} className="px-1">
                    <Link
                      href={link.href}
                      onClick={() => setActiveDropdown(null)}
                      className={`block px-4 py-2 text-[13px] rounded-[2px] transition-colors ${
                        pathname === link.href
                          ? "bg-copper/20 text-copper-light font-semibold"
                          : "text-cream-text/85 hover:text-cream-text hover:bg-white/5"
                      }`}
                    >
                      {link.label}
                    </Link>

                    {/* Sub-items under Events (Requirement 5) */}
                    {link.subItems && (
                      <div className="ml-4 border-l border-rule/60 my-1 pl-2 flex flex-col gap-0.5">
                        {link.subItems.map((sub: SubItem) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setActiveDropdown(null)}
                            className="block px-3 py-1 text-[12px] text-copper-light/90 hover:text-copper-light hover:underline transition-colors"
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
          ))}

          {/* Contact Direct Link */}
          <Link
            href="/contact"
            className={`text-[14px] transition-all hover:opacity-100 ${
              pathname === "/contact" ? "text-copper-light font-medium" : "text-cream-text opacity-90"
            }`}
          >
            {dict.nav.contact || "Contact"}
          </Link>
        </div>

        {/* Right CTA / Language Switcher */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:block">
            <LanguageSwitcher current={locale} label={dict.language.switchLanguage} />
          </div>
          <Link href="/contact" className="hidden sm:inline-flex btn btn-outline-dark text-xs">
            {dict.nav.enquireNow || "Enquire Now"}
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden bg-none border-none text-cream-text text-2xl cursor-pointer p-1"
            aria-label="Toggle menu"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile Drawer */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-ink border-b border-rule flex flex-col px-6 py-5 gap-4 z-50 max-h-[80vh] overflow-y-auto shadow-2xl">
            {dropdownGroups.map((group) => {
              const isExpanded = mobileExpanded === group.id;
              return (
                <div key={group.id} className="border-b border-rule/40 pb-2">
                  <button
                    onClick={() => toggleMobileAccordion(group.id)}
                    className="w-full flex items-center justify-between py-2 text-[15px] font-medium text-cream-text"
                  >
                    <span>{group.label}</span>
                    <span className="text-copper-light">{isExpanded ? "−" : "+"}</span>
                  </button>

                  {isExpanded && (
                    <div className="pl-4 py-2 flex flex-col gap-2 bg-ink-2/60 rounded-[4px] mt-1">
                      {group.links.map((link: NavLinkItem) => (
                        <div key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="block py-1 text-[13px] text-cream-text/80 hover:text-copper-light"
                          >
                            {link.label}
                          </Link>
                          {link.subItems && (
                            <div className="pl-3 py-1 flex flex-col gap-1 border-l border-rule/50 my-1">
                              {link.subItems.map((sub: SubItem) => (
                                <Link
                                  key={sub.href}
                                  href={sub.href}
                                  onClick={() => setIsOpen(false)}
                                  className="block text-[12px] text-copper-light hover:underline"
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
              );
            })}

            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="py-2 text-[15px] font-medium text-cream-text hover:text-copper-light"
            >
              {dict.nav.contact || "Contact"}
            </Link>

            <div className="pt-2 border-t border-rule/50">
              <LanguageSwitcher current={locale} label={dict.language.switchLanguage} />
            </div>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="btn btn-outline-dark text-center w-full justify-center mt-2"
            >
              {dict.nav.enquireNow || "Enquire Now"}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
