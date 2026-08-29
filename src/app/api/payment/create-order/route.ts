import { createOrder } from "@/app/server/services/payment.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { userId, planType } = await request.json();

    if (!userId || !planType) {
      return NextResponse.json(
        { error: "userId and planType are required." },
        { status: 400 }
      );
    }

    const orderData = await createOrder(userId, planType);

    return NextResponse.json(
      { success: true, data: orderData },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to create payment order." },
      { status: 500 }
    );
  }
}
