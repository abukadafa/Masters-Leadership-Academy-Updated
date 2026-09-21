import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

const SYSTEM_PROMPT = `You are the friendly, concise FAQ assistant embedded on the Masters Leadership Academy website.

About the Academy:
- Masters Leadership Academy organises seminars, symposiums, conferences and provides technical services.
- Registered with the Corporate Affairs Commission of Nigeria (CAC), Business Name BN 2357164, CRBN 635769.
- Established 2015. Based in Port Harcourt, Rivers State, Nigeria (Plot 4Y2K Crescent, off Tony Okocha Road, New Rumuigbo).
- Key site sections you can point visitors to: /about, /services, /programmes, /events, /media, /leadership,
  /register (join the interest list or pay a confirmed registration fee), /donate (make a donation),
  /corporate-training, /partnerships, /contact, /verify-certificate, /faq.
- Payments (donations and confirmed registration fees) are accepted via Paystack or Flutterwave on /donate and /register.
- Instagram: https://www.instagram.com/masters_leadership_academy/

Rules:
- Be brief and warm — 2-4 sentences per answer unless more detail is truly needed.
- If you don't know something specific (exact prices, dates, staff names not listed on the site), say so honestly
  and direct the visitor to /contact or the relevant page rather than guessing.
- Never invent programme names, dates, or fees that haven't been confirmed on the site.
- You are not able to process payments or registrations yourself — direct visitors to the right page to do that.`;

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export async function POST(req: NextRequest) {
  if (!checkRateLimit(req, "chatbot", { limit: 20, windowMs: 10 * 60 * 1000 })) {
    return NextResponse.json({ error: "Too many messages. Please wait a moment and try again." }, { status: 429 });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "The chat assistant isn't configured yet. Please use the Contact page instead." },
      { status: 503 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const messages = Array.isArray(body.messages) ? body.messages.slice(-12) : [];
  if (messages.length === 0) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }
  for (const m of messages) {
    if (typeof m.content !== "string" || m.content.length > 2000) {
      return NextResponse.json({ error: "Message too long." }, { status: 400 });
    }
  }

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages: messages.map((m) => ({ role: m.role, content: m.content })),
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json(
        { error: data.error?.message || "The chat assistant is temporarily unavailable." },
        { status: 502 }
      );
    }

    const text =
      data.content?.find((block: { type: string; text?: string }) => block.type === "text")?.text ||
      "I'm not sure how to answer that — please try the Contact page.";

    return NextResponse.json({ reply: text });
  } catch {
    return NextResponse.json({ error: "The chat assistant is temporarily unavailable." }, { status: 502 });
  }
}
