import fp from "fastify-plugin";

export function createConfigPlugin(config: object) {
  return fp(async (app) => {
    app.decorate("config", config);
  });
}
