"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type VerifyState = "checking" | "success" | "failed" | "error";

function CallbackContent() {
  const params = useSearchParams();
  const [state, setState] = useState<VerifyState>("checking");
  const [purpose, setPurpose] = useState<string>("");
  const [amount, setAmount] = useState<number | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const provider = params.get("provider");
    const reference = params.get("reference") || params.get("tx_ref");
    const transactionId = params.get("transaction_id");

    if (!provider || !reference) {
      const timer = setTimeout(() => {
        setState("error");
        setErrorMsg("Missing payment reference in the redirect URL.");
      }, 0);
      return () => clearTimeout(timer);
    }

    const qs = new URLSearchParams({ provider, reference });
    if (transactionId) qs.set("transaction_id", transactionId);

    fetch(`/api/payments/verify?${qs.toString()}`)
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          setState("error");
          setErrorMsg(data.error || "Could not verify payment.");
          return;
        }
        setPurpose(data.purpose);
        setAmount(data.amount);
        setState(data.status === "success" ? "success" : "failed");
      })
      .catch(() => {
        setState("error");
        setErrorMsg("Something went wrong while verifying the payment.");
      });
  }, [params]);

  return (
    <div className="bg-paper py-24 min-h-[50vh]">
      <div className="max-w-[560px] mx-auto px-8 text-center">
        {state === "checking" && (
          <>
            <div className="text-[14px] font-mono uppercase tracking-[0.1em] text-slate mb-4">
              Verifying Payment
            </div>
            <p className="text-muted-paper">Please wait while we confirm your transaction…</p>
          </>
        )}

        {state === "success" && (
          <>
            <div className="text-[14px] font-mono uppercase tracking-[0.1em] text-copper mb-4">
              Payment Successful
            </div>
            <h1 className="text-[28px] font-serif text-ink-text mb-4">Thank you!</h1>
            <p className="text-muted-paper mb-8">
              {purpose === "donation"
                ? `Your donation of ₦${amount?.toLocaleString()} was received. We're grateful for your support.`
                : `Your registration fee of ₦${amount?.toLocaleString()} was received. We'll be in touch with next steps.`}
            </p>
            <Link href="/" className="btn btn-copper">
              Return Home
            </Link>
          </>
        )}

        {state === "failed" && (
          <>
            <div className="text-[14px] font-mono uppercase tracking-[0.1em] text-red-600 mb-4">
              Payment Not Completed
            </div>
            <p className="text-muted-paper mb-8">
              Your transaction was not successful. No charge should have been made — please try again.
            </p>
            <Link href="/donate" className="btn btn-outline-dark">
              Try Again
            </Link>
          </>
        )}

        {state === "error" && (
          <>
            <div className="text-[14px] font-mono uppercase tracking-[0.1em] text-red-600 mb-4">
              Verification Error
            </div>
            <p className="text-muted-paper mb-8">{errorMsg}</p>
            <Link href="/contact" className="btn btn-outline-dark">
              Contact Us
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentCallbackPage() {
  return (
    <React.Suspense fallback={null}>
      <CallbackContent />
    </React.Suspense>
  );
}
