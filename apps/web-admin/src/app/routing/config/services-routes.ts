export const SERVICES_ROUTES = {
  AUTH: `${import.meta.env.VITE_API_PREFIX}${import.meta.env.VITE_AUTH_API_PREFIX}`,
  PROFILE: `${import.meta.env.VITE_API_PREFIX}${import.meta.env.VITE_PROFILE_API_PREFIX}`,
  CATALOG: `${import.meta.env.VITE_API_PREFIX}${import.meta.env.VITE_CATALOG_API_PREFIX}`,
  NOTIFICATION: `${import.meta.env.VITE_API_PREFIX}${import.meta.env.VITE_NOTIFICATION_API_PREFIX}`,
} as const;
