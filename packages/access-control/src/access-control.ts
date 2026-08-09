import { AuthAction, AuthRole } from "@org/contracts";

export type AccessControlSubject = {
  id: string;
  roles: AuthRole[];
};

export type AccessControlContext<TResource = unknown> = {
  subject: AccessControlSubject;
  resource?: TResource;
};

export type AccessControlPolicy<TResource = unknown> = {
  action: AuthAction;
  effect: "allow" | "deny";
  condition: (context: AccessControlContext<TResource>) => boolean;
};

export class AccessControlService {
  constructor(private readonly policies: AccessControlPolicy[]) {}

  can<TResource>(subject: AccessControlSubject, action: AuthAction, resource: TResource) {
    const policies = this.policies.filter((policy) => policy.action === action);

    return policies.some((policy) =>
      policy.condition({
        subject,
        resource,
      }),
    );
  }
}
