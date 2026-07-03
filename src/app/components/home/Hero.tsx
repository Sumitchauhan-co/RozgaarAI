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

      {/* Main background image (kept) */}
      <Image
        src="/images/herobg.png"
        alt=""
        width={1800}
        height={1000}
        priority
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full opacity-60 pointer-events-none select-none"
      />

      {/* Soft premium glow (enhanced only) */}
      <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-[#F6C98F] blur-[140px] opacity-35" />
      <div className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-[#F2D9C4] blur-[120px] opacity-35" />

      {/* Decorative leaves (kept) */}
      <Image
        src="/images/leaf.png"
        alt=""
        width={260}
        height={260}
        className="pointer-events-none absolute top-0 right-0 opacity-20 select-none"
      />

      <Image
        src="/images/leaf.png"
        alt=""
        width={420}
        height={420}
        className="pointer-events-none absolute -top-20 -right-20 opacity-10 select-none"
      />

      {/* ================= CONTENT ================= */}

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">

        <div className="grid items-center gap-16 py-24 lg:grid-cols-2 lg:py-28">

          {/* ================= LEFT SIDE (UNCHANGED CONTENT) ================= */}
          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D5C8] bg-white px-5 py-2 shadow-sm">
              <Sparkles className="text-[#8F3E13]" size={16} />
              <span className="text-sm font-semibold text-[#8F3E13]">
                AI Powered Employment Platform
              </span>
            </div>

            <h1 className="mt-8 text-5xl leading-tight font-black text-[#2B0F05] lg:text-7xl">
              Building Careers.
              <span className="block text-[#A54816]">
                Strengthening Bharat.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-[#6D645F]">
              Connect skilled workers with verified employers using AI-powered
              job matching, digital work profiles, transparent wages, and
              multilingual support.
            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <button
                onClick={() => (location.href = "/jobs")}
                className="rounded-2xl bg-[#5B1E05] px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#3f1203]"
              >
                Find Work →
              </button>

              <button
                onClick={() => (location.href = "/hire")}
                className="rounded-2xl border border-[#D8C7B8] bg-white px-8 py-4 font-semibold text-[#5B1E05] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                Hire Workers
              </button>

            </div>

            {/* TRUST SECTION (UNCHANGED) */}
            <div className="mt-10 space-y-4">

              <div className="flex items-center gap-3">
                <span className="text-lg text-amber-500">★★★★★</span>
                <span className="font-semibold text-[#2B0F05]">
                  4.9/5 Rating
                </span>
              </div>

              <p className="text-sm text-[#6D645F]">
                Trusted by <span className="font-semibold">25,000+</span> workers & employers across India.
              </p>

              <div className="flex flex-wrap gap-5 text-sm text-[#5B1E05]">
                <span>✅ Verified Employers</span>
                <span>🤖 AI Matching</span>
                <span>🆓 Free Registration</span>
              </div>

            </div>
          </div>

          {/* ================= RIGHT SIDE (ONLY VISUAL ENHANCED) ================= */}
          <div className="relative flex items-center justify-center">

            {/* Glow system improved */}
            <div className="absolute h-[700px] w-[700px] rounded-full bg-[#F6C98F] blur-[120px] opacity-25" />
            <div className="absolute h-[600px] w-[600px] rounded-full bg-[#F5DFC8] blur-[100px] opacity-35" />

            {/* Monument */}
            <Image
              src="/images/backdrop.png"
              alt=""
              width={900}
              height={350}
              className="pointer-events-none absolute bottom-6 left-1/2 w-[760px] -translate-x-1/2 opacity-20 select-none"
            />

            {/* Base circle (slightly softer) */}
            <div className="absolute h-[500px] w-[500px] rounded-full bg-[#F7E4D1]" />

            {/* Hero image (same) */}
            <Image
              src="/images/heroimage.png"
              alt="Workers"
              width={700}
              height={700}
              priority
              className="relative z-10 w-[580px] object-contain transition-transform duration-500 hover:scale-[1.03]"
            />

            {/* ================= FLOATING CARDS (ONLY ENHANCED UI) ================= */}

            {/* Active Jobs */}
            <div className="absolute top-12 left-0 z-20 rounded-3xl border border-white/60 bg-white/85 backdrop-blur-md p-6 shadow-[0_20px_50px_rgba(91,30,5,0.12)] transition hover:-translate-y-2">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#8F3E13] to-[#B4551F] shadow-md">
                <BriefcaseBusiness className="text-white" size={22} />
              </div>

              <h3 className="mt-4 text-3xl font-bold text-[#2B0F05]">15K+</h3>
              <p className="text-gray-500">Active Jobs</p>

            </div>

            {/* AI Match */}
            <div className="absolute top-10 right-0 z-20 rounded-3xl border border-white/60 bg-white/85 backdrop-blur-md p-6 shadow-[0_20px_50px_rgba(91,30,5,0.12)] transition hover:-translate-y-2">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5E8DC] shadow-sm">
                <span className="font-bold text-[#8F3E13]">96%</span>
              </div>

              <h3 className="mt-4 font-bold text-[#2B0F05]">AI Match</h3>
              <p className="text-sm text-gray-500">Accuracy</p>

            </div>

            {/* Verified */}
            <div className="absolute right-4 bottom-10 z-20 flex items-center gap-4 rounded-3xl border border-white/60 bg-white/85 backdrop-blur-md p-6 shadow-[0_20px_50px_rgba(91,30,5,0.12)] transition hover:-translate-y-2">

              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F5E8DC] shadow-sm">
                <ShieldCheck className="text-[#8F3E13]" size={22} />
              </div>

              <div>
                <h4 className="font-bold text-[#2B0F05]">Verified</h4>
                <p className="text-sm text-gray-500">Employers</p>
              </div>

            </div>

          </div>

        </div>

        {/* ================= STATS (UNCHANGED CONTENT) ================= */}

        <div className="mt-4 mb-14 grid grid-cols-2 gap-5 rounded-[32px] border border-[#F1E5DB] bg-white/90 p-8 shadow-[0_20px_60px_rgba(91,30,5,0.08)] backdrop-blur-xl lg:grid-cols-4">

          <div className="text-center">
            <h3 className="text-4xl font-black text-[#5B1E05]">25K+</h3>
            <p className="mt-2 text-[#756B66]">Workers</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-black text-[#5B1E05]">1200+</h3>
            <p className="mt-2 text-[#756B66]">Employers</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-black text-[#5B1E05]">96%</h3>
            <p className="mt-2 text-[#756B66]">AI Match</p>
          </div>

          <div className="text-center">
            <h3 className="text-4xl font-black text-[#5B1E05]">12+</h3>
            <p className="mt-2 text-[#756B66]">Languages</p>
          </div>

        </div>

        {/* ================= SEARCH BAR (UNCHANGED CONTENT) ================= */}

        <div className="relative z-30 -mt-12 rounded-[28px] border border-[#E8DDD3] bg-white/90 p-4 shadow-[0_12px_35px_rgba(91,30,5,0.08)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]">

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto]">

            <div className="flex items-center gap-3 p-4">
              <Search className="text-[#8F3E13]" />
              <div>
                <p className="text-sm text-gray-500">Job Role</p>
                <input
                  placeholder="Electrician"
                  className="w-full bg-transparent font-medium outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 border-r border-l border-gray-200 p-4">
              <MapPin className="text-[#8F3E13]" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <input
                  placeholder="Delhi"
                  className="w-full bg-transparent font-medium outline-none"
                />
              </div>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <BriefcaseBusiness className="text-[#8F3E13]" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-medium">Construction</p>
                </div>
              </div>
              <ChevronDown />
            </div>

            <button className="rounded-2xl bg-[#5B1E05] px-10 py-5 font-semibold text-white hover:bg-[#421502]">
              Search Jobs
            </button>

          </div>
        </div>

        {/* ================= FEATURES (UNCHANGED CONTENT) ================= */}

        <div className="mt-16 grid grid-cols-2 gap-8 pb-24 lg:grid-cols-4">

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
            {
              icon: "💰",
              title: "Fair Wages",
              subtitle: "AI wage prediction",
            },
            {
              icon: "🌎",
              title: "Multilingual",
              subtitle: "Regional languages",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group rounded-3xl border border-[#F0E4DA] bg-white/80 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#E2C9B5] hover:shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF2EB] text-2xl transition group-hover:scale-110">
                  {item.icon}
                </div>

                <div>
                  <h3 className="font-bold text-[#2B0F05]">{item.title}</h3>
                  <p className="mt-1 text-sm text-[#7A726C]">{item.subtitle}</p>
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FCFBF9] to-transparent" />

    </section>
  );
}
