import fp from "fastify-plugin";

export function createConfigPlugin(config: object, decoratorName = "config") {
  return fp(async (app) => {
    app.decorate(decoratorName, config);
  });
}
