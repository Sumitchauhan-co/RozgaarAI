import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
  vector,
} from "drizzle-orm/pg-core";
import { applicationStatusEnum, payPeriodEnum } from "./enum.schema";
import { workersTable } from "./worker.schema";

export const workerApplicationsTable = pgTable(
  "workerApplications",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    workerId: uuid("worker_id")
      .notNull()
      .references(() => workersTable.id, { onDelete: "cascade" }),

    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }),
    profession: text("profession").array(),
    skills: text("skills").array(),
    experienceYears: integer("experience_years"),
    salaryExpectation: integer("salary_expectation"),
    currency: varchar("currency", { length: 3 }).default("INR").notNull(),
    payPeriod: payPeriodEnum("pay_period").default("yearly").notNull(),
    locality: varchar("locality", { length: 150 }),
    city: varchar("city", { length: 100 }).notNull(),
    country: varchar("country", { length: 100 }).notNull(),
    industry: varchar("industry", { length: 100 }).notNull(),
    phone: varchar("phone", { length: 20 }),
    status: applicationStatusEnum("status").default("pending").notNull(),

    // 1536 dimensions for text-embedding-3-small or OpenRouter embedding models
    embedding: vector("embedding", { dimensions: 1536 }),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  table => [
    index("worker_app_embedding_idx").using(
      "hnsw",
      table.embedding.op("vector_cosine_ops")
    ),
  ]
);
