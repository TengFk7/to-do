import { PrismaClient } from "../generated/prisma/client/client";
import { PrismaPg } from "@prisma/adapter-pg";

function createPrismaClient() {
  const connectionString = process.env.DATABASE_URL!;

  // Parse the connection string manually to handle special chars in password
  // Format: postgresql://user:password@host:port/database?params
  const url = new URL(connectionString);
  const adapter = new PrismaPg({
    host: url.hostname,
    port: Number(url.port) || 5432,
    user: url.username,
    password: decodeURIComponent(url.password),
    database: url.pathname.replace(/^\//, ""),
    ssl: { rejectUnauthorized: false },
  });

  return new PrismaClient({ adapter, log: ["error"] });
}

// Reuse a single PrismaClient instance across the process
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
