import { authenticate } from "@/app/server/middlewares/authenticate";
import { getCurrentUserPlanService } from "@/app/server/services/payment.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";

export const GET = authenticate(async (_req: NextRequest, context) => {
  try {
    const currentPlan = await getCurrentUserPlanService(context.user.id);
    return ApiResponse.ok("Current plan fetched successfully", currentPlan);
  } catch (error) {
    console.error(error);
    return handleApiError(
      error instanceof ApiError
        ? error
        : ApiError.internal("Internal server error", error)
    );
  }
});
