export const verificationConfig = {
  repositoryName: "verificationRepository",
  serviceName: "verificationRepository",
  controllerName: "verificationController",
  schemas: {},
  tags: {
    verification: "Verification",
  },
  otp: {
    secretPhrase: "secret-saving-salt-cringe",
    codeTimeLimit: 600,
    maxVerifyRetriesCount: 5,
    resendCodeTimeLimit: 60,
  },
};
