import { useMutation } from "@tanstack/react-query";
import type { MutationProps } from "@/infra/types/mutation";
import { useStorage } from "@/infra/adapters/storage/hooks/useStorage";
import { StorageKeys } from "@/infra/adapters/storage/types";
import { signInWithGoogleService } from "./sign-in-with-google.service";
import { useAuthService } from "@/infra/adapters/auth";
import { useHttpClient } from "@/infra/adapters/http-client";
import { AuthResponse } from "../../auth.model";

export function useSignInWithGoogle(config: MutationProps<AuthResponse>) {
  const storage = useStorage();

  const authService = useAuthService();
  const httpClient = useHttpClient();
  const { mutate, isPending } = useMutation<AuthResponse, Error>({
    mutationFn: () => signInWithGoogleService(authService, httpClient),
    onSuccess: (data) => {
      storage.setItem(StorageKeys.SESSION, data);
      config.onSuccess?.(data);
    },
    onError: (error) => {
      config.onError?.(error);
    },
  });

  return { signInWithGoogle: mutate, isPending };
}
