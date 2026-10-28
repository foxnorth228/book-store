import { AppError, ErrorCode } from "@org/errors";
import { HttpError } from "@org/http";

export function isHttpError(error: unknown): error is HttpError {
  return error instanceof HttpError;
}

export function isAppError<TCode extends string = ErrorCode>(
  error: unknown,
): error is AppError<TCode> {
  return typeof error === "object" && error !== null && "code" in error && "message" in error;
}

export function isHttpAppError<TCode extends string = ErrorCode>(
  error: unknown,
): error is HttpError<AppError<TCode>> {
  return isHttpError(error) && isAppError<TCode>(error.data);
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}
