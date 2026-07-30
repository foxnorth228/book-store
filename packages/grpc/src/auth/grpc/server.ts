import { Server } from "@grpc/grpc-js";

import { type AuthServiceServer, AuthServiceService } from "../grpc-generated/auth.js";

export function registerAuthService(server: Server, handlers: AuthServiceServer) {
  server.addService(AuthServiceService, handlers);
}
