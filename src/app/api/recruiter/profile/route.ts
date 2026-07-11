import { authenticate } from "@/app/middlewares/authenticate";
import {
  recruiterModel,
  recruiterUpdateModel,
} from "@/app/models/recruiter.model";
import { cookieOptions } from "@/app/services/auth.service";
import {
  deleteRecruiterService,
  fetchRecruiterService,
  saveRecruiterProfileService,
  updateRecruiterProfileService,
} from "@/app/services/recruiter.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { validateBody } from "@/app/utils/validate";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = authenticate(async (req: NextRequest, context) => {
  return validateBody(recruiterModel)(req, async data => {
    try {
      const user = context.user;

      if (!user) {
        throw ApiError.notFound("User not found");
      }

      if (user.role !== "recruiter") {
        throw ApiError.badRequest(
          "Only users with a recruiter role can create a recruiter profile."
        );
      }

      const recruiter = await saveRecruiterProfileService(data, user);
      const cookieStore = await cookies();
      cookieStore.set("recruiterId", recruiter.id, cookieOptions);

      return ApiResponse.created(
        "Recruiter profile created successfully",
        recruiter
      );
    } catch (error) {
      console.log(error);

      if (error instanceof ApiError) {
        return handleApiError(error);
      }

      return handleApiError(ApiError.internal("Internal server error", error));
    }
  });
});

export const GET = authenticate(async (req, context) => {
  try {
    const user = context.user;

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    const recruiters = await fetchRecruiterService(user);

    return ApiResponse.ok(
      "Fetched all recruiters profile successfully",
      recruiters
    );
  } catch (error) {
    console.log(error);

    if (error instanceof ApiError) {
      return handleApiError(error);
    }

    return handleApiError(ApiError.internal("Internal server error", error));
  }
});

export const PATCH = authenticate(async (req: NextRequest, context) => {
  return validateBody(recruiterUpdateModel)(req, async data => {
    try {
      const user = context.user;

      if (!user) {
        throw ApiError.notFound("User not found");
      }

      if (user.role !== "recruiter") {
        throw ApiError.unauthorized(
          "Only users with a recruiter role can update a recruiter profile."
        );
      }

      const recruiter = await updateRecruiterProfileService(data, user);
      const cookieStore = await cookies();
      cookieStore.set("recruiterId", recruiter?.id ?? "", cookieOptions);

      return ApiResponse.ok("Update recruiter fields successfully", recruiter);
    } catch (error) {
      console.log(error);

      if (error instanceof ApiError) {
        return handleApiError(error);
      }

      return handleApiError(ApiError.internal("Internal server error", error));
    }
  });
});

export const DELETE = authenticate(async (req, context) => {
  try {
    const user = context.user;

    if (!user) {
      throw ApiError.notFound("User not found");
    }

    await deleteRecruiterService(user);

    return ApiResponse.ok("Recruiter details deleted successfully");
  } catch (error) {
    console.log(error);

    if (error instanceof ApiError) {
      return handleApiError(error);
    }

    return handleApiError(ApiError.internal("Internal server error", error));
  }
});
