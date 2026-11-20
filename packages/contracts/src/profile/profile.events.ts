export const ProfileEvents = {
  exchangeKey: "profile-service.events",
  dlxKey: "profile-service.events-dlx",
  dlqKey: "profile-service.events-dlq",
  auth: {
    queue: "profile-service.auth-service.queue",
  },
  adminProfileUpdated: {
    route: "profile.service.profile-updated",
  },
};
