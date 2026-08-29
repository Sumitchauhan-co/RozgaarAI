"use client";

const features = [
  { icon: "✨", title: "AI Matching", subtitle: "Smart recommendations" },
  { icon: "🛡️", title: "Verified Workers", subtitle: "Trusted profiles" },
  { icon: "💰", title: "Fair Wages", subtitle: "AI wage prediction" },
  { icon: "🌎", title: "Multilingual", subtitle: "Regional languages" },
];

export default function FeatureCards() {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 pb-16 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-8 lg:pb-24">
      {features.map((item, i) => (
        <div
          key={i}
          className="group rounded-2xl border border-[#F0E4DA] bg-white/80 p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-[#E2C9B5] hover:shadow-md lg:rounded-3xl lg:p-6 lg:hover:-translate-y-2 lg:hover:shadow-lg"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FAF2EB] text-xl transition group-hover:scale-110 lg:h-14 lg:w-14 lg:rounded-2xl lg:text-2xl">
              {item.icon}
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2B0F05] lg:text-base">
                {item.title}
              </h3>
              <p className="mt-0.5 text-xs text-[#7A726C] lg:text-sm">
                {item.subtitle}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
