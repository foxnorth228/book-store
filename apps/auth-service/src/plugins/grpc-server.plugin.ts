import { Server, ServerCredentials, status } from "@grpc/grpc-js";
import { type AuthServiceServer, registerAuthService } from "@org/grpc";
import fp from "fastify-plugin";
import { checkHaveUserPermission } from "../libs/prisma-utils/check-have-user-permission";

const grpcError = (code: status, message: string) =>
  Object.assign(new Error(message), { code, details: message });

const grpcServerPlugin = fp(
  async (app) => {
    const grpcServer = new Server();

    const handlers: AuthServiceServer = {
      checkPermission: async (call, callback) => {
        const { accountId, permission } = call.request;

        if (!accountId || !permission) {
          callback(grpcError(status.INVALID_ARGUMENT, "accountId and permission are required"));
          return;
        }

        try {
          const allowed = await checkHaveUserPermission(app, accountId, permission);
          callback(null, { allowed });
        } catch (err) {
          app.log.error({ err, accountId, permission }, "checkPermission failed");
          callback(grpcError(status.INTERNAL, "Internal error"));
        }
      },
    };

    registerAuthService(grpcServer, handlers);

    const { GRPC_SERVER_HOST, GRPC_SERVER_PORT } = app.config.env;

    await new Promise<void>((resolve, reject) => {
      grpcServer.bindAsync(
        `${GRPC_SERVER_HOST}:${GRPC_SERVER_PORT}`,
        ServerCredentials.createInsecure(),
        (err) => {
          if (err) {
            app.log.error({ err }, "Failed to start grpc server");
            reject(err);
            return;
          }
          resolve();
        },
      );
    });

    app.decorate("grpcServer", grpcServer);

    app.addHook("onClose", async () => {
      await new Promise<void>((resolve) => {
        const timer = setTimeout(() => {
          grpcServer.forceShutdown();
          resolve();
        }, 5000);

        grpcServer.tryShutdown(() => {
          clearTimeout(timer);
          resolve();
        });
      });
    });
  },
  { name: "grpc-server", fastify: "5.x", dependencies: ["prisma"] },
);

declare module "fastify" {
  interface FastifyInstance {
    grpcServer: Server;
  }
}

export default grpcServerPlugin;
