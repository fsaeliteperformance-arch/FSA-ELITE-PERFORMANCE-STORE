/**
 * AIChatWidget — floating AI assistant for the FSA Elite Performance Store
 *
 * Performance / UX notes
 * ----------------------
 * • The panel is kept in the DOM (hidden via CSS) so it doesn't lose scroll
 *   position when toggled.
 * • Messages are stored in component state; no external store needed.
 * • The input is disabled while the request is in-flight to prevent duplicate
 *   sends.
 * • Auto-scrolls to the latest message after each update.
 */
"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hey! I'm your FSA Elite Performance AI coach 🔥 Ask me anything — product recommendations, sales tips, or anything about the community.",
};

export default function AIChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Scroll to latest message whenever the list changes.
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when the panel opens.
  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: Message = { role: "user", content: text };
    const next = [...messages, userMessage];
    setMessages(next);
    setInput("");
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.filter((m) => m.role !== "assistant" || next.indexOf(m) > 0),
        }),
      });

      const data = (await res.json()) as { message?: string; error?: string };

      if (!res.ok || data.error) {
        setError(data.error ?? "Something went wrong. Please try again.");
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message ?? "" },
        ]);
      }
    } catch {
      setError("Could not reach the AI service. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, [input, loading, messages]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void sendMessage();
      }
    },
    [sendMessage],
  );

  return (
    <>
      {/* Chat panel */}
      <div
        aria-label="FSA Elite AI assistant chat panel"
        className={`fixed bottom-20 right-4 sm:right-6 z-50 flex flex-col w-80 sm:w-96 rounded-2xl shadow-2xl overflow-hidden border border-brand/20 transition-all duration-300 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{ maxHeight: "70vh" }}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between bg-brand px-4 py-3 flex-shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-lg" aria-hidden>
              🤖
            </span>
            <div>
              <p className="text-white font-bold text-sm leading-tight">
                FSA Elite AI
              </p>
              <p className="text-white/60 text-xs">Your performance coach</p>
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close AI assistant"
            className="text-white/70 hover:text-white transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto bg-white px-4 py-3 space-y-3 min-h-0">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-3 py-2 text-sm leading-relaxed ${
                  msg.role === "user"
                    ? "bg-brand text-white rounded-br-sm"
                    : "bg-brand-light text-gray-800 rounded-bl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="bg-brand-light rounded-xl rounded-bl-sm px-3 py-2 text-sm text-gray-500">
                <span className="inline-flex gap-1">
                  <span className="animate-bounce [animation-delay:0ms]">•</span>
                  <span className="animate-bounce [animation-delay:150ms]">•</span>
                  <span className="animate-bounce [animation-delay:300ms]">•</span>
                </span>
              </div>
            </div>
          )}

          {error && (
            <p className="text-xs text-brand-accent text-center px-2">{error}</p>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input area */}
        <div className="flex-shrink-0 bg-white border-t border-gray-100 px-3 py-2 flex items-end gap-2">
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything…"
            rows={1}
            disabled={loading}
            className="flex-1 resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand disabled:opacity-50 max-h-28 overflow-y-auto"
            style={{ lineHeight: "1.4" }}
          />
          <button
            onClick={() => void sendMessage()}
            disabled={loading || !input.trim()}
            aria-label="Send message"
            className="flex-shrink-0 bg-brand-accent text-white rounded-lg w-9 h-9 flex items-center justify-center hover:bg-brand-accent/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 rotate-90"
              aria-hidden
            >
              <path d="M3.105 2.289a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.896 28.896 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.289Z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close AI assistant" : "Open AI assistant"}
        aria-expanded={open}
        className="fixed bottom-4 right-4 sm:right-6 z-50 bg-brand-accent text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-brand-accent/90 hover:scale-105 active:scale-95 transition-all"
      >
        {open ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
            aria-hidden
          >
            <path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-6 h-6"
            aria-hidden
          >
            <path
              fillRule="evenodd"
              d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902.848.137 1.705.248 2.57.331v3.443a.75.75 0 0 0 1.28.53l3.58-3.579a.78.78 0 0 1 .527-.224 41.202 41.202 0 0 0 5.183-.5c1.437-.232 2.43-1.49 2.43-2.903V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0 0 10 2Zm0 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM8 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
    </>
  );
}
