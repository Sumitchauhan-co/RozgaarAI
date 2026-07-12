import { authenticate } from "@/app/middlewares/authenticate";
import { getUserService } from "@/app/services/auth.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";

export const GET = authenticate(async (req: NextRequest, context) => {
  try {
    const user = context.user;

    if (!user) {
      return handleApiError(ApiError.unauthorized("Unauthorized access"));
    }

    const res = await getUserService(user.id);
    return ApiResponse.ok("User fetched successfully", res);
  } catch (error) {
    console.error(error);
    return handleApiError(
      error instanceof ApiError
        ? error
        : ApiError.internal("Internal server error", error)
    );
  }
});
