import { credentials } from "@grpc/grpc-js";

import { ProfileServiceClient } from "../grpc-generated/profile.js";

export function createProfileClient(address: string) {
  return new ProfileServiceClient(address, credentials.createInsecure());
}
