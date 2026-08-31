import {
  AlertTriangle,
  Calendar,
  CheckCircle2,
  Clock,
  Coins,
  RotateCcw,
} from "lucide-react";

export default function RefundPolicyPage() {
  const REFUND_SECTIONS = [
    {
      id: "1",
      icon: Calendar,
      title: "1. One-Month Pass & Subscription Policy",
      content: (
        <>
          RozgaarAI operates on a non-recurring, single-month pass model. Once a
          monthly subscription or credit package is purchased, it cannot be
          canceled mid-term or prorated. Access to the software and remaining
          credits will automatically expire 30 days after purchase. Users must
          manually purchase a new monthly pass to continue using evaluation
          credits.
        </>
      ),
    },
    {
      id: "2",
      icon: Coins,
      title: "2. Digital Credit Purchases",
      content: (
        <>
          Due to the immediate processing nature of digital AI candidate
          evaluation credits, usage credits purchased on RozgaarAI are
          non-refundable once activated or consumed.
        </>
      ),
    },
    {
      id: "3",
      icon: AlertTriangle,
      title: "3. Failed Transactions & Technical Errors",
      content: (
        <>
          In the event of a double-charge, system transaction failure, or
          unfulfilled AI software processing where credits were debited without
          processing, users can request a full refund or credit restoration by
          contacting support within 7 days of the transaction at{" "}
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
    {
      id: "4",
      icon: Clock,
      title: "4. Refund Processing Time",
      content: (
        <>
          Approved refunds will be processed within 5–7 business days back to
          the original payment method (Bank Account / UPI / Card) through our
          payment gateway provider.
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
            <RotateCcw size={26} />
          </div>
          <h1 className="mb-3 text-3xl font-black tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            Cancellation & <span className="text-[#8F3E13]">Refund Policy</span>
          </h1>
          <p className="text-xs font-semibold tracking-wider text-gray-500 uppercase">
            Last Updated: August 31, 2026
          </p>
        </div>

        {/* Content Container */}
        <div className="rounded-3xl border border-gray-100 bg-white/90 p-6 shadow-xl shadow-gray-200/50 backdrop-blur-xl sm:p-10">
          <div className="space-y-8 text-sm leading-relaxed text-gray-700">
            {REFUND_SECTIONS.map(section => {
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

          {/* Refund Guarantee Assurance Box */}
          <div className="mt-10 flex items-center gap-3 rounded-2xl border border-[#3B1102]/15 bg-gradient-to-r from-[#3B1102]/10 via-[#3B1102]/5 to-transparent p-4 text-xs font-medium text-gray-700">
            <CheckCircle2 size={18} className="shrink-0 text-[#8F3E13]" />
            <span>
              All transaction refunds are securely processed via standard bank &
              UPI payout channels back to your original payment source.
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
