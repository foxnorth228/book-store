import { Languages } from "@org/localization";

export interface NotificationAuthSendOtpCodeEventDTO {
  email: string;
  code: string;
  language: Languages;
}
