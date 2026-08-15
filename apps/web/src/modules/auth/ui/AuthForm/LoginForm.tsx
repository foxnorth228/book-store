import { zodResolver } from "@hookform/resolvers/zod";
import { authContracts, AuthLoginReq } from "@org/contracts";
import { RHFForm, RHFFormField } from "@shared/lib";
import { Input } from "@shared/ui";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import { signIn } from "../../model/sign-in";
import { Description, Footer, FooterLink, SubmitButton } from "./auth-form-components";

export function LoginForm() {
  const { t } = useTranslation(["auth"]);

  const onSubmit = async (data: AuthLoginReq) => {
    try {
      const response = await signIn(data);

      console.log(response);
    } catch (error) {
      toast("Error", { description: String(error) });
      console.error(error);
    }
  };

  return (
    <RHFForm onSubmit={onSubmit} mode={"onSubmit"} resolver={zodResolver(authContracts.login.body)}>
      <Description>{t((w) => w.loginModal.description)}</Description>

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
          <Input
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

        <FooterLink to="/register">{t((w) => w.loginModal.createAccount)}</FooterLink>
      </Footer>
    </RHFForm>
  );
}
