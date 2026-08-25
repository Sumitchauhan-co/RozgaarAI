"use client";

import { MapPin, Search } from "lucide-react";

export default function JobsPage() {
  const jobs = [
    {
      title: "House Painter",
      company: "Sharma Constructions",
      location: "Delhi",
      salary: "₹18,000/month",
      type: "Full Time",
      rating: "4.8",
      featured: true,
    },
    {
      title: "Electrician",
      company: "Urban Services",
      location: "Mumbai",
      salary: "₹22,000/month",
      type: "Full Time",
      rating: "4.7",
      featured: false,
    },
    {
      title: "Delivery Partner",
      company: "QuickDrop",
      location: "Bangalore",
      salary: "₹20,000/month",
      type: "Flexible",
      rating: "4.9",
      featured: true,
    },
    {
      title: "Construction Worker",
      company: "BuildRight",
      location: "Pune",
      salary: "₹25,000/month",
      type: "Contract",
      rating: "4.6",
      featured: false,
    },
  ];
  return (
    <main className="min-h-screen bg-gradient-to-br from-white via-orange-50 to-white">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 h-96 w-96 rounded-full bg-[#8F3E13]/10 blur-3xl"></div>
      <div className="absolute top-60 right-0 h-96 w-96 rounded-full bg-[#5B1E05]/10 blur-3xl"></div>

      <section className="relative mx-auto max-w-7xl px-6 pt-16 pb-20">
        <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-5 py-2 font-medium text-[#5B1E05]">
          🚀 AI Powered Job Discovery
        </span>

        <h1 className="mt-8 text-6xl leading-tight font-extrabold md:text-7xl">
          <span className="bg-gradient-to-b from-[#8F3E13] via-[#5B1E05] to-[#2B0F05] bg-clip-text text-transparent">
            Find Work
          </span>

          <br />

          <span className="text-gray-900">Near You.</span>
        </h1>

        <p className="mt-8 max-w-2xl text-xl leading-9 text-gray-600">
          Discover verified jobs, AI-powered recommendations, trusted employers
          and apply instantly — all in one place.
        </p>
      </section>
      {/* Search Box */}
      <div className="mt-12 rounded-[30px] border border-orange-100 bg-white p-4 shadow-2xl">
        <div className="grid gap-4 lg:grid-cols-4">
          {/* Search */}

          <div className="flex items-center rounded-2xl border border-gray-200 px-5 py-4">
            <Search className="text-[#8F3E13]" size={22} />

            <input
              placeholder="Job title, skills..."
              className="ml-4 w-full text-lg outline-none"
            />
          </div>

          {/* Location */}

          <div className="flex items-center rounded-2xl border border-gray-200 px-5 py-4">
            <MapPin className="text-[#8F3E13]" size={22} />

            <input
              placeholder="Location"
              className="ml-4 w-full text-lg outline-none"
            />
          </div>

          {/* Salary */}

          <select
            title="salary"
            className="rounded-2xl border border-gray-200 px-5 py-4 outline-none"
          >
            <option>Salary</option>
            <option>₹10k+</option>
            <option>₹20k+</option>
            <option>₹30k+</option>
          </select>

          {/* Button */}

          <button className="rounded-2xl bg-gradient-to-b from-[#8F3E13] via-[#5B1E05] to-[#2B0F05] text-lg font-semibold text-white transition hover:scale-[1.02]">
            Search Jobs →
          </button>
        </div>

        {/* Quick Filters */}

        <div className="mt-6 flex flex-wrap gap-3">
          {[
            "🔥 AI Match",
            "⭐ Verified",
            "💼 Full Time",
            "🕒 Part Time",
            "📍 Nearby",
            "⚡ Urgent Hiring",
          ].map(item => (
            <button
              key={item}
              className="rounded-full bg-orange-50 px-5 py-2 text-[#5B1E05] transition hover:bg-[#5B1E05] hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
