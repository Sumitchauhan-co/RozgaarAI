import { cookieOptions, refreshService } from "@/app/services/auth.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const cookieStore = await cookies();
    const cookieObject = cookieStore.get("refreshToken");

    const refreshToken = cookieObject?.value;

    if (!refreshToken) {
      throw ApiError.unauthorized("Invalid or expired token");
    }

    const { accessToken, user } = await refreshService(refreshToken);

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    if (!user.refreshToken) {
      throw ApiError.notFound("Missing refresh token from user data");
    }

    cookieStore.set("refreshToken", user.refreshToken, cookieOptions);

    return ApiResponse.ok("Token refreshed successfully", {
      accessToken,
      user,
    });
  } catch (error) {
    console.error(error);

    if (error instanceof ApiError) {
      return handleApiError(error);
    }

    return handleApiError(ApiError.internal("Internal server error", error));
  }
};
