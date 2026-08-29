import { verifyAndActivatePass } from "@/app/server/services/payment.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      userId,
      planType,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    } = body;

    if (
      !userId ||
      !planType ||
      !razorpayOrderId ||
      !razorpayPaymentId ||
      !razorpaySignature
    ) {
      return NextResponse.json(
        { error: "Missing required checkout parameters." },
        { status: 400 }
      );
    }

    const updatedUser = await verifyAndActivatePass({
      userId,
      planType,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });

    return NextResponse.json(
      { success: true, user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Payment verification failed." },
      { status: 400 }
    );
  }
}
