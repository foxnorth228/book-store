import { envServerSchema } from "@org/shared";
import { z } from "zod";

export const PATH_TO_PROJECT = "apps/notification-service";

export const notificationServiceEnvSchema = envServerSchema.extend({
  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number(),
  SMTP_FROM: z.string(),
});

export type NotificationServiceEnvSchema = typeof notificationServiceEnvSchema;
export type NotificationServiceEnvConfig = z.infer<NotificationServiceEnvSchema>;
