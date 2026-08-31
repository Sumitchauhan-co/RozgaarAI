import { getDb } from "@/app/db";
import { contactsTable, NewContactSubmission } from "@/app/db/contact.schema";

const db = getDb();

export async function createContactSubmission(data: NewContactSubmission) {
  const [submission] = await db.insert(contactsTable).values(data).returning();

  return submission;
}
