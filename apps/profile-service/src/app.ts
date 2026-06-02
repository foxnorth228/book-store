import AutoLoad from "@fastify/autoload";
import { FastifyInstance } from "fastify";
import * as path from "path";

import healthRoutes from "./modules/health/health.routes";
import profileRoutes from "./modules/profile/profile.routes";

/* eslint-disable-next-line */
export interface AppOptions {}

export async function app(fastify: FastifyInstance, opts: AppOptions) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: { ...opts },
  });

  fastify.register(healthRoutes);
  fastify.register(profileRoutes);
}
