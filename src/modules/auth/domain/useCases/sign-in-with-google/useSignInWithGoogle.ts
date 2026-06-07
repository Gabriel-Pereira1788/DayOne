import { useMutation } from '@tanstack/react-query';
import type { MutationProps } from '@/infra/types/mutation';
import { useStorage } from '@/infra/adapters/storage/hooks/useStorage';
import { StorageKeys } from '@/infra/adapters/storage/types';
import type { SocialAuthResult } from '@/infra/adapters/auth/types';
import { signInWithGoogleService } from './sign-in-with-google.service';

export function useSignInWithGoogle(config: MutationProps<SocialAuthResult>) {
  const storage = useStorage();

  const { mutate, isPending } = useMutation<SocialAuthResult, Error>({
    mutationFn: signInWithGoogleService,
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
