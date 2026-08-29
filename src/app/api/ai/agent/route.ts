import { authenticate } from "@/app/server/middlewares/authenticate";
import { runAgentExecution } from "@/app/server/services/agent.service";
import { consumeAiCreditForUser } from "@/app/server/services/payment.service";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const agentRequestSchema = z.object({
  prompt: z.string().trim().min(1, "Prompt is required."),
  mode: z.enum(["candidate", "recruiter"]).default("candidate"),
});

export const POST = authenticate(async (req: NextRequest, context) => {
  try {
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { success: false, error: "Request body must be valid JSON." },
        { status: 400 }
      );
    }

    const parsedBody = agentRequestSchema.safeParse(body);
    if (!parsedBody.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request payload.",
          details: parsedBody.error.issues,
        },
        { status: 400 }
      );
    }

    try {
      await consumeAiCreditForUser(context.user.id);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "AI access is unavailable.";

      return NextResponse.json(
        {
          success: false,
          error: message,
          redirectToPricing: true,
          requiresPlan: true,
        },
        { status: 403 }
      );
    }

    const responseText = await runAgentExecution(parsedBody.data);

    return NextResponse.json({ success: true, text: responseText });
  } catch (error) {
    console.error("AI agent request failed:", error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "AI request failed.",
      },
      { status: 500 }
    );
  }
});
