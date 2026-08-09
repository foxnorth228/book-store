import { AccessControlPolicy } from "@org/access-control";
import { AuthAction } from "@org/contracts";

export const accessControlConfig: AccessControlPolicy[] = [
  {
    action: AuthAction.VIEW_PROFILE,
    effect: "allow",
    condition: ({ subject }) => {
      return !!subject.id;
    },
  },
];
