export const AdminEvents = {
  dlqKey: "admin-service.events-dlq",
  auth: {
    queue: "admin-service.auth-service.queue",
  },
  profile: {
    queue: "admin-service.profile-service.queue",
  },
} as const;
