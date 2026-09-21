"use client";

import React, { useEffect, useRef, useState } from "react";

export default function LedgerCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`bg-[#0C201F] border border-copper/35 rounded-[3px] p-[28px_26px] relative reveal ${
        isVisible ? "in" : ""
      }`}
    >
      <div className="absolute top-[14px] right-[14px] bottom-[14px] left-[14px] border border-copper/18 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-[22px]">
        <span className="mono text-[11px] text-copper-light uppercase">
          Certificate of Registration
        </span>
        <span className="text-[10px] px-2.5 py-1 border border-slate-light text-[#9FC2DA] rounded-[20px] uppercase tracking-[0.1em]">
          Active
        </span>
      </div>

      <div className="flex justify-between py-[11px] border-b border-cream-text/9 text-[13px]">
        <span className="text-[#8FA39E]">Registered Name</span>
        <span className="font-mono text-cream-text text-right max-w-[56%]">
          Masters Leadership Academy
        </span>
      </div>
      <div className="flex justify-between py-[11px] border-b border-cream-text/9 text-[13px]">
        <span className="text-[#8FA39E]">Entity Type</span>
        <span className="font-mono text-cream-text text-right max-w-[56%]">
          Business Name
        </span>
      </div>
      <div className="flex justify-between py-[11px] border-b border-cream-text/9 text-[13px]">
        <span className="text-[#8FA39E]">Regulator</span>
        <span className="font-mono text-cream-text text-right max-w-[56%]">
          Corporate Affairs Commission
        </span>
      </div>
      <div className="flex justify-between py-[11px] border-b border-cream-text/9 text-[13px]">
        <span className="text-[#8FA39E]">BN No.</span>
        <span className="font-mono text-cream-text text-right max-w-[56%]">
          2357164
        </span>
      </div>
      <div className="flex justify-between py-[11px] border-b border-cream-text/9 text-[13px]">
        <span className="text-[#8FA39E]">CRBN</span>
        <span className="font-mono text-cream-text text-right max-w-[56%]">
          635769
        </span>
      </div>
      <div className="flex justify-between py-[11px] border-b border-cream-text/9 text-[13px]">
        <span className="text-[#8FA39E]">Registered</span>
        <span className="font-mono text-cream-text text-right max-w-[56%]">
          18 Aug 2015
        </span>
      </div>
      <div className="flex justify-between py-[11px] text-[13px]">
        <span className="text-[#8FA39E]">State</span>
        <span className="font-mono text-cream-text text-right max-w-[56%]">
          Rivers, Nigeria
        </span>
      </div>

      <div className="mt-[20px] pt-[18px] border-t border-dashed border-copper/30 text-[11px] text-[#8FA39E] flex items-center gap-[8px]">
        <span className="w-1.5 h-1.5 rounded-full bg-copper-light" />
        Verifiable with the Corporate Affairs Commission, Federal Republic of Nigeria
      </div>
    </div>
  );
}
