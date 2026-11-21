import { FastifyInstance } from "fastify";

export async function checkHaveUserPermission(
  app: FastifyInstance,
  accountId: string,
  permission: string,
): Promise<boolean> {
  const [overrides, roles] = await Promise.all([
    app.prisma.accountPermission.findMany({
      where: { accountId, permission },
      select: { effect: true },
    }),
    app.prisma.accountRole.findMany({
      where: { accountId },
      select: { role: true },
    }),
  ]);

  if (overrides.some((o) => o.effect === "deny")) return false;
  if (overrides.some((o) => o.effect === "allow")) return true;

  if (roles.length === 0) return false;

  const granted = await app.prisma.rolePermission.count({
    where: {
      permission,
      role: { in: roles.map((r) => r.role) },
    },
  });

  return granted > 0;
}
