import {
  Sidebar as SidebarUI,
  LayoutDashboardIcon,
  UsersIcon,
  ShieldCheckIcon,
  KeyRoundIcon,
} from "@org/ui";
import { useRouterState } from "@tanstack/react-router";
import { FC } from "react";

export const Sidebar: FC = () => {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <SidebarUI>
      <SidebarUI.Content>
        <SidebarUI.Menu>
          <SidebarUI.MenuItem>
            <SidebarUI.MenuButton href="/" isActive={pathname === "/"}>
              <LayoutDashboardIcon />
              <span>Dashboard</span>
            </SidebarUI.MenuButton>
          </SidebarUI.MenuItem>
        </SidebarUI.Menu>

        <SidebarUI.Group>
          <SidebarUI.GroupLabel>Access Control</SidebarUI.GroupLabel>

          <SidebarUI.GroupContent>
            <SidebarUI.Menu>
              <SidebarUI.MenuItem>
                <SidebarUI.MenuButton href="/users" isActive={pathname.startsWith("/users")}>
                  <UsersIcon />
                  <span>Users</span>
                </SidebarUI.MenuButton>
              </SidebarUI.MenuItem>

              <SidebarUI.MenuItem>
                <SidebarUI.MenuButton href="/roles" isActive={pathname.startsWith("/roles")}>
                  <ShieldCheckIcon />
                  <span>Roles</span>
                </SidebarUI.MenuButton>
              </SidebarUI.MenuItem>

              <SidebarUI.MenuItem>
                <SidebarUI.MenuButton
                  href="/permissions"
                  isActive={pathname.startsWith("/permissions")}
                >
                  <KeyRoundIcon />
                  <span>Permissions</span>
                </SidebarUI.MenuButton>
              </SidebarUI.MenuItem>
            </SidebarUI.Menu>
          </SidebarUI.GroupContent>
        </SidebarUI.Group>
      </SidebarUI.Content>
    </SidebarUI>
  );
};
