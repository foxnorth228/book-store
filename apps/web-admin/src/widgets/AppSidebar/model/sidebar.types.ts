import { AuthAction } from "@org/contracts";

export interface SidebarItem {
  title: string;
  url: string;
  icon?: React.ElementType;
  permission?: AuthAction | null;
}

export interface SidebarGroup {
  title?: string;
  items: SidebarItem[];
}
