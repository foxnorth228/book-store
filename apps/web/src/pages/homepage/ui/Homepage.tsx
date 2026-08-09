import { useHaveAccess } from "@app/access-control";
import { useProfileStore } from "@modules/profile";
import { AuthAction } from "@org/contracts";

export const Homepage = () => {
  const profile = useProfileStore((s) => s.profile);
  const haveAccess = useHaveAccess();

  return haveAccess(AuthAction.VIEW_PROFILE) ? profile?.nickname || "xd" : null;
};
