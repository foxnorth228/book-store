import { join } from "node:path";

export const emailsConfig = {
  repositoryName: "EmailsRepository",
  serviceName: "EmailsService",
  controllerName: "EmailsController",

  schemas: {},

  tags: {
    emails: "Emails",
  },

  templates: {
    passwordResetOtp: join(__dirname, "templates", "reset-password-otp.mjml"),
  },
};
