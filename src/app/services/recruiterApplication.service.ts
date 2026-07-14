import { and, eq } from "drizzle-orm";
import { getDb } from "../db";
import { usersTable } from "../db/auth.schema";
import { recruitersTable } from "../db/recruiter.schema";
import { recruiterApplicationsTable } from "../db/recruiterApplication.schema";
import { RecruiterApplicationInput } from "../models/recruiterApplication.model";
import ApiError from "../utils/apiError";
import { tokenPayload } from "../utils/token";

export const saveRecruiterApplicationService = async (
  data: RecruiterApplicationInput,
  user: tokenPayload,
  recruiterId: string
) => {
  if (!user.id) {
    throw ApiError.forbidden(
      "You do not have access to manage this profile context."
    );
  }

  if (!recruiterId) {
    throw ApiError.badRequest("Missing recruiterId parameter.");
  }

  const db = getDb();

  const [userData] = await db
    .select({
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    })
    .from(usersTable)
    .innerJoin(recruitersTable, eq(recruitersTable.userId, usersTable.id))
    .where(eq(recruitersTable.id, recruiterId));

  if (!userData || !userData.firstName) {
    throw ApiError.notFound(
      "Associated recruiter profile records could not be resolved."
    );
  }

  const { companyName, city, country } = data;
  if (!companyName || !city || !country) {
    throw ApiError.badRequest(
      "Missing fields: companyName, city, and country are required."
    );
  }

  const [newApplication] = await db
    .insert(recruiterApplicationsTable)
    .values({
      recruiterId,
      firstName: userData.firstName,
      lastName: userData.lastName,
      salary: data.salary ? Number(data.salary) : null,
      currency: data.currency || "INR",
      payPeriod: data.payPeriod || "yearly",
      companyName,
      industry: data.industry || null,
      locality: data.locality || null,
      city,
      country,
      phone: data.phone || null,
      // status: data.status || "pending",
    })
    .returning();

  return newApplication;
};

export const getRecruiterApplicationsService = async (
  user: tokenPayload,
  recruiterId: string
) => {
  if (!user.id) {
    throw ApiError.forbidden(
      "You do not have access to view this profile application."
    );
  }

  const db = getDb();

  const applications = await db
    .select()
    .from(recruiterApplicationsTable)
    .where(eq(recruiterApplicationsTable.recruiterId, recruiterId));

  return applications;
};

export const getAllRecruiterApplicationService = async (user: tokenPayload) => {
  if (!user.id) {
    throw ApiError.forbidden(
      "You do not have access to view this profile application."
    );
  }

  const db = getDb();

  const applications = await db.select().from(recruiterApplicationsTable);

  return applications;
};

export const updateRecruiterApplicationService = async (
  data: Partial<RecruiterApplicationInput>,
  user: tokenPayload,
  recruiterId: string,
  applicationId: string
) => {
  if (!user.id) {
    throw ApiError.forbidden(
      "You do not have access to edit this profile application."
    );
  }

  const db = getDb();

  const [updatedApplication] = await db
    .update(recruiterApplicationsTable)
    .set({
      ...data,
      salary: data.salary ? Number(data.salary) : undefined,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(recruiterApplicationsTable.id, applicationId),
        eq(recruiterApplicationsTable.recruiterId, recruiterId)
      )
    )
    .returning();

  console.log(updatedApplication);

  if (!updatedApplication) {
    throw ApiError.notFound("No application record found to update.");
  }

  return updatedApplication;
};

export const deleteRecruiterApplicationService = async (
  user: tokenPayload,
  recruiterId: string,
  applicationId: string
) => {
  if (!user.id) {
    throw ApiError.forbidden(
      "You do not have access to perform this operation."
    );
  }

  const db = getDb();

  const result = await db
    .delete(recruiterApplicationsTable)
    .where(
      and(
        eq(recruiterApplicationsTable.id, applicationId),
        eq(recruiterApplicationsTable.recruiterId, recruiterId)
      )
    )
    .returning({ id: recruiterApplicationsTable.id });

  if (result.length === 0) {
    throw ApiError.notFound(
      "No matching application record found to delete for this recruiter profile."
    );
  }

  return true;
};

export const getSingleRecruiterApplicationService = async (
  user: tokenPayload,
  recruiterId: string,
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
    .from(recruiterApplicationsTable)
    .where(
      and(
        eq(recruiterApplicationsTable.id, applicationId),
        eq(recruiterApplicationsTable.recruiterId, recruiterId)
      )
    );

  if (!application) {
    throw ApiError.notFound(
      "The requested application record could not be found for this recruiter profile."
    );
  }

  return application;
};
