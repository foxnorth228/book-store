import { ErrorCode } from "./error-code.js";

export interface ErrorResponse {
  statusCode: number;
  code: ErrorCode;
  message: string;
  details?: unknown;
}
