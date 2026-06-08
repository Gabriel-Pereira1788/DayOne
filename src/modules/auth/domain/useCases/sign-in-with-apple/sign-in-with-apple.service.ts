import type { AuthServiceImpl } from "@/infra/adapters/auth/types";
import { HttpClientImpl } from "@/infra/adapters/http-client";
import { AuthResponse } from "../../auth.model";

export async function signInWithAppleService(
  authService: AuthServiceImpl,
  httpClientService: HttpClientImpl,
): Promise<AuthResponse> {
  const result = await authService.signInWithApple();
  const response = await httpClientService.post<AuthResponse>("auth/apple", {
    idToken: result.token,
  });
  return { AccessToken: response.data.AccessToken, User: response.data.User };
}
