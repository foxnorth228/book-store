import AutoLoad from "@fastify/autoload";
import { createConfigPlugin } from "@org/fastify-plugins";
import Fastify from "fastify";
import path from "path";

import { ServerOptions } from "./server";

export async function buildApp(opts: ServerOptions) {
  const app = Fastify(opts.fastifyOptions);

  // plugins
  await app.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: { ...opts },
  });
  await app.register(createConfigPlugin(opts.config));

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
