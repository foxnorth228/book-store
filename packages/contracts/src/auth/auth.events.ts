export const AuthEvents = {
  dlxKey: "auth-service.events-dlx",
  exchangeKey: "auth-service.events",
  registered: {
    route: "auth-service.registered",
  },
  adminUserUpdated: {
    route: "auth-service.admin-user-updated",
  },
  passwordResetOtpRequested: {
    route: "auth-service.passwordResetOtpRequested",
  },
} as const;
