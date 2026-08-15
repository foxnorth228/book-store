import { validationErrorCodeSchema } from "./error.schema.js";

export const parseValidationErrorCode = (error?: { message?: string }) => {
  const errorCodeResult = validationErrorCodeSchema.safeParse(error?.message);

  if (errorCodeResult.success) {
    return errorCodeResult.data;
  }

  return undefined;
};
