import { parseValidationErrorCode, ValidationErrorCode } from "@org/errors";
import { FieldError } from "react-hook-form";

function isAllowedErrorCode<T extends readonly ValidationErrorCode[]>(
  errorCode: ValidationErrorCode,
  allowedErrorCodes?: T,
): errorCode is T[number] {
  return allowedErrorCodes?.includes(errorCode as T[number]) ?? false;
}

export function createErrorMessageResolver<T extends readonly ValidationErrorCode[]>(
  messageGetter: (errorCode: T[number]) => string,
  allowedErrorCodes?: T,
) {
  return (error: FieldError | undefined) => {
    const errorCode = parseValidationErrorCode(error);

    if (errorCode && isAllowedErrorCode(errorCode, allowedErrorCodes)) {
      return {
        message: messageGetter(errorCode),
      };
    }

    return {
      message: error?.message,
    };
  };
}
