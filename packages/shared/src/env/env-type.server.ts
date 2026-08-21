import z from "zod";

import {
  envCommonSchema,
  envCookieSchema,
  envDatabaseSchema,
  envJwtSchema,
  envRabbitmqSchema,
  envRedisSchema,
  envSourceSchemas,
} from "./env-schema.server.js";

export type EnvSourceSchemas = typeof envSourceSchemas;
export type ServerEnvSource = keyof EnvSourceSchemas;

export type EnvCommonSchema = z.infer<typeof envCommonSchema>;
export type EnvDatabaseSchema = z.infer<typeof envDatabaseSchema>;
export type EnvRabbitmqSchema = z.infer<typeof envRabbitmqSchema>;
export type EnvRedisSchema = z.infer<typeof envRedisSchema>;
export type EnvJwtSchema = z.infer<typeof envJwtSchema>;
export type EnvCookieSchema = z.infer<typeof envCookieSchema>;

export type SourceConfig<S extends ServerEnvSource> = z.infer<EnvSourceSchemas[S]>;

export type UnionToIntersection<U> = (U extends unknown ? (value: U) => void : never) extends (
  value: infer I,
) => void
  ? I
  : never;

export type SourcesConfig<S extends readonly ServerEnvSource[]> = UnionToIntersection<
  SourceConfig<S[number]>
>;

type ServerEnvSchema = z.ZodObject<z.ZodRawShape>;

type NormalizeSchemaOutput<T> = T extends Record<string, never> ? object : T;

type SchemaConfig<T extends ServerEnvSchema | undefined> = T extends ServerEnvSchema
  ? NormalizeSchemaOutput<z.output<T>>
  : object;

export type ServerEnvConfig<
  T extends ServerEnvSchema | undefined,
  S extends readonly ServerEnvSource[],
> = SchemaConfig<T> & SourcesConfig<S>;
