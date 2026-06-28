import { forgotPasswordService } from "@/app/services/auth.service";
import ApiError from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const email = body?.email;

    if (!email) {
      throw ApiError.notFound("Email not found");
    }

    await forgotPasswordService(email);

    return ApiResponse.ok("Email sent successfully to the existing account");
  } catch (error) {
    console.log(error);

    throw ApiError.internal("Internal server error");
  }
};
