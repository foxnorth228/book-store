import { ErrorCode } from "@org/errors";
import { toast } from "@org/ui";

import { isAppError, isError, isHttpError } from "./errors-comparison";

const DEFAULT_ERROR_MESSAGE = "Something went wrong";

export function handleError(error: unknown, initialMessage?: string) {
  logError(error);

  const message = getErrorMessage(error, initialMessage);

  toast.error(message, {
    closeButton: true,
  });
}

function logError(error: unknown) {
  if (isHttpError(error)) {
    console.error("HTTP request failed", {
      status: error.status,
      data: error.data,
    });

    return;
  }

  if (isError(error)) {
    console.error("Application error", {
      name: error.name,
      message: error.message,
      stack: error.stack,
    });

    return;
  }

  console.error("Unknown error", error);
}

function getErrorMessage(error: unknown, initialMessage?: string): string {
  if (isHttpError(error)) {
    if (isAppError(error.data)) {
      if (error.data.code === ErrorCode.INTERNAL_SERVER_ERROR) {
        return DEFAULT_ERROR_MESSAGE;
      }

      return initialMessage ?? error.data.message;
    }

    if (typeof error.data === "string") {
      return initialMessage ?? error.data;
    }

    return initialMessage ?? DEFAULT_ERROR_MESSAGE;
  }

  if (isError(error)) {
    return initialMessage ?? error.message;
  }

  return initialMessage ?? DEFAULT_ERROR_MESSAGE;
}
