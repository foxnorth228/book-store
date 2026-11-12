import { routeConfig } from "@app/routing";
import { checkRequiredRoutePermission } from "@modules/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/users/")({
  beforeLoad: () => {
    checkRequiredRoutePermission(routeConfig.users.permission);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/users/"!</div>;
}
