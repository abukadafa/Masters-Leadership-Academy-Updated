import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import SocialLinks from "@/components/SocialLinks";

export default function Footer({ dict }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="bg-ink text-[#9AACA6] py-[70px] border-t border-rule mt-auto">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-[50px] border-b border-rule">
          <div className="foot-brand lg:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 relative shrink-0 bg-white rounded-[6px] p-1 shadow-sm">
                <Image src="/logo.jpg" alt="Masters Leadership Academy logo" fill sizes="36px" className="object-contain rounded-[4px]" />
              </div>
              <span className="brand-name font-serif text-cream-text text-[16px] font-semibold tracking-[0.02em] uppercase leading-tight">
                Masters Leadership Academy
              </span>
            </div>
            <p className="text-[13px] mt-2 max-w-[32ch] leading-[1.6]">
              {dict.footer.tagline}
            </p>
            <div className="mt-2">
              <h5 className="text-[12px] text-copper-light uppercase tracking-[0.1em] font-semibold mb-[12px]">
                {dict.footer.followUs}
              </h5>
              <SocialLinks label={dict.footer.followUs} />
            </div>
          </div>

          <div className="foot-col">
            <h5 className="text-[12px] text-copper-light uppercase tracking-[0.1em] font-semibold mb-[16px]">
              {dict.footer.explore}
            </h5>
            <Link href="/about" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.nav.about}</Link>
            <Link href="/services" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.nav.services}</Link>
            <Link href="/programmes" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.nav.programmes}</Link>
            <Link href="/events" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.nav.events}</Link>
            <Link href="/corporate-training" className="block text-[13px] mb-[10px] hover:text-cream-text">Corporate Training</Link>
          </div>

          <div className="foot-col">
            <h5 className="text-[12px] text-copper-light uppercase tracking-[0.1em] font-semibold mb-[16px]">
              {dict.footer.mediaKnowledge}
            </h5>
            <Link href="/media" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.nav.media}</Link>
            <Link href="/knowledge-centre" className="block text-[13px] mb-[10px] hover:text-cream-text">Knowledge Centre</Link>
            <Link href="/testimonials" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.footer.testimonials}</Link>
            <Link href="/resources" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.footer.resources}</Link>
          </div>

          <div className="foot-col">
            <h5 className="text-[12px] text-copper-light uppercase tracking-[0.1em] font-semibold mb-[16px]">
              {dict.footer.company}
            </h5>
            <Link href="/leadership" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.footer.leadership}</Link>
            <Link href="/clients" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.footer.clients}</Link>
            <Link href="/partnerships" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.footer.partnerships}</Link>
            <Link href="/careers" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.footer.careers}</Link>
            <Link href="/contact" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.nav.contact}</Link>
          </div>

          <div className="foot-col">
            <h5 className="text-[12px] text-copper-light uppercase tracking-[0.1em] font-semibold mb-[16px]">
              {dict.footer.getInvolved}
            </h5>
            <Link href="/register" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.footer.registration}</Link>
            <Link href="/donate" className="block text-[13px] mb-[10px] hover:text-cream-text">Donate</Link>
            <Link href="/verify-certificate" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.footer.verifyCertificate}</Link>
            <Link href="/faq" className="block text-[13px] mb-[10px] hover:text-cream-text">{dict.footer.faq}</Link>
            <p className="text-[13px] mt-4 leading-[1.6]">
              Plot 4Y2K Crescent, off Tony Okocha Road, New Rumuigbo, Port Harcourt, Rivers State
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-[14px] pt-[26px] text-[12px]">
          <span className="mono text-[11px] tracking-[0.02em]">
            BN 2357164 · CRBN 635769 · CAC Registered Business Name
          </span>
          <div className="flex gap-[20px] flex-wrap items-center">
            <Link href="/privacy" className="hover:text-cream-text">{dict.footer.privacyPolicy}</Link>
            <Link href="/terms" className="hover:text-cream-text">{dict.footer.termsOfUse}</Link>
            <Link href="/refund-policy" className="hover:text-cream-text">{dict.footer.refundPolicy}</Link>
            <Link href="/cookies" className="hover:text-cream-text">{dict.footer.cookiePolicy}</Link>
            <Link href="/admin" className="text-copper-light font-semibold hover:underline border-l border-rule pl-4">Admin Portal 🔒</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
