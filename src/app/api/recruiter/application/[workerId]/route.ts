import { authenticate } from "@/app/middlewares/authenticate";
import { recruiterApplicationSchema } from "@/app/models/recruiterApplication.model";
import {
  getRecruiterApplicationsService,
  saveRecruiterApplicationService,
} from "@/app/services/recruiterApplication.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { tokenPayload } from "@/app/utils/token";
import { validateBody } from "@/app/utils/validate";
import { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{ workerId: string }>;
  user?: tokenPayload;
};

export const GET = authenticate(
  async (req: NextRequest, context: RouteContext) => {
    try {
      const { workerId } = await context.params;
      const user = context.user;

      if (!user) throw ApiError.unauthorized("User not found");

      const recruiterApplication = await getRecruiterApplicationsService(
        user,
        workerId
      );

      return ApiResponse.ok(
        "Recruiter application fetched successfully",
        recruiterApplication
      );
    } catch (error) {
      console.error(error);
      return error instanceof ApiError
        ? handleApiError(error)
        : handleApiError(ApiError.internal("Internal server error", error));
    }
  }
);

export const POST = authenticate(
  async (req: NextRequest, context: RouteContext) => {
    return validateBody(recruiterApplicationSchema)(req, async data => {
      try {
        const { workerId } = await context.params;
        const user = context.user;

        if (!user) {
          throw ApiError.notFound("User not found");
        }
        const recruiterApplication = await saveRecruiterApplicationService(
          data,
          user,
          workerId
        );

        return ApiResponse.accepted(
          "Recruiter application created successfully",
          recruiterApplication
        );
      } catch (error) {
        console.log(error);

        if (error instanceof ApiError) {
          return handleApiError(error);
        }

        return handleApiError(
          ApiError.internal("Internal server error", error)
        );
      }
    });
  }
);
