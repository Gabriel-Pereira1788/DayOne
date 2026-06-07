import { signInWithGoogleService } from '../sign-in-with-google.service';

describe('signInWithGoogleService', () => {
  it('should resolve to the correct shape', async () => {
    const result = await signInWithGoogleService();
    expect(result).toEqual({ token: 'mock-token', provider: 'google' });
  });
});
