import { envServerSchema } from "@org/shared";
import { z } from "zod";

export const PATH_TO_PROJECT = "apps/notification-service";

export const notificationServiceEnvSchema = envServerSchema;

export type NotificationServiceEnvSchema = typeof notificationServiceEnvSchema;
export type NotificationServiceEnvConfig = z.infer<NotificationServiceEnvSchema>;
