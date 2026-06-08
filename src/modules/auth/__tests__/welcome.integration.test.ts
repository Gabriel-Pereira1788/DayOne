import { Alert } from 'react-native';
import { fireEvent, queryClientMock, renderApp, screen, waitFor } from '@/test/utils';
import { inAppStorage } from '@/infra/adapters/storage/implementation/inApp';
import { inAppAuth } from '@/infra/adapters/auth/implementation/inApp';
import { inAppHttpClient } from '@/infra/adapters/http-client/implementation/inApp';
import { StorageKeys } from '@/infra/adapters/storage/types';
import { AuthCancelledError } from '@/infra/adapters/auth/types';
import type { AuthResponse } from '@/modules/auth/domain/auth.model';

const mockAuthResponse: AuthResponse = {
  AccessToken: 'test-access-token',
  User: { ID: 'user-1', Email: 'test@dayone.app', Name: 'Test User', Picture: '' },
};

beforeEach(() => {
  queryClientMock.clear();
  inAppStorage.removeItem(StorageKeys.SESSION);
  jest.spyOn(inAppHttpClient, 'post').mockResolvedValue({ data: mockAuthResponse, status: 201 });
  jest.spyOn(Alert, 'alert').mockImplementation(() => {});
});

afterEach(() => {
  jest.restoreAllMocks();
  inAppStorage.removeItem(StorageKeys.SESSION);
});

function renderWelcomeScreen() {
  renderApp({ initialUrl: '(auth)/welcome' });
  return {
    googleButton: screen.getByText('Sign In With Google'),
    appleButton: screen.getByText('Sign In With Apple'),
  };
}

describe('<WelcomeScreen />', () => {
  it('should render welcome screen correctly', () => {
    const { googleButton, appleButton } = renderWelcomeScreen();

    expect(googleButton).toBeTruthy();
    expect(appleButton).toBeTruthy();
    expect(screen.getByText('Day One.')).toBeTruthy();
    expect(screen.getByText('Your future self will thank you.')).toBeTruthy();
  });

  describe('Google Sign In', () => {
    it('should navigate to dashboard after Google sign in', async () => {
      const { googleButton } = renderWelcomeScreen();

      fireEvent.press(googleButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search')).toBeTruthy();
      });
    });

    it('should persist session with correct shape after Google sign in', async () => {
      const { googleButton } = renderWelcomeScreen();

      fireEvent.press(googleButton);

      await waitFor(() => {
        const session = inAppStorage.getItemSync(StorageKeys.SESSION);
        expect(session).toEqual(mockAuthResponse);
      });
    });

    it('should show loading state while Google sign in is pending', async () => {
      jest.spyOn(inAppAuth, 'signInWithGoogle').mockReturnValue(new Promise(() => {}));

      const { googleButton } = renderWelcomeScreen();
      fireEvent.press(googleButton);

      await waitFor(() => {
        expect(screen.getAllByTestId('loading-button').length).toBeGreaterThan(0);
      });
    });

    it('should not show Alert when Google sign in is cancelled', async () => {
      jest.spyOn(inAppAuth, 'signInWithGoogle').mockRejectedValue(new AuthCancelledError());

      const { googleButton } = renderWelcomeScreen();
      fireEvent.press(googleButton);

      await waitFor(() => {
        expect(Alert.alert).not.toHaveBeenCalled();
      });
    });

    it('should show error Alert on generic Google sign in failure', async () => {
      jest.spyOn(inAppAuth, 'signInWithGoogle').mockRejectedValue(new Error('Network error'));

      const { googleButton } = renderWelcomeScreen();
      fireEvent.press(googleButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Sign In Failed',
          'An error occurred during Google sign in. Please try again.',
        );
      });
    });
  });

  describe('Apple Sign In', () => {
    it('should navigate to dashboard after Apple sign in', async () => {
      const { appleButton } = renderWelcomeScreen();

      fireEvent.press(appleButton);

      await waitFor(() => {
        expect(screen.getByPlaceholderText('Search')).toBeTruthy();
      });
    });

    it('should persist session with correct shape after Apple sign in', async () => {
      const { appleButton } = renderWelcomeScreen();

      fireEvent.press(appleButton);

      await waitFor(() => {
        const session = inAppStorage.getItemSync(StorageKeys.SESSION);
        expect(session).toEqual(mockAuthResponse);
      });
    });

    it('should show loading state while Apple sign in is pending', async () => {
      jest.spyOn(inAppAuth, 'signInWithApple').mockReturnValue(new Promise(() => {}));

      const { appleButton } = renderWelcomeScreen();
      fireEvent.press(appleButton);

      await waitFor(() => {
        expect(screen.getAllByTestId('loading-button').length).toBeGreaterThan(0);
      });
    });

    it('should not show Alert when Apple sign in is cancelled', async () => {
      jest.spyOn(inAppAuth, 'signInWithApple').mockRejectedValue(new AuthCancelledError());

      const { appleButton } = renderWelcomeScreen();
      fireEvent.press(appleButton);

      await waitFor(() => {
        expect(Alert.alert).not.toHaveBeenCalled();
      });
    });

    it('should show error Alert on generic Apple sign in failure', async () => {
      jest.spyOn(inAppAuth, 'signInWithApple').mockRejectedValue(new Error('Network error'));

      const { appleButton } = renderWelcomeScreen();
      fireEvent.press(appleButton);

      await waitFor(() => {
        expect(Alert.alert).toHaveBeenCalledWith(
          'Sign In Failed',
          'An error occurred during Apple sign in. Please try again.',
        );
      });
    });
  });
});
