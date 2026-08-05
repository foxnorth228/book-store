import { credentials } from "@grpc/grpc-js";

import { AuthServiceClient } from "../grpc-generated/auth.js";

export function createAuthClient(address: string) {
  return new AuthServiceClient(address, credentials.createInsecure());
}
