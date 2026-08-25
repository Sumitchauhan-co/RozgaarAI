import { signinModel } from "@/app/server/models/auth.model";
import {
  cookieOptions,
  signinService,
} from "@/app/server/services/auth.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { validateBody } from "@/app/utils/validate";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  return validateBody(signinModel)(req, async data => {
    try {
      const { user, accessToken } = await signinService(data);

      if (!user.refreshToken) {
        throw ApiError.notFound("Missing refresh token from user data");
      }

      const cookieStore = await cookies();
      cookieStore.set("refreshToken", user.refreshToken, cookieOptions);

      return ApiResponse.ok("User created successfully", {
        user,
        accessToken,
      });
    } catch (error) {
      console.log(error);

      if (error instanceof ApiError) {
        return handleApiError(error);
      }

      return handleApiError(ApiError.internal("Internal server error", error));
    }
  });
};
