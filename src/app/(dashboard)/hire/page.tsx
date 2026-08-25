"use client";

import {
  BriefcaseBusiness,
  MapPin,
  Search,
  Sparkles,
  UserCheck,
  ChevronDown,
  Users,
} from "lucide-react";

export default function HireHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFFDFB] via-[#FCF8F4] to-[#F5E7DA]">

      {/* Background */}

      <div className="absolute inset-0">

        <div className="absolute -left-40 top-0 h-[450px] w-[450px] rounded-full bg-[#F2D9C4] blur-3xl opacity-60" />

        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#F7E7DA] to-transparent" />

        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#8F3E13 1px, transparent 1px),linear-gradient(to right,#8F3E13 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">

        <div className="max-w-3xl">

          {/* Badge */}

          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFEBCF] px-5 py-2">

            <Sparkles
              size={15}
              className="text-[#8F3E13]"
            />

            <span className="font-medium text-[#5B1E05]">
              AI Powered Hiring Platform
            </span>

          </div>

          {/* Heading */}

          <h1 className="mt-8 text-6xl font-black leading-tight text-[#5B1E05]">

            Find Skilled

            <span className="block text-[#0F172A]">
              Talent Faster.
            </span>

          </h1>

          {/* Subtitle */}

          <p className="mt-8 max-w-2xl text-xl leading-9 text-[#6D645F]">

            Hire verified workers with AI-powered recommendations,
            skill-based matching, multilingual communication and
            transparent hiring across India.

          </p>

        </div>

        {/* Search Card */}

        <div className="mt-16 rounded-[34px] border border-[#EEE4DA] bg-white p-5 shadow-xl">

          <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr_auto]">

            {/* Skill */}

            <div className="flex items-center gap-4 rounded-2xl border p-5">

              <Search className="text-[#8F3E13]" />

              <input
                placeholder="Worker skill..."
                className="w-full bg-transparent outline-none"
              />

            </div>

            {/* Location */}

            <div className="flex items-center gap-4 rounded-2xl border p-5">

              <MapPin className="text-[#8F3E13]" />

              <input
                placeholder="Location"
                className="w-full bg-transparent outline-none"
              />

            </div>

            {/* Experience */}

            <div className="flex items-center justify-between rounded-2xl border p-5">

              <div className="flex items-center gap-4">

                <BriefcaseBusiness className="text-[#8F3E13]" />

                <span>Experience</span>

              </div>

              <ChevronDown />

            </div>

            {/* Button */}

            <button className="rounded-2xl bg-[#5B1E05] px-10 text-lg font-semibold text-white transition hover:bg-[#421502]">

              Hire Workers →

            </button>

          </div>

          {/* Tags */}

          <div className="mt-8 flex flex-wrap gap-4">

            {[
              "🔥 AI Match",
              "✔ Verified",
              "👷 Skilled Workers",
              "⚡ Instant Hire",
              "📍 Nearby",
              "🌎 Multilingual",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#FFF3E5] px-6 py-3 text-[#5B1E05]"
              >
                {tag}
              </span>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}
