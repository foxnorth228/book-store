import { zodResolver } from "@hookform/resolvers/zod";
import { authContracts, AuthErrorCodes, AuthLoginReq } from "@org/contracts";
import { createZodErrorMap, handleError, isHttpAppError, RHFForm, RHFFormField } from "@shared/lib";
import { PasswordInput } from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { signIn } from "../model/sign-in";
import {
  Description,
  Footer,
  FooterButtonLink,
  FooterLink,
  FormError,
  SubmitButton,
} from "./form-components";
import { Input } from "@org/ui";

interface LoginFormProps {
  onRegister: () => void;
  onFinish: () => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onRegister, onFinish }) => {
  const { t } = useTranslation(["auth"]);
  const { t: tc } = useTranslation();

  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (data: AuthLoginReq) => {
    try {
      await signIn(data);

      onFinish();
    } catch (e) {
      if (isHttpAppError<AuthErrorCodes>(e) && e.data.code === AuthErrorCodes.INVALID_CREDENTIALS) {
        setFormError(t((w) => w.loginModal.errors.invalidCredentials));
        return;
      }

      handleError(e);
    }
  };

  return (
    <RHFForm
      onSubmit={onSubmit}
      mode={"onSubmit"}
      resolver={zodResolver(authContracts.login.body, {
        error: createZodErrorMap<AuthLoginReq>(tc, {
          email: {
            too_small: (issue, t) => {
              if (issue.minimum === 1) {
                return t((w) => w.loginModal.fields.email.errors.required, { ns: "auth" });
              }

              return t((w) => w.loginModal.fields.email.errors.invalid, { ns: "auth" });
            },
            invalid_format: (_, t) => {
              return t((w) => w.loginModal.fields.email.errors.invalid, { ns: "auth" });
            },
          },
          password: {
            too_small: (issue, t) => {
              if (issue.minimum === 1) {
                return t((w) => w.loginModal.fields.password.errors.required, { ns: "auth" });
              }

              return t((w) => w.loginModal.fields.password.errors.tooShort, {
                ns: "auth",
                minimum: issue.minimum,
              });
            },
          },
        }),
      })}
      defaultValues={{
        email: "",
        password: "",
      }}
    >
      <Description>{t((w) => w.loginModal.description)}</Description>

      {formError && <FormError>{formError}</FormError>}

      <RHFFormField<AuthLoginReq>
        name="email"
        label={t((w) => w.loginModal.fields.email.label)}
        render={({ field, additionalProps }) => (
          <Input
            {...field}
            {...additionalProps}
            type="email"
            autoComplete={"email"}
            placeholder={t((w) => w.loginModal.fields.email.placeholder)}
          />
        )}
      />

      <RHFFormField<AuthLoginReq>
        name="password"
        label={t((w) => w.loginModal.fields.password.label)}
        render={({ field, additionalProps }) => (
          <PasswordInput
            {...field}
            {...additionalProps}
            type="password"
            autoComplete={"current-password"}
            placeholder={t((w) => w.loginModal.fields.password.placeholder)}
          />
        )}
      />

      <FooterLink to="/forgot-password">{t((w) => w.loginModal.forgotPassword)}</FooterLink>

      <SubmitButton variant={"default"} type="submit">
        {t((w) => w.loginModal.submit)}
      </SubmitButton>

      <Footer>
        <span>{t((w) => w.loginModal.noAccount)}</span>

        <FooterButtonLink onClick={() => onRegister()}>
          {t((w) => w.loginModal.createAccount)}
        </FooterButtonLink>
      </Footer>
    </RHFForm>
  );
};
