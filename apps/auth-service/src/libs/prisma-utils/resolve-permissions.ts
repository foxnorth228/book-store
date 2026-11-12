import { AccountPermission, PermissionEffect, RolePermission } from "../prisma/client";

export const resolveRolesAndAccountPermissions = (
  rolePermissions: RolePermission[],
  accountPermissions: AccountPermission[],
): AccountPermission[] => {
  const permissions = new Map<string, PermissionEffect>();

  for (const { permission } of rolePermissions) {
    permissions.set(permission, PermissionEffect.allow);
  }

  for (const { permission, effect } of accountPermissions) {
    permissions.set(permission, effect);
  }

  return [...permissions].map(([permission, effect]) => ({
    permission,
    effect,
  })) as AccountPermission[];
};
