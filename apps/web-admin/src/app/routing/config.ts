import { AuthAction } from "@org/contracts";

export const SERVICES_ROUTES = {
  AUTH: `${import.meta.env.VITE_API_PREFIX}${import.meta.env.VITE_AUTH_API_PREFIX}`,
  PROFILE: `${import.meta.env.VITE_API_PREFIX}${import.meta.env.VITE_PROFILE_API_PREFIX}`,
  CATALOG: `${import.meta.env.VITE_API_PREFIX}${import.meta.env.VITE_CATALOG_API_PREFIX}`,
  NOTIFICATION: `${import.meta.env.VITE_API_PREFIX}${import.meta.env.VITE_NOTIFICATION_API_PREFIX}`,
} as const;

export const routeConfig = {
  dashboard: {
    url: "/",
    permission: null,
  },
  users: {
    url: "/users",
    permission: AuthAction.VIEW_USERS,
  },
  roles: {
    url: "/roles",
    permission: AuthAction.VIEW_ROLES,
  },
  permissions: {
    url: "/permissions",
    permission: AuthAction.VIEW_PERMISSIONS,
  },
} as const;
