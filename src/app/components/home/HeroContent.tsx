"use client";

import { Sparkles } from "lucide-react";
import Link from "next/link";

export default function HeroContent() {
  return (
    <div className="text-center lg:text-left">
      <div className="inline-flex items-center gap-2 rounded-full border border-[#E6D5C8] bg-white px-4 py-1.5 shadow-sm lg:px-5 lg:py-2">
        <Sparkles className="text-[#8F3E13]" size={14} />
        <span className="text-xs font-semibold text-[#8F3E13] lg:text-sm">
          AI Powered Employment Platform
        </span>
      </div>

      <h1 className="mt-6 text-4xl leading-tight font-black text-[#2B0F05] sm:text-5xl lg:mt-8 lg:text-7xl">
        Building Careers.
        <span className="block text-[#A54816]">Strengthening Bharat.</span>
      </h1>

      <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-[#6D645F] lg:mx-0 lg:mt-8 lg:text-lg lg:leading-8">
        Connect skilled workers with verified employers using AI-powered job
        matching, digital work profiles, transparent wages, and multilingual
        support.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row lg:mt-10 lg:justify-start lg:gap-5">
        <Link
          href="/jobs"
          className="w-full rounded-2xl bg-[#5B1E05] px-8 py-4 text-center font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#3f1203] sm:w-auto"
        >
          Find Work →
        </Link>

        <Link
          href="/hire"
          className="w-full rounded-2xl border border-[#D8C7B8] bg-white px-8 py-4 text-center font-semibold text-[#5B1E05] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:w-auto"
        >
          Hire Workers
        </Link>
      </div>
    </div>
  );
}
