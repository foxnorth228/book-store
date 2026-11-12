import { LayoutDashboardIcon, UsersIcon, ShieldCheckIcon, KeyRoundIcon } from "@org/ui";
import { SidebarGroup } from "../model/sidebar.types";
import { AuthAction } from "@org/contracts";

export const sidebarConfig: SidebarGroup[] = [
  {
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboardIcon,
      },
    ],
  },
  {
    title: "Access Control",
    items: [
      {
        title: "Users",
        url: "/users",
        icon: UsersIcon,
        permission: AuthAction.VIEW_USERS,
      },
      {
        title: "Roles",
        url: "/roles",
        icon: ShieldCheckIcon,
      },
      {
        title: "Permissions",
        url: "/permissions",
        icon: KeyRoundIcon,
      },
    ],
  },
];
