"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useEffect, useRef } from "react";

export default function Chat() {
  const { messages, sendMessage } = useChat();
  const [input, setInput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({ text: input });
    setInput("");
  };

  // Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">

      {/* Header */}
      <div className="border-b border-gray-700 p-4 text-center text-lg font-semibold">
        ChatGPT Clone
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 max-w-3xl w-full mx-auto">

        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${
              m.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-4 py-3 rounded-2xl max-w-md ${
                m.role === "user"
                  ? "bg-green-600 text-white"
                  : "bg-gray-700"
              }`}
            >
              {m.parts?.map((p, i) =>
                p.type === "text" ? <span key={i}>{p.text}</span> : null
              )}
            </div>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="border-t border-gray-700 bg-gray-800 p-4">
        <form
          onSubmit={handleSubmit}
          className="flex gap-2 max-w-3xl mx-auto"
        >
          <input
            className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
          />

          <button
            type="submit"
            className="bg-green-600 px-5 py-2 rounded-lg font-medium"
          >
            Send
          </button>
        </form>
      </div>

    </div>
  );
}