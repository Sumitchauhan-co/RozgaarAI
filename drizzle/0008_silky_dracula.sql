CREATE TYPE "public"."pass_status" AS ENUM('inactive', 'active', 'expired');--> statement-breakpoint
CREATE TYPE "public"."plan_type" AS ENUM('basic', 'pro');--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "last_order_id" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "plan_type" "plan_type";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "pass_status" "pass_status" DEFAULT 'inactive' NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "api_credits" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "pass_expiry_date" timestamp with time zone;