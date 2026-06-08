import type {
  AuthServiceImpl,
  SocialAuthResult,
} from "@/infra/adapters/auth/types";
import { HttpClientImpl } from "@/infra/adapters/http-client";
import { AuthResponse } from "../../auth.model";

export async function signInWithGoogleService(
  authService: AuthServiceImpl,
  httpClientService: HttpClientImpl,
): Promise<AuthResponse> {

  const result = await authService.signInWithGoogle();
  const response = await httpClientService.post<AuthResponse>("auth/google", {
    token: result.token,
  });
  return {
    AccessToken: response.data.AccessToken,
    User: response.data.User,
  };
}
