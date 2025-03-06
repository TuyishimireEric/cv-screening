import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
    ssl: true
  },
  schema: "./database/schema.ts",
  strict: true,
  verbose: true
});
