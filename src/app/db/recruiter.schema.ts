import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

import { usersTable } from "./auth.schema";

export const recruitersTable = pgTable("recruiters", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .unique(),

  companyName: varchar("company_name", {
    length: 255,
  }).notNull(),

  companyDescription: text("company_description"),

  industry: varchar("industry", {
    length: 100,
  }),

  city: varchar("city", {
    length: 100,
  }),

  createdAt: timestamp("created_at", {
    withTimezone: true,
  })
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at", {
    withTimezone: true,
  })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
