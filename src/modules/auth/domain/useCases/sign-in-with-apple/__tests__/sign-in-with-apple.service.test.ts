import { signInWithAppleService } from '../sign-in-with-apple.service';

describe('signInWithAppleService', () => {
  it('should resolve to the correct shape', async () => {
    const result = await signInWithAppleService();
    expect(result).toEqual({ token: 'mock-token', provider: 'apple' });
  });
});
