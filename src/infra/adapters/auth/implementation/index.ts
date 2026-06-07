import type { AuthServiceImpl } from '../types';
import { googleSignInImpl } from './google-signin';
import { appleSignInImpl } from './apple-signin';

export const authServiceImpl: AuthServiceImpl = {
  signInWithGoogle: googleSignInImpl.signInWithGoogle.bind(googleSignInImpl),
  signInWithApple: appleSignInImpl.signInWithApple.bind(appleSignInImpl),
};
