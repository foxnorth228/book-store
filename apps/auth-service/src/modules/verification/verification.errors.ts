import { AuthErrorCodes } from "@org/contracts";
import { BadRequestError } from "@org/errors";

export class InvalidOTPCodeError extends BadRequestError<AuthErrorCodes> {
  constructor(message: string) {
    super(message, AuthErrorCodes.INVALID_OTP_CODE);
  }
}

export class OTPCodeExpiredError extends BadRequestError<AuthErrorCodes> {
  constructor(message: string) {
    super(message, AuthErrorCodes.OTP_CODE_EXPIRED);
  }
}

export class InvalidResetTokenError extends BadRequestError<AuthErrorCodes> {
  constructor(message: string) {
    super(message, AuthErrorCodes.INVALID_RESET_TOKEN);
  }
}
