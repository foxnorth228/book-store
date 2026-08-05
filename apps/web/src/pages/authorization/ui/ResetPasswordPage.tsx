import { ResetPasswordForm } from "@modules/auth";

export function ResetPasswordPage() {
  const token = new URLSearchParams(window.location.search).get("token");

  if (!token) {
    return <div>Некорректная ссылка</div>;
  }

  return <ResetPasswordForm token={token} />;
}
