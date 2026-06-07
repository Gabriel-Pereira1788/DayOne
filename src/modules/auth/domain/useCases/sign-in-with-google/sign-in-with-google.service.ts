import type { SocialAuthResult } from '@/infra/adapters/auth/types';

export async function signInWithGoogleService(): Promise<SocialAuthResult> {
  // TODO: replace with real adapter call when backend is ready
  // return authService.signInWithGoogle();
  return { token: 'mock-token', provider: 'google' };
}
