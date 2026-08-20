export interface EmailTemplateResetPasswordOtpBody {
  title: string;
  description: string;
  otpCode: string;
  expiration: string;
  ignoreMessage: string;
}
