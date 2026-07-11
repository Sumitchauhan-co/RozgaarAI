import { eq } from "drizzle-orm";
import { db } from "../db";
import { workersTable } from "../db/worker.schema";
import { UpdateWorker, Worker } from "../models/worker.model";
import ApiError from "../utils/apiError";

interface UserContext {
  id: string;
}

export const saveWorkerProfileService = async (
  { age, city, profession }: Worker,
  user: UserContext
) => {
  if (!Array.isArray(profession) || profession.length === 0 || !city || !age) {
    throw ApiError.notFound("Missing fields for worker profile");
  }

  const [newWorker] = await db
    .insert(workersTable)
    .values({
      userId: user.id,
      age,
      city,
      profession,
    })
    .returning();

  return newWorker;
};

export const fetchWorkerService = async (user: UserContext) => {
  const [result] = await db
    .select()
    .from(workersTable)
    .where(eq(workersTable.userId, user.id));

  return result || null;
};

export const updateWorkerProfileService = async (
  data: UpdateWorker,
  user: UserContext
) => {
  const [updatedRecords] = await db
    .update(workersTable)
    .set(data)
    .where(eq(workersTable.userId, user.id))
    .returning();

  return updatedRecords || null;
};

export const deleteWorkerService = async (user: UserContext) => {
  await db.delete(workersTable).where(eq(workersTable.userId, user.id));
};
