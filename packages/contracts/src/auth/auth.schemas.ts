import z from "zod";

import { ZodCustomErrorCode } from "../utils/zod-custom-error-code.js";
import { authContractConfig } from "./auth.config.js";
import { AuthAction, AuthRole } from "./roles.js";

export const emailSchema = z.string().trim().min(1).pipe(z.email());
export const passwordSchema = z.string().trim().min(1).min(6);
export const loginSchemaBody = z.object({
  email: emailSchema,
  password: passwordSchema,
});
export const loginSchemaResponse = z.object({
  id: z.uuid(),
  accessToken: z.string(),
});

export const authSchemas = {
  login: {
    body: loginSchemaBody,
    response: loginSchemaResponse,
  },
  register: {
    body: z
      .object({
        email: emailSchema,
        password: passwordSchema,
        confirmPassword: passwordSchema,
        nickname: z.string().trim().min(1),
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
  session: { refresh: { response: loginSchemaResponse } },
  passwordReset: {
    requestOtpCode: {
      body: z.object({ email: emailSchema }),
      response: z.object({ success: z.literal(true) }),
    },
    verifyOtpCode: {
      body: z.object({
        email: emailSchema,
        code: z.string().trim().length(authContractConfig.passwordOtpCode.length).regex(/^\d+$/),
      }),
      response: z.object({ resetToken: z.string() }),
    },
    updatePassword: {
      body: z
        .object({
          resetToken: z.string().trim(),
          password: passwordSchema,
          confirmPassword: passwordSchema,
        })
        .refine((data) => data.password === data.confirmPassword, {
          path: ["confirmPassword"],
          params: {
            code: ZodCustomErrorCode.PasswordsMismatch,
          },
        }),

      response: z.object({
        success: z.literal(true),
      }),
    },
  },
  admin: {
    login: {
      body: loginSchemaBody,
      response: loginSchemaResponse,
    },
    session: {
      refresh: {
        response: loginSchemaResponse,
      },
    },
  },
};

export const authAccountRegisteredSchema = z.object({
  accountId: z.uuid(),
  nickname: z.string().trim().min(1),
});

export const authNotificationSendOtpCodeEventSchema = z.object({
  email: z.email(),
  code: z.string().trim().min(1).max(6),
});

export const authAdminUserCreatedSchema = z.object({});

export const authJwtPayloadSchema = z.object({
  sub: z.string(),
  roles: z.array(z.enum(AuthRole)),
  permissions: z.array(z.enum(AuthAction)),
  aud: z.string(),
});
