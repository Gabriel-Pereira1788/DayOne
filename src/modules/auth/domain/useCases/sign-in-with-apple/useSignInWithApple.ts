import { useMutation } from "@tanstack/react-query";
import type { MutationProps } from "@/infra/types/mutation";
import { useStorage } from "@/infra/adapters/storage/hooks/useStorage";
import { StorageKeys } from "@/infra/adapters/storage/types";
import type { SocialAuthResult } from "@/infra/adapters/auth/types";
import { signInWithAppleService } from "./sign-in-with-apple.service";
import { useAuthService } from "@/infra/adapters/auth";
import { useHttpClient } from "@/infra/adapters/http-client";
import { AuthResponse } from "../../auth.model";

export function useSignInWithApple(config: MutationProps<AuthResponse>) {
  const storage = useStorage();

  const authService = useAuthService();
  const httpClient = useHttpClient();
  const { mutate, isPending } = useMutation<AuthResponse, Error>({
    mutationFn: () => {
      return signInWithAppleService(authService, httpClient);
    },
    onSuccess: (data) => {
      storage.setItem(StorageKeys.SESSION, data);
      config.onSuccess?.(data);
    },
    onError: (error) => {
      config.onError?.(error);
    },
  });

  return { signInWithApple: mutate, isPending };
}
