import { AppError, ErrorCode, ErrorResponse, NotFoundError } from "@org/errors";
import { FastifyError, FastifyInstance } from "fastify";
import fp from "fastify-plugin";

export const errorHandlerPlugin = fp(
  async (app: FastifyInstance) => {
    app.setErrorHandler(async function (
      error: FastifyError | AppError,
      _,
      reply,
    ): Promise<ErrorResponse> {
      app.log.error(error);

      if (error instanceof AppError) {
        reply.code(error.statusCode);
        return {
          statusCode: error.statusCode,
          code: error.code,
          message: error.message,
          details: error.details,
        };
      }

      if (error.validation) {
        reply.code(400);
        return {
          statusCode: 400,
          code: ErrorCode.VALIDATION_ERROR,
          message: error.message,
          details: error.validation,
        };
      }

      reply.code(500);
      return {
        statusCode: 500,
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: "Internal server error",
      };
    });

    app.setNotFoundHandler(async function notFoundHandler(request) {
      const message = `${request.method} on ${request.url} not found`;
      throw new NotFoundError(message);
    });
  },
  { name: "error-handler" },
);
