import { getDb } from "@/app/db";
import { usersTable } from "@/app/db/auth.schema";
import { razorpay } from "@/app/lib/razorpay";
import ApiError from "@/app/utils/apiError";
import crypto from "crypto";
import { eq } from "drizzle-orm";
import { PLAN_CONFIG, PlanType } from "../config/payment";

const db = getDb();

interface VerifyPassParams {
  userId: string;
  planType: PlanType;
  razorpayOrderId: string;
  razorpayPaymentId: string;
  razorpaySignature: string;
}

/**
 * Create a one-time Razorpay order for a specific pass
 */
export async function createOrder(userId: string, planType: PlanType) {
  const plan = PLAN_CONFIG[planType];
  if (!plan) {
    throw new Error("Invalid plan type specified.");
  }

  const options = {
    amount: plan.amountPaise,
    currency: "INR",
    receipt: `rcpt_${userId.slice(0, 8)}_${Date.now()}`,
    notes: {
      userId,
      planType,
    },
  };

  const order = await razorpay.orders.create(options);

  return {
    orderId: order.id,
    amount: order.amount,
    currency: order.currency,
    planType,
  };
}

/**
 * Helper to set user's active pass & credits for 30 days
 */
export async function grantPassToUser(
  userId: string,
  planType: PlanType,
  orderId: string
) {
  const plan = PLAN_CONFIG[planType];
  if (!plan) throw new Error("Plan config not found");

  const passExpiry = new Date();
  passExpiry.setDate(passExpiry.getDate() + 30); // Valid for 30 days

  const updatedUsers = await db
    .update(usersTable)
    .set({
      passStatus: "active",
      planType: planType,
      apiCredits: plan.apiCredits,
      passExpiryDate: passExpiry,
      lastOrderId: orderId,
    })
    .where(eq(usersTable.id, userId))
    .returning();

  return updatedUsers[0];
}

export async function consumeAiCreditForUser(userId: string) {
  const [user] = await db
    .select({
      id: usersTable.id,
      planType: usersTable.planType,
      passStatus: usersTable.passStatus,
      passExpiryDate: usersTable.passExpiryDate,
      apiCredits: usersTable.apiCredits,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  if (!user.planType || !PLAN_CONFIG[user.planType as PlanType]) {
    throw ApiError.forbidden(
      "No valid plan found. Please purchase a pass to unlock AI access."
    );
  }

  if (user.passStatus !== "active") {
    throw ApiError.forbidden(
      "Your pass is not active. Please purchase a plan to continue."
    );
  }

  if (!user.passExpiryDate || new Date(user.passExpiryDate) <= new Date()) {
    throw ApiError.forbidden(
      "Your pass has expired. Please renew your plan to continue using AI."
    );
  }

  if ((user.apiCredits ?? 0) <= 0) {
    throw ApiError.forbidden(
      "You have no AI credits left. Please upgrade your plan to continue."
    );
  }

  const remainingCredits = (user.apiCredits ?? 1) - 1;

  const [updatedUser] = await db
    .update(usersTable)
    .set({ apiCredits: remainingCredits })
    .where(eq(usersTable.id, userId))
    .returning({
      apiCredits: usersTable.apiCredits,
      planType: usersTable.planType,
      passStatus: usersTable.passStatus,
      passExpiryDate: usersTable.passExpiryDate,
    });

  return {
    planType: (updatedUser?.planType ?? user.planType) as PlanType,
    remainingCredits: updatedUser?.apiCredits ?? remainingCredits,
    passStatus: updatedUser?.passStatus ?? user.passStatus,
    passExpiryDate: updatedUser?.passExpiryDate ?? user.passExpiryDate,
  };
}

export async function getCurrentUserPlanService(userId: string) {
  const [user] = await db
    .select({
      planType: usersTable.planType,
      passStatus: usersTable.passStatus,
      passExpiryDate: usersTable.passExpiryDate,
      apiCredits: usersTable.apiCredits,
    })
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .limit(1);

  if (!user) {
    throw ApiError.notFound("User not found");
  }

  const planType = user.planType as PlanType | null;
  const plan = planType ? PLAN_CONFIG[planType] : null;
  const expiryDate = user.passExpiryDate ? new Date(user.passExpiryDate) : null;
  const isActive =
    user.passStatus === "active" && expiryDate
      ? expiryDate > new Date()
      : false;

  return {
    planType,
    title: plan?.title ?? null,
    priceDisplay: plan?.priceDisplay ?? null,
    credits: plan?.credits ?? 0,
    apiCredits: user.apiCredits ?? 0,
    passStatus: user.passStatus ?? null,
    passExpiryDate: expiryDate ? expiryDate.toISOString() : null,
    isActive,
  };
}

/**
 * Directly verify frontend checkout payment signature and activate the 30-day pass
 */
export async function verifyAndActivatePass({
  userId,
  planType,
  razorpayOrderId,
  razorpayPaymentId,
  razorpaySignature,
}: VerifyPassParams) {
  // 1. Verify Razorpay Signature
  const secret = process.env.RAZORPAY_KEY_SECRET!;
  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (generatedSignature !== razorpaySignature) {
    throw new Error("Invalid payment signature.");
  }

  // 2. Grant pass in database
  return await grantPassToUser(userId, planType, razorpayOrderId);
}

/**
 * Webhook processor for handling captured and failed payment events
 */
export async function processWebhookEvent(
  rawBody: Buffer | string,
  signature: string
) {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET!;
  const expectedSignature = crypto
    .createHmac("sha256", webhookSecret)
    .update(rawBody)
    .digest("hex");

  if (expectedSignature !== signature) {
    throw new Error("Invalid webhook signature.");
  }

  const payload =
    typeof rawBody === "string"
      ? JSON.parse(rawBody)
      : JSON.parse(rawBody.toString());

  const { event } = payload;

  switch (event) {
    case "payment.captured": {
      const payment = payload.payload.payment.entity;
      const { userId, planType } = payment.notes || {};

      if (userId && planType) {
        await grantPassToUser(userId, planType as PlanType, payment.order_id);
      }
      break;
    }

    case "payment.failed": {
      const payment = payload.payload.payment.entity;
      const { userId } = payment.notes || {};
      const reason = payment.error_description || "Transaction failed";

      console.warn(`[Payment Failed] User ID: ${userId} | Reason: ${reason}`);
      break;
    }
  }

  return { success: true };
}
