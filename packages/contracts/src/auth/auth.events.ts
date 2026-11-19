export const AuthEvents = {
  dlxKey: "auth-service.events-dlx",
  exchangeKey: "auth-service.events",
  registered: {
    route: "auth-service.registered",
  },
  userCreated: {
    route: "auth-service.user-created",
  },
  passwordResetOtpRequested: {
    route: "auth-service.passwordResetOtpRequested",
  },
} as const;
