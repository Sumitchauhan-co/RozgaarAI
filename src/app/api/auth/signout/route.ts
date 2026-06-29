import { authenticate } from "@/app/middlewares/authenticate";
import { signoutService } from "@/app/services/auth.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = authenticate(async (req: NextRequest, context) => {
  try {
    const user = context.user;
    if (!user) {
      throw ApiError.notFound("User not found");
    }

    await signoutService(user);

    const cookieStore = await cookies();

    cookieStore.delete({
      name: "refreshToken",
      path: "/",
    });

    return ApiResponse.ok("User signed out successfully");
  } catch (error) {
    console.log(error);

    return handleApiError(ApiError.internal("Internal server error", error));
  }
});
