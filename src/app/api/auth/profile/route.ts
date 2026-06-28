import { profileService } from "@/app/services/auth.service";
import ApiError from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";

interface RouteContext {
  params: Promise<{ id: string }>;
}

export const GET = async (req: NextRequest, context: RouteContext) => {
  try {
    const { id } = await context.params;

    if (!id) {
      throw ApiError.notFound("Profile not found");
    }

    const user = await profileService(id);

    return ApiResponse.ok("User profile fetched successfully", { user });
  } catch (error) {
    console.log(error);

    throw ApiError.internal("Internal server error");
  }
};
