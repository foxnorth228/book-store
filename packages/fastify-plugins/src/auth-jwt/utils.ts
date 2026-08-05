import { UnauthorizedError } from "@org/errors";

export function extractBearerToken(auth?: string): string {
  if (!auth?.startsWith("Bearer ")) {
    throw new UnauthorizedError("Invalid token");
  }

  return auth.slice(7);
}
