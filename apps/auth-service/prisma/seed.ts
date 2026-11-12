import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/libs/prisma/client";
import { getDBUrlByConfig, hashPassword } from "@org/shared";
import { AuthRole } from "@org/contracts";
import { rolePermissions } from "./default-data";
import { serviceEnvConfig } from "../src/config/config";

const config = serviceEnvConfig;

const connectionString = getDBUrlByConfig(config);
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function applyPermissions() {
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

async function applyInitialAdmin() {
  const email = config.INITIAL_ADMIN_EMAIL;
  const password = config.INITIAL_ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("Initial admin email or password not provided");
    return;
  }

  const existingAccount = await prisma.account.findUnique({
    where: { email },
  });

  let accountId: string;

  if (existingAccount) {
    accountId = existingAccount.id;
  } else {
    const passwordHash = await hashPassword(password);

    const account = await prisma.account.create({
      data: {
        email,
        passwordHash,
        roles: {
          create: {
            role: "admin",
          },
        },
      },
    });

    accountId = account.id;
  }

  await prisma.accountRole.upsert({
    where: {
      accountId_role: {
        accountId: accountId,
        role: "admin",
      },
    },
    create: {
      accountId: accountId,
      role: "admin",
    },
    update: {},
  });

  console.log(`Initial admin ensured: ${email}`);
}

async function main() {
  await applyPermissions();
  await applyInitialAdmin();
}

main()
  .catch((error) => {
    console.error("Failed to seed role permissions:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
