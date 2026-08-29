import { processWebhookEvent } from "@/app/server/services/payment.service";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing x-razorpay-signature header." },
        { status: 400 }
      );
    }

    // Read the raw text body for HMAC signature validation
    const rawBody = await request.text();

    await processWebhookEvent(rawBody, signature);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Webhook processing failed." },
      { status: 400 }
    );
  }
}
