"use client";

import {
  ArrowUpRight,
  Hammer,
  HardHat,
  Paintbrush,
  Truck,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { icon: HardHat, name: "Construction & Site Work", jobs: "3.2k+ openings" },
  { icon: Zap, name: "Electrical & Electronics", jobs: "1.8k+ openings" },
  { icon: Wrench, name: "Plumbing & Piping", jobs: "1.2k+ openings" },
  { icon: Paintbrush, name: "Painting & Finishing", jobs: "950+ openings" },
  { icon: Truck, name: "Logistics & Delivery", jobs: "4.1k+ openings" },
  { icon: Hammer, name: "Carpentry & Woodwork", jobs: "840+ openings" },
];

export default function CategoryExplorer() {
  return (
    <section className="bg-[#FCFBF9] px-6 py-20 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="text-xs font-bold tracking-wider text-[#8F3E13] uppercase">
              Popular Roles
            </span>
            <h2 className="mt-2 text-3xl font-extrabold text-[#2B0F05] md:text-4xl">
              Explore Opportunities by Trade
            </h2>
          </div>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1 font-semibold text-[#8F3E13] hover:underline"
          >
            <span>View All Categories</span>
            <ArrowUpRight size={18} />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((item, idx) => {
            const Icon = item.icon;
            return (
              <Link
                key={idx}
                href="/jobs"
                className="group flex items-center justify-between rounded-3xl border border-[#ECE3DA] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#8F3E13]/30 hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F8ECE4] text-[#8F3E13] transition group-hover:bg-[#8F3E13] group-hover:text-white">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#2B0F05]">{item.name}</h3>
                    <p className="text-xs text-[#7A726C]">{item.jobs}</p>
                  </div>
                </div>
                <ArrowUpRight
                  size={18}
                  className="text-[#8F3E13] opacity-0 transition group-hover:opacity-100"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
