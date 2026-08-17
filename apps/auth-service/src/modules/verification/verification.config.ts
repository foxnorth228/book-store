export const verificationConfig = {
  repositoryName: "verificationRepository",
  serviceName: "verificationService",
  controllerName: "verificationController",
  schemas: {
    requestOtpCodeReq: "requestOtpCodeReq",
    requestOtpCodeRes: "requestOtpCodeRes",
    verifyOtpCodeReq: "verifyOtpCodeReq",
    verifyOtpCodeRes: "verifyOtpCodeRes",
    updatePasswordReq: "updatePasswordReq",
    updatePasswordRes: "updatePasswordRes",
  },
  tags: {
    passwordUpdate: "Password update",
  },
  otp: {
    secretPhrase: "secret-saving-salt-cringe",
    codeTimeLimit: 600,
    maxVerifyRetriesCount: 5,
    resendCodeTimeLimit: 60,
  },
};
