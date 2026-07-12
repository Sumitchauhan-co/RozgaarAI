import { authenticate } from "@/app/middlewares/authenticate";
import { workerModel, workerUpdateModel } from "@/app/models/worker.model";
import { cookieOptions } from "@/app/services/auth.service";
import {
  deleteWorkerService,
  fetchWorkerService,
  saveWorkerProfileService,
  updateWorkerProfileService,
} from "@/app/services/worker.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { validateBody } from "@/app/utils/validate";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const POST = authenticate(async (req: NextRequest, context) => {
  return validateBody(workerModel)(req, async data => {
    try {
      const user = context.user;

      if (!user) {
        throw ApiError.notFound("User not found");
      }

      if (user.role !== "worker") {
        throw ApiError.badRequest(
          "Only users with a worker role can create a worker profile."
        );
      }

      const worker = await saveWorkerProfileService(data, user);
      const cookieStore = await cookies();
      cookieStore.set("workerId", worker.id, cookieOptions);

      return ApiResponse.created("Worker profile created successfully", worker);
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

    const workers = await fetchWorkerService(user);

    return ApiResponse.ok("Fetched all workers profile successfully", workers);
  } catch (error) {
    console.log(error);

    if (error instanceof ApiError) {
      return handleApiError(error);
    }

    return handleApiError(ApiError.internal("Internal server error", error));
  }
});

export const PATCH = authenticate(async (req: NextRequest, context) => {
  return validateBody(workerUpdateModel)(req, async data => {
    try {
      const user = context.user;

      if (!user) {
        throw ApiError.notFound("User not found");
      }

      if (user.role !== "worker") {
        throw ApiError.unauthorized(
          "Only users with a worker role can update a worker profile."
        );
      }

      const worker = await updateWorkerProfileService(data, user);
      const cookieStore = await cookies();
      cookieStore.set("workerId", worker?.id ?? "", cookieOptions);

      return ApiResponse.ok("Update worker fields successfully", worker);
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

    await deleteWorkerService(user);

    return ApiResponse.ok("Worker details deleted successfully");
  } catch (error) {
    console.log(error);

    if (error instanceof ApiError) {
      return handleApiError(error);
    }

    return handleApiError(ApiError.internal("Internal server error", error));
  }
});
