import { verifyEmailService } from "@/app/services/auth.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      throw ApiError.unauthorized("Invalid token");
    }

    const { user } = await verifyEmailService(token);

    return ApiResponse.ok("Email verified successfully", { user });
  } catch (error) {
    console.log(error);

    if (error instanceof ApiError) {
      return handleApiError(error);
    }

    return handleApiError(ApiError.internal("Internal server error", error));
  }
};
