import { getTableColumns } from "drizzle-orm";
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "worker",
  "recruiter",
  "admin",
  "guest",
]);

// Simplified pass status for 30-day passes
export const passStatusEnum = pgEnum("pass_status", [
  "inactive",
  "active",
  "expired",
]);

export const planTypeEnum = pgEnum("plan_type", [
  "basic", // 25 AI Searches @ ₹249 for 30 days
  "pro", // 50 AI Searches @ ₹499 for 30 days
]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),

  authId: varchar("auth_id", { length: 255 }).unique(),

  firstName: varchar("first_name", { length: 255 }).notNull(),
  lastName: varchar("last_name", { length: 255 }),

  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),

  password: varchar("password", { length: 255 }),

  role: userRoleEnum("role")
    .default("guest")
    .notNull()
    .$type<"guest" | "worker" | "recruiter" | "admin">(),

  refreshToken: text("refresh_token"),

  verificationToken: text("verification_token"),

  resetPasswordToken: text("reset_token"),
  resetPasswordExpiry: timestamp("reset_token_expiry", {
    withTimezone: true,
  }),

  // ================= PAYMENT =================
  lastOrderId: varchar("last_order_id", { length: 255 }), // Tracks the latest Razorpay order_id

  planType: planTypeEnum("plan_type").$type<"basic" | "pro">(),

  passStatus: passStatusEnum("pass_status")
    .default("inactive")
    .notNull()
    .$type<"inactive" | "active" | "expired">(),

  apiCredits: integer("api_credits").default(0).notNull(),

  passExpiryDate: timestamp("pass_expiry_date", {
    withTimezone: true,
  }),
  // =========================================================================

  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date()
  ),
});

const { password, ...publicColumns } = getTableColumns(usersTable);
export const userPublicColumns = publicColumns;
