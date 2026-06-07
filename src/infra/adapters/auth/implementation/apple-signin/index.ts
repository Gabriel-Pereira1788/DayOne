import * as AppleAuthentication from 'expo-apple-authentication';
import type { SocialAuthResult } from '../../types';
import { AuthCancelledError } from '../../types';

export const appleSignInImpl = {
  async signInWithApple(): Promise<SocialAuthResult> {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      const token = credential.identityToken ?? '';
      if (!token) throw new Error('AUTH_TOKEN_MISSING');
      return { token, provider: 'apple' };
    } catch (error: any) {
      if (
        error?.code === 'ERR_REQUEST_CANCELED' ||
        error?.code === 'ERR_CANCELED'
      ) {
        throw new AuthCancelledError();
      }
      throw error;
    }
  },
};
