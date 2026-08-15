import { ValidationErrorCode } from "@org/errors";
import { languageSchema } from "@org/localization";
import z from "zod";

import { AuthRole } from "./roles.js";

export const passwordSchema = z
  .string(ValidationErrorCode.Required)
  .trim()
  .min(1, ValidationErrorCode.Required)
  .min(6, ValidationErrorCode.TooShort);

export const authSchemas = {
  login: {
    body: z.object({
      email: z
        .string(ValidationErrorCode.Required)
        .trim()
        .min(1, ValidationErrorCode.Required)
        .pipe(z.email(ValidationErrorCode.Invalid)),
      password: passwordSchema,
    }),
    response: z.object({
      id: z.uuid(),
      accessToken: z.string(),
    }),
  },
  register: {
    body: z
      .object({
        email: z.email(),
        password: passwordSchema,
        confirmPassword: passwordSchema,
        language: languageSchema,
      })
      .refine((data) => data.password === data.confirmPassword, {
        error: "Passwords much match",
        path: ["confirmPassword"],
      }),
    response: z.object({
      id: z.uuid(),
      email: z.email(),
    }),
  },
};

export const authAccountRegisteredSchema = z.object({
  accountId: z.uuid(),
  language: languageSchema,
});

export const authJwtPayloadSchema = z.object({
  sub: z.string(),
  roles: z.array(z.enum(AuthRole)),
});
