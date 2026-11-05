import { useForm } from "@tanstack/react-form";
import { authContracts, AuthErrorCodes, AuthLoginReq } from "@org/contracts";
import { createZodErrorMap, handleError, isHttpAppError, TanStackFormField } from "@shared/lib";
import { PasswordInput } from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { signIn } from "../model/sign-in";
import { Description, FormError, SubmitButton, Title } from "./form-components";
import { cn, Input } from "@org/ui";
import { BaseComponentProps } from "@shared/types";

interface LoginFormProps extends BaseComponentProps {
  onFinish?: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onFinish, className }) => {
  const { t } = useTranslation();

  const [formError, setFormError] = useState<string | null>(null);

  const errorMap = createZodErrorMap<AuthLoginReq>(t, {
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

        onFinish?.();
      } catch (e) {
        if (
          isHttpAppError<AuthErrorCodes>(e) &&
          e.data.code === AuthErrorCodes.INVALID_CREDENTIALS
        ) {
          setFormError(t((w) => w.loginModal.errors.invalidCredentials, { ns: "auth" }));
          return;
        }

        handleError(e);
      }
    },
  });

  return (
    <form
      className={cn(
        "border-border bg-card flex w-full max-w-105 flex-col gap-4 rounded-xl border p-8 shadow-(--shadow-card)",
        className,
      )}
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();

        void form.handleSubmit();
      }}
    >
      <Title>{t((w) => w.loginModal.title, { ns: "auth" })}</Title>
      <Description>{t((w) => w.loginModal.description, { ns: "auth" })}</Description>

      {formError && <FormError>{formError}</FormError>}

      <form.Field name="email">
        {(field) => (
          <TanStackFormField
            field={field}
            label={t((w) => w.loginModal.fields.email.label, { ns: "auth" })}
            render={() => (
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
                placeholder={t((w) => w.loginModal.fields.email.placeholder, { ns: "auth" })}
              />
            )}
          />
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <TanStackFormField
            field={field}
            label={t((w) => w.loginModal.fields.password.label, { ns: "auth" })}
            render={() => (
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
                placeholder={t((w) => w.loginModal.fields.password.placeholder, { ns: "auth" })}
              />
            )}
          />
        )}
      </form.Field>

      <form.Subscribe selector={(state) => state.isSubmitting}>
        {(isSubmitting) => (
          <SubmitButton variant="default" type="submit" isPending={isSubmitting}>
            {t((w) => w.loginModal.submit, { ns: "auth" })}
          </SubmitButton>
        )}
      </form.Subscribe>
    </form>
  );
};
