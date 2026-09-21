import React from "react";
import Link from "next/link";
import { cookies } from "next/headers";
import EmptyState from "@/components/EmptyState";
import CmsGridSlot from "@/components/CmsGridSlot";
import CurrencySwitcher from "@/components/CurrencySwitcher";
import { formatCurrency, CURRENCY_COOKIE, type CurrencyCode } from "@/lib/locale";

const categories = [
  {
    name: "Seminars & Symposiums",
    desc: "Thematic, short-format sessions for public sector, corporate and community leadership.",
  },
  {
    name: "Conferences",
    desc: "Full-scale professional conferences bringing together industry leaders.",
  },
  {
    name: "Technical Services",
    desc: "Advisory, research and curriculum-design engagements for institutional capacity building.",
  },
];

export const metadata = {
  title: "Programmes",
  description: "Leadership training programmes offered by Masters Leadership Academy.",
};

export default async function ProgrammesPage() {
  const store = await cookies();
  const currency = (store.get(CURRENCY_COOKIE)?.value as CurrencyCode) || "NGN";
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <div className="max-w-[800px] mb-12">
          <span className="eyebrow text-slate mb-4">Programme Catalogue</span>
          <h1 className="text-[36px] md:text-[48px] font-serif leading-tight text-ink-text mb-6">
            Leadership development tracks &amp; curriculum
          </h1>
          <p className="text-[18px] text-muted-paper leading-relaxed">
            Every programme published here maps to one of the Academy&apos;s three registered service lines. Specific
            programme names, curricula and dates were not included on the registration certificate, so the
            catalogue is empty until real programmes are confirmed.
          </p>
        </div>

        <div className="border-t border-rule-paper pt-12 flex flex-col gap-14">
          <div className="bg-paper-2 border border-rule-paper/50 p-6 rounded-[2px] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-mono text-[11px] text-copper uppercase tracking-wider block mb-1">
                Pricing & Currency
              </span>
              <p className="text-[13px] text-muted-paper max-w-[54ch] leading-relaxed">
                Once fees are confirmed for a programme, they will display in your selected currency automatically.
                Example only — <strong>{formatCurrency(150000, currency)}</strong> is not a real fee.
              </p>
            </div>
            <CurrencySwitcher current={currency} />
          </div>

          {categories.map((cat) => (
            <div key={cat.name}>
              <div className="flex items-baseline justify-between gap-4 mb-5">
                <h2 className="text-[22px] font-serif text-ink-text">{cat.name}</h2>
                <span className="text-[13px] text-muted-paper hidden sm:block">{cat.desc}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <CmsGridSlot label="No programme published in this track yet." />
                <CmsGridSlot label="No programme published in this track yet." />
                <CmsGridSlot label="No programme published in this track yet." />
              </div>
            </div>
          ))}

          <div className="border-t border-rule-paper pt-12">
            <EmptyState
              title="Looking for a specific programme?"
              description="The detail-page template is built and ready — visit Corporate Training to request a tailored programme, or join the interest list to be notified when the catalogue goes live."
              theme="light"
            />
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/register" className="btn btn-copper">
                Register Interest
              </Link>
              <Link href="/corporate-training" className="btn btn-outline-ink">
                Request Corporate Training
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
