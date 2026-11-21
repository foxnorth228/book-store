import { createRootRoute, Outlet, useRouter } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactAriaRouterProvider } from "@org/ui";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const RootLayout = () => {
  const router = useRouter();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ReactAriaRouterProvider
        navigate={(to) => router.navigate({ to })}
        useHref={(to) => router.buildLocation({ to }).href}
      >
        <Outlet />
        <TanStackRouterDevtools />
      </ReactAriaRouterProvider>
    </QueryClientProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
