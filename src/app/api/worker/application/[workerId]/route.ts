import { authenticate } from "@/app/middlewares/authenticate";
import { workerApplicationSchema } from "@/app/models/workerApplication.model";
import {
  getWorkerApplicationService,
  saveWorkerApplicationService,
} from "@/app/services/workerApplication.service";
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

      const workerApplication = await getWorkerApplicationService(
        user,
        workerId
      );

      return ApiResponse.ok(
        "Worker application fetched successfully",
        workerApplication
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
    return validateBody(workerApplicationSchema)(req, async data => {
      try {
        const { workerId } = await context.params;
        const user = context.user;

        if (!user) {
          throw ApiError.notFound("User not found");
        }
        const workerApplication = await saveWorkerApplicationService(
          data,
          user,
          workerId
        );

        return ApiResponse.accepted(
          "Worker application created successfully",
          workerApplication
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
