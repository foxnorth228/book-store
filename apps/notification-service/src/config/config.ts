import { loadServerEnv } from "@org/shared";
import { z } from "zod";

export const PATH_TO_PROJECT = "apps/notification-service";

export const notificationServiceEnvSchema = z.object({
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_FROM: z.string(),
});

export type NotificationServiceEnvSchema = typeof notificationServiceEnvSchema;
export type NotificationServiceEnvConfig = z.infer<NotificationServiceEnvSchema>;

export const serviceEnvConfig = loadServerEnv(notificationServiceEnvSchema, PATH_TO_PROJECT, {
  sources: ["service", "rabbitmq", "redis", "jwt", "cookie"],
});

export type ServiceEnvConfig = typeof serviceEnvConfig;
