import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let client: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export const getDb = () => {
  if (_db) return _db;

  const rawDatabaseUrl = process.env.DATABASE_URL;
  if (!rawDatabaseUrl) {
    throw new Error("DATABASE_URL environment variable is missing.");
  }

  const databaseUrl = rawDatabaseUrl.replace(/^"|"$/g, "");

  // prepare: false is required for Supabase Transaction Pooler (Port 6543)
  // max: 1 ensures serverless invocations clean up unused connection slots
  client = postgres(databaseUrl, { prepare: false, max: 1 });
  _db = drizzle(client, { schema });

  return _db;
};
