ALTER TABLE "recruiters" ADD COLUMN "company_description" text;--> statement-breakpoint
ALTER TABLE "recruiterApplications" ADD COLUMN "job_title" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "recruiterApplications" ADD COLUMN "description" text NOT NULL;--> statement-breakpoint
ALTER TABLE "recruiterApplications" ADD COLUMN "skills" text[];--> statement-breakpoint
ALTER TABLE "recruiterApplications" ADD COLUMN "experience_required" integer;--> statement-breakpoint
ALTER TABLE "recruiterApplications" ADD COLUMN "employment_type" varchar(50);--> statement-breakpoint
ALTER TABLE "workers" ADD COLUMN "skills" text[];--> statement-breakpoint
ALTER TABLE "workers" ADD COLUMN "experience_years" integer;--> statement-breakpoint
ALTER TABLE "workers" ADD COLUMN "bio" text;--> statement-breakpoint
ALTER TABLE "workerApplications" ADD COLUMN "profession" text[];--> statement-breakpoint
ALTER TABLE "workerApplications" ADD COLUMN "skills" text[];--> statement-breakpoint
ALTER TABLE "workerApplications" ADD COLUMN "experience_years" integer;