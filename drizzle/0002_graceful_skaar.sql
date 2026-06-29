ALTER TYPE "public"."user_role" ADD VALUE 'guest';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'guest';--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "role" SET NOT NULL;