import type { SocialAuthResult } from '@/infra/adapters/auth/types';

export async function signInWithAppleService(): Promise<SocialAuthResult> {
  // TODO: replace with real adapter call when backend is ready
  // return authService.signInWithApple();
  return { token: 'mock-token', provider: 'apple' };
}
