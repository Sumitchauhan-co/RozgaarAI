"use client";

import Image from "next/image";
import {
  Sparkles,
  BriefcaseBusiness,
  ShieldCheck,
  Search,
  MapPin,
  ChevronDown,
} from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#FFFDFB] via-[#FCF8F4] to-[#F5E7DA]">

      {/* Background */}
      <div className="absolute inset-0">

        <div className="absolute -left-56 -top-56 h-[500px] w-[500px] rounded-full bg-[#F2D9C4] blur-3xl opacity-70"></div>

        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#F6E5D7] to-transparent"></div>

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

        <div className="grid min-h-[760px] items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D5C8] bg-white px-5 py-2 shadow">

              <Sparkles
                className="text-[#8F3E13]"
                size={16}
              />

              <span className="text-sm font-semibold text-[#8F3E13]">
                AI Powered Employment Platform
              </span>

            </div>

            <h1 className="mt-8 text-5xl font-black leading-tight text-[#2B0F05] lg:text-7xl">

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

  <button className="rounded-2xl bg-[#5B1E05] px-8 py-4 text-white font-semibold shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#431302] hover:shadow-2xl">

    Find Work →

  </button>

  <button className="rounded-2xl border border-[#D8C7B8] bg-white px-8 py-4 font-semibold text-[#5B1E05] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

    Hire Workers

  </button>

</div>

          </div>

          {/* RIGHT */}

          <div className="relative flex justify-center items-center">
            
            {/* Warm Glow */}
<div
  className="absolute h-[700px] w-[700px] rounded-full bg-[#F6C98F] blur-[120px] opacity-25 z-0"
></div>
            {/* Monument Backdrop */}
<Image
  src="/images/backdrop.png"
  alt="Indian Monument Backdrop"
  width={900}
  height={350}
  priority
  className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[760px] opacity-20 z-0 pointer-events-none select-none"
/>
            {/* Glow */}

            <div className="absolute h-[620px] w-[620px] rounded-full bg-[#F5DFC8] blur-3xl opacity-40"></div>
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

            <div className="absolute left-0 top-12 z-20 rounded-2xl border border-[#EEE4DC] bg-white p-5 shadow-2xl transition-all duration-300 hover:-translate-y-2">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#8F3E13]">

                <BriefcaseBusiness
                  className="text-white"
                  size={22}
                />

              </div>

              <h3 className="mt-4 text-3xl font-bold text-[#2B0F05]">

                15K+

              </h3>

              <p className="text-gray-500">

                Active Jobs

              </p>

            </div>

            {/* AI Match */}

            <div className="absolute right-0 top-10 z-20 rounded-2xl border border-[#EEE4DC] bg-white p-5 shadow-2xl transition-all duration-300 hover:-translate-y-2">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F5E8DC]">

                <span className="font-bold text-[#8F3E13]">

                  96%

                </span>

              </div>

              <h3 className="mt-4 font-bold text-[#2B0F05]">

                AI Match

              </h3>

              <p className="text-sm text-gray-500">

                Accuracy

              </p>

            </div>

            {/* Verified */}

            <div className="absolute bottom-10 right-4 z-20 flex items-center gap-4 rounded-2xl border border-[#EEE4DC] bg-white px-5 py-4 shadow-2xl transition-all duration-300 hover:-translate-y-2">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5E8DC]">

                <ShieldCheck
                  className="text-[#8F3E13]"
                  size={22}
                />

              </div>

              <div>

                <h4 className="font-bold text-[#2B0F05]">

                  Verified

                </h4>

                <p className="text-sm text-gray-500">

                  Employers

                </p>

              </div>

            </div>

          </div>

        </div>

        {/* SEARCH BAR */}

        <div className="-mt-12 relative z-30 rounded-[28px] border border-[#E8DDD3] bg-white/90 backdrop-blur-md p-4 shadow-2xl transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)]">

          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_auto]">

            <div className="flex items-center gap-3 p-4">

              <Search className="text-[#8F3E13]" />

              <div>

                <p className="text-sm text-gray-500">

                  Job Role

                </p>

                <input
                  placeholder="Electrician"
                  className="bg-transparent outline-none font-medium w-full"
                />

              </div>

            </div>
            
            <div className="flex items-center gap-3 border-l border-r border-gray-200 p-4">

              <MapPin className="text-[#8F3E13]" />

              <div>

                <p className="text-sm text-gray-500">

                  Location

                </p>

                <input
                  placeholder="Delhi"
                  className="bg-transparent outline-none font-medium w-full"
                />

              </div>

            </div>

            <div className="flex items-center justify-between p-4">

              <div className="flex items-center gap-3">

                <BriefcaseBusiness className="text-[#8F3E13]" />

                <div>

                  <p className="text-sm text-gray-500">

                    Category

                  </p>

                  <p className="font-medium">

                    Construction

                  </p>

                </div>

              </div>

               
              <ChevronDown />

            </div>

            <button className="rounded-2xl bg-[#5B1E05] px-10 py-5 font-semibold text-white hover:bg-[#421502]">

              Search Jobs

            </button>

          </div>

        </div>
        {/* FEATURES */}

<div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-4">

  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7E7DA]">
      ✨
    </div>

    <div>
      <h3 className="font-semibold text-[#2B0F05]">
        AI Matching
      </h3>

      <p className="text-sm text-gray-500">
        Smart recommendations
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7E7DA]">
      🛡️
    </div>

    <div>
      <h3 className="font-semibold text-[#2B0F05]">
        Verified Workers
      </h3>

      <p className="text-sm text-gray-500">
        Trusted profiles
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7E7DA]">
      💰
    </div>

    <div>
      <h3 className="font-semibold text-[#2B0F05]">
        Fair Wages
      </h3>

      <p className="text-sm text-gray-500">
        AI wage prediction
      </p>
    </div>
  </div>

  <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-md">
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F7E7DA]">
      🌎
    </div>

    <div>
      <h3 className="font-semibold text-[#2B0F05]">
        Multilingual
      </h3>

      <p className="text-sm text-gray-500">
        Regional languages
      </p>
    </div>
  </div>

</div>

      </div>
   {/* Bottom Fade */}

<div
  className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#F7EBDD] to-transparent pointer-events-none">
  </div>
    </section>
  );
}