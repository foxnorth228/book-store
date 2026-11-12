import { AuthAction, AuthRole } from "@org/contracts";

export const rolePermissions: Record<AuthRole, AuthAction[]> = {
  [AuthRole.USER]: [],
  [AuthRole.MODERATOR]: [AuthAction.VIEW_USERS, AuthAction.VIEW_ROLES, AuthAction.VIEW_PERMISSIONS],
  [AuthRole.ADMIN]: [
    AuthAction.VIEW_USERS,
    AuthAction.UPDATE_USERS,
    AuthAction.DELETE_USERS,
    AuthAction.VIEW_ROLES,
    AuthAction.MANAGE_ROLES,
    AuthAction.VIEW_PERMISSIONS,
    AuthAction.MANAGE_PERMISSIONS,
  ],
};
