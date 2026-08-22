ALTER TABLE "recruiterApplications" DROP CONSTRAINT "recruiterApplications_recruiter_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "recruiterApplications" ADD CONSTRAINT "recruiterApplications_recruiter_id_recruiters_id_fk" FOREIGN KEY ("recruiter_id") REFERENCES "public"."recruiters"("id") ON DELETE cascade ON UPDATE no action;