import {
  integer,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { applicationStatusEnum, payPeriodEnum } from "./enum.schema";
import { recruitersTable } from "./recruiter.schema";

export const recruiterApplicationsTable = pgTable("recruiterApplications", {
  id: uuid("id").primaryKey().defaultRandom(),

  recruiterId: uuid("recruiter_id")
    .notNull()
    .references(() => recruitersTable.id, { onDelete: "cascade" }),

  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }),

  salary: integer("salary"),
  currency: varchar("currency", { length: 3 }).default("INR").notNull(),
  payPeriod: payPeriodEnum("pay_period").default("yearly").notNull(),

  companyName: varchar("company_name", { length: 255 }).notNull(),

  industry: varchar("industry", { length: 100 }),

  locality: varchar("locality", { length: 150 }),
  city: varchar("city", { length: 100 }).notNull(),
  country: varchar("country", { length: 100 }).notNull(),

  phone: varchar("phone", { length: 20 }),

  status: applicationStatusEnum("status").default("pending").notNull(),

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});
