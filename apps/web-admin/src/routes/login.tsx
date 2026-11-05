import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginForm, useSessionStore } from "@modules/auth";
import { Page } from "@org/ui";
import { Header } from "@widgets/Header";

const LoginPage = () => {
  return (
    <Page>
      <Header />
      <Page.Main>
        <Page.Content className="flex items-center justify-center">
          <LoginForm className="h-fit -translate-y-32" />
        </Page.Content>
      </Page.Main>
    </Page>
  );
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
