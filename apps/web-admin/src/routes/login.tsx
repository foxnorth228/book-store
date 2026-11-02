import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginForm, useSessionStore } from "@modules/auth";

const LoginPage = () => {
  return <LoginForm />;
};

export const Route = createFileRoute("/login")({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === "string" ? search.redirect : undefined,
  }),
  beforeLoad: async () => {
    const session = useSessionStore.getState();

    if (session.isAuthenticated) {
      throw redirect({ to: "/" });
    }
  },
  component: LoginPage,
});
