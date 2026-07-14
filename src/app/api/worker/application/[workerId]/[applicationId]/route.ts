import { authenticate } from "@/app/middlewares/authenticate";
import { updateWorkerApplicationSchema } from "@/app/models/workerApplication.model";
import {
  deleteWorkerApplicationService,
  getSingleWorkerApplicationService,
  updateWorkerApplicationService,
} from "@/app/services/workerApplication.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { tokenPayload } from "@/app/utils/token";
import { validateBody } from "@/app/utils/validate";
import { NextRequest } from "next/server";

type RouteContext = {
  params: Promise<{
    workerId: string;
    applicationId: string;
  }>;
  user?: tokenPayload;
};

export const GET = authenticate(
  async (req: NextRequest, context: RouteContext) => {
    try {
      const { workerId, applicationId } = await context.params;
      console.log(context.params);
      console.log("worker id: ", workerId);
      console.log("application id: ", applicationId);

      const user = context.user;

      if (!user) throw ApiError.unauthorized("User not found");

      const application = await getSingleWorkerApplicationService(
        user,
        workerId,
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
      const { workerId, applicationId } = await context.params;
      const user = context.user;

      if (!user) throw ApiError.unauthorized("User not found");

      await deleteWorkerApplicationService(user, workerId, applicationId);

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
    return validateBody(updateWorkerApplicationSchema)(req, async data => {
      try {
        const { workerId, applicationId } = await context.params;
        const user = context.user;

        if (!user) throw ApiError.unauthorized("User not found");

        const updatedApplication = await updateWorkerApplicationService(
          data,
          user,
          workerId,
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
