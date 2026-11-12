import { routeConfig } from "@app/routing";
import { checkRequiredRoutePermission } from "@modules/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/roles/")({
  beforeLoad: () => {
    checkRequiredRoutePermission(routeConfig.roles.permission);
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_authenticated/roles/"!</div>;
}
