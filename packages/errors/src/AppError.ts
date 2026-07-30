import { ErrorCode } from "./error-code.js";

export class AppError<TCode extends string = ErrorCode> extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly code: TCode,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);

    this.name = this.constructor.name;
  }
}
