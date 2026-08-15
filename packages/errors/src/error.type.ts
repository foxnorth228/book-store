import { z } from "zod";

import { validationErrorCodeSchema } from "./error.schema.js";
import { ErrorCode } from "./error-code.js";

export interface ErrorResponse {
  statusCode: number;
  code: ErrorCode;
  message: string;
  details?: unknown;
}

export type ValidationErrorCodeSchema = z.infer<typeof validationErrorCodeSchema>;
