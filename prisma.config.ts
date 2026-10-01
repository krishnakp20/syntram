// Prisma CLI configuration (Prisma 7). The app itself reads DATABASE_URL at
// runtime in lib/db.ts; this file is only used by `prisma` CLI commands.
import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"],
  },
});
