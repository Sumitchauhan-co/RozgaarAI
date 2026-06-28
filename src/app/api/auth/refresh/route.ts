import { authenticate } from "@/app/middlewares/authenticate";
import { cookieOptions, refreshService } from "@/app/services/auth.service";
import ApiError from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { cookies } from "next/headers";

export const POST = authenticate(async () => {
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
    console.log(error);

    throw ApiError.internal("Internal server error");
  }
});
