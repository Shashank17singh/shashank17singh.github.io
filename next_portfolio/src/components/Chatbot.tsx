"use client";

import { FormEvent, useState } from "react";

type Message = { role: "user" | "assistant"; content: string };

const API_URL = "https://portfolio-chatbot-api-cztu.onrender.com/chat";

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  async function send(message: string) {
    const text = message.trim();
    if (!text || loading) return;
    const history = [...messages, { role: "user" as const, content: text }];
    setMessages(history);
    setInput("");
    setLoading(true);
    try {
      const response = await fetch(API_URL, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: text, history: history.slice(-8) }) });
      if (!response.ok || !response.body) throw new Error("Chat service unavailable");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      setMessages((current) => [...current, { role: "assistant", content: "" }]);
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";
        for (const line of lines) {
          if (!line.startsWith("data: ") || line === "data: [DONE]") continue;
          const data = JSON.parse(line.slice(6)) as { token?: string; error?: string };
          if (data.error) throw new Error(data.error);
          if (data.token) {
            setMessages((current) => {
              const previous = current.at(-1)?.content ?? "";
              return [...current.slice(0, -1), { role: "assistant", content: previous + data.token }];
            });
          }
        }
      }
    } catch {
      setMessages((current) => [...current, { role: "assistant", content: "I couldn’t connect right now. Please reach out to Shashank at shashanksingh1709@gmail.com." }]);
    } finally {
      setLoading(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) { event.preventDefault(); void send(input); }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {open && <div className="mb-3 flex h-[32rem] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-slate-950 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 px-4 py-3"><div><p className="font-semibold text-white">Ask about Shashank</p><p className="text-xs text-blue-400">AI assistant</p></div><button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white" aria-label="Close chat">×</button></div>
        <div className="flex-1 space-y-3 overflow-y-auto p-4">{messages.length === 0 && <><p className="rounded-xl border border-slate-800 bg-slate-900 p-3 text-sm text-slate-300">Hi! I can answer questions about Shashank’s projects, skills, and experience.</p><div className="flex flex-wrap gap-2">{["What projects has Shashank built?", "What are Shashank’s skills?", "Is Shashank open to opportunities?"].map((question) => <button key={question} onClick={() => void send(question)} className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-blue-500">{question}</button>)}</div></>}{messages.map((message, index) => <p key={`${message.role}-${index}`} className={`max-w-[85%] rounded-xl p-3 text-sm leading-relaxed ${message.role === "user" ? "ml-auto bg-blue-600 text-white" : "border border-slate-800 bg-slate-900 text-slate-200"}`}>{message.content || "…"}</p>)}{loading && <p className="text-xs text-slate-500">Thinking…</p>}</div>
        <form onSubmit={submit} className="flex gap-2 border-t border-slate-800 p-3"><input value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} placeholder="Ask a question…" className="min-w-0 flex-1 rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm text-white outline-none focus:border-blue-500" /><button disabled={loading} className="rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white disabled:opacity-50">Send</button></form>
      </div>}
      <button onClick={() => setOpen((value) => !value)} className="rounded-full bg-blue-600 px-5 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-500" aria-label="Open chat assistant">Chat</button>
    </div>
  );
}
