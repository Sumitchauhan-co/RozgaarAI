import { signupModel } from "@/app/models/auth.model";
import { cookieOptions, signupService } from "@/app/services/auth.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { validateBody } from "@/app/utils/validate";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  try {
    return validateBody(signupModel)(req, async data => {
      const { user, accessToken } = await signupService(data);

      const cookieStore = await cookies();
      cookieStore.set("refreshToken", user.refreshToken, cookieOptions);

      return ApiResponse.created("User created successfully", {
        user,
        accessToken,
      });
    });
  } catch (error) {
    console.log(error);

    if (error instanceof ApiError) {
      return handleApiError(error);
    }

    return handleApiError(ApiError.internal("Internal server error", error));
  }
};
