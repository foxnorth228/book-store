import { healthConfig } from "./health.config";

export const healthResSchema = {
  $id: healthConfig.schemas.healthRes,
  type: "object",
  required: ["app", "database"],
  additionalProperties: false,
  properties: {
    app: {
      type: "object",
      required: ["status"],
      additionalProperties: false,
      properties: {
        status: { type: "string", enum: ["up", "down"] },
      },
    },
    database: {
      type: "object",
      required: ["status"],
      additionalProperties: false,
      properties: {
        status: { type: "string", enum: ["up", "down"] },
      },
    },
  },
};

export const healthSchemas = [healthResSchema];
