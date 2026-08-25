"use client";

import {
  Bot,
  BriefcaseBusiness,
  Mic,
  Send,
  Sparkles,
  User
} from "lucide-react";
import { useState } from "react";

export default function AIAssistantPage() {
  const [message, setMessage] = useState("");

  const messages = [
    {
      sender: "ai",
      text: "👋 Namaste! I'm Rozgaar AI. How can I help you today?",
    },
    {
      sender: "user",
      text: "Find electrician jobs in Delhi.",
    },
    {
      sender: "ai",
      text: "I found 24 verified electrician jobs near Delhi with salaries from ₹18,000–₹30,000/month.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#FCF8F4]">

      {/* Header */}
      <section className="bg-gradient-to-r from-[#5B1E05] to-[#8F3E13] py-10">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-white/20 p-4">
              <Bot className="text-white" size={32} />
            </div>

            <div>
              <h1 className="text-4xl font-black text-white">
                Rozgaar AI Assistant
              </h1>

              <p className="mt-1 text-white/80">
                Ask anything about jobs, careers and skills.
              </p>
            </div>

          </div>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        <div className="grid gap-8 lg:grid-cols-[320px_1fr]">

          {/* Left Sidebar */}
          <div className="space-y-6">

            <div className="rounded-3xl bg-white p-6 shadow">

              <div className="flex items-center gap-3">

                <Sparkles className="text-[#8F3E13]" />

                <h2 className="font-bold text-xl">
                  AI Suggestions
                </h2>

              </div>

              <div className="mt-5 space-y-3">

                {[
                  "Find nearby jobs",
                  "Improve my resume",
                  "Estimate salary",
                  "Suggest career path",
                  "Interview questions",
                ].map((item) => (

                  <button
                    key={item}
                    className="w-full rounded-xl bg-[#F8ECE4] px-4 py-3 text-left font-medium transition hover:bg-[#F2DDCF]"
                  >
                    {item}
                  </button>

                ))}

              </div>

            </div>

            <div className="rounded-3xl bg-white p-6 shadow">

              <div className="flex items-center gap-3">

                <BriefcaseBusiness className="text-[#8F3E13]" />

                <h2 className="font-bold">
                  AI Features
                </h2>

              </div>

              <ul className="mt-5 space-y-4 text-gray-600">

                <li>✔ Smart Job Matching</li>
                <li>✔ Resume Review</li>
                <li>✔ Salary Prediction</li>
                <li>✔ Career Guidance</li>
                <li>✔ Multilingual Support</li>

              </ul>

            </div>

          </div>

          {/* Chat */}
          <div className="rounded-3xl bg-white shadow overflow-hidden flex flex-col h-[700px]">

            {/* Chat Header */}

            <div className="border-b p-5 flex items-center gap-3">

              <Bot className="text-[#8F3E13]" />

              <div>

                <h2 className="font-bold">
                  Rozgaar AI
                </h2>

                <p className="text-sm text-green-600">
                  Online
                </p>

              </div>

            </div>

            {/* Messages */}

            <div className="flex-1 overflow-y-auto p-6 space-y-6">

              {messages.map((msg, index) => (

                <div
                  key={index}
                  className={`flex ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >

                  <div
                    className={`max-w-md rounded-3xl px-5 py-4 ${
                      msg.sender === "user"
                        ? "bg-[#5B1E05] text-white"
                        : "bg-[#F8ECE4]"
                    }`}
                  >

                    <div className="flex items-center gap-2 mb-2">

                      {msg.sender === "user" ? (
                        <User size={18} />
                      ) : (
                        <Bot size={18} />
                      )}

                      <span className="font-semibold">

                        {msg.sender === "user"
                          ? "You"
                          : "Rozgaar AI"}

                      </span>

                    </div>

                    {msg.text}

                  </div>

                </div>

              ))}

            </div>

            {/* Input */}

            <div className="border-t p-5">

              <div className="flex items-center gap-3">

                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask Rozgaar AI..."
                  className="flex-1 rounded-2xl border px-5 py-4 outline-none"
                />

                <button
                  type="button"
                  className="rounded-2xl bg-[#F8ECE4] p-4"
                  aria-label="Voice input"
                  title="Voice input"
                >

                  <Mic className="text-[#8F3E13]" />

                </button>

                <button
                  type="button"
                  className="rounded-2xl bg-[#5B1E05] p-4 text-white"
                  aria-label="Send message"
                  title="Send message"
                >

                  <Send />

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}
