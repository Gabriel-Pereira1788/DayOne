import * as AppleAuthentication from 'expo-apple-authentication';
import type { SocialAuthResult } from '../../types';

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
      return { token, provider: 'apple' };
    } catch (error: any) {
      if (
        error?.code === 'ERR_REQUEST_CANCELED' ||
        error?.code === 'ERR_CANCELED'
      ) {
        throw { code: 'SIGN_IN_CANCELLED' };
      }
      throw error;
    }
  },
};
