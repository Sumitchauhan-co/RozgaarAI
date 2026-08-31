import { defineConfig } from "drizzle-kit";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  schema: "./src/app/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: isProduction
      ? process.env.DIRECT_URL || process.env.DATABASE_URL
      : process.env.DATABASE_URL,
  },
});
