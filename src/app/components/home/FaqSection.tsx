"use client";

import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Plus } from "lucide-react";
import { useState } from "react";

const faqs = [
  {
    id: "01",
    question: "How does the AI search work?",
    answer:
      "You can type or speak queries naturally in regional languages (e.g., 'Find painter jobs in Delhi above ₹15,000/month'). Our AI interprets your intent, location, and salary requirements to return verified job matches instantly.",
  },
  {
    id: "02",
    question: "Is RozgaarAI free for workers?",
    answer:
      "Workers can register, search, and view matches for free. We also offer affordable pass options for additional AI searches and premium features.",
  },
  {
    id: "03",
    question: "How do recruiters verify their job listings?",
    answer:
      "Recruiters undergo identity and business verification before posting job opportunities to ensure candidates are connecting with trustworthy employers.",
  },
  {
    id: "04",
    question: "What happens when I click Upgrade on a plan?",
    answer:
      "If you're logged in, you'll open the Razorpay checkout modal to activate your 30-day Basic or Pro pass. If you're not logged in, you'll be redirected straight to the login page.",
  },
];

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-[#FCFBF9] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-4xl">
        {/* Header Badge & Title */}
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#ECE3DA] bg-[#F8ECE4] px-4 py-1.5 text-xs font-bold tracking-wider text-[#8F3E13] uppercase">
            <HelpCircle size={14} />
            <span>Got Questions?</span>
          </div>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#2B0F05] md:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-sm text-[#6D645F]">
            Everything you need to know about navigating RozgaarAI
          </p>
        </div>

        {/* Accordion Container */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={faq.id}
                className={`group relative overflow-hidden rounded-3xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#8F3E13]/30 bg-white shadow-md"
                    : "border-[#ECE3DA] bg-white/70 hover:border-[#8F3E13]/20 hover:bg-white hover:shadow-xs"
                }`}
              >
                {/* Active Accent Left Border Indicator */}
                <div
                  className={`absolute top-0 bottom-0 left-0 w-1.5 transition-colors duration-300 ${
                    isOpen
                      ? "bg-[#8F3E13]"
                      : "bg-transparent group-hover:bg-[#8F3E13]/30"
                  }`}
                />

                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between p-6 pl-8 text-left sm:p-7 sm:pl-9"
                >
                  <div className="flex items-center gap-4 md:gap-6">
                    <span
                      className={`text-sm font-black transition-colors duration-300 ${
                        isOpen ? "text-[#8F3E13]" : "text-[#8F3E13]/40"
                      }`}
                    >
                      {faq.id}
                    </span>
                    <span className="text-base font-bold text-[#2B0F05] md:text-lg">
                      {faq.question}
                    </span>
                  </div>

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen
                        ? "rotate-45 bg-[#8F3E13] text-white"
                        : "bg-[#F8ECE4] text-[#8F3E13] group-hover:bg-[#8F3E13] group-hover:text-white"
                    }`}
                  >
                    <Plus size={18} />
                  </div>
                </button>

                {/* Animated Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        duration: 0.3,
                        ease: [0.04, 0.62, 0.23, 0.98],
                      }}
                    >
                      <div className="border-t border-[#ECE3DA]/60 px-6 pt-4 pb-7 pl-8 text-sm leading-relaxed text-[#6D645F] sm:px-7 sm:pb-8 sm:pl-16 md:text-base">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
