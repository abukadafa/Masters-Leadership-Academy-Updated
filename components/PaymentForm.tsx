"use client";

import React, { useState } from "react";

interface PaymentFormProps {
  purpose: "donation" | "registration";
  suggestedAmounts?: number[];
  noteLabel?: string;
  noteRequired?: boolean;
}

export default function PaymentForm({
  purpose,
  suggestedAmounts,
  noteLabel,
  noteRequired,
}: PaymentFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState<string>(suggestedAmounts?.[0]?.toString() ?? "");
  const [note, setNote] = useState("");
  const [provider, setProvider] = useState<"paystack" | "flutterwave">("paystack");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, amount, provider, purpose, note }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }
      window.location.href = data.url;
    } catch {
      setError("Something went wrong. Please check your connection and try again.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 text-[13px] p-3 rounded-[2px]">
          {error}
        </div>
      )}
      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-2">Full Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
        />
      </div>
      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-2">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
        />
      </div>

      {noteLabel && (
        <div>
          <label className="block text-xs font-mono uppercase text-slate mb-2">{noteLabel}</label>
          <input
            type="text"
            required={noteRequired}
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
          />
        </div>
      )}

      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-2">Amount (NGN)</label>
        {suggestedAmounts && suggestedAmounts.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestedAmounts.map((val) => (
              <button
                type="button"
                key={val}
                onClick={() => setAmount(val.toString())}
                className={`px-3 py-1.5 text-[13px] border rounded-[2px] transition-colors ${
                  amount === val.toString()
                    ? "bg-copper text-white border-copper"
                    : "border-rule-paper text-ink-text hover:border-copper"
                }`}
              >
                ₦{val.toLocaleString()}
              </button>
            ))}
          </div>
        )}
        <input
          type="number"
          min={100}
          step="1"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full p-3 border border-rule-paper bg-paper text-[14px] text-ink-text focus:outline-none focus:border-copper"
        />
      </div>

      <div>
        <label className="block text-xs font-mono uppercase text-slate mb-2">Payment Method</label>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setProvider("paystack")}
            className={`flex-1 py-3 text-[13px] border rounded-[2px] transition-colors ${
              provider === "paystack"
                ? "bg-copper text-white border-copper"
                : "border-rule-paper text-ink-text hover:border-copper"
            }`}
          >
            Paystack
          </button>
          <button
            type="button"
            onClick={() => setProvider("flutterwave")}
            className={`flex-1 py-3 text-[13px] border rounded-[2px] transition-colors ${
              provider === "flutterwave"
                ? "bg-copper text-white border-copper"
                : "border-rule-paper text-ink-text hover:border-copper"
            }`}
          >
            Flutterwave
          </button>
        </div>
      </div>

      <button type="submit" disabled={loading} className="btn btn-copper mt-2 disabled:opacity-60">
        {loading ? "Redirecting…" : purpose === "donation" ? "Donate Now" : "Proceed to Payment"}
      </button>
    </form>
  );
}
