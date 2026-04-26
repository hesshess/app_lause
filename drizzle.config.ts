import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: './app/migrations',
  schema: './app/features/**/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations: {
  table: "__drizzle_migrations",
  schema: "public",
},
});

