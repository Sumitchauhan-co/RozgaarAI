import {
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

import { usersTable } from "./auth.schema";

export const workersTable = pgTable("workers", {
  id: uuid("id").primaryKey().defaultRandom(),

  userId: uuid("user_id")
    .notNull()
    .references(() => usersTable.id, {
      onDelete: "cascade",
    })
    .unique(),

  age: integer("age"),

  profession: text("profession").array(),

  skills: text("skills").array(),

  experienceYears: integer("experience_years"),

  bio: text("bio"),

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
