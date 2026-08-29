import {
  PLAN_CONFIG,
  PlanDetails,
  PlanType,
} from "@/app/server/config/payment";
import api from "@/app/utils/api";
import axios from "axios";

export type CurrentPlanResponse = {
  planType: PlanType | null;
  title: string | null;
  priceDisplay: string | null;
  credits: number;
  apiCredits: number;
  passStatus: "inactive" | "active" | "expired" | null;
  passExpiryDate: string | null;
  isActive: boolean;
};

export async function fetchPaymentPlansAction(): Promise<{
  error: boolean;
  plans: PlanDetails[];
}> {
  try {
    return { error: false, plans: Object.values(PLAN_CONFIG) };
  } catch (err) {
    console.error("Failed to fetch payment plans action:", err);
    return { error: true, plans: [] };
  }
}

export async function getCurrentUserPlanAction(): Promise<{
  error: boolean;
  currentPlan: CurrentPlanResponse | null;
}> {
  try {
    const res = await api.get("/api/payment/current-plan");
    if (res.data?.success) {
      return { error: false, currentPlan: res.data.data || null };
    }
    return { error: false, currentPlan: null };
  } catch (err) {
    console.error("Failed to fetch current plan action:", err);
    return { error: true, currentPlan: null };
  }
}

export async function createPaymentOrderAction(payload: {
  userId: string;
  planType: "basic" | "pro";
}) {
  try {
    const res = await api.post("/api/payment/create-order", payload);
    if (res.data?.success) {
      return { error: false, data: res.data.data };
    }
    return {
      error: true,
      message: res.data?.error || "Failed to create order.",
    };
  } catch (err) {
    console.error("Create order action error:", err);
    let message = "Failed to create order.";
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.error || message;
    }
    return { error: true, message };
  }
}

export async function verifyPaymentAction(payload: {
  userId: string;
  planType: "basic" | "pro";
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}) {
  try {
    const res = await api.post("/api/payment/verify", payload);
    if (res.data?.success) {
      return { error: false, message: "Payment verified successfully!" };
    }
    return {
      error: true,
      message: res.data?.error || "Payment verification failed.",
    };
  } catch (err) {
    console.error("Verify payment action error:", err);
    let message = "Payment verification error.";
    if (axios.isAxiosError(err)) {
      message = err.response?.data?.error || message;
    }
    return { error: true, message };
  }
}
