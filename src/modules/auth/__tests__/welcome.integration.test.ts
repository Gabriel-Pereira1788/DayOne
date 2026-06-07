import { fireEvent, renderApp, screen, waitFor } from "@/test/utils";
import { inAppStorage } from "@/infra/adapters/storage/implementation/inApp";
import { StorageKeys } from "@/infra/adapters/storage/types";

beforeEach(() => {
  inAppStorage.removeItem(StorageKeys.SESSION);
});

afterEach(() => {
  inAppStorage.removeItem(StorageKeys.SESSION);
});

function renderWelcomeScreen() {
  renderApp({ initialUrl: "(auth)/welcome" });

  return {
    googleButton: screen.getByText("Sign In With Google"),
  };
}

describe("<WelcomeScreen />", () => {
  it("should render welcome screen correctly", async () => {
    const { googleButton } = renderWelcomeScreen();

    expect(googleButton).toBeTruthy();
    expect(screen.getByText("Day One.")).toBeTruthy();
    expect(screen.getByText("Your future self will thank you.")).toBeTruthy();
  });

  it("should navigate to dashboard after Google sign in", async () => {
    const { googleButton } = renderWelcomeScreen();

    fireEvent.press(googleButton);

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Search")).toBeTruthy();
    });
  });

  it("should persist session after Google sign in", async () => {
    const { googleButton } = renderWelcomeScreen();

    fireEvent.press(googleButton);

    await waitFor(() => {
      const session = inAppStorage.getItemSync(StorageKeys.SESSION);
      expect(session).toBeTruthy();
    });
  });
});
