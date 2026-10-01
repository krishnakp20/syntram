import "server-only";

import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "@/lib/generated/prisma/client";

/**
 * Lazily-created Prisma client (Prisma 7 + node-postgres adapter).
 *
 * Returns `null` when DATABASE_URL isn't configured, so the site — and the
 * contact form — keep working without a database (leads are then delivered by
 * email only). A single instance is reused across hot reloads in development
 * to avoid exhausting connections.
 */

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export function getDb(): PrismaClient | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  }
  return globalForPrisma.prisma;
}
