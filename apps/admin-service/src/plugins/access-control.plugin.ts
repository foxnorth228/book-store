import { accessControlPlugin } from "@org/fastify-plugins";
import { isAuthServiceUnavailable } from "@org/grpc";
import fp from "fastify-plugin";

export default fp(
  async (app) => {
    await app.register(accessControlPlugin, {
      check: async (accountId, action) => {
        try {
          return await app.authGrpc.checkPermission(accountId, action);
        } catch (err) {
          app.log.error({ err }, "auth-service permission check failed");
          throw isAuthServiceUnavailable(err)
            ? app.httpErrors.serviceUnavailable()
            : app.httpErrors.internalServerError();
        }
      },
    });
  },
  { name: "access-control-setup", dependencies: ["grpc-client", "jwt", "swagger"] },
);
