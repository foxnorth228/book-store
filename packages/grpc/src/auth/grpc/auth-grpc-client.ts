import { Metadata, status, type ServiceError } from "@grpc/grpc-js";
import type { AuthServiceClient } from "../grpc-generated/auth.js";

export class AuthGrpcClient {
  constructor(private readonly client: AuthServiceClient) {}

  checkPermission(accountId: string, permission: string, timeoutMs = 500): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.client.checkPermission(
        { accountId, permission },
        new Metadata(),
        { deadline: Date.now() + timeoutMs },
        (err, res) => (err ? reject(err) : resolve(res.allowed)),
      );
    });
  }
}

export const isAuthServiceUnavailable = (err: unknown): boolean => {
  const code = (err as ServiceError | undefined)?.code;
  return code === status.UNAVAILABLE || code === status.DEADLINE_EXCEEDED;
};
