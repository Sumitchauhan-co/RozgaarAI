import { getDb } from "@/app/db";
import { recruiterApplicationsTable } from "@/app/db/recruiterApplication.schema";
import { workerApplicationsTable } from "@/app/db/workerApplication.schema";
import { createEmbedding } from "@/app/lib/ai/embedding";
import { tool } from "@openrouter/agent/tool";
import { eq, isNotNull, sql } from "drizzle-orm";
import { z } from "zod";

const searchLimitSchema = z
  .number()
  .int()
  .min(1)
  .max(20)
  .default(5)
  .describe("Maximum number of matches to return");

export const searchJobPostingsTool = tool({
  name: "searchJobPostings",
  description:
    "Finds semantically matching job postings for a candidate based on prompt/skills.",
  inputSchema: z.object({
    query: z
      .string()
      .trim()
      .min(1)
      .describe("User preference or worker skills"),
    city: z.string().trim().min(1).optional(),
    limit: searchLimitSchema,
  }),
  async execute({ query, city, limit }) {
    console.log("⚡ Executing searchJobPostingsTool with query:", query);
    const db = getDb();

    const queryVector = await createEmbedding(query);
    const vectorString = `[${queryVector.join(",")}]`;

    // 1. Raw SQL template for calculating similarity score
    const similarity = sql<number>`1 - (${recruiterApplicationsTable.embedding} <=> ${vectorString}::vector)`;

    const results = await db
      .select({
        id: recruiterApplicationsTable.id,
        recruiterId: recruiterApplicationsTable.recruiterId,
        jobTitle: recruiterApplicationsTable.jobTitle,
        companyName: recruiterApplicationsTable.companyName,
        description: recruiterApplicationsTable.description,
        skills: recruiterApplicationsTable.skills,
        salary: recruiterApplicationsTable.salary,
        currency: recruiterApplicationsTable.currency,
        payPeriod: recruiterApplicationsTable.payPeriod,
        city: recruiterApplicationsTable.city,
        country: recruiterApplicationsTable.country,
        industry: recruiterApplicationsTable.industry,
        score: similarity,
      })
      .from(recruiterApplicationsTable)
      .where(
        city
          ? sql`${isNotNull(recruiterApplicationsTable.embedding)} AND ${eq(recruiterApplicationsTable.city, city)}`
          : isNotNull(recruiterApplicationsTable.embedding)
      )
      // 2. Raw SQL template for ordering by cosine distance (<=>)
      .orderBy(
        sql`${recruiterApplicationsTable.embedding} <=> ${vectorString}::vector`
      )
      .limit(limit);

    return results;
  },
});

export const searchWorkerApplicationsTool = tool({
  name: "searchWorkerApplications",
  description:
    "Finds semantically matching worker applications for a recruiter query.",
  inputSchema: z.object({
    query: z
      .string()
      .trim()
      .min(1)
      .describe("Recruiter criteria, required skills, or job expectations"),
    industry: z.string().trim().min(1).optional(),
    limit: searchLimitSchema,
  }),
  async execute({ query, industry, limit }) {
    console.log("⚡ Executing searchWorkerApplicationsTool with query:", query);
    const db = getDb();

    const queryVector = await createEmbedding(query);
    const vectorString = `[${queryVector.join(",")}]`;

    const similarity = sql<number>`1 - (${workerApplicationsTable.embedding} <=> ${vectorString}::vector)`;

    const results = await db
      .select({
        id: workerApplicationsTable.id,
        workerId: workerApplicationsTable.workerId,
        firstName: workerApplicationsTable.firstName,
        lastName: workerApplicationsTable.lastName,
        profession: workerApplicationsTable.profession,
        skills: workerApplicationsTable.skills,
        experienceYears: workerApplicationsTable.experienceYears,
        salaryExpectation: workerApplicationsTable.salaryExpectation,
        currency: workerApplicationsTable.currency,
        payPeriod: workerApplicationsTable.payPeriod,
        city: workerApplicationsTable.city,
        country: workerApplicationsTable.country,
        industry: workerApplicationsTable.industry,
        score: similarity,
      })
      .from(workerApplicationsTable)
      .where(
        industry
          ? sql`${isNotNull(workerApplicationsTable.embedding)} AND ${eq(workerApplicationsTable.industry, industry)}`
          : isNotNull(workerApplicationsTable.embedding)
      )
      .orderBy(
        sql`${workerApplicationsTable.embedding} <=> ${vectorString}::vector`
      )
      .limit(limit);

    return results;
  },
});
