import React from "react";
import VideoPlayer from "@/components/VideoPlayer";
import CmsGridSlot from "@/components/CmsGridSlot";
import PageHero from "@/components/PageHero";
import SectionTabs from "@/components/SectionTabs";

function VideoTab() {
  const reels = [
    {
      id: "2698414743821235",
      title: "Academy Seminar Highlight — Executive Leadership",
      url: "https://www.facebook.com/reel/2698414743821235/",
    },
    {
      id: "2692216317774411",
      title: "Symposium Session — Strategy & Vision",
      url: "https://www.facebook.com/reel/2692216317774411/",
    },
    {
      id: "2686824098313633",
      title: "Leadership Interactive Group Discussion",
      url: "https://www.facebook.com/reel/2686824098313633/",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-8">
      <div>
        <h2 className="text-[22px] font-serif text-ink-text mb-4">Featured Video</h2>
        <VideoPlayer />
      </div>
      <div>
        <h2 className="text-[22px] font-serif text-ink-text mb-4">More Footage</h2>
        <div className="flex flex-col gap-4">
          {reels.map((reel, index) => (
            <a
              key={reel.id}
              href={reel.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex gap-4 p-3 bg-paper-2 border border-rule-paper/60 hover:border-copper rounded-[3px] group transition-all text-left"
            >
              <div className="w-16 aspect-[9/16] relative bg-black shrink-0 overflow-hidden rounded-[2px]">
                <img
                  src="/facebook_video_thumb.jpg"
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover:bg-black/10 transition-colors">
                  <span className="w-6 h-6 rounded-full bg-copper/90 text-white flex items-center justify-center text-[10px]">▶</span>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <span className="font-mono text-[9px] text-copper uppercase tracking-wider mb-1">Facebook Reel 0{index + 1}</span>
                <h4 className="font-serif text-[14px] text-ink-text font-medium leading-tight group-hover:text-copper transition-colors">
                  {reel.title}
                </h4>
                <p className="text-[12px] text-muted-paper mt-1">Watch reel on Facebook ↗</p>
              </div>
            </a>
          ))}
        </div>
        <div className="mt-6 text-center lg:text-left">
          <a
            href="https://www.facebook.com/LeadMastersAcademy/reels/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-ink inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
            </svg>
            Watch Reels on Facebook
          </a>
        </div>
      </div>
    </div>
  );
}

function AudioTab() {
  return (
    <div>
      <p className="text-muted-paper text-[14px] mb-6 max-w-[64ch] leading-relaxed">
        Audio recordings from seminars, keynote addresses and technical briefings will be published here once supplied by the Academy.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CmsGridSlot label="No audio recording uploaded yet." />
        <CmsGridSlot label="No audio recording uploaded yet." />
        <CmsGridSlot label="No audio recording uploaded yet." />
      </div>
    </div>
  );
}

function PodcastsTab() {
  return (
    <div>
      <p className="text-muted-paper text-[14px] mb-6 max-w-[64ch] leading-relaxed">
        No Academy podcast series has been recorded or supplied yet. Episode titles, hosts, show notes and a hosted feed link will appear here once available.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <CmsGridSlot label="Episode slot — not yet published." />
        <CmsGridSlot label="Episode slot — not yet published." />
        <CmsGridSlot label="Episode slot — not yet published." />
      </div>
    </div>
  );
}

function GalleryTab() {
  return (
    <div>
      <p className="text-muted-paper text-[14px] mb-6 max-w-[64ch] leading-relaxed">
        Seminar and conference photography from Academy sessions. Featuring real moments captured during our leadership programmes.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Real photo 1 */}
        <div className="relative bg-paper-2 border border-rule-paper flex flex-col min-h-[220px] rounded-[2px] overflow-hidden group">
          <img
            src="/facebook_photo_1.jpg"
            alt="Masters Leadership Academy Programme"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-ink/40 opacity-90 group-hover:opacity-75 transition-opacity" />
          <div className="absolute bottom-4 left-5 right-5 z-10 text-left">
            <span className="font-mono text-[10px] text-copper-light uppercase tracking-wider block mb-1">
              Programme Session
            </span>
            <h3 className="font-serif text-[17px] text-cream-text font-medium leading-tight">
              Leadership Decision Protocol Workshop
            </h3>
            <p className="text-xs text-[#AEC0BB] mt-1">Interactive leadership training and executive development briefing.</p>
          </div>
        </div>

        {/* Placeholders */}
        <CmsGridSlot label="Photo Slot — add real session photo" className="min-h-[220px]" />
        <CmsGridSlot label="Photo Slot — add real session photo" className="min-h-[220px]" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <CmsGridSlot key={i} label="Photo slot" className="min-h-[120px]" />
        ))}
      </div>

      <div className="mt-8 text-center">
        <a
          href="https://www.facebook.com/LeadMastersAcademy/photos"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-ink inline-flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
          </svg>
          View Facebook Photo Gallery
        </a>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Media",
  description: "Photos, video, and press coverage from Masters Leadership Academy events and programmes.",
};

export default function MediaPage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Media Centre"
          title="The Academy in Action"
          description="Video, audio, podcasts and photography from our training seminars, leadership conferences, and technical service projects."
        />

        <div className="border-t border-rule-paper pt-12">
          <SectionTabs
            tabs={[
              { id: "video", label: "Video", content: <VideoTab /> },
              { id: "audio", label: "Audio", content: <AudioTab /> },
              { id: "podcasts", label: "Podcasts", content: <PodcastsTab /> },
              { id: "gallery", label: "Gallery", content: <GalleryTab /> },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
