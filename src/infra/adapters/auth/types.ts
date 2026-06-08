export interface SocialAuthResult {
  token: string;
  provider: 'google' | 'apple';
}

export interface AuthServiceImpl {
  signInWithGoogle(): Promise<SocialAuthResult>;
  signInWithApple(): Promise<SocialAuthResult>;
}

export class AuthCancelledError extends Error {
  code = 'SIGN_IN_CANCELLED';
  constructor() {
    super('Sign in was cancelled');
    this.name = 'AuthCancelledError';
  }
}
