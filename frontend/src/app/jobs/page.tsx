"use client";

import { Search, MapPin, SlidersHorizontal } from "lucide-react";

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
  <div className="absolute top-0 left-0 w-96 h-96 bg-[#8F3E13]/10 blur-3xl rounded-full"></div>
  <div className="absolute top-60 right-0 w-96 h-96 bg-[#5B1E05]/10 blur-3xl rounded-full"></div>

  <section className="relative max-w-7xl mx-auto px-6 pt-16 pb-20">

    <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-orange-100 text-[#5B1E05] font-medium">
      🚀 AI Powered Job Discovery
    </span>

    <h1 className="mt-8 text-6xl md:text-7xl font-extrabold leading-tight">

      <span className="bg-gradient-to-b from-[#8F3E13] via-[#5B1E05] to-[#2B0F05] bg-clip-text text-transparent">
        Find Work
      </span>

      <br />

      <span className="text-gray-900">
        Near You.
      </span>
     </h1>

    <p className="mt-8 text-xl text-gray-600 max-w-2xl leading-9">
      Discover verified jobs, AI-powered recommendations,
      trusted employers and apply instantly —
      all in one place.
    </p>

  </section>
{/* Search Box */}
<div className="mt-12 bg-white rounded-[30px] shadow-2xl border border-orange-100 p-4">

  <div className="grid lg:grid-cols-4 gap-4">

    {/* Search */}

    <div className="flex items-center rounded-2xl border border-gray-200 px-5 py-4">

      <Search className="text-[#8F3E13]" size={22} />

      <input
        placeholder="Job title, skills..."
        className="ml-4 w-full outline-none text-lg"
      />

    </div>

    {/* Location */}

    <div className="flex items-center rounded-2xl border border-gray-200 px-5 py-4">

      <MapPin className="text-[#8F3E13]" size={22} />

      <input
        placeholder="Location"
        className="ml-4 w-full outline-none text-lg"
      />

    </div>

    {/* Salary */}

    <select className="rounded-2xl border border-gray-200 px-5 py-4 outline-none">

      <option>Salary</option>
      <option>₹10k+</option>
      <option>₹20k+</option>
      <option>₹30k+</option>

    </select>

    {/* Button */}

    <button className="rounded-2xl text-white text-lg font-semibold bg-gradient-to-b from-[#8F3E13] via-[#5B1E05] to-[#2B0F05] hover:scale-[1.02] transition">

      Search Jobs →

    </button>

  </div>

  {/* Quick Filters */}

  <div className="flex flex-wrap gap-3 mt-6">

    {[
      "🔥 AI Match",
      "⭐ Verified",
      "💼 Full Time",
      "🕒 Part Time",
      "📍 Nearby",
      "⚡ Urgent Hiring"
    ].map((item) => (

      <button
        key={item}
        className="px-5 py-2 rounded-full bg-orange-50 text-[#5B1E05] hover:bg-[#5B1E05] hover:text-white transition"
      >
        {item}
      </button>

    ))}

  </div>

</div>

    </main>
  );
}