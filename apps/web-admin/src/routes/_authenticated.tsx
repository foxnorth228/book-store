import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { useSessionStore } from "@modules/auth";
import { AuthRole } from "@org/contracts";
import { AppHeader } from "@widgets/AppHeader";
import { AppSidebar } from "@widgets/AppSidebar";
import { Page, Sidebar as SidebarUI } from "@org/ui";

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
  component: () => (
    <SidebarUI.Provider>
      <Page>
        <AppSidebar />
        <Page.Body>
          <AppHeader />
          <Page.Main>
            <Page.Content className="flex items-center justify-center">
              <Outlet />
            </Page.Content>
          </Page.Main>
        </Page.Body>
      </Page>
    </SidebarUI.Provider>
  ),
});
