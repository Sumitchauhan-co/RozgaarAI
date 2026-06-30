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
    <section className="bg-[#FCF8F4] py-24">

      <div className="mx-auto max-w-7xl px-6 lg:px-10">

        {/* Heading */}

        <div className="text-center">

          <span className="rounded-full bg-[#F5E7DA] px-5 py-2 text-sm font-semibold text-[#8F3E13]">

            Explore Categories

          </span>

          <h2 className="mt-6 text-4xl font-black text-[#2B0F05] lg:text-5xl">

            Popular Job Categories

          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-gray-600">

            Discover thousands of verified jobs across different industries
            and skilled professions.

          </p>

        </div>

        {/* Cards */}

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <Link
                href="/jobs"
                key={category.title}
                className="group rounded-3xl border border-[#EFE3D8] bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#DDBDA4] hover:shadow-xl"
              >
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-2xl ${category.color}`}
                >
                  <Icon size={30} />
                </div>

                <h3 className="mt-6 text-2xl font-bold text-[#2B0F05]">

                  {category.title}

                </h3>

                <p className="mt-2 text-gray-500">

                  {category.jobs}

                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-[#8F3E13]">

                  Browse Jobs

                  <ArrowRight
                    size={18}
                    className="transition group-hover:translate-x-1"
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
