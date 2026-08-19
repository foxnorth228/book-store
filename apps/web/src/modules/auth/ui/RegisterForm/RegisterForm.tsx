import { localeOptions } from "@app/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { authContracts, AuthErrorCodes, AuthRegisterReq } from "@org/contracts";
import { Languages } from "@org/localization";
import { handleError, isHttpAppError, RHFForm, RHFFormField } from "@shared/lib";
import { Input, PasswordInput, Select } from "@shared/ui";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";

import { AuthApi } from "../../api/auth.api";
import { Description, Footer, FooterButtonLink, FormError, SubmitButton } from "../form-components";
import { createRegisterFormZodErrorsMapper } from "./utils";

interface RegisterFormProps {
  onLogin: () => void;
  onFinish: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onLogin, onFinish }) => {
  const { t } = useTranslation(["auth"]);
  const { t: tc } = useTranslation();

  const [formError, setFormError] = useState<string | null>(null);

  const onSubmit = async (data: AuthRegisterReq) => {
    setFormError("");
    try {
      await AuthApi.register(data);

      onFinish();
    } catch (e) {
      if (isHttpAppError<AuthErrorCodes>(e) && e.data.code === AuthErrorCodes.USER_ALREADY_EXIST) {
        setFormError(t((w) => w.registerModal.errors.userAlreadyExist));
        return;
      }

      handleError(e);
    }
  };

  return (
    <RHFForm
      mode="onSubmit"
      resolver={zodResolver(authContracts.register.body, {
        error: createRegisterFormZodErrorsMapper(tc),
      })}
      onSubmit={onSubmit}
      defaultValues={{
        email: "",
        password: "",
        confirmPassword: "",
        language: Languages.En,
      }}
    >
      <Description>{t((w) => w.registerModal.description)}</Description>

      {formError && <FormError>{formError}</FormError>}

      <RHFFormField<AuthRegisterReq>
        name="email"
        label={t((w) => w.registerModal.fields.email.label)}
        render={({ field, additionalProps }) => (
          <Input
            {...field}
            {...additionalProps}
            type="email"
            autoComplete="email"
            placeholder={t((w) => w.registerModal.fields.email.placeholder)}
          />
        )}
      />

      <RHFFormField<AuthRegisterReq>
        name="password"
        label={t((w) => w.registerModal.fields.password.label)}
        rules={{ deps: ["confirmPassword"] }}
        render={({ field, additionalProps }) => (
          <PasswordInput
            {...field}
            {...additionalProps}
            type="password"
            autoComplete="new-password"
            placeholder={t((w) => w.registerModal.fields.password.placeholder)}
          />
        )}
      />

      <RHFFormField<AuthRegisterReq>
        name="confirmPassword"
        label={t((w) => w.registerModal.fields.confirmPassword.label)}
        render={({ field, additionalProps }) => (
          <PasswordInput
            {...field}
            {...additionalProps}
            type="password"
            autoComplete="new-password"
            placeholder={t((w) => w.registerModal.fields.confirmPassword.placeholder)}
          />
        )}
      />

      <RHFFormField<AuthRegisterReq>
        name="language"
        label={t((w) => w.registerModal.fields.language.label)}
        render={({ field, additionalProps }) => (
          <Select
            placeholder={t((w) => w.registerModal.fields.language.placeholder)}
            value={field.value}
            onChange={field.onChange}
            {...additionalProps}
          >
            <Select.Trigger>
              <Select.Value />
            </Select.Trigger>

            <Select.Content>
              {localeOptions(tc).map((option) => (
                <Select.Item key={option.value} id={option.value}>
                  {option.label}
                </Select.Item>
              ))}
            </Select.Content>
          </Select>
        )}
      />

      <SubmitButton type="submit">{t((w) => w.registerModal.submit)}</SubmitButton>

      <Footer>
        <span>{t((w) => w.registerModal.hasAccount)}</span>

        <FooterButtonLink onClick={() => onLogin()}>
          {t((w) => w.registerModal.signIn)}
        </FooterButtonLink>
      </Footer>
    </RHFForm>
  );
};
