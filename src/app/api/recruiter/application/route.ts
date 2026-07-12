import { authenticate } from "@/app/middlewares/authenticate";
import { getAllWorkerApplicationService } from "@/app/services/workerApplication.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";

export const GET = authenticate(async (req: NextRequest, context) => {
  try {
    const user = context.user;

    if (!user) throw ApiError.unauthorized("User not found");

    const recruiterApplication = await getAllWorkerApplicationService(user);

    return ApiResponse.ok(
      "Recruiter application fetched successfully",
      recruiterApplication
    );
  } catch (error) {
    console.error(error);
    return error instanceof ApiError
      ? handleApiError(error)
      : handleApiError(ApiError.internal("Internal server error", error));
  }
});
