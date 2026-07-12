import { usersTable } from "@/app/db/auth.schema";
import { getDb } from "@/app/db/index";
import apiError, { handleApiError } from "@/app/utils/apiError";
import { tokenPayload, verifyAccessToken } from "@/app/utils/token";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

type NextRouteContext<T> = {
  params: Promise<T>;
};

export type AuthenticatedContext<T> = {
  user: tokenPayload;
  params: Promise<T>;
};

type AuthenticatedHandler<T> = (
  req: NextRequest,
  context: AuthenticatedContext<T>
) => Promise<Response> | Response;

export const authenticate = <T>(handler: AuthenticatedHandler<T>) => {
  return async (req: NextRequest, nextJsContext: NextRouteContext<T>) => {
    try {
      const header = req.headers.get("authorization");

      if (!header || !header.startsWith("Bearer ")) {
        return handleApiError(
          apiError.notFound("Invalid or missing authorization header")
        );
      }

      const tokenParts = header.split(" ");
      const token = tokenParts[1];
      if (!token) {
        return handleApiError(
          apiError.notFound("Not authorized for the action")
        );
      }

      const decoded = (await verifyAccessToken(token)) as tokenPayload;

      const db = getDb();

      const [user] = await db
        .select({
          id: usersTable.id,
          role: usersTable.role,
        })
        .from(usersTable)
        .where(eq(usersTable.id, decoded.id));

      if (!user) {
        return handleApiError(apiError.unauthorized("User no longer exists"));
      }

      return await handler(req, {
        params: nextJsContext.params,
        user: {
          id: user.id,
          role: user.role as "worker" | "recruiter" | "admin" | "guest",
        },
      });
    } catch (error) {
      console.log("Middleware error : ", error);
      return handleApiError(apiError.unauthorized("Invalid or expired token"));
    }
  };
};
