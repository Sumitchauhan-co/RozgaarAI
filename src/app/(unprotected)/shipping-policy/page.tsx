import { CheckCircle2, Globe, HelpCircle, Mail, Zap } from "lucide-react";

export default function ShippingPolicyPage() {
  const SHIPPING_SECTIONS = [
    {
      id: "1",
      icon: Globe,
      title: "1. Software Services Delivery",
      content: (
        <>
          RozgaarAI is an entirely web-based SaaS platform. No physical goods or
          packages are manufactured, shipped, or delivered.
        </>
      ),
    },
    {
      id: "2",
      icon: Zap,
      title: "2. Instant Service Activation",
      content: (
        <>
          Upon successful payment confirmation via our payment gateway, access
          to your selected AI software plan or evaluation credits is granted
          immediately and automatically within your account.
        </>
      ),
    },
    {
      id: "3",
      icon: Mail,
      title: "3. Email Confirmation",
      content: (
        <>
          An automated digital receipt and invoice confirmation will be
          delivered to your registered email address immediately following every
          transaction.
        </>
      ),
    },
    {
      id: "4",
      icon: HelpCircle,
      title: "4. Support Inquiries",
      content: (
        <>
          If you experience any delay in credit activation following a payment,
          please reach out to{" "}
          <a
            href="mailto:sumit.chauhan.code@gmail.com"
            className="font-semibold text-[#8F3E13] underline transition hover:text-[#3B1102]"
          >
            sumit.chauhan.code@gmail.com
          </a>{" "}
          for immediate resolution.
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
            <Zap size={26} />
          </div>
          <h1 className="mb-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Digital Delivery &{" "}
            <span className="text-[#8F3E13]">Fulfillment</span>
          </h1>
          <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Last Updated: August 31, 2026
          </p>
        </div>

        {/* Content Container */}
        <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-xl shadow-gray-200/50 backdrop-blur-xl sm:p-10">
          <div className="space-y-8 text-sm leading-relaxed text-gray-700">
            {SHIPPING_SECTIONS.map(section => {
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

          {/* Instant Delivery Assurance Box */}
          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-[#3B1102]/15 bg-gradient-to-r from-[#3B1102]/10 via-[#3B1102]/5 to-transparent p-4 text-xs font-medium text-gray-700">
            <CheckCircle2 size={18} className="shrink-0 text-[#8F3E13]" />
            <span>
              100% digital cloud fulfillment: credits and workspace access
              unlock instantaneously upon checkout confirmation.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
