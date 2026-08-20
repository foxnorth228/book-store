import { AuthErrorCodes } from "@org/contracts";
import { BadRequestError } from "@org/errors";

export class InvalidResetTokenError extends BadRequestError<AuthErrorCodes> {
  constructor(message: string) {
    super(message, AuthErrorCodes.INVALID_RESET_TOKEN);
  }
}
