import React from "react";
import PageHero from "@/components/PageHero";
import PaymentForm from "@/components/PaymentForm";

export default function DonatePage() {
  return (
    <div className="bg-paper py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        <PageHero
          eyebrow="Support Our Work"
          title="Make a Donation"
          description="Your donation helps Masters Leadership Academy expand access to seminars, conferences and technical training. Choose an amount and pay securely via Paystack or Flutterwave."
        />

        <div className="border-t border-rule-paper pt-12 max-w-[520px]">
          <div className="bg-paper-2 border border-rule-paper/60 p-8 rounded-[3px]">
            <h2 className="text-[20px] font-serif text-ink-text mb-6">Donation Details</h2>
            <PaymentForm
              purpose="donation"
              suggestedAmounts={[5000, 10000, 25000, 50000]}
              noteLabel="Message (optional)"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
