import { Server } from "@grpc/grpc-js";

import { type ProfileServiceServer, ProfileServiceService } from "../grpc-generated/profile.js";

export function registerAuthService(server: Server, handlers: ProfileServiceServer) {
  server.addService(ProfileServiceService, handlers);
}
