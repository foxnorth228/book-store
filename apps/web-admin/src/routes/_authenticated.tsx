import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { useSessionStore } from "@modules/auth";
import { AuthRole } from "@org/contracts";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const session = useSessionStore.getState();

    if (!session.isAuthenticated && !session.user?.roles.includes(AuthRole.ADMIN)) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => <Outlet />,
});
