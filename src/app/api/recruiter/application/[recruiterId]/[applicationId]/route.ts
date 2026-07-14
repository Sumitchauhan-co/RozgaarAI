import { authenticate } from "@/app/middlewares/authenticate";
import { recruiterApplicationUpdateSchema } from "@/app/models/recruiterApplication.model";
import {
  deleteRecruiterApplicationService,
  getSingleRecruiterApplicationService,
  updateRecruiterApplicationService,
} from "@/app/services/recruiterApplication.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { tokenPayload } from "@/app/utils/token";
import { validateBody } from "@/app/utils/validate";
import { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{
    recruiterId: string;
    applicationId: string;
  }>;
  user?: tokenPayload;
};

export const GET = authenticate(
  async (req: NextRequest, context: RouteContext) => {
    try {
      const { recruiterId, applicationId } = await context.params;
      const user = context.user;

      if (!user) throw ApiError.unauthorized("User not found");

      const application = await getSingleRecruiterApplicationService(
        user,
        recruiterId,
        applicationId
      );

      return ApiResponse.ok(
        "Worker application fetched successfully",
        application
      );
    } catch (error) {
      console.error(error);
      return error instanceof ApiError
        ? handleApiError(error)
        : handleApiError(ApiError.internal("Internal server error", error));
    }
  }
);

export const DELETE = authenticate(
  async (req: NextRequest, context: RouteContext) => {
    try {
      const { recruiterId, applicationId } = await context.params;
      const user = context.user;

      if (!user) throw ApiError.unauthorized("User not found");

      await deleteRecruiterApplicationService(user, recruiterId, applicationId);

      return ApiResponse.ok("Worker application deleted successfully", null);
    } catch (error) {
      console.error(error);
      return error instanceof ApiError
        ? handleApiError(error)
        : handleApiError(ApiError.internal("Internal server error", error));
    }
  }
);

export const PATCH = authenticate(
  async (req: NextRequest, context: RouteContext) => {
    return validateBody(recruiterApplicationUpdateSchema)(req, async data => {
      try {
        const { recruiterId, applicationId } = await context.params;
        const user = context.user;

        if (!user) throw ApiError.unauthorized("User not found");

        const updatedApplication = await updateRecruiterApplicationService(
          data,
          user,
          recruiterId,
          applicationId
        );

        return ApiResponse.ok(
          "Worker application updated successfully",
          updatedApplication
        );
      } catch (error) {
        console.error(error);
        return error instanceof ApiError
          ? handleApiError(error)
          : handleApiError(ApiError.internal("Internal server error", error));
      }
    });
  }
);
