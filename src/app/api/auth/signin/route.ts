import { signinModel } from "@/app/models/auth.model";
import { cookieOptions, signinService } from "@/app/services/auth.service";
import ApiError from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { validateBody } from "@/app/utils/validate";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
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

      throw ApiError.internal("Internal server error");
    }
  });
};
