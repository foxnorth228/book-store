import { AuthAction } from "@org/contracts";
import { useSessionStore } from "./use-session-store";
import { redirect } from "@tanstack/react-router";

export function checkRequiredRoutePermission(permission: AuthAction) {
  const permissions = useSessionStore.getState().user?.permissions;

  if (!permissions?.includes(permission)) {
    throw redirect({ to: "/forbidden" });
  }
}
