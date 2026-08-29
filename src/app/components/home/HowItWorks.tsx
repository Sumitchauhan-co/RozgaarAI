"use client";

import { CheckCircle, Search, UserCheck } from "lucide-react";

const steps = [
  {
    step: "01",
    title: "Create Profile",
    description:
      "Build your digital work profile or post a job requirement in minutes.",
    icon: UserCheck,
  },
  {
    step: "02",
    title: "AI Natural Search",
    description:
      "Search using your own voice or prompt naturally in your regional language.",
    icon: Search,
  },
  {
    step: "03",
    title: "Direct Connect",
    description:
      "Get matched with verified candidates or employers with transparent terms.",
    icon: CheckCircle,
  },
];

export default function HowItWorks() {
  return (
    <section className="border-y border-[#ECE3DA] bg-[#FAF6F0] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs font-bold tracking-wider text-[#8F3E13] uppercase">
            Simple Process
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-[#2B0F05] md:text-4xl">
            How RozgaarAI Works
          </h2>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="relative rounded-3xl border border-[#E6D5C8] bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-[#8F3E13]/30 hover:shadow-lg"
              >
                <span className="text-4xl font-black text-[#8F3E13]/20">
                  {item.step}
                </span>
                <div className="mt-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8ECE4] text-[#8F3E13]">
                  <Icon size={24} />
                </div>
                <h3 className="mt-6 text-xl font-bold text-[#2B0F05]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6D645F]">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
