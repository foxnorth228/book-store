import { useSessionStore } from "@modules/auth";

import { AccountMenu } from "./AccountMenu";

export const HeaderAccount = () => {
  const isAuthenticated = useSessionStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return null;
  }

  return <AccountMenu />;
};
