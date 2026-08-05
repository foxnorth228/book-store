import { ErrorCode } from "./error-code.js";

export class AppError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: ErrorCode,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);

    this.name = this.constructor.name;
  }
}
