import { LayoutDashboardIcon, UsersIcon, ShieldCheckIcon, KeyRoundIcon } from "@org/ui";
import { SidebarGroup } from "../model/sidebar.types";
import { routeConfig } from "@app/routing";

export const sidebarConfig: SidebarGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboardIcon,
        url: routeConfig.dashboard.url,
        permission: routeConfig.dashboard.permission,
      },
    ],
  },
  {
    title: "Access Control",
    items: [
      {
        title: "Users",
        icon: UsersIcon,
        url: routeConfig.users.url,
        permission: routeConfig.users.permission,
      },
      {
        title: "Roles",
        icon: ShieldCheckIcon,
        url: routeConfig.roles.url,
        permission: routeConfig.roles.permission,
      },
      {
        title: "Permissions",
        icon: KeyRoundIcon,
        url: routeConfig.permissions.url,
        permission: routeConfig.permissions.permission,
      },
    ],
  },
];
