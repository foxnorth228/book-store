import { localeOptions } from "@app/i18n";
import { zodResolver } from "@hookform/resolvers/zod";
import { authContracts, AuthRegisterReq } from "@org/contracts";
import { Languages } from "@org/localization";
import { RHFForm, RHFFormField } from "@shared/lib";
import { Input, PasswordInput, Select } from "@shared/ui";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AuthApi } from "../../../api/auth.api";
import { Description, Footer, FooterButtonLink, SubmitButton } from "../auth-form-components";
import { createRegisterFormZodErrorsMapper } from "./utils";

interface RegisterFormProps {
  onLogin: () => void;
}

export const RegisterForm: FC<RegisterFormProps> = ({ onLogin }) => {
  const { t } = useTranslation(["auth"]);
  const { t: tc } = useTranslation();

  const onSubmit = async (data: AuthRegisterReq) => {
    await AuthApi.register(data);
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

const result = authContracts.register.body.safeParse({
  email: "test@test.com",
  password: "password",
  confirmPassword: "password2",
  language: "en",
});

if (!result.success) {
  console.log(result.error.issues);
}
