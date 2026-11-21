import { AuthAction } from "@org/contracts";
import { ForbiddenError } from "@org/errors";
import { FastifyRequest } from "fastify";
import fp from "fastify-plugin";

export type RouteAccess = { public: true } | { authenticated: true } | { permission: AuthAction };

export type AccessControlOptions = {
  check: (accountId: string, action: AuthAction) => Promise<boolean>;
};

export const accessControlPlugin = fp<AccessControlOptions>(
  async (app, { check }) => {
    if (!app.hasDecorator("authenticate")) {
      throw new Error("access-control requires app.authenticate (jwt plugin)");
    }

    async function authorize(request: FastifyRequest) {
      const access = request.routeOptions.config.access as { permission: AuthAction };
      const allowed = await check(request.user.sub, access.permission);
      if (!allowed) throw new ForbiddenError("Forbidden");
    }

    app.addHook("onRoute", (route) => {
      const access = route.config?.access;
      if (!access) {
        throw new Error(`Route ${route.method} ${route.url} must define config.access`);
      }
      if ("public" in access) return;

      route.onRequest = [
        app.authenticate,
        ...("permission" in access ? [authorize] : []),
        ...[route.onRequest ?? []].flat(),
      ];
    });
  },
  { name: "access-control", dependencies: ["jwt"] },
);

declare module "fastify" {
  interface FastifyContextConfig {
    access?: RouteAccess;
  }
}
