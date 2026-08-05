export interface AccessTokenPayload {
  sub: string;
  email: string;
  roles: string[];
  permissions: string[];
  sessionId: string;

  iat: number;
  exp: number;
}
