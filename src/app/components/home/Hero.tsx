"use client";

import {
  BriefcaseBusiness,
  ChevronDown,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#FCFBF9]">
      {/* ================= BACKGROUND ================= */}

      {/* Main background image - Optimized positions for mobile vs desktop */}
      <Image
        src="/images/herobg.png"
        alt=""
        width={1800}
        height={1000}
        priority
        className="pointer-events-none absolute top-48 left-1/2 w-[150%] -translate-x-1/2 opacity-40 select-none lg:top-0 lg:w-full lg:opacity-60"
      />

      {/* Soft premium glow */}
      <div className="absolute -top-40 -left-40 h-[300px] w-[300px] rounded-full bg-[#F6C98F] opacity-25 blur-[80px] lg:h-[600px] lg:w-[600px] lg:opacity-35 lg:blur-[140px]" />
      <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-[#F2D9C4] opacity-25 blur-[80px] lg:h-[500px] lg:w-[500px] lg:opacity-35 lg:blur-[120px]" />

      {/* Decorative leaves */}
      <Image
        src="/images/leaf.png"
        alt=""
        width={150}
        height={150}
        className="pointer-events-none absolute top-0 right-0 opacity-10 select-none lg:w-[260px] lg:opacity-20"
      />

      <Image
        src="/images/leaf.png"
        alt=""
        width={220}
        height={220}
        className="pointer-events-none absolute -top-10 -right-10 opacity-5 select-none lg:-top-20 lg:-right-20 lg:w-[420px] lg:opacity-10"
      />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16 lg:py-28">
          {/* ================= LEFT SIDE (RESPONSIVE TYPOGRAPHY) ================= */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D5C8] bg-white px-4 py-1.5 shadow-sm lg:px-5 lg:py-2">
              <Sparkles className="text-[#8F3E13]" size={14} />
              <span className="text-xs font-semibold text-[#8F3E13] lg:text-sm">
                AI Powered Employment Platform
              </span>
            </div>

            <h1 className="mt-6 text-4xl leading-tight font-black text-[#2B0F05] sm:text-5xl lg:mt-8 lg:text-7xl">
              Building Careers.
              <span className="block text-[#A54816]">
                Strengthening Bharat.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#6D645F] lg:mx-0 lg:mt-8 lg:text-lg lg:leading-8">
              Connect skilled workers with verified employers using AI-powered
              job matching, digital work profiles, transparent wages, and
              multilingual support.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:mt-10 lg:justify-start lg:gap-5">
              <button
                onClick={() => (location.href = "/jobs")}
                className="w-full rounded-2xl bg-[#5B1E05] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#3f1203] sm:w-auto"
              >
                Find Work →
              </button>

              <button
                onClick={() => (location.href = "/hire")}
                className="w-full rounded-2xl border border-[#D8C7B8] bg-white px-8 py-4 font-semibold text-[#5B1E05] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:w-auto"
              >
                Hire Workers
              </button>
            </div>
          </div>

          {/* ================= RIGHT SIDE (SCALED & CONSTRAINED FOR MOBILE) ================= */}
          <div className="relative mt-6 flex items-center justify-center lg:mt-0">
            {/* Glow system */}
            <div className="absolute h-[300px] w-[300px] rounded-full bg-[#F6C98F] opacity-20 blur-[60px] lg:h-[700px] lg:w-[700px] lg:opacity-25 lg:blur-[120px]" />
            <div className="absolute h-[300px] w-[300px] rounded-full bg-[#F5DFC8] opacity-20 blur-[50px] lg:h-[600px] lg:w-[600px] lg:opacity-35 lg:blur-[100px]" />

            {/* Monument backdrop */}
            <Image
              src="/images/backdrop.png"
              alt=""
              width={900}
              height={350}
              className="pointer-events-none absolute bottom-4 left-1/2 w-[85%] -translate-x-1/2 opacity-15 select-none lg:bottom-6 lg:w-[760px] lg:opacity-20"
            />

            {/* Base circle */}
            <div className="absolute h-[280px] w-[280px] rounded-full bg-[#F7E4D1] sm:h-[350px] sm:w-[350px] lg:h-[500px] lg:w-[500px]" />

            {/* Hero image */}
            <Image
              src="/images/heroimage.png"
              alt="Workers"
              width={700}
              height={700}
              priority
              className="relative z-10 w-[260px] object-contain transition-transform duration-500 hover:scale-[1.03] sm:w-[360px] lg:w-[580px]"
            />

            {/* ================= FLOATING CARDS (RESPONSIVE VISIBILITY FOR MOBILE PROTECTION) ================= */}

            {/* Active Jobs - Sized down on mobile, shifted to stay within limits */}
            <div className="absolute top-4 left-2 z-20 scale-85 rounded-2xl border border-white/60 bg-white/85 p-3 shadow-lg backdrop-blur-md transition hover:-translate-y-2 sm:p-4 lg:top-12 lg:left-0 lg:scale-100 lg:rounded-3xl lg:p-6 lg:shadow-[0_20px_50px_rgba(91,30,5,0.12)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8F3E13] to-[#B4551F] shadow-md lg:h-14 lg:w-14 lg:rounded-2xl">
                <BriefcaseBusiness className="h-5 w-5 text-white lg:h-[22px] lg:w-[22px]" />
              </div>
              <h3 className="mt-2 text-xl font-bold text-[#2B0F05] lg:mt-4 lg:text-3xl">
                15K+
              </h3>
              <p className="text-xs text-gray-500 lg:text-sm">Active Jobs</p>
            </div>

            {/* AI Match */}
            <div className="absolute top-4 right-2 z-20 scale-85 rounded-2xl border border-white/60 bg-white/85 p-3 shadow-lg backdrop-blur-md transition hover:-translate-y-2 sm:p-4 lg:top-10 lg:right-0 lg:scale-100 lg:rounded-3xl lg:p-6 lg:shadow-[0_20px_50px_rgba(91,30,5,0.12)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5E8DC] shadow-sm lg:h-14 lg:w-14 lg:rounded-2xl">
                <span className="text-sm font-bold text-[#8F3E13] lg:text-base">
                  96%
                </span>
              </div>
              <h3 className="mt-2 text-sm font-bold text-[#2B0F05] lg:mt-4 lg:text-base">
                AI Match
              </h3>
              <p className="text-[10px] text-gray-500 lg:text-sm">Accuracy</p>
            </div>

            {/* Verified - Hidden entirely on small viewports to guarantee text safety */}
            <div className="absolute right-2 bottom-4 z-20 hidden items-center gap-3 rounded-2xl border border-white/60 bg-white/85 p-3 shadow-lg backdrop-blur-md transition hover:-translate-y-2 sm:flex lg:right-4 lg:bottom-10 lg:rounded-3xl lg:p-6 lg:shadow-[0_20px_50px_rgba(91,30,5,0.12)]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5E8DC] shadow-sm lg:h-14 lg:w-14 lg:rounded-2xl">
                <ShieldCheck className="h-5 w-5 text-[#8F3E13] lg:h-[22px] lg:w-[22px]" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-[#2B0F05] lg:text-base">
                  Verified
                </h4>
                <p className="text-xs text-gray-500 lg:text-sm">Employers</p>
              </div>
            </div>
          </div>
        </div>

        {/* ================= STATS (FLEXIBLE GRID) ================= */}
        <div className="mt-4 mb-8 grid grid-cols-2 gap-4 rounded-3xl border border-[#F1E5DB] bg-white/90 p-4 text-center shadow-[0_25px_60px_rgba(91,30,5,0.05)] backdrop-blur-xl sm:p-6 lg:mb-14 lg:grid-cols-4 lg:rounded-[32px] lg:p-8 lg:shadow-[0_20px_60px_rgba(91,30,5,0.08)]">
          <div>
            <h3 className="text-2xl font-black text-[#5B1E05] lg:text-4xl">
              25K+
            </h3>
            <p className="mt-1 text-sm text-[#756B66] lg:text-base">Workers</p>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#5B1E05] lg:text-4xl">
              1200+
            </h3>
            <p className="mt-1 text-sm text-[#756B66] lg:text-base">
              Employers
            </p>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#5B1E05] lg:text-4xl">
              96%
            </h3>
            <p className="mt-1 text-sm text-[#756B66] lg:text-base">AI Match</p>
          </div>
          <div>
            <h3 className="text-2xl font-black text-[#5B1E05] lg:text-4xl">
              12+
            </h3>
            <p className="mt-1 text-sm text-[#756B66] lg:text-base">
              Languages
            </p>
          </div>
        </div>

        {/* ================= SEARCH BAR (RESPONSIVE STACKING LAYOUT) ================= */}
        <div className="relative z-30 rounded-3xl border border-[#E8DDD3] bg-white/90 p-3 shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl lg:rounded-[28px] lg:p-4 lg:shadow-[0_12px_35px_rgba(91,30,5,0.08)]">
          <div className="grid gap-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:gap-4">
            <div className="flex items-center gap-3 p-3 lg:p-4">
              <Search className="shrink-0 text-[#8F3E13]" size={20} />
              <div className="w-full">
                <p className="text-xs text-gray-400 lg:text-sm">Job Role</p>
                <input
                  placeholder="Electrician"
                  className="w-full bg-transparent text-sm font-medium text-[#2B0F05] placeholder-gray-400 outline-none lg:text-base"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 border-t border-b border-gray-100 p-3 lg:border-t-0 lg:border-r lg:border-b-0 lg:border-l lg:border-gray-200 lg:p-4">
              <MapPin className="shrink-0 text-[#8F3E13]" size={20} />
              <div className="w-full">
                <p className="text-xs text-gray-400 lg:text-sm">Location</p>
                <input
                  placeholder="Delhi"
                  className="w-full bg-transparent text-sm font-medium text-[#2B0F05] placeholder-gray-400 outline-none lg:text-base"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-3 lg:p-4">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness
                  className="shrink-0 text-[#8F3E13]"
                  size={20}
                />
                <div>
                  <p className="text-xs text-gray-400 lg:text-sm">Category</p>
                  <p className="text-sm font-medium text-[#2B0F05] lg:text-base">
                    Construction
                  </p>
                </div>
              </div>
              <ChevronDown size={18} className="text-gray-400" />
            </div>

            <button
              type="button"
              className="w-full rounded-2xl bg-[#5B1E05] px-6 py-4 font-semibold text-white transition hover:bg-[#421502] lg:w-auto lg:px-10 lg:py-5"
            >
              Search Jobs
            </button>
          </div>
        </div>

        {/* ================= FEATURES (STACKED MOBILE OVERVIEW) ================= */}
        <div className="mt-8 grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8 lg:pb-24">
          {[
            {
              icon: "✨",
              title: "AI Matching",
              subtitle: "Smart recommendations",
            },
            {
              icon: "🛡️",
              title: "Verified Workers",
              subtitle: "Trusted profiles",
            },
            { icon: "💰", title: "Fair Wages", subtitle: "AI wage prediction" },
            {
              icon: "🌎",
              title: "Multilingual",
              subtitle: "Regional languages",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group rounded-2xl border border-[#F0E4DA] bg-white/80 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#E2C9B5] hover:shadow-md lg:rounded-3xl lg:p-6 lg:hover:-translate-y-2 lg:hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FAF2EB] text-xl transition group-hover:scale-110 lg:h-14 lg:w-14 lg:rounded-2xl lg:text-2xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#2B0F05] lg:text-base">
                    {item.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-[#7A726C] lg:text-sm">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-[#FCFBF9] to-transparent" />
    </section>
  );
}
