import { AuthAction } from "@org/contracts";
import { AccountPermission, PermissionEffect } from "../prisma/client";

export const mapAccountPermissionsToActions = (permissions: AccountPermission[]): AuthAction[] => {
  return permissions
    .filter((permission) => permission.effect === PermissionEffect.allow)
    .map((permission) => permission.permission)
    .filter((permission): permission is AuthAction =>
      Object.values(AuthAction).includes(permission as AuthAction),
    );
};
