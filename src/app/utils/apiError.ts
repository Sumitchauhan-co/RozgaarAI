import { NextResponse } from "next/server";

class ApiError extends Error {
  statusCode: number;
  isOperational: boolean;
  data: unknown;

  constructor(statusCode: number, message: string, error: unknown = null) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
    this.isOperational = true;
    this.data = error;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  // Static Factory Methods
  static badRequest(message = "Bad request", error: unknown = null) {
    return new ApiError(400, message, error);
  }

  static unauthorized(message = "Unauthorized", error: unknown = null) {
    return new ApiError(401, message, error);
  }

  static forbidden(message = "Forbidden", error: unknown = null) {
    return new ApiError(403, message, error);
  }

  static notFound(message = "Not found", error: unknown = null) {
    return new ApiError(404, message, error);
  }

  static conflict(message = "Conflict", error: unknown = null) {
    return new ApiError(409, message, error);
  }

  static internal(message = "Server error", error: unknown = null) {
    return new ApiError(500, message, error);
  }
}

/**
 * Next.js centralized API error handler response wrapper
 */
export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
        errors: error.data,
      },
      { status: error.statusCode }
    );
  }

  // Fallback for unexpected runtime crashes
  console.error("Unhandled Error:", error);
  return NextResponse.json(
    { success: false, message: "Internal Server Error" },
    { status: 500 }
  );
}

export default ApiError;
