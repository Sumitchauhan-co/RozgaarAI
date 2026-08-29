import { getDb } from "@/app/db";
import { recruiterApplicationsTable } from "@/app/db/recruiterApplication.schema";
import { workerApplicationsTable } from "@/app/db/workerApplication.schema";
import { createEmbedding } from "@/app/lib/ai/embedding";
import { openrouter } from "@/app/lib/ai/openrouter";
import {
  searchJobPostingsTool,
  searchWorkerApplicationsTool,
} from "@/app/server/ai/tool";
import { eq, isNull } from "drizzle-orm";
import { getSystemInstruction } from "../ai/prompt";

export type AgentMode = "candidate" | "recruiter";

interface RunAgentOptions {
  prompt: string;
  mode: AgentMode;
}

export async function ensureEmbeddingsExist(
  isRecruiter: boolean
): Promise<void> {
  const db = getDb();

  if (!isRecruiter) {
    const missingRecruiterApps = await db
      .select()
      .from(recruiterApplicationsTable)
      .where(isNull(recruiterApplicationsTable.embedding));

    if (missingRecruiterApps.length > 0) {
      console.log(
        `⏳ Auto-generating embeddings for ${missingRecruiterApps.length} recruiter postings...`
      );

      for (const app of missingRecruiterApps) {
        const skillsText = Array.isArray(app.skills)
          ? app.skills.join(" ")
          : app.skills || "";
        const textToEmbed =
          `${app.jobTitle || ""} at ${app.companyName || ""}. Industry: ${app.industry || ""}. Description: ${app.description || ""}. Skills: ${skillsText}`.trim();

        if (!textToEmbed) continue;

        try {
          const vector = await createEmbedding(textToEmbed);
          await db
            .update(recruiterApplicationsTable)
            .set({ embedding: vector })
            .where(eq(recruiterApplicationsTable.id, app.id));
        } catch (err) {
          console.error(
            `Failed to store embedding for recruiter app ID ${app.id}:`,
            err
          );
        }
      }
      console.log("✅ Recruiter embeddings updated!");
    }
  } else {
    const missingWorkerApps = await db
      .select()
      .from(workerApplicationsTable)
      .where(isNull(workerApplicationsTable.embedding));

    if (missingWorkerApps.length > 0) {
      console.log(
        `⏳ Auto-generating embeddings for ${missingWorkerApps.length} worker applications...`
      );

      for (const app of missingWorkerApps) {
        const skillsText = Array.isArray(app.skills)
          ? app.skills.join(" ")
          : app.skills || "";
        const textToEmbed =
          `Worker profession: ${app.profession || ""}. Industry: ${app.industry || ""}. Skills: ${skillsText}. Experience: ${app.experienceYears || 0} years.`.trim();

        if (!textToEmbed) continue;

        try {
          const vector = await createEmbedding(textToEmbed);
          await db
            .update(workerApplicationsTable)
            .set({ embedding: vector })
            .where(eq(workerApplicationsTable.id, app.id));
        } catch (err) {
          console.error(
            `Failed to store embedding for worker app ID ${app.id}:`,
            err
          );
        }
      }
      console.log("✅ Worker embeddings updated!");
    }
  }
}

export async function runAgentExecution({
  prompt,
  mode,
}: RunAgentOptions): Promise<string> {
  const isRecruiter = mode === "recruiter";

  await ensureEmbeddingsExist(isRecruiter);

  const tools = isRecruiter
    ? [searchWorkerApplicationsTool]
    : [searchJobPostingsTool];

  const systemInstruction = getSystemInstruction(isRecruiter);
  const result = await openrouter.callModel({
    model: "openai/gpt-4o-mini",
    input: prompt,
    instructions: systemInstruction,
    tools,
  });

  return await result.getText();
}
