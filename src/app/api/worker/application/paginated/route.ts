import { authenticate } from "@/app/server/middlewares/authenticate";
import { getPaginatedWorkerApplicationsService } from "@/app/server/services/workerApplication.service";
import ApiError, { handleApiError } from "@/app/utils/apiError";
import ApiResponse from "@/app/utils/apiResponse";
import { NextRequest } from "next/server";

const DEFAULT_PAGE_SIZE = 5;
const MAX_PAGE_SIZE = 50;

export const GET = authenticate(async (req: NextRequest, context) => {
  try {
    const user = context.user;

    if (!user) throw ApiError.unauthorized("User not found");

    const page = Number(req.nextUrl.searchParams.get("page") || "1");
    const pageSize = Number(
      req.nextUrl.searchParams.get("pageSize") || DEFAULT_PAGE_SIZE
    );

    if (!Number.isInteger(page) || page < 1) {
      throw ApiError.badRequest("Page must be a positive integer.");
    }

    if (
      !Number.isInteger(pageSize) ||
      pageSize < 1 ||
      pageSize > MAX_PAGE_SIZE
    ) {
      throw ApiError.badRequest(
        `Page size must be an integer between 1 and ${MAX_PAGE_SIZE}.`
      );
    }

    const result = await getPaginatedWorkerApplicationsService(
      user,
      page,
      pageSize
    );

    return ApiResponse.ok("Worker applications fetched successfully", result);
  } catch (error) {
    console.error(error);
    return error instanceof ApiError
      ? handleApiError(error)
      : handleApiError(ApiError.internal("Internal server error", error));
  }
});
