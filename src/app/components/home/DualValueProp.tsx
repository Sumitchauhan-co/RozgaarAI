"use client";

import { Briefcase, CheckCircle2, UserCheck } from "lucide-react";

export default function DualValueProp() {
  return (
    <section className="border-y border-[#ECE3DA] bg-[#FAF6F0] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <span className="text-xs font-bold tracking-wider text-[#8F3E13] uppercase">
            Tailored Experience
          </span>
          <h2 className="mt-2 text-3xl font-extrabold text-[#2B0F05] md:text-4xl">
            Built for Both Sides of Bharat&apos;s Workforce
          </h2>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* Worker Benefits */}
          <div className="rounded-3xl border border-[#ECE3DA] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#8F3E13]/30 hover:shadow-xl lg:p-10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-[#8F3E13]">
              <UserCheck size={24} />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-[#2B0F05]">
              For Job Seekers & Workers
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6D645F]">
              Find transparent daily or full-time opportunities matched directly
              to your skill set using standard voice or natural language
              prompts.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Instant AI prompt-based job matching near your city",
                "Verified employers with guaranteed wage transparency",
                "No complicated forms — express interest in 1-click",
                "Regional language search support",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium text-[#2B0F05]"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-[#8F3E13]" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recruiter Benefits */}
          <div className="rounded-3xl border border-[#ECE3DA] bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#8F3E13]/30 hover:shadow-xl lg:p-10">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100 text-[#8F3E13]">
              <Briefcase size={24} />
            </div>
            <h3 className="mt-6 text-2xl font-bold text-[#2B0F05]">
              For Recruiters & Businesses
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#6D645F]">
              Streamline your hiring funnel. Post requirements quickly and
              connect with verified, available workers in real time.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Direct access to active candidates with verified credentials",
                "Automated applicant ranking powered by natural language processing",
                "Manage candidate pipelines from a single dashboard",
                "Affordable 30-day recruiter pricing passes",
              ].map((text, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-medium text-[#2B0F05]"
                >
                  <CheckCircle2 size={18} className="shrink-0 text-[#8F3E13]" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
