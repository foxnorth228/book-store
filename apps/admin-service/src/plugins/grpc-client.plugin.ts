import { AuthGrpcClient, AuthServiceClient, createAuthClient } from "@org/grpc";
import fp from "fastify-plugin";

const grpcClientPlugin = fp(
  async (app) => {
    const { GRPC_AUTH_HOST, GRPC_AUTH_PORT } = app.config.env;
    const client = createAuthClient(`${GRPC_AUTH_HOST}:${GRPC_AUTH_PORT}`);

    app.decorate("grpcAuthClient", client);
    app.decorate("authGrpc", new AuthGrpcClient(client));

    app.addHook("onClose", async () => {
      client.close();
    });
  },
  { name: "grpc-client", fastify: "5.x" },
);

declare module "fastify" {
  interface FastifyInstance {
    grpcAuthClient: AuthServiceClient;
    authGrpc: AuthGrpcClient;
  }
}

export default grpcClientPlugin;
