import { useSessionStore } from "@modules/auth";
import { AuthAction } from "@org/contracts";

import { accessControlService } from "./access-control-service";

export const useHaveAccess = () => {
  const user = useSessionStore((s) => s.user);

  return <TResource = unknown>(action: AuthAction, resource?: TResource) => {
    if (!user) {
      return false;
    }

    return accessControlService.can(user, action, resource);
  };
};
