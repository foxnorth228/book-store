import z from "zod";

export function zodToJsonSchema<T extends z.ZodType>(
  schema: T,
  params?: z.z.core.ToJSONSchemaParams,
): Record<string, unknown> {
  return schema.toJSONSchema({ target: "draft-07", ...params });
}
