import { BaseService } from "@org/fastify";
import Handlebars from "handlebars";
import mjml2html from "mjml";
import { readFile } from "node:fs/promises";
import { createTransport, type Transporter } from "nodemailer";

import { emailsConfig } from "./emails.config";
import { EmailsRepository } from "./emails.repository";
import { FastifyInstance } from "fastify";
import { NotificationAuthSendOtpCodeEventDTO } from "@org/contracts";
import { EmailTemplateResetPasswordOtpBody } from "./emails.type";

export class EmailsService extends BaseService<EmailsRepository> {
  protected readonly repositoryKey = emailsConfig.repositoryName;
  private readonly transporter: Transporter;

  constructor(app: FastifyInstance) {
    super(app);
    this.transporter = createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: false,
    });
  }

  async sendEmailPasswordResetOtp(body: NotificationAuthSendOtpCodeEventDTO) {
    const html = await this.renderTemplate<EmailTemplateResetPasswordOtpBody>(
      emailsConfig.templates.passwordResetOtp,
      {
        title: "Password reset",
        description: "Use the following code to reset your password.",
        otpCode: body.code,
        expiration: "10 minutes",
        ignoreMessage: "If you did not request a password reset, ignore this email.",
      },
    );

    await this.sendEmail({
      to: body.email,
      subject: "Password reset",
      html,
    });
  }

  async sendEmail(options: { to: string; subject: string; html: string }) {
    return this.transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });
  }

  async renderTemplate<T extends object>(templatePath: string, data: T): Promise<string> {
    const source = await readFile(templatePath, "utf8");

    const template = Handlebars.compile(source);
    const mjml = template(data);

    const result = await mjml2html(mjml);

    if (result.errors.length > 0) {
      throw new Error(`Failed to compile MJML template: ${JSON.stringify(result.errors)}`);
    }

    return result.html;
  }
}
