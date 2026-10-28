export const ROUTES = {
  homepage: "/",
  forgotPassword: "/forgot-password",
  forgotPasswordVerify: "/forgot-password/verify",
  forgotPasswordReset: "/forgot-password/reset",
} as const;

export const SERVICES_ROUTES = {
  AUTH: `${process.env.NEXT_PUBLIC_API_PREFIX}${process.env.NEXT_PUBLIC_AUTH_API_PREFIX}`,
  PROFILE: `${process.env.NEXT_PUBLIC_API_PREFIX}${process.env.NEXT_PUBLIC_PROFILE_API_PREFIX}`,
  CATALOG: `${process.env.NEXT_PUBLIC_API_PREFIX}${process.env.NEXT_PUBLIC_CATALOG_API_PREFIX}`,
  NOTIFICATION: `${process.env.NEXT_PUBLIC_API_PREFIX}${process.env.NEXT_PUBLIC_NOTIFICATION_API_PREFIX}`,
} as const;
