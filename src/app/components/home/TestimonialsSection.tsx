"use client";

import { Marquee } from "@/components/ui/marquee";
import { Star } from "lucide-react";
import StaticContributors from "./Contributors";

const testimonials = [
  {
    name: "Ramesh Sharma",
    role: "Electrician, New Delhi",
    content:
      "RozgaarAI matched me with verified commercial contractors within 2 days. The prompt search in Hindi made it very simple.",
    rating: 5,
  },
  {
    name: "Priya Nair",
    role: "Recruiter, Bangalore",
    content:
      "Finding reliable daily wage workers used to be chaotic. Now I get verified profiles directly with clear salary expectations.",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Site Supervisor, Ahmedabad",
    content:
      "Hired 15 site workers in less than 48 hours for our project. The verified profile badge gave us complete peace of mind.",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    role: "Painter & Finisher, Jaipur",
    content:
      "I used voice search in Hindi to find local residential gigs. The daily payout transparency is fantastic.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Plumbing Contractor, Pune",
    content:
      "Managing hiring pipelines on RozgaarAI saves hours every week. Direct worker connect makes everything fast.",
    rating: 5,
  },
  {
    name: "Suresh Kumar",
    role: "Carpenter, Mumbai",
    content:
      "Got direct calls from top interior design studios without paying middlemen commission fees.",
    rating: 5,
  },
  {
    name: "Meenakshi Sundaram",
    role: "Logistics Lead, Chennai",
    content:
      "AI applicant ranking sorted candidate profiles by experience instantly. Best platform for quick hiring.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="relative overflow-hidden bg-[#FCFBF9] py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="flex flex-col items-center text-center">
          <h2 className="text-3xl font-extrabold text-[#2B0F05] md:text-4xl">
            Trusted Across Bharat
          </h2>
          <p className="mt-2 text-sm text-[#6D645F]">
            Real stories from workers and recruiters on RozgaarAI
          </p>

          {/* Contributors Social Proof Pill */}
          <div className="mt-6">
            <StaticContributors />
          </div>
        </div>
      </div>

      {/* Infinite Horizontal Marquee */}
      <div className="relative mt-12 flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:35s]">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="w-80 shrink-0 rounded-3xl border border-[#ECE3DA] bg-white p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#8F3E13]/30 hover:shadow-md md:w-96"
            >
              <div className="flex gap-1 text-[#D9732B]">
                {[...Array(item.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-[#55463E] italic">
                &quot;{item.content}&quot;
              </p>
              <div className="mt-6 border-t border-[#ECE3DA]/60 pt-4">
                <p className="font-bold text-[#2B0F05]">{item.name}</p>
                <p className="text-xs text-[#7A726C]">{item.role}</p>
              </div>
            </div>
          ))}
        </Marquee>

        {/* Side Gradients for Seamless Edge Fading */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-[#FCFBF9] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-[#FCFBF9] to-transparent" />
      </div>
    </section>
  );
}
