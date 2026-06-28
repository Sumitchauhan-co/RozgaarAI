import { usersTable } from "@/app/db/auth.schema";
import { db } from "@/app/db/index";
import apiError from "@/app/utils/apiError";
import { tokenPayload, verifyAccessToken } from "@/app/utils/token";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export interface AuthenticatedContext {
  user: tokenPayload;
}

type AuthenticatedHandler = (
  req: NextRequest,
  context: AuthenticatedContext
) => Promise<Response> | Response;

export const authenticate = (handler: AuthenticatedHandler) => {
  return async (req: NextRequest) => {
    try {
      const header = req.headers.get("authorization");

      if (!header || !header.startsWith("Bearer ")) {
        return apiError.badRequest("Invalid authorization header");
      }

      const token = header.split(" ")[1];
      if (!token) {
        return apiError.unauthorized("Not authorized for the action");
      }

      const decoded = (await verifyAccessToken(token)) as tokenPayload;

      const [user] = await db
        .select({
          id: usersTable.id,
          role: usersTable.role,
        })
        .from(usersTable)
        .where(eq(usersTable.id, decoded.id));

      if (!user) {
        return apiError.unauthorized("User no longer exists");
      }

      return await handler(req, {
        user: {
          id: user.id,
          role: user.role as "worker" | "recruiter" | "admin",
        },
      });
    } catch (error) {
      return apiError.unauthorized("Invalid or expired token");
    }
  };
};
