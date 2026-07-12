import { and, eq } from "drizzle-orm";
import { getDb } from "../db";
import { usersTable } from "../db/auth.schema";
import { workersTable } from "../db/worker.schema";
import { workerApplicationsTable } from "../db/workerApplication.schema";
import ApiError from "../utils/apiError";
import { tokenPayload } from "../utils/token";

export interface WorkerApplicationInput {
  salaryExpectation?: number | null;
  currency?: string;
  payPeriod?: "hourly" | "monthly" | "yearly";
  locality?: string | null;
  city: string;
  country: string;
  industry: string;
  phone?: string | null;
  status?: "pending" | "accepted" | "rejected";
}

export const saveWorkerApplicationService = async (
  data: WorkerApplicationInput,
  user: tokenPayload,
  workerId: string
) => {
  if (!user.id) {
    throw ApiError.forbidden(
      "You do not have access to manage this profile context."
    );
  }

  const db = getDb();

  const [userData] = await db
    .select({
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    })
    .from(usersTable)
    .innerJoin(workersTable, eq(workersTable.userId, usersTable.id))
    .where(eq(workersTable.id, workerId));

  if (!userData || !userData.firstName) {
    throw ApiError.notFound(
      "Associated user profile records could not be resolved."
    );
  }

  const { city, country, industry } = data;
  if (!city || !country || !industry) {
    throw ApiError.badRequest(
      "Missing fields: city, country, and industry are required."
    );
  }

  const [newApplication] = await db
    .insert(workerApplicationsTable)
    .values({
      workerId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      salaryExpectation: data.salaryExpectation
        ? Number(data.salaryExpectation)
        : null,
      currency: data.currency || "INR",
      payPeriod: data.payPeriod || "yearly",
      locality: data.locality || null,
      city,
      country,
      industry,
      phone: data.phone || null,
      status: data.status || "pending",
    })
    .returning();

  return newApplication;
};

export const getWorkerApplicationService = async (
  user: tokenPayload,
  workerId: string
) => {
  if (!user.id) {
    throw ApiError.forbidden(
      "You do not have access to view this profile application."
    );
  }

  const db = getDb();

  const applications = await db
    .select()
    .from(workerApplicationsTable)
    .where(eq(workerApplicationsTable.workerId, workerId));

  return applications;
};

export const getAllWorkerApplicationService = async (user: tokenPayload) => {
  if (!user.id) {
    throw ApiError.forbidden(
      "You do not have access to view this profile application."
    );
  }

  const db = getDb();

  const applications = await db.select().from(workerApplicationsTable);

  return applications;
};

export const updateWorkerApplicationService = async (
  data: Partial<WorkerApplicationInput>,
  user: tokenPayload,
  workerId: string,
  applicationId: string
) => {
  if (!user.id) {
    throw ApiError.forbidden(
      "You do not have access to edit this profile application."
    );
  }

  const db = getDb();

  const [updatedApplication] = await db
    .update(workerApplicationsTable)
    .set({
      ...data,
      salaryExpectation: data.salaryExpectation
        ? Number(data.salaryExpectation)
        : undefined,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(workerApplicationsTable.id, applicationId),
        eq(workerApplicationsTable.workerId, workerId)
      )
    )
    .returning();

  if (!updatedApplication) {
    throw ApiError.notFound("No application record found to update.");
  }

  return updatedApplication;
};

export const deleteWorkerApplicationService = async (
  user: tokenPayload,
  workerId: string,
  applicationId: string
) => {
  if (!user.id) {
    throw ApiError.forbidden(
      "You do not have access to perform this operation."
    );
  }

  const db = getDb();

  const result = await db
    .delete(workerApplicationsTable)
    .where(
      and(
        eq(workerApplicationsTable.id, applicationId),
        eq(workerApplicationsTable.workerId, workerId)
      )
    )
    .returning({ id: workerApplicationsTable.id });

  if (result.length === 0) {
    throw ApiError.notFound(
      "No matching application record found to delete for this worker profile."
    );
  }

  return true;
};

export const getSingleWorkerApplicationService = async (
  user: tokenPayload,
  workerId: string,
  applicationId: string
) => {
  if (!user.id) {
    throw ApiError.forbidden(
      "You do not have access to view this profile application."
    );
  }

  const db = getDb();

  const [application] = await db
    .select()
    .from(workerApplicationsTable)
    .where(
      and(
        eq(workerApplicationsTable.id, applicationId),
        eq(workerApplicationsTable.workerId, workerId)
      )
    );

  if (!application) {
    throw ApiError.notFound(
      "The requested application record could not be found for this worker profile."
    );
  }

  return application;
};
