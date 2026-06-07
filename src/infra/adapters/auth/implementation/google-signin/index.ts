import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import type { SocialAuthResult } from '../../types';

export const googleSignInImpl = {
  async signInWithGoogle(): Promise<SocialAuthResult> {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const response = await GoogleSignin.signIn();
      const token =
        response.data?.idToken ?? response.data?.serverAuthCode ?? '';
      return { token, provider: 'google' };
    } catch (error: any) {
      if (
        error?.code === statusCodes.SIGN_IN_CANCELLED ||
        error?.code === statusCodes.IN_PROGRESS
      ) {
        throw { code: 'SIGN_IN_CANCELLED' };
      }
      throw error;
    }
  },
};
