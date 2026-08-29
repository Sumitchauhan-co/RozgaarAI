export type PlanType = "basic" | "pro";

export interface PlanDetails {
  planKey: PlanType;
  title: string;
  priceDisplay: string;
  amountPaise: number;
  credits: number;
  apiCredits: number;
  description: string;
  features: string[];
  isPopular?: boolean;
}

export const PLAN_CONFIG: Record<PlanType, PlanDetails> = {
  basic: {
    planKey: "basic",
    title: "Basic Pass",
    priceDisplay: "₹249.00",
    amountPaise: 24900,
    credits: 25,
    apiCredits: 25,
    description:
      "Perfect for active job seekers looking for targeted AI search recommendations.",
    features: [
      "Up to 25 AI Job Searches",
      "Standard AI job matching & filters",
      "30 Days Pass Validity",
      "Email notification support",
    ],
  },
  pro: {
    planKey: "pro",
    title: "Pro Pass",
    priceDisplay: "₹499.00",
    amountPaise: 49900,
    credits: 50,
    apiCredits: 50,
    description:
      "Designed for aggressive applicants needing maximum AI-assisted job queries.",
    isPopular: true,
    features: [
      "Up to 50 AI Job Searches",
      "Advanced deep job matching AI",
      "30 Days Pass Validity",
      "Priority processing queue",
      "Custom resume keywords analyzer",
    ],
  },
};
