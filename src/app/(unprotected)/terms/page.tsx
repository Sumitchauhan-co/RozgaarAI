import {
  CheckCircle2,
  CreditCard,
  FileText,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
  UserCheck,
} from "lucide-react";

export default function TermsPage() {
  const TERMS_SECTIONS = [
    {
      id: "1",
      icon: ShieldCheck,
      title: "1. Acceptance of Terms",
      content: (
        <>
          By accessing or using <strong>RozgaarAI</strong>{" "}
          (&quot;Platform&quot;, &quot;Service&quot;), owned and operated by
          Sumit Chauhan, you agree to comply with and be bound by these Terms
          and Conditions. If you do not agree, please do not access or use our
          software services.
        </>
      ),
    },
    {
      id: "2",
      icon: Sparkles,
      title: "2. Description of Service",
      content: (
        <>
          RozgaarAI is a B2B Software-as-a-Service (SaaS) platform that provides
          AI-powered resume screening, applicant evaluation, natural language
          candidate parsing, and candidate ranking tools. We provide software
          technology solutions and do not operate as an employment exchange or
          job placement agency.
        </>
      ),
    },
    {
      id: "3",
      icon: UserCheck,
      title: "3. User Accounts & Responsibilities",
      content: (
        <>
          Users must provide accurate registration details. You are responsible
          for maintaining the confidentiality of your account credentials and
          for all activities that occur under your account.
        </>
      ),
    },
    {
      id: "4",
      icon: CreditCard,
      title: "4. Payments & Subscriptions",
      content: (
        <>
          Access to AI evaluation credits and subscription tiers requires valid
          payment processed through authorized payment aggregators. Prices are
          subject to change with notice provided on our platform.
        </>
      ),
    },
    {
      id: "5",
      icon: Lock,
      title: "5. Intellectual Property",
      content: (
        <>
          All content, algorithms, interfaces, designs, and AI software
          components on RozgaarAI are the exclusive property of Sumit Chauhan
          and protected under applicable copyright and intellectual property
          laws.
        </>
      ),
    },
    {
      id: "6",
      icon: Mail,
      title: "6. Contact Information",
      content: (
        <>
          For questions regarding these Terms, please contact us directly at{" "}
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
      <div className="pointer-events-none absolute top-1/2 -right-20 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#3B1102]/10 text-[#3B1102] shadow-inner ring-1 ring-[#3B1102]/15 transition-transform hover:scale-105">
            <FileText size={26} />
          </div>
          <h1 className="mb-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Terms & <span className="text-[#8F3E13]">Conditions</span>
          </h1>
          <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Last Updated: August 31, 2026
          </p>
        </div>

        {/* Content Container */}
        <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-xl shadow-gray-200/50 backdrop-blur-xl sm:p-10">
          <div className="space-y-8 text-sm leading-relaxed text-gray-700">
            {TERMS_SECTIONS.map(section => {
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

          {/* Quick Assurance Box */}
          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-[#3B1102]/15 bg-gradient-to-r from-[#3B1102]/10 via-[#3B1102]/5 to-transparent p-4 text-xs font-medium text-gray-700">
            <CheckCircle2 size={18} className="shrink-0 text-[#8F3E13]" />
            <span>
              By utilizing our AI SaaS workspace, you confirm compliance with
              Indian digital service and software usage guidelines.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
