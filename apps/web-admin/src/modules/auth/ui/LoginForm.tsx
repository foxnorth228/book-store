import { useForm } from "@tanstack/react-form";
import { authContracts, AuthErrorCodes, AuthLoginReq } from "@org/contracts";
import { createZodErrorMap, handleError, isHttpAppError } from "@shared/lib";
import { PasswordInput } from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { signIn } from "../model/sign-in";
import { Description, FormError, SubmitButton } from "./form-components";
import { Input } from "@org/ui";

interface LoginFormProps {
  onFinish: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onFinish }) => {
  const { t } = useTranslation(["auth"]);
  const { t: tc } = useTranslation();

  const [formError, setFormError] = useState<string | null>(null);

  const errorMap = createZodErrorMap<AuthLoginReq>(tc, {
    email: {
      too_small: (issue, t) => {
        if (issue.minimum === 1) {
          return t((w) => w.loginModal.fields.email.errors.required, {
            ns: "auth",
          });
        }

        return t((w) => w.loginModal.fields.email.errors.invalid, {
          ns: "auth",
        });
      },
      invalid_format: (_, t) => {
        return t((w) => w.loginModal.fields.email.errors.invalid, {
          ns: "auth",
        });
      },
    },
    password: {
      too_small: (issue, t) => {
        if (issue.minimum === 1) {
          return t((w) => w.loginModal.fields.password.errors.required, {
            ns: "auth",
          });
        }

        return t((w) => w.loginModal.fields.password.errors.tooShort, {
          ns: "auth",
          minimum: issue.minimum,
        });
      },
    },
  });

  const loginValidator = {
    "~standard": {
      version: 1 as const,
      vendor: "zod",
      validate: (value: unknown) => {
        const result = authContracts.login.body.safeParse(value, {
          error: errorMap,
        });

        if (result.success) {
          return { value: result.data };
        }

        return {
          issues: result.error.issues.map((issue) => ({
            message: issue.message,
            path: issue.path,
          })),
        };
      },
    },
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } satisfies AuthLoginReq,

    validators: {
      onSubmit: loginValidator,
    },

    onSubmit: async ({ value }) => {
      setFormError(null);

      try {
        await signIn(value);

        onFinish();
      } catch (e) {
        if (
          isHttpAppError<AuthErrorCodes>(e) &&
          e.data.code === AuthErrorCodes.INVALID_CREDENTIALS
        ) {
          setFormError(t((w) => w.loginModal.errors.invalidCredentials));
          return;
        }

        handleError(e);
      }
    },
  });

  return (
    <form
      className={
        "flex w-full max-w-105 flex-col gap-4 rounded-xl bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
      }
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        void form.handleSubmit();
      }}
    >
      <Description>{t((w) => w.loginModal.description)}</Description>

      {formError && <FormError>{formError}</FormError>}

      <form.Field name="email">
        {(field) => (
          <Input
            name={field.name}
            value={field.state.value}
            onChange={(event) => {
              field.handleChange(event.target.value);
              setFormError(null);
            }}
            onBlur={field.handleBlur}
            type="email"
            autoComplete="email"
            placeholder={t((w) => w.loginModal.fields.email.placeholder)}
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <PasswordInput
            name={field.name}
            value={field.state.value}
            onChange={(event) => {
              field.handleChange(event.target.value);
              setFormError(null);
            }}
            onBlur={field.handleBlur}
            type="password"
            autoComplete="current-password"
            placeholder={t((w) => w.loginModal.fields.password.placeholder)}
          />
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <SubmitButton variant="default" type="submit" disabled={isSubmitting}>
            {t((w) => w.loginModal.submit)}
          </SubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
};
