import { envServerSchema } from "@org/shared";
import { z } from "zod";

export const PATH_TO_PROJECT = "apps/catalog-service";

export const catalogServiceEnvSchema = envServerSchema.extend({
  GRPC_AUTH_HOST: z.coerce.string().default("0.0.0.0"),
  GRPC_AUTH_PORT: z.coerce.number().default(50051),
});

export type CatalogServiceEnvSchema = typeof catalogServiceEnvSchema;
export type CatalogServiceEnvConfig = z.infer<CatalogServiceEnvSchema>;
