import { createRootRoute, Outlet, useRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactAriaRouterProvider } from "@org/ui";

const RootLayout = () => {
  const router = useRouter();

  return (
    <ReactAriaRouterProvider
      navigate={(to) => router.navigate({ to })}
      useHref={(to) => router.buildLocation({ to }).href}
    >
      <Outlet />
      <TanStackRouterDevtools />
    </ReactAriaRouterProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
