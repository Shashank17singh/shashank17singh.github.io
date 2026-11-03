"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react";

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

  // Wakes the sleeping Render backend as soon as the portfolio loads.
  useEffect(() => {
    fetch(HEALTH_URL).catch(() => undefined);
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
    <div className="chat">
      {open && (
        <div className="chat__panel" role="dialog" aria-label="Ask about Shashank">
          <div className="chat__head">
            <div>
              <p>Ask about Shashank</p>
              <p className="small">An AI assistant that answers from his portfolio</p>
            </div>
            <button type="button" onClick={() => setOpen(false)} className="chat__close" aria-label="Close chat">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
          <div ref={messagesRef} className="chat__log" aria-live="polite">
            {messages.map((message, index) => (
              <p key={`${message.role}-${index}`} className={message.role === "user" ? "chat__msg chat__msg--user" : "chat__msg"}>
                {message.content || "…"}
              </p>
            ))}
            {loading && <p className="chat__msg" role="status">Thinking…</p>}
          </div>
          {messages.length <= 1 && (
            <div className="chat__suggest">
              {suggestions.map((question) => (
                <button type="button" key={question} onClick={() => void send(question)}>
                  {question
                    .replace("What projects has Shashank built?", "Projects?")
                    .replace("What are Shashank's skills?", "Skills?")
                    .replace("Is Shashank open to opportunities?", "Hiring?")}
                </button>
              ))}
            </div>
          )}
          <form onSubmit={submit} className="chat__form">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              maxLength={500}
              placeholder="Ask a question"
              aria-label="Your question"
            />
            <button type="submit" disabled={loading} className="btn btn--primary" aria-label="Send message">
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
      <button type="button" onClick={() => setOpen((value) => !value)} className="chat__open" aria-expanded={open}>
        Ask about my work
      </button>
    </div>
  );
}
