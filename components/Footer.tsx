import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/lib/i18n/dictionaries/types";
import type { Locale } from "@/lib/i18n/config";
import SocialLinks from "@/components/SocialLinks";

export default function Footer({ dict }: { dict: Dictionary; locale: Locale }) {
  return (
    <footer className="bg-[#0b1324] text-slate-400 py-16 border-t border-slate-800 mt-auto">
      <div className="max-w-[1240px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-slate-800/80">
          <div className="foot-brand lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 relative shrink-0 bg-white rounded-xl p-1.5 shadow-sm border border-slate-700">
                <Image src="/logo.jpg" alt="Masters Leadership Academy logo" fill sizes="52px" className="object-contain rounded-lg" />
              </div>
              <div>
                <span className="brand-name font-serif text-white text-lg sm:text-xl font-extrabold tracking-tight block leading-tight">
                  Masters Leadership Academy
                </span>
                <span className="font-mono text-[11px] text-emerald-400 uppercase tracking-widest font-semibold">
                  Equipping Leaders &amp; Institutions
                </span>
              </div>
            </div>
            <p className="text-[13px] text-slate-300 leading-relaxed max-w-[36ch]">
              Building a leadership lifestyle with lasting impact across generations through strategic insight and measurable outcomes.
            </p>

            <div className="flex flex-col gap-2 mt-2 text-[13px]">
              <div className="flex items-start gap-2.5 text-slate-300">
                <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>36 Moses Majekodunmi Street, Utako, Abuja, FCT</span>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+2348114646340" className="hover:text-emerald-400 transition-colors">+234 811 464 6340</a>
              </div>
              <div className="flex items-center gap-2.5 text-slate-300">
                <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:mastersleadershipacademy@gmail.com" className="hover:text-emerald-400 transition-colors">mastersleadershipacademy@gmail.com</a>
              </div>
            </div>

            <div className="mt-3">
              <h5 className="text-[11px] text-amber-400 uppercase tracking-widest font-semibold mb-2">
                {dict.footer.followUs}
              </h5>
              <SocialLinks label={dict.footer.followUs} />
            </div>
          </div>

          <div className="foot-col">
            <h5 className="text-[12px] text-amber-400 uppercase tracking-wider font-semibold mb-4">
              {dict.footer.explore}
            </h5>
            <Link href="/about" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.nav.about}</Link>
            <Link href="/services" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.nav.services}</Link>
            <Link href="/programmes" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.nav.programmes}</Link>
            <Link href="/events" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.nav.events}</Link>
            <Link href="/corporate-training" className="block text-[13px] mb-2 hover:text-white transition-colors">Corporate Training</Link>
          </div>

          <div className="foot-col">
            <h5 className="text-[12px] text-amber-400 uppercase tracking-wider font-semibold mb-4">
              {dict.footer.mediaKnowledge}
            </h5>
            <Link href="/media" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.nav.media}</Link>
            <Link href="/knowledge-centre" className="block text-[13px] mb-2 hover:text-white transition-colors">Knowledge Centre</Link>
            <Link href="/testimonials" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.footer.testimonials}</Link>
            <Link href="/resources" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.footer.resources}</Link>
          </div>

          <div className="foot-col">
            <h5 className="text-[12px] text-amber-400 uppercase tracking-wider font-semibold mb-4">
              {dict.footer.company}
            </h5>
            <Link href="/leadership" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.footer.leadership}</Link>
            <Link href="/clients" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.footer.clients}</Link>
            <Link href="/partnerships" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.footer.partnerships}</Link>
            <Link href="/careers" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.footer.careers}</Link>
            <Link href="/contact" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.nav.contact}</Link>
          </div>

          <div className="foot-col">
            <h5 className="text-[12px] text-amber-400 uppercase tracking-wider font-semibold mb-4">
              {dict.footer.getInvolved}
            </h5>
            <Link href="/register" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.footer.registration}</Link>
            <Link href="/donate" className="block text-[13px] mb-2 hover:text-white transition-colors">Donate</Link>
            <Link href="/verify-certificate" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.footer.verifyCertificate}</Link>
            <Link href="/faq" className="block text-[13px] mb-2 hover:text-white transition-colors">{dict.footer.faq}</Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 pt-6 text-[12px]">
          <span className="mono text-[11px] text-slate-300 tracking-wide font-medium">
            BN 2357164 · CRBN 635769 · CAC Registered Business Name · Utako, Abuja
          </span>
          <div className="flex gap-5 flex-wrap items-center">
            <Link href="/privacy" className="hover:text-white transition-colors">{dict.footer.privacyPolicy}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{dict.footer.termsOfUse}</Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">{dict.footer.refundPolicy}</Link>
            <Link href="/cookies" className="hover:text-white transition-colors">{dict.footer.cookiePolicy}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
