ALTER TABLE "recruiterApplications"
  RENAME COLUMN "user_id" TO "recruiter_id";
--> statement-breakpoint
ALTER TABLE "recruiterApplications" DROP CONSTRAINT "recruiterApplications_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "recruiterApplications"
ADD CONSTRAINT "recruiterApplications_recruiter_id_users_id_fk" FOREIGN KEY ("recruiter_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
