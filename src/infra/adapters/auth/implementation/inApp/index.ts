import { AuthServiceImpl, SocialAuthResult } from '../../types';

async function signInWithGoogle(): Promise<SocialAuthResult> {
  return { token: 'mock-token', provider: 'google' };
}

async function signInWithApple(): Promise<SocialAuthResult> {
  return { token: 'mock-token', provider: 'apple' };
}

export const inAppAuth: AuthServiceImpl = {
  signInWithGoogle,
  signInWithApple,
};
