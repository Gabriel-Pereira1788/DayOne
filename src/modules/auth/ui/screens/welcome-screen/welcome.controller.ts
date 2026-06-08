import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSignInWithGoogle } from '@/modules/auth/domain/useCases/sign-in-with-google';
import { useSignInWithApple } from '@/modules/auth/domain/useCases/sign-in-with-apple';
import { AuthCancelledError } from '@/infra/adapters/auth/types';

function isCancellation(error: unknown): boolean {
  return error instanceof AuthCancelledError;
}

export function useWelcomeController() {
  const router = useRouter();

  const { signInWithGoogle, isPending: isGooglePending } = useSignInWithGoogle({
    onSuccess: () => {
      router.replace('/(app)/dashboard');
    },
    onError: (error) => {
      if (isCancellation(error)) return;
      Alert.alert('Sign In Failed', 'An error occurred during Google sign in. Please try again.');
    },
  });

  const { signInWithApple, isPending: isApplePending } = useSignInWithApple({
    onSuccess: () => {
      router.replace('/(app)/dashboard');
    },
    onError: (error) => {
      if (isCancellation(error)) return;
      Alert.alert('Sign In Failed', 'An error occurred during Apple sign in. Please try again.');
    },
  });

  const isLoading = isGooglePending || isApplePending;

  return {
    handleGoogleSignIn: signInWithGoogle,
    handleAppleSignIn: signInWithApple,
    isLoading,
  };
}
