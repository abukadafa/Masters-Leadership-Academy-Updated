import React from "react";
import PageHero from "@/components/PageHero";
import CmsGridSlot from "@/components/CmsGridSlot";

const categories = [
  { title: "Programme Brochures", desc: "Overviews for each Academy training track." },
  { title: "Sponsorship Prospectus", desc: "Sponsorship tiers and packages for flagship conferences." },
  { title: "Corporate Training One-Pager", desc: "Summary of our Technical Services engagement model." },
  { title: "Registration Certificate", desc: "CAC registration record, available on request." },
];

export const metadata = {
  title: "Resources Centre",
  description: "Downloadable guides, templates, and materials from Masters Leadership Academy.",
};

export default function ResourcesPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Downloads"
          title="Resources Centre"
          description="Brochures, prospectuses and reference documents. Files appear here as they are prepared and approved for public download."
        />

        <div className="border-t border-rule-paper pt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <div key={cat.title} className="flex flex-col gap-3">
                <CmsGridSlot label="No file uploaded yet." className="min-h-[120px]" />
                <div>
                  <div className="font-serif text-[15px] text-ink-text mb-1">{cat.title}</div>
                  <div className="text-[12px] text-muted-paper leading-relaxed">{cat.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
