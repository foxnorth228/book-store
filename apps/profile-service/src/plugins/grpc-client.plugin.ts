import { credentials } from "@grpc/grpc-js";
import { AuthServiceClient } from "@org/contracts";
import fp from "fastify-plugin";

const grpcClientPlugin = fp(
  async (app) => {
    const client = new AuthServiceClient(
      `${app.config.env.GRPC_AUTH_HOST}:${app.config.env.GRPC_AUTH_PORT}`,
      credentials.createInsecure(),
    );

    app.decorate("grpcAuthClient", client);
    app.addHook("onClose", async () => {
      client.close();
    });
  },
  { name: "grpc-client", fastify: "5.x" },
);

declare module "fastify" {
  interface FastifyInstance {
    grpcAuthClient: AuthServiceClient;
  }
}

export default grpcClientPlugin;
