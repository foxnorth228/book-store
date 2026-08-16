import { languageSchema } from "@org/localization";
import z from "zod";

import { ZodCustomErrorCode } from "../utils/zod-custom-error-code.js";
import { AuthRole } from "./roles.js";

export const passwordSchema = z.string().trim().min(1).min(6);

export const authSchemas = {
  login: {
    body: z.object({
      email: z.string().trim().min(1).pipe(z.email()),
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
        email: z.string().trim().min(1).pipe(z.email()),
        password: passwordSchema,
        confirmPassword: passwordSchema,
        language: languageSchema,
      })
      .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        params: {
          code: ZodCustomErrorCode.PasswordsMismatch,
        },
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
