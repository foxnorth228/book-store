import { loadServerEnv } from "@org/shared";
import { z } from "zod";

export const PATH_TO_PROJECT = "apps/catalog-service";

export const catalogServiceEnvSchema = z.object({});

export type CatalogServiceEnvSchema = typeof catalogServiceEnvSchema;
export type CatalogServiceEnvConfig = z.infer<CatalogServiceEnvSchema>;

export const serviceEnvConfig = loadServerEnv(catalogServiceEnvSchema, PATH_TO_PROJECT, {
  sources: ["service", "postgres", "rabbitmq", "redis", "jwt", "cookie"],
});

export type ServiceEnvConfig = typeof serviceEnvConfig;
