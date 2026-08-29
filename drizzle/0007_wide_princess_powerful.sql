ALTER TABLE "recruiterApplications" ADD COLUMN "embedding" vector(1536);--> statement-breakpoint
ALTER TABLE "workerApplications" ADD COLUMN "embedding" vector(1536);--> statement-breakpoint
CREATE INDEX "recruiter_app_embedding_idx" ON "recruiterApplications" USING hnsw ("embedding" vector_cosine_ops);--> statement-breakpoint
CREATE INDEX "worker_app_embedding_idx" ON "workerApplications" USING hnsw ("embedding" vector_cosine_ops);