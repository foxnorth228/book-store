import { useLocation } from "@tanstack/react-router";
import { useSessionStore } from "@modules/auth";
import { Sidebar } from "@org/ui";
import { useMemo } from "react";

import { sidebarConfig } from "../config/sidebar.config";

export function AppSidebar() {
  const location = useLocation();
  const permissions = useSessionStore((state) => state.user?.permissions);

  const groups = useMemo(
    () =>
      sidebarConfig
        .map((group) => ({
          ...group,
          items: group.items.filter(
            (item) => !item.permission || permissions?.includes(item.permission),
          ),
        }))
        .filter((group) => group.items.length > 0),
    [],
  );

  return (
    <Sidebar>
      <Sidebar.Content>
        {groups.map((group, index) => (
          <Sidebar.Group key={group.title ?? index}>
            {group.title && <Sidebar.GroupLabel>{group.title}</Sidebar.GroupLabel>}

            <Sidebar.GroupContent>
              <Sidebar.Menu>
                {group.items.map((item) => {
                  const Icon = item.icon;

                  return (
                    <Sidebar.MenuItem key={item.url}>
                      <Sidebar.MenuButton href={item.url} isActive={location.pathname === item.url}>
                        {Icon && <Icon />}
                        <span>{item.title}</span>
                      </Sidebar.MenuButton>
                    </Sidebar.MenuItem>
                  );
                })}
              </Sidebar.Menu>
            </Sidebar.GroupContent>
          </Sidebar.Group>
        ))}
      </Sidebar.Content>
    </Sidebar>
  );
}
