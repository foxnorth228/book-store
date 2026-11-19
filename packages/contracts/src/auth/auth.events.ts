export const AuthEvents = {
  dlxKey: "auth-service.events-dlx",
  exchangeKey: "auth-service.events",
  registered: {
    route: "auth-service.registered",
  },
  passwordResetOtpRequested: {
    route: "auth-service.passwordResetOtpRequested",
  },
} as const;
