import { z } from "zod";

import { ValidationErrorCode } from "./error-code.js";

export const errorBodySchema = z.object({
  statusCode: z.number().positive(),
  code: z.string(),
  message: z.string(),
  details: z.unknown().optional(),
});

export const validationErrorCodeSchema = z.enum(ValidationErrorCode);
