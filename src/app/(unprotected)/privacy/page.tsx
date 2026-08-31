import {
  CheckCircle2,
  Cookie,
  Cpu,
  Database,
  Lock,
  Mail,
  Shield,
} from "lucide-react";

export default function PrivacyPage() {
  const PRIVACY_SECTIONS = [
    {
      id: "1",
      icon: Database,
      title: "1. Information We Collect",
      content: (
        <>
          We collect personal information that you voluntarily provide when
          registering, including your name, email address, contact details, and
          candidate profile data submitted for AI parsing.
        </>
      ),
    },
    {
      id: "2",
      icon: Cpu,
      title: "2. How We Use Your Data",
      content: (
        <>
          Your data is used solely to provide and improve our AI candidate
          evaluation services, process payments, manage user accounts, and
          communicate software updates or support responses.
        </>
      ),
    },
    {
      id: "3",
      icon: Lock,
      title: "3. Data Sharing & Security",
      content: (
        <>
          We do not sell, trade, or rent user personal data to third parties.
          Data processed via AI models is secured using standard encryption
          protocol. Payment details are handled securely by PCI-DSS compliant
          payment aggregators (e.g., Razorpay/Cashfree).
        </>
      ),
    },
    {
      id: "4",
      icon: Cookie,
      title: "4. Cookies",
      content: (
        <>
          We use essential session cookies to authenticate users, save user
          preferences, and ensure seamless navigation across our platform.
        </>
      ),
    },
    {
      id: "5",
      icon: Mail,
      title: "5. Contact Us",
      content: (
        <>
          If you have questions about this Privacy Policy, email us at{" "}
          <a
            href="mailto:sumit.chauhan.code@gmail.com"
            className="font-semibold text-[#8F3E13] underline transition hover:text-[#3B1102]"
          >
            sumit.chauhan.code@gmail.com
          </a>
          .
        </>
      ),
    },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-orange-50/20 px-4 py-12 text-gray-800 lg:py-20">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#8F3E13]/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/2 -left-20 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3B1102]/10 text-[#3B1102] shadow-inner ring-1 ring-[#3B1102]/15 transition-transform hover:scale-105">
            <Shield size={26} />
          </div>
          <h1 className="mb-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Privacy <span className="text-[#8F3E13]">Policy</span>
          </h1>
          <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Last Updated: August 31, 2026
          </p>
        </div>

        {/* Content Container */}
        <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-xl shadow-gray-200/50 backdrop-blur-xl sm:p-10">
          <div className="space-y-8 text-sm leading-relaxed text-gray-700">
            {PRIVACY_SECTIONS.map(section => {
              const Icon = section.icon;
              return (
                <section key={section.id} className="group">
                  <div className="mb-3 flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-100/80 text-gray-700 shadow-sm transition-all duration-300 group-hover:bg-[#3B1102] group-hover:text-[#F6C98F]">
                      <Icon size={18} />
                    </div>
                    <h2 className="text-base font-bold text-gray-900">
                      {section.title}
                    </h2>
                  </div>
                  <div className="pl-12 leading-relaxed font-normal text-gray-600">
                    <p>{section.content}</p>
                  </div>
                </section>
              );
            })}
          </div>

          {/* Data Protection Assurance Box */}
          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-[#3B1102]/15 bg-gradient-to-r from-[#3B1102]/10 via-[#3B1102]/5 to-transparent p-4 text-xs font-medium text-gray-700">
            <CheckCircle2 size={18} className="shrink-0 text-[#8F3E13]" />
            <span>
              Your candidate data and internal parsing activity are protected
              with industry-standard encryption protocols.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
