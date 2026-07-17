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

export class NotFoundError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.NOT_FOUND, details?: unknown) {
    super(404, code, message, details);
  }
}

export class ConflictError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.CONFLICT, details?: unknown) {
    super(409, code, message, details);
  }
}

export class BadRequestError extends AppError {
  constructor(message: string, code: ErrorCode = ErrorCode.BAD_REQUEST, details?: unknown) {
    super(400, code, message, details);
  }
}
