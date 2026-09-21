"use client";

import React, { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Message = {
  role: "assistant",
  content:
    "Hi! I'm the Masters Leadership Academy assistant. Ask me about our seminars, conferences, registration, donations, or anything else on the site.",
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages([...next, { role: "assistant", content: data.error || "Something went wrong." }]);
      } else {
        setMessages([...next, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages([
        ...next,
        { role: "assistant", content: "Something went wrong. Please try again or use the Contact page." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="fixed z-50 bottom-24 right-6 w-[min(360px,calc(100vw-3rem))] h-[min(480px,calc(100vh-10rem))] bg-paper border border-rule-paper rounded-[6px] shadow-2xl flex flex-col overflow-hidden">
          <div className="bg-ink text-cream-text px-4 py-3 flex items-center justify-between shrink-0">
            <span className="font-serif text-[15px]">Academy Assistant</span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-cream-text/80 hover:text-cream-text text-lg leading-none"
            >
              ✕
            </button>
          </div>
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-paper-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] text-[13px] leading-relaxed p-3 rounded-[4px] ${
                  m.role === "user"
                    ? "self-end bg-copper text-white"
                    : "self-start bg-paper border border-rule-paper text-ink-text"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="self-start bg-paper border border-rule-paper text-muted-paper text-[13px] p-3 rounded-[4px]">
                Typing…
              </div>
            )}
          </div>
          <form onSubmit={send} className="flex border-t border-rule-paper shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 px-4 py-3 text-[13px] bg-paper text-ink-text focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="px-4 text-copper font-semibold text-[13px] disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="chat-fab fixed z-50 w-14 h-14 rounded-full bg-ink text-cream-text flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
      >
        {open ? (
          <span className="text-2xl leading-none">✕</span>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M12 2C6.477 2 2 5.94 2 10.8c0 2.68 1.39 5.08 3.58 6.7-.12.98-.46 2.34-1.36 3.7-.16.24.03.56.32.53 1.9-.2 3.5-.95 4.6-1.64.9.24 1.86.37 2.86.37 5.523 0 10-3.94 10-8.8S17.523 2 12 2z" />
          </svg>
        )}
      </button>
    </>
  );
}
