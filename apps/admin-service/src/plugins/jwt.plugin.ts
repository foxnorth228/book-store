import { createJwtPlugin } from "@org/fastify-plugins";
import fp from "fastify-plugin";

const jwtPlugin = fp(
  async (app) => {
    await app.register(
      createJwtPlugin({
        secret: { public: app.config.env.JWT_ACCESS_TOKEN_PUBLIC_KEY },
      }),
    );
  },
  { name: "jwt" },
);

export default jwtPlugin;
