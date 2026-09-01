import AutoLoad from "@fastify/autoload";
import { createConfigPlugin, errorHandlerPlugin } from "@org/fastify-plugins";
import Fastify from "fastify";
import path from "path";

import { ServerOptions } from "./server";

export async function buildApp(opts: ServerOptions) {
  const app = Fastify(opts.fastifyOptions);

  await app.register(errorHandlerPlugin);
  await app.register(createConfigPlugin(opts.config));

  // plugins
  await app.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: { ...opts },
  });

  // modules
  await app.register(AutoLoad, {
    dir: path.join(__dirname, "modules"),
    maxDepth: 1,
    dirNameRoutePrefix: false,
    matchFilter: (path) => path.endsWith("module.js") || path.endsWith("module.ts"),
    options: { prefix: opts.config.env.PATH_PREFIX, ...opts },
  });

  return app;
}

declare module "fastify" {
  interface FastifyInstance {
    config: ServerOptions["config"];
  }
}
