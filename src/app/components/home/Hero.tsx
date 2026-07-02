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
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFFDFB] via-[#FCF8F4] to-[#F5E7DA]">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-56 -left-56 h-[500px] w-[500px] rounded-full bg-[#F2D9C4] opacity-70 blur-3xl"></div>

        <div className="absolute top-0 right-0 h-full w-1/2 bg-gradient-to-l from-[#F6E5D7] to-transparent"></div>

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#8F3E13 1px, transparent 1px),linear-gradient(to right,#8F3E13 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        {/* HERO GRID */}

        <div className="grid items-center gap-16 py-24 lg:grid-cols-2 lg:py-28">
          {/* LEFT */}

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D5C8] bg-white px-5 py-2 shadow">
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
                title="jobs"
                type="button"
                onClick={() => (location.href = "/jobs")}
                className="rounded-2xl bg-[#5B1E05] px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#431302] hover:shadow-2xl"
              >
                Find Work →
              </button>

              <button
                type="button"
                onClick={() => (location.href = "/hire")}
                className="rounded-2xl border border-[#D8C7B8] bg-white px-8 py-4 font-semibold text-[#5B1E05] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Hire Workers
              </button>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative flex items-center justify-center">
            {/* Warm Glow */}
            <div className="absolute z-0 h-[700px] w-[700px] rounded-full bg-[#F6C98F] opacity-25 blur-[120px]"></div>
            {/* Monument Backdrop */}
            <Image
              src="/images/backdrop.png"
              alt="Indian Monument Backdrop"
              width={900}
              height={350}
              priority
              className="pointer-events-none absolute bottom-6 left-1/2 z-0 w-[760px] -translate-x-1/2 opacity-20 select-none"
            />
            {/* Glow */}

            <div className="absolute h-[620px] w-[620px] rounded-full bg-[#F5DFC8] opacity-40 blur-3xl"></div>
            {/* Decorative Rings */}

            <div className="absolute h-[520px] w-[520px] rounded-full border border-white/60"></div>

            <div className="absolute h-[620px] w-[620px] rounded-full border border-white/30"></div>

            <div className="absolute h-[720px] w-[720px] rounded-full border border-white/15"></div>
            {/* Circle */}

            <div className="absolute h-[500px] w-[500px] rounded-full bg-[#F7E4D1]"></div>

            {/* Hero Image */}

            <Image
              src="/images/heroimage.png"
              alt="Workers"
              width={700}
              height={700}
              priority
              className="relative z-10 mt-12 w-[560px] object-contain"
            />

            {/* Active Jobs */}

            <div className="absolute top-12 left-0 z-20 rounded-2xl border border-[#EEE4DC] bg-white p-5 shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8F3E13]">
                <BriefcaseBusiness className="text-white" size={22} />
              </div>

              <h3 className="mt-4 text-3xl font-bold text-[#2B0F05]">15K+</h3>

              <p className="text-gray-500">Active Jobs</p>
            </div>

            {/* AI Match */}

            <div className="absolute top-10 right-0 z-20 rounded-2xl border border-[#EEE4DC] bg-white p-5 shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5E8DC]">
                <span className="font-bold text-[#8F3E13]">96%</span>
              </div>

              <h3 className="mt-4 font-bold text-[#2B0F05]">AI Match</h3>

              <p className="text-sm text-gray-500">Accuracy</p>
            </div>

            {/* Verified */}

            <div className="absolute right-4 bottom-10 z-20 flex items-center gap-4 rounded-2xl border border-[#EEE4DC] bg-white px-5 py-4 shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5E8DC]">
                <ShieldCheck className="text-[#8F3E13]" size={22} />
              </div>

              <div>
                <h4 className="font-bold text-[#2B0F05]">Verified</h4>

                <p className="text-sm text-gray-500">Employers</p>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH BAR */}

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

            <button
              type="button"
              className="rounded-2xl bg-[#5B1E05] px-10 py-5 font-semibold text-white hover:bg-[#421502]"
            >
              Search Jobs
            </button>
          </div>
        </div>
        {/* FEATURES */}

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

      <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 bg-gradient-to-t from-[#FCF8F4] to-transparent"></div>
    </section>
  );
}
