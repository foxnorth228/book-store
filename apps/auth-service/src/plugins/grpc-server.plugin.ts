import { Server, ServerCredentials } from "@grpc/grpc-js";
import { type AuthServiceServer, registerAuthService } from "@org/grpc";
import fp from "fastify-plugin";

const grpcServerPlugin = fp(
  async (app) => {
    const grpcServer = new Server();

    const handlers: AuthServiceServer = {
      validateToken: async (call, callback) => {
        callback(null, { valid: true, userId: "123" });
      },
    };

    registerAuthService(grpcServer, handlers);

    await new Promise<void>((resolve, reject) => {
      grpcServer.bindAsync(
        `${app.config.env.GRPC_SERVER_HOST}:${app.config.env.GRPC_SERVER_PORT}`,
        ServerCredentials.createInsecure(),
        (err) => {
          if (err) {
            app.log.error(`Failed to start grpc server: ${err}`);
            reject(err);
          }

          resolve();
        },
      );
    });

    app.decorate("grpcServer", grpcServer);

    app.addHook("onClose", () => {
      grpcServer.forceShutdown();
    });
  },
  { name: "grpc-client", fastify: "5.x" },
);

declare module "fastify" {
  interface FastifyInstance {
    grpcServer: Server;
  }
}

export default grpcServerPlugin;
