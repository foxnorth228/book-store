import { FastifyInstance } from "fastify";

export const createProfileController = (module: FastifyInstance) => {
  return {
    async getHealthStatus() {
      return module;
    },
  };
};
