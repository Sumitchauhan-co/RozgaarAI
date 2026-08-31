import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const contactsTable = pgTable("contacts", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull().default("General Inquiry"),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type NewContactSubmission = typeof contactsTable.$inferInsert;
export type ContactSubmission = typeof contactsTable.$inferSelect;
