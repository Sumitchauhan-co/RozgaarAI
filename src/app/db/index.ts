import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

let client: ReturnType<typeof postgres> | null = null;
let _db: ReturnType<typeof drizzle> | null = null;

export const getDb = () => {
  if (_db) return _db as ReturnType<typeof drizzle>;

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is missing.");
  }

  client = postgres(databaseUrl, { prepare: false });
  _db = drizzle(client, { schema });
  return _db;
};

// Backwards-compatible default export name for existing imports
// Importers should switch to `getDb()` to avoid connecting at module-eval time.
// Do NOT perform database initialization at module evaluation time.
// Consumers should call `getDb()` at runtime to obtain the initialized instance.
