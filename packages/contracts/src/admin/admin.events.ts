export const AdminEvents = {
  dlqKey: "admin-service.events-dlq",
  auth: {
    queue: "admin-service.auth-service.queue",
  },
} as const;
