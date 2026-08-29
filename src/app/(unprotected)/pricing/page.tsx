"use client";

import {
  fetchPaymentPlansAction,
  getCurrentUserPlanAction,
} from "@/app/integration/razorpay/actions/payment";
import PlanCard from "@/app/integration/razorpay/components/PlanCard";
import { PlanDetails } from "@/app/server/config/payment";
import { useAuthStore } from "@/app/store/store";
import { CalendarDays, LogIn, ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
type CurrentPlanState = {
  planType: "basic" | "pro" | null;
  title: string | null;
  priceDisplay: string | null;
  credits: number;
  passStatus: "inactive" | "active" | "expired" | null;
  passExpiryDate: string | null;
  isActive: boolean;
};

export default function PricingPage() {
  const { userId, isHydrated, isAuthenticated } = useAuthStore();
  const [plans, setPlans] = useState<PlanDetails[]>([]);
  const [currentPlan, setCurrentPlan] = useState<CurrentPlanState | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function loadPlans() {
      const res = await fetchPaymentPlansAction();
      if (!res.error) {
        setPlans(res.plans);
      }

      if (isAuthenticated && userId) {
        const currentPlanRes = await getCurrentUserPlanAction();
        if (!currentPlanRes.error) {
          setCurrentPlan(currentPlanRes.currentPlan);
        }
      } else {
        setCurrentPlan(null);
      }

      setLoading(false);
    }
    loadPlans();
  }, [isAuthenticated, userId]);

  if (!isHydrated || loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#fffaf5,#fff3ea_28%,#f5efe9_100%)]">
        <div className="flex items-center gap-3 rounded-full border border-[#E8D6C8] bg-white/80 px-5 py-3 shadow-[0_18px_45px_rgba(91,30,5,0.08)] backdrop-blur-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-[#8F3E13] border-t-transparent"></div>
          <span className="text-sm font-medium text-[#5B1E05]">
            Loading passes...
          </span>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,#fffaf5,#fff3ea_30%,#f5efe9_100%)] px-4 py-16 text-slate-900 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 left-10 h-72 w-72 rounded-full bg-[#8F3E13]/10 blur-3xl"></div>
        <div className="absolute top-40 right-10 h-80 w-80 rounded-full bg-[#5B1E05]/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[#DDBDA4]/20 blur-3xl"></div>
      </div>

      <div className="relative mx-auto max-w-6xl">
        <section className="mb-12 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#E9D2BF] bg-white/80 px-5 py-2 text-sm font-semibold tracking-[0.18em] text-[#5B1E05] uppercase shadow-[0_10px_25px_rgba(91,30,5,0.05)] backdrop-blur-md">
            <span className="inline-block h-2 w-2 rounded-full bg-[#8F3E13]"></span>
            Pricing & Passes
          </span>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
            Access smarter hiring with a pass that fits your pace.
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-600 sm:text-lg">
            Get instant access to AI-powered job discovery, instant shortlist
            support, and faster application workflows with a simple 30-day pass.
            No recurring billing, no hidden fees.
          </p>

          {!isAuthenticated && (
            <div className="mx-auto mt-8 inline-flex items-center gap-3.5 rounded-full border border-[#E9D2BF] bg-white/90 p-2 pr-6 shadow-[0_12px_35px_rgba(91,30,5,0.08)] backdrop-blur-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF3E8] text-[#8F3E13] shadow-inner">
                <ShieldAlert className="h-5 w-5" />
              </span>
              <p className="text-sm">
                Please log in to purchase or switch your active pass
              </p>
              <button
                onClick={() => {
                  toast.info("Redirecting you to login to continue.");
                  router.push("/login");
                }}
                className="ml-2 inline-flex items-center gap-2 rounded-full bg-[#5B1E05] px-5 py-2 text-xs font-black tracking-wide text-white uppercase shadow-md transition-all hover:bg-[#8F3E13] hover:shadow-lg active:scale-95"
              >
                <LogIn className="h-4 w-4" />
                Login
              </button>
            </div>
          )}
        </section>

        {currentPlan && currentPlan.planType && (
          <section className="mx-auto mb-10 max-w-3xl rounded-[30px] border border-[#E9D2BF] bg-[#FFF9F4] p-5 shadow-[0_18px_45px_rgba(91,30,5,0.06)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold tracking-[0.2em] text-[#8F3E13] uppercase">
                  Current plan
                </p>
                <h2 className="mt-2 text-2xl font-extrabold text-gray-900">
                  {currentPlan.title || "Your current pass"}
                </h2>
              </div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.14em] uppercase ${
                  currentPlan.isActive
                    ? "bg-[#E6F7EE] text-[#167B4A]"
                    : "bg-[#FCE9E5] text-[#B42318]"
                }`}
              >
                {currentPlan.isActive
                  ? "Active"
                  : currentPlan.passStatus || "Inactive"}
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2 text-sm text-gray-600 sm:flex-row sm:items-center sm:gap-6">
              <span className="inline-flex items-center gap-2 font-medium text-gray-700">
                <ShieldAlert className="h-4 w-4 text-[#8F3E13]" />
                {currentPlan.credits} AI searches included
              </span>
              {currentPlan.passExpiryDate && (
                <span className="inline-flex items-center gap-2 font-medium text-gray-700">
                  <CalendarDays className="h-4 w-4 text-[#8F3E13]" />
                  Valid until{" "}
                  {new Date(currentPlan.passExpiryDate).toLocaleDateString()}
                </span>
              )}
            </div>
          </section>
        )}

        <section className="mb-12 grid gap-4 md:grid-cols-3">
          {[
            { label: "No recurring charge", value: "One-time pass" },
            { label: "AI searches", value: "25–50 included" },
            { label: "Activation", value: "Instant access" },
          ].map(item => (
            <div
              key={item.label}
              className="rounded-3xl border border-[#F1E5D9] bg-white/80 px-5 py-4 shadow-[0_18px_45px_rgba(91,30,5,0.04)] backdrop-blur-sm"
            >
              <p className="text-xs font-semibold tracking-[0.2em] text-[#8F3E13] uppercase">
                {item.label}
              </p>
              <p className="mt-2 text-xl font-bold text-gray-900">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        <section className="mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-8 md:grid-cols-2">
          {plans.map(plan => (
            <PlanCard
              key={plan.planKey}
              userId={userId}
              plan={plan}
              currentPlanType={currentPlan?.planType ?? undefined}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
