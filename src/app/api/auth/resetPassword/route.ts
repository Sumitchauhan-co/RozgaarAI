import { resetPasswordService } from "@/app/services/auth.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      throw ApiError.unauthorized("Invalid or missing token");
    }

    const body = await req.json();
    const { newPassword, confirmPassword } = body;

    if (!newPassword || !confirmPassword) {
      throw ApiError.badRequest("Passwords are required");
    }

    if (newPassword !== confirmPassword) {
      throw ApiError.badRequest("Passwords do not match");
    }

    const user = await resetPasswordService({ token, newPassword });

    return ApiResponse.ok("Password reset successfully", { user });
  } catch (error) {
    console.error("Reset Password Error:", error);

    if (error instanceof ApiError) {
      return handleApiError(error);
    }

    return handleApiError(ApiError.internal("Internal server error", error));
  }
};
