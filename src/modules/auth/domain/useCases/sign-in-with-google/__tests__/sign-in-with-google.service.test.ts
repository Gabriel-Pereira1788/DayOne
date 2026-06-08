import { signInWithGoogleService } from '../sign-in-with-google.service';
import type { AuthServiceImpl } from '@/infra/adapters/auth/types';
import type { HttpClientImpl, HttpResponse } from '@/infra/adapters/http-client/types';
import type { AuthResponse } from '../../../auth.model';

const mockAuthResponse: AuthResponse = {
  AccessToken: 'access-token-123',
  User: { ID: '1', Email: 'test@test.com', Name: 'Test User', Picture: '' },
};

const mockAuthService: AuthServiceImpl = {
  signInWithApple: async () => ({ token: 'mock-token', provider: 'apple' }),
  signInWithGoogle: async () => ({ token: 'mock-token', provider: 'google' }),
};

const mockHttpClient: HttpClientImpl = {
  post: async <T>(_url: string, _data?: unknown): Promise<HttpResponse<T>> =>
    ({ data: mockAuthResponse as unknown as T, status: 200 }),
  get: async <T>(_url: string): Promise<HttpResponse<T>> =>
    ({ data: {} as T, status: 200 }),
  patch: async <T>(_url: string, _data?: unknown): Promise<HttpResponse<T>> =>
    ({ data: {} as T, status: 200 }),
  delete: async <T>(_url: string): Promise<HttpResponse<T>> =>
    ({ data: {} as T, status: 204 }),
};

describe('signInWithGoogleService', () => {
  it('should return AccessToken and User from API response', async () => {
    const result = await signInWithGoogleService(mockAuthService, mockHttpClient);
    expect(result).toEqual(mockAuthResponse);
  });

  it('should call signInWithGoogle on authService', async () => {
    const spy = jest.fn().mockResolvedValue({ token: 'mock-token', provider: 'google' });
    await signInWithGoogleService({ ...mockAuthService, signInWithGoogle: spy }, mockHttpClient);
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should post token to auth/google endpoint', async () => {
    const postSpy = jest.fn().mockResolvedValue({ data: mockAuthResponse, status: 200 });
    await signInWithGoogleService(mockAuthService, { ...mockHttpClient, post: postSpy });
    expect(postSpy).toHaveBeenCalledWith('auth/google', { token: 'mock-token' });
  });
});
