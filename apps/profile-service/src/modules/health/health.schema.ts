import { healthConfig } from "./health.config";

const healthResFieldSchema = {
  type: "object",
  required: ["status"],
  additionalProperties: false,
  properties: {
    status: { type: "string", enum: ["up", "down"] },
  },
};

export const healthResSchema = {
  $id: healthConfig.schemas.healthRes,
  type: "object",
  required: ["app", "database"],
  additionalProperties: false,
  properties: {
    app: { ...healthResFieldSchema },
    database: { ...healthResFieldSchema },
    rabbitmq: { ...healthResFieldSchema },
    redis: { ...healthResFieldSchema },
  },
};

export const healthSchemas = [healthResSchema];
