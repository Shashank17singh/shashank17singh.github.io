"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { MessageCircle, Send, X } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const API_URL = "https://portfolio-chatbot-api-cztu.onrender.com/chat";
const HEALTH_URL = "https://portfolio-chatbot-api-cztu.onrender.com/health";
const suggestions = [
  "What projects has Shashank built?",
  "What are Shashank's skills?",
  "Is Shashank open to opportunities?",
];

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I can answer questions about Shashank’s projects, skills, and experience.",
    },
  ]);
  const messagesRef = useRef<HTMLDivElement>(null);

  // NEW: Silently wake up the Render backend as soon as the portfolio loads
  useEffect(() => {
    fetch(HEALTH_URL).catch(() => console.log("Waking up AI backend..."));
  }, []);



  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  async function send(message: string) {
    const text = message.trim();
    if (!text || loading) return;
    const history = [...messages, { role: "user" as const, content: text }];
    setMessages(history);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: history.slice(-8) }),
      });
      if (!response.ok || !response.body)
        throw new Error("Chat service unavailable");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      setMessages((current) => [
        ...current,
        { role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
          const data = JSON.parse(line.slice(6)) as {
            token?: string;
            error?: string;
          };
          if (data.error) throw new Error(data.error);
          if (data.token) {
            setMessages((current) => {
              const previous = current.at(-1)?.content ?? "";
              return [
                ...current.slice(0, -1),
                { role: "assistant", content: previous + data.token },
              ];
            });
          }
        }
      }
    } catch {
      const fallback =
        "I couldn’t connect right now. Please reach out to Shashank at shashanksingh1709@gmail.com.";
      setMessages((current) =>
        current.at(-1)?.role === "assistant" && !current.at(-1)?.content
          ? [...current.slice(0, -1), { role: "assistant", content: fallback }]
          : [...current, { role: "assistant", content: fallback }],
      );
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  return (
    <div className="fixed bottom-7 right-7 z-50">
      {open && (
        <div className="absolute bottom-20 right-0 flex h-[32.5rem] w-[min(22.5rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-950 shadow-[0_24px_70px_rgba(0,0,0,0.55)]">
          <div className="flex items-center gap-3 border-b border-slate-800 bg-slate-900 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 text-sm font-bold text-slate-950">
              SS
            </div>
            <div>
              <p className="font-semibold text-white">Ask about Shashank</p>
              <p className="flex items-center gap-1 text-xs text-slate-400">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                AI assistant
              </p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="ml-auto rounded-md p-1 text-slate-400 transition hover:bg-slate-800 hover:text-white"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div
            ref={messagesRef}
            className="flex-1 space-y-3 overflow-y-auto p-4"
          >
            {messages.map((message, index) => (
              <p
                key={`${message.role}-${index}`}
                className={`max-w-[84%] whitespace-pre-wrap rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${message.role === "user" ? "ml-auto rounded-br-sm bg-gradient-to-br from-blue-500 to-cyan-400 font-medium text-slate-950" : "rounded-bl-sm border border-slate-800 bg-slate-900 text-slate-200"}`}
              >
                {message.content || "…"}
              </p>
            ))}
            {loading && (
              <div className="flex w-fit gap-1 rounded-xl rounded-bl-sm border border-slate-800 bg-slate-900 px-4 py-3">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:300ms]" />
              </div>
            )}
          </div>
          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-3">
              {suggestions.map((question) => (
                <button
                  key={question}
                  onClick={() => void send(question)}
                  className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 transition hover:border-blue-400 hover:text-blue-300"
                >
                  {question
                    .replace("What projects has Shashank built?", "Projects?")
                    .replace("What are Shashank's skills?", "Skills?")
                    .replace("Is Shashank open to opportunities?", "Hiring?")}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={submit}
            className="flex gap-2 border-t border-slate-800 bg-slate-900 p-3"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={500}
              placeholder="Ask a question..."
              className="min-w-0 flex-1 rounded-full border border-slate-700 bg-slate-950 px-4 py-2.5 text-sm text-white outline-none transition focus:border-blue-400"
            />
            <button
              disabled={loading}
              className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-slate-950 transition hover:scale-105 disabled:opacity-50"
              aria-label="Send message"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen((value) => !value)}
        className="grid h-[58px] w-[58px] place-items-center rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-slate-950 shadow-[0_8px_28px_rgba(59,130,246,0.4)] transition hover:-translate-y-1 hover:scale-105"
        aria-label="Open chat assistant"
      >
        <MessageCircle className="h-6 w-6" />
      </button>
    </div>
  );
}