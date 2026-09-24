"use client";

import React, { useEffect, useRef, useState } from "react";
import { useLanguage } from "./LanguageProvider";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatWidget() {
  const { locale } = useLanguage();
  const isFrench = locale === "fr";

  const greetingText = isFrench
    ? "Bonjour ! Je suis l'assistant de Masters Leadership Academy. Comment puis-je vous renseigner sur nos séminaires, nos cohortes, nos bureaux à Utako (Abuja) ou les inscriptions ?"
    : "Hello! I am the Masters Leadership Academy advisory assistant. How can I help you today regarding our seminars, cohort enrollment, Utako Abuja office, or corporate advisory?";

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: greetingText },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Update greeting if language switches
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ role: "assistant", content: greetingText }];
      }
      return prev;
    });
  }, [greetingText]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  const sendQuery = async (queryText: string) => {
    const text = queryText.trim();
    if (!text || loading) return;

    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, locale }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMessages([
          ...next,
          {
            role: "assistant",
            content:
              data.error ||
              (isFrench
                ? "Désolé, une erreur est survenue. Veuillez contacter notre bureau au +234 811 464 6340."
                : "Sorry, an issue occurred. Please contact our corporate office at +234 811 464 6340."),
          },
        ]);
      } else {
        setMessages([...next, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages([
        ...next,
        {
          role: "assistant",
          content: isFrench
            ? "Impossible de joindre le serveur. Contactez-nous à mastersleadershipacademy@gmail.com ou au +234 811 464 6340."
            : "Unable to reach server. Please email mastersleadershipacademy@gmail.com or call +234 811 464 6340.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuery(input);
  };

  const quickPrompts = isFrench
    ? [
        "Où se trouve votre bureau ?",
        "Comment s'inscrire ?",
        "Quels sont vos séminaires ?",
        "Qui sont les dirigeants ?",
      ]
    : [
        "Where is your office located?",
        "How do I register for a seminar?",
        "What programmes are open?",
        "Who is on the Leadership Council?",
      ];

  return (
    <>
      {open && (
        <div className="fixed z-50 bottom-24 right-4 sm:right-6 w-[min(380px,calc(100vw-2rem))] h-[min(520px,calc(100vh-8rem))] bg-white border border-slate-200/90 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="bg-emerald-900 text-white px-5 py-4 flex items-center justify-between shrink-0 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-emerald-300 font-serif font-bold text-base">
                M
              </div>
              <div>
                <div className="font-serif font-bold text-[15px] leading-tight text-white flex items-center gap-2">
                  <span>Academy Advisory</span>
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <div className="text-[11px] text-emerald-200 font-mono">
                  {isFrench ? "En ligne · Réponse instantanée" : "Online · Instant Response"}
                </div>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="text-white/70 hover:text-white text-xl leading-none p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Messages Body */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 bg-slate-50/70">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`max-w-[85%] text-[13px] leading-relaxed p-3.5 rounded-2xl shadow-2xs ${
                  m.role === "user"
                    ? "self-end bg-emerald-700 text-white rounded-br-xs"
                    : "self-start bg-white border border-slate-200 text-slate-800 rounded-bl-xs"
                }`}
              >
                {m.content}
              </div>
            ))}
            {loading && (
              <div className="self-start bg-white border border-slate-200 text-slate-600 text-xs p-3 rounded-2xl flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-bounce [animation-delay:0.4s]" />
                <span className="font-mono">{isFrench ? "Réflexion en cours…" : "Consulting records…"}</span>
              </div>
            )}
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto shrink-0 no-scrollbar">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => sendQuery(p)}
                className="whitespace-nowrap text-[11px] font-semibold text-slate-700 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-300 border border-slate-200 px-2.5 py-1 rounded-full transition-colors cursor-pointer shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2.5 bg-white border-t border-slate-200 shrink-0">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isFrench ? "Posez une question sur l'Académie…" : "Ask about seminars, fees, office…"}
              className="flex-1 px-3.5 py-2.5 text-[13px] bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-emerald-600 focus:bg-white transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label="Send message"
              className="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-xl disabled:opacity-40 transition-all shadow-xs shrink-0 cursor-pointer"
            >
              {isFrench ? "Envoyer" : "Send"}
            </button>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="chat-fab fixed z-50 w-14 h-14 rounded-full bg-emerald-700 text-white flex items-center justify-center shadow-xl hover:shadow-2xl hover:bg-emerald-800 hover:scale-105 active:scale-95 transition-all cursor-pointer group"
      >
        {open ? (
          <span className="text-2xl leading-none font-bold">✕</span>
        ) : (
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2C6.477 2 2 5.94 2 10.8c0 2.68 1.39 5.08 3.58 6.7-.12.98-.46 2.34-1.36 3.7-.16.24.03.56.32.53 1.9-.2 3.5-.95 4.6-1.64.9.24 1.86.37 2.86.37 5.523 0 10-3.94 10-8.8S17.523 2 12 2z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 border-2 border-white rounded-full" />
          </div>
        )}
      </button>
    </>
  );
}
