"use client";

import {
  ArrowRight,
  Building2,
  ChefHat,
  Hammer,
  HardHat,
  Paintbrush,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const categories = [
  {
    title: "Electrician",
    jobs: "1,240 Jobs",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    title: "Plumber",
    jobs: "860 Jobs",
    icon: Wrench,
    color: "bg-blue-100 text-blue-700",
  },
  {
    title: "Construction",
    jobs: "2,150 Jobs",
    icon: HardHat,
    color: "bg-orange-100 text-orange-700",
  },
  {
    title: "Driver",
    jobs: "970 Jobs",
    icon: Truck,
    color: "bg-green-100 text-green-700",
  },
  {
    title: "Painter",
    jobs: "530 Jobs",
    icon: Paintbrush,
    color: "bg-pink-100 text-pink-700",
  },
  {
    title: "Carpenter",
    jobs: "620 Jobs",
    icon: Hammer,
    color: "bg-amber-100 text-amber-700",
  },
  {
    title: "Factory Worker",
    jobs: "780 Jobs",
    icon: Building2,
    color: "bg-purple-100 text-purple-700",
  },
  {
    title: "Cook",
    jobs: "410 Jobs",
    icon: ChefHat,
    color: "bg-red-100 text-red-700",
  },
];

export default function Categories() {
  return (
    <section className="relative overflow-hidden bg-[#FCFBF9] py-28">

      {/* Background Image */}
      <Image
        src="/images/herobg.png"
        alt=""
        width={1800}
        height={1000}
        className="pointer-events-none absolute top-10 left-1/2 -translate-x-1/2 select-none opacity-35"
      />

      {/* Warm Glow */}
      <div className="absolute left-1/2 top-1/2 h-[750px] w-[750px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F6D8BA] opacity-20 blur-[140px]" />

      {/* Decorative Grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#8F3E13 1px, transparent 1px),linear-gradient(to right,#8F3E13 1px,transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative Leaves */}
      <Image
        src="/images/leaf.png"
        alt=""
        width={300}
        height={300}
        className="pointer-events-none absolute -top-10 right-0 select-none opacity-15"
      />

      <Image
        src="/images/leaf.png"
        alt=""
        width={240}
        height={240}
        className="pointer-events-none absolute bottom-0 left-0 rotate-180 select-none opacity-10"
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Heading */}
        <div className="text-center">

          <span className="rounded-full bg-[#F5E7DA] px-5 py-2 text-sm font-semibold text-[#8F3E13]">
            Explore Categories
          </span>

          <h2 className="mt-6 text-4xl font-black leading-tight text-[#2B0F05] lg:text-5xl">
            Popular Job Categories

          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6D645F]">
            Discover thousands of verified jobs across different industries
            and skilled professions throughout India.
          </p>

          <div className="mx-auto mt-8 h-1 w-24 rounded-full bg-gradient-to-r from-[#8F3E13] via-[#C76C35] to-[#F5E7DA]" />

        </div>

        {/* Category Cards */}
        <div className="mt-16 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.title}
                href="/jobs"
                className="group rounded-3xl border border-[#EADDD2] bg-white/90 p-7 backdrop-blur-md shadow-[0_15px_35px_rgba(91,30,5,0.08)] transition-all duration-500 hover:-translate-y-3 hover:border-[#DDBDA4] hover:shadow-[0_25px_60px_rgba(91,30,5,0.15)]"
              >
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl shadow-md transition-all duration-300 group-hover:scale-110 ${category.color}`}
                >
                  <Icon
                    size={30}
                    className="transition-transform duration-300 group-hover:rotate-6"
                  />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#2B0F05]">
                  {category.title}
                </h3>

                <p className="mt-2 text-[#6D645F]">
                  {category.jobs}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-[#8F3E13]">
                  Browse Jobs
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </div>
              </Link>
            );
          })}

        </div>

      </div>

    </section>
  );
}
