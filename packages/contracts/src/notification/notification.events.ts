export const NotificationEvents = {
  exchange: "auth-notification-events",
  PasswordResetOtpRequested: {
    routingKey: "notification.auth.passwordResetOtpRequested",
    queue: "notification.auth.queue",
  },
};
