export interface SocialAuthResult {
  token: string;
  provider: 'google' | 'apple';
}

export interface AuthServiceImpl {
  signInWithGoogle(): Promise<SocialAuthResult>;
  signInWithApple(): Promise<SocialAuthResult>;
}
