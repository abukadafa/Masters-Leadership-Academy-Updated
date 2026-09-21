import React from "react";
import CmsGridSlot from "@/components/CmsGridSlot";
import PageHero from "@/components/PageHero";
import SectionTabs from "@/components/SectionTabs";

function Grid({ label }: { label: string }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <CmsGridSlot key={i} label={label} />
      ))}
    </div>
  );
}

export const metadata = {
  title: "Knowledge Centre",
  description: "Articles, insights, and guidance on leadership from Masters Leadership Academy.",
};

export default function KnowledgeCentrePage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Knowledge Centre"
          title="Articles, research & publications"
          description="Thought leadership and technical output from Masters Leadership Academy — published here as it is produced."
        />

        <div className="border-t border-rule-paper pt-12">
          <SectionTabs
            tabs={[
              { id: "articles", label: "Articles", content: <Grid label="No article published yet." /> },
              { id: "research", label: "Research", content: <Grid label="No research output published yet." /> },
              { id: "reports", label: "Reports", content: <Grid label="No report published yet." /> },
              { id: "publications", label: "Publications", content: <Grid label="No publication uploaded yet." /> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
