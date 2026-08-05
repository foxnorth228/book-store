import { AuthErrorCodes } from "@org/contracts";
import { BadRequestError } from "@org/errors";

export class InvalidCredentialsError extends BadRequestError<AuthErrorCodes> {
  constructor(message: string) {
    super(message, AuthErrorCodes.INVALID_CREDENTIALS);
  }
}

export class UserAlreadyExistError extends BadRequestError<AuthErrorCodes> {
  constructor(message: string) {
    super(message, AuthErrorCodes.USER_ALREADY_EXIST);
  }
}
