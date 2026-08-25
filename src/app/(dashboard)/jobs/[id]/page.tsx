"use client";

import {
  BadgeCheck,
  Bookmark,
  Building2,
  Calendar,
  CheckCircle2,
  Clock3,
  IndianRupee,
  MapPin,
  Share2,
  Sparkles,
} from "lucide-react";

export default function JobDetailsPage() {
  const skills = [
    "Electrical Wiring",
    "House Wiring",
    "Industrial",
    "Repair",
    "Maintenance",
    "Safety Standards",
  ];

  return (
    <main className="min-h-screen bg-[#FCF8F4]">
      {/* HERO */}

      <section className="bg-gradient-to-r from-[#5B1E05] to-[#8F3E13] py-14">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-white/20 px-4 py-2 text-sm text-white">
                Construction
              </span>

              <h1 className="mt-5 text-5xl font-black text-white">
                Electrician
              </h1>

              <div className="mt-6 flex flex-wrap gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Building2 size={18} />
                  BuildX Infra Pvt Ltd
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={18} />
                  New Delhi
                </div>

                <div className="flex items-center gap-2">
                  <IndianRupee size={18} />
                  ₹18,000 – ₹25,000 / month
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                className="rounded-2xl bg-white px-7 py-4 font-semibold text-[#5B1E05] transition hover:scale-105"
              >
                Apply Now
              </button>

              <button
                type="button"
                aria-label="Bookmark job"
                className="rounded-2xl border border-white px-5 py-4 text-white hover:bg-white/10"
              >
                <Bookmark />
              </button>

              <button
                type="button"
                aria-label="Share job"
                className="rounded-2xl border border-white px-5 py-4 text-white hover:bg-white/10"
              >
                <Share2 />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* LEFT */}

          <div className="space-y-8 lg:col-span-2">
            {/* Description */}

            <div className="rounded-3xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold text-[#2B0F05]">
                Job Description
              </h2>

              <p className="mt-5 leading-8 text-gray-600">
                We are looking for experienced electricians for residential and
                commercial electrical installations. Candidates should have
                knowledge of wiring, maintenance, safety regulations, and
                troubleshooting electrical systems.
              </p>
            </div>

            {/* Responsibilities */}

            <div className="rounded-3xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold">Responsibilities</h2>

              <div className="mt-6 space-y-4">
                {[
                  "Install electrical wiring",
                  "Repair electrical faults",
                  "Follow workplace safety standards",
                  "Inspect electrical equipment",
                  "Work with engineering teams",
                ].map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="text-[#8F3E13]" />

                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Skills */}

            <div className="rounded-3xl bg-white p-8 shadow">
              <h2 className="text-2xl font-bold">Required Skills</h2>

              <div className="mt-6 flex flex-wrap gap-4">
                {skills.map(skill => (
                  <span
                    key={skill}
                    className="rounded-full bg-[#F5E7DA] px-5 py-3 font-semibold text-[#5B1E05]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="space-y-6">
            {/* AI Match */}

            <div className="rounded-3xl bg-white p-6 shadow">
              <div className="flex items-center gap-3">
                <Sparkles className="text-[#8F3E13]" />

                <h2 className="text-xl font-bold">AI Match Score</h2>
              </div>

              <div className="mt-6">
                <div className="h-4 rounded-full bg-gray-200">
                  <div className="h-4 w-[89%] rounded-full bg-gradient-to-r from-[#5B1E05] to-[#C76C34]" />
                </div>

                <h3 className="mt-4 text-4xl font-black text-[#5B1E05]">89%</h3>

                <p className="text-gray-500">Excellent Match</p>
              </div>
            </div>

            {/* Quick Info */}

            <div className="rounded-3xl bg-white p-6 shadow">
              <h2 className="text-xl font-bold">Job Information</h2>

              <div className="mt-6 space-y-5">
                <Info
                  icon={<Calendar size={20} />}
                  title="Posted"
                  value="2 Days Ago"
                />

                <Info
                  icon={<Clock3 size={20} />}
                  title="Working Hours"
                  value="9 AM - 6 PM"
                />

                <Info
                  icon={<BadgeCheck size={20} />}
                  title="Experience"
                  value="2+ Years"
                />

                <Info
                  icon={<IndianRupee size={20} />}
                  title="Salary"
                  value="₹18k - ₹25k"
                />
              </div>
            </div>

            {/* CTA */}

            <div className="rounded-3xl bg-[#5B1E05] p-8 text-center text-white">
              <h2 className="text-2xl font-bold">Ready to Apply?</h2>

              <p className="mt-3 text-white/80">
                Apply now and let Rozgaar AI recommend you to the employer.
              </p>

              <button className="mt-6 w-full rounded-2xl bg-white py-4 font-semibold text-[#5B1E05] transition hover:scale-105">
                Apply Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="rounded-xl bg-[#F5E7DA] p-3 text-[#8F3E13]">{icon}</div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>

        <p className="font-semibold">{value}</p>
      </div>
    </div>
  );
}
