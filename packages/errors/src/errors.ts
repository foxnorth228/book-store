import { AppError } from "./AppError.js";
import { ErrorCode } from "./error-code.js";

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

export class BadRequestError<TCode extends string = ErrorCode> extends AppError<TCode> {
  constructor(message: string, code: TCode = ErrorCode.BAD_REQUEST as TCode, details?: unknown) {
    super(400, code, message, details);
  }
}
