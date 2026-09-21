import { NextRequest, NextResponse } from "next/server";
import { payments } from "@/lib/models";
import { verifyFlutterwave, verifyPaystack } from "@/lib/payments";

export async function GET(req: NextRequest) {
  const provider = req.nextUrl.searchParams.get("provider");
  const reference = req.nextUrl.searchParams.get("reference");
  // Flutterwave's redirect appends its own numeric transaction_id alongside our tx_ref.
  const transactionId = req.nextUrl.searchParams.get("transaction_id");

  if (!provider || !reference) {
    return NextResponse.json({ error: "Missing provider or reference." }, { status: 400 });
  }

  const record = payments.findByReference(reference);
  if (!record) {
    return NextResponse.json({ error: "Unknown payment reference." }, { status: 404 });
  }

  // Already confirmed previously — return the cached result instead of re-verifying.
  if (record.status === "success") {
    return NextResponse.json({ status: "success", purpose: record.purpose, amount: record.amount });
  }

  try {
    if (provider === "paystack") {
      const { success } = await verifyPaystack(reference);
      payments.updateStatus(reference, success ? "success" : "failed");
      return NextResponse.json({
        status: success ? "success" : "failed",
        purpose: record.purpose,
        amount: record.amount,
      });
    }

    if (provider === "flutterwave") {
      if (!transactionId) {
        return NextResponse.json({ error: "Missing Flutterwave transaction_id." }, { status: 400 });
      }
      const { success } = await verifyFlutterwave(transactionId, reference);
      payments.updateStatus(reference, success ? "success" : "failed");
      return NextResponse.json({
        status: success ? "success" : "failed",
        purpose: record.purpose,
        amount: record.amount,
      });
    }

    return NextResponse.json({ error: "Unsupported payment provider." }, { status: 400 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Verification failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
