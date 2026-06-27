import { createHealthController } from "./health.controller";
import { healthService } from "./health.service";

export type HealthService = typeof healthService;
export type HealthController = ReturnType<typeof createHealthController>;
