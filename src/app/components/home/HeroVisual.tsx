"use client";

import { BriefcaseBusiness, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function HeroVisual() {
  return (
    <div className="relative mt-6 flex items-center justify-center lg:mt-0">
      <div className="absolute h-[300px] w-[300px] rounded-full bg-[#F6C98F] opacity-20 blur-[60px] lg:h-[700px] lg:w-[700px] lg:opacity-25 lg:blur-[120px]" />
      <div className="absolute h-[300px] w-[300px] rounded-full bg-[#F5DFC8] opacity-20 blur-[50px] lg:h-[600px] lg:w-[600px] lg:opacity-35 lg:blur-[100px]" />

      <Image
        src="/images/backdrop.png"
        alt=""
        width={900}
        height={350}
        className="pointer-events-none absolute bottom-4 left-1/2 w-[85%] -translate-x-1/2 opacity-15 select-none lg:bottom-6 lg:w-[760px] lg:opacity-20"
      />

      <div className="absolute h-[280px] w-[280px] rounded-full bg-[#F7E4D1] sm:h-[350px] sm:w-[350px] lg:h-[500px] lg:w-[500px]" />

      <Image
        src="/images/heroimage.png"
        alt="Workers"
        width={700}
        height={700}
        priority
        className="relative z-10 w-[260px] object-contain transition-transform duration-500 hover:scale-[1.03] sm:w-[360px] lg:w-[580px]"
      />

      {/* Floating Card: Active Jobs */}
      <div className="absolute top-4 left-2 z-20 scale-85 rounded-2xl border border-white/60 bg-white/85 p-3 shadow-lg backdrop-blur-md transition hover:-translate-y-2 sm:p-4 lg:top-12 lg:left-0 lg:scale-100 lg:rounded-3xl lg:p-6 lg:shadow-[0_20px_50px_rgba(91,30,5,0.12)]">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#8F3E13] to-[#B4551F] shadow-md lg:h-14 lg:w-14 lg:rounded-2xl">
          <BriefcaseBusiness className="h-5 w-5 text-white lg:h-[22px] lg:w-[22px]" />
        </div>
        <h3 className="mt-2 text-xl font-bold text-[#2B0F05] lg:mt-4 lg:text-3xl">
          15K+
        </h3>
        <p className="text-xs text-gray-500 lg:text-sm">Active Jobs</p>
      </div>

      {/* Floating Card: AI Match */}
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

      {/* Floating Card: Verified Employers */}
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
  );
}
