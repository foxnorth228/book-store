import { credentials } from "@grpc/grpc-js";
import { AuthServiceClient } from "@org/contracts";
import fp from "fastify-plugin";

const grpcClientPlugin = fp(
  async (app) => {
    const client = new AuthServiceClient(
      `${app.config.env.HOST}:${app.config.env.PORT}`,
      credentials.createInsecure(),
    );

    app.decorate("authClient", client);

    app.addHook("onClose", async () => {
      client.close();
    });
  },
  { name: "grpc-client", fastify: "5.x" },
);

export default grpcClientPlugin;
