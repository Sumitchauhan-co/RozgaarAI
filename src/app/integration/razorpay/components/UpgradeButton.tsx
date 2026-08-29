"use client";

import { useAuthStore } from "@/app/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import {
  createPaymentOrderAction,
  verifyPaymentAction,
} from "../actions/payment";

interface UpgradeButtonProps {
  userId?: string;
  planType: "basic" | "pro";
  currentPlan?: string;
  className?: string;
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function UpgradeButton({
  userId: propUserId,
  planType,
  currentPlan,
  className = "",
}: UpgradeButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const { isAuthenticated, userId: storeUserId } = useAuthStore();
  const activeUserId = propUserId || storeUserId;

  const isCurrentPlan = currentPlan === planType;

  const loadScript = (src: string) => {
    return new Promise(resolve => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleCheckout = async () => {
    if (!isAuthenticated || !activeUserId) {
      toast.error("Please login to upgrade your plan.");
      router.push("/login");
      return;
    }

    if (isCurrentPlan) return;
    setLoading(true);

    try {
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );
      if (!res) {
        toast.error("SDK Error: Razorpay SDK failed to load.");
        setLoading(false);
        return;
      }

      const orderRes = await createPaymentOrderAction({
        userId: activeUserId,
        planType,
      });

      if (orderRes.error || !orderRes.data) {
        throw new Error(orderRes.message || "Failed to create order.");
      }

      const { orderId, amount, currency } = orderRes.data;

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "AI Job Search Pass",
        description: `Activate 30-Day ${planType.toUpperCase()} Pass`,
        order_id: orderId,
        handler: async function (response: {
          razorpay_order_id: string;
          razorpay_payment_id: string;
          razorpay_signature: string;
        }) {
          try {
            const verifyRes = await verifyPaymentAction({
              userId: activeUserId,
              planType,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (!verifyRes.error) {
              toast.success(
                verifyRes.message || "Payment verified successfully!"
              );
              router.refresh();
            } else {
              toast.error(verifyRes.message || "Payment verification failed.");
            }
          } catch {
            toast.error("Payment verification error occurred.");
          } finally {
            setLoading(false);
          }
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        theme: { color: "#8F3E13" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading || isCurrentPlan}
      className={`flex w-full items-center justify-center rounded-2xl px-4 py-3.5 font-semibold transition-all duration-200 ${
        isCurrentPlan
          ? "cursor-not-allowed border border-[#F1E5D9] bg-[#F5F1EE] text-[#9B8C83]"
          : planType === "pro"
            ? "bg-linear-to-r from-[#F7B066] via-[#D9732B] to-[#8F3E13] text-white shadow-[0_20px_40px_rgba(143,62,19,0.25)] hover:-translate-y-0.5 hover:shadow-[0_25px_50px_rgba(143,62,19,0.3)] active:scale-[0.99]"
            : "bg-[#1E1B18] text-white hover:-translate-y-0.5 hover:bg-[#2B221F] active:scale-[0.99]"
      } ${className}`}
    >
      {loading
        ? "Processing..."
        : isCurrentPlan
          ? "Current Active Plan"
          : `Upgrade to ${planType === "basic" ? "Basic" : "Pro"}`}
    </button>
  );
}
