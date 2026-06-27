import { envServerSchema } from "@org/shared";
import { z } from "zod";

export const PATH_TO_PROJECT = "apps/auth-service";

export const authServiceEnvSchema = envServerSchema.extend({
  GRPC_SERVER_HOST: z.coerce.string().default("0.0.0.0"),
  GRPC_SERVER_PORT: z.coerce.number().default(50051),
});

export type AuthServiceEnvSchema = typeof authServiceEnvSchema;
export type AuthServiceEnvConfig = z.infer<AuthServiceEnvSchema>;
