import { AuthAction, AuthRole } from "@org/contracts";

export const rolePermissions: Record<AuthRole, AuthAction[]> = {
  [AuthRole.USER]: [],
  [AuthRole.MODERATOR]: [AuthAction.VIEW_USERS],
  [AuthRole.ADMIN]: [AuthAction.VIEW_USERS, AuthAction.UPDATE_USERS, AuthAction.DELETE_USERS],
};
