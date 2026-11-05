import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/libs/prisma/client";
import { getDBUrlByConfig, loadServerEnv } from "@org/shared";
import { AuthRole } from "@org/contracts";
import { rolePermissions } from "./default-data";

const config = loadServerEnv(undefined, "apps/auth-service", { sources: ["postgres"] });

const connectionString = getDBUrlByConfig(config);
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  for (const [role, permissions] of Object.entries(rolePermissions)) {
    for (const permission of permissions) {
      await prisma.rolePermission.upsert({
        where: {
          role_permission: {
            role: role as AuthRole,
            permission,
          },
        },
        create: {
          role: role as AuthRole,
          permission,
        },
        update: {},
      });
    }
  }

  console.log("Role permissions seeded successfully");
}

main()
  .catch((error) => {
    console.error("Failed to seed role permissions:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
