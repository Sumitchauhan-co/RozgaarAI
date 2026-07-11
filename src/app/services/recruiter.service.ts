import { eq } from "drizzle-orm";
import { getDb } from "../db";
import { recruitersTable } from "../db/recruiter.schema";
import { Recruiter, UpdateRecruiter } from "../models/recruiter.model";
import ApiError from "../utils/apiError";

interface UserContext {
  id: string;
}

export const saveRecruiterProfileService = async (
  { companyName, city, industry }: Recruiter,
  user: UserContext
) => {
  if (!companyName || !city || !industry) {
    throw ApiError.notFound("Missing fields for recruiter profile");
  }

  const db = getDb();

  const [newRecruiter] = await db
    .insert(recruitersTable)
    .values({
      userId: user.id,
      companyName,
      city,
      industry,
    })
    .returning();

  return newRecruiter;
};

export const fetchRecruiterService = async (user: UserContext) => {
  const db = getDb();

  const [result] = await db
    .select()
    .from(recruitersTable)
    .where(eq(recruitersTable.userId, user.id));

  return result || null;
};

export const updateRecruiterProfileService = async (
  data: UpdateRecruiter,
  user: UserContext
) => {
  const db = getDb();

  const [updatedRecords] = await db
    .update(recruitersTable)
    .set(data)
    .where(eq(recruitersTable.userId, user.id))
    .returning();

  return updatedRecords || null;
};

export const deleteRecruiterService = async (user: UserContext) => {
  const db = getDb();

  await db.delete(recruitersTable).where(eq(recruitersTable.userId, user.id));
};
