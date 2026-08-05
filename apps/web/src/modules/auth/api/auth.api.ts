import { HttpClient } from "@org/http";

export const AuthApi = {
  httpClient: new HttpClient({ baseUrl: "" }),
  login(data: LoginRequest) {
    return this.httpClient.post("/api/auth/login", data);
  },

  register(data: RegisterRequest) {
    return this.httpClient.post("/api/auth/register", data);
  },
};
