import { AuthRole } from "@org/contracts";

import { Role } from "../../libs/prisma/client";

export const mapPrismaRoleToAuthRole = (role: Role): AuthRole => {
  const authRoles = Object.values(AuthRole);

  if (!authRoles.includes(role as AuthRole)) {
    throw new Error(`Unknown role: ${role}`);
  }

  return role as AuthRole;
};
