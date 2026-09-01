export const healthConfig = {
  serviceName: "HealthService",
  controllerName: "HealthController",
  schemas: { healthRes: "healthRes" },
  tags: {
    health: "Health",
  },
  urls: {
    health: "/health",
  },
};
