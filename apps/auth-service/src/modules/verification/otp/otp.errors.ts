import { AuthErrorCodes } from "@org/contracts";
import { AppError, BadRequestError } from "@org/errors";

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

export class OTPResendTooSoonError extends AppError<AuthErrorCodes> {
  constructor(message: string, details: unknown) {
    super(429, AuthErrorCodes.OTP_RESEND_TOO_SOON, message, details);
  }
}
