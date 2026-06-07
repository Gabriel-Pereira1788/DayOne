import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import type { SocialAuthResult } from '../../types';
import { AuthCancelledError } from '../../types';

GoogleSignin.configure({ webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID ?? '' });

export const googleSignInImpl = {
  async signInWithGoogle(): Promise<SocialAuthResult> {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      const token =
        response.data?.idToken ?? response.data?.serverAuthCode ?? '';
      if (!token) throw new Error('AUTH_TOKEN_MISSING');
      return { token, provider: 'google' };
    } catch (error: any) {
      if (
        error?.code === statusCodes.SIGN_IN_CANCELLED ||
        error?.code === statusCodes.IN_PROGRESS
      ) {
        throw new AuthCancelledError();
      }
      throw error;
    }
  },
};
