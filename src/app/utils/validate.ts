import { NextResponse } from "next/server";
import type { z } from "zod";

export const validateBody = <Schema extends z.ZodType>(schema: Schema) => {
  return async (
    req: Request,
    handler: (data: z.output<Schema>) => Promise<Response>
  ): Promise<Response> => {
    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid JSON payload" },
        { status: 400 }
      );
    }

    const result = await schema.safeParseAsync(body);

    if (!result.success) {
      return NextResponse.json(
        { message: "Validation error", errors: result.error.issues },
        { status: 400 }
      );
    }

    return handler(result.data);
  };
};
